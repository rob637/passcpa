/**
 * CISA Formula Sheet
 * Essential formulas for CISA exam domains
 * 
 * Comprehensive reference for Certified Information Systems Auditor exam calculations
 */

export interface CISAFormula {
  id: string;
  name: string;
  formula: string;
  variables?: Record<string, string>;
  example?: string;
  notes?: string;
}

export interface CISAFormulaCategory {
  id: string;
  category: string;
  domain: 'Domain1' | 'Domain2' | 'Domain3' | 'Domain4' | 'Domain5' | 'All';
  formulas: CISAFormula[];
}

export const CISA_FORMULA_SHEET: CISAFormulaCategory[] = [
  // =====================================================
  // IS Audit Sampling (Domain 1)
  // =====================================================
  {
    id: 'audit-sampling',
    category: 'Audit Sampling & Statistics',
    domain: 'Domain1',
    formulas: [
      {
        id: 'sample-size-attr',
        name: 'Attribute Sampling - Sample Size',
        formula: 'n = (Z² × p × (1-p)) / E²',
        variables: {
          'n': 'Sample size',
          'Z': 'Z-score (1.96 for 95%, 2.58 for 99% confidence)',
          'p': 'Expected population deviation rate',
          'E': 'Tolerable precision (acceptable error rate)',
        },
        example: '95% confidence, 5% expected rate, 2% precision: n = (1.96² × 0.05 × 0.95) / 0.02² = 457',
      },
      {
        id: 'upper-deviation-limit',
        name: 'Upper Deviation Limit',
        formula: 'UDL = Sample Deviation Rate + Sampling Risk Allowance',
        notes: 'If UDL > Tolerable Deviation Rate, control is not effective',
      },
      {
        id: 'confidence-level',
        name: 'Confidence Level vs. Sample Size',
        formula: 'Higher Confidence = Larger Sample Size',
        variables: {
          '90%': 'Z = 1.645',
          '95%': 'Z = 1.96',
          '99%': 'Z = 2.576',
        },
      },
      {
        id: 'sample-selection',
        name: 'Systematic Selection Interval',
        formula: 'Interval = Population Size / Sample Size',
        example: 'Population 10,000, Sample 500: Select every 20th item',
        notes: 'Random start point required to avoid bias',
      },
      {
        id: 'projected-error',
        name: 'Projected Error (Dollar-Unit)',
        formula: 'Projected Error = (Sample Error ÷ Sample Value) × Population Value',
        notes: 'Extrapolates sample findings to entire population',
      },
    ],
  },

  // =====================================================
  // Risk Assessment (Domain 1 & 2)
  // =====================================================
  {
    id: 'risk-assessment',
    category: 'Risk Assessment & Analysis',
    domain: 'All',
    formulas: [
      {
        id: 'audit-risk-model',
        name: 'Audit Risk Model',
        formula: 'Audit Risk = Inherent Risk × Control Risk × Detection Risk',
        variables: {
          'Inherent Risk (IR)': 'Susceptibility to material misstatement without controls',
          'Control Risk (CR)': 'Risk that controls fail to prevent/detect',
          'Detection Risk (DR)': 'Risk that audit procedures fail to detect',
        },
        notes: 'Lower AR requires more testing (lower DR)',
      },
      {
        id: 'detection-risk',
        name: 'Detection Risk Calculation',
        formula: 'Detection Risk = Acceptable Audit Risk / (Inherent Risk × Control Risk)',
        example: 'AR=5%, IR=80%, CR=60%: DR = 0.05 / (0.80 × 0.60) = 10.4%',
      },
      {
        id: 'risk-exposure',
        name: 'Risk Exposure (Expected Loss)',
        formula: 'Risk Exposure = Probability of Occurrence × Impact',
        example: '10% probability × $1,000,000 impact = $100,000 exposure',
        notes: 'Annual Loss Expectancy (ALE) = Single Loss Expectancy × ARO',
      },
      {
        id: 'ale',
        name: 'Annual Loss Expectancy (ALE)',
        formula: 'ALE = SLE × ARO',
        variables: {
          'SLE': 'Single Loss Expectancy ($ impact per event)',
          'ARO': 'Annual Rate of Occurrence (events per year)',
        },
        example: 'Virus attack: SLE=$50,000, ARO=3x/year; ALE = $150,000',
      },
      {
        id: 'sle',
        name: 'Single Loss Expectancy (SLE)',
        formula: 'SLE = Asset Value × Exposure Factor',
        variables: {
          'Asset Value': 'Value of the asset at risk',
          'Exposure Factor': 'Percentage of asset lost per incident (0-100%)',
        },
        example: 'Server worth $100,000 with 40% EF: SLE = $40,000',
      },
      {
        id: 'risk-value',
        name: 'Risk Value for Prioritization',
        formula: 'Risk Value = Likelihood × Impact × Control Weakness',
        notes: 'Used for audit planning and prioritization',
      },
      {
        id: 'residual-risk',
        name: 'Residual Risk',
        formula: 'Residual Risk = Inherent Risk - (Controls × Control Effectiveness)',
        notes: 'Risk remaining after controls implemented',
      },
    ],
  },

  // =====================================================
  // IT Governance Metrics (Domain 2)
  // =====================================================
  {
    id: 'it-governance',
    category: 'IT Governance & Performance',
    domain: 'Domain2',
    formulas: [
      {
        id: 'it-budget-ratio',
        name: 'IT Budget Ratio',
        formula: 'IT Budget Ratio = IT Spending / Total Revenue',
        notes: 'Benchmark varies by industry: 3-7% typical',
      },
      {
        id: 'it-roi',
        name: 'IT Return on Investment',
        formula: 'IT ROI = (Benefits - Costs) / Costs × 100%',
        notes: 'Includes tangible and intangible benefits',
      },
      {
        id: 'tco',
        name: 'Total Cost of Ownership',
        formula: 'TCO = Acquisition Costs + Operating Costs + End-of-Life Costs',
        variables: {
          'Acquisition': 'Hardware, software, implementation',
          'Operating': 'Maintenance, support, training, upgrades',
          'End-of-Life': 'Disposal, migration, decommissioning',
        },
      },
      {
        id: 'project-variance',
        name: 'Project Variance Analysis',
        formula: 'Variance = (Actual - Planned) / Planned × 100%',
        notes: 'Apply to schedule, budget, and scope metrics',
      },
      {
        id: 'earned-value',
        name: 'Earned Value Management',
        formula: 'EV = % Complete × Budget at Completion (BAC)',
        variables: {
          'Cost Variance': 'CV = EV - Actual Cost',
          'Schedule Variance': 'SV = EV - Planned Value',
          'CPI': 'EV / Actual Cost (>1 = under budget)',
          'SPI': 'EV / Planned Value (>1 = ahead of schedule)',
        },
      },
    ],
  },

  // =====================================================
  // SDLC & Project Metrics (Domain 3)
  // =====================================================
  {
    id: 'sdlc-metrics',
    category: 'SDLC & Software Metrics',
    domain: 'Domain3',
    formulas: [
      {
        id: 'function-points',
        name: 'Function Point Analysis',
        formula: 'FP = UFP × VAF',
        variables: {
          'UFP': 'Unadjusted Function Points (inputs, outputs, queries, files)',
          'VAF': 'Value Adjustment Factor (0.65 to 1.35)',
        },
        notes: 'Used for effort estimation and productivity measurement',
      },
      {
        id: 'defect-density',
        name: 'Defect Density',
        formula: 'Defect Density = Total Defects / Size (KLOC or FP)',
        example: '50 defects / 10 KLOC = 5 defects per 1000 lines',
        notes: 'Lower is better. Benchmark: <1 defect/KLOC for mature programs',
      },
      {
        id: 'defect-removal',
        name: 'Defect Removal Efficiency',
        formula: 'DRE = Defects Found Before Release / Total Defects × 100%',
        notes: 'Target: >95% before production',
      },
      {
        id: 'code-coverage',
        name: 'Code Coverage',
        formula: 'Coverage = Lines/Branches Tested / Total Lines/Branches × 100%',
        notes: 'Common targets: 80% line coverage, 60% branch coverage',
      },
      {
        id: 'cyclomatic-complexity',
        name: 'Cyclomatic Complexity',
        formula: 'V(G) = E - N + 2P',
        variables: {
          'E': 'Number of edges (program flow)',
          'N': 'Number of nodes (statements)',
          'P': 'Number of connected components (usually 1)',
        },
        notes: 'Simple: CC = Decision Points + 1. Target: <10 per module',
      },
      {
        id: 'cocomo',
        name: 'COCOMO Effort Estimation',
        formula: 'Effort (person-months) = a × (KLOC)^b × EAF',
        variables: {
          'a, b': 'Model constants (organic: 2.4, 1.05)',
          'KLOC': 'Thousands of lines of code',
          'EAF': 'Effort Adjustment Factor',
        },
      },
    ],
  },

  // =====================================================
  // Operations & BCP/DRP (Domain 4)
  // =====================================================
  {
    id: 'operations',
    category: 'Operations & Availability',
    domain: 'Domain4',
    formulas: [
      {
        id: 'availability',
        name: 'System Availability',
        formula: 'Availability = MTBF / (MTBF + MTTR) × 100%',
        notes: 'Also: (Uptime / Total Time) × 100%',
        example: 'MTBF=500 hrs, MTTR=2 hrs: 500/(500+2) = 99.6%',
      },
      {
        id: 'availability-nines',
        name: 'Availability Levels (Nines)',
        formula: 'Downtime per year based on availability',
        variables: {
          '99%': '3.65 days/year',
          '99.9%': '8.76 hours/year',
          '99.99%': '52.56 minutes/year',
          '99.999%': '5.26 minutes/year',
        },
      },
      {
        id: 'mtbf',
        name: 'Mean Time Between Failures',
        formula: 'MTBF = Total Operating Time / Number of Failures',
        notes: 'Higher MTBF = more reliable system',
      },
      {
        id: 'mttr',
        name: 'Mean Time to Repair',
        formula: 'MTTR = Total Downtime / Number of Repairs',
        notes: 'Lower MTTR = faster recovery capability',
      },
      {
        id: 'mttf',
        name: 'Mean Time to Failure',
        formula: 'MTTF = Total Operating Time / Number of Failures',
        notes: 'For non-repairable systems (MTBF for repairable)',
      },
      {
        id: 'rto',
        name: 'Recovery Time Objective (RTO)',
        formula: 'RTO = Maximum tolerable downtime',
        notes: 'Time to restore service. Drives recovery strategy selection.',
        example: 'RTO of 4 hours requires hot/warm site, not cold site',
      },
      {
        id: 'rpo',
        name: 'Recovery Point Objective (RPO)',
        formula: 'RPO = Maximum tolerable data loss',
        notes: 'Time since last backup. RPO of 1 hour = backup every hour.',
      },
      {
        id: 'mtpd',
        name: 'Maximum Tolerable Period of Disruption',
        formula: 'MTPD = Maximum time before organizational viability threatened',
        notes: 'Business-driven metric. RTO must be <= MTPD.',
      },
      {
        id: 'wrt',
        name: 'Work Recovery Time (WRT)',
        formula: 'WRT = Time to verify system and restore data after recovery',
        notes: 'RTO + WRT should not exceed MTPD',
      },
    ],
  },

  {
    id: 'backup-recovery',
    category: 'Backup & Recovery',
    domain: 'Domain4',
    formulas: [
      {
        id: 'backup-window',
        name: 'Backup Window',
        formula: 'Backup Window = Data Size / Transfer Rate',
        example: '500GB at 100MB/s = 5,000 seconds (~1.4 hours)',
        notes: 'Must complete within available window (e.g., overnight)',
      },
      {
        id: 'restore-time',
        name: 'Restoration Time Estimate',
        formula: 'Restore Time = Data Size / Restore Rate + Verification Time',
        notes: 'Must be less than RTO',
      },
      {
        id: 'retention-storage',
        name: 'Backup Storage Requirements',
        formula: 'Storage = Daily Backup Size × Retention Days × (1 + Growth Rate)',
        notes: 'Consider compression and deduplication ratios',
      },
      {
        id: 'raid-capacity',
        name: 'RAID Storage Capacity',
        formula: 'RAID 5: (N-1) × Disk Size; RAID 6: (N-2) × Disk Size; RAID 1: N/2 × Disk Size',
        example: 'RAID 5 with 4×1TB: (4-1) × 1TB = 3TB usable',
      },
    ],
  },

  // =====================================================
  // Security Metrics (Domain 5)
  // =====================================================
  {
    id: 'security-metrics',
    category: 'Security & Access Control',
    domain: 'Domain5',
    formulas: [
      {
        id: 'password-strength',
        name: 'Password Keyspace',
        formula: 'Keyspace = Character Set Size ^ Password Length',
        example: 'Lowercase + digits (36) with 8 chars: 36^8 = 2.8 trillion',
        notes: 'Time to crack = Keyspace / Guesses per second',
      },
      {
        id: 'encryption-strength',
        name: 'Encryption Key Strength',
        formula: 'Combinations = 2^Key Length',
        variables: {
          'AES-128': '2^128 = 3.4 × 10^38 combinations',
          'AES-256': '2^256 = 1.2 × 10^77 combinations',
        },
      },
      {
        id: 'attack-surface',
        name: 'Attack Surface Metrics',
        formula: 'Attack Surface = Σ (Entry Points × Vulnerabilities × Privileges)',
        notes: 'Minimize entry points, patch vulnerabilities, apply least privilege',
      },
      {
        id: 'patch-compliance',
        name: 'Patch Compliance Rate',
        formula: 'Compliance = Systems Patched / Total Systems × 100%',
        notes: 'Track by patch severity (Critical, High, Medium, Low)',
      },
      {
        id: 'vulnerability-window',
        name: 'Vulnerability Window',
        formula: 'Window = Patch Deployment Date - Vulnerability Disclosure Date',
        notes: 'Shorter windows reduce exposure time',
      },
      {
        id: 'incident-rate',
        name: 'Security Incident Rate',
        formula: 'Rate = Security Incidents / Total Systems (or Users) × 1000',
        notes: 'Track trend over time',
      },
    ],
  },

  {
    id: 'network-security',
    category: 'Network & Communications',
    domain: 'Domain5',
    formulas: [
      {
        id: 'bandwidth',
        name: 'Bandwidth Calculation',
        formula: 'Time = Data Size / Bandwidth',
        example: '1GB at 100Mbps: 8Gb / 100Mbps = 80 seconds',
        notes: 'Convert bytes to bits (×8) for bandwidth calculations',
      },
      {
        id: 'latency',
        name: 'Network Latency',
        formula: 'Round Trip Time (RTT) = 2 × (Propagation + Transmission + Processing)',
        notes: 'Propagation delay = Distance / Speed of light in medium',
      },
      {
        id: 'throughput',
        name: 'Effective Throughput',
        formula: 'Throughput = Payload Data / Total Data × Bandwidth',
        notes: 'Accounts for protocol overhead, packet loss, retransmissions',
      },
      {
        id: 'firewall-rules',
        name: 'Firewall Rule Effectiveness',
        formula: 'Blocked Traffic % = Blocked Connections / Total Connections × 100%',
        notes: 'Monitor for rule effectiveness and potential gaps',
      },
    ],
  },

  // =====================================================
  // Audit Performance Metrics (Domain 1)
  // =====================================================
  {
    id: 'audit-performance',
    category: 'IS Audit Performance',
    domain: 'Domain1',
    formulas: [
      {
        id: 'audit-coverage',
        name: 'Audit Coverage',
        formula: 'Coverage = Audited Areas / Total Auditable Areas × 100%',
        notes: 'Plan for 100% coverage over audit cycle (typically 3-5 years)',
      },
      {
        id: 'finding-rate',
        name: 'Finding Rate by Severity',
        formula: 'Rate = Findings by Severity / Total Audit Hours',
        notes: 'Track trends to assess audit effectiveness',
      },
      {
        id: 'remediation-time',
        name: 'Average Remediation Time',
        formula: 'Avg Time = Σ (Remediation Date - Finding Date) / Number of Findings',
        notes: 'Track by severity level. Critical findings should be fastest.',
      },
      {
        id: 'repeat-findings',
        name: 'Repeat Finding Rate',
        formula: 'Repeat Rate = Recurring Findings / Total Findings × 100%',
        notes: 'Indicates effectiveness of remediation efforts',
      },
      {
        id: 'control-maturity',
        name: 'Control Maturity Score',
        formula: 'Score = Σ (Control Rating × Weight) / Σ Weights',
        variables: {
          'Level 0': 'Non-existent',
          'Level 1': 'Initial/Ad Hoc',
          'Level 2': 'Repeatable',
          'Level 3': 'Defined',
          'Level 4': 'Managed',
          'Level 5': 'Optimized',
        },
      },
    ],
  },
];

