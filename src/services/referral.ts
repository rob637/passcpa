/**
 * Referral Service
 * 
 * Minimal, non-intrusive referral system:
 * - Auto-generates unique referral code on first access
 * - Tracks referrals in Firestore
 * - Extended trial for referred users (30 days instead of 14)
 * 
 * Touch points:
 * - Settings → "Invite Friends"
 * - Achievement share cards
 * - "I Passed" celebration
 */

import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import logger from '../utils/logger';

// Referral code format: 6 alphanumeric characters
const REFERRAL_CODE_LENGTH = 6;
const REFERRAL_CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1 to avoid confusion

/**
 * Generate a random referral code
 */
function generateReferralCode(): string {
  let code = '';
  for (let i = 0; i < REFERRAL_CODE_LENGTH; i++) {
    code += REFERRAL_CODE_CHARS.charAt(Math.floor(Math.random() * REFERRAL_CODE_CHARS.length));
  }
  return code;
}

/**
 * Referral data stored in user profile
 */
export interface ReferralData {
  code: string;
  createdAt: Date;
  referredBy?: string; // Code of the user who referred them
  referralCount: number; // Number of users they've referred
  referralRewards: number; // Number of free months earned
}

/**
 * Get or create referral code for a user
 */
export async function getOrCreateReferralCode(userId: string): Promise<string> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists() && userDoc.data().referralCode) {
      return userDoc.data().referralCode;
    }

    // Generate new unique code
    let code = generateReferralCode();
    let attempts = 0;
    const maxAttempts = 10;

    // Check for collisions (rare but possible)
    while (attempts < maxAttempts) {
      const existing = await getReferralCodeOwner(code);
      if (!existing) break;
      code = generateReferralCode();
      attempts++;
    }

    // Save to user profile
    await updateDoc(userRef, {
      referralCode: code,
      referralCount: 0,
      referralRewards: 0,
      referralCodeCreatedAt: serverTimestamp(),
    });

    logger.debug('Created referral code:', code);
    return code;
  } catch (error) {
    logger.error('Error creating referral code:', error);
    throw error;
  }
}

/**
 * Get the user ID who owns a referral code
 */
export async function getReferralCodeOwner(code: string): Promise<string | null> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('referralCode', '==', code.toUpperCase()));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    return snapshot.docs[0].id;
  } catch (error) {
    logger.error('Error looking up referral code:', error);
    return null;
  }
}

/**
 * Apply a referral code when a new user signs up
 * Returns the referrer's user ID if successful
 */
export async function applyReferralCode(newUserId: string, referralCode: string): Promise<string | null> {
  try {
    const code = referralCode.toUpperCase().trim();
    const referrerId = await getReferralCodeOwner(code);
    
    if (!referrerId) {
      logger.warn('Invalid referral code:', code);
      return null;
    }

    // Can't refer yourself
    if (referrerId === newUserId) {
      logger.warn('User tried to use their own referral code');
      return null;
    }

    // Update new user's profile to record who referred them
    const newUserRef = doc(db, 'users', newUserId);
    await updateDoc(newUserRef, {
      referredBy: code,
      referredByUserId: referrerId,
      referredAt: serverTimestamp(),
    });

    // Record the referral for tracking
    // Note: referralCount is computed from this collection in getReferralStats
    await setDoc(doc(db, 'referrals', `${referrerId}_${newUserId}`), {
      referrerId,
      referredUserId: newUserId,
      code,
      createdAt: serverTimestamp(),
      converted: false, // True when referred user subscribes
    });

    logger.info('Referral applied:', { referrerId, newUserId, code });
    return referrerId;
  } catch (error) {
    logger.error('Error applying referral code:', error);
    return null;
  }
}

/**
 * Get referral stats for a user
 * Counts referrals from the referrals collection rather than user profile
 */
export async function getReferralStats(userId: string): Promise<{
  code: string;
  referralCount: number;
  referralRewards: number;
}> {
  try {
    const code = await getOrCreateReferralCode(userId);
    
    // Count referrals from the referrals collection
    const referralsQuery = query(
      collection(db, 'referrals'),
      where('referrerId', '==', userId)
    );
    const referralsSnap = await getDocs(referralsQuery);
    const referralCount = referralsSnap.size;
    
    // Count conversions (referrals that subscribed)
    const conversions = referralsSnap.docs.filter(d => d.data().converted).length;
    
    return {
      code,
      referralCount,
      referralRewards: conversions,
    };
  } catch (error) {
    logger.error('Error getting referral stats:', error);
    return { code: '', referralCount: 0, referralRewards: 0 };
  }
}

/**
 * Generate a shareable referral URL
 */
export function getReferralUrl(code: string, courseId?: string): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://voraprep.com';
  const path = courseId ? `/${courseId}` : '';
  return `${baseUrl}${path}?ref=${code}`;
}

/**
 * Generate share text for referral
 */
export function getReferralShareText(code: string, courseId?: string): {
  title: string;
  text: string;
  url: string;
} {
  const examName = courseId?.toUpperCase() || 'professional certification';
  const url = getReferralUrl(code, courseId);
  
  return {
    title: 'Study with me on VoraPrep!',
    text: `I'm using VoraPrep to study for the ${examName} exam. It's an AI-powered study platform that's way more affordable than Becker. Use my link to get an extended 30-day free trial!`,
    url,
  };
}

/**
 * Share via Web Share API (mobile) or copy to clipboard (desktop)
 */
export async function shareReferralLink(
  code: string, 
  courseId?: string
): Promise<{ method: 'native' | 'clipboard'; success: boolean }> {
  const { title, text, url } = getReferralShareText(code, courseId);
  
  // Try native share first (mobile)
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return { method: 'native', success: true };
    } catch (error) {
      // User cancelled or share failed
      if ((error as Error).name === 'AbortError') {
        return { method: 'native', success: false };
      }
    }
  }
  
  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(`${text}\n\n${url}`);
    return { method: 'clipboard', success: true };
  } catch {
    return { method: 'clipboard', success: false };
  }
}

/**
 * Check if current URL has a referral code and store it
 */
export function captureReferralFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const refCode = params.get('ref');
  
  if (refCode) {
    // Store in localStorage to apply after registration
    localStorage.setItem('pendingReferral', refCode.toUpperCase());
    return refCode.toUpperCase();
  }
  
  return null;
}

/**
 * Get and clear pending referral code from localStorage
 */
export function getPendingReferral(): string | null {
  if (typeof localStorage === 'undefined') return null;
  
  const code = localStorage.getItem('pendingReferral');
  if (code) {
    localStorage.removeItem('pendingReferral');
  }
  return code;
}

export default {
  getOrCreateReferralCode,
  getReferralCodeOwner,
  applyReferralCode,
  getReferralStats,
  getReferralUrl,
  getReferralShareText,
  shareReferralLink,
  captureReferralFromUrl,
  getPendingReferral,
};
