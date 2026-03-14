/**
 * LinkedIn Posts Seeder
 * Run with: npx tsx scripts/seed_linkedin_posts.ts
 * 
 * This seeds the curated LinkedIn posts to Firestore.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, writeBatch, getDocs, Timestamp } from 'firebase/firestore';
import { LINKEDIN_POSTS } from '../src/data/linkedin-posts';

// Firebase config - ensure these match your environment
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyA4YQJ-XyJgQ1-r_xqt4eM-N1Sd05Yv9ak",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "passcpa-dev.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "passcpa-dev",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "passcpa-dev.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "592178009498",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:592178009498:web:c1d5a12b9e3ff9b53a53e7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedLinkedInPosts() {
  console.log(`Starting seed for ${LINKEDIN_POSTS.length} LinkedIn posts...`);
  
  const postsCollection = collection(db, 'linkedin_story_posts');
  
  // Optional: clear existing posts to avoid duplicates if re-running
  // Using a batch delete
  const snapshot = await getDocs(postsCollection);
  if (!snapshot.empty) {
    console.log(`Found ${snapshot.size} existing posts. Clearing...`);
    const deleteBatch = writeBatch(db);
    snapshot.docs.forEach((doc) => {
      deleteBatch.delete(doc.ref);
    });
    await deleteBatch.commit();
    console.log('Cleared existing posts.');
  }

  // Add new posts in batches of 500
  const batch = writeBatch(db);
  let count = 0;

  for (const post of LINKEDIN_POSTS) {
    const newDocRef = doc(postsCollection); // Auto-ID
    
    batch.set(newDocRef, {
      content: post.content,
      type: post.type,
      author: post.author,
      exam: post.exam || null,
      status: 'draft',
      scheduledFor: null,
      createdAt: Timestamp.now(),
      // Add a flag to identify seeded posts easily
      isSeeded: true
    });
    
    count++;
  }

  await batch.commit();
  console.log(`Successfully seeded ${count} posts.`);
}

seedLinkedInPosts()
  .then(() => {
    console.log('Done.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error seeding posts:', err);
    process.exit(1);
  });