// =====================================================
// Quick Reference Summary
// =====================================================
export const CISA_QUICK_REFERENCE = {
  examFormat: {
    questions: 150,
    duration: '4 hours (240 minutes)',
    passingScore: '450 out of 800 (scaled)',
  },
  domainWeights: {
    domain1: { name: 'IS Audit Process', weight: '21%' },
    domain2: { name: 'IT Governance', weight: '17%' },
    domain3: { name: 'IS Acquisition, Development, Implementation', weight: '12%' },
    domain4: { name: 'IS Operations & Business Resilience', weight: '23%' },
    domain5: { name: 'Protection of Information Assets', weight: '27%' },
  },
  recoveryMetrics: {
    rpo: 'Maximum data loss tolerable',
    rto: 'Maximum downtime tolerable',
    mtpd: 'Maximum disruption before viability at risk',
    wrt: 'Time to verify and restore after recovery',
  },
  recoverySites: {
    hotSite: 'Ready in hours. Highest cost. For critical systems.',
    warmSite: 'Ready in days. Medium cost. For important systems.',
    coldSite: 'Ready in weeks. Lowest cost. For non-critical systems.',
    mobileUnit: 'Portable facility. Variable setup time.',
    reciprocal: 'Agreement with another organization. Risk of unavailability.',
  },
  backupTypes: {
    full: 'All data. Longest backup, fastest restore.',
    incremental: 'Changes since last backup. Fastest backup, longest restore.',
    differential: 'Changes since last full. Medium backup and restore.',
  },
  availabilityNines: {
    '99%': '3.65 days/year downtime',
    '99.9%': '8.76 hours/year downtime',
    '99.99%': '52.56 minutes/year downtime',
    '99.999%': '5.26 minutes/year downtime',
  },
  samplingMethods: {
    statistical: ['Random', 'Stratified', 'Systematic', 'Cluster'],
    nonStatistical: ['Judgmental', 'Haphazard'],
  },
  controlCategories: {
    byFunction: ['Preventive', 'Detective', 'Corrective', 'Compensating'],
    byNature: ['Administrative', 'Technical', 'Physical'],
  },
  sdlcPhases: ['Feasibility', 'Requirements', 'Design', 'Development', 'Testing', 'Implementation', 'Maintenance'],
  raidLevels: {
    'RAID 0': 'Striping only. No redundancy.',
    'RAID 1': 'Mirroring. 50% capacity.',
    'RAID 5': 'Striping with parity. N-1 capacity.',
    'RAID 6': 'Dual parity. N-2 capacity.',
    'RAID 10': 'Mirrored stripes. High performance.',
  },
  encryptionTypes: {
    symmetric: ['AES', 'DES', '3DES', 'Blowfish'],
    asymmetric: ['RSA', 'DSA', 'ECC', 'Diffie-Hellman'],
    hashing: ['SHA-256', 'SHA-3', 'MD5 (deprecated)'],
  },
};

export default CISA_FORMULA_SHEET;
