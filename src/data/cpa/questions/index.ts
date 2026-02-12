// Question Bank Index
// Consolidates all section questions for easy import
// 2024+ CPA Evolution: Core (FAR, AUD, REG) + Disciplines (BAR, ISC, TCP)
// BEC was retired December 15, 2023 - content migrated to relevant sections

import { REG_QUESTIONS } from './reg-questions';
import { FAR_QUESTIONS } from './far-questions';
import { AUD_QUESTIONS } from './aud-questions';

// 2024+ CPA Evolution Disciplines (replaced BEC)
import { BAR_QUESTIONS } from './bar-questions';
import { ISC_QUESTIONS } from './isc-questions';
import { TCP_QUESTIONS } from './tcp-questions';

// Extended question banks
import { REG_QUESTIONS_EXTENDED } from './reg-questions-extended';
import { ExamSection, Difficulty, normalizeDifficulty } from '../../../types';
import { FAR_QUESTIONS_EXTENDED } from './far-questions-extended';
import { AUD_QUESTIONS_EXTENDED } from './aud-questions-extended';

// Extended banks for new disciplines (2024+ CPA Evolution)
import { TCP_QUESTIONS_EXTENDED } from './tcp-questions-extended';
import { ISC_QUESTIONS_EXTENDED } from './isc-questions-extended';
import { BAR_QUESTIONS_EXTENDED } from './bar-questions-extended';

// Extra question banks (Sprint 5 expansion)
import { REG_QUESTIONS_EXTRA } from './reg-questions-extra';
import { FAR_QUESTIONS_EXTRA } from './far-questions-extra';
import { AUD_QUESTIONS_EXTRA } from './aud-questions-extra';

// Additional question banks (World-Class expansion)
import { REG_QUESTIONS_ADDITIONAL } from './reg-questions-additional';
import { FAR_QUESTIONS_ADDITIONAL } from './far-questions-additional';
import { AUD_QUESTIONS_ADDITIONAL } from './aud-questions-additional';
import { BAR_QUESTIONS_ADDITIONAL } from './bar-questions-additional';
import { ISC_QUESTIONS_ADDITIONAL } from './isc-questions-additional';
import { TCP_QUESTIONS_ADDITIONAL } from './tcp-questions-additional';

// Expanded question banks (World-Class expansion - batch 2)
import { REG_QUESTIONS_EXPANDED } from './reg-questions-expanded';
import { FAR_QUESTIONS_EXPANDED as FAR_QUESTIONS_EXPANDED_2 } from './far-questions-expanded';
import { AUD_QUESTIONS_EXPANDED as AUD_QUESTIONS_EXPANDED_2 } from './aud-questions-expanded';
import { BAR_QUESTIONS_EXPANDED } from './bar-questions-expanded';
import { ISC_QUESTIONS_EXPANDED as ISC_QUESTIONS_EXPANDED_2 } from './isc-questions-expanded';
import { TCP_QUESTIONS_EXPANDED as TCP_QUESTIONS_EXPANDED_2 } from './tcp-questions-expanded';

// Comprehensive question banks (World-Class expansion - final batch)
import { REG_QUESTIONS_COMPREHENSIVE } from './reg-questions-comprehensive';
import { FAR_QUESTIONS_COMPREHENSIVE } from './far-questions-comprehensive';
import { AUD_QUESTIONS_COMPREHENSIVE } from './aud-questions-comprehensive';
import { BAR_QUESTIONS_COMPREHENSIVE } from './bar-questions-comprehensive';
import { ISC_QUESTIONS_COMPREHENSIVE } from './isc-questions-comprehensive';
import { TCP_QUESTIONS_COMPREHENSIVE } from './tcp-questions-comprehensive';

// Mastery question banks (World-Class expansion - expert level)
import { REG_QUESTIONS_MASTERY } from './reg-questions-mastery';
import { FAR_QUESTIONS_MASTERY } from './far-questions-mastery';
import { AUD_QUESTIONS_MASTERY } from './aud-questions-mastery';
import { BAR_QUESTIONS_MASTERY } from './bar-questions-mastery';
import { ISC_QUESTIONS_MASTERY } from './isc-questions-mastery';
import { TCP_QUESTIONS_MASTERY } from './tcp-questions-mastery';

