/**
 * CISA Flashcards Index
 * Exports all CISA certification flashcards organized by domain
 */

import { cisa1Flashcards } from './cisa1-flashcards';
import { cisa1FlashcardsBatch2 } from './cisa1-flashcards-batch2';
import { cisa1FlashcardsBatch3 } from './cisa1-flashcards-batch3';
import { cisa2Flashcards } from './cisa2-flashcards';
import { cisa2FlashcardsBatch2 } from './cisa2-flashcards-batch2';
import { cisa2FlashcardsBatch3 } from './cisa2-flashcards-batch3';
import { cisa3Flashcards } from './cisa3-flashcards';
import { cisa3FlashcardsBatch2 } from './cisa3-flashcards-batch2';
import { cisa3FlashcardsBatch3 } from './cisa3-flashcards-batch3';
import { cisa4Flashcards } from './cisa4-flashcards';
import { cisa4FlashcardsBatch2 } from './cisa4-flashcards-batch2';
import { cisa4FlashcardsBatch3 } from './cisa4-flashcards-batch3';
import { cisa5Flashcards } from './cisa5-flashcards';
import { cisa5FlashcardsBatch2 } from './cisa5-flashcards-batch2';
import { cisa5FlashcardsBatch3 } from './cisa5-flashcards-batch3';
import { CISA_MNEMONICS } from './mnemonics';

// Export individual domain flashcards (including batch 2 and 3)
export { cisa1Flashcards } from './cisa1-flashcards';
export { cisa1FlashcardsBatch2 } from './cisa1-flashcards-batch2';
export { cisa1FlashcardsBatch3 } from './cisa1-flashcards-batch3';
export { cisa2Flashcards } from './cisa2-flashcards';
export { cisa2FlashcardsBatch2 } from './cisa2-flashcards-batch2';
export { cisa2FlashcardsBatch3 } from './cisa2-flashcards-batch3';
export { cisa3Flashcards } from './cisa3-flashcards';
export { cisa3FlashcardsBatch2 } from './cisa3-flashcards-batch2';
export { cisa3FlashcardsBatch3 } from './cisa3-flashcards-batch3';
export { cisa4Flashcards } from './cisa4-flashcards';
export { cisa4FlashcardsBatch2 } from './cisa4-flashcards-batch2';
export { cisa4FlashcardsBatch3 } from './cisa4-flashcards-batch3';
export { cisa5Flashcards } from './cisa5-flashcards';
export { cisa5FlashcardsBatch2 } from './cisa5-flashcards-batch2';
export { cisa5FlashcardsBatch3 } from './cisa5-flashcards-batch3';
export { CISA_MNEMONICS } from './mnemonics';

// Combined export of all CISA flashcards
export const allCisaFlashcards = [
  ...cisa1Flashcards,
  ...cisa1FlashcardsBatch2,
  ...cisa1FlashcardsBatch3,
  ...cisa2Flashcards,
  ...cisa2FlashcardsBatch2,
  ...cisa2FlashcardsBatch3,
  ...cisa3Flashcards,
  ...cisa3FlashcardsBatch2,
  ...cisa3FlashcardsBatch3,
  ...cisa4Flashcards,
  ...cisa4FlashcardsBatch2,
  ...cisa4FlashcardsBatch3,
  ...cisa5Flashcards,
  ...cisa5FlashcardsBatch2,
  ...cisa5FlashcardsBatch3,
  ...CISA_MNEMONICS,
];

export default allCisaFlashcards;
