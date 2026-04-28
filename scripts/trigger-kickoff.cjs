/**
 * Force morning kickoff for a specific user
 * Manually triggers SMS delivery of the first question for today
 */
const admin = require('firebase-admin');
const path = require('path');
const sa = require(path.join(__dirname, '..', 'serviceAccountKey.prod.json'));
admin.initializeApp({ credential: admin.credential.cert(sa) });
const db = admin.firestore();

const phone = process.argv[2];

if (!phone) {
  console.error('Usage: node trigger-kickoff.cjs <phone>');
  console.error('Example: node trigger-kickoff.cjs +17036238835');
  process.exit(1);
}

(async () => {
  console.log(`\n========================================`);
  console.log(`TRIGGERING KICKOFF FOR: ${phone}`);
  console.log(`========================================\n`);

  // Find user by phone
  const userSnap = await db.collection('daily_users').where('phone', '==', phone).limit(1).get();
  if (userSnap.empty) {
    console.error('❌ USER NOT FOUND');
    process.exit(1);
  }

  const userDoc = userSnap.docs[0];
  const uid = userDoc.id;
  const user = userDoc.data();

  console.log(`📋 User found:`);
  console.log(`   Email: ${user.email}`);
  console.log(`   SMS Opt-In: ${user.smsOptIn}`);
  console.log(`   Status: ${user.status}`);
  console.log(`   Tier: ${user.tier}`);
  console.log(`   Send Time: ${user.sendTime} ${user.timezone}`);

  // Check if SMS is enabled
  if (!user.smsOptIn) {
    console.error('❌ SMS opt-in is disabled - cannot send');
    process.exit(1);
  }

  if (user.status !== 'active' && user.status !== 'trialing') {
    console.error(`❌ Account status is '${user.status}' - cannot send`);
    process.exit(1);
  }

  // Get today's date string
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: user.timezone || 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  const sessionId = `${uid}_${today}`;

  // Check if session already exists
  const sessionDoc = await db.collection('daily_sessions').doc(sessionId).get();
  if (sessionDoc.exists && sessionDoc.data().state !== 'idle') {
    console.log(`⚠️  Session already active for today`);
    console.log(`   State: ${sessionDoc.data().state}`);
    console.log(`   Answered: ${sessionDoc.data().questionsAnswered}/${sessionDoc.data().dailyCap}`);
    process.exit(1);
  }

  // Get question pool for user's section
  const section = user.section || 'FAR';
  console.log(`\n📚 Loading questions for section: ${section}`);

  try {
    // Import the question data - adjust path based on actual structure
    let questions = [];
    try {
      // Try loading from JSON first
      const contentPath = path.join(__dirname, '..', 'content', 'cpa', section.toLowerCase(), 'questions.json');
      const data = require(contentPath);
      // Handle both array and object with questions property
      questions = Array.isArray(data) ? data : (data.questions || []);
    } catch {
      console.warn('   Could not load from JSON, will check Firestore...');
    }

    if (!questions || questions.length === 0) {
      console.log('   Loading from Firestore questions collection...');
      const qSnap = await db.collection('questions')
        .where('section', '==', section)
        .where('courseId', '==', 'cpa')
        .limit(100)
        .get();
      questions = qSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    }

    if (questions.length === 0) {
      console.error('❌ No questions found for section: ' + section);
      process.exit(1);
    }

    console.log(`   ✓ Found ${questions.length} questions`);

    // Determine daily cap
    const dailyCap = user.status === 'trialing' ? 5 : (user.tier === 'starter' ? 10 : 25);

    // Pick a random question
    const selectedQ = questions[Math.floor(Math.random() * questions.length)];

    // Create session
    console.log(`\n✏️  Creating session...`);
    const newSessionRef = db.collection('daily_sessions').doc(sessionId);
    await newSessionRef.set({
      uid,
      date: today,
      section,
      dailyCap,
      state: 'active',
      questionsAnswered: 0,
      questionsCorrect: 0,
      firstQuestionId: selectedQ.id,
      currentQuestionId: selectedQ.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastActivityAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`   ✓ Session created: ${sessionId}`);

    // Format and send SMS
    console.log(`\n📨 Sending SMS...`);
    const questionNum = 1;
    const topic = selectedQ.topic || 'Unknown Topic';
    const options = selectedQ.options || [];

    const questionText = `VoraPrep Daily CPA - ${section}\nQ${questionNum}/${dailyCap}\n\nTopic: ${topic}\n\n${selectedQ.question}\n\nA) ${options[0]}\nB) ${options[1]}\nC) ${options[2]}\nD) ${options[3]}\n\nReply A, B, C, or D`;

    // Log the outgoing SMS
    await db.collection('daily_sms_log').add({
      uid,
      direction: 'outbound',
      to: user.phone,
      body: questionText.substring(0, 500),
      status: 'triggered',
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
      note: `manual-kickoff-triggered via ${path.basename(__filename)}`,
    });

    console.log(`   ✓ SMS logged and ready to send`);
    console.log(`\n   📝 First Question:`);
    console.log(`   Topic: ${topic}`);
    console.log(`   Q: ${selectedQ.question.substring(0, 80)}...`);

    console.log(`\n✅ KICKOFF TRIGGERED`);
    console.log(`   Session: ${sessionId}`);
    console.log(`   Daily cap: ${dailyCap} questions`);
    console.log(`\n   Message preview (${questionText.length} chars):`);
    console.log(`   ─────────────────────────────`);
    console.log(`   ${questionText}`);
    console.log(`   ─────────────────────────────`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }

  console.log(`\n========================================\n`);
  process.exit(0);
})().catch(e => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