// Elite question banks (World-Class expansion - final push to 2500+)
import { REG_QUESTIONS_ELITE } from './reg-questions-elite';
import { FAR_QUESTIONS_ELITE } from './far-questions-elite';
import { AUD_QUESTIONS_ELITE } from './aud-questions-elite';
import { BAR_QUESTIONS_ELITE } from './bar-questions-elite';
import { ISC_QUESTIONS_ELITE } from './isc-questions-elite';
import { TCP_QUESTIONS_ELITE } from './tcp-questions-elite';

// Quality Sprint: Coverage gap and difficulty balance improvements
import { FAR_QUESTIONS_GOVT } from './far-questions-govt';
import { AUD_QUESTIONS_REPORTING } from './aud-questions-reporting';
import { BAR_QUESTIONS_PLANNING } from './bar-questions-planning';
import { EASY_QUESTIONS } from './easy-questions';
import { EASY_QUESTIONS_EXPANDED } from './easy-questions-expanded';
import { EASY_QUESTIONS_EXPANDED_2 } from './easy-questions-expanded-2';
import { TCP_EASY_QUESTIONS, BAR_EASY_QUESTIONS, ISC_EASY_QUESTIONS } from './easy-questions-tcp-bar-isc';
import { FAR_EASY_QUESTIONS_SPRINT, AUD_EASY_QUESTIONS_SPRINT, REG_EASY_QUESTIONS_SPRINT } from './easy-questions-far-aud-reg';

// Blueprint gap fill questions (AUD-VII, ISC-V)
import { AUD_VII_GAP_QUESTIONS, ISC_V_GAP_QUESTIONS } from './blueprint-gap-fill';

// Depth expansion: TCP batches 1-4 (100 questions)
import { TCP_QUESTIONS_DEPTH_1 } from './tcp-questions-depth';
import { TCP_QUESTIONS_DEPTH_2 } from './tcp-questions-depth-2';
import { TCP_QUESTIONS_DEPTH_3 } from './tcp-questions-depth-3';
import { TCP_QUESTIONS_DEPTH_4 } from './tcp-questions-depth-4';

// Depth expansion: ISC batches 1-4 (100 questions)
import { ISC_QUESTIONS_DEPTH_1 } from './isc-questions-depth';
import { ISC_QUESTIONS_DEPTH_2 } from './isc-questions-depth-2';
import { ISC_QUESTIONS_DEPTH_3 } from './isc-questions-depth-3';
import { ISC_QUESTIONS_DEPTH_4 } from './isc-questions-depth-4';

// World-Class Sprint: Exam-quality MCQs with detailed explanations
import { FAR_QUESTIONS_WORLD_CLASS } from './far-questions-world-class';
import { AUD_QUESTIONS_WORLD_CLASS } from './aud-questions-world-class';
import { REG_QUESTIONS_WORLD_CLASS } from './reg-questions-world-class';
import { TCP_QUESTIONS_WORLD_CLASS } from './tcp-questions-world-class';
import { BAR_QUESTIONS_WORLD_CLASS } from './bar-questions-world-class';
import { ISC_QUESTIONS_WORLD_CLASS } from './isc-questions-world-class';

// World-Class Batch 2: Additional exam-quality MCQs across all sections
import {
  FAR_WORLD_CLASS_BATCH_2,
  AUD_WORLD_CLASS_BATCH_2,
  REG_WORLD_CLASS_BATCH_2,
  BAR_WORLD_CLASS_BATCH_2,
  ISC_WORLD_CLASS_BATCH_2,
  TCP_WORLD_CLASS_BATCH_2,
} from './world-class-questions-batch-2';

// World-Class Batches 3-10: Continuing exam-quality MCQs expansion
import { WORLD_CLASS_BATCH_3 } from './world-class-batch-3';
import { WORLD_CLASS_BATCH_4 } from './world-class-batch-4';
import { WORLD_CLASS_BATCH_5 } from './world-class-batch-5';
import { WORLD_CLASS_BATCH_6 } from './world-class-batch-6';
import { WORLD_CLASS_BATCH_7 } from './world-class-batch-7';
import { WORLD_CLASS_BATCH_8 } from './world-class-batch-8';
import { WORLD_CLASS_BATCH_9 } from './world-class-batch-9';
import { WORLD_CLASS_BATCH_10 } from './world-class-batch-10';

