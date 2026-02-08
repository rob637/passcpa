/**
 * CIA Part 1: GIAS 2024 Flashcards
 * 
 * Flashcards specifically covering the Global Internal Audit Standards 2024
 * Effective January 9, 2025 - critical exam update
 */

export interface CIA1_GIAS_Flashcard {
  id: string;
  section: 'CIA1' | 'CIA2' | 'CIA3';
  type: 'definition' | 'standard' | 'formula' | 'concept' | 'mnemonic' | 'comparison';
  topic: string;
  subtopic: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  reference?: string;
}

export const CIA1_GIAS_2024_FLASHCARDS: CIA1_GIAS_Flashcard[] = [
  // ============================================================================
  // GIAS 2024 FRAMEWORK BASICS
  // ============================================================================
  {
    id: 'cia1-gias-fc-001',
    section: 'CIA1',
    type: 'definition',
    topic: 'GIAS 2024',
    subtopic: 'Effective Date',
    front: 'When did the Global Internal Audit Standards (GIAS) 2024 become effective?',
    back: 'January 9, 2025. GIAS 2024 replaces the previous International Professional Practices Framework (IPPF) as the mandatory standards for internal auditors worldwide.',
    difficulty: 'easy',
    tags: ['GIAS 2024', 'effective date', 'standards'],
    reference: 'GIAS 2024'
  },
  {
    id: 'cia1-gias-fc-002',
    section: 'CIA1',
    type: 'mnemonic',
    topic: 'GIAS 2024',
    subtopic: 'Five Domains',
    front: 'What mnemonic helps you remember the 5 GIAS 2024 Domains?',
    back: 'PEGMP:\n• P - Purpose of Internal Auditing\n• E - Ethics and Professionalism\n• G - Governing the Internal Audit Function\n• M - Managing the Internal Audit Function\n• P - Performing Internal Audit Services',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'mnemonic', 'domains'],
    reference: 'GIAS 2024 Domains'
  },
  {
    id: 'cia1-gias-fc-003',
    section: 'CIA1',
    type: 'concept',
    topic: 'GIAS 2024',
    subtopic: 'Structure',
    front: 'How many standards are in GIAS 2024, and how are they organized?',
    back: '15 Standards organized into 5 Domains:\n• Domain I: 1 Standard (Purpose)\n• Domain II: 4 Standards (Ethics, Professionalism)\n• Domain III: 2 Standards (Governance)\n• Domain IV: 3 Standards (Management)\n• Domain V: 5 Standards (Performing)',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'structure', 'standards'],
    reference: 'GIAS 2024'
  },
  {
    id: 'cia1-gias-fc-004',
    section: 'CIA1',
    type: 'comparison',
    topic: 'GIAS 2024',
    subtopic: 'IPPF to GIAS Transition',
    front: 'How does GIAS 2024 structurally differ from the previous IPPF?',
    back: 'IPPF used:\n• Attribute Standards (1000 series) - organizational requirements\n• Performance Standards (2000 series) - engagement requirements\n\nGIAS 2024 uses:\n• 15 thematic standards in 5 domains\n• Principles-based vs. rules-based\n• Core Principles integrated into standards\n• Implementation Guidance embedded within standards',
    difficulty: 'hard',
    tags: ['GIAS 2024', 'IPPF', 'comparison', 'transition'],
    reference: 'GIAS 2024'
  },
  
  // ============================================================================
  // DOMAIN I: PURPOSE OF INTERNAL AUDITING
  // ============================================================================
  {
    id: 'cia1-gias-fc-005',
    section: 'CIA1',
    type: 'standard',
    topic: 'GIAS 2024',
    subtopic: 'Domain I - Purpose',
    front: 'GIAS 2024 Domain I (Standard 1): Purpose of Internal Auditing',
    back: 'Standard 1 defines the purpose of internal audit:\n• Provide independent assurance and advisory services\n• Enhance governance, risk management, and control\n• Support organizational objectives\n• Defined in the internal audit charter\n\nThe Mission remains: "To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight."',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'Domain I', 'Purpose', 'Standard 1'],
    reference: 'GIAS Standard 1'
  },
  
  // ============================================================================
  // DOMAIN II: ETHICS AND PROFESSIONALISM
  // ============================================================================
  {
    id: 'cia1-gias-fc-006',
    section: 'CIA1',
    type: 'standard',
    topic: 'GIAS 2024',
    subtopic: 'Domain II - Standards 2-5',
    front: 'What standards are in GIAS 2024 Domain II: Ethics and Professionalism?',
    back: '• Standard 2: Ethics and Professionalism (integrates Code of Ethics)\n• Standard 3: Objectivity (individual-level objectivity)\n• Standard 4: Independence and Objectivity (organizational independence)\n• Standard 5: Competence (knowledge, skills, abilities)',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'Domain II', 'Ethics'],
    reference: 'GIAS Standards 2-5'
  },
  {
    id: 'cia1-gias-fc-007',
    section: 'CIA1',
    type: 'concept',
    topic: 'GIAS 2024',
    subtopic: 'Code of Ethics Integration',
    front: 'What happened to the IIA Code of Ethics under GIAS 2024?',
    back: 'The Code of Ethics is now INTEGRATED into Standard 2: Ethics and Professionalism.\n\nThe four principles remain:\n• Integrity\n• Objectivity\n• Confidentiality\n• Competency\n\nThey are no longer a separate mandatory document but are embedded in the standards framework.',
    difficulty: 'hard',
    tags: ['GIAS 2024', 'Code of Ethics', 'Standard 2'],
    reference: 'GIAS Standard 2'
  },
  {
    id: 'cia1-gias-fc-008',
    section: 'CIA1',
    type: 'comparison',
    topic: 'GIAS 2024',
    subtopic: 'Independence Mapping',
    front: 'How does GIAS Standard 4 (Independence and Objectivity) map to the old IPPF?',
    back: 'GIAS Standard 4 replaces IPPF Standard 1100:\n\nOld IPPF 1100: Independence and Objectivity\n• 1110: Organizational Independence\n• 1120: Individual Objectivity\n• 1130: Impairment to Independence or Objectivity\n\nNew GIAS Standard 4:\n• Covers both organizational independence and impairments\n• Standard 3 separately addresses individual objectivity\n• More integrated guidance on safeguards and threats',
    difficulty: 'hard',
    tags: ['GIAS 2024', 'IPPF', 'independence', 'mapping'],
    reference: 'GIAS Standard 4'
  },
  
  // ============================================================================
  // DOMAIN III: GOVERNING THE INTERNAL AUDIT FUNCTION
  // ============================================================================
  {
    id: 'cia1-gias-fc-009',
    section: 'CIA1',
    type: 'standard',
    topic: 'GIAS 2024',
    subtopic: 'Domain III - Standards 6-7',
    front: 'What standards are in GIAS 2024 Domain III: Governing the Internal Audit Function?',
    back: '• Standard 6: Roles and Responsibilities of the Board\n  - Charter approval\n  - CAE evaluation\n  - Resource adequacy\n  - QAIP oversight\n\n• Standard 7: Chief Audit Executive Responsibilities\n  - Strategic direction\n  - QAIP establishment\n  - Reporting relationships\n  - Risk-based planning',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'Domain III', 'Governance'],
    reference: 'GIAS Standards 6-7'
  },
  {
    id: 'cia1-gias-fc-010',
    section: 'CIA1',
    type: 'concept',
    topic: 'GIAS 2024',
    subtopic: 'QAIP under GIAS',
    front: 'Where is the Quality Assurance and Improvement Program (QAIP) addressed in GIAS 2024?',
    back: 'QAIP is now addressed in Standard 7: CAE Responsibilities (previously IPPF Standard 1300).\n\nThe CAE must establish QAIP covering:\n• Internal assessments (ongoing monitoring)\n• External assessments (at least every 5 years)\n• Reporting results to board\n• "Conforms with the Standards" statement requirements',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'QAIP', 'Standard 7'],
    reference: 'GIAS Standard 7'
  },
  
  // ============================================================================
  // DOMAIN IV: MANAGING THE INTERNAL AUDIT FUNCTION
  // ============================================================================
  {
    id: 'cia1-gias-fc-011',
    section: 'CIA1',
    type: 'standard',
    topic: 'GIAS 2024',
    subtopic: 'Domain IV - Standards 8-10',
    front: 'What standards are in GIAS 2024 Domain IV: Managing the Internal Audit Function?',
    back: '• Standard 8: Strategic Planning\n  - Risk-based audit plan\n  - Alignment with organizational objectives\n  - Communication with board and management\n\n• Standard 9: Resource Management\n  - Staffing and competencies\n  - Technology and methodology\n  - Budget and resource allocation\n\n• Standard 10: Coordination and Reliance\n  - Combined assurance approach\n  - Reliance on other assurance providers',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'Domain IV', 'Management'],
    reference: 'GIAS Standards 8-10'
  },
  {
    id: 'cia1-gias-fc-012',
    section: 'CIA1',
    type: 'concept',
    topic: 'GIAS 2024',
    subtopic: 'Combined Assurance',
    front: 'How does GIAS 2024 address combined assurance?',
    back: 'Standard 10: Coordination and Reliance specifically covers combined assurance:\n\n• Identify and coordinate with other assurance providers\n• Third parties, external audit, second line functions\n• Determine appropriateness of reliance\n• Reduce duplication and gaps in assurance coverage\n• Map organizational assurance coverage\n\nThis is a more prominent focus than in previous IPPF.',
    difficulty: 'hard',
    tags: ['GIAS 2024', 'combined assurance', 'Standard 10'],
    reference: 'GIAS Standard 10'
  },
  
  // ============================================================================
  // DOMAIN V: PERFORMING INTERNAL AUDIT SERVICES
  // ============================================================================
  {
    id: 'cia1-gias-fc-013',
    section: 'CIA1',
    type: 'standard',
    topic: 'GIAS 2024',
    subtopic: 'Domain V - Standards 11-15',
    front: 'What standards are in GIAS 2024 Domain V: Performing Internal Audit Services?',
    back: '• Standard 11: Planning Engagements\n• Standard 12: Conducting Engagements (evidence gathering)\n• Standard 13: Forming Conclusions (analysis and opinions)\n• Standard 14: Communicating Results\n• Standard 15: Monitoring Actions (follow-up)\n\nThese replace IPPF Performance Standards 2100-2600.',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'Domain V', 'Engagements'],
    reference: 'GIAS Standards 11-15'
  },
  {
    id: 'cia1-gias-fc-014',
    section: 'CIA1',
    type: 'comparison',
    topic: 'GIAS 2024',
    subtopic: 'Performance Standards Mapping',
    front: 'How do GIAS Domain V standards map to old IPPF Performance Standards?',
    back: 'IPPF → GIAS Mapping:\n• 2100 Nature of Work → Standards 11-12\n• 2200 Engagement Planning → Standard 11\n• 2300 Performing the Engagement → Standard 12\n• 2400 Communicating Results → Standard 14\n• 2500 Monitoring Progress → Standard 15\n• 2600 Risk Acceptance → Standard 15\n\nNew: Standard 13 (Forming Conclusions) more explicitly addresses analysis and opinion development.',
    difficulty: 'hard',
    tags: ['GIAS 2024', 'IPPF', 'mapping', 'Performance Standards'],
    reference: 'GIAS Standards 11-15'
  },
  {
    id: 'cia1-gias-fc-015',
    section: 'CIA1',
    type: 'concept',
    topic: 'GIAS 2024',
    subtopic: 'Risk Acceptance Escalation',
    front: 'Under GIAS 2024, when must the CAE escalate risk acceptance to the board?',
    back: 'Standard 15 (Monitoring Actions) requires:\n\nThe CAE must communicate to the board when management has accepted a level of risk that may be UNACCEPTABLE to the organization.\n\nThis preserves the previous IPPF 2600 requirement but places it within the context of ongoing monitoring and follow-up activities.',
    difficulty: 'hard',
    tags: ['GIAS 2024', 'risk acceptance', 'Standard 15', 'board communication'],
    reference: 'GIAS Standard 15'
  },
  
  // ============================================================================
  // EXAM TRANSITION GUIDANCE
  // ============================================================================
  {
    id: 'cia1-gias-fc-016',
    section: 'CIA1',
    type: 'concept',
    topic: 'GIAS 2024',
    subtopic: 'CIA Exam Transition',
    front: 'How should CIA exam candidates approach the IPPF-to-GIAS transition?',
    back: 'IIA Guidance:\n• Both IPPF and GIAS terminology may appear on exams during transition\n• Focus on UNDERLYING CONCEPTS rather than specific framework labels\n• Core principles and ethical requirements remain consistent\n• Mission of Internal Audit is unchanged\n• Know the crosswalk between old and new standard numbers',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'exam strategy', 'transition'],
    reference: 'IIA Exam Transition Guidance'
  },
  {
    id: 'cia1-gias-fc-017',
    section: 'CIA1',
    type: 'concept',
    topic: 'GIAS 2024',
    subtopic: 'Core Principles Integration',
    front: 'What happened to the 10 Core Principles under GIAS 2024?',
    back: 'The 10 Core Principles are INTEGRATED into the 15 Standards rather than existing separately:\n\n1. Integrity → Standards 2-3\n2. Objectivity → Standards 3-4\n3. Confidentiality → Standard 2\n4. Competency → Standard 5\n5. Independence → Standards 4, 6\n6. Due Professional Care → Standards 5, 11-12\n7. Quality → Standards 7, 9\n8. Effective Communication → Standard 14\n9. Insight/Foresight → Standards 12-13\n10. Value → Standard 1',
    difficulty: 'hard',
    tags: ['GIAS 2024', 'Core Principles', 'integration'],
    reference: 'GIAS 2024'
  },
  {
    id: 'cia1-gias-fc-018',
    section: 'CIA1',
    type: 'definition',
    topic: 'GIAS 2024',
    subtopic: 'Mission Unchanged',
    front: 'What is the Mission of Internal Audit under GIAS 2024?',
    back: '"To enhance and protect organizational value by providing risk-based and objective assurance, advice, and insight."\n\nThis mission statement remains UNCHANGED from the IPPF, providing continuity through the transition to GIAS 2024.',
    difficulty: 'easy',
    tags: ['GIAS 2024', 'Mission', 'definition'],
    reference: 'GIAS 2024 Mission'
  },
  {
    id: 'cia1-gias-fc-019',
    section: 'CIA1',
    type: 'concept',
    topic: 'GIAS 2024',
    subtopic: 'Principles-Based Approach',
    front: 'What is the primary benefit of GIAS 2024\'s principles-based approach?',
    back: 'Benefits:\n• Greater FLEXIBILITY in application across diverse organizations\n• Adaptable to different sizes, industries, and contexts\n• Focuses on professional judgment over rigid rules\n• More applicable globally across regulatory environments\n• Reduces prescription while maintaining professional standards\n\nThis contrasts with the more rules-based IPPF structure.',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'principles-based', 'flexibility'],
    reference: 'GIAS 2024'
  },
  {
    id: 'cia1-gias-fc-020',
    section: 'CIA1',
    type: 'concept',
    topic: 'GIAS 2024',
    subtopic: 'Implementation Considerations',
    front: 'How does GIAS 2024 handle implementation guidance compared to the IPPF?',
    back: 'IPPF used:\n• Implementation Standards (.A for assurance, .C for consulting)\n• Separate Practice Guides and Practice Advisories\n• Supplemental Guidance documents\n\nGIAS 2024 uses:\n• Topical Requirements within each Standard\n• Implementation Considerations embedded in Standards\n• More integrated, consolidated guidance\n• Less reliance on extensive separate documents',
    difficulty: 'medium',
    tags: ['GIAS 2024', 'implementation', 'guidance'],
    reference: 'GIAS 2024'
  },
];

export default CIA1_GIAS_2024_FLASHCARDS;
