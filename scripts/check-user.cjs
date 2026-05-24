const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkUser(email) {
  console.log(`Searching for user with email: ${email}`);
  const snapshot = await db.collection('users').where('email', '==', email).get();

  if (snapshot.empty) {
    console.log('No user document found in Firestore users collection.');
  } else {
    snapshot.forEach(doc => {
      console.log(`Found User Document: ${doc.id}`);
      console.log(JSON.stringify(doc.data(), null, 2));
    });
  }
}

const email = process.argv[2] || 'aadhil90@gmail.com';
checkUser(email).then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