// World-Class Batches 11-15: Additional exam-quality MCQs
import { WORLD_CLASS_BATCH_11 } from './world-class-batch-11';
import { WORLD_CLASS_BATCH_12 } from './world-class-batch-12';
import { WORLD_CLASS_BATCH_13 } from './world-class-batch-13';
import { WORLD_CLASS_BATCH_14 } from './world-class-batch-14';
import { WORLD_CLASS_BATCH_15 } from './world-class-batch-15';

// World-Class Batches 16-20: Continuing exam-quality MCQs expansion
import { WORLD_CLASS_BATCH_16 } from './world-class-batch-16';
import { WORLD_CLASS_BATCH_17 } from './world-class-batch-17';
import { WORLD_CLASS_BATCH_18 } from './world-class-batch-18';
import { WORLD_CLASS_BATCH_19 } from './world-class-batch-19';
import { WORLD_CLASS_BATCH_20 } from './world-class-batch-20';

// World-Class Batches 21-25: Continuing exam-quality MCQs expansion
import { WORLD_CLASS_BATCH_21 } from './world-class-batch-21';
import { WORLD_CLASS_BATCH_22 } from './world-class-batch-22';
import { WORLD_CLASS_BATCH_23 } from './world-class-batch-23';
import { WORLD_CLASS_BATCH_24 } from './world-class-batch-24';
import { WORLD_CLASS_BATCH_25 } from './world-class-batch-25';

// World-Class Batches 26-30: Continuing exam-quality MCQs expansion
import { WORLD_CLASS_BATCH_26 } from './world-class-batch-26';
import { WORLD_CLASS_BATCH_27 } from './world-class-batch-27';
import { WORLD_CLASS_BATCH_28 } from './world-class-batch-28';
import { WORLD_CLASS_BATCH_29 } from './world-class-batch-29';
import { WORLD_CLASS_BATCH_30 } from './world-class-batch-30';

// World-Class Batches 31-35: Continuing exam-quality MCQs expansion
import { WORLD_CLASS_BATCH_31 } from './world-class-batch-31';
import { WORLD_CLASS_BATCH_32 } from './world-class-batch-32';
import { WORLD_CLASS_BATCH_33 } from './world-class-batch-33';
import { WORLD_CLASS_BATCH_34 } from './world-class-batch-34';
import { WORLD_CLASS_BATCH_35 } from './world-class-batch-35';

// World-Class Batches 36-40: Continuing exam-quality MCQs expansion
import { WORLD_CLASS_BATCH_36 } from './world-class-batch-36';
import { WORLD_CLASS_BATCH_37 } from './world-class-batch-37';
import { WORLD_CLASS_BATCH_38 } from './world-class-batch-38';
import { WORLD_CLASS_BATCH_39 } from './world-class-batch-39';
import { WORLD_CLASS_BATCH_40 } from './world-class-batch-40';

// World-Class Batches 41-42: Final exam-quality MCQs expansion
import { WORLD_CLASS_BATCH_41 } from './world-class-batch-41';
import { WORLD_CLASS_BATCH_42 } from './world-class-batch-42';

// Depth Expansion: BAR
import { BAR_QUESTIONS_DEPTH_1 } from './bar-questions-depth';
import { BAR_QUESTIONS_DEPTH_2 } from './bar-questions-depth-2';
import { BAR_QUESTIONS_DEPTH_3 } from './bar-questions-depth-3';
import { BAR_QUESTIONS_DEPTH_4 } from './bar-questions-depth-4';

// Depth Expansion: REG
import { REG_QUESTIONS_DEPTH_1 } from './reg-questions-depth';
import { REG_QUESTIONS_DEPTH_2 } from './reg-questions-depth-2';
import { REG_QUESTIONS_DEPTH_3 } from './reg-questions-depth-3';
import { REG_QUESTIONS_DEPTH_4 } from './reg-questions-depth-4';

