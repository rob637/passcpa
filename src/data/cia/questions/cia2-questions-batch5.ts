/**
 * CIA Part 2: Practice of Internal Auditing - Batch 5
 * Expanding Planning and Managing IA Activity coverage
 * 
 * Focus Areas:
 * - Engagement Planning Process (15 questions)
 * - Risk & Control Matrix Development (5 questions)
 * - CAE Strategic Planning & Board Relations (8 questions)
 * - IA Policies, Procedures, Resource Management (7 questions)
 */

import { Question } from '../../../types';

export const CIA2_QUESTIONS_BATCH5: Question[] = [
  // ============================================================================
  // ENGAGEMENT PLANNING PROCESS (15 questions) - CIA2-II
  // ============================================================================
  
  {
    id: 'cia2-b5-001',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-II',
    question: 'During preliminary survey for an engagement, the internal auditor should perform all of the following EXCEPT:',
    options: [
      'Understanding the auditee\'s business processes and objectives',
      'Reviewing prior audit reports and regulatory findings',
      'Issuing recommendations for control improvements',
      'Identifying key risks and control activities'
    ],
    correctAnswer: 2,
    explanation: 'Issuing recommendations is part of communicating engagement results, not the preliminary survey. The preliminary survey focuses on understanding the area, reviewing prior findings, and identifying key risks and controls to properly plan the engagement.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Planning',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-002',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-II',
    question: 'When developing engagement objectives, the internal auditor should consider all of the following EXCEPT:',
    options: [
      'Preliminary assessment of risks relevant to the activity under review',
      'Likelihood that significant errors, fraud, or noncompliance exist',
      'The desired outcome of the external audit opinion',
      'Adequacy and effectiveness of the governance, risk management, and control processes'
    ],
    correctAnswer: 2,
    explanation: 'Engagement objectives for internal audit are independent of external audit opinions. Internal audit objectives focus on the preliminary risk assessment, probability of significant issues, and adequacy of governance, risk management, and control processes (Standard 2210).',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Objectives',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-003',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-II',
    question: 'According to Standard 2220, engagement scope must be sufficient to satisfy the engagement objectives. Which of the following should be considered when determining scope?',
    options: [
      'Only areas with known deficiencies from prior audits',
      'Relevant systems, records, personnel, and physical properties',
      'Only financial records and transactions',
      'Only areas requested by management'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2220 states that engagement scope must include consideration of relevant systems, records, personnel, and physical properties—including those under the control of third parties. Scope should not be limited to only known issues, financial areas, or management requests.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Scope',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-004',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    blueprintArea: 'CIA2-II',
    question: 'The work program for an internal audit engagement should include:',
    options: [
      'Only the budget and timeline',
      'Procedures for identifying, analyzing, evaluating, and documenting information',
      'Only the list of documents to be reviewed',
      'The final audit opinion'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2240 requires that internal auditors develop and document work programs that achieve the engagement objectives. Work programs include procedures for identifying, analyzing, evaluating, and documenting information during the engagement.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Work Program',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-005',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-II',
    question: 'An engagement client requests that the internal audit team expand the scope of an ongoing assurance engagement to include an advisory review of a new system. How should the CAE respond?',
    options: [
      'Decline because scope cannot change once approved',
      'Evaluate whether the additional scope creates objectivity concerns and assess resource availability',
      'Automatically accept since the client requested it',
      'Refer the request to external audit'
    ],
    correctAnswer: 1,
    explanation: 'The CAE should evaluate scope changes carefully, considering potential objectivity impairments (reviewing your own recommendations), resource allocation impacts, and whether the combined engagement can still achieve its objectives. Scope flexibility is appropriate but requires careful evaluation.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Scope',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-006',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-II',
    question: 'During engagement planning, the internal auditor identifies that significant IT changes have occurred since the last audit. What is the MOST appropriate step?',
    options: [
      'Exclude IT from the engagement scope',
      'Update the risk assessment and adjust planning to address IT risks',
      'Refer all IT matters to the IT department',
      'Complete the current plan and address IT in a separate engagement'
    ],
    correctAnswer: 1,
    explanation: 'Significant IT changes require updating the risk assessment during planning. Standard 2210 requires objectives to reflect the preliminary risk assessment. New IT risks should be incorporated into the current engagement planning rather than deferred or excluded.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk Assessment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-007',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-II',
    question: 'Standard 2230 requires that internal auditors allocate appropriate resources for the engagement. Which factor is LEAST relevant when determining resource allocation?',
    options: [
      'Nature and complexity of each engagement',
      'Available budget constraints',
      'Time constraints and management preferences',
      'Level of external audit fees'
    ],
    correctAnswer: 3,
    explanation: 'Resource allocation should consider the nature and complexity of the engagement, budget constraints, and time constraints. External audit fees are not relevant to determining internal audit resource allocation for an engagement.',
    topic: 'Planning the Engagement',
    subtopic: 'Resource Allocation',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-008',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    blueprintArea: 'CIA2-II',
    question: 'What is the PRIMARY purpose of a preliminary survey (planning phase)?',
    options: [
      'To issue the final audit report',
      'To become familiar with the activities, risks, and controls of the area to be audited',
      'To test controls for operating effectiveness',
      'To verify financial statement accuracy'
    ],
    correctAnswer: 1,
    explanation: 'The preliminary survey allows auditors to gain an understanding of the area under review, including its objectives, risks, and controls. This knowledge is essential for developing effective engagement objectives and work programs.',
    topic: 'Planning the Engagement',
    subtopic: 'Preliminary Survey',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-009',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-II',
    question: 'In planning a compliance engagement, the internal auditor should:',
    options: [
      'Focus only on financial regulations',
      'Identify the specific laws, regulations, policies, and procedures relevant to the area',
      'Rely solely on external legal counsel\'s assessment',
      'Test all transactions during the planning phase'
    ],
    correctAnswer: 1,
    explanation: 'For compliance engagements, planning requires identifying all applicable laws, regulations, contractual obligations, and internal policies relevant to the engagement. This forms the criteria against which compliance will be evaluated.',
    topic: 'Planning the Engagement',
    subtopic: 'Compliance Engagement Planning',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-010',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-II',
    question: 'Which of the following is the BEST approach for setting engagement objectives?',
    options: [
      'Copy objectives from the previous year\'s engagement',
      'Base objectives on the preliminary risk assessment and expected conditions',
      'Use generic objectives that apply to all engagements',
      'Let the engagement client determine the objectives'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2210 requires engagement objectives to reflect the preliminary assessment of risks and expected conditions. Each engagement should have tailored objectives based on current conditions, not recycled from prior years or generic templates.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Objectives',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-011',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-II',
    question: 'An internal auditor is planning an engagement and discovers that the auditee has recently implemented a new ERP system. Which planning tool would be MOST helpful?',
    options: [
      'Process flowcharting to understand the new workflows',
      'Random sampling of last year\'s transactions',
      'Ratio analysis of financial statements',
      'Physical inventory observation'
    ],
    correctAnswer: 0,
    explanation: 'When a new system has been implemented, process flowcharting is the most effective planning tool. It helps the auditor understand new workflows, identify control points, and determine where risks may exist in the changed environment.',
    topic: 'Planning the Engagement',
    subtopic: 'Planning Tools',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-012',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    blueprintArea: 'CIA2-II',
    question: 'During engagement planning, reviewing prior engagement reports helps the auditor to:',
    options: [
      'Determine the final opinion for the current engagement',
      'Understand prior findings and the status of corrective actions',
      'Avoid duplicating the same tests',
      'Reduce the scope of the current engagement'
    ],
    correctAnswer: 1,
    explanation: 'Reviewing prior audit reports provides context about previously identified issues, management\'s corrective actions, and whether prior recommendations have been implemented. This informs risk assessment and helps focus current engagement efforts.',
    topic: 'Planning the Engagement',
    subtopic: 'Preliminary Survey',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-013',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-II',
    question: 'When planning an engagement, the internal auditor identified that the auditee\'s objectives are not clearly defined. What is the BEST course of action?',
    options: [
      'Cancel the engagement until objectives are defined',
      'Proceed with a broader scope to cover all potential areas',
      'Discuss with management and work to understand the actual objectives and key risks',
      'Use the auditor\'s opinion of what the objectives should be'
    ],
    correctAnswer: 2,
    explanation: 'Per Standard 2210.A3, when the objectives of the activity being reviewed are ambiguous, auditors should work with management to understand and clarify the objectives. This ensures engagement objectives are properly aligned with the area\'s actual purpose.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Objectives',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-014',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-II',
    question: 'Which of the following sources of information is MOST useful during engagement planning for understanding the risk environment?',
    options: [
      'The organization\'s annual report',
      'The enterprise risk management (ERM) output and risk registers',
      'External financial analyst reports',
      'Industry advertising materials'
    ],
    correctAnswer: 1,
    explanation: 'ERM outputs and risk registers provide the most direct insight into organizational risks that have been identified and assessed. This information helps auditors align engagement planning with the organization\'s risk profile.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk Assessment',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-015',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    blueprintArea: 'CIA2-II',
    question: 'What is the purpose of an engagement letter or notification memo sent to the engagement client before fieldwork begins?',
    options: [
      'To present preliminary findings',
      'To communicate timing, scope, objectives, and resource requirements',
      'To request payment for audit services',
      'To provide the final audit report'
    ],
    correctAnswer: 1,
    explanation: 'The engagement notification communicates important planning information to the client including timing, objectives, scope, and resource requirements. This promotes cooperation, allows the client to prepare, and sets expectations for the engagement.',
    topic: 'Planning the Engagement',
    subtopic: 'Engagement Communication',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // RISK & CONTROL MATRIX DEVELOPMENT (5 questions) - CIA2-II
  // ============================================================================
  
  {
    id: 'cia2-b5-016',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-II',
    question: 'A risk and control matrix maps risks to their corresponding controls. What is the PRIMARY benefit of this tool during engagement planning?',
    options: [
      'It eliminates the need for testing',
      'It provides a structured framework for identifying which controls should be tested',
      'It replaces the need for a work program',
      'It guarantees all risks will be mitigated'
    ],
    correctAnswer: 1,
    explanation: 'A risk and control matrix links identified risks to corresponding controls, providing a structured basis for determining which controls need testing. This ensures audit procedures are focused on high-risk areas and that no significant risks are overlooked.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk and Control Matrix',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-017',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-II',
    question: 'When building a risk and control matrix, the auditor identifies a risk with no corresponding control. What is the MOST appropriate action?',
    options: [
      'Ignore the risk since there is no control to test',
      'Document it as a potential finding and assess the residual risk to the organization',
      'Immediately issue a finding without further analysis',
      'Ask management to create a control before the audit continues'
    ],
    correctAnswer: 1,
    explanation: 'A risk without a corresponding control is a potential gap. The auditor should document this, assess whether the residual risk is within the organization\'s risk appetite, and determine if it should be reported as a finding. Further analysis is needed before concluding.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk and Control Matrix',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-018',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-II',
    question: 'In a risk and control matrix, "residual risk" refers to:',
    options: [
      'Risk before any controls are applied',
      'Risk that remains after controls are applied',
      'The maximum possible loss from a risk event',
      'Risk that has been fully transferred to an insurer'
    ],
    correctAnswer: 1,
    explanation: 'Residual risk is the risk that remains after management has implemented controls or other risk responses. The auditor evaluates whether residual risk is within the organization\'s risk appetite. Inherent risk is the risk before controls.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk and Control Matrix',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-019',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    blueprintArea: 'CIA2-II',
    question: 'A risk and control matrix typically includes all of the following EXCEPT:',
    options: [
      'Identified risks',
      'Existing controls',
      'The auditor\'s final conclusion on the engagement',
      'Control descriptions and types (preventive, detective)'
    ],
    correctAnswer: 2,
    explanation: 'A risk and control matrix is a planning and fieldwork tool that maps risks to controls, describes control types, and identifies tests. Final engagement conclusions come after testing, not during matrix development.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk and Control Matrix',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-020',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-II',
    question: 'An auditor is developing a risk and control matrix for a procurement process. Which approach BEST ensures comprehensive coverage?',
    options: [
      'Map controls to the organizational chart',
      'Walk through the end-to-end process, identifying risks and controls at each step',
      'Focus only on the financial controls approved by the CFO',
      'Copy the matrix from the prior year\'s audit'
    ],
    correctAnswer: 1,
    explanation: 'Walking through the end-to-end process ensures all risks and controls are identified at each step, from requisition through payment. This process-based approach captures the full risk picture, including segregation of duties, authorization, and recording controls.',
    topic: 'Planning the Engagement',
    subtopic: 'Risk and Control Matrix',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // CAE STRATEGIC PLANNING & BOARD RELATIONS (8 questions) - CIA2-I
  // ============================================================================
  
  {
    id: 'cia2-b5-021',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-I',
    question: 'The CAE is developing the annual risk-based audit plan. Which of the following should have the GREATEST influence on audit priorities?',
    options: [
      'Management\'s preferences for which areas to audit',
      'The organization\'s strategic objectives and enterprise risk assessment',
      'The external auditor\'s suggestions',
      'Prior year audit plan with minor updates'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2010 requires the CAE to establish a risk-based plan aligned with organizational objectives. The enterprise risk assessment should drive priorities, ensuring internal audit focuses on areas of greatest strategic importance and risk.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Planning and Strategy',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-022',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-I',
    question: 'The CAE must communicate the internal audit activity\'s plans and resource requirements. To whom must this be communicated for review and approval?',
    options: [
      'The CEO only',
      'The CFO and controller',
      'Senior management and the board',
      'External auditors'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2020 requires the CAE to communicate the internal audit activity\'s plans, resource requirements, and any significant interim changes to both senior management and the board for review and approval.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'CAE Reporting',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-023',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-I',
    question: 'The board requests the CAE to take on responsibility for managing the organization\'s ethics hotline. What concern should the CAE raise?',
    options: [
      'It requires too many resources',
      'Managing the hotline may impair objectivity when auditing the ethics program',
      'Internal audit should never interact with the ethics function',
      'This responsibility belongs solely to the legal department'
    ],
    correctAnswer: 1,
    explanation: 'Taking on management of the ethics hotline creates a potential objectivity impairment. If internal audit later needs to audit the ethics program, it would be evaluating its own work. The CAE should raise this self-review threat and implement safeguards per Standard 1112.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'CAE Board Relationships',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-024',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-I',
    question: 'Which of the following is a key responsibility of the CAE regarding coordination with external auditors?',
    options: [
      'Replacing external audit work with internal audit coverage',
      'Sharing work to ensure efficient use of audit resources and minimize duplication',
      'Reporting internal audit findings exclusively to external auditors',
      'Allowing external auditors to direct internal audit work'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2050 requires the CAE to share information and coordinate activities with external auditors to ensure proper coverage and minimize duplication of efforts. This does not mean external auditors direct internal audit work.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Coordination and Reliance',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-025',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-I',
    question: 'What is the PRIMARY purpose of the internal audit charter?',
    options: [
      'To document the results of audit engagements',
      'To formally define the purpose, authority, and responsibility of the internal audit activity',
      'To establish the audit budget',
      'To assign auditors to specific engagements'
    ],
    correctAnswer: 1,
    explanation: 'Standard 1000 requires the internal audit charter to formally define the purpose, authority, and responsibility of the internal audit activity. It must be approved by the board and is the foundational governance document.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Policies and Procedures',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-026',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    blueprintArea: 'CIA2-I',
    question: 'How often should the internal audit charter be reviewed and updated?',
    options: [
      'Only when a new CAE is appointed',
      'Every five years',
      'Periodically, and presented to senior management and the board for approval',
      'Only when the organization undergoes a major restructuring'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1000 requires the charter to be periodically reviewed by the CAE and presented to senior management and the board for approval. Regular review ensures the charter remains relevant to the organization\'s needs.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Policies and Procedures',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-027',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-I',
    question: 'The CAE discovers that internal audit resources are insufficient to complete the approved audit plan. What is the MOST appropriate action?',
    options: [
      'Complete only the assignments that can be performed with current resources without notification',
      'Hire external consultants without board approval',
      'Communicate the impact of resource limitations to senior management and the board',
      'Reduce the scope of each engagement proportionally'
    ],
    correctAnswer: 2,
    explanation: 'Standard 2030 requires the CAE to ensure internal audit resources are sufficient, appropriate, and effectively deployed. When resource limitations exist, the CAE must communicate the impact to senior management and the board for resolution.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Resource Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-028',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-I',
    question: 'The audit universe maintained by the CAE should include:',
    options: [
      'Only areas with prior audit findings',
      'All significant activities that could be subject to audit, including those in subsidiaries and outsourced functions',
      'Only activities requested by the board',
      'Only financial processes and related controls'
    ],
    correctAnswer: 1,
    explanation: 'The audit universe should encompass all auditable activities and areas, including subsidiaries, outsourced functions, and significant projects. It forms the basis for developing the risk-based audit plan that covers the organization comprehensively.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Planning and Strategy',
  reference: 'IIA Standards'
  },

  // ============================================================================
  // IA POLICIES, PROCEDURES, RESOURCE MANAGEMENT (7 questions) - CIA2-I
  // ============================================================================
  
  {
    id: 'cia2-b5-029',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-I',
    question: 'Internal audit policies and procedures should be established to guide the audit staff. Which of the following is the BEST reason for maintaining these policies?',
    options: [
      'To limit auditor discretion and creativity',
      'To ensure consistency and quality in audit work',
      'To reduce the need for supervision',
      'To satisfy regulatory requirements only'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2040 requires the CAE to establish policies and procedures to guide the internal audit activity. The primary purpose is to ensure consistency, quality, and adherence to professional standards across all engagements.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Policies and Procedures',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-030',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    blueprintArea: 'CIA2-I',
    question: 'In determining resources needed, the CAE should consider all of the following EXCEPT:',
    options: [
      'Knowledge, skills, and competencies of the audit staff',
      'The complexity and scope of planned engagements',
      'The personal preferences of the audit committee chair',
      'Availability of external resources (co-sourcing, outsourcing)'
    ],
    correctAnswer: 2,
    explanation: 'Resource planning should be based on professional factors including staff competencies, engagement complexity, and availability of external resources. Personal preferences of individuals should not drive resource allocation decisions.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Resource Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-031',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-I',
    question: 'The CAE has been asked to provide assurance on an area where the internal audit team lacks expertise. What is the MOST appropriate response?',
    options: [
      'Decline the engagement entirely',
      'Accept the engagement and train staff during fieldwork',
      'Obtain competent advice and assistance (e.g., IT specialists, subject matter experts)',
      'Defer to external audit for the entire engagement'
    ],
    correctAnswer: 2,
    explanation: 'Standard 1210 requires proficiency but allows the CAE to obtain competent advice and assistance if the internal audit staff lacks the knowledge or qualifications. Engaging subject matter experts or guest auditors addresses the competency gap while still performing the engagement.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Resource Management',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-032',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-I',
    question: 'Which performance measurement is MOST useful for assessing the value of internal audit to the organization?',
    options: [
      'Number of audits completed per year',
      'Percentage of audit plan completed',
      'Percentage of recommendations implemented by management',
      'Total hours charged to engagements'
    ],
    correctAnswer: 2,
    explanation: 'The percentage of recommendations implemented by management indicates whether internal audit\'s work is driving real improvements. While completion metrics are useful, the ultimate value indicator is whether recommendations lead to actual organizational improvement.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'IA Activity Metrics',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-033',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'medium',
    blueprintArea: 'CIA2-I',
    question: 'Which statement about co-sourcing internal audit activities is CORRECT?',
    options: [
      'Co-sourcing eliminates the need for quality assurance',
      'The external provider retains full responsibility for the work product',
      'The CAE remains responsible for the overall management and quality of the internal audit activity',
      'Co-sourced work does not need to comply with IIA Standards'
    ],
    correctAnswer: 2,
    explanation: 'Regardless of sourcing arrangements, the CAE retains responsibility for managing and overseeing all internal audit work. Co-sourced activities must comply with IIA Standards, and quality assurance still applies to externally performed work.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Coordination and Reliance',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-034',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'easy',
    blueprintArea: 'CIA2-I',
    question: 'What is the audit universe?',
    options: [
      'The total number of auditors in the organization',
      'A list of all auditable activities and areas within the organization',
      'The total audit budget for the fiscal year',
      'All external and internal audit firms working for the organization'
    ],
    correctAnswer: 1,
    explanation: 'The audit universe is a comprehensive inventory of all potential auditable activities, processes, and areas within the organization. It serves as the foundation for developing the risk-based audit plan.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'Audit Planning and Strategy',
  reference: 'IIA Standards'
  },
  {
    id: 'cia2-b5-035',
    courseId: 'cia',
    section: 'CIA2',
    blueprintArea: 'CIA2-I',
    difficulty: 'hard',
    blueprintArea: 'CIA2-I',
    question: 'The CAE presented the annual report to the board. Which of the following should be included in this report?',
    options: [
      'Only completed engagements with satisfactory ratings',
      'Significant risk exposures, control issues, governance matters, and other items needing attention',
      'Only areas where management agreed with recommendations',
      'Details of every audit test performed during the year'
    ],
    correctAnswer: 1,
    explanation: 'Standard 2060 requires the CAE to report to senior management and the board on significant risk exposures, control issues, governance matters, and other information required by the board. The report must provide a balanced view, not just favorable outcomes.',
    topic: 'Managing the Internal Audit Activity',
    subtopic: 'CAE Reporting',
  reference: 'IIA Standards'
  }
];
