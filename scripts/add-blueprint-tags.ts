/**
 * Blueprint Tag Migration Script
 * Adds blueprintArea and blueprintTopic fields to all lessons
 * 
 * Run: npx ts-node scripts/add-blueprint-tags.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Blueprint mapping based on lesson ID patterns and titles
const BLUEPRINT_MAPPINGS: Record<string, { area: string; topic: string; pattern: RegExp | string }[]> = {
  BAR: [
    // Area I: Business Combinations (BAR-I)
    { area: 'BAR-I', topic: 'BAR-I-A-1', pattern: /acquisition\s*method/i },
    { area: 'BAR-I', topic: 'BAR-I-A-2', pattern: /consideration\s*transferred|purchase\s*price/i },
    { area: 'BAR-I', topic: 'BAR-I-A-3', pattern: /goodwill|bargain\s*purchase/i },
    { area: 'BAR-I', topic: 'BAR-I-B-1', pattern: /consolidat/i },
    { area: 'BAR-I', topic: 'BAR-I-B-2', pattern: /intercompany/i },
    { area: 'BAR-I', topic: 'BAR-I-B-3', pattern: /noncontrolling|non-controlling|nci/i },
    { area: 'BAR-I', topic: 'BAR-I-C-1', pattern: /vie|variable\s*interest/i },
    { area: 'BAR-I', topic: 'BAR-I-C-2', pattern: /primary\s*beneficiary/i },
    // Area II: Technical Accounting (BAR-II)
    { area: 'BAR-II', topic: 'BAR-II-A-1', pattern: /contract\s*modification/i },
    { area: 'BAR-II', topic: 'BAR-II-A-2', pattern: /principal.*agent/i },
    { area: 'BAR-II', topic: 'BAR-II-A-3', pattern: /license.*ip|intellectual\s*property/i },
    { area: 'BAR-II', topic: 'BAR-II-B-1', pattern: /lease\s*modification/i },
    { area: 'BAR-II', topic: 'BAR-II-B-2', pattern: /sublease/i },
    { area: 'BAR-II', topic: 'BAR-II-B-3', pattern: /build.*suit/i },
    { area: 'BAR-II', topic: 'BAR-II-C-1', pattern: /hedge.*relationship|designated\s*hedge/i },
    { area: 'BAR-II', topic: 'BAR-II-C-2', pattern: /hedge\s*effectiveness|fair\s*value\s*hedge|cash\s*flow\s*hedge/i },
    { area: 'BAR-II', topic: 'BAR-II-D-1', pattern: /functional\s*currency/i },
    { area: 'BAR-II', topic: 'BAR-II-D-2', pattern: /translation|remeasurement|foreign\s*currency/i },
    { area: 'BAR-II', topic: 'BAR-II-E-1', pattern: /stock.*compensation|share.*based/i },
    { area: 'BAR-II', topic: 'BAR-II-E-2', pattern: /eps|earnings\s*per\s*share/i },
    { area: 'BAR-II', topic: 'BAR-II-F-1', pattern: /debt.*modification|troubled\s*debt|extinguishment/i },
    { area: 'BAR-II', topic: 'BAR-II-F-2', pattern: /convertible|compound.*instrument/i },
    // Area III: Government (BAR-III)
    { area: 'BAR-III', topic: 'BAR-III-A-1', pattern: /government.*capital\s*asset|infrastructure|gasb.*34/i },
    { area: 'BAR-III', topic: 'BAR-III-A-2', pattern: /government.*fund|modified\s*accrual|fund\s*accounting/i },
    { area: 'BAR-III', topic: 'BAR-III-A-3', pattern: /pension.*government|opeb|gasb.*68|gasb.*75/i },
    { area: 'BAR-III', topic: 'BAR-III-B-1', pattern: /government.*wide/i },
    { area: 'BAR-III', topic: 'BAR-III-B-2', pattern: /proprietary\s*fund|enterprise\s*fund|internal\s*service/i },
    { area: 'BAR-III', topic: 'BAR-III-B-3', pattern: /fiduciary|trust\s*fund/i },
    // Area IV: Analysis (BAR-IV)
    { area: 'BAR-IV', topic: 'BAR-IV-A-1', pattern: /ratio.*analysis|financial.*analysis|profitability|liquidity/i },
    { area: 'BAR-IV', topic: 'BAR-IV-A-2', pattern: /trend|comparative|horizontal.*analysis/i },
    { area: 'BAR-IV', topic: 'BAR-IV-B-1', pattern: /cvp|cost.*volume.*profit|break.*even|contribution\s*margin/i },
    { area: 'BAR-IV', topic: 'BAR-IV-B-2', pattern: /budget|forecasting|planning/i },
    { area: 'BAR-IV', topic: 'BAR-IV-B-3', pattern: /variance|standard\s*cost/i },
  ],
  ISC: [
    // Area I: Information Systems (ISC-I)
    { area: 'ISC-I', topic: 'ISC-I-A-1', pattern: /information\s*system|system.*overview|ais/i },
    { area: 'ISC-I', topic: 'ISC-I-A-2', pattern: /database|data\s*management|normalization/i },
    { area: 'ISC-I', topic: 'ISC-I-A-3', pattern: /data.*warehouse|big\s*data|analytics/i },
    { area: 'ISC-I', topic: 'ISC-I-B-1', pattern: /general\s*control|itgc|it\s*control/i },
    { area: 'ISC-I', topic: 'ISC-I-B-2', pattern: /application\s*control/i },
    { area: 'ISC-I', topic: 'ISC-I-B-3', pattern: /change\s*management|change\s*control/i },
    { area: 'ISC-I', topic: 'ISC-I-C-1', pattern: /process.*flow|data.*flow|system.*analysis/i },
    { area: 'ISC-I', topic: 'ISC-I-C-2', pattern: /flowchart/i },
    { area: 'ISC-I', topic: 'ISC-I-C-3', pattern: /system.*development|sdlc/i },
    // Area II: Security (ISC-II)
    { area: 'ISC-II', topic: 'ISC-II-A-1', pattern: /cybersecurity|security\s*framework|nist/i },
    { area: 'ISC-II', topic: 'ISC-II-A-2', pattern: /threat|vulnerability|risk.*assessment/i },
    { area: 'ISC-II', topic: 'ISC-II-A-3', pattern: /incident.*response|breach/i },
    { area: 'ISC-II', topic: 'ISC-II-B-1', pattern: /encryption|cryptograph/i },
    { area: 'ISC-II', topic: 'ISC-II-B-2', pattern: /access\s*control|authentication|authorization/i },
    { area: 'ISC-II', topic: 'ISC-II-B-3', pattern: /physical\s*security/i },
    { area: 'ISC-II', topic: 'ISC-II-C-1', pattern: /privacy|gdpr|hipaa|glba/i },
    { area: 'ISC-II', topic: 'ISC-II-C-2', pattern: /data.*protection|confidentiality/i },
    // Area III: SOC (ISC-III)
    { area: 'ISC-III', topic: 'ISC-III-A-1', pattern: /soc\s*1|soc\s*2|soc\s*3|soc.*report/i },
    { area: 'ISC-III', topic: 'ISC-III-A-2', pattern: /trust\s*service|tsc/i },
    { area: 'ISC-III', topic: 'ISC-III-B-1', pattern: /service.*organization|ssae\s*18/i },
    { area: 'ISC-III', topic: 'ISC-III-B-2', pattern: /type\s*1|type\s*2|examination.*period/i },
  ],
  TCP: [
    // Area I: Individual Tax (TCP-I)
    { area: 'TCP-I', topic: 'TCP-I-A-1', pattern: /individual.*income|gross\s*income|agi/i },
    { area: 'TCP-I', topic: 'TCP-I-A-2', pattern: /filing\s*status|standard\s*deduction/i },
    { area: 'TCP-I', topic: 'TCP-I-A-3', pattern: /itemized|schedule\s*a/i },
    { area: 'TCP-I', topic: 'TCP-I-B-1', pattern: /qualified\s*business\s*income|qbi|199a/i },
    { area: 'TCP-I', topic: 'TCP-I-B-2', pattern: /passive.*loss|at.*risk|469|465/i },
    { area: 'TCP-I', topic: 'TCP-I-B-3', pattern: /amt|alternative\s*minimum/i },
    { area: 'TCP-I', topic: 'TCP-I-C-1', pattern: /retirement.*planning|ira|401k|pension/i },
    { area: 'TCP-I', topic: 'TCP-I-C-2', pattern: /education.*tax|529|aotc|lifetime\s*learning/i },
    { area: 'TCP-I', topic: 'TCP-I-C-3', pattern: /tax\s*credit|child\s*tax|eitc/i },
    // Area II: Entity Tax (TCP-II)
    { area: 'TCP-II', topic: 'TCP-II-A-1', pattern: /s\s*corp.*formation|s\s*corp.*election/i },
    { area: 'TCP-II', topic: 'TCP-II-A-2', pattern: /s\s*corp.*basis|shareholder.*basis/i },
    { area: 'TCP-II', topic: 'TCP-II-A-3', pattern: /s\s*corp.*distribution|aaa/i },
    { area: 'TCP-II', topic: 'TCP-II-B-1', pattern: /partnership.*formation|contributing.*partner/i },
    { area: 'TCP-II', topic: 'TCP-II-B-2', pattern: /partnership.*allocation|special\s*allocation/i },
    { area: 'TCP-II', topic: 'TCP-II-B-3', pattern: /partnership.*distribution|liquidat/i },
    { area: 'TCP-II', topic: 'TCP-II-C-1', pattern: /entity.*selection|entity.*choice|entity.*comparison/i },
    { area: 'TCP-II', topic: 'TCP-II-C-2', pattern: /conversion|entity.*change/i },
    { area: 'TCP-II', topic: 'TCP-II-D-1', pattern: /compensation.*planning|fringe\s*benefit|reasonable\s*compensation/i },
    { area: 'TCP-II', topic: 'TCP-II-D-2', pattern: /owner.*compensation|self.*employment/i },
    // Area III: Property Transactions (TCP-III)
    { area: 'TCP-III', topic: 'TCP-III-A-1', pattern: /1031|like.*kind|exchange/i },
    { area: 'TCP-III', topic: 'TCP-III-A-2', pattern: /involuntary.*conversion|1033/i },
    { area: 'TCP-III', topic: 'TCP-III-B-1', pattern: /capital.*gain|capital.*loss|section\s*121/i },
    { area: 'TCP-III', topic: 'TCP-III-B-2', pattern: /depreciation.*recapture|1245|1250/i },
    { area: 'TCP-III', topic: 'TCP-III-B-3', pattern: /installment.*sale|453/i },
    { area: 'TCP-III', topic: 'TCP-III-C-1', pattern: /related.*party|267|318/i },
    { area: 'TCP-III', topic: 'TCP-III-C-2', pattern: /loss.*limitation|wash.*sale/i },
    // Area IV: Gift & Estate (TCP-IV)
    { area: 'TCP-IV', topic: 'TCP-IV-A-1', pattern: /gift.*tax|annual.*exclusion/i },
    { area: 'TCP-IV', topic: 'TCP-IV-A-2', pattern: /gift.*split|unified\s*credit/i },
    { area: 'TCP-IV', topic: 'TCP-IV-B-1', pattern: /estate.*tax|gross\s*estate/i },
    { area: 'TCP-IV', topic: 'TCP-IV-B-2', pattern: /portability|dsue/i },
    { area: 'TCP-IV', topic: 'TCP-IV-C-1', pattern: /gst|generation.*skip/i },
  ],
  FAR: [
    // Area I: Conceptual Framework (FAR-I)
    { area: 'FAR-I', topic: 'FAR-I-A-1', pattern: /conceptual\s*framework|fasb\s*concept/i },
    { area: 'FAR-I', topic: 'FAR-I-A-2', pattern: /qualitative\s*characteristic|relevance|faithful/i },
    { area: 'FAR-I', topic: 'FAR-I-B-1', pattern: /balance\s*sheet|financial\s*position/i },
    { area: 'FAR-I', topic: 'FAR-I-B-2', pattern: /income\s*statement|comprehensive\s*income/i },
    { area: 'FAR-I', topic: 'FAR-I-B-3', pattern: /cash\s*flow\s*statement|statement.*cash/i },
    { area: 'FAR-I', topic: 'FAR-I-B-4', pattern: /stockholder.*equity|retained\s*earnings/i },
    // Area II: Assets (FAR-II)
    { area: 'FAR-II', topic: 'FAR-II-A-1', pattern: /cash.*control|bank\s*reconciliation/i },
    { area: 'FAR-II', topic: 'FAR-II-A-2', pattern: /receivable|allowance.*doubt/i },
    { area: 'FAR-II', topic: 'FAR-II-B-1', pattern: /inventory.*cost|fifo|lifo|weighted\s*average/i },
    { area: 'FAR-II', topic: 'FAR-II-B-2', pattern: /inventory.*estimation|retail|gross\s*profit/i },
    { area: 'FAR-II', topic: 'FAR-II-C-1', pattern: /ppe|property.*plant|acquisition.*cost/i },
    { area: 'FAR-II', topic: 'FAR-II-C-2', pattern: /depreciation|depletion/i },
    { area: 'FAR-II', topic: 'FAR-II-C-3', pattern: /impairment|asset.*retirement/i },
    { area: 'FAR-II', topic: 'FAR-II-D-1', pattern: /intangible|goodwill/i },
    { area: 'FAR-II', topic: 'FAR-II-D-2', pattern: /research.*development|r&d/i },
    { area: 'FAR-II', topic: 'FAR-II-E-1', pattern: /investment.*debt|held.*maturity|trading/i },
    { area: 'FAR-II', topic: 'FAR-II-E-2', pattern: /investment.*equity|equity\s*method/i },
    // Area III: Liabilities (FAR-III)
    { area: 'FAR-III', topic: 'FAR-III-A-1', pattern: /accounts\s*payable|current\s*liabil/i },
    { area: 'FAR-III', topic: 'FAR-III-A-2', pattern: /contingent|contingenc/i },
    { area: 'FAR-III', topic: 'FAR-III-B-1', pattern: /long.*term.*debt|bond|note\s*payable/i },
    { area: 'FAR-III', topic: 'FAR-III-B-2', pattern: /lease.*lessee|operating\s*lease|finance\s*lease/i },
    { area: 'FAR-III', topic: 'FAR-III-B-3', pattern: /pension|postretirement|defined\s*benefit/i },
    // Area IV: Equity (FAR-IV)
    { area: 'FAR-IV', topic: 'FAR-IV-A-1', pattern: /common\s*stock|preferred\s*stock|stock\s*issuance/i },
    { area: 'FAR-IV', topic: 'FAR-IV-A-2', pattern: /treasury\s*stock/i },
    { area: 'FAR-IV', topic: 'FAR-IV-B-1', pattern: /dividend/i },
    { area: 'FAR-IV', topic: 'FAR-IV-B-2', pattern: /stock\s*split/i },
    // Area V: Revenue (FAR-V)
    { area: 'FAR-V', topic: 'FAR-V-A-1', pattern: /revenue.*recognition|asc\s*606|5.*step/i },
    { area: 'FAR-V', topic: 'FAR-V-A-2', pattern: /performance\s*obligation/i },
    { area: 'FAR-V', topic: 'FAR-V-A-3', pattern: /transaction\s*price/i },
    { area: 'FAR-V', topic: 'FAR-V-B-1', pattern: /long.*term.*contract|percentage.*completion/i },
    { area: 'FAR-V', topic: 'FAR-V-B-2', pattern: /bill.*and.*hold|consignment/i },
  ],
  AUD: [
    // Area I: Ethics (AUD-I)
    { area: 'AUD-I', topic: 'AUD-I-A-1', pattern: /independence|aicpa.*code/i },
    { area: 'AUD-I', topic: 'AUD-I-A-2', pattern: /objectivity|integrity|professional\s*ethic/i },
    { area: 'AUD-I', topic: 'AUD-I-B-1', pattern: /quality.*management|qc|quality\s*control/i },
    // Area II: Engagement (AUD-II)
    { area: 'AUD-II', topic: 'AUD-II-A-1', pattern: /engagement.*letter|terms.*engagement/i },
    { area: 'AUD-II', topic: 'AUD-II-A-2', pattern: /audit\s*planning|preliminary/i },
    { area: 'AUD-II', topic: 'AUD-II-B-1', pattern: /materiality|performance.*materiality/i },
    { area: 'AUD-II', topic: 'AUD-II-B-2', pattern: /audit\s*risk|risk.*assessment/i },
    { area: 'AUD-II', topic: 'AUD-II-B-3', pattern: /fraud.*risk/i },
    // Area III: Evidence (AUD-III)
    { area: 'AUD-III', topic: 'AUD-III-A-1', pattern: /audit.*evidence|sufficient.*appropriate/i },
    { area: 'AUD-III', topic: 'AUD-III-A-2', pattern: /audit.*procedure|test.*control|substantive/i },
    { area: 'AUD-III', topic: 'AUD-III-B-1', pattern: /sampling|statistical/i },
    { area: 'AUD-III', topic: 'AUD-III-B-2', pattern: /confirmation|external.*confirmation/i },
    { area: 'AUD-III', topic: 'AUD-III-B-3', pattern: /analytic.*procedure/i },
    // Area IV: Reporting (AUD-IV)
    { area: 'AUD-IV', topic: 'AUD-IV-A-1', pattern: /unmodified|unqualified|clean.*opinion/i },
    { area: 'AUD-IV', topic: 'AUD-IV-A-2', pattern: /qualified|adverse|disclaimer/i },
    { area: 'AUD-IV', topic: 'AUD-IV-A-3', pattern: /emphasis.*matter|other.*matter/i },
    { area: 'AUD-IV', topic: 'AUD-IV-B-1', pattern: /review.*engagement|compilation/i },
    { area: 'AUD-IV', topic: 'AUD-IV-B-2', pattern: /attest/i },
    // Area V: Internal Control (AUD-V)
    { area: 'AUD-V', topic: 'AUD-V-A-1', pattern: /internal\s*control|coso/i },
    { area: 'AUD-V', topic: 'AUD-V-A-2', pattern: /control\s*deficiency|significant\s*deficiency|material\s*weakness/i },
    { area: 'AUD-V', topic: 'AUD-V-B-1', pattern: /it.*control|itgc|application.*control/i },
  ],
  REG: [
    // Area I: Ethics (REG-I)
    { area: 'REG-I', topic: 'REG-I-A-1', pattern: /circular.*230|treasury.*regulation/i },
    { area: 'REG-I', topic: 'REG-I-A-2', pattern: /tax.*preparer|return.*preparer/i },
    { area: 'REG-I', topic: 'REG-I-B-1', pattern: /privilege|tax.*advice/i },
    // Area II: Business Law (REG-II)
    { area: 'REG-II', topic: 'REG-II-A-1', pattern: /contract.*formation|offer.*accept/i },
    { area: 'REG-II', topic: 'REG-II-A-2', pattern: /consideration|statute.*fraud/i },
    { area: 'REG-II', topic: 'REG-II-A-3', pattern: /breach.*contract|damages/i },
    { area: 'REG-II', topic: 'REG-II-B-1', pattern: /agency|principal.*agent.*relation/i },
    { area: 'REG-II', topic: 'REG-II-B-2', pattern: /debtor.*creditor|secured/i },
    { area: 'REG-II', topic: 'REG-II-B-3', pattern: /bankruptcy|chapter.*7|chapter.*11/i },
    // Area III: Property (REG-III)
    { area: 'REG-III', topic: 'REG-III-A-1', pattern: /real.*property|deed|title/i },
    { area: 'REG-III', topic: 'REG-III-A-2', pattern: /mortgage|foreclosure/i },
    { area: 'REG-III', topic: 'REG-III-B-1', pattern: /personal.*property|bailment/i },
    // Area IV: Individual Tax (REG-IV)
    { area: 'REG-IV', topic: 'REG-IV-A-1', pattern: /gross\s*income|taxable\s*income|exclusion/i },
    { area: 'REG-IV', topic: 'REG-IV-A-2', pattern: /above.*line|adjustment.*income/i },
    { area: 'REG-IV', topic: 'REG-IV-A-3', pattern: /itemized.*deduction|schedule.*a/i },
    { area: 'REG-IV', topic: 'REG-IV-B-1', pattern: /capital.*gain.*loss/i },
    { area: 'REG-IV', topic: 'REG-IV-B-2', pattern: /passive.*activity|at.*risk/i },
    // Area V: Entity Tax (REG-V)
    { area: 'REG-V', topic: 'REG-V-A-1', pattern: /c.*corp.*tax|corporate.*tax/i },
    { area: 'REG-V', topic: 'REG-V-A-2', pattern: /corporate.*formation|section.*351/i },
    { area: 'REG-V', topic: 'REG-V-A-3', pattern: /corporate.*distribution|dividend.*distribution/i },
    { area: 'REG-V', topic: 'REG-V-A-4', pattern: /corporate.*liquidation|reorganization/i },
    { area: 'REG-V', topic: 'REG-V-B-1', pattern: /s.*corporation|subchapter.*s/i },
    { area: 'REG-V', topic: 'REG-V-C-1', pattern: /partnership.*tax|k-1/i },
  ],
};

// Default blueprint areas by lesson ID prefix when pattern matching fails
const DEFAULT_AREA_BY_ID_PREFIX: Record<string, string> = {
  'BAR-I-': 'BAR-I',
  'BAR-II-': 'BAR-II', 
  'BAR-III-': 'BAR-III',
  'BAR-IV-': 'BAR-IV',
  'ISC-I-': 'ISC-I',
  'ISC-II-': 'ISC-II',
  'ISC-III-': 'ISC-III',
  'TCP-I-': 'TCP-I',
  'TCP-II-': 'TCP-II',
  'TCP-III-': 'TCP-III',
  'TCP-IV-': 'TCP-IV',
  'FAR-I-': 'FAR-I',
  'FAR-II-': 'FAR-II',
  'FAR-III-': 'FAR-III',
  'FAR-IV-': 'FAR-IV',
  'FAR-V-': 'FAR-V',
  'AUD-I-': 'AUD-I',
  'AUD-II-': 'AUD-II',
  'AUD-III-': 'AUD-III',
  'AUD-IV-': 'AUD-IV',
  'AUD-V-': 'AUD-V',
  'REG-I-': 'REG-I',
  'REG-II-': 'REG-II',
  'REG-III-': 'REG-III',
  'REG-IV-': 'REG-IV',
  'REG-V-': 'REG-V',
};

interface Lesson {
  id: string;
  section: string;
  title: string;
  description?: string;
  topics?: string[];
  blueprintArea?: string;
  blueprintTopic?: string;
  [key: string]: any;
}

function findBlueprintMapping(lesson: Lesson): { area: string; topic: string } | null {
  const section = lesson.section;
  const mappings = BLUEPRINT_MAPPINGS[section];
  
  if (!mappings) return null;
  
  // Combine title, description, and topics for matching
  const searchText = [
    lesson.title || '',
    lesson.description || '',
    ...(lesson.topics || [])
  ].join(' ');
  
  for (const mapping of mappings) {
    if (mapping.pattern instanceof RegExp) {
      if (mapping.pattern.test(searchText)) {
        return { area: mapping.area, topic: mapping.topic };
      }
    }
  }
  
  // Fallback to ID-based area assignment
  for (const [prefix, area] of Object.entries(DEFAULT_AREA_BY_ID_PREFIX)) {
    if (lesson.id.startsWith(prefix)) {
      return { area, topic: `${area}-A-1` }; // Default to first topic in area
    }
  }
  
  return null;
}

function processLessonFile(filePath: string): void {
  console.log(`Processing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find all lesson objects and add blueprint tags
  // This uses regex to find lesson definitions and add fields after the topics array
  
  // Pattern to match lesson objects that don't have blueprintArea
  const lessonPattern = /(\{\s*id:\s*['"]([^'"]+)['"],\s*section:\s*['"]([^'"]+)['"],\s*title:\s*["']([^"']+)["'][^}]*?topics:\s*\[[^\]]*\])/gs;
  
  let modified = false;
  let matchCount = 0;
  
  content = content.replace(lessonPattern, (match, lessonBlock, id, section, title) => {
    // Skip if already has blueprintArea
    if (match.includes('blueprintArea')) {
      return match;
    }
    
    const fakeLesson: Lesson = { id, section, title };
    
    // Extract topics if present
    const topicsMatch = match.match(/topics:\s*\[([^\]]*)\]/);
    if (topicsMatch) {
      const topicsStr = topicsMatch[1];
      fakeLesson.topics = topicsStr.match(/["']([^"']+)["']/g)?.map(t => t.replace(/["']/g, '')) || [];
    }
    
    // Extract description if present
    const descMatch = match.match(/description:\s*["']([^"']+)["']/);
    if (descMatch) {
      fakeLesson.description = descMatch[1];
    }
    
    const mapping = findBlueprintMapping(fakeLesson);
    
    if (mapping) {
      modified = true;
      matchCount++;
      // Add blueprint fields after topics array
      const newFields = `,\n    blueprintArea: '${mapping.area}',\n    blueprintTopic: '${mapping.topic}'`;
      return match.replace(/(topics:\s*\[[^\]]*\])/, `$1${newFields}`);
    }
    
    return match;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`  Updated ${matchCount} lessons`);
  } else {
    console.log('  No changes needed');
  }
}

// Main execution
const lessonsDir = path.join(__dirname, '..', 'src', 'data', 'lessons');
const lessonFiles = ['bar.ts', 'isc.ts', 'tcp.ts', 'far.ts', 'aud.ts', 'reg.ts'];

console.log('Blueprint Tag Migration Script');
console.log('==============================\n');

for (const file of lessonFiles) {
  const filePath = path.join(lessonsDir, file);
  if (fs.existsSync(filePath)) {
    processLessonFile(filePath);
  } else {
    console.log(`File not found: ${filePath}`);
  }
}

console.log('\nMigration complete!');
