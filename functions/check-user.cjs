const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'voraprep-prod',
});

const db = admin.firestore();

async function checkUserByEmail(email) {
  console.log(`\n🔍 Searching Firestore for: ${email}\n`);
  
  // Query users collection by email
  const usersQuery = await db.collection('users').where('email', '==', email).get();
  
  if (usersQuery.empty) {
    console.log('❌ No Firestore document found with this email');
    console.log('   User either:');
    console.log('   1. Never completed signup (Auth exists but no Firestore doc)');
    console.log('   2. Email is stored differently (check Firebase Console Auth)');
    return;
  }
  
  for (const userDoc of usersQuery.docs) {
    console.log('=== FIRESTORE USER DOC ===');
    console.log('UID:', userDoc.id);
    const data = userDoc.data();
    console.log('Fields:', JSON.stringify(data, null, 2));
    
    console.log('\n=== SUBCOLLECTIONS ===');
    
    const dailyLogs = await db.collection('users').doc(userDoc.id).collection('dailyLogs').get();
    console.log('Daily Logs:', dailyLogs.size, 'documents');
    if (dailyLogs.size > 0) {
      dailyLogs.docs.forEach(doc => {
        console.log('  -', doc.id, ':', JSON.stringify(doc.data()));
      });
    }
    
    const qHistory = await db.collection('users').doc(userDoc.id).collection('questionHistory').limit(10).get();
    console.log('Question History:', qHistory.size, 'documents');
    
    const sessions = await db.collection('users').doc(userDoc.id).collection('studySessions').limit(10).get();
    console.log('Study Sessions:', sessions.size, 'documents');
    
    console.log('\n=== DIAGNOSIS ===');
    if (!data.activeCourse) {
      console.log('⚠️ No course selected - dropped during course selection');
    } else if (!data.onboardingCompleted?.[data.activeCourse]) {
      console.log('⚠️ Selected', data.activeCourse.toUpperCase(), 'but did not complete onboarding');
      console.log('   Study plan exists:', !!data.studyPlans?.[data.activeCourse]);
      console.log('   Exam date set:', !!data.examDates?.[data.activeCourse]);
    } else if (dailyLogs.size === 0 && qHistory.size === 0) {
      console.log('⚠️ Completed onboarding but never studied');
    } else {
      console.log('✅ User has activity');
    }
  }
}

checkUserByEmail('ashlee_barrier@yahoo.com');
