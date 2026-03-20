#!/usr/bin/env node
/**
 * Upload YouTube Shorts from local pending folder to Firebase Storage
 * 
 * Usage:
 *   node upload-shorts.js                    # Upload all pending videos
 *   node upload-shorts.js video.mp4          # Upload specific video
 *   node upload-shorts.js --list             # List pending videos
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('Error: serviceAccountKey.json not found');
  console.error('Download it from Firebase Console > Project Settings > Service Accounts');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: `${serviceAccount.project_id}.appspot.com`,
});

const bucket = getStorage().bucket();
const PENDING_DIR = path.join(__dirname, 'pending');
const UPLOADED_DIR = path.join(__dirname, 'uploaded');

async function listPending() {
  const files = fs.readdirSync(PENDING_DIR).filter(f => f.endsWith('.mp4'));
  if (files.length === 0) {
    console.log('No pending videos found.');
    console.log(`Place .mp4 files in: ${PENDING_DIR}`);
    return [];
  }
  console.log(`Found ${files.length} pending video(s):`);
  files.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  return files;
}

async function uploadVideo(filename) {
  const localPath = path.join(PENDING_DIR, filename);
  const storagePath = `shorts/pending/${filename}`;
  
  if (!fs.existsSync(localPath)) {
    console.error(`File not found: ${localPath}`);
    return false;
  }
  
  console.log(`Uploading ${filename}...`);
  
  try {
    await bucket.upload(localPath, {
      destination: storagePath,
      metadata: {
        contentType: 'video/mp4',
      },
    });
    
    console.log(`✓ Uploaded to gs://${bucket.name}/${storagePath}`);
    
    // Move to uploaded folder locally
    if (!fs.existsSync(UPLOADED_DIR)) {
      fs.mkdirSync(UPLOADED_DIR, { recursive: true });
    }
    fs.renameSync(localPath, path.join(UPLOADED_DIR, filename));
    console.log(`✓ Moved to uploaded/`);
    
    // Also upload metadata if exists
    const metaPath = localPath.replace('.mp4', '.json');
    if (fs.existsSync(metaPath)) {
      await bucket.upload(metaPath, {
        destination: storagePath.replace('.mp4', '.json'),
        metadata: { contentType: 'application/json' },
      });
      fs.renameSync(metaPath, path.join(UPLOADED_DIR, path.basename(metaPath)));
      console.log(`✓ Uploaded metadata`);
    }
    
    return true;
  } catch (error) {
    console.error(`✗ Upload failed: ${error.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--list') || args.includes('-l')) {
    await listPending();
    return;
  }
  
  if (args.length > 0 && !args[0].startsWith('-')) {
    // Upload specific file
    await uploadVideo(args[0]);
    return;
  }
  
  // Upload all pending
  const files = await listPending();
  if (files.length === 0) return;
  
  console.log('\nUploading all...\n');
  let success = 0;
  for (const file of files) {
    if (await uploadVideo(file)) success++;
    console.log('');
  }
  
  console.log(`Done! ${success}/${files.length} uploaded.`);
}

main().catch(console.error);
