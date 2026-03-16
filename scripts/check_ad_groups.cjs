
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkAdGroups() {
  console.log('Checking custom ad groups...');
  const snapshot = await db.collection('custom_ad_groups').get();
  
  if (snapshot.empty) {
    console.log('No custom ad groups found.');
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`\nAd Group: "${data.name}" (ID: ${doc.id})`);
    console.log(`Status: ${data.status}`);
    console.log(`Headlines: ${data.headlines?.length || 0}`);
    console.log(`Descriptions: ${data.descriptions?.length || 0}`);

    const invalidHeadlines = (data.headlines || []).filter(h => h.length > 30);
    const validHeadlines = (data.headlines || []).filter(h => h.length <= 30 && h.length > 0);
    
    const invalidDescriptions = (data.descriptions || []).filter(d => d.length > 90);
    const validDescriptions = (data.descriptions || []).filter(d => d.length <= 90 && d.length > 0);

    if (invalidHeadlines.length > 0) {
      console.log(`⚠️  ${invalidHeadlines.length} headlines are too long (>30 chars):`);
      invalidHeadlines.forEach(h => console.log(`   - "${h}" (${h.length} chars)`));
    }

    if (invalidDescriptions.length > 0) {
      console.log(`⚠️  ${invalidDescriptions.length} descriptions are too long (>90 chars):`);
      invalidDescriptions.forEach(d => console.log(`   - "${d}" (${d.length} chars)`));
    }

    if (validHeadlines.length < 3) {
      console.error(`❌  NOT ENOUGH VALID HEADLINES. Has ${validHeadlines.length}, needs 3. Ad will be skipped.`);
    }

    if (validDescriptions.length < 2) {
      console.error(`❌  NOT ENOUGH VALID DESCRIPTIONS. Has ${validDescriptions.length}, needs 2. Ad will be skipped.`);
    }

    if (validHeadlines.length >= 3 && validDescriptions.length >= 2) {
      console.log(`✅  Ad is valid (Headlines: ${validHeadlines.length}, Descriptions: ${validDescriptions.length})`);
    }
  });
}

checkAdGroups().catch(console.error).finally(() => process.exit());