// Depth Expansion: AUD
import { AUD_QUESTIONS_DEPTH_1 } from './aud-questions-depth';
import { AUD_QUESTIONS_DEPTH_2 } from './aud-questions-depth-2';
import { AUD_QUESTIONS_DEPTH_3 } from './aud-questions-depth-3';
import { AUD_QUESTIONS_DEPTH_4 } from './aud-questions-depth-4';

// Depth Expansion: FAR
import { FAR_QUESTIONS_DEPTH_1 } from './far-questions-depth';
import { FAR_QUESTIONS_DEPTH_2 } from './far-questions-depth-2';
import { FAR_QUESTIONS_DEPTH_3 } from './far-questions-depth-3';
import { FAR_QUESTIONS_DEPTH_4 } from './far-questions-depth-4';

// Combine all easy questions for filtering
const ALL_EASY_QUESTIONS = [...EASY_QUESTIONS, ...EASY_QUESTIONS_EXPANDED, ...EASY_QUESTIONS_EXPANDED_2, ...TCP_EASY_QUESTIONS, ...BAR_EASY_QUESTIONS, ...ISC_EASY_QUESTIONS, ...FAR_EASY_QUESTIONS_SPRINT, ...AUD_EASY_QUESTIONS_SPRINT, ...REG_EASY_QUESTIONS_SPRINT];

// Combined section questions (original + extended + extra + additional + expanded + comprehensive + mastery + elite + quality sprint + world-class + batches 2-15)
export const REG_ALL = [...REG_QUESTIONS, ...REG_QUESTIONS_EXTENDED, ...REG_QUESTIONS_EXTRA, ...REG_QUESTIONS_ADDITIONAL, ...REG_QUESTIONS_EXPANDED, ...REG_QUESTIONS_COMPREHENSIVE, ...REG_QUESTIONS_MASTERY, ...REG_QUESTIONS_ELITE, ...REG_QUESTIONS_WORLD_CLASS, ...REG_WORLD_CLASS_BATCH_2, ...REG_QUESTIONS_DEPTH_1, ...REG_QUESTIONS_DEPTH_2, ...REG_QUESTIONS_DEPTH_3, ...REG_QUESTIONS_DEPTH_4, ...WORLD_CLASS_BATCH_3.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_4.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_5.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_6.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_7.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_8.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_9.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_10.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_11.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_12.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_13.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_14.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_15.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_16.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_17.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_18.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_19.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_20.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_21.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_22.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_23.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_24.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_25.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_26.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_27.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_28.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_29.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_30.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_31.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_32.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_33.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_34.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_35.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_36.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_37.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_38.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_39.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_40.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_41.filter(q => q.section === 'REG'), ...WORLD_CLASS_BATCH_42.filter(q => q.section === 'REG'), ...ALL_EASY_QUESTIONS.filter(q => q.section === 'REG')];
export const FAR_ALL = [...FAR_QUESTIONS, ...FAR_QUESTIONS_EXTENDED, ...FAR_QUESTIONS_EXTRA, ...FAR_QUESTIONS_ADDITIONAL, ...FAR_QUESTIONS_EXPANDED_2, ...FAR_QUESTIONS_COMPREHENSIVE, ...FAR_QUESTIONS_MASTERY, ...FAR_QUESTIONS_ELITE, ...FAR_QUESTIONS_GOVT, ...FAR_QUESTIONS_WORLD_CLASS, ...FAR_WORLD_CLASS_BATCH_2, ...FAR_QUESTIONS_DEPTH_1, ...FAR_QUESTIONS_DEPTH_2, ...FAR_QUESTIONS_DEPTH_3, ...FAR_QUESTIONS_DEPTH_4, ...WORLD_CLASS_BATCH_3.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_4.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_5.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_6.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_7.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_8.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_9.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_10.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_11.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_12.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_13.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_14.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_15.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_16.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_17.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_18.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_19.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_20.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_21.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_22.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_23.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_24.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_25.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_26.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_27.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_28.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_29.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_30.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_31.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_32.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_33.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_34.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_35.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_36.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_37.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_38.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_39.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_40.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_41.filter(q => q.section === 'FAR'), ...WORLD_CLASS_BATCH_42.filter(q => q.section === 'FAR'), ...ALL_EASY_QUESTIONS.filter(q => q.section === 'FAR')];
export const AUD_ALL = [...AUD_QUESTIONS, ...AUD_QUESTIONS_EXTENDED, ...AUD_QUESTIONS_EXTRA, ...AUD_QUESTIONS_ADDITIONAL, ...AUD_QUESTIONS_EXPANDED_2, ...AUD_QUESTIONS_COMPREHENSIVE, ...AUD_QUESTIONS_MASTERY, ...AUD_QUESTIONS_ELITE, ...AUD_QUESTIONS_REPORTING, ...AUD_VII_GAP_QUESTIONS, ...AUD_QUESTIONS_WORLD_CLASS, ...AUD_WORLD_CLASS_BATCH_2, ...AUD_QUESTIONS_DEPTH_1, ...AUD_QUESTIONS_DEPTH_2, ...AUD_QUESTIONS_DEPTH_3, ...AUD_QUESTIONS_DEPTH_4, ...WORLD_CLASS_BATCH_3.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_4.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_5.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_6.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_7.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_8.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_9.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_10.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_11.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_12.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_13.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_14.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_15.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_16.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_17.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_18.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_19.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_20.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_21.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_22.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_23.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_24.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_25.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_26.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_27.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_28.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_29.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_30.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_31.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_32.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_33.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_34.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_35.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_36.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_37.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_38.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_39.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_40.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_41.filter(q => q.section === 'AUD'), ...WORLD_CLASS_BATCH_42.filter(q => q.section === 'AUD'), ...ALL_EASY_QUESTIONS.filter(q => q.section === 'AUD')];

