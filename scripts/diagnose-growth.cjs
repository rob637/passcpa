const admin = require('firebase-admin');
admin.initializeApp({credential: admin.credential.cert(require('../serviceAccountKey.prod.json'))});
const db = admin.firestore();
(async () => {
  const snap = await db.collection('growth_content').where('status', '==', 'approved').limit(50).get();
  console.log('Approved query (limit 50) found:', snap.size);
  let withGenContent = 0, withoutGenContent = 0;
  const samples = [];
  snap.forEach(d => {
    const x = d.data();
    if (x.generatedContent) withGenContent++; else withoutGenContent++;
    if (samples.length < 3) {
      samples.push({
        id: d.id,
        slug: x.slug,
        approvedAt: x.approvedAt && x.approvedAt.toDate ? x.approvedAt.toDate().toISOString() : (x.approvedAt || '(none)'),
        hasContent: x.generatedContent ? true : false,
        wordCount: x.wordCount || 0,
      });
    }
  });
  console.log('With generatedContent:', withGenContent);
  console.log('Without generatedContent:', withoutGenContent);
  console.log('Sample:', JSON.stringify(samples, null, 2));
  const status = await db.collection('system_status').doc('growthAutoPublish').get();
  if (status.exists) {
    const d = status.data();
    console.log('---LAST RUN---');
    console.log('  status:', d.status);
    console.log('  lastRun:', d.lastRun && d.lastRun.toDate ? d.lastRun.toDate().toISOString() : d.lastRun);
    console.log('  details:', JSON.stringify(d.details || d.metadata || {}));
  } else {
    console.log('No function_status doc for growthAutoPublish');
  }
  process.exit(0);
})();
