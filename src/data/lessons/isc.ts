import { Lesson } from '../../types';

export const iscLessons: Lesson[] = [
  // ==========================================
  // AREA I: INFORMATION SYSTEMS & DATA MANAGEMENT (12 Lessons)
  // ==========================================
  {
      id: 'isc-001',
      section: 'ISC',
      title: 'IT Governance & Strategy',
      description: 'Alignment of IT with business objectives.',
      order: 1,
      duration: 50,
      difficulty: 'intermediate',
      topics: ['IT Governance', 'Strategy'],
      content: {
          sections: [
              {
                  title: 'Strategic Alignment',
                  type: 'text',
                  content: `Ensuring IT objectives support business goals.
                  
**Key Frameworks:**
• COBIT (Control Objectives for Information and Related Technologies)
• ITIL (IT Infrastructure Library)`
              }
          ]
      }
  },
  {
      id: 'isc-004',
      section: 'ISC',
      title: 'Database Management Systems (DBMS)',
      description: 'Relational databases, SQL, and data integrity.',
      order: 4,
      duration: 55,
      difficulty: 'intermediate',
      topics: ['Database', 'SQL'],
      content: {
          sections: [
              {
                  title: 'Relational Model',
                  type: 'text',
                  content: `Data stored in tables (relations) with rows (records) and columns (attributes).
                  
**Key Terms:**
• **Primary Key:** Unique identifier for a record.
• **Foreign Key:** Link to a primary key in another table (enforces referential integrity).`
              }
          ]
      }
  },
  {
      id: 'isc-006',
      section: 'ISC',
      title: 'Cloud Computing Models',
      description: 'SaaS, PaaS, IaaS and deployment models.',
      order: 6,
      duration: 45,
      difficulty: 'beginner',
      topics: ['Cloud', 'IT Infrastructure'],
      content: {
          sections: [
              {
                  title: 'Service Models',
                  type: 'list',
                  content: [
                      { term: 'SaaS (Software)', definition: 'User accesses app (e.g., Salesforce, Office 365).' },
                      { term: 'PaaS (Platform)', definition: 'Devs deploy apps on provider\'s platform (e.g., Google App Engine).' },
                      { term: 'IaaS (Infrastructure)', definition: 'Rent hardware/storage (e.g., AWS EC2).' }
                  ]
              }
          ]
      }
  },

  // ==========================================
  // AREA II: SECURITY, CONFIDENTIALITY & PRIVACY (11 Lessons)
  // ==========================================
  {
      id: 'isc-013',
      section: 'ISC',
      title: 'Logical Access Controls',
      description: 'Authentication and authorization mechanisms.',
      order: 13,
      duration: 60,
      difficulty: 'intermediate',
      topics: ['Security', 'Controls'],
      content: {
          sections: [
              {
                  title: 'MFA (Multi-Factor Authentication)',
                  type: 'text',
                  content: `Requires 2+ of the following:
1. Something you **Know** (Password, PIN).
2. Something you **Have** (Token, Phone).
3. Something you **Are** (Biometric).`
              }
          ]
      }
  },
  {
      id: 'isc-015',
      section: 'ISC',
      title: 'Encryption & Hashing',
      description: 'Protecting data at rest and in transit.',
      order: 15,
      duration: 65,
      difficulty: 'advanced',
      topics: ['Cryptography', 'Security'],
      content: {
          sections: [
              {
                  title: 'Symmetric vs Asymmetric',
                  type: 'table',
                  headers: ['Type', 'Keys', 'Speed', 'Secure Distribution?'],
                  rows: [
                      ['Symmetric', '1 Shared Key', 'Fast', 'Difficult'],
                      ['Asymmetric', 'Public & Private Key', 'Slow', 'Easier']
                  ]
              },
              {
                  title: 'Hashing',
                  type: 'text',
                  content: `Creating a fixed-size string from data. It is **one-way** (cannot reverse engineer). Used for password storage and data integrity checks.`
              }
          ]
      }
  },

  // ==========================================
  // AREA III: SOC REPORTS (SVC ORG CONTROLS) (10 Lessons)
  // ==========================================
  {
      id: 'isc-024',
      section: 'ISC',
      title: 'SOC 1 vs SOC 2 vs SOC 3',
      description: 'Understanding the audiences and scope of SOC reports.',
      order: 24,
      duration: 55,
      difficulty: 'intermediate',
      topics: ['SOC Reports', 'Audit'],
      content: {
          sections: [
              {
                  title: 'The Distinction',
                  type: 'list',
                  content: [
                      { term: 'SOC 1', definition: 'Controls over **Financial Reporting** (for User Auditor).' },
                      { term: 'SOC 2', definition: 'Controls over **Trust Services Criteria** (Security, Availability, etc.). Restricted use.' },
                      { term: 'SOC 3', definition: 'Same as SOC 2 but **General Use** (Marketing tool, less detail).' }
                  ]
              }
          ]
      }
  },
  {
      id: 'isc-025',
      section: 'ISC',
      title: 'SOC Type 1 vs Type 2',
      description: 'Design vs Operating Effectiveness.',
      order: 25,
      duration: 50,
      difficulty: 'intermediate',
      topics: ['SOC Reports', 'Controls'],
      content: {
          sections: [
              {
                  title: 'Report Types',
                  type: 'text',
                  content: `**Type 1 (Design):**
• Snapshot at a **point in time**.
• "Are controls designed effectively?"

**Type 2 (Operating Effectiveness):**
• Covers a **period of time** (min 6 months).
• "Did controls operate effectively throughout the period?"
• Required for high assurance.`
              }
          ]
      }
  }
];