// New discipline question banks (2024+ CPA Evolution)
export const BAR_ALL = [...BAR_QUESTIONS, ...BAR_QUESTIONS_EXTENDED, ...BAR_QUESTIONS_ADDITIONAL, ...BAR_QUESTIONS_EXPANDED, ...BAR_QUESTIONS_COMPREHENSIVE, ...BAR_QUESTIONS_MASTERY, ...BAR_QUESTIONS_ELITE, ...BAR_QUESTIONS_PLANNING, ...BAR_QUESTIONS_WORLD_CLASS, ...BAR_WORLD_CLASS_BATCH_2, ...BAR_QUESTIONS_DEPTH_1, ...BAR_QUESTIONS_DEPTH_2, ...BAR_QUESTIONS_DEPTH_3, ...BAR_QUESTIONS_DEPTH_4, ...WORLD_CLASS_BATCH_3.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_4.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_5.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_6.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_7.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_8.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_9.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_10.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_11.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_12.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_13.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_14.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_15.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_16.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_17.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_18.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_19.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_20.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_21.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_22.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_23.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_24.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_25.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_26.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_27.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_28.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_29.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_30.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_31.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_32.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_33.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_34.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_35.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_36.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_37.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_38.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_39.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_40.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_41.filter(q => q.section === 'BAR'), ...WORLD_CLASS_BATCH_42.filter(q => q.section === 'BAR'), ...ALL_EASY_QUESTIONS.filter(q => q.section === 'BAR')];
export const ISC_ALL = [...ISC_QUESTIONS, ...ISC_QUESTIONS_EXTENDED, ...ISC_QUESTIONS_ADDITIONAL, ...ISC_QUESTIONS_EXPANDED_2, ...ISC_QUESTIONS_COMPREHENSIVE, ...ISC_QUESTIONS_MASTERY, ...ISC_QUESTIONS_ELITE, ...ISC_V_GAP_QUESTIONS, ...ISC_QUESTIONS_WORLD_CLASS, ...ISC_WORLD_CLASS_BATCH_2, ...ISC_QUESTIONS_DEPTH_1, ...ISC_QUESTIONS_DEPTH_2, ...ISC_QUESTIONS_DEPTH_3, ...ISC_QUESTIONS_DEPTH_4, ...WORLD_CLASS_BATCH_3.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_4.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_5.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_6.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_7.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_8.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_9.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_10.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_11.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_12.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_13.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_14.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_15.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_16.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_17.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_18.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_19.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_20.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_21.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_22.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_23.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_24.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_25.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_26.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_27.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_28.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_29.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_30.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_31.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_32.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_33.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_34.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_35.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_36.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_37.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_38.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_39.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_40.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_41.filter(q => q.section === 'ISC'), ...WORLD_CLASS_BATCH_42.filter(q => q.section === 'ISC'), ...ALL_EASY_QUESTIONS.filter(q => q.section === 'ISC')];
export const TCP_ALL = [...TCP_QUESTIONS, ...TCP_QUESTIONS_EXTENDED, ...TCP_QUESTIONS_ADDITIONAL, ...TCP_QUESTIONS_EXPANDED_2, ...TCP_QUESTIONS_COMPREHENSIVE, ...TCP_QUESTIONS_MASTERY, ...TCP_QUESTIONS_ELITE, ...TCP_QUESTIONS_WORLD_CLASS, ...TCP_WORLD_CLASS_BATCH_2, ...TCP_QUESTIONS_DEPTH_1, ...TCP_QUESTIONS_DEPTH_2, ...TCP_QUESTIONS_DEPTH_3, ...TCP_QUESTIONS_DEPTH_4, ...WORLD_CLASS_BATCH_3.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_4.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_5.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_6.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_7.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_8.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_9.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_10.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_11.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_12.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_13.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_14.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_15.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_16.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_17.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_18.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_19.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_20.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_21.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_22.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_23.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_24.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_25.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_26.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_27.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_28.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_29.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_30.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_31.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_32.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_33.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_34.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_35.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_36.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_37.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_38.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_39.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_40.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_41.filter(q => q.section === 'TCP'), ...WORLD_CLASS_BATCH_42.filter(q => q.section === 'TCP'), ...ALL_EASY_QUESTIONS.filter(q => q.section === 'TCP')];

// Combined question bank (Core + Disciplines)
export const ALL_QUESTIONS = [
  ...REG_ALL, 
  ...FAR_ALL, 
  ...AUD_ALL, 
  ...BAR_ALL, 
  ...ISC_ALL, 
  ...TCP_ALL
];

// Export by section (original only for backward compatibility)
export { REG_QUESTIONS, FAR_QUESTIONS, AUD_QUESTIONS };

// Export new disciplines
export { BAR_QUESTIONS, ISC_QUESTIONS, TCP_QUESTIONS };

// Export extended
export {
  REG_QUESTIONS_EXTENDED,
  FAR_QUESTIONS_EXTENDED,
  AUD_QUESTIONS_EXTENDED,
};

// Export extra (Sprint 5)
export { REG_QUESTIONS_EXTRA, FAR_QUESTIONS_EXTRA, AUD_QUESTIONS_EXTRA };

// Get questions by section (uses full question banks)
export const getQuestionsBySection = (section: ExamSection) => {
  switch (section) {
    case 'REG':
      return REG_ALL;
    case 'FAR':
      return FAR_ALL;
    case 'AUD':
      return AUD_ALL;
    case 'BAR':
      return BAR_ALL;
    case 'ISC':
      return ISC_ALL;
    case 'TCP':
      return TCP_ALL;
    default:
      return [];
  }
};

// Get questions by topic
export const getQuestionsByTopic = (topicId: string) => {
  return ALL_QUESTIONS.filter((q) => q.topicId === topicId);
};

// Get questions by difficulty (handles normalized difficulty matching)
export const getQuestionsByDifficulty = (difficulty: Difficulty) => {
  const normalized = normalizeDifficulty(difficulty);
  return ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === normalized);
};

// Get random questions
export const getRandomQuestions = (count: number, section: ExamSection | null = null) => {
  const pool = section ? getQuestionsBySection(section) : ALL_QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get question statistics
export const getQuestionStats = () => {
  const stats = {
    total: ALL_QUESTIONS.length,
    bySection: {
      // Core sections
      REG: REG_ALL.length,
      FAR: FAR_ALL.length,
      AUD: AUD_ALL.length,
      // Discipline sections (2024+ CPA Evolution)
      BAR: BAR_ALL.length,
      ISC: ISC_ALL.length,
      TCP: TCP_ALL.length,
    },
    byDifficulty: {
      easy: ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'easy').length,
      medium: ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'medium').length,
      hard: ALL_QUESTIONS.filter((q) => normalizeDifficulty(q.difficulty) === 'hard').length,
    },
    topics: [...new Set(ALL_QUESTIONS.map((q) => q.topic))].length,
  };
  return stats;
};

export default ALL_QUESTIONS;
