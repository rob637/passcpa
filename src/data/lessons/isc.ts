import { Lesson } from '../../types';

export const iscLessons: Lesson[] = [
  {
    id: 'ISC-I-001',
    section: 'ISC',
    title: "Database Fundamentals",
    description: "Master database architectures, structures, and management systems critical for IT audits and controls evaluation",
    order: 1,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Information Systems", "Database Management", "Data Architecture"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Databases are the backbone of financial systems. Understanding database fundamentals helps you evaluate IT general controls, assess data integrity risks, and ensure completeness/accuracy of financial data."
        },
        {
          title: 'Database Types & Architectures',
          type: 'text',
          content: "A database is an organized collection of structured data stored electronically. Understanding database types is essential for assessing IT controls and data integrity in audit engagements."
        },
        {
          title: 'Database Classification',
          type: 'table',
          headers: ["Type", "Structure", "Use Cases", "Audit Considerations"],
          rows: [
            ["Relational (RDBMS)", "Tables with rows/columns, SQL queries", "ERP systems, financial apps", "Referential integrity, ACID compliance"],
            ["NoSQL", "Document, key-value, graph, column", "Big data, web apps", "Eventual consistency, schema flexibility"],
            ["Hierarchical", "Tree structure, parent-child", "Legacy mainframes", "Navigation complexity, limited flexibility"],
            ["Network", "Graph with multiple parents", "Complex relationships", "Pointer management, complexity"],
            ["Object-Oriented", "Objects with methods", "CAD, multimedia", "Encapsulation verification"]
          ]
        },
        {
          title: 'Relational Database Components',
          type: 'list',
          items: [
            "Tables (Relations): Store data in rows (records/tuples) and columns (fields/attributes)",
            "Primary Key: Unique identifier for each record—ensures no duplicates",
            "Foreign Key: Links tables together—enforces referential integrity",
            "Index: Speeds up queries but requires storage/maintenance overhead",
            "Views: Virtual tables showing subset of data—useful for security",
            "Stored Procedures: Pre-compiled SQL code for consistent processing",
            "Triggers: Automatic actions on insert/update/delete events"
          ]
        },
        {
          title: 'ACID Properties',
          type: 'table',
          headers: ["Property", "Definition", "Why It Matters"],
          rows: [
            ["Atomicity", "All or nothing—transaction completes fully or rolls back", "Prevents partial updates corrupting data"],
            ["Consistency", "Database moves from one valid state to another", "Maintains data integrity rules"],
            ["Isolation", "Concurrent transactions don't interfere", "Prevents dirty reads, phantom data"],
            ["Durability", "Committed transactions survive system failures", "Ensures data persistence"]
          ]
        },
        {
          title: 'Database Architecture Models',
          type: 'text',
          content: "Client-Server: Database runs on central server, clients send queries. Two-Tier: Client directly connects to database server. Three-Tier: Adds application/logic layer between client and database for security and scalability. Distributed: Data spread across multiple servers—requires coordination protocols."
        },
        {
          title: 'DBMS Security Features',
          type: 'list',
          items: [
            "Authentication: Validates user identity before access",
            "Authorization: Controls what authenticated users can do (SELECT, INSERT, UPDATE, DELETE)",
            "Encryption: Protects data at rest and in transit",
            "Audit Logging: Tracks who accessed/modified what and when",
            "Role-Based Access Control (RBAC): Assigns permissions to roles, users to roles"
          ]
        },
        {
          title: 'Memory Aid: ACID Test',
          type: 'callout',
          calloutType: 'tip',
          content: "'A Can I Drink?' → Atomicity (all or nothing), Consistency (valid states), Isolation (no interference), Durability (survives crashes). If your database fails the ACID test, your data integrity is at risk!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Don't confuse Isolation Levels! READ UNCOMMITTED allows dirty reads, READ COMMITTED prevents them, REPEATABLE READ prevents non-repeatable reads, SERIALIZABLE is most restrictive. Higher isolation = better integrity but worse performance."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Relational databases use tables with primary/foreign keys for integrity\n• ACID properties ensure reliable transaction processing\n• DBMS security includes authentication, authorization, encryption, audit logs\n• Database architecture choice affects scalability, security, and audit approach\n• Understanding database structure is essential for evaluating ITGC"
        }
      ]
    }
  },
  {
    id: 'ISC-I-002',
    section: 'ISC',
    title: "Data Modeling & Normalization",
    description: "Understand entity-relationship diagrams and normalization techniques for database design and data integrity assessment",
    order: 2,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Information Systems", "Data Modeling", "Database Design"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Poorly designed databases lead to data anomalies, redundancy, and integrity issues. Understanding normalization helps you identify database design weaknesses that could compromise financial data accuracy."
        },
        {
          title: 'Data Modeling Fundamentals',
          type: 'text',
          content: "Data modeling creates visual representations of data structures and relationships. It's the blueprint for database design, ensuring data requirements are captured accurately before implementation."
        },
        {
          title: 'Entity-Relationship (ER) Diagram Components',
          type: 'table',
          headers: ["Component", "Symbol", "Description", "Example"],
          rows: [
            ["Entity", "Rectangle", "Object/thing being tracked", "Customer, Invoice, Product"],
            ["Attribute", "Oval", "Property of an entity", "Customer_Name, Invoice_Date"],
            ["Relationship", "Diamond", "Association between entities", "Customer PLACES Order"],
            ["Primary Key", "Underlined attribute", "Unique identifier", "Customer_ID"],
            ["Cardinality", "Notation on lines", "How many related records", "1:1, 1:M, M:N"]
          ]
        },
        {
          title: 'Cardinality Types',
          type: 'list',
          items: [
            "One-to-One (1:1): Each entity in A relates to exactly one in B (Employee → Office)",
            "One-to-Many (1:M): One entity in A relates to many in B (Customer → Orders)",
            "Many-to-Many (M:N): Multiple in A relate to multiple in B (Students ↔ Classes)—requires junction table"
          ]
        },
        {
          title: 'Normalization Overview',
          type: 'text',
          content: "Normalization is the process of organizing data to reduce redundancy and improve data integrity. Each normal form builds on the previous, eliminating specific types of anomalies."
        },
        {
          title: 'Normal Forms Progression',
          type: 'table',
          headers: ["Form", "Requirement", "Eliminates", "Example Issue Fixed"],
          rows: [
            ["1NF", "Atomic values, no repeating groups", "Repeating groups", "Multiple phone numbers in one cell"],
            ["2NF", "1NF + no partial dependencies", "Partial dependency", "Non-key depends on part of composite key"],
            ["3NF", "2NF + no transitive dependencies", "Transitive dependency", "Non-key depends on another non-key"],
            ["BCNF", "Every determinant is a candidate key", "Remaining anomalies", "Overlapping candidate keys"],
            ["4NF", "No multi-valued dependencies", "Multi-valued dependency", "Independent multi-valued facts"],
            ["5NF", "No join dependencies", "Join dependency", "Lossless decomposition issues"]
          ]
        },
        {
          title: 'Normalization Example',
          type: 'example',
          content: "UNNORMALIZED: Order(OrderID, Date, CustID, CustName, CustCity, Item1, Qty1, Item2, Qty2...)\n\n1NF: Remove repeating groups → separate OrderItems table\n2NF: Remove partial dependencies → CustName, CustCity depend only on CustID, not OrderID\n3NF: Remove transitive → CustCity depends on CustID, not directly on OrderID\n\nRESULT:\n• Orders(OrderID, Date, CustID)\n• Customers(CustID, CustName, CustCity)\n• OrderItems(OrderID, ItemID, Quantity)"
        },
        {
          title: 'Data Anomalies Without Normalization',
          type: 'list',
          items: [
            "Insert Anomaly: Cannot add data without unrelated data (can't add customer without order)",
            "Update Anomaly: Must update same data in multiple places (customer address in every order row)",
            "Delete Anomaly: Deleting data loses unrelated data (deleting last order loses customer info)"
          ]
        },
        {
          title: 'Denormalization Considerations',
          type: 'text',
          content: "Sometimes controlled denormalization improves performance for read-heavy systems. Trade-offs include faster queries vs. more storage and update complexity. Data warehouses often use star schemas (denormalized) for reporting performance."
        },
        {
          title: 'Memory Aid: Normal Forms',
          type: 'callout',
          calloutType: 'tip',
          content: "'1-2-3 Normalization Dance':\n1NF = 'One value per cell' (atomic)\n2NF = 'Two parts? Split partial deps' (whole key dependency)\n3NF = 'Three's a crowd' (no non-key → non-key)"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "A table can be in 1NF but not 2NF, or in 2NF but not 3NF. Each form REQUIRES meeting previous form requirements. Also, 3NF is typically sufficient for OLTP systems—don't over-normalize!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• ER diagrams model entities, attributes, and relationships\n• Cardinality shows how many records relate (1:1, 1:M, M:N)\n• Normalization reduces redundancy through progressive normal forms\n• 1NF: atomic values; 2NF: no partial deps; 3NF: no transitive deps\n• Data anomalies indicate poor database design\n• Controlled denormalization may improve read performance"
        }
      ]
    }
  },
  {
    id: 'ISC-I-003',
    section: 'ISC',
    title: "Data Governance & Quality",
    description: "Learn frameworks for managing data as a strategic asset and ensuring data quality for reliable financial reporting",
    order: 3,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Information Systems", "Data Governance", "Data Quality"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Poor data governance leads to inaccurate financial reports, compliance failures, and audit exceptions. Understanding data governance helps you assess whether organizations have adequate controls over their critical data assets."
        },
        {
          title: 'Data Governance Framework',
          type: 'text',
          content: "Data governance is the exercise of authority, control, and shared decision-making over data management. It establishes policies, procedures, and standards for how data is created, stored, used, and retired across the organization."
        },
        {
          title: 'Data Governance Components',
          type: 'table',
          headers: ["Component", "Purpose", "Key Activities"],
          rows: [
            ["Data Stewardship", "Day-to-day data management", "Maintain quality, resolve issues, enforce standards"],
            ["Data Ownership", "Accountability for data assets", "Approve access, define retention, ensure compliance"],
            ["Data Policies", "Rules governing data use", "Classification, retention, privacy, security requirements"],
            ["Data Standards", "Consistent definitions/formats", "Naming conventions, data dictionaries, metadata"],
            ["Data Quality Management", "Ensure fitness for use", "Profiling, cleansing, monitoring, reporting"]
          ]
        },
        {
          title: 'Data Governance Roles',
          type: 'list',
          items: [
            "Data Governance Council: Senior executives setting strategy and resolving cross-functional issues",
            "Data Owner: Business leader accountable for specific data domain (e.g., CFO owns financial data)",
            "Data Steward: Subject matter expert managing data quality and standards daily",
            "Data Custodian: IT role responsible for technical storage, security, and access",
            "Data Consumer: End users who access and use data for business purposes"
          ]
        },
        {
          title: 'Data Quality Dimensions',
          type: 'table',
          headers: ["Dimension", "Definition", "Example Issue"],
          rows: [
            ["Accuracy", "Data correctly represents reality", "Customer address has typos"],
            ["Completeness", "All required data is present", "Missing phone numbers for 30% of customers"],
            ["Consistency", "Same data across systems matches", "Revenue differs between GL and CRM"],
            ["Timeliness", "Data available when needed", "Inventory counts 3 days old"],
            ["Validity", "Data conforms to defined formats/rules", "Invalid date format: 13/45/2024"],
            ["Uniqueness", "No unintended duplicates", "Same customer entered 5 times"]
          ]
        },
        {
          title: 'Data Quality Management Process',
          type: 'list',
          items: [
            "Data Profiling: Analyze data to understand content, structure, quality issues",
            "Data Cleansing: Correct or remove inaccurate, incomplete, or duplicate data",
            "Data Standardization: Apply consistent formats, abbreviations, codes",
            "Data Matching: Identify and link related records across sources",
            "Data Monitoring: Ongoing measurement against quality thresholds",
            "Root Cause Analysis: Identify why quality issues occur to prevent recurrence"
          ]
        },
        {
          title: 'Master Data Management (MDM)',
          type: 'text',
          content: "MDM creates a single, authoritative source for critical business data (customers, products, vendors, chart of accounts). Benefits include consistent reporting, reduced reconciliation, and better analytics. MDM approaches: Registry (index pointing to source systems), Consolidation (read-only master), and Coexistence (synchronized master)."
        },
        {
          title: 'Data Lifecycle Management',
          type: 'table',
          headers: ["Phase", "Activities", "Controls"],
          rows: [
            ["Creation/Collection", "Data entry, import, generation", "Validation rules, source authentication"],
            ["Storage", "Database, files, archive", "Encryption, backup, access controls"],
            ["Usage", "Reporting, analysis, transactions", "Authorization, audit logging"],
            ["Sharing", "Internal/external distribution", "Classification, data agreements"],
            ["Archival", "Move to long-term storage", "Retention schedules, retrieval ability"],
            ["Destruction", "Secure deletion", "Verification, certificates, compliance"]
          ]
        },
        {
          title: 'Memory Aid: Data Quality ACCTVU',
          type: 'callout',
          calloutType: 'tip',
          content: "'ACCT VU' → Accuracy, Completeness, Consistency, Timeliness, Validity, Uniqueness. Think 'Accountants VIEW data quality'—these six dimensions are your quality checklist!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Don't confuse Data Owner vs. Data Custodian! Owner = business accountability (decides who can access, what retention). Custodian = technical responsibility (implements access controls, manages backups). The CFO owns financial data; IT is custodian."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Data governance establishes accountability, policies, and standards for data assets\n• Key roles: Council, Owner (business), Steward (SME), Custodian (IT)\n• Six quality dimensions: Accuracy, Completeness, Consistency, Timeliness, Validity, Uniqueness\n• MDM creates single source of truth for critical entities\n• Data lifecycle spans creation through destruction with controls at each phase"
        }
      ]
    }
  },
  {
    id: 'ISC-I-004',
    section: 'ISC',
    title: "SQL for Auditors",
    description: "Master SQL queries for data extraction, analysis, and audit testing of financial databases",
    order: 4,
    duration: 60,
    difficulty: 'intermediate',
    topics: ["Information Systems", "SQL", "Data Analytics", "Audit Technology"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "SQL enables auditors to directly query financial databases, perform substantive testing on entire populations, and identify anomalies that sampling might miss. It's becoming an essential skill for modern audit and forensic accounting."
        },
        {
          title: 'SQL Fundamentals',
          type: 'text',
          content: "SQL (Structured Query Language) is the standard language for relational database management. Auditors use SQL to extract data, perform analytical procedures, and test controls directly against source systems."
        },
        {
          title: 'Core SQL Statement Types',
          type: 'table',
          headers: ["Category", "Commands", "Purpose", "Audit Use"],
          rows: [
            ["DQL (Query)", "SELECT", "Retrieve data", "Extract transaction data for testing"],
            ["DML (Manipulation)", "INSERT, UPDATE, DELETE", "Modify data", "Typically read-only access for auditors"],
            ["DDL (Definition)", "CREATE, ALTER, DROP", "Define structures", "Review schema changes"],
            ["DCL (Control)", "GRANT, REVOKE", "Manage permissions", "Test access controls"]
          ]
        },
        {
          title: 'SELECT Statement Structure',
          type: 'example',
          content: "SELECT column1, column2, aggregate_function(column3)\nFROM table_name\nWHERE condition\nGROUP BY column1, column2\nHAVING aggregate_condition\nORDER BY column1 ASC/DESC;\n\nExecution Order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY"
        },
        {
          title: 'Essential SQL Clauses for Auditors',
          type: 'table',
          headers: ["Clause", "Purpose", "Example"],
          rows: [
            ["WHERE", "Filter rows before grouping", "WHERE amount > 10000"],
            ["GROUP BY", "Aggregate by categories", "GROUP BY account_code"],
            ["HAVING", "Filter groups after aggregation", "HAVING COUNT(*) > 1"],
            ["ORDER BY", "Sort results", "ORDER BY date DESC"],
            ["DISTINCT", "Remove duplicates", "SELECT DISTINCT vendor_id"],
            ["TOP/LIMIT", "Limit rows returned", "SELECT TOP 100 or LIMIT 100"]
          ]
        },
        {
          title: 'JOIN Types for Combining Tables',
          type: 'table',
          headers: ["Join Type", "Returns", "Audit Application"],
          rows: [
            ["INNER JOIN", "Only matching rows in both tables", "Match invoices to payments"],
            ["LEFT JOIN", "All left table + matching right", "Find invoices WITHOUT payments"],
            ["RIGHT JOIN", "All right table + matching left", "Find payments WITHOUT invoices"],
            ["FULL OUTER JOIN", "All rows from both tables", "Complete reconciliation"],
            ["CROSS JOIN", "Cartesian product (all combinations)", "Rarely used in audit"]
          ]
        },
        {
          title: 'Aggregate Functions',
          type: 'list',
          items: [
            "COUNT(*): Number of rows—use for transaction counts",
            "SUM(column): Total of values—use for balance testing",
            "AVG(column): Average value—use for reasonableness tests",
            "MIN(column): Smallest value—find first transaction date",
            "MAX(column): Largest value—find highest amount for testing"
          ]
        },
        {
          title: 'Audit-Specific SQL Queries',
          type: 'example',
          content: "-- Find duplicate payments (same vendor, amount, date)\nSELECT vendor_id, amount, payment_date, COUNT(*) as occurrences\nFROM payments\nGROUP BY vendor_id, amount, payment_date\nHAVING COUNT(*) > 1;\n\n-- Identify gaps in sequential invoice numbers\nSELECT invoice_num + 1 as missing_start\nFROM invoices i\nWHERE NOT EXISTS (SELECT 1 FROM invoices WHERE invoice_num = i.invoice_num + 1);\n\n-- Find transactions outside normal business hours\nSELECT * FROM transactions\nWHERE DATEPART(hour, trans_time) NOT BETWEEN 8 AND 18\n   OR DATEPART(weekday, trans_date) IN (1, 7);\n\n-- Three-way match: PO to Receipt to Invoice\nSELECT po.po_number, po.amount as po_amt, r.amount as rcpt_amt, i.amount as inv_amt\nFROM purchase_orders po\nLEFT JOIN receipts r ON po.po_number = r.po_number\nLEFT JOIN invoices i ON po.po_number = i.po_number\nWHERE po.amount <> r.amount OR po.amount <> i.amount OR r.amount IS NULL;"
        },
        {
          title: 'Benford\'s Law Analysis',
          type: 'example',
          content: "-- Benford's Law: First digit distribution analysis\nSELECT \n  LEFT(CAST(ABS(amount) AS VARCHAR), 1) as first_digit,\n  COUNT(*) as frequency,\n  COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as actual_pct\nFROM transactions\nWHERE amount <> 0\nGROUP BY LEFT(CAST(ABS(amount) AS VARCHAR), 1)\nORDER BY first_digit;\n\n-- Expected: 1=30.1%, 2=17.6%, 3=12.5%, 4=9.7%, 5=7.9%, 6=6.7%, 7=5.8%, 8=5.1%, 9=4.6%"
        },
        {
          title: 'Memory Aid: SQL Execution Order',
          type: 'callout',
          calloutType: 'tip',
          content: "'FROM WHERE GROUP HAVING SELECT ORDER' → 'Friendly Whales Gather Having Sorted Opinions'—this is the actual execution order, not the written order. WHERE filters BEFORE grouping; HAVING filters AFTER!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "LEFT JOIN vs. INNER JOIN is critical for finding missing records! INNER JOIN only shows matches—you'll MISS invoices without payments. Use LEFT JOIN to find ALL invoices, with NULL for unmatched payments."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• SELECT retrieves data; execution order differs from written order\n• JOIN types: INNER (matches only), LEFT/RIGHT (all from one side), FULL (all from both)\n• Aggregate functions (COUNT, SUM, AVG) with GROUP BY for analysis\n• WHERE filters rows; HAVING filters groups\n• SQL enables population testing, duplicate detection, gap analysis, Benford's Law"
        }
      ]
    }
  },
  {
    id: 'ISC-I-005',
    section: 'ISC',
    title: "Hardware & Infrastructure",
    description: "Understand IT infrastructure components, server architectures, and physical controls for IT audits",
    order: 5,
    duration: 45,
    difficulty: 'beginner',
    topics: ["Information Systems", "IT Infrastructure", "Hardware"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "IT infrastructure reliability directly impacts financial system availability and data integrity. Understanding hardware and infrastructure helps you assess physical security controls and business continuity capabilities."
        },
        {
          title: 'IT Infrastructure Overview',
          type: 'text',
          content: "IT infrastructure encompasses all hardware, software, networks, and facilities that support information systems. For auditors, understanding infrastructure helps assess availability, integrity, and security of financial systems."
        },
        {
          title: 'Hardware Components',
          type: 'table',
          headers: ["Component", "Function", "Audit Consideration"],
          rows: [
            ["CPU (Processor)", "Executes instructions", "Processing capacity, virtualization capability"],
            ["RAM (Memory)", "Temporary data storage", "Sufficient for applications, volatile data"],
            ["Storage (HDD/SSD)", "Persistent data storage", "Capacity, redundancy, encryption capability"],
            ["Network Interface", "Connectivity to network", "Bandwidth, redundancy, segmentation"],
            ["Power Supply", "Electricity to components", "Redundant PSUs, UPS, generators"]
          ]
        },
        {
          title: 'Server Types & Architectures',
          type: 'table',
          headers: ["Type", "Description", "Use Case"],
          rows: [
            ["Physical Server", "Dedicated hardware for one system", "High-performance, isolated workloads"],
            ["Virtual Server (VM)", "Software-emulated server on shared hardware", "Cost efficiency, flexibility"],
            ["Blade Server", "Modular servers in shared chassis", "High density data centers"],
            ["Mainframe", "Large-scale centralized processing", "Banks, insurance, legacy systems"],
            ["Container", "Lightweight isolated application environment", "Microservices, DevOps"]
          ]
        },
        {
          title: 'Storage Technologies',
          type: 'list',
          items: [
            "DAS (Direct Attached Storage): Storage connected directly to server—simple but not shared",
            "NAS (Network Attached Storage): File-level storage accessed over network—easy file sharing",
            "SAN (Storage Area Network): Block-level storage over dedicated network—high performance",
            "Object Storage: Data as objects with metadata—scalable for unstructured data (cloud)",
            "RAID Levels: Redundancy through multiple disks—RAID 1 (mirror), RAID 5 (striping with parity)"
          ]
        },
        {
          title: 'RAID Configurations',
          type: 'table',
          headers: ["RAID Level", "Method", "Fault Tolerance", "Trade-off"],
          rows: [
            ["RAID 0", "Striping only", "None", "Performance but no redundancy"],
            ["RAID 1", "Mirroring", "1 disk failure", "50% storage efficiency"],
            ["RAID 5", "Striping + distributed parity", "1 disk failure", "Good balance performance/redundancy"],
            ["RAID 6", "Striping + double parity", "2 disk failures", "Better protection, write penalty"],
            ["RAID 10", "Mirroring + striping", "1 disk per mirror", "High performance and redundancy"]
          ]
        },
        {
          title: 'Data Center Physical Controls',
          type: 'table',
          headers: ["Control Category", "Examples", "Purpose"],
          rows: [
            ["Physical Access", "Badges, biometrics, mantraps", "Prevent unauthorized entry"],
            ["Environmental", "HVAC, fire suppression, humidity", "Protect equipment from damage"],
            ["Power", "UPS, generators, dual feeds", "Ensure continuous operation"],
            ["Fire Protection", "FM-200, pre-action sprinklers", "Suppress fire without water damage"],
            ["Monitoring", "CCTV, sensors, alarms", "Detect and respond to incidents"]
          ]
        },
        {
          title: 'Virtualization Concepts',
          type: 'text',
          content: "Virtualization allows multiple virtual machines to run on single physical hardware. Hypervisor (VMware, Hyper-V) manages VMs and resource allocation. Benefits include better utilization, easier disaster recovery, and rapid provisioning. Risks include single point of failure (host), VM sprawl, and hypervisor vulnerabilities."
        },
        {
          title: 'High Availability Architecture',
          type: 'list',
          items: [
            "Redundancy: Duplicate components (servers, storage, network paths) eliminate single points of failure",
            "Clustering: Multiple servers act as one—if one fails, others take over automatically",
            "Load Balancing: Distributes traffic across servers for performance and availability",
            "Failover: Automatic switch to backup system when primary fails",
            "Geographic Distribution: Systems in multiple locations protect against site disasters"
          ]
        },
        {
          title: 'Memory Aid: RAID Levels',
          type: 'callout',
          calloutType: 'tip',
          content: "'RAID 0 = Zero protection, RAID 1 = One copy (mirror), RAID 5 = Five letters in PARITY, RAID 10 = 1+0 combined'. Remember: RAID is NOT a backup—it protects against hardware failure, not data corruption or deletion!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "RAID is NOT backup! RAID protects against disk failure but NOT against: data corruption, accidental deletion, ransomware, or site disasters. You still need proper backups even with RAID."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• IT infrastructure includes hardware, storage, networks, and facilities\n• Server types: physical, virtual, blade, mainframe, container\n• Storage options: DAS (direct), NAS (file-level), SAN (block-level)\n• RAID provides redundancy: 0 (none), 1 (mirror), 5 (parity), 10 (combined)\n• Data center controls: physical access, environmental, power, fire, monitoring\n• High availability through redundancy, clustering, load balancing, failover"
        }
      ]
    }
  },
  {
    id: 'ISC-I-006',
    section: 'ISC',
    title: "Cloud Computing: IaaS, PaaS, SaaS",
    description: "Understand cloud service models, deployment options, and shared responsibility for security and compliance",
    order: 6,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Information Systems", "Cloud Computing", "IT Infrastructure"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Most organizations now use cloud services for critical financial applications. Understanding cloud models and shared responsibility is essential for evaluating controls, assessing vendor risk, and determining appropriate audit procedures."
        },
        {
          title: 'Cloud Computing Fundamentals',
          type: 'text',
          content: "Cloud computing delivers computing resources (servers, storage, applications) over the internet on demand. NIST defines five essential characteristics: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service."
        },
        {
          title: 'Cloud Service Models',
          type: 'table',
          headers: ["Model", "What Provider Manages", "What Customer Manages", "Examples"],
          rows: [
            ["IaaS (Infrastructure)", "Hardware, virtualization, storage, networking", "OS, middleware, runtime, apps, data", "AWS EC2, Azure VMs, Google Compute"],
            ["PaaS (Platform)", "Above + OS, middleware, runtime", "Applications, data", "Heroku, Azure App Service, Google App Engine"],
            ["SaaS (Software)", "Everything except user data/config", "User data, configurations, access", "Salesforce, Office 365, QuickBooks Online"]
          ]
        },
        {
          title: 'Cloud Deployment Models',
          type: 'table',
          headers: ["Model", "Description", "Use Case", "Considerations"],
          rows: [
            ["Public Cloud", "Shared infrastructure, multi-tenant", "General workloads, cost optimization", "Lowest cost, shared risk, compliance limits"],
            ["Private Cloud", "Dedicated infrastructure for one org", "Regulated industries, sensitive data", "Higher cost, more control"],
            ["Hybrid Cloud", "Combination of public and private", "Burst capacity, gradual migration", "Complexity in management"],
            ["Community Cloud", "Shared by organizations with common needs", "Government, healthcare consortiums", "Shared compliance burden"]
          ]
        },
        {
          title: 'Shared Responsibility Model',
          type: 'text',
          content: "Security and compliance responsibilities are shared between cloud provider and customer. The division depends on service model—IaaS customers manage more; SaaS customers manage less. Understanding this boundary is critical for control evaluation."
        },
        {
          title: 'Responsibility by Service Model',
          type: 'table',
          headers: ["Layer", "IaaS", "PaaS", "SaaS"],
          rows: [
            ["Data Classification/Accountability", "Customer", "Customer", "Customer"],
            ["Client & Endpoint Protection", "Customer", "Customer", "Customer"],
            ["Identity & Access Management", "Customer", "Customer", "Shared"],
            ["Application Controls", "Customer", "Shared", "Provider"],
            ["Network Controls", "Shared", "Provider", "Provider"],
            ["Infrastructure Security", "Provider", "Provider", "Provider"],
            ["Physical Security", "Provider", "Provider", "Provider"]
          ]
        },
        {
          title: 'Cloud Security Considerations',
          type: 'list',
          items: [
            "Data Location: Where is data physically stored? Affects regulatory compliance (GDPR, data sovereignty)",
            "Data Segregation: How is your data isolated from other tenants in multi-tenant environment?",
            "Encryption: Is data encrypted at rest and in transit? Who manages keys?",
            "Access Controls: How are identities managed? Integration with enterprise IAM?",
            "Incident Response: What is provider's process? How are customers notified?",
            "Exit Strategy: How do you retrieve data if leaving provider? Format? Timeline?"
          ]
        },
        {
          title: 'Cloud Audit Considerations',
          type: 'list',
          items: [
            "SOC Reports: Obtain and review SOC 1/SOC 2 reports for cloud providers",
            "Complementary User Entity Controls (CUECs): Customer controls required for provider controls to be effective",
            "Subservice Organizations: Does provider use other cloud services (sub-processors)?",
            "Right to Audit: Does contract allow customer audits or penetration testing?",
            "Business Continuity: Provider's DR capabilities and RPO/RTO guarantees",
            "Data Breach Notification: Contractual requirements for breach notification timing"
          ]
        },
        {
          title: 'Cloud Governance Best Practices',
          type: 'text',
          content: "Establish cloud governance policy covering: approved providers, data classification for cloud, security requirements, procurement process, monitoring and review. Implement Cloud Access Security Broker (CASB) to monitor/control cloud usage."
        },
        {
          title: 'Memory Aid: Cloud Stack',
          type: 'callout',
          calloutType: 'tip',
          content: "'Pizza as a Service':\n• IaaS = Kitchen ingredients (you cook everything)\n• PaaS = Take-and-bake pizza (you bake, they prepare)\n• SaaS = Delivered pizza (just eat it)\nMore service = less customer responsibility!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Even in SaaS, customers are ALWAYS responsible for their data and access management! Moving to cloud doesn't eliminate your security obligations—it changes what you're responsible for. Review the shared responsibility model carefully."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Three service models: IaaS (infrastructure), PaaS (platform), SaaS (software)\n• Four deployment models: public, private, hybrid, community\n• Shared responsibility divides security duties between provider and customer\n• Customers always responsible for data classification and access management\n• SOC reports are key audit evidence for cloud provider controls\n• CUECs are customer controls needed for provider controls to work"
        }
      ]
    }
  },
  {
    id: 'ISC-I-007',
    section: 'ISC',
    title: "Network Fundamentals",
    description: "Understand network architecture, protocols, and security controls for evaluating IT infrastructure risks",
    order: 7,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Information Systems", "Networking", "IT Infrastructure"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Networks are the pathways through which all financial data travels. Understanding network security helps you assess risks of data interception, unauthorized access, and system availability—critical for IT general controls evaluation."
        },
        {
          title: 'Network Architecture Basics',
          type: 'text',
          content: "A network connects computing devices to share resources and communicate. Understanding network components helps auditors assess how data flows and where vulnerabilities may exist."
        },
        {
          title: 'Network Types by Scope',
          type: 'table',
          headers: ["Type", "Scope", "Description", "Example"],
          rows: [
            ["LAN", "Building/campus", "Local Area Network—high speed, single location", "Office network"],
            ["WAN", "Geographic regions", "Wide Area Network—connects distant LANs", "Corporate backbone"],
            ["MAN", "City/metro area", "Metropolitan Area Network", "City government network"],
            ["VPN", "Virtual overlay", "Encrypted tunnel over public network", "Remote worker access"],
            ["Internet", "Global", "Public worldwide network", "Web services, email"]
          ]
        },
        {
          title: 'OSI Model Layers',
          type: 'table',
          headers: ["Layer", "Name", "Function", "Protocols/Devices"],
          rows: [
            ["7", "Application", "User interface, application services", "HTTP, SMTP, FTP, DNS"],
            ["6", "Presentation", "Data formatting, encryption", "SSL/TLS, JPEG, ASCII"],
            ["5", "Session", "Connection management", "NetBIOS, RPC"],
            ["4", "Transport", "End-to-end delivery, error recovery", "TCP, UDP"],
            ["3", "Network", "Logical addressing, routing", "IP, ICMP, Routers"],
            ["2", "Data Link", "Physical addressing, framing", "Ethernet, MAC, Switches"],
            ["1", "Physical", "Bits on wire, physical transmission", "Cables, Hubs, NICs"]
          ]
        },
        {
          title: 'Key Network Devices',
          type: 'table',
          headers: ["Device", "OSI Layer", "Function", "Security Consideration"],
          rows: [
            ["Router", "Layer 3", "Connects networks, routes packets", "Access control lists (ACLs)"],
            ["Switch", "Layer 2", "Connects devices in LAN, forwards frames", "VLAN segmentation, port security"],
            ["Firewall", "Layers 3-7", "Filters traffic based on rules", "Rule configuration, logging"],
            ["Load Balancer", "Layer 4-7", "Distributes traffic across servers", "SSL termination, session handling"],
            ["IDS/IPS", "Layers 3-7", "Detects/prevents intrusions", "Signature updates, false positives"]
          ]
        },
        {
          title: 'Common Protocols & Ports',
          type: 'table',
          headers: ["Protocol", "Port", "Purpose", "Security Note"],
          rows: [
            ["HTTP", "80", "Web traffic (unencrypted)", "Use HTTPS instead"],
            ["HTTPS", "443", "Encrypted web traffic", "Verify certificate validity"],
            ["FTP", "21", "File transfer (unencrypted)", "Use SFTP (22) instead"],
            ["SSH", "22", "Secure shell access", "Key-based auth preferred"],
            ["RDP", "3389", "Remote desktop", "Restrict access, use VPN"],
            ["SQL Server", "1433", "Database access", "Never expose to internet"],
            ["SMTP", "25/587", "Email transmission", "Use TLS encryption"]
          ]
        },
        {
          title: 'Network Security Controls',
          type: 'list',
          items: [
            "Firewalls: Filter traffic based on source, destination, port, protocol—default deny recommended",
            "Network Segmentation: Separate networks (VLANs) limit breach impact—isolate sensitive systems",
            "DMZ (Demilitarized Zone): Buffer zone between internal network and internet for public-facing servers",
            "Intrusion Detection System (IDS): Monitors and alerts on suspicious traffic patterns",
            "Intrusion Prevention System (IPS): Actively blocks detected threats in real-time",
            "VPN: Encrypts traffic over untrusted networks—essential for remote access"
          ]
        },
        {
          title: 'Network Segmentation Best Practices',
          type: 'text',
          content: "Segment networks by function and sensitivity: Finance systems isolated from general corporate network. Use zero-trust principles—verify every connection regardless of network location. Production, development, and test environments should be separate. Implement micro-segmentation for critical assets."
        },
        {
          title: 'Wireless Network Security',
          type: 'list',
          items: [
            "WPA3: Current standard—strong encryption, use exclusively",
            "WPA2: Acceptable with strong passphrase—avoid WEP (broken)",
            "SSID: Hide or use non-descriptive names—don't broadcast 'Finance_Network'",
            "Guest Network: Separate from corporate—no access to internal resources",
            "MAC Filtering: Limited value—can be spoofed, not sole control",
            "802.1X: Certificate-based authentication for enterprise wireless"
          ]
        },
        {
          title: 'Memory Aid: OSI Layers',
          type: 'callout',
          calloutType: 'tip',
          content: "'Please Do Not Throw Sausage Pizza Away' (bottom to top: Physical, Data Link, Network, Transport, Session, Presentation, Application). Or top-down: 'All People Seem To Need Data Processing'."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "IDS vs. IPS: IDS only DETECTS and alerts—it doesn't block attacks. IPS actively PREVENTS by blocking malicious traffic. Know which provides monitoring only vs. active protection!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• OSI model has 7 layers from physical (1) to application (7)\n• Key devices: routers (layer 3), switches (layer 2), firewalls (3-7)\n• Network segmentation limits breach impact—isolate sensitive systems\n• DMZ protects internal network from internet-facing services\n• IDS detects threats; IPS prevents them\n• Use encrypted protocols: HTTPS, SFTP, SSH over unencrypted alternatives"
        }
      ]
    }
  },
  {
    id: 'ISC-I-008',
    section: 'ISC',
    title: "System Development Life Cycle",
    description: "Master SDLC phases, methodologies, and controls for evaluating system development and implementation risks",
    order: 8,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Information Systems", "SDLC", "IT Governance"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-C-3',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "System development without proper controls leads to applications with security vulnerabilities, processing errors, and unauthorized functionality. SDLC controls ensure new systems meet business requirements and maintain data integrity."
        },
        {
          title: 'SDLC Overview',
          type: 'text',
          content: "The System Development Life Cycle is a structured approach to developing, implementing, and maintaining information systems. Each phase has specific deliverables and controls to ensure quality and reduce risk."
        },
        {
          title: 'Traditional SDLC Phases',
          type: 'table',
          headers: ["Phase", "Purpose", "Key Deliverables", "Controls"],
          rows: [
            ["Planning", "Define scope, feasibility", "Project charter, business case", "Management approval, cost-benefit analysis"],
            ["Requirements", "Document what system must do", "Requirements specification", "User sign-off, traceability matrix"],
            ["Design", "How system will work", "Technical specifications", "Design review, security architecture"],
            ["Development", "Build the system", "Source code, unit tests", "Coding standards, code review, version control"],
            ["Testing", "Verify system works correctly", "Test plans, test results", "Independent testing, UAT sign-off"],
            ["Implementation", "Deploy to production", "Deployment plan, training", "Go-live approval, rollback plan"],
            ["Maintenance", "Ongoing support and updates", "Change requests, patches", "Change management process"]
          ]
        },
        {
          title: 'SDLC Methodologies Compared',
          type: 'table',
          headers: ["Methodology", "Approach", "Best For", "Audit Considerations"],
          rows: [
            ["Waterfall", "Sequential phases, no going back", "Stable requirements, regulated industries", "Clear documentation, formal sign-offs"],
            ["Agile/Scrum", "Iterative sprints, continuous delivery", "Evolving requirements, rapid development", "Less documentation, continuous testing"],
            ["DevOps", "Continuous integration/deployment", "Fast releases, cloud applications", "Automated controls, infrastructure as code"],
            ["Spiral", "Risk-driven iterations", "High-risk projects", "Risk assessments each cycle"],
            ["RAD", "Rapid prototyping", "Quick proof of concepts", "User involvement, prototype approval"]
          ]
        },
        {
          title: 'Critical SDLC Controls',
          type: 'list',
          items: [
            "Requirements Traceability: Link requirements to design, code, and test cases—ensures nothing missed",
            "Segregation of Duties: Developers shouldn't deploy to production or approve their own changes",
            "Code Review: Independent review of code before deployment catches errors and vulnerabilities",
            "Version Control: Track all changes to code with ability to revert—Git, SVN",
            "Testing Documentation: Unit, integration, system, and UAT test plans and results",
            "User Acceptance Testing (UAT): Business users verify system meets requirements before go-live",
            "Data Migration Controls: Validate data integrity when converting from old to new system"
          ]
        },
        {
          title: 'Testing Types',
          type: 'table',
          headers: ["Test Type", "Performed By", "Purpose", "When"],
          rows: [
            ["Unit Testing", "Developers", "Test individual components", "During development"],
            ["Integration Testing", "Dev/QA team", "Test component interactions", "After unit testing"],
            ["System Testing", "QA team", "Test complete system", "After integration"],
            ["UAT", "Business users", "Verify business requirements met", "Before deployment"],
            ["Regression Testing", "QA team", "Ensure changes don't break existing", "After any change"],
            ["Security Testing", "Security team", "Identify vulnerabilities", "Before deployment"],
            ["Performance Testing", "QA team", "Verify system handles load", "Before deployment"]
          ]
        },
        {
          title: 'Agile/DevOps Controls',
          type: 'text',
          content: "Agile environments require adapted controls: automated testing in CI/CD pipelines, infrastructure as code (version-controlled), feature flags for controlled releases, and continuous monitoring. Documentation may be in user stories rather than formal specs. Review process focuses on peer reviews and automated quality gates."
        },
        {
          title: 'Implementation/Go-Live Controls',
          type: 'list',
          items: [
            "Go-Live Checklist: All testing complete, training done, support ready, data migrated",
            "Management Approval: Formal sign-off from business and IT leadership",
            "Rollback Plan: Documented process to revert if deployment fails",
            "Parallel Processing: Run old and new systems simultaneously to verify results",
            "Post-Implementation Review: Assess what went well, lessons learned"
          ]
        },
        {
          title: 'Memory Aid: SDLC Phases',
          type: 'callout',
          calloutType: 'tip',
          content: "'People Really Demand Decent Testing In Maine' → Planning, Requirements, Design, Development, Testing, Implementation, Maintenance. Each phase builds on the previous!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "UAT (User Acceptance Testing) must be performed by BUSINESS USERS, not IT staff. If developers perform UAT, it's not independent verification that requirements are met. Always verify who actually signed off!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• SDLC phases: Planning → Requirements → Design → Development → Testing → Implementation → Maintenance\n• Waterfall = sequential; Agile = iterative; DevOps = continuous\n• Key controls: requirements traceability, segregation of duties, code review, testing\n• UAT must be performed by business users, not IT\n• Go-live requires management approval and rollback plan\n• Agile controls focus on automation and continuous testing"
        }
      ]
    }
  },
  {
    id: 'ISC-I-009',
    section: 'ISC',
    title: "Change Management Controls",
    description: "Evaluate IT change management processes that protect production system integrity and prevent unauthorized modifications",
    order: 9,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Information Systems", "ITGC", "Change Management"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Change management is a critical IT General Control (ITGC). Weak change controls allow unauthorized or untested modifications to production systems, potentially corrupting financial data or introducing processing errors that affect financial statements."
        },
        {
          title: 'Change Management Overview',
          type: 'text',
          content: "Change management ensures all modifications to IT systems are authorized, tested, documented, and properly implemented. It applies to applications, infrastructure, databases, and configurations. The goal is to minimize risk of disruption and unintended consequences."
        },
        {
          title: 'Types of Changes',
          type: 'table',
          headers: ["Type", "Description", "Process", "Example"],
          rows: [
            ["Standard", "Pre-approved, low-risk, routine", "Simplified approval", "Password reset, adding user"],
            ["Normal", "Typical change with standard process", "Full CAB review", "Application enhancement"],
            ["Emergency", "Urgent fix to critical issue", "Expedited approval, retrospective review", "Production outage fix"],
            ["Major", "Significant impact or risk", "Enhanced review, executive approval", "ERP upgrade, infrastructure change"]
          ]
        },
        {
          title: 'Change Management Process',
          type: 'table',
          headers: ["Step", "Activity", "Key Controls"],
          rows: [
            ["1. Request", "Document change and business justification", "Change request form, business owner sign-off"],
            ["2. Assess", "Evaluate risk, impact, resources needed", "Risk assessment, impact analysis"],
            ["3. Approve", "Obtain necessary authorizations", "CAB approval, management sign-off"],
            ["4. Develop", "Build and unit test in development", "Coding standards, version control"],
            ["5. Test", "Test in non-production environment", "Test plan, UAT sign-off"],
            ["6. Deploy", "Implement in production", "Deployment checklist, rollback plan"],
            ["7. Review", "Verify successful implementation", "Post-implementation review, closure"]
          ]
        },
        {
          title: 'Critical Change Management Controls',
          type: 'list',
          items: [
            "Segregation of Duties: Developers cannot migrate their own code to production",
            "Environment Separation: Development, testing, and production environments are isolated",
            "Change Advisory Board (CAB): Cross-functional group reviews and approves changes",
            "Testing Requirements: Changes tested in non-production before deployment",
            "Rollback Capability: Ability to revert changes if issues occur",
            "Documentation: All changes documented with approvals, test results, deployment details",
            "Access Restrictions: Production access limited to authorized deployment personnel"
          ]
        },
        {
          title: 'Environment Separation',
          type: 'table',
          headers: ["Environment", "Purpose", "Who Has Access", "Data"],
          rows: [
            ["Development", "Build and initial testing", "Developers", "Synthetic/test data only"],
            ["Test/QA", "Formal testing", "QA team, testers", "Sanitized production copy"],
            ["Staging/UAT", "User acceptance, pre-prod", "Business users, limited IT", "Production-like data"],
            ["Production", "Live business operations", "Operations team only", "Actual business data"]
          ]
        },
        {
          title: 'Emergency Change Process',
          type: 'text',
          content: "Emergency changes bypass normal approval for urgent issues but still require controls: verbal approval from authorized manager (documented afterward), testing where possible, post-implementation review within 24-48 hours, and retrospective CAB review. Emergency changes should be exception, not routine—high volume indicates process problems."
        },
        {
          title: 'Common Change Management Weaknesses',
          type: 'list',
          items: [
            "Developers with production access: Allows unauthorized direct changes",
            "Insufficient testing documentation: Can't verify testing actually occurred",
            "Missing approvals: Changes deployed without proper authorization",
            "Excessive emergency changes: Indicates broken normal process",
            "Lack of rollback plans: Inability to recover from failed deployments",
            "Development on production data: Risk of data corruption or exposure"
          ]
        },
        {
          title: 'Change Management Audit Procedures',
          type: 'list',
          items: [
            "Select sample of changes and verify documentation, approvals, testing for each",
            "Review access controls to production environment",
            "Analyze emergency change volume and review retroactive approvals",
            "Verify segregation of duties—compare developer list to deployment access",
            "Review CAB meeting minutes for appropriate participation and decisions",
            "Test for unauthorized changes using file integrity monitoring or hash comparisons"
          ]
        },
        {
          title: 'Memory Aid: Change Process',
          type: 'callout',
          calloutType: 'tip',
          content: "'REQUEST → ASSESS → APPROVE → BUILD → TEST → DEPLOY → REVIEW' = 'RAA-BTDR'. Remember: No change goes to production without all seven steps!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Developers should NEVER have production access! This is a fundamental segregation of duties control. If developers can deploy their own code, they could introduce unauthorized changes without detection."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Change management protects production system integrity\n• Change types: standard (pre-approved), normal (CAB review), emergency (expedited)\n• Process: Request → Assess → Approve → Develop → Test → Deploy → Review\n• Key control: segregation—developers cannot deploy to production\n• Environments must be separated: dev, test, staging, production\n• Emergency changes require retrospective review within 24-48 hours"
        }
      ]
    }
  },
  {
    id: 'ISC-I-010',
    section: 'ISC',
    title: "Disaster Recovery & BCP",
    description: "Understand business continuity planning and disaster recovery strategies for ensuring system availability and data protection",
    order: 10,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Information Systems", "Business Continuity", "Disaster Recovery"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-II-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Business continuity and disaster recovery directly impact an organization's ability to maintain financial operations during disruptions. Inadequate DR/BCP can threaten going concern and creates material operational risk."
        },
        {
          title: 'BCP vs. DR Distinction',
          type: 'text',
          content: "Business Continuity Planning (BCP) is the overall process of maintaining business operations during and after a disruption. Disaster Recovery (DR) specifically focuses on IT systems and data recovery. DR is a subset of BCP."
        },
        {
          title: 'Key Recovery Metrics',
          type: 'table',
          headers: ["Metric", "Definition", "Example", "Business Impact"],
          rows: [
            ["RTO", "Recovery Time Objective—max acceptable downtime", "4 hours", "How long can we operate without this system?"],
            ["RPO", "Recovery Point Objective—max acceptable data loss", "1 hour", "How much data can we afford to lose?"],
            ["MTPD", "Maximum Tolerable Period of Disruption", "24 hours", "When does disruption become catastrophic?"],
            ["WRT", "Work Recovery Time—time to catch up backlog", "8 hours", "Time to process transactions during outage"]
          ]
        },
        {
          title: 'BCP Development Process',
          type: 'table',
          headers: ["Phase", "Activities", "Key Outputs"],
          rows: [
            ["Business Impact Analysis (BIA)", "Identify critical processes, dependencies, impacts", "Critical process list, RTO/RPO requirements"],
            ["Risk Assessment", "Identify threats, vulnerabilities, likelihood", "Risk register, prioritized threats"],
            ["Strategy Development", "Determine recovery approach for each process", "Recovery strategies, resource requirements"],
            ["Plan Development", "Document procedures, roles, contacts", "BCP document, DR runbooks"],
            ["Testing & Exercises", "Validate plans work as intended", "Test results, lessons learned"],
            ["Maintenance", "Keep plans current as business changes", "Updated plans, annual review"]
          ]
        },
        {
          title: 'Disaster Recovery Site Options',
          type: 'table',
          headers: ["Site Type", "Description", "RTO", "Cost"],
          rows: [
            ["Hot Site", "Fully equipped, data synchronized, ready immediately", "Minutes to hours", "Highest"],
            ["Warm Site", "Equipped but needs data restoration", "Hours to days", "Moderate"],
            ["Cold Site", "Empty facility, needs equipment and data", "Days to weeks", "Lowest"],
            ["Mobile Site", "Portable facilities, can deploy anywhere", "Hours to days", "Variable"],
            ["Cloud DR", "Virtual infrastructure in cloud provider", "Minutes to hours", "Pay-as-you-go"]
          ]
        },
        {
          title: 'Backup Strategies',
          type: 'table',
          headers: ["Type", "What's Backed Up", "Restore Speed", "Storage Required"],
          rows: [
            ["Full", "All data every time", "Fastest restore", "Most storage"],
            ["Incremental", "Only changes since last backup", "Slowest restore (need all incrementals)", "Least storage"],
            ["Differential", "Changes since last full backup", "Moderate (full + one differential)", "Moderate storage"],
            ["Continuous/CDP", "Real-time replication", "Near instant", "Significant"]
          ]
        },
        {
          title: '3-2-1 Backup Rule',
          type: 'text',
          content: "Industry best practice: maintain at least 3 copies of data, on 2 different media types, with 1 copy offsite. This protects against hardware failure, site disasters, and data corruption. Modern interpretation includes cloud as offsite copy and immutable backups for ransomware protection."
        },
        {
          title: 'DR Testing Types',
          type: 'table',
          headers: ["Test Type", "Description", "Disruption Level"],
          rows: [
            ["Checklist/Walkthrough", "Review plan documentation", "None"],
            ["Tabletop Exercise", "Discussion-based scenario walkthrough", "None"],
            ["Simulation", "Practice response without actual failover", "Minimal"],
            ["Parallel Test", "Activate DR site while production runs", "Low"],
            ["Full Interruption", "Actual failover to DR site", "High"]
          ]
        },
        {
          title: 'BCP/DR Plan Components',
          type: 'list',
          items: [
            "Plan Activation Criteria: What events trigger the plan?",
            "Roles and Responsibilities: Who does what during disaster?",
            "Contact Information: Emergency contacts, vendors, authorities",
            "Recovery Procedures: Step-by-step instructions for each system",
            "Communication Plan: How to notify employees, customers, stakeholders",
            "Alternate Locations: Where to operate if primary site unavailable",
            "Resource Requirements: Equipment, personnel, supplies needed"
          ]
        },
        {
          title: 'Memory Aid: RTO vs RPO',
          type: 'callout',
          calloutType: 'tip',
          content: "'RTO = Time to recover (how long can we be down?); RPO = Point of recovery (how much data can we lose?)'. RTO looks FORWARD (time to restore); RPO looks BACKWARD (data since last backup)."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Hot site ≠ instant recovery! Even with a hot site, you still need time to activate, verify data sync, redirect traffic, and confirm operations. Hot site provides fastest RTO but not zero RTO."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• BCP = overall business continuity; DR = IT systems specifically\n• RTO = maximum downtime; RPO = maximum data loss\n• DR sites: hot (fastest/expensive), warm, cold (slowest/cheapest)\n• 3-2-1 rule: 3 copies, 2 media types, 1 offsite\n• Backup types: full, incremental, differential, continuous\n• Plans must be tested regularly and updated when business changes"
        }
      ]
    }
  },
  {
    id: 'ISC-I-011',
    section: 'ISC',
    title: "IT Governance: COBIT & ITIL",
    description: "Master IT governance frameworks and service management practices for evaluating organizational IT controls",
    order: 11,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Information Systems", "IT Governance", "Frameworks"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "IT governance ensures technology supports business objectives and manages IT-related risks. Understanding COBIT and ITIL helps auditors evaluate whether organizations have appropriate structures, policies, and processes to govern their IT investments."
        },
        {
          title: 'IT Governance Overview',
          type: 'text',
          content: "IT governance is the framework ensuring IT investments support business objectives, resources are used responsibly, and IT risks are managed appropriately. It's the responsibility of the board and executive management, not just IT department."
        },
        {
          title: 'COBIT 2019 Framework',
          type: 'text',
          content: "COBIT (Control Objectives for Information and Related Technologies) is an IT governance and management framework from ISACA. It provides comprehensive guidance for enterprise governance of information and technology."
        },
        {
          title: 'COBIT Core Principles',
          type: 'list',
          items: [
            "Meeting Stakeholder Needs: Align IT with enterprise goals and stakeholder requirements",
            "Covering the Enterprise End-to-End: Integrate governance with enterprise governance",
            "Applying a Single Integrated Framework: Consolidate guidance from multiple standards",
            "Enabling a Holistic Approach: Address all components needed for effective governance",
            "Separating Governance from Management: Distinct responsibilities and activities",
            "Tailoring to Enterprise Needs: Not one-size-fits-all—adapt to specific context"
          ]
        },
        {
          title: 'COBIT Governance & Management Objectives',
          type: 'table',
          headers: ["Domain", "Focus Area", "Key Processes"],
          rows: [
            ["EDM (Governance)", "Evaluate, Direct, Monitor", "Set direction, ensure goals achieved, monitor performance"],
            ["APO (Align, Plan)", "Strategic alignment", "Strategy, architecture, innovation, portfolio, budget"],
            ["BAI (Build, Acquire)", "Solution delivery", "Programs, requirements, solutions, changes, assets"],
            ["DSS (Deliver, Service)", "Operations", "Operations, service requests, problems, continuity, security"],
            ["MEA (Monitor, Evaluate)", "Performance assessment", "Performance, internal controls, compliance"]
          ]
        },
        {
          title: 'ITIL Framework',
          type: 'text',
          content: "ITIL (Information Technology Infrastructure Library) is the most widely adopted IT service management (ITSM) framework. It focuses on aligning IT services with business needs through best practice processes."
        },
        {
          title: 'ITIL 4 Service Value System',
          type: 'list',
          items: [
            "Guiding Principles: Focus on value, start where you are, progress iteratively, collaborate, think holistically",
            "Governance: Direction and control activities",
            "Service Value Chain: Operating model for creating value (plan, improve, engage, design, obtain/build, deliver/support)",
            "Practices: Sets of resources for performing work (34 practices across general, service, technical)",
            "Continual Improvement: Ongoing enhancement of services and practices"
          ]
        },
        {
          title: 'Key ITIL Practices',
          type: 'table',
          headers: ["Practice", "Purpose", "Audit Relevance"],
          rows: [
            ["Incident Management", "Restore normal service quickly", "Response time metrics, escalation procedures"],
            ["Problem Management", "Identify and address root causes", "Recurring issues analysis, knowledge base"],
            ["Change Enablement", "Control changes to minimize risk", "Change approval, testing, documentation"],
            ["Service Level Management", "Set and monitor service targets", "SLA compliance, availability metrics"],
            ["Information Security", "Protect information assets", "Security policies, access controls"],
            ["Service Continuity", "Ensure critical services survive disasters", "BCP/DR plans, testing"]
          ]
        },
        {
          title: 'COBIT vs. ITIL',
          type: 'table',
          headers: ["Aspect", "COBIT", "ITIL"],
          rows: [
            ["Primary Focus", "IT governance and management", "IT service management"],
            ["Scope", "Broad enterprise IT", "IT operations and services"],
            ["Audience", "Board, executives, auditors", "IT service managers, operations"],
            ["Approach", "Control objectives, metrics", "Process-based best practices"],
            ["Use Together", "COBIT for 'what' to control", "ITIL for 'how' to deliver services"]
          ]
        },
        {
          title: 'Other Relevant Frameworks',
          type: 'list',
          items: [
            "ISO 27001: Information security management system (ISMS) certification standard",
            "NIST Cybersecurity Framework: Risk-based approach to managing cybersecurity risk",
            "ISO 20000: IT service management certification standard (based on ITIL)",
            "TOGAF: Enterprise architecture framework",
            "COSO: Internal control and enterprise risk management (broader than IT)"
          ]
        },
        {
          title: 'Memory Aid: COBIT Domains',
          type: 'callout',
          calloutType: 'tip',
          content: "'EDM-APO-BAI-DSS-MEA' = 'Every Director Must Always Be Delivering Superior Services, Monitoring Everything Always'. EDM governs; APO-BAI-DSS-MEA manage!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "COBIT separates Governance (EDM domain—board/executive responsibility) from Management (APO, BAI, DSS, MEA—IT leadership responsibility). Don't confuse governance activities with management activities!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• IT governance ensures IT aligns with business objectives\n• COBIT: governance/management framework—5 domains (EDM, APO, BAI, DSS, MEA)\n• ITIL: service management framework—focuses on delivering IT services\n• COBIT = 'what' controls needed; ITIL = 'how' to deliver services\n• Governance (direction/oversight) differs from management (execution)\n• Other frameworks: ISO 27001, NIST CSF, COSO"
        }
      ]
    }
  },
  {
    id: 'ISC-I-012',
    section: 'ISC',
    title: "Big Data & Data Analytics",
    description: "Understand big data concepts, analytics techniques, and their applications in audit and financial analysis",
    order: 12,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Information Systems", "Data Analytics", "Big Data"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Data analytics is transforming audit and accounting. Understanding big data and analytics enables CPAs to test 100% of transactions, identify anomalies, perform predictive analysis, and provide greater audit assurance through data-driven insights."
        },
        {
          title: 'Big Data Characteristics (5 Vs)',
          type: 'table',
          headers: ["Characteristic", "Description", "Example"],
          rows: [
            ["Volume", "Massive amounts of data", "Terabytes to petabytes of transaction data"],
            ["Velocity", "Speed of data generation and processing", "Real-time payment processing, IoT sensors"],
            ["Variety", "Different types and formats", "Structured (databases), unstructured (emails, documents)"],
            ["Veracity", "Data quality and reliability", "Incomplete records, data entry errors"],
            ["Value", "Business insights derived from data", "Fraud patterns, customer behavior predictions"]
          ]
        },
        {
          title: 'Types of Analytics',
          type: 'table',
          headers: ["Type", "Question Answered", "Techniques", "Audit Application"],
          rows: [
            ["Descriptive", "What happened?", "Summarization, aggregation, visualization", "Transaction analysis, trend identification"],
            ["Diagnostic", "Why did it happen?", "Drill-down, correlation, root cause", "Variance investigation, anomaly explanation"],
            ["Predictive", "What will happen?", "Machine learning, statistical modeling", "Going concern assessment, fraud prediction"],
            ["Prescriptive", "What should we do?", "Optimization, simulation", "Resource allocation, risk response"]
          ]
        },
        {
          title: 'Analytics Techniques for Auditors',
          type: 'list',
          items: [
            "Population Testing: Analyze 100% of transactions instead of sampling",
            "Anomaly Detection: Identify outliers and unusual patterns automatically",
            "Benford's Law: Analyze first digit distribution to detect manipulation",
            "Duplicate Detection: Find duplicate payments, vendors, or entries",
            "Gap Analysis: Identify missing sequence numbers in invoices or checks",
            "Three-Way Matching: Automate PO-receipt-invoice reconciliation",
            "Trend Analysis: Identify unexpected changes over time",
            "Stratification: Break down populations by amount, date, user for analysis"
          ]
        },
        {
          title: 'Data Visualization Best Practices',
          type: 'table',
          headers: ["Chart Type", "Best For", "Example Use"],
          rows: [
            ["Line Chart", "Trends over time", "Revenue trends by month"],
            ["Bar Chart", "Comparing categories", "Sales by region"],
            ["Pie Chart", "Part-to-whole (limited use)", "Expense breakdown"],
            ["Scatter Plot", "Correlation between variables", "Sales vs. advertising spend"],
            ["Heat Map", "Patterns across two dimensions", "Transaction volume by day/hour"],
            ["Box Plot", "Distribution and outliers", "Journal entry amounts by user"]
          ]
        },
        {
          title: 'Big Data Technologies',
          type: 'table',
          headers: ["Technology", "Purpose", "When Used"],
          rows: [
            ["Hadoop", "Distributed storage and processing", "Processing very large datasets"],
            ["Spark", "Fast in-memory data processing", "Real-time analytics, ML workloads"],
            ["Data Lake", "Raw data storage (any format)", "Staging all data before analysis"],
            ["Data Warehouse", "Structured data for reporting", "Business intelligence, dashboards"],
            ["ETL Tools", "Extract, Transform, Load data", "Moving data between systems"],
            ["BI Tools", "Visualization and reporting", "Tableau, Power BI, Excel"]
          ]
        },
        {
          title: 'Machine Learning Basics',
          type: 'text',
          content: "Machine learning enables systems to learn from data without explicit programming. Supervised learning uses labeled data to predict outcomes (fraud/not fraud). Unsupervised learning finds patterns in unlabeled data (customer segments). Common applications in audit: fraud detection, anomaly identification, document classification."
        },
        {
          title: 'Data Analytics Process for Audit',
          type: 'list',
          items: [
            "1. Define Objective: What audit question are you trying to answer?",
            "2. Obtain Data: Request complete data extracts from client systems",
            "3. Validate Data: Verify completeness and accuracy of extracted data",
            "4. Prepare Data: Clean, format, and transform for analysis",
            "5. Analyze: Apply appropriate analytical techniques",
            "6. Interpret: Evaluate results, identify follow-up items",
            "7. Document: Record procedures, results, and conclusions"
          ]
        },
        {
          title: 'Data Quality Validation',
          type: 'list',
          items: [
            "Completeness: Do record counts match source system totals?",
            "Accuracy: Do calculated totals agree to financial statements?",
            "Validity: Are there invalid dates, negative amounts, or impossible values?",
            "Consistency: Do related fields make sense together?",
            "Timeliness: Does data cover the full audit period?"
          ]
        },
        {
          title: 'Memory Aid: 5 Vs of Big Data',
          type: 'callout',
          calloutType: 'tip',
          content: "'Very Very Very Very Valuable' = Volume, Velocity, Variety, Veracity, Value. Think of big data as VERY large, VERY fast, VERY diverse, VERY questionable quality, and VERY valuable!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Analytics doesn't replace professional judgment! You still need to investigate exceptions, understand business context, and exercise skepticism. Analytics identifies WHAT to investigate; auditors determine WHY and SO WHAT."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Big Data: 5 Vs—Volume, Velocity, Variety, Veracity, Value\n• Analytics types: Descriptive (what), Diagnostic (why), Predictive (will), Prescriptive (should)\n• Audit analytics: population testing, anomaly detection, Benford's Law, gap analysis\n• Data warehouse = structured reporting; Data lake = raw storage\n• Always validate data completeness and accuracy before analysis\n• Analytics supports but doesn't replace professional judgment"
        }
      ]
    }
  },
  {
    id: 'ISC-II-001',
    section: 'ISC',
    title: "Cybersecurity Threat Landscape",
    description: "Understand cyber threats, attack vectors, and threat actors to assess organizational security risk",
    order: 13,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["Security", "Cybersecurity", "Risk Assessment"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Cybersecurity incidents can result in financial statement fraud, data breaches affecting customer trust, regulatory penalties, and business disruption. Understanding threats helps auditors assess IT risks and evaluate security controls."
        },
        {
          title: 'Threat Actor Categories',
          type: 'table',
          headers: ["Actor Type", "Motivation", "Sophistication", "Target"],
          rows: [
            ["Script Kiddies", "Curiosity, bragging rights", "Low—use existing tools", "Easy targets, random"],
            ["Hacktivists", "Political/social agenda", "Low to medium", "Organizations opposing their cause"],
            ["Cybercriminals", "Financial gain", "Medium to high", "Any monetizable target"],
            ["Insiders", "Revenge, financial gain, ideology", "Varies", "Own organization"],
            ["Nation-States", "Espionage, disruption, warfare", "Very high (APT)", "Strategic targets"],
            ["Competitors", "Competitive advantage", "Medium to high", "Industry rivals"]
          ]
        },
        {
          title: 'Common Attack Vectors',
          type: 'table',
          headers: ["Vector", "Description", "Defense"],
          rows: [
            ["Phishing", "Deceptive emails to steal credentials or install malware", "Training, email filtering, MFA"],
            ["Malware", "Malicious software (virus, trojan, worm, ransomware)", "Antivirus, patching, least privilege"],
            ["Social Engineering", "Manipulating humans to bypass security", "Security awareness training"],
            ["Credential Theft", "Stealing usernames/passwords", "MFA, password policies, monitoring"],
            ["Supply Chain", "Compromising trusted third parties", "Vendor risk management, verification"],
            ["Zero-Day", "Exploiting unknown vulnerabilities", "Defense in depth, behavior monitoring"],
            ["DDoS", "Overwhelming systems with traffic", "DDoS protection, redundancy"]
          ]
        },
        {
          title: 'Malware Types',
          type: 'list',
          items: [
            "Virus: Requires user action to spread, attaches to files",
            "Worm: Self-replicating, spreads across networks automatically",
            "Trojan: Disguised as legitimate software, creates backdoor",
            "Ransomware: Encrypts data, demands payment for decryption key",
            "Spyware: Secretly monitors user activity, steals information",
            "Rootkit: Hides deep in system, provides persistent access",
            "Keylogger: Records keystrokes to capture passwords and data"
          ]
        },
        {
          title: 'Social Engineering Techniques',
          type: 'table',
          headers: ["Technique", "Method", "Example"],
          rows: [
            ["Phishing", "Mass deceptive emails", "Fake bank notification"],
            ["Spear Phishing", "Targeted emails using personal info", "Email appearing from CEO to CFO"],
            ["Whaling", "Targeting executives", "Fake legal subpoena to CEO"],
            ["Vishing", "Voice-based phishing", "Call claiming to be IT support"],
            ["Smishing", "SMS-based phishing", "Text with malicious link"],
            ["Pretexting", "Creating false scenario", "Posing as auditor to get access"],
            ["Baiting", "Offering something enticing", "Infected USB left in parking lot"]
          ]
        },
        {
          title: 'Business Email Compromise (BEC)',
          type: 'text',
          content: "BEC is a sophisticated scam targeting businesses with wire transfers. Attackers compromise or spoof executive email accounts and request urgent wire transfers to fraudulent accounts. FBI reports billions in losses annually. Controls: verification callbacks, dual authorization for wire transfers, email authentication (DMARC/DKIM/SPF)."
        },
        {
          title: 'Ransomware Impact',
          type: 'text',
          content: "Ransomware encrypts data and systems, demanding cryptocurrency payment. Even with payment, decryption isn't guaranteed. Modern variants also exfiltrate data, threatening to publish if ransom isn't paid (double extortion). Prevention: backups, patching, email security, network segmentation, endpoint protection."
        },
        {
          title: 'Cyber Kill Chain',
          type: 'table',
          headers: ["Phase", "Attacker Activity", "Detection Opportunity"],
          rows: [
            ["Reconnaissance", "Research target", "Monitor for scanning activity"],
            ["Weaponization", "Create malware/exploit", "Threat intelligence sharing"],
            ["Delivery", "Send via email, web, USB", "Email filtering, web security"],
            ["Exploitation", "Trigger vulnerability", "Endpoint protection, patching"],
            ["Installation", "Install malware/backdoor", "Behavior monitoring, AV"],
            ["Command & Control", "Establish remote control", "Network monitoring, DNS analysis"],
            ["Actions on Objective", "Achieve goal (steal, encrypt)", "Data loss prevention, anomaly detection"]
          ]
        },
        {
          title: 'Memory Aid: Threat Actors',
          type: 'callout',
          calloutType: 'tip',
          content: "'SHINCCO' = Script kiddies, Hacktivists, Insiders, Nation-states, Cybercriminals, Competitors, Organized crime. From amateur (scripts) to professional (nation-states)—sophistication increases!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Insiders are often the biggest threat! They already have authorized access, know valuable assets, and can bypass perimeter controls. Don't focus only on external threats—insider threat programs are essential."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Threat actors range from script kiddies (low skill) to nation-states (APT)\n• Common vectors: phishing, malware, social engineering, supply chain\n• Ransomware: encrypts data + may exfiltrate for double extortion\n• BEC targets wire transfers through email impersonation\n• Social engineering exploits human psychology, not technical flaws\n• Cyber kill chain shows attack progression—detect early to prevent impact"
        }
      ]
    }
  },
  {
    id: 'ISC-II-002',
    section: 'ISC',
    title: "Security Controls: Preventive, Detective, Corrective",
    description: "Classify and evaluate security controls by function to assess organizational security posture",
    order: 14,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Security", "IT Controls", "Risk Management"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Understanding control classifications helps auditors evaluate whether organizations have balanced security controls. Over-reliance on one type (e.g., all preventive) creates gaps. A complete control environment includes preventive, detective, and corrective controls."
        },
        {
          title: 'Control Classification Overview',
          type: 'text',
          content: "Security controls can be classified by function (what they do) and by implementation (how they work). Understanding both dimensions helps evaluate whether control objectives are adequately addressed."
        },
        {
          title: 'Controls by Function',
          type: 'table',
          headers: ["Function", "Purpose", "When Active", "Examples"],
          rows: [
            ["Preventive", "Stop incidents before they occur", "Before event", "Access controls, firewalls, encryption"],
            ["Detective", "Identify incidents when they occur", "During/after event", "IDS, log monitoring, audits"],
            ["Corrective", "Restore systems after incidents", "After event", "Backups, incident response, patches"],
            ["Deterrent", "Discourage attempts", "Before event", "Warning banners, security cameras"],
            ["Compensating", "Alternative when primary control isn't feasible", "Varies", "Manual review when automation unavailable"]
          ]
        },
        {
          title: 'Controls by Implementation',
          type: 'table',
          headers: ["Type", "Description", "Examples"],
          rows: [
            ["Administrative", "Policies, procedures, training", "Security policy, background checks, awareness training"],
            ["Technical", "Hardware/software mechanisms", "Firewalls, encryption, access controls, antivirus"],
            ["Physical", "Tangible barriers and protections", "Locks, badges, guards, fences, CCTV"]
          ]
        },
        {
          title: 'Preventive Controls - Detail',
          type: 'list',
          items: [
            "Access Controls: Authentication and authorization to limit who can access what",
            "Encryption: Renders data unreadable without decryption key",
            "Firewalls: Block unauthorized network traffic based on rules",
            "Segregation of Duties: No single person can complete critical transaction alone",
            "Input Validation: Prevents malformed data from entering systems",
            "Security Awareness Training: Educates users to recognize threats",
            "Patch Management: Updates software to fix known vulnerabilities"
          ]
        },
        {
          title: 'Detective Controls - Detail',
          type: 'list',
          items: [
            "Intrusion Detection Systems (IDS): Monitors for suspicious activity patterns",
            "Log Monitoring: Reviews system logs for anomalies and security events",
            "Security Information and Event Management (SIEM): Aggregates and correlates security data",
            "Vulnerability Scanning: Identifies weaknesses before attackers exploit them",
            "Audit Trails: Records who did what and when for investigation",
            "Reconciliations: Compares records to identify discrepancies",
            "Penetration Testing: Simulates attacks to find exploitable weaknesses"
          ]
        },
        {
          title: 'Corrective Controls - Detail',
          type: 'list',
          items: [
            "Backup and Recovery: Restores data and systems after incidents",
            "Incident Response: Documented process to contain and remediate incidents",
            "Business Continuity: Maintains operations during and after disasters",
            "Patch Deployment: Fixes vulnerabilities discovered through detection",
            "Account Suspension: Disables compromised accounts immediately",
            "Forensic Analysis: Investigates incidents to prevent recurrence"
          ]
        },
        {
          title: 'Control Matrix Example',
          type: 'table',
          headers: ["Control", "Function", "Implementation"],
          rows: [
            ["Password policy", "Preventive", "Administrative"],
            ["Multi-factor authentication", "Preventive", "Technical"],
            ["Security camera", "Detective/Deterrent", "Physical"],
            ["Antivirus software", "Preventive/Detective", "Technical"],
            ["Security guard", "Preventive/Deterrent", "Physical"],
            ["Log review", "Detective", "Technical/Administrative"],
            ["Backup restoration", "Corrective", "Technical"],
            ["Security awareness training", "Preventive", "Administrative"]
          ]
        },
        {
          title: 'Defense in Depth',
          type: 'text',
          content: "Defense in depth layers multiple controls so failure of one doesn't result in compromise. Layers include: perimeter (firewalls), network (segmentation), host (antivirus, hardening), application (input validation), data (encryption), and user (training). No single control is perfect—layers provide redundancy."
        },
        {
          title: 'Memory Aid: Control Functions',
          type: 'callout',
          calloutType: 'tip',
          content: "'PDC = Police Department Cycle':\n• Preventive = Lock your doors (stop crime)\n• Detective = Security cameras (catch crime)\n• Corrective = Insurance/repairs (recover from crime)\nYou need all three for complete protection!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Some controls serve multiple functions! Antivirus is PREVENTIVE (blocks known malware) AND DETECTIVE (alerts on suspicious behavior). Security cameras are DETECTIVE (record incidents) AND DETERRENT (discourage attempts). Consider all functions when evaluating!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Controls classified by function: Preventive, Detective, Corrective, Deterrent, Compensating\n• Controls classified by implementation: Administrative, Technical, Physical\n• Preventive controls stop incidents; Detective identify them; Corrective recover\n• Defense in depth layers multiple controls for redundancy\n• Some controls serve multiple functions (e.g., antivirus = preventive + detective)\n• Balanced control environment includes all types"
        }
      ]
    }
  },
  {
    id: 'ISC-II-003',
    section: 'ISC',
    title: "Encryption & Cryptography",
    description: "Master encryption concepts, algorithms, and key management for evaluating data protection controls",
    order: 15,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Security", "Cryptography", "Data Protection"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-C-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Encryption protects sensitive financial data from unauthorized access. Understanding cryptographic concepts helps auditors evaluate whether data protection controls are adequate for compliance (PCI-DSS, HIPAA) and overall security posture."
        },
        {
          title: 'Cryptography Fundamentals',
          type: 'text',
          content: "Cryptography transforms readable data (plaintext) into unreadable form (ciphertext) using algorithms and keys. Proper encryption ensures confidentiality, integrity, authentication, and non-repudiation of data."
        },
        {
          title: 'Cryptographic Goals',
          type: 'table',
          headers: ["Goal", "Definition", "How Achieved"],
          rows: [
            ["Confidentiality", "Only authorized parties can read data", "Encryption algorithms"],
            ["Integrity", "Data hasn't been altered", "Hash functions, digital signatures"],
            ["Authentication", "Verify identity of sender", "Digital signatures, certificates"],
            ["Non-Repudiation", "Sender cannot deny sending", "Digital signatures"]
          ]
        },
        {
          title: 'Symmetric vs. Asymmetric Encryption',
          type: 'table',
          headers: ["Aspect", "Symmetric", "Asymmetric"],
          rows: [
            ["Keys Used", "Same key encrypts and decrypts", "Public key encrypts; private key decrypts"],
            ["Speed", "Fast—suitable for large data", "Slow—typically for small data/keys"],
            ["Key Distribution", "Challenge—must share securely", "Easy—public key can be shared openly"],
            ["Common Algorithms", "AES, 3DES, Blowfish", "RSA, ECC, Diffie-Hellman"],
            ["Use Cases", "Bulk data encryption", "Key exchange, digital signatures"]
          ]
        },
        {
          title: 'Common Encryption Algorithms',
          type: 'table',
          headers: ["Algorithm", "Type", "Key Size", "Status"],
          rows: [
            ["AES", "Symmetric", "128, 192, 256 bits", "Current standard—use this"],
            ["3DES", "Symmetric", "168 bits effective", "Legacy—being phased out"],
            ["DES", "Symmetric", "56 bits", "Obsolete—easily broken"],
            ["RSA", "Asymmetric", "2048+ bits", "Widely used for key exchange"],
            ["ECC", "Asymmetric", "256+ bits", "Efficient—smaller keys, same security"],
            ["Blowfish/Twofish", "Symmetric", "Variable", "Alternative to AES"]
          ]
        },
        {
          title: 'Hash Functions',
          type: 'text',
          content: "Hash functions produce fixed-size output (hash/digest) from any input. Properties: one-way (can't reverse), deterministic (same input = same output), collision-resistant (hard to find two inputs with same hash). Used for password storage, integrity verification, digital signatures."
        },
        {
          title: 'Common Hash Algorithms',
          type: 'table',
          headers: ["Algorithm", "Output Size", "Status"],
          rows: [
            ["MD5", "128 bits", "Broken—don't use for security"],
            ["SHA-1", "160 bits", "Deprecated—collisions found"],
            ["SHA-256", "256 bits", "Current standard—recommended"],
            ["SHA-3", "Variable", "Newest standard"],
            ["bcrypt/scrypt", "Variable", "For password hashing—includes salt"]
          ]
        },
        {
          title: 'Digital Signatures',
          type: 'text',
          content: "Digital signatures use asymmetric cryptography to verify authenticity and integrity. Sender hashes message and encrypts hash with their private key. Recipient decrypts with sender's public key and compares hashes. Provides authentication (proves sender identity) and non-repudiation (sender can't deny signing)."
        },
        {
          title: 'Public Key Infrastructure (PKI)',
          type: 'list',
          items: [
            "Certificate Authority (CA): Trusted entity that issues digital certificates",
            "Digital Certificate: Binds public key to identity (like digital ID card)",
            "Registration Authority (RA): Verifies identity before CA issues certificate",
            "Certificate Revocation List (CRL): List of revoked certificates",
            "OCSP: Online Certificate Status Protocol—real-time certificate validation"
          ]
        },
        {
          title: 'Encryption at Rest vs. in Transit',
          type: 'table',
          headers: ["Type", "What It Protects", "Technologies"],
          rows: [
            ["At Rest", "Stored data (databases, files, backups)", "AES encryption, full disk encryption, database TDE"],
            ["In Transit", "Data moving across networks", "TLS/SSL, VPN, HTTPS"],
            ["In Use", "Data being processed (emerging)", "Homomorphic encryption, secure enclaves"]
          ]
        },
        {
          title: 'Key Management',
          type: 'list',
          items: [
            "Key Generation: Use cryptographically secure random number generators",
            "Key Storage: Protect keys in hardware security modules (HSM) or key vaults",
            "Key Distribution: Securely transmit keys to authorized parties",
            "Key Rotation: Regularly change keys to limit exposure from compromise",
            "Key Destruction: Securely destroy keys when no longer needed",
            "Key Recovery: Ability to recover keys for business continuity (escrow)"
          ]
        },
        {
          title: 'Memory Aid: Symmetric vs Asymmetric',
          type: 'callout',
          calloutType: 'tip',
          content: "'Symmetric = Same key' (one key for both)\n'Asymmetric = A pair of keys' (public + private)\nThink: Symmetric is like a shared house key; Asymmetric is like a mailbox (anyone can drop in with public slot, only owner opens with private key)."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Encryption alone doesn't protect data if keys are poorly managed! If keys are stored unprotected alongside encrypted data, or if the same key is used forever, encryption provides false sense of security. Always evaluate KEY MANAGEMENT!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Cryptographic goals: Confidentiality, Integrity, Authentication, Non-Repudiation\n• Symmetric (AES): same key, fast, for bulk data\n• Asymmetric (RSA): public/private pair, slow, for key exchange and signatures\n• Hash functions: one-way, for integrity and passwords (use SHA-256+)\n• Digital signatures prove authenticity and non-repudiation\n• PKI manages certificates and trust relationships\n• Key management is critical—protect generation, storage, rotation, destruction"
        }
      ]
    }
  },
  {
    id: 'ISC-II-004',
    section: 'ISC',
    title: "Logical Access Controls",
    description: "Evaluate authentication, authorization, and access management controls that protect system and data access",
    order: 16,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Security", "Access Controls", "ITGC"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Logical access controls are a critical IT General Control (ITGC). Weak access controls allow unauthorized users to view, modify, or delete financial data, potentially resulting in fraud or material misstatement."
        },
        {
          title: 'Access Control Fundamentals',
          type: 'text',
          content: "Logical access controls restrict who can access systems and data electronically. The process involves identification (who are you?), authentication (prove it), and authorization (what can you do?). Each step must be properly controlled."
        },
        {
          title: 'The AAA Framework',
          type: 'table',
          headers: ["Component", "Question", "Controls"],
          rows: [
            ["Authentication", "Are you who you claim to be?", "Passwords, MFA, biometrics, certificates"],
            ["Authorization", "What are you allowed to do?", "Permissions, roles, access control lists"],
            ["Accounting", "What did you do?", "Audit logs, monitoring, session tracking"]
          ]
        },
        {
          title: 'Authentication Factors',
          type: 'table',
          headers: ["Factor", "Description", "Examples", "Weakness"],
          rows: [
            ["Something You Know", "Knowledge-based", "Password, PIN, security questions", "Can be guessed, phished, forgotten"],
            ["Something You Have", "Possession-based", "Token, smart card, phone (SMS/app)", "Can be lost, stolen, cloned"],
            ["Something You Are", "Biometric", "Fingerprint, face, iris, voice", "Can't be changed if compromised"],
            ["Somewhere You Are", "Location-based", "IP address, GPS, network", "Can be spoofed"],
            ["Something You Do", "Behavior-based", "Typing pattern, mouse movement", "Can vary, less reliable"]
          ]
        },
        {
          title: 'Multi-Factor Authentication (MFA)',
          type: 'text',
          content: "MFA requires two or more factors from DIFFERENT categories. Password + PIN = NOT MFA (both 'something you know'). Password + authenticator app = MFA (knowledge + possession). MFA dramatically reduces credential theft risk. Should be required for privileged accounts and remote access."
        },
        {
          title: 'Password Best Practices',
          type: 'list',
          items: [
            "Length over complexity: 12+ characters preferred over short complex passwords",
            "No common passwords: Block dictionary words, common patterns (Password1!)",
            "No password reuse: Different password for each system",
            "Password managers: Enable unique, complex passwords without memorization",
            "No mandatory periodic changes: NIST now recommends against forced rotation (leads to weak patterns)",
            "Breach detection: Check passwords against known compromised lists"
          ]
        },
        {
          title: 'Access Control Models',
          type: 'table',
          headers: ["Model", "Description", "Use Case"],
          rows: [
            ["DAC (Discretionary)", "Owner controls access to their resources", "File systems, databases"],
            ["MAC (Mandatory)", "System enforces access based on classifications", "Military, classified information"],
            ["RBAC (Role-Based)", "Access based on job role/function", "Enterprise applications—most common"],
            ["ABAC (Attribute-Based)", "Access based on attributes (user, resource, environment)", "Complex, dynamic access decisions"]
          ]
        },
        {
          title: 'Role-Based Access Control (RBAC)',
          type: 'text',
          content: "RBAC assigns permissions to roles (Accountant, Manager, Admin), then assigns users to roles. Benefits: easier administration, consistent access, supports segregation of duties. Users should have minimum necessary access (least privilege) and roles should be reviewed regularly."
        },
        {
          title: 'Account Management Controls',
          type: 'list',
          items: [
            "Provisioning: Formal process to grant access based on approved request",
            "Access Reviews: Periodic verification that access is still appropriate",
            "Termination: Immediate revocation when employee leaves or changes roles",
            "Privileged Access: Enhanced controls for admin/root accounts",
            "Service Accounts: Non-human accounts for applications—limit and monitor",
            "Generic/Shared Accounts: Discourage—limits accountability"
          ]
        },
        {
          title: 'Access Review Procedures',
          type: 'table',
          headers: ["Review Type", "Frequency", "Focus"],
          rows: [
            ["User Access Review", "Quarterly/Annual", "Does each user still need their access?"],
            ["Privileged Access Review", "Monthly/Quarterly", "Are admin accounts justified and monitored?"],
            ["Segregation of Duties", "Quarterly", "Do any users have conflicting access?"],
            ["Terminated User Review", "Ongoing", "Has access been removed for departed employees?"],
            ["Dormant Account Review", "Monthly", "Are inactive accounts disabled?"]
          ]
        },
        {
          title: 'Memory Aid: Authentication Factors',
          type: 'callout',
          calloutType: 'tip',
          content: "'KNOW-HAVE-ARE' = Something you KNOW (password), HAVE (token), ARE (biometric). True MFA requires factors from at least TWO different categories. Password + PIN = just one category = NOT MFA!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Password + security question is NOT MFA! Both are 'something you know.' SMS text codes are 'something you have' (the phone), so password + SMS IS MFA—though SMS is vulnerable to SIM swapping and not recommended for high-security scenarios."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Access control: Identification → Authentication → Authorization\n• Authentication factors: Know (password), Have (token), Are (biometric)\n• MFA requires 2+ factors from DIFFERENT categories\n• RBAC assigns permissions to roles, users to roles—most common enterprise model\n• Least privilege: grant minimum access necessary\n• Access reviews verify continued appropriateness of access"
        }
      ]
    }
  },
  {
    id: 'ISC-II-005',
    section: 'ISC',
    title: "Physical Access Controls",
    description: "Understand physical security controls that protect IT infrastructure, facilities, and sensitive areas",
    order: 17,
    duration: 40,
    difficulty: 'beginner',
    topics: ["Security", "Physical Security", "IT Controls"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-B-3',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Physical access to servers, network equipment, or workstations can bypass all logical controls. An attacker with physical access can steal hard drives, install malware, or directly access unattended systems. Physical security is the foundation of all other security."
        },
        {
          title: 'Physical Security Overview',
          type: 'text',
          content: "Physical security protects facilities, equipment, and people from unauthorized physical access and environmental threats. It complements logical controls—both are necessary for comprehensive security."
        },
        {
          title: 'Defense in Depth - Physical Layers',
          type: 'table',
          headers: ["Layer", "Purpose", "Controls"],
          rows: [
            ["Perimeter", "Outer boundary protection", "Fences, gates, lighting, guards"],
            ["Building", "Facility entrance control", "Locks, badges, receptionist, turnstiles"],
            ["Secure Areas", "Sensitive zone protection", "Mantraps, biometrics, card readers"],
            ["Server Room/Data Center", "Critical asset protection", "Separate access, environmental controls"],
            ["Equipment", "Individual device protection", "Cable locks, locked cabinets, port disablers"]
          ]
        },
        {
          title: 'Physical Access Control Types',
          type: 'table',
          headers: ["Control", "Description", "Considerations"],
          rows: [
            ["Badge/Card Reader", "Proximity or smart card access", "Can be lost, stolen, shared—audit logs essential"],
            ["PIN Pad", "Numeric code entry", "Can be observed, shared—often combined with badge"],
            ["Biometric", "Fingerprint, iris, face recognition", "Most reliable—can't be shared or forgotten"],
            ["Mantrap", "Dual-door vestibule—one closes before other opens", "Prevents tailgating, piggybacking"],
            ["Security Guard", "Human monitoring and response", "Can verify identity, respond to anomalies"],
            ["Turnstile", "One person at a time entry", "Prevents tailgating"]
          ]
        },
        {
          title: 'Visitor Management',
          type: 'list',
          items: [
            "Sign-in/Sign-out: Log all visitors with time, purpose, and host",
            "Escort Requirements: Visitors accompanied in sensitive areas",
            "Visitor Badges: Distinct from employee badges, collected on exit",
            "Pre-Authorization: Advance approval for visitors to sensitive areas",
            "Background Checks: For contractors with extended access"
          ]
        },
        {
          title: 'Surveillance and Monitoring',
          type: 'table',
          headers: ["Control", "Function", "Best Practice"],
          rows: [
            ["CCTV", "Visual monitoring and recording", "Cover entry points, critical areas; retain recordings"],
            ["Motion Sensors", "Detect movement in secured areas", "After-hours monitoring, alarm integration"],
            ["Intrusion Alarms", "Alert on unauthorized entry", "Door contacts, glass break sensors"],
            ["Security Guards", "Active monitoring and response", "Patrol routes, checkpoint verification"],
            ["Access Logs", "Record who accessed when", "Regular review, exception investigation"]
          ]
        },
        {
          title: 'Data Center Physical Controls',
          type: 'list',
          items: [
            "Separate Access Controls: Data center access separate from general building access",
            "Two-Person Rule: Critical operations require two authorized individuals",
            "Equipment Tracking: Log all equipment entering/leaving data center",
            "Rack Locks: Individual server racks locked to prevent unauthorized access",
            "No Windows: Prevent visual surveillance of equipment and configurations",
            "Fire Suppression: FM-200 or similar clean agent—no water damage",
            "Environmental Monitoring: Temperature, humidity, water leak detection"
          ]
        },
        {
          title: 'Environmental Controls',
          type: 'table',
          headers: ["Threat", "Control", "Purpose"],
          rows: [
            ["Fire", "Detection (smoke/heat), suppression (FM-200, pre-action)", "Protect equipment and data"],
            ["Water", "Raised floors, leak detection, drains", "Prevent equipment damage"],
            ["Temperature", "HVAC, hot/cold aisle containment", "Prevent overheating"],
            ["Humidity", "Humidifiers/dehumidifiers", "Prevent static and condensation"],
            ["Power", "UPS, generators, dual feeds", "Ensure continuous operation"]
          ]
        },
        {
          title: 'Media and Equipment Controls',
          type: 'list',
          items: [
            "Asset Tracking: Inventory all equipment with serial numbers and locations",
            "Secure Disposal: Degauss, shred, or physically destroy storage media",
            "Equipment Removal: Authorization required to remove equipment from facility",
            "Clear Desk Policy: Sensitive documents secured when unattended",
            "Screen Lock: Workstations lock automatically after inactivity",
            "USB Port Disabling: Prevent unauthorized data transfer or malware"
          ]
        },
        {
          title: 'Memory Aid: Physical Security Layers',
          type: 'callout',
          calloutType: 'tip',
          content: "'Outside In': Perimeter → Building → Floor → Room → Rack → Server. Each layer adds protection. Think of concentric circles—an attacker must bypass ALL layers to reach critical assets."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Tailgating/Piggybacking is a major physical security weakness! One authorized person badges in, unauthorized person follows through. Controls: mantraps, turnstiles, security awareness training, guards watching for tailgating."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Physical security uses defense in depth: perimeter → building → room → equipment\n• Access controls: badges, PINs, biometrics; mantraps prevent tailgating\n• Visitor management: sign-in, escort, distinct badges\n• Surveillance: CCTV, motion sensors, access logs\n• Environmental: fire suppression, HVAC, power backup\n• Media disposal must be secure—degauss, shred, or destroy"
        }
      ]
    }
  },
  {
    id: 'ISC-II-006',
    section: 'ISC',
    title: "Identity & Access Management",
    description: "Master IAM concepts including identity lifecycle, single sign-on, federation, and privileged access management",
    order: 18,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Security", "Identity Management", "Access Controls"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Identity and Access Management (IAM) is foundational to IT security and compliance. Poor IAM leads to unauthorized access, segregation of duties violations, and audit findings. Understanding IAM helps evaluate organizational access control effectiveness."
        },
        {
          title: 'IAM Overview',
          type: 'text',
          content: "IAM encompasses the policies, processes, and technologies that manage digital identities and control access to resources. It includes identity lifecycle management, authentication, authorization, and access governance."
        },
        {
          title: 'Identity Lifecycle',
          type: 'table',
          headers: ["Phase", "Activities", "Controls"],
          rows: [
            ["Provisioning", "Create identity, assign initial access", "Approval workflow, HR integration"],
            ["Maintenance", "Update access as roles change", "Access requests, periodic reviews"],
            ["De-provisioning", "Remove access when no longer needed", "Termination procedures, automated triggers"],
            ["Re-certification", "Validate continued need for access", "Periodic access reviews, manager attestation"]
          ]
        },
        {
          title: 'IAM Components',
          type: 'list',
          items: [
            "Identity Repository: Central directory of users, groups, and attributes (Active Directory, LDAP)",
            "Authentication Services: Verify user identity through credentials",
            "Authorization Services: Determine what authenticated users can access",
            "Single Sign-On (SSO): One authentication grants access to multiple systems",
            "Federation: Trust relationships enabling access across organizations",
            "Privileged Access Management (PAM): Enhanced controls for admin accounts"
          ]
        },
        {
          title: 'Single Sign-On (SSO)',
          type: 'table',
          headers: ["Aspect", "Description", "Consideration"],
          rows: [
            ["Benefit", "Users authenticate once for all systems", "Better user experience, fewer passwords"],
            ["Risk", "Single point of failure/compromise", "If SSO compromised, all systems exposed"],
            ["Protocols", "SAML, OAuth, OpenID Connect, Kerberos", "Choose based on application compatibility"],
            ["Control", "Requires strong authentication at SSO", "MFA essential for SSO"],
            ["Logging", "Centralized authentication logs", "Easier monitoring and anomaly detection"]
          ]
        },
        {
          title: 'Federation and Trust',
          type: 'text',
          content: "Federation enables users to access resources across organizational boundaries using their home organization credentials. Identity Provider (IdP) authenticates users; Service Provider (SP) provides resources. Trust established through certificates and metadata exchange. Common for cloud applications, partner access, and consumer identity (social login)."
        },
        {
          title: 'Common Identity Protocols',
          type: 'table',
          headers: ["Protocol", "Use Case", "How It Works"],
          rows: [
            ["SAML 2.0", "Enterprise SSO, federation", "XML-based assertions between IdP and SP"],
            ["OAuth 2.0", "Authorization for APIs", "Grants limited access tokens"],
            ["OpenID Connect", "Authentication layer on OAuth", "Adds identity verification to OAuth"],
            ["Kerberos", "Windows domain authentication", "Ticket-based, mutual authentication"],
            ["LDAP", "Directory services query", "Access user/group information"]
          ]
        },
        {
          title: 'Privileged Access Management (PAM)',
          type: 'list',
          items: [
            "Privileged Accounts: Admin, root, service accounts with elevated access",
            "Vault/Safe: Secure storage for privileged credentials—checked out as needed",
            "Just-in-Time Access: Temporary elevation only when needed, then revoked",
            "Session Recording: Record privileged sessions for review and forensics",
            "Break-Glass Procedures: Emergency access with enhanced monitoring",
            "Password Rotation: Automatic change of privileged passwords after each use"
          ]
        },
        {
          title: 'Identity Governance',
          type: 'table',
          headers: ["Control", "Purpose", "Frequency"],
          rows: [
            ["Access Certification", "Managers validate user access is appropriate", "Quarterly/Annual"],
            ["Segregation of Duties", "Prevent conflicting access combinations", "Continuous"],
            ["Role Mining", "Analyze access patterns to define roles", "As needed"],
            ["Orphan Account Detection", "Find accounts without valid owners", "Monthly"],
            ["Entitlement Review", "Validate permissions within applications", "Annual"]
          ]
        },
        {
          title: 'Service Accounts',
          type: 'text',
          content: "Service accounts are non-human identities used by applications to access resources. Risks: often over-privileged, passwords rarely changed, shared across teams. Controls: dedicated account per application, least privilege, managed credentials (rotate regularly), monitoring for interactive use, document owner and purpose."
        },
        {
          title: 'IAM Audit Considerations',
          type: 'list',
          items: [
            "Review provisioning process—are approvals documented and appropriate?",
            "Test timely de-provisioning—compare terminated employees to active accounts",
            "Evaluate access review process—are reviews thorough or rubber-stamped?",
            "Assess privileged account controls—PAM in place? Sessions monitored?",
            "Check service accounts—documented, least privilege, passwords rotated?",
            "Verify segregation of duties—SOD matrix defined and enforced?"
          ]
        },
        {
          title: 'Memory Aid: Identity Lifecycle',
          type: 'callout',
          calloutType: 'tip',
          content: "'JOIN → MOVE → LEAVE' = Provisioning (onboarding), Maintenance (role changes), De-provisioning (offboarding). Every identity goes through this cycle!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "SSO makes strong authentication CRITICAL, not optional! Without MFA at the SSO point, a compromised password grants access to ALL connected systems. SSO without MFA = consolidated risk, not reduced risk."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Identity lifecycle: provision → maintain → de-provision\n• SSO: one login for multiple systems—requires strong authentication\n• Federation: trust between organizations using IdP and SP\n• PAM: enhanced controls for privileged/admin accounts\n• Service accounts need documentation, least privilege, password rotation\n• Identity governance: access reviews, SOD, role management"
        }
      ]
    }
  },
  {
    id: 'ISC-II-007',
    section: 'ISC',
    title: "Privacy Principles & GAPP",
    description: "Master Generally Accepted Privacy Principles for evaluating organizational privacy programs and controls",
    order: 19,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Security", "Privacy", "Compliance"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Privacy regulations carry significant penalties and reputational risk. CPAs must understand privacy principles to evaluate compliance, advise clients on privacy programs, and perform SOC 2 examinations that include the Privacy Trust Services Criterion."
        },
        {
          title: 'Privacy vs. Security',
          type: 'text',
          content: "Privacy and security are related but distinct. Security protects data from unauthorized access (confidentiality, integrity, availability). Privacy governs how personal information is collected, used, retained, and disclosed. You can have security without privacy (e.g., secure data used inappropriately), but you cannot have privacy without security."
        },
        {
          title: 'GAPP Overview',
          type: 'text',
          content: "Generally Accepted Privacy Principles (GAPP), developed by AICPA and CICA, provide a framework for managing privacy risk. GAPP consists of 10 privacy principles with 73 measurable criteria, forming the basis for the Privacy Trust Services Criterion in SOC 2 reports."
        },
        {
          title: 'The 10 GAPP Principles',
          type: 'table',
          headers: ["Principle", "Description", "Key Requirement"],
          rows: [
            ["1. Management", "Accountability and governance", "Privacy policies, responsibility assigned, training"],
            ["2. Notice", "Inform individuals about practices", "Privacy notice before/at collection"],
            ["3. Choice & Consent", "Options about data use", "Opt-in/opt-out for data use beyond primary purpose"],
            ["4. Collection", "Limit data gathered", "Collect only for identified purposes"],
            ["5. Use, Retention, Disposal", "Limit how data is used and kept", "Use only for stated purposes, retain only as needed"],
            ["6. Access", "Allow individuals to review/update", "Provide access to personal data, correction ability"],
            ["7. Disclosure", "Share only as stated", "Third parties bound by agreements"],
            ["8. Security", "Protect personal information", "Appropriate safeguards against unauthorized access"],
            ["9. Quality", "Keep data accurate", "Maintain accurate, complete, timely data"],
            ["10. Monitoring & Enforcement", "Ensure compliance", "Procedures to address complaints, monitor compliance"]
          ]
        },
        {
          title: 'Personal Information Defined',
          type: 'list',
          items: [
            "PII (Personally Identifiable Information): Information that can identify an individual",
            "Direct Identifiers: Name, SSN, email, driver's license",
            "Indirect Identifiers: ZIP code, birth date, gender—can identify when combined",
            "Sensitive PII: Financial data, health info, biometrics—requires enhanced protection",
            "De-identified Data: Cannot reasonably identify individual—fewer restrictions"
          ]
        },
        {
          title: 'Fair Information Practice Principles (FIPPs)',
          type: 'text',
          content: "FIPPs are foundational privacy principles from the 1970s that underpin modern privacy laws: Notice/Awareness, Choice/Consent, Access/Participation, Integrity/Security, Enforcement/Redress. GAPP expands on FIPPs with more detailed, auditable criteria."
        },
        {
          title: 'Privacy Notice Requirements',
          type: 'list',
          items: [
            "What personal information is collected and why",
            "How information will be used",
            "With whom information may be shared",
            "How individuals can access or correct their data",
            "How information is protected",
            "How to contact the organization with questions/complaints",
            "How the notice may be updated"
          ]
        },
        {
          title: 'Consent Types',
          type: 'table',
          headers: ["Type", "Description", "When Required"],
          rows: [
            ["Opt-In", "Affirmative consent before collection/use", "Sensitive data, secondary purposes"],
            ["Opt-Out", "Collection proceeds unless individual objects", "Marketing, non-sensitive secondary uses"],
            ["Implied Consent", "Inferred from actions (browsing website)", "Basic website functionality"],
            ["Express Consent", "Explicit agreement (checkbox, signature)", "Most regulations require for PII"]
          ]
        },
        {
          title: 'Data Minimization Principle',
          type: 'text',
          content: "Collect only the minimum personal information necessary for the stated purpose. Don't collect 'nice to have' data. Retain only as long as needed, then securely dispose. Less data = less risk. This principle is fundamental to GDPR, CCPA, and most privacy regulations."
        },
        {
          title: 'Privacy Program Components',
          type: 'list',
          items: [
            "Privacy Officer: Designated individual accountable for privacy program",
            "Privacy Policies: Documented policies covering all GAPP principles",
            "Data Inventory: Know what personal data you have and where it is",
            "Privacy Impact Assessments: Evaluate privacy risks of new initiatives",
            "Training: Regular privacy awareness training for employees",
            "Incident Response: Process for privacy breach handling",
            "Third-Party Management: Contracts and oversight for vendors handling PII"
          ]
        },
        {
          title: 'Memory Aid: GAPP Principles',
          type: 'callout',
          calloutType: 'tip',
          content: "'MNC-CURAD-SQM' = Management, Notice, Choice, Collection, Use/Retention/Disposal, Access, Disclosure, Security, Quality, Monitoring. Or think: 'Manage Notice of Collection, Use, Access, Disclosure, Securely with Quality Monitoring'."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Privacy is NOT just about security! An organization can have excellent security controls but still violate privacy by using personal information inappropriately or without consent. Privacy addresses the 'should we' question, not just 'can we protect it'."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Privacy governs collection, use, retention, disclosure of personal information\n• GAPP: 10 principles providing comprehensive privacy framework\n• Notice + Choice: Tell people and give them options\n• Data minimization: Collect only what's needed, keep only as long as necessary\n• Privacy requires security, but security alone isn't privacy\n• Privacy program needs: officer, policies, data inventory, training, incident response"
        }
      ]
    }
  },
  {
    id: 'ISC-II-008',
    section: 'ISC',
    title: "HIPAA Requirements",
    description: "Understand HIPAA privacy and security rules for healthcare organizations and their business associates",
    order: 20,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Security", "Privacy", "Healthcare Compliance"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "HIPAA violations carry penalties up to $1.5 million per incident. CPAs auditing healthcare organizations, serving as business associates, or providing IT assurance must understand HIPAA requirements to evaluate compliance and avoid personal liability."
        },
        {
          title: 'HIPAA Overview',
          type: 'text',
          content: "The Health Insurance Portability and Accountability Act (HIPAA) protects the privacy and security of health information. It includes the Privacy Rule (how PHI can be used/disclosed), Security Rule (safeguards for electronic PHI), and Breach Notification Rule."
        },
        {
          title: 'Who HIPAA Applies To',
          type: 'table',
          headers: ["Entity Type", "Description", "Examples"],
          rows: [
            ["Covered Entities", "Healthcare providers, plans, clearinghouses", "Hospitals, doctors, insurance companies"],
            ["Business Associates", "Third parties handling PHI for covered entities", "Cloud providers, billing services, consultants"],
            ["Subcontractors", "Business associates of business associates", "IT vendors serving a billing company"]
          ]
        },
        {
          title: 'Protected Health Information (PHI)',
          type: 'list',
          items: [
            "PHI: Individually identifiable health information in any form",
            "ePHI: Electronic PHI—subject to Security Rule",
            "18 HIPAA Identifiers: Names, dates, SSN, medical record numbers, photos, etc.",
            "De-Identified Data: PHI stripped of 18 identifiers—no longer subject to HIPAA",
            "Limited Data Set: Some identifiers removed—requires data use agreement"
          ]
        },
        {
          title: 'Privacy Rule Key Requirements',
          type: 'table',
          headers: ["Requirement", "Description"],
          rows: [
            ["Minimum Necessary", "Use/disclose only minimum PHI needed for purpose"],
            ["Notice of Privacy Practices", "Inform patients how PHI will be used"],
            ["Patient Rights", "Access, amendment, accounting of disclosures"],
            ["Authorization", "Written permission for uses beyond treatment, payment, operations"],
            ["Safeguards", "Administrative, physical, technical protections"],
            ["Training", "Workforce training on privacy policies"]
          ]
        },
        {
          title: 'Permitted Uses Without Authorization',
          type: 'list',
          items: [
            "Treatment: Providing care, coordinating with other providers",
            "Payment: Billing, claims processing, collections",
            "Healthcare Operations: Quality assessment, training, credentialing",
            "Required by Law: Court orders, public health reporting",
            "Incidental Disclosures: If reasonable safeguards in place"
          ]
        },
        {
          title: 'Security Rule Safeguards',
          type: 'table',
          headers: ["Category", "Examples", "Required/Addressable"],
          rows: [
            ["Administrative", "Risk analysis, training, policies, incident response", "Mix of both"],
            ["Physical", "Facility access, workstation security, device controls", "Mix of both"],
            ["Technical", "Access controls, audit logs, encryption, integrity", "Mix of both"]
          ]
        },
        {
          title: 'Required vs. Addressable',
          type: 'text',
          content: "Required specifications must be implemented as stated. Addressable specifications require assessment—if reasonable and appropriate, implement it; if not, document why and implement equivalent alternative. 'Addressable' does NOT mean optional!"
        },
        {
          title: 'Security Rule Technical Safeguards',
          type: 'list',
          items: [
            "Access Control: Unique user IDs, emergency access procedures, auto-logoff, encryption",
            "Audit Controls: Hardware/software logging of PHI access",
            "Integrity Controls: Electronic mechanisms to verify PHI hasn't been altered",
            "Authentication: Verify person accessing ePHI is who they claim",
            "Transmission Security: Encryption and integrity controls for ePHI in transit"
          ]
        },
        {
          title: 'Breach Notification Requirements',
          type: 'table',
          headers: ["Scenario", "Notification Required", "Timeline"],
          rows: [
            ["Breach affecting 500+", "Individuals, HHS, media", "Within 60 days"],
            ["Breach affecting <500", "Individuals, HHS (annual log)", "Within 60 days / annual"],
            ["Business Associate breach", "Notify Covered Entity", "Per BAA, typically 60 days"]
          ]
        },
        {
          title: 'Business Associate Agreements',
          type: 'list',
          items: [
            "Required contract between covered entity and business associate",
            "Specifies permitted uses and disclosures of PHI",
            "Requires appropriate safeguards",
            "Reporting requirements for security incidents and breaches",
            "Subcontractor requirements (flow-down provisions)",
            "Return or destruction of PHI upon termination"
          ]
        },
        {
          title: 'HIPAA Penalties',
          type: 'table',
          headers: ["Tier", "Culpability", "Penalty Range"],
          rows: [
            ["Tier 1", "Unaware of violation", "$100-$50,000 per violation"],
            ["Tier 2", "Reasonable cause, not willful neglect", "$1,000-$50,000 per violation"],
            ["Tier 3", "Willful neglect, corrected within 30 days", "$10,000-$50,000 per violation"],
            ["Tier 4", "Willful neglect, not corrected", "$50,000+ per violation, up to $1.5M/year"]
          ]
        },
        {
          title: 'Memory Aid: HIPAA Safeguards',
          type: 'callout',
          calloutType: 'tip',
          content: "'APT Security' = Administrative, Physical, Technical safeguards. Remember: Administrative controls the people, Physical controls the place, Technical controls the technology. You need all three!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "'Addressable' does NOT mean optional! You must either implement the addressable specification OR document why it's not reasonable/appropriate AND implement an equivalent alternative measure. HHS auditors will ask for this documentation."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• HIPAA applies to covered entities and their business associates\n• PHI is individually identifiable health information in any form\n• Privacy Rule: minimum necessary, patient rights, authorization requirements\n• Security Rule: administrative, physical, technical safeguards for ePHI\n• Breach notification within 60 days; 500+ also requires media/HHS notice\n• BAAs required with all business associates handling PHI"
        }
      ]
    }
  },
  {
    id: 'ISC-II-009',
    section: 'ISC',
    title: "GDPR & Global Privacy",
    description: "Navigate GDPR requirements and international privacy regulations affecting organizations with global operations",
    order: 21,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Security", "Privacy", "International Compliance"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "GDPR applies to any organization processing EU residents' data, regardless of where the organization is located. With fines up to 4% of global revenue, understanding GDPR is essential for advising clients with international operations or customers."
        },
        {
          title: 'GDPR Overview',
          type: 'text',
          content: "The General Data Protection Regulation (GDPR) is the EU's comprehensive privacy law effective May 2018. It harmonizes data protection across EU/EEA, grants extensive rights to data subjects, and imposes significant obligations on organizations processing personal data."
        },
        {
          title: 'GDPR Territorial Scope',
          type: 'list',
          items: [
            "Organizations established in EU/EEA processing personal data",
            "Organizations outside EU offering goods/services to EU residents",
            "Organizations outside EU monitoring behavior of EU residents",
            "Applies regardless of where data is processed or stored",
            "Even free services to EU residents may trigger GDPR"]
        },
        {
          title: 'Key GDPR Definitions',
          type: 'table',
          headers: ["Term", "Definition"],
          rows: [
            ["Personal Data", "Any information relating to identified or identifiable person"],
            ["Data Subject", "Individual whose personal data is processed"],
            ["Controller", "Entity determining purposes and means of processing"],
            ["Processor", "Entity processing data on behalf of controller"],
            ["Processing", "Any operation on personal data (collection, storage, use, erasure)"],
            ["Special Categories", "Sensitive data: health, race, religion, sexual orientation, biometrics"]
          ]
        },
        {
          title: 'Data Subject Rights',
          type: 'table',
          headers: ["Right", "Description", "Response Time"],
          rows: [
            ["Access", "Obtain copy of personal data and processing info", "1 month"],
            ["Rectification", "Correct inaccurate personal data", "1 month"],
            ["Erasure ('Right to be Forgotten')", "Delete data when no longer necessary", "1 month"],
            ["Restriction", "Limit processing while issues resolved", "1 month"],
            ["Portability", "Receive data in portable format", "1 month"],
            ["Object", "Object to processing, especially marketing", "Immediately"],
            ["Automated Decisions", "Not be subject to solely automated decisions", "Varies"]
          ]
        },
        {
          title: 'Lawful Bases for Processing',
          type: 'list',
          items: [
            "Consent: Freely given, specific, informed, unambiguous agreement",
            "Contract: Necessary for contract with data subject",
            "Legal Obligation: Required by EU/member state law",
            "Vital Interests: Protect someone's life",
            "Public Task: Exercise of official authority",
            "Legitimate Interests: Balanced against data subject rights (not available for public authorities)"
          ]
        },
        {
          title: 'GDPR Consent Requirements',
          type: 'text',
          content: "GDPR consent is stricter than traditional opt-in. Must be: freely given (no detriment for refusing), specific (separate consent for different purposes), informed (clear plain language), unambiguous (affirmative action, no pre-ticked boxes), withdrawable (as easy to withdraw as to give). Silence, inactivity, or pre-ticked boxes do NOT constitute consent."
        },
        {
          title: 'Controller Obligations',
          type: 'list',
          items: [
            "Privacy by Design: Build privacy into systems from the start",
            "Privacy by Default: Default settings should be privacy-protective",
            "Records of Processing: Maintain documentation of processing activities",
            "Data Protection Impact Assessment (DPIA): Required for high-risk processing",
            "Data Protection Officer (DPO): Required for certain organizations",
            "Breach Notification: 72 hours to supervisory authority; undue delay to data subjects",
            "Cross-Border Transfers: Adequate protections for data leaving EU"
          ]
        },
        {
          title: 'International Data Transfers',
          type: 'table',
          headers: ["Mechanism", "Description"],
          rows: [
            ["Adequacy Decision", "EU Commission deems country has adequate protection"],
            ["Standard Contractual Clauses (SCCs)", "EU-approved contract terms for transfers"],
            ["Binding Corporate Rules (BCRs)", "Approved internal policies for multinational groups"],
            ["Derogations", "Exceptions: explicit consent, contract necessity, legal claims"]
          ]
        },
        {
          title: 'GDPR Penalties',
          type: 'table',
          headers: ["Tier", "Maximum Fine", "Violations"],
          rows: [
            ["Lower Tier", "€10M or 2% global revenue", "Technical/organizational measures, records, DPO"],
            ["Upper Tier", "€20M or 4% global revenue", "Processing principles, data subject rights, transfers"]
          ]
        },
        {
          title: 'Other Global Privacy Laws',
          type: 'table',
          headers: ["Law", "Jurisdiction", "Key Feature"],
          rows: [
            ["CCPA/CPRA", "California", "Consumer rights, opt-out of sale, right to delete"],
            ["LGPD", "Brazil", "GDPR-like, 10 legal bases for processing"],
            ["PIPEDA", "Canada", "Consent-based, 10 fair information principles"],
            ["POPI", "South Africa", "8 conditions for lawful processing"],
            ["PDPA", "Singapore/Thailand", "Consent, purpose limitation, data protection officer"]
          ]
        },
        {
          title: 'Memory Aid: Data Subject Rights',
          type: 'callout',
          calloutType: 'tip',
          content: "'ARRRROPA' = Access, Rectification, Restriction, Right to be forgotten, Right to object, Portability, Automated decision-making. That's a lot of R's—data subjects have robust rights under GDPR!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "GDPR applies to organizations OUTSIDE the EU if they offer goods/services to EU residents or monitor their behavior. A US company with EU customers must comply—location of the company doesn't matter!"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• GDPR applies to any org processing EU residents' data, regardless of location\n• Six lawful bases for processing; consent must be freely given, specific, informed\n• Data subject rights: access, rectification, erasure, portability, object\n• 72-hour breach notification to supervisory authority\n• Fines up to 4% global revenue or €20M\n• International transfers require adequacy decision, SCCs, or BCRs"
        }
      ]
    }
  },
  {
    id: 'ISC-II-010',
    section: 'ISC',
    title: "Incident Response & Breach Handling",
    description: "Master incident response processes and breach notification requirements for security event management",
    order: 22,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Security", "Incident Response", "Compliance"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Security incidents and data breaches can result in significant financial impact, regulatory penalties, and reputational damage. Understanding incident response helps auditors evaluate organizational preparedness and advise on breach-related accounting and disclosure requirements."
        },
        {
          title: 'Incident vs. Breach',
          type: 'table',
          headers: ["Term", "Definition", "Example"],
          rows: [
            ["Security Event", "Observable occurrence in a system", "Failed login attempt"],
            ["Security Incident", "Event that threatens confidentiality, integrity, or availability", "Malware infection, unauthorized access"],
            ["Data Breach", "Incident resulting in unauthorized access/disclosure of data", "Stolen customer database, ransomware exfiltration"]
          ]
        },
        {
          title: 'Incident Response Phases',
          type: 'table',
          headers: ["Phase", "Activities", "Key Outputs"],
          rows: [
            ["1. Preparation", "Plans, team, tools, training", "IR plan, trained team, contact lists"],
            ["2. Identification", "Detect and analyze potential incidents", "Confirmed incident, initial scope"],
            ["3. Containment", "Limit incident impact and spread", "Isolated systems, preserved evidence"],
            ["4. Eradication", "Remove threat from environment", "Clean systems, patched vulnerabilities"],
            ["5. Recovery", "Restore normal operations", "Validated systems, resumed business"],
            ["6. Lessons Learned", "Review and improve", "Post-incident report, updated controls"]
          ]
        },
        {
          title: 'Incident Response Team',
          type: 'list',
          items: [
            "Incident Commander: Overall authority and decision-making",
            "Security Analysts: Technical investigation and containment",
            "IT Operations: System restoration and recovery",
            "Legal Counsel: Regulatory compliance, liability, law enforcement",
            "Communications: Internal and external messaging",
            "HR: Employee-related incidents, insider threats",
            "Executive Sponsor: Authority for major decisions, resources"
          ]
        },
        {
          title: 'Containment Strategies',
          type: 'table',
          headers: ["Strategy", "When Used", "Trade-off"],
          rows: [
            ["Short-term Containment", "Immediate threat mitigation", "May lose some evidence"],
            ["System Isolation", "Prevent spread to other systems", "Business disruption"],
            ["Account Disabling", "Stop compromised credentials", "User impact"],
            ["Network Segmentation", "Isolate affected network segment", "Connectivity impact"],
            ["Evidence Preservation", "Forensic imaging before changes", "Delays containment"]
          ]
        },
        {
          title: 'Evidence Handling',
          type: 'list',
          items: [
            "Chain of Custody: Document who handled evidence, when, and what was done",
            "Forensic Imaging: Bit-for-bit copy of systems before changes",
            "Hash Verification: Prove evidence hasn't been altered",
            "Secure Storage: Protect evidence from tampering or loss",
            "Documentation: Detailed notes of all actions taken",
            "Legal Hold: Preserve relevant data if litigation anticipated"
          ]
        },
        {
          title: 'Breach Notification Requirements',
          type: 'table',
          headers: ["Regulation", "Timeline", "Who to Notify"],
          rows: [
            ["GDPR", "72 hours to authority; without undue delay to individuals", "Supervisory authority, affected individuals"],
            ["HIPAA", "60 days to individuals; immediately if 500+", "Individuals, HHS, media (if 500+)"],
            ["State Laws (US)", "Varies (typically 30-60 days)", "Affected individuals, state AG"],
            ["PCI DSS", "Immediately", "Card brands, acquiring bank"],
            ["SEC (Public Co.)", "Material incidents in 8-K within 4 days", "Investors via SEC filing"]
          ]
        },
        {
          title: 'Breach Assessment Factors',
          type: 'list',
          items: [
            "Nature of data: Sensitive data (SSN, financial, health) = higher risk",
            "Volume affected: Number of individuals impacted",
            "Likelihood of harm: Was data encrypted? Can it be misused?",
            "Threat actor: Opportunistic vs. targeted attack",
            "Containment status: Is exposure ongoing or stopped?",
            "Regulatory obligations: Which laws apply based on data and individuals?"
          ]
        },
        {
          title: 'Post-Incident Activities',
          type: 'list',
          items: [
            "Root Cause Analysis: Why did it happen? What allowed the attack?",
            "Lessons Learned Meeting: What went well? What needs improvement?",
            "Control Remediation: Fix vulnerabilities that enabled the incident",
            "Plan Updates: Revise IR plan based on experience",
            "Training Updates: Address gaps identified during incident",
            "Metrics Tracking: Time to detect, contain, recover"
          ]
        },
        {
          title: 'Incident Response Plan Components',
          type: 'list',
          items: [
            "Scope and definitions: What constitutes an incident?",
            "Roles and responsibilities: Who does what?",
            "Contact information: Team, executives, vendors, legal, law enforcement",
            "Incident classification: Severity levels and response requirements",
            "Procedures: Step-by-step for common incident types",
            "Communication templates: Pre-approved messaging",
            "Testing requirements: How often to test the plan"
          ]
        },
        {
          title: 'Memory Aid: IR Phases',
          type: 'callout',
          calloutType: 'tip',
          content: "'PICERL' = Preparation, Identification, Containment, Eradication, Recovery, Lessons learned. Like making a PICKLE: you Prepare ingredients, Identify cucumbers, Contain in jars, Eradicate bacteria, Recover shelf space, Learn for next batch!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Don't skip to eradication! Contain FIRST, preserve evidence, THEN eradicate. Wiping systems immediately destroys evidence needed to understand the attack, identify other compromised systems, and prevent recurrence."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Incident response phases: Prepare, Identify, Contain, Eradicate, Recover, Lessons Learned\n• Cross-functional IR team includes security, IT, legal, communications, HR\n• Evidence preservation critical for investigation and legal proceedings\n• Breach notification timelines vary: GDPR 72 hours, HIPAA 60 days, state laws vary\n• Post-incident review improves future response capability\n• IR plan must be documented, communicated, and tested regularly"
        }
      ]
    }
  },
  {
    id: 'ISC-II-011',
    section: 'ISC',
    title: "Vulnerability Assessment & Penetration Testing",
    description: "Understand vulnerability management and penetration testing methodologies for evaluating security posture",
    order: 23,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["Security", "Vulnerability Management", "Testing"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Vulnerability assessments and penetration tests provide evidence of security control effectiveness. Understanding these assessments helps auditors evaluate whether organizations proactively identify and remediate security weaknesses before attackers exploit them."
        },
        {
          title: 'Vulnerability Management Overview',
          type: 'text',
          content: "Vulnerability management is the ongoing process of identifying, classifying, prioritizing, remediating, and mitigating security vulnerabilities. It's a continuous cycle, not a one-time activity, essential for maintaining security posture as new vulnerabilities are constantly discovered."
        },
        {
          title: 'Vulnerability vs. Threat vs. Risk',
          type: 'table',
          headers: ["Term", "Definition", "Example"],
          rows: [
            ["Vulnerability", "Weakness that could be exploited", "Unpatched software, weak password"],
            ["Threat", "Potential for harm", "Hacker, malware, insider"],
            ["Risk", "Likelihood and impact of threat exploiting vulnerability", "High probability of data breach"]
          ]
        },
        {
          title: 'Vulnerability Assessment Process',
          type: 'table',
          headers: ["Phase", "Activities", "Output"],
          rows: [
            ["Discovery", "Identify assets to scan", "Asset inventory, scope definition"],
            ["Scanning", "Automated vulnerability detection", "Raw scan results"],
            ["Analysis", "Validate findings, eliminate false positives", "Confirmed vulnerabilities"],
            ["Prioritization", "Rank by severity and business impact", "Prioritized remediation list"],
            ["Remediation", "Fix or mitigate vulnerabilities", "Patched systems, compensating controls"],
            ["Verification", "Confirm remediation was effective", "Re-scan results"]
          ]
        },
        {
          title: 'Vulnerability Scoring (CVSS)',
          type: 'table',
          headers: ["Score", "Severity", "Remediation Timeframe"],
          rows: [
            ["9.0-10.0", "Critical", "Immediate (24-48 hours)"],
            ["7.0-8.9", "High", "Urgent (1-2 weeks)"],
            ["4.0-6.9", "Medium", "Planned (30-60 days)"],
            ["0.1-3.9", "Low", "Scheduled maintenance"],
            ["0.0", "None", "Accept or monitor"]
          ]
        },
        {
          title: 'Types of Vulnerability Scans',
          type: 'list',
          items: [
            "Network Scan: Identifies vulnerabilities in network devices, servers, services",
            "Web Application Scan: Tests web apps for OWASP Top 10, injection, XSS",
            "Database Scan: Checks database configurations, access controls, encryption",
            "Credentialed Scan: Uses valid credentials for deeper analysis (recommended)",
            "Non-Credentialed Scan: External perspective without authentication",
            "Agent-Based Scan: Software on endpoints reports vulnerabilities continuously"
          ]
        },
        {
          title: 'Penetration Testing Overview',
          type: 'text',
          content: "Penetration testing (pen testing) simulates real attacks to identify exploitable vulnerabilities. Unlike automated scanning, pen testing uses human expertise to chain vulnerabilities, attempt privilege escalation, and demonstrate business impact. Results show what an attacker could actually accomplish."
        },
        {
          title: 'Pen Test Types',
          type: 'table',
          headers: ["Type", "Tester Knowledge", "Simulates"],
          rows: [
            ["Black Box", "No internal knowledge", "External attacker"],
            ["White Box", "Full knowledge (source code, architecture)", "Insider or post-compromise"],
            ["Gray Box", "Partial knowledge (user credentials)", "Compromised user account"]
          ]
        },
        {
          title: 'Pen Test Phases',
          type: 'table',
          headers: ["Phase", "Activities"],
          rows: [
            ["Planning", "Define scope, rules of engagement, authorization"],
            ["Reconnaissance", "Gather information about target (OSINT, scanning)"],
            ["Vulnerability Analysis", "Identify potential vulnerabilities to exploit"],
            ["Exploitation", "Attempt to exploit vulnerabilities"],
            ["Post-Exploitation", "Escalate privileges, move laterally, exfiltrate data"],
            ["Reporting", "Document findings, evidence, recommendations"]
          ]
        },
        {
          title: 'Rules of Engagement',
          type: 'list',
          items: [
            "Scope: What systems/networks are in/out of scope?",
            "Timing: When can testing occur? Business hours or off-hours?",
            "Techniques: What methods are permitted? (No DoS, no social engineering?)",
            "Notification: Who knows testing is occurring?",
            "Stop Conditions: When to halt (if production impact)",
            "Data Handling: How to handle sensitive data discovered",
            "Legal Authorization: Written permission from system owners"
          ]
        },
        {
          title: 'Common Vulnerability Categories',
          type: 'list',
          items: [
            "Missing Patches: Unpatched operating systems, applications, firmware",
            "Misconfigurations: Default credentials, unnecessary services, weak settings",
            "Injection Flaws: SQL injection, command injection, XSS",
            "Authentication Weaknesses: Weak passwords, missing MFA, session issues",
            "Access Control Issues: Excessive permissions, missing authorization checks",
            "Encryption Problems: Weak algorithms, missing encryption, poor key management"
          ]
        },
        {
          title: 'Memory Aid: Assessment vs. Pen Test',
          type: 'callout',
          calloutType: 'tip',
          content: "'Assessment FINDS; Pen Test PROVES'\n• Vulnerability Assessment: Wide but shallow—finds many potential issues\n• Penetration Test: Deep but narrow—proves specific issues are exploitable\nUse both: scan often, pen test periodically!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Penetration testing requires WRITTEN AUTHORIZATION! Testing without permission is illegal hacking, even if you own the systems. Always have signed rules of engagement before any pen test begins."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Vulnerability management is continuous: discover, scan, analyze, remediate, verify\n• CVSS scores prioritize remediation: Critical (9-10), High (7-8.9), Medium (4-6.9)\n• Vulnerability scans are automated and broad; pen tests are manual and deep\n• Pen test types: black box (no knowledge), white box (full), gray box (partial)\n• Rules of engagement define scope, timing, permitted techniques\n• Written authorization required before any penetration testing"
        }
      ]
    }
  },
  {
    id: 'ISC-III-001',
    section: 'ISC',
    title: "SOC 1: Overview & Scope",
    description: "Understand SOC 1 engagements, their purpose, and when service organizations need ICFR-related reports",
    order: 24,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["SOC", "Service Organization Controls", "ICFR"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "SOC 1 reports are essential for auditors evaluating service organizations that process transactions affecting user entities' financial statements. Understanding SOC 1 helps you determine when to request these reports and how to use them in financial statement audits."
        },
        {
          title: 'SOC 1 Overview',
          type: 'text',
          content: "SOC 1 (Service Organization Control 1) reports address controls at service organizations relevant to user entities' internal control over financial reporting (ICFR). These reports are prepared under SSAE 18 (AT-C 320) and are the successor to SAS 70 reports."
        },
        {
          title: 'Key SOC Report Distinctions',
          type: 'table',
          headers: ["Report", "Focus", "Framework", "Primary Users"],
          rows: [
            ["SOC 1", "Controls over financial reporting (ICFR)", "SSAE 18 / ISAE 3402", "User entity auditors, management"],
            ["SOC 2", "Trust Services Criteria (security, availability, etc.)", "AT-C 205", "Management, regulators, customers"],
            ["SOC 3", "Same as SOC 2 but general use", "AT-C 205", "General public (marketing)"]
          ]
        },
        {
          title: 'When SOC 1 is Needed',
          type: 'list',
          items: [
            "Service organization processes transactions for user entities (payroll, claims processing)",
            "Service organization hosts user entity's financial applications",
            "Service organization maintains records that become part of user entity's financial statements",
            "Service organization performs reconciliations or calculations affecting financial data",
            "User entity auditor needs evidence about service organization controls"
          ]
        },
        {
          title: 'SOC 1 Parties',
          type: 'table',
          headers: ["Party", "Role", "Responsibilities"],
          rows: [
            ["Service Organization", "Provides services to user entities", "Designs/operates controls, provides description"],
            ["Service Auditor", "CPA firm examining controls", "Tests controls, issues report"],
            ["User Entity", "Customer of service organization", "Implements complementary controls"],
            ["User Auditor", "Auditor of user entity's F/S", "Evaluates SOC report, tests CUECs"]
          ]
        },
        {
          title: 'Service Organization Management Responsibilities',
          type: 'list',
          items: [
            "Prepare system description that is fairly presented",
            "Design controls suitably designed to achieve control objectives",
            "Operate controls effectively throughout the period",
            "Identify subservice organizations and describe approach (carve-out or inclusive)",
            "Identify complementary user entity controls (CUECs)"
          ]
        },
        {
          title: 'Service Auditor Responsibilities',
          type: 'list',
          items: [
            "Plan and perform examination in accordance with SSAE 18",
            "Obtain reasonable assurance about control description and design (Type 1)",
            "Test operating effectiveness of controls (Type 2 only)",
            "Evaluate subservice organizations' impact on engagement",
            "Issue appropriate opinion",
            "Restrict report use to specified parties"
          ]
        },
        {
          title: 'System Description Requirements',
          type: 'list',
          items: [
            "Types of services provided",
            "Components of the system: infrastructure, software, people, procedures, data",
            "Boundaries of the system (what's included/excluded)",
            "How transactions are initiated, authorized, recorded, processed, reported",
            "Significant events and changes during the period (Type 2)",
            "Control objectives and related controls",
            "Complementary user entity controls (CUECs)",
            "Subservice organizations and method (inclusive or carve-out)"
          ]
        },
        {
          title: 'Report Users and Restrictions',
          type: 'text',
          content: "SOC 1 reports are restricted-use reports intended only for: service organization management, user entities, and user entity auditors. They contain detailed control information and cannot be shared publicly. NDAs are typically required before sharing reports."
        },
        {
          title: 'Memory Aid: SOC 1 Purpose',
          type: 'callout',
          calloutType: 'tip',
          content: "'SOC 1 = Financial Statement relevant' → Think 'SOC 1 for the $1 (dollar sign)'—it's about controls that affect FINANCIAL REPORTING. If it doesn't impact financial statements, it's probably SOC 2 territory."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "SOC 1 replaced SAS 70, but they're not identical! SOC 1 has specific requirements for system descriptions and management assertions that SAS 70 didn't have. Also, SOC 1 is NOT for general IT controls—only ICFR-relevant controls."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• SOC 1 addresses controls relevant to user entities' ICFR\n• Governed by SSAE 18 (AT-C 320), successor to SAS 70\n• Parties: service organization, service auditor, user entity, user auditor\n• System description covers services, components, boundaries, controls, CUECs\n• Restricted use report—not for public distribution\n• Use SOC 1 when service affects financial transaction processing or records"
        }
      ]
    }
  },
  {
    id: 'ISC-III-002',
    section: 'ISC',
    title: "SOC 1: Type 1 vs Type 2 Reports",
    description: "Distinguish between Type 1 and Type 2 SOC reports and understand when each is appropriate",
    order: 25,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["SOC", "Type 1", "Type 2", "Audit Evidence"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Type 1 and Type 2 reports provide different levels of assurance. User auditors must understand these differences to determine whether a SOC report provides sufficient appropriate audit evidence for reliance on service organization controls."
        },
        {
          title: 'Type 1 vs Type 2 Comparison',
          type: 'table',
          headers: ["Aspect", "Type 1", "Type 2"],
          rows: [
            ["Coverage", "Point in time", "Period of time (typically 12 months)"],
            ["Description Opinion", "Fairly presented", "Fairly presented"],
            ["Design Opinion", "Suitably designed", "Suitably designed"],
            ["Operating Effectiveness", "NOT tested", "Tested and opined on"],
            ["Testing Results", "None", "Detailed in Section IV"],
            ["Primary Use", "Initial assessment, new systems", "Ongoing reliance by user auditors"],
            ["Assurance Level", "Lower", "Higher"]
          ]
        },
        {
          title: 'Type 1 Report Characteristics',
          type: 'text',
          content: "Type 1 reports examine controls as of a specific date (point in time). The service auditor opines that: (1) the description fairly presents the system, and (2) controls are suitably designed to achieve control objectives. Type 1 does NOT test whether controls actually operated effectively."
        },
        {
          title: 'When to Use Type 1',
          type: 'list',
          items: [
            "New service organization without operating history",
            "Significant system changes requiring re-evaluation",
            "Initial year with service organization",
            "When Type 2 not yet available",
            "Preliminary assessment before committing to Type 2 cost"
          ]
        },
        {
          title: 'Type 2 Report Characteristics',
          type: 'text',
          content: "Type 2 reports examine controls over a period of time (typically 6-12 months). In addition to Type 1 opinions, the service auditor tests operating effectiveness and opines whether controls operated effectively throughout the period. Detailed testing results are included."
        },
        {
          title: 'Type 2 Report Sections',
          type: 'table',
          headers: ["Section", "Content"],
          rows: [
            ["Section I", "Service auditor's report (opinion)"],
            ["Section II", "Management's assertion"],
            ["Section III", "Description of system"],
            ["Section IV", "Control objectives, controls, tests, and results"],
            ["Section V (optional)", "Other information provided by service organization"]
          ]
        },
        {
          title: 'Service Auditor Opinion Components (Type 2)',
          type: 'list',
          items: [
            "Description: Fairly presents the system designed and implemented",
            "Design: Controls are suitably designed to achieve stated control objectives",
            "Operating Effectiveness: Controls operated effectively throughout the specified period"
          ]
        },
        {
          title: 'Testing Results in Type 2',
          type: 'text',
          content: "Section IV details: each control objective, specific controls addressing it, tests performed by service auditor, and results of testing. Exceptions are disclosed with nature and extent. User auditors evaluate whether exceptions impact their reliance."
        },
        {
          title: 'Coverage Period Considerations',
          type: 'table',
          headers: ["Issue", "Consideration", "User Auditor Action"],
          rows: [
            ["Report ends before F/S date", "Gap between report period and year-end", "Perform roll-forward procedures"],
            ["Report period < 6 months", "Limited coverage", "Assess if sufficient; request longer period"],
            ["Significant changes after period", "Controls may have changed", "Inquire of management, test if necessary"],
            ["First-year user", "No prior period coverage", "May need both Type 1 and Type 2"]
          ]
        },
        {
          title: 'Roll-Forward Procedures',
          type: 'list',
          items: [
            "Inquire of service organization about changes since report date",
            "Review user entity's monitoring of service organization",
            "Consider subsequent SOC reports or bridge letters",
            "Perform additional tests if significant changes occurred",
            "Evaluate compensating controls at user entity"
          ]
        },
        {
          title: 'Evaluating Exceptions',
          type: 'text',
          content: "Exceptions don't automatically disqualify reliance. User auditors evaluate: nature of exception (administrative vs. substantive), frequency (isolated vs. pervasive), compensating controls, impact on user entity's specific use of service. Document evaluation and conclusions."
        },
        {
          title: 'Memory Aid: Type 1 vs Type 2',
          type: 'callout',
          calloutType: 'tip',
          content: "'Type 1 = Picture (snapshot), Type 2 = Movie (over time)'\nType 1: 'Did they design it right?' (as of a date)\nType 2: 'Did they do it right?' (throughout period)\nType 2 INCLUDES Type 1 plus operating effectiveness testing."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Type 1 reports are rarely sufficient for year-end audit reliance! They don't test operating effectiveness—just design. For ongoing reliance, user auditors typically require Type 2 reports or must perform their own testing."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Type 1: point in time, tests description and design only\n• Type 2: period of time, tests description, design, AND operating effectiveness\n• Type 2 Section IV details controls, tests, and results\n• User auditors perform roll-forward procedures for gaps after report period\n• Exceptions require evaluation of nature, frequency, and compensating controls\n• Type 2 preferred for audit reliance; Type 1 for initial assessments"
        }
      ]
    }
  },
  {
    id: 'ISC-III-003',
    section: 'ISC',
    title: "SOC 1: Control Objectives",
    description: "Understand how control objectives are developed and evaluated in SOC 1 examinations",
    order: 26,
    duration: 50,
    difficulty: 'advanced',
    topics: ["SOC", "Control Objectives", "ICFR"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Control objectives define what controls should achieve. Understanding how control objectives are established and tested helps user auditors determine whether the SOC 1 report addresses controls relevant to their audit of user entity financial statements."
        },
        {
          title: 'Control Objectives Overview',
          type: 'text',
          content: "Control objectives state the aim that controls are designed to achieve. In SOC 1, control objectives relate to internal control over financial reporting (ICFR). Service organization management establishes control objectives based on what's relevant to user entities' financial statement assertions."
        },
        {
          title: 'Who Establishes Control Objectives',
          type: 'table',
          headers: ["Party", "Role in Control Objectives"],
          rows: [
            ["Service Organization Management", "Establishes objectives based on services provided and user needs"],
            ["Service Auditor", "Evaluates if objectives are reasonable and complete"],
            ["User Entity", "Determines if objectives address their ICFR needs"],
            ["User Auditor", "Assesses if objectives cover relevant assertions"]
          ]
        },
        {
          title: 'Characteristics of Good Control Objectives',
          type: 'list',
          items: [
            "Relevant: Address controls that affect user entity financial reporting",
            "Complete: Cover all significant aspects of the service",
            "Clear: Understandable to users of the report",
            "Achievable: Realistic for the service organization to meet",
            "Measurable: Can be tested for operating effectiveness"
          ]
        },
        {
          title: 'Common Control Objective Categories',
          type: 'table',
          headers: ["Category", "Example Objectives"],
          rows: [
            ["Transaction Processing", "Transactions are authorized, accurate, complete, timely"],
            ["Data Integrity", "Data is protected from unauthorized modification"],
            ["System Access", "Access restricted to authorized users"],
            ["Change Management", "Changes are authorized, tested, approved before implementation"],
            ["Computer Operations", "Batch processing complete, output accurate"],
            ["Data Recovery", "Data can be recovered in event of disruption"]
          ]
        },
        {
          title: 'Control Objective Example',
          type: 'example',
          content: "Control Objective: 'Controls provide reasonable assurance that payroll transactions are processed accurately and in a timely manner.'\n\nRelated Controls:\n• Payroll calculations are reviewed by supervisor before processing\n• System validates employee data against master file\n• Batch totals reconciled before and after processing\n• Exception reports reviewed and resolved daily\n\nTests Performed (Type 2):\n• Inspected evidence of supervisory review for 25 pay periods\n• Observed validation routines in production\n• Reperformed batch reconciliations for 5 periods\n• Reviewed exception logs and resolution documentation"
        },
        {
          title: 'Mapping Controls to Financial Statement Assertions',
          type: 'table',
          headers: ["F/S Assertion", "Related Control Objective", "Example Control"],
          rows: [
            ["Completeness", "All transactions are recorded", "Sequence number verification"],
            ["Accuracy", "Transactions processed correctly", "Edit checks, reconciliations"],
            ["Occurrence", "Transactions represent real events", "Authorization requirements"],
            ["Cutoff", "Transactions in correct period", "Period-end procedures"],
            ["Authorization", "Transactions properly approved", "Approval workflows"]
          ]
        },
        {
          title: 'Complementary User Entity Controls (CUECs)',
          type: 'text',
          content: "CUECs are controls that user entities must implement for service organization controls to be effective. Example: Service organization provides accurate calculations, but user entity must review output for reasonableness. CUECs are identified in the system description and user auditors must test them."
        },
        {
          title: 'CUEC Examples',
          type: 'list',
          items: [
            "User entity reviews reports for accuracy and completeness",
            "User entity maintains appropriate segregation of duties for data input",
            "User entity investigates and resolves exceptions timely",
            "User entity restricts access to data submission interfaces",
            "User entity reviews access rights granted by service organization periodically"
          ]
        },
        {
          title: 'Evaluating Control Objectives',
          type: 'list',
          items: [
            "Relevance: Do objectives address what affects user entity's F/S?",
            "Completeness: Are all significant services and processes covered?",
            "Clarity: Are objectives understandable and unambiguous?",
            "Testability: Can operating effectiveness be assessed?",
            "CUEC Identification: Are user responsibilities clearly stated?"
          ]
        },
        {
          title: 'Memory Aid: Control Objectives',
          type: 'callout',
          calloutType: 'tip',
          content: "'Control objectives answer WHY; Controls answer HOW'\nObjective: 'Ensure transactions are accurate' (the goal)\nControl: 'Supervisory review of all entries over $10,000' (how we achieve it)\nTest: 'Inspect evidence of review for sample of entries' (how we verify)"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "User auditors can't just accept the SOC report—they must evaluate whether the control objectives are RELEVANT to their audit! A SOC 1 might have perfectly clean results but cover objectives that don't address the user entity's significant accounts or assertions."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Control objectives state what controls should achieve\n• Management establishes objectives; auditors evaluate reasonableness\n• Objectives should be relevant, complete, clear, achievable, measurable\n• CUECs are user entity responsibilities—must be tested by user auditor\n• User auditors must assess if objectives cover their relevant assertions\n• Control objectives answer 'why'; controls answer 'how'"
        }
      ]
    }
  },
  {
    id: 'ISC-III-004',
    section: 'ISC',
    title: "SOC 2: Trust Services Criteria",
    description: "Master the five Trust Services Criteria categories that form the basis for SOC 2 examinations",
    order: 27,
    duration: 60,
    difficulty: 'advanced',
    topics: ["SOC", "Trust Services Criteria", "SOC 2"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-A-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "SOC 2 reports are increasingly requested by customers, regulators, and business partners to evaluate service organization security and operational controls. Understanding Trust Services Criteria (TSC) helps CPAs scope engagements and evaluate SOC 2 reports."
        },
        {
          title: 'SOC 2 vs SOC 1',
          type: 'table',
          headers: ["Aspect", "SOC 1", "SOC 2"],
          rows: [
            ["Focus", "Controls over ICFR", "Security, availability, processing integrity, confidentiality, privacy"],
            ["Framework", "SSAE 18 / AT-C 320", "AICPA Trust Services Criteria"],
            ["Control Objectives", "Custom per service organization", "Standardized criteria (TSC)"],
            ["Primary Use", "Financial statement audits", "Operations, security, compliance"],
            ["Who Requests", "User auditors", "Customers, regulators, prospects"]
          ]
        },
        {
          title: 'The Five Trust Services Categories',
          type: 'table',
          headers: ["Category", "Focus", "Required?"],
          rows: [
            ["Security (Common Criteria)", "Protection against unauthorized access", "REQUIRED for all SOC 2"],
            ["Availability", "System accessible as agreed", "Optional"],
            ["Processing Integrity", "Processing complete, accurate, timely, authorized", "Optional"],
            ["Confidentiality", "Information designated as confidential is protected", "Optional"],
            ["Privacy", "Personal information collected, used, retained, disclosed properly", "Optional"]
          ]
        },
        {
          title: 'Security (Common Criteria)',
          type: 'text',
          content: "Security is REQUIRED for every SOC 2. It addresses protection of information and systems against unauthorized access, disclosure, damage, or loss. The Common Criteria (CC series) form the foundation and include 33 criteria organized into 9 categories."
        },
        {
          title: 'Common Criteria Categories (CC Series)',
          type: 'table',
          headers: ["Series", "Category", "Focus"],
          rows: [
            ["CC1", "Control Environment", "Integrity, ethical values, oversight, accountability"],
            ["CC2", "Communication & Information", "Relevant quality information, internal/external communication"],
            ["CC3", "Risk Assessment", "Identify and assess risks, fraud risk, change management"],
            ["CC4", "Monitoring Activities", "Ongoing/separate evaluations, deficiency remediation"],
            ["CC5", "Control Activities", "Selecting and developing controls, policies and procedures"],
            ["CC6", "Logical & Physical Access", "Restrict access, manage credentials, prevent unauthorized access"],
            ["CC7", "System Operations", "Detect/manage security events, change management"],
            ["CC8", "Change Management", "Authorize, test, approve changes to infrastructure/software"],
            ["CC9", "Risk Mitigation", "Business continuity, vendor management"]
          ]
        },
        {
          title: 'Availability Criteria',
          type: 'list',
          items: [
            "A1.1: Capacity management—current/future demand",
            "A1.2: Environmental protections—power, temperature, humidity",
            "A1.3: Recovery procedures—backup, disaster recovery testing",
            "Relevant when: SLAs include uptime guarantees, critical services, cloud hosting"
          ]
        },
        {
          title: 'Processing Integrity Criteria',
          type: 'list',
          items: [
            "PI1.1: Processing complete, accurate, timely, authorized",
            "PI1.2: Input validated for completeness and accuracy",
            "PI1.3: Processing accurate and complete",
            "PI1.4: Output complete and accurate",
            "PI1.5: Output distributed only to intended recipients",
            "Relevant when: Transaction processing, calculations, data transformations"
          ]
        },
        {
          title: 'Confidentiality Criteria',
          type: 'list',
          items: [
            "C1.1: Confidential information identified and classified",
            "C1.2: Confidential information disposed of securely",
            "Relevant when: Trade secrets, intellectual property, sensitive business data",
            "Note: Confidentiality is about business data; Privacy is about personal data"
          ]
        },
        {
          title: 'Privacy Criteria',
          type: 'list',
          items: [
            "Based on GAPP principles: Notice, choice, collection, use/retention/disposal, access, disclosure, quality, monitoring",
            "P1-P8: Detailed criteria covering entire personal information lifecycle",
            "Relevant when: Processing personal information of consumers",
            "Often combined with GDPR, HIPAA, or CCPA compliance efforts"
          ]
        },
        {
          title: 'Selecting Categories for Engagement',
          type: 'table',
          headers: ["Service Type", "Typical Categories"],
          rows: [
            ["Cloud Infrastructure (IaaS)", "Security, Availability"],
            ["SaaS Application", "Security, Availability, Processing Integrity"],
            ["Data Processing", "Security, Processing Integrity, Confidentiality"],
            ["Customer Data Handling", "Security, Confidentiality, Privacy"],
            ["Healthcare IT", "Security, Availability, Confidentiality, Privacy"]
          ]
        },
        {
          title: 'Memory Aid: Trust Services Categories',
          type: 'callout',
          calloutType: 'tip',
          content: "'SAPCP' (like SAP software + CP) = Security, Availability, Processing integrity, Confidentiality, Privacy. Or think: 'Some Applications Process Confidential Personal data'—Security is always first and required!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Confidentiality vs. Privacy confusion! CONFIDENTIALITY protects business information (trade secrets, contracts). PRIVACY protects personal information of individuals (PII). A system might need both, one, or neither depending on the data processed."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• SOC 2 uses standardized Trust Services Criteria, not custom objectives\n• Security (Common Criteria) is REQUIRED for all SOC 2 reports\n• Other categories (Availability, Processing Integrity, Confidentiality, Privacy) are optional\n• Common Criteria (CC1-CC9) cover environment, risk, controls, access, operations, change\n• Select categories based on services provided and customer needs\n• Confidentiality = business data; Privacy = personal data"
        }
      ]
    }
  },
  {
    id: 'ISC-III-005',
    section: 'ISC',
    title: "SOC 2: Examination & Reporting",
    description: "Navigate SOC 2 examination procedures, report structure, and using SOC 2 reports for assurance",
    order: 28,
    duration: 55,
    difficulty: 'advanced',
    topics: ["SOC", "SOC 2", "Examination", "Attestation"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-B-2',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "SOC 2 examinations are a growing service line for CPA firms. Understanding the examination process and report structure helps practitioners perform engagements and helps report users evaluate service organization security and operational controls."
        },
        {
          title: 'SOC 2 Engagement Standards',
          type: 'text',
          content: "SOC 2 examinations are performed under AT-C Section 105 and 205 (attestation standards). The practitioner examines whether controls are suitably designed (Type 1) or suitably designed and operating effectively (Type 2) based on Trust Services Criteria."
        },
        {
          title: 'SOC 2 Report Structure',
          type: 'table',
          headers: ["Section", "Content"],
          rows: [
            ["Section 1", "Independent service auditor's report (opinion)"],
            ["Section 2", "Management's assertion"],
            ["Section 3", "Description of system"],
            ["Section 4", "Trust services criteria, controls, tests, results (Type 2)"],
            ["Section 5 (optional)", "Other information (management-provided)"]
          ]
        },
        {
          title: 'Management Assertion Requirements',
          type: 'list',
          items: [
            "Description fairly presents the system",
            "Controls stated in description were suitably designed (Type 1 & 2)",
            "Controls operated effectively throughout the period (Type 2 only)",
            "Criteria used in evaluation (Trust Services Criteria)"
          ]
        },
        {
          title: 'System Description Requirements',
          type: 'list',
          items: [
            "Types of services provided",
            "Principal service commitments and system requirements",
            "Components of the system: infrastructure, software, people, procedures, data",
            "Relevant aspects of control environment, risk assessment, information/communication, monitoring",
            "Trust services criteria and related controls",
            "For Privacy: notice, choice, access, disclosure, quality practices",
            "Complementary user entity controls (CUECs)",
            "Complementary subservice organization controls (if applicable)"
          ]
        },
        {
          title: 'Service Auditor Procedures (Type 2)',
          type: 'table',
          headers: ["Procedure", "Purpose"],
          rows: [
            ["Inquiry", "Understand controls, identify changes"],
            ["Observation", "Witness control performance"],
            ["Inspection", "Review documentation, configurations, evidence"],
            ["Reperformance", "Re-execute control to verify it works"],
            ["Testing ITGCs", "Evaluate automated control reliability"]
          ]
        },
        {
          title: 'Testing Considerations',
          type: 'text',
          content: "For automated controls, one test may be sufficient if ITGCs (change management, access controls) are effective. For manual controls, larger samples needed. Testing covers entire examination period. Service auditor determines sample sizes based on risk and control frequency."
        },
        {
          title: 'Opinion Types',
          type: 'table',
          headers: ["Opinion", "Meaning", "Cause"],
          rows: [
            ["Unqualified", "Controls meet criteria", "No material issues"],
            ["Qualified", "Meet criteria except for specific matter", "Limited deviations or scope limitations"],
            ["Adverse", "Do not meet criteria", "Pervasive deviations"],
            ["Disclaimer", "Unable to form opinion", "Significant scope limitations"]
          ]
        },
        {
          title: 'Evaluating Exceptions and Deviations',
          type: 'list',
          items: [
            "Nature: How significant is the deviation?",
            "Cause: One-time error or systematic issue?",
            "Extent: How many instances affected?",
            "Impact: Does deviation mean criteria not met?",
            "Compensating Controls: Do other controls mitigate the risk?",
            "Remediation: Has service organization addressed the issue?"
          ]
        },
        {
          title: 'Using SOC 2 Reports',
          type: 'table',
          headers: ["User Type", "How They Use Report"],
          rows: [
            ["Customers", "Vendor due diligence, contract negotiations"],
            ["Prospective Customers", "Evaluate security before engagement"],
            ["Regulators", "Compliance evidence, examination support"],
            ["Internal Audit", "Third-party risk management"],
            ["User Auditors", "Understand IT environment (not for ICFR reliance)"]
          ]
        },
        {
          title: 'SOC 2+ Reports',
          type: 'text',
          content: "SOC 2+ reports map Trust Services Criteria to additional frameworks (HIPAA, NIST, ISO 27001, etc.) in a single engagement. Provides efficiency for service organizations needing multiple compliance demonstrations. The '+' criteria are examined alongside TSC."
        },
        {
          title: 'Report Distribution',
          type: 'list',
          items: [
            "SOC 2 is restricted-use report (like SOC 1)",
            "Intended for informed users: management, user entities, business partners",
            "NDAs typically required before sharing",
            "Cannot be posted publicly (use SOC 3 for that)",
            "Service organization controls distribution"
          ]
        },
        {
          title: 'Memory Aid: SOC 2 Sections',
          type: 'callout',
          calloutType: 'tip',
          content: "'Opinion, Assertion, Description, Testing, Other' = 'O-A-D-T-O' = 'Oh, A Description That's Optional!' (Section 5 is optional). The core is sections 1-4: auditor says, management says, system is, tests show."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "SOC 2 is NOT for ICFR reliance! If you need evidence for financial statement audit, you need SOC 1. SOC 2 covers security and operations but doesn't address financial reporting controls. Don't use SOC 2 in place of SOC 1."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• SOC 2 performed under AT-C 105/205 attestation standards\n• Report sections: opinion, assertion, description, testing/results, other\n• Type 2 tests operating effectiveness over a period\n• Unqualified opinion = controls meet Trust Services Criteria\n• SOC 2+ maps TSC to additional frameworks (HIPAA, NIST, etc.)\n• SOC 2 is restricted use; SOC 3 is for public/marketing"
        }
      ]
    }
  },
  {
    id: 'ISC-III-006',
    section: 'ISC',
    title: "SOC 3: Public Reports",
    description: "Understand SOC 3 general-use reports and their role in marketing and public assurance",
    order: 29,
    duration: 35,
    difficulty: 'beginner',
    topics: ["SOC", "SOC 3", "General Use Reports"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "SOC 3 reports allow service organizations to publicly demonstrate their security posture. Understanding SOC 3 helps practitioners advise clients on public assurance options and helps organizations determine when SOC 3 is appropriate for their marketing needs."
        },
        {
          title: 'SOC 3 Overview',
          type: 'text',
          content: "SOC 3 is a general-use report based on the same Trust Services Criteria as SOC 2. Unlike SOC 1 and SOC 2, which are restricted-use, SOC 3 can be freely distributed, posted on websites, and used for marketing purposes."
        },
        {
          title: 'SOC 2 vs SOC 3 Comparison',
          type: 'table',
          headers: ["Aspect", "SOC 2", "SOC 3"],
          rows: [
            ["Criteria", "Trust Services Criteria", "Same Trust Services Criteria"],
            ["Distribution", "Restricted use (NDA required)", "General use (public)"],
            ["Detail Level", "Full system description, all controls, test results", "Summary report, no detailed testing"],
            ["Length", "Often 50-200+ pages", "Typically 1-3 pages"],
            ["Use Case", "Due diligence, detailed evaluation", "Marketing, general assurance"],
            ["Seal/Logo", "None", "Can use AICPA SOC seal"]
          ]
        },
        {
          title: 'SOC 3 Report Contents',
          type: 'list',
          items: [
            "Management's assertion regarding controls",
            "Independent service auditor's opinion",
            "Brief description of system and boundaries",
            "Trust services categories covered (Security, Availability, etc.)",
            "Opinion on whether controls met criteria during period",
            "No detailed controls, tests, or results included"
          ]
        },
        {
          title: 'When to Use SOC 3',
          type: 'table',
          headers: ["Scenario", "Recommendation"],
          rows: [
            ["Marketing to prospects", "SOC 3 for public assurance"],
            ["Website security badge", "SOC 3 with seal"],
            ["Customer due diligence requests", "SOC 2 for detailed evaluation"],
            ["Regulatory compliance evidence", "SOC 2 (detailed testing)"],
            ["Financial statement audit support", "SOC 1 (ICFR controls)"]
          ]
        },
        {
          title: 'SOC 3 Requirements',
          type: 'text',
          content: "To issue a SOC 3, the service organization must first have a SOC 2 Type 2 examination with an unqualified opinion. The SOC 3 is essentially a summarized, public-friendly version of the same engagement. You cannot get SOC 3 without completing SOC 2 first."
        },
        {
          title: 'AICPA SOC Seal',
          type: 'list',
          items: [
            "Service organizations with SOC 3 can display the AICPA SOC seal",
            "Seal indicates examination by licensed CPA",
            "Must link to or make full SOC 3 report available",
            "Cannot use seal with qualified or adverse opinion",
            "Seal usage subject to AICPA licensing requirements"
          ]
        },
        {
          title: 'Limitations of SOC 3',
          type: 'list',
          items: [
            "No detailed control information—can't evaluate specific controls",
            "No test results—can't assess extent of testing or exceptions",
            "Requires SOC 2 first—additional cost/effort",
            "Not useful for detailed due diligence—need SOC 2 for that",
            "Opinion only as strong as underlying SOC 2"
          ]
        },
        {
          title: 'Memory Aid: SOC 3',
          type: 'callout',
          calloutType: 'tip',
          content: "'SOC 3 = SOC 2 for the 3rd party public' or 'SOC 3 = Summary for 3veryone'. It's the marketing-friendly version—short, sweet, shareable. But remember: no SOC 2, no SOC 3!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "SOC 3 requires an unqualified SOC 2 opinion first! You cannot issue a SOC 3 if the SOC 2 has exceptions that result in a qualified or adverse opinion. SOC 3 is a summary of a clean SOC 2, not a separate engagement."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• SOC 3 is a general-use (public) summary of SOC 2\n• Same Trust Services Criteria but without detailed controls or test results\n• Requires SOC 2 Type 2 with unqualified opinion first\n• Can display AICPA SOC seal on website\n• Useful for marketing; not for detailed due diligence\n• Short (1-3 pages) vs. SOC 2 (50-200+ pages)"
        }
      ]
    }
  },
  {
    id: 'ISC-III-007',
    section: 'ISC',
    title: "SOC for Cybersecurity",
    description: "Understand the SOC for Cybersecurity examination for enterprise-wide cybersecurity risk management programs",
    order: 30,
    duration: 55,
    difficulty: 'intermediate',
    topics: ["SOC", "Cybersecurity", "Risk Management"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "SOC for Cybersecurity addresses growing demand for assurance over organization-wide cybersecurity programs. Unlike SOC 2 which focuses on specific systems/services, SOC for Cybersecurity examines the entire enterprise cybersecurity risk management program."
        },
        {
          title: 'SOC for Cybersecurity vs SOC 2',
          type: 'table',
          headers: ["Aspect", "SOC 2", "SOC for Cybersecurity"],
          rows: [
            ["Scope", "Specific system or service", "Enterprise-wide cybersecurity program"],
            ["Criteria", "Trust Services Criteria", "Description criteria + control criteria"],
            ["Primary User", "Customers, user entities", "Board, management, investors, partners"],
            ["Distribution", "Restricted use", "General use (with certain restrictions)"],
            ["Focus", "Controls over a system", "Cybersecurity risk management"]
          ]
        },
        {
          title: 'SOC for Cybersecurity Framework',
          type: 'text',
          content: "SOC for Cybersecurity uses two sets of criteria: (1) Description Criteria for describing the cybersecurity risk management program, and (2) Control Criteria for evaluating control effectiveness (typically based on a recognized framework like NIST CSF)."
        },
        {
          title: 'Description Criteria Elements',
          type: 'list',
          items: [
            "Nature of business and operations",
            "Nature of information at risk",
            "Cybersecurity objectives of the entity",
            "Factors affecting cybersecurity risks",
            "Cybersecurity risk governance structure",
            "Cybersecurity risk assessment process",
            "Cybersecurity communications and quality of information",
            "Monitoring of the cybersecurity risk management program",
            "Cybersecurity control processes"
          ]
        },
        {
          title: 'Control Criteria Options',
          type: 'table',
          headers: ["Framework", "Source", "Common Use"],
          rows: [
            ["NIST CSF", "NIST Cybersecurity Framework", "Most common in US"],
            ["ISO 27001/27002", "International standard", "Global organizations"],
            ["AICPA Trust Services", "Same as SOC 2", "Organizations with SOC 2"],
            ["COBIT", "ISACA framework", "IT governance focus"],
            ["Organization-specific", "Custom criteria", "Unique requirements"]
          ]
        },
        {
          title: 'Report Components',
          type: 'table',
          headers: ["Section", "Content"],
          rows: [
            ["Management Assertion", "Description is fairly presented, controls effective"],
            ["Practitioner Opinion", "Opinion on description and control effectiveness"],
            ["Description of Program", "Cybersecurity risk management program details"],
            ["Control Matrix (optional)", "May include controls and test results"]
          ]
        },
        {
          title: 'Who Uses SOC for Cybersecurity',
          type: 'list',
          items: [
            "Board of Directors: Governance oversight of cybersecurity risk",
            "Senior Management: Enterprise risk management decisions",
            "Investors: Assess cybersecurity risk in investment decisions",
            "Business Partners: Evaluate ecosystem risk",
            "Regulators: Compliance and examination support",
            "Customers: Enterprise-wide (not just specific service) assurance"
          ]
        },
        {
          title: 'Examination Procedures',
          type: 'list',
          items: [
            "Understand the entity's cybersecurity risk management program",
            "Assess design of program description against description criteria",
            "Select controls to test based on risk assessment",
            "Test operating effectiveness of controls",
            "Evaluate results and form opinion",
            "Consider subsequent events affecting cybersecurity"
          ]
        },
        {
          title: 'Benefits of SOC for Cybersecurity',
          type: 'list',
          items: [
            "Enterprise-wide view vs. system-specific (SOC 2)",
            "Demonstrates cybersecurity governance to stakeholders",
            "Flexible criteria selection based on industry/needs",
            "General-use report for broader distribution",
            "Complements other SOC reports (use SOC 2 for specific systems)"
          ]
        },
        {
          title: 'Memory Aid: SOC for Cybersecurity Scope',
          type: 'callout',
          calloutType: 'tip',
          content: "'SOC 2 = System specific; SOC Cyber = Company-wide'. Think of SOC 2 as examining a specific building's security, while SOC for Cybersecurity examines the entire corporate security program across all buildings."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "SOC for Cybersecurity is NOT SOC 2! They have different scopes, criteria, and purposes. SOC for Cybersecurity covers enterprise-wide risk management; SOC 2 covers controls over a specific system or service. Organizations may need both."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• SOC for Cybersecurity examines enterprise-wide cybersecurity risk management\n• Uses Description Criteria + Control Criteria (NIST CSF, ISO 27001, etc.)\n• General-use report for boards, investors, partners\n• Complements SOC 2 (enterprise vs. system-specific)\n• Demonstrates cybersecurity governance to stakeholders\n• Flexible criteria selection based on organization needs"
        }
      ]
    }
  },
  {
    id: 'ISC-III-008',
    section: 'ISC',
    title: "Using SOC Reports in Financial Audits",
    description: "Apply SOC reports as audit evidence when service organizations process user entity transactions",
    order: 31,
    duration: 50,
    difficulty: 'advanced',
    topics: ["SOC", "Audit Evidence", "Financial Statement Audit"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "When clients use service organizations, user auditors need evidence about controls at those service organizations. SOC 1 reports are the primary source of this evidence. Understanding how to use SOC reports is essential for financial statement audits of entities using outsourced services."
        },
        {
          title: 'User Auditor Responsibilities',
          type: 'text',
          content: "Per AU-C 402, user auditors must obtain an understanding of how service organization services affect user entity's internal control, assess risk of material misstatement, and design/perform audit procedures responsive to those risks. SOC reports help fulfill these responsibilities."
        },
        {
          title: 'Steps for Using SOC Reports',
          type: 'table',
          headers: ["Step", "Activity", "Consideration"],
          rows: [
            ["1", "Identify relevant service organizations", "Which services affect significant accounts?"],
            ["2", "Obtain SOC report", "Request from client or directly from service org"],
            ["3", "Evaluate service auditor", "Competence, independence, reputation"],
            ["4", "Assess report relevance", "Does it cover the right controls and period?"],
            ["5", "Evaluate control objectives", "Do they address user entity's relevant assertions?"],
            ["6", "Evaluate exceptions", "Impact on reliance, compensating controls?"],
            ["7", "Test CUECs", "User entity's complementary controls"],
            ["8", "Perform roll-forward", "Bridge gap between report and audit dates"]
          ]
        },
        {
          title: 'Evaluating the Service Auditor',
          type: 'list',
          items: [
            "Professional competence: Licensed CPA, relevant experience",
            "Independence: No prohibited relationships with service organization",
            "Professional reputation: Consider firm standing, peer review results",
            "Standards compliance: Report issued under appropriate standards (SSAE 18)",
            "User auditor does NOT assume responsibility for service auditor's work"
          ]
        },
        {
          title: 'Assessing Report Relevance',
          type: 'list',
          items: [
            "Scope: Does report cover services affecting user entity's financial reporting?",
            "Period: Does report cover a sufficient portion of the audit period?",
            "Control Objectives: Are relevant assertions addressed?",
            "Type: Is Type 2 available? (Type 1 provides limited evidence)",
            "Subservice Organizations: Are they included or carved out?"
          ]
        },
        {
          title: 'Addressing Report Period Gaps',
          type: 'table',
          headers: ["Gap Type", "Situation", "Response"],
          rows: [
            ["Pre-Gap", "Report starts after audit period begins", "Extend substantive testing for early period"],
            ["Post-Gap", "Report ends before audit period ends", "Roll-forward procedures, inquiry, monitoring"],
            ["Coverage Gap", "Report period too short", "Request longer coverage, additional testing"],
            ["Stale Report", "Report is from prior year", "Obtain current report or perform alternative procedures"]
          ]
        },
        {
          title: 'Roll-Forward Procedures',
          type: 'list',
          items: [
            "Inquire of user entity management about changes at service organization",
            "Review service organization communications, bulletins, announcements",
            "Evaluate user entity's monitoring of service organization",
            "Consider whether significant changes occurred",
            "Obtain bridge letter from service organization if available",
            "Perform additional tests of controls if changes are significant"
          ]
        },
        {
          title: 'Testing Complementary User Entity Controls (CUECs)',
          type: 'text',
          content: "CUECs identified in SOC report are controls user entity MUST implement for service organization controls to be effective. User auditor must test CUECs if relying on service organization controls. Example: Service org calculates accurately, but user entity must review output."
        },
        {
          title: 'Evaluating Exceptions in SOC Report',
          type: 'table',
          headers: ["Factor", "Consideration"],
          rows: [
            ["Nature", "Administrative error vs. control design failure"],
            ["Severity", "Pervasive or isolated?"],
            ["Impact", "Does exception affect user entity's relevant controls?"],
            ["Compensating controls", "Does service org have other controls that mitigate?"],
            ["User entity controls", "Can user entity compensate through their own controls?"],
            ["Remediation", "Has service organization addressed the issue?"]
          ]
        },
        {
          title: 'Documentation Requirements',
          type: 'list',
          items: [
            "Identification of service organizations used",
            "Nature and significance of services",
            "Evaluation of service auditor competence and independence",
            "Basis for reliance on SOC report",
            "Assessment of control objectives and relevance",
            "Testing of CUECs",
            "Roll-forward procedures performed",
            "Impact of any exceptions on audit conclusions"
          ]
        },
        {
          title: 'Memory Aid: SOC Report Evaluation',
          type: 'callout',
          calloutType: 'tip',
          content: "'SCOPE + CUEC + GAP' for using SOC reports:\nS = Service auditor evaluation\nC = Control objectives relevant?\nO = Operating effectiveness tested (Type 2)?\nP = Period adequate?\nE = Exceptions evaluated?\nCUEC = Test user entity controls\nGAP = Roll-forward procedures"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "User auditor cannot just 'accept' a SOC report! You must evaluate relevance, assess service auditor, test CUECs, and perform roll-forward procedures. A clean SOC 1 opinion alone is NOT sufficient audit evidence."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• SOC 1 Type 2 is primary evidence for service organization controls\n• Evaluate service auditor competence and independence\n• Assess whether control objectives address relevant assertions\n• User auditor must test CUECs at user entity\n• Roll-forward procedures address gaps between report and audit dates\n• Exceptions require evaluation—don't automatically disqualify reliance"
        }
      ]
    }
  },
  {
    id: 'ISC-III-009',
    section: 'ISC',
    title: "Subservice Organizations: Carve-Out vs Inclusive",
    description: "Navigate subservice organization treatment in SOC reports and implications for audit reliance",
    order: 32,
    duration: 45,
    difficulty: 'advanced',
    topics: ["SOC", "Subservice Organizations", "Third-Party Risk"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Service organizations often use other service organizations (subservice organizations) to deliver their services. Understanding carve-out vs. inclusive methods is critical for determining whether SOC reports provide sufficient evidence about all relevant controls."
        },
        {
          title: 'Subservice Organization Defined',
          type: 'text',
          content: "A subservice organization is a service organization used by another service organization to perform services that are part of the system being examined. Example: A payroll processor (service org) uses a data center (subservice org) to host their application."
        },
        {
          title: 'Carve-Out vs Inclusive Methods',
          type: 'table',
          headers: ["Aspect", "Carve-Out", "Inclusive"],
          rows: [
            ["Description", "Subservice org's services described but NOT controls", "Subservice org's controls included in report"],
            ["Testing", "Subservice controls NOT tested", "Subservice controls tested by service auditor"],
            ["Scope", "Narrower—excludes subservice", "Broader—includes subservice"],
            ["User Auditor Action", "Need separate SOC from subservice org", "Covered in single report"],
            ["Common Use", "Most common approach", "Less common, more comprehensive"]
          ]
        },
        {
          title: 'Carve-Out Method',
          type: 'text',
          content: "In carve-out, the service organization's system description identifies the subservice organization and describes the services it provides, but the subservice organization's controls are excluded from the examination. User auditors must separately evaluate whether subservice controls are relevant and obtain assurance over them."
        },
        {
          title: 'Carve-Out Implications',
          type: 'list',
          items: [
            "SOC report only covers the service organization's own controls",
            "User auditor must identify what subservices are carved out",
            "May need to obtain separate SOC report from subservice organization",
            "CSSOs (Complementary Subservice Organization Controls) identified in report",
            "Risk that gaps exist if subservice controls aren't separately evaluated"
          ]
        },
        {
          title: 'Inclusive Method',
          type: 'text',
          content: "In inclusive method, the service organization includes the subservice organization's controls in their SOC engagement. The service auditor either tests subservice controls directly or uses work of subservice auditor. Results for both organizations included in single report."
        },
        {
          title: 'Inclusive Method Considerations',
          type: 'list',
          items: [
            "More comprehensive coverage in single report",
            "Service auditor must plan procedures for subservice controls",
            "May use work of subservice organization's auditor",
            "Coordination between service and subservice auditors required",
            "Less common due to complexity and cost"
          ]
        },
        {
          title: 'Identifying Subservice Organizations in Reports',
          type: 'table',
          headers: ["Look For", "Location in Report"],
          rows: [
            ["List of subservice organizations", "System description (Section III)"],
            ["Services provided by each", "System description (Section III)"],
            ["Method used (carve-out or inclusive)", "System description, opinion"],
            ["Complementary Subservice Organization Controls", "Control matrices"],
            ["Scope exclusions", "Auditor's opinion, management assertion"]
          ]
        },
        {
          title: 'User Auditor Responsibilities',
          type: 'list',
          items: [
            "Identify all subservice organizations and method used",
            "For carve-out: Assess whether subservice controls affect audit",
            "If relevant: Obtain separate SOC report or perform alternative procedures",
            "Evaluate complementary subservice organization controls (CSSOs)",
            "Document basis for conclusions about subservice organization controls"
          ]
        },
        {
          title: 'Common Subservice Organization Examples',
          type: 'table',
          headers: ["Service Organization", "Typical Subservice", "Subservice Controls"],
          rows: [
            ["SaaS Application", "Cloud hosting (AWS, Azure)", "Physical security, infrastructure"],
            ["Payroll Processor", "Check printing vendor", "Print security, distribution"],
            ["Payment Processor", "Network gateway", "Transaction routing, encryption"],
            ["Benefits Administrator", "Investment manager", "Investment processing"],
            ["IT Managed Services", "Data center provider", "Environmental, physical controls"]
          ]
        },
        {
          title: 'Memory Aid: Carve-Out vs Inclusive',
          type: 'callout',
          calloutType: 'tip',
          content: "'Carve-Out = Cut Out' → Subservice is cut out of the examination scope; you need their own SOC report.\n'Inclusive = Included' → Subservice is included in the examination; one report covers both.\nCarve-out is like a pizza with toppings removed—you have to get them separately!"
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "Carve-out doesn't mean subservice controls don't matter! If a subservice organization hosts the application or handles transactions, their controls may be critical. A clean SOC report with significant carved-out subservices may provide insufficient evidence."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• Subservice organizations provide services to service organizations\n• Carve-out: subservice controls excluded; need separate SOC report\n• Inclusive: subservice controls included in single report\n• Carve-out is most common; inclusive is more comprehensive\n• User auditors must evaluate whether carved-out subservices affect audit\n• CSSOs (Complementary Subservice Organization Controls) must be considered"
        }
      ]
    }
  },
  {
    id: 'ISC-III-010',
    section: 'ISC',
    title: "SOC for Supply Chain",
    description: "Understand SOC for Supply Chain engagements addressing controls over production and distribution systems",
    order: 33,
    duration: 45,
    difficulty: 'intermediate',
    topics: ["SOC", "Supply Chain", "Operations"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          calloutType: 'important',
          content: "Supply chain disruptions and integrity issues pose significant risks. SOC for Supply Chain provides assurance over controls at manufacturers, distributors, and logistics providers. Understanding this emerging SOC type helps CPAs advise clients on supply chain risk management."
        },
        {
          title: 'SOC for Supply Chain Overview',
          type: 'text',
          content: "SOC for Supply Chain is a framework for examining controls over production and distribution systems. It addresses the need for assurance that products are manufactured, distributed, and delivered as specified—covering product integrity, security, and compliance throughout the supply chain."
        },
        {
          title: 'SOC for Supply Chain vs Other SOC Reports',
          type: 'table',
          headers: ["Report", "Primary Focus"],
          rows: [
            ["SOC 1", "Controls over financial reporting (ICFR)"],
            ["SOC 2", "Trust Services: security, availability, processing integrity, confidentiality, privacy"],
            ["SOC for Cybersecurity", "Enterprise cybersecurity risk management"],
            ["SOC for Supply Chain", "Controls over production and distribution systems"]
          ]
        },
        {
          title: 'Supply Chain Risk Areas',
          type: 'list',
          items: [
            "Product Integrity: Is the product manufactured to specifications?",
            "Counterfeit Prevention: Are controls in place to prevent counterfeiting?",
            "Security: Are products protected during production and transit?",
            "Traceability: Can products be traced through the supply chain?",
            "Compliance: Are regulatory requirements met (FDA, EPA, etc.)?",
            "Sustainability: Are environmental and social standards followed?"
          ]
        },
        {
          title: 'Entities Using SOC for Supply Chain',
          type: 'table',
          headers: ["Entity Type", "Example", "Report Use"],
          rows: [
            ["Manufacturers", "Pharmaceutical companies", "Demonstrate production controls to customers"],
            ["Distributors", "Medical device distributors", "Show handling and storage controls"],
            ["Logistics Providers", "Cold chain logistics", "Verify temperature and security controls"],
            ["Retailers", "Consumer goods companies", "Evaluate supplier controls"],
            ["Customers/Buyers", "Hospitals, government", "Vendor due diligence"]
          ]
        },
        {
          title: 'SOC for Supply Chain Description Criteria',
          type: 'list',
          items: [
            "Nature of the entity's supply chain operations",
            "Principal system commitments and requirements",
            "System components: infrastructure, software, people, procedures, data",
            "Risk management processes specific to supply chain",
            "Controls over production, distribution, and related processes",
            "Monitoring and continuous improvement processes"
          ]
        },
        {
          title: 'Control Areas Addressed',
          type: 'table',
          headers: ["Area", "Example Controls"],
          rows: [
            ["Production Controls", "Quality checks, batch testing, equipment calibration"],
            ["Inventory Management", "Tracking systems, physical counts, segregation"],
            ["Storage Controls", "Environmental monitoring, access restrictions"],
            ["Distribution Controls", "Chain of custody, tamper evidence, temperature logging"],
            ["Supplier Management", "Qualification, audits, incoming inspection"],
            ["Traceability", "Lot tracking, serialization, recall procedures"]
          ]
        },
        {
          title: 'Benefits of SOC for Supply Chain',
          type: 'list',
          items: [
            "Demonstrates supply chain controls to customers and partners",
            "Reduces number of individual customer audits",
            "Provides competitive advantage in procurement decisions",
            "Supports regulatory compliance (FDA, etc.)",
            "Identifies gaps in supply chain controls proactively",
            "Standardized framework for supply chain assurance"
          ]
        },
        {
          title: 'Industry Applications',
          type: 'list',
          items: [
            "Pharmaceuticals: Drug supply chain security (DSCSA compliance)",
            "Medical Devices: Manufacturing and distribution controls",
            "Food & Beverage: Safety controls, cold chain, traceability",
            "Aerospace: Component authenticity, quality management",
            "Electronics: Counterfeit prevention, sourcing controls",
            "Defense: Security and integrity of military supply chain"
          ]
        },
        {
          title: 'Memory Aid: SOC for Supply Chain',
          type: 'callout',
          calloutType: 'tip',
          content: "'SOC 1 = $, SOC 2 = Security, SOC Cyber = Company-wide cyber, SOC Supply Chain = Stuff'\nSOC for Supply Chain is about physical stuff—manufacturing, moving, and delivering products. It's the 'physical world' SOC."
        },
        {
          title: 'Exam Trap',
          type: 'callout',
          calloutType: 'warning',
          content: "SOC for Supply Chain is NOT just SOC 2 for manufacturers! It has specific description criteria and control objectives focused on production and distribution. The criteria address physical products and supply chain processes, not just IT systems."
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: "• SOC for Supply Chain addresses production and distribution system controls\n• Covers product integrity, security, traceability, and compliance\n• Used by manufacturers, distributors, logistics providers\n• Specific description criteria for supply chain operations\n• Control areas: production, inventory, storage, distribution, suppliers\n• Emerging importance due to supply chain risk concerns"
        }
      ]
    }
  },
  // ==========================================
  // ADDITIONAL ISC LESSONS
  // ==========================================
  {
    id: 'ISC-IV-001',
    section: 'ISC',
    title: "Cloud Computing Security",
    description: "Evaluate cloud security models, controls, and compliance",
    order: 34,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Security", "Cloud Computing", "IT Controls"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          content: "Cloud adoption is ubiquitous! CPAs must understand cloud service models, shared responsibility, and how to evaluate cloud provider controls for SOC engagements and ITGC assessments."
        },
        {
          title: 'Cloud Service Models',
          type: 'table',
          headers: ['Model', 'Provider Manages', 'Customer Manages', 'Examples'],
          rows: [
            ['IaaS', 'Hardware, virtualization, storage', 'OS, apps, data, access', 'AWS EC2, Azure VMs'],
            ['PaaS', 'Infrastructure + runtime, middleware', 'Apps, data', 'Heroku, Google App Engine'],
            ['SaaS', 'Everything except data', 'Data, user access', 'Salesforce, Microsoft 365']
          ]
        },
        {
          title: 'Shared Responsibility Model',
          type: 'text',
          content: "**Critical concept for auditors:**\n\n• Provider is responsible FOR the cloud (infrastructure security)\n• Customer is responsible IN the cloud (data, access, configuration)\n\n**As you move from IaaS → PaaS → SaaS, more responsibility shifts to provider**"
        },
        {
          title: '🧠 Memory Aid: Cloud Responsibility',
          type: 'callout',
          content: "**\"Pizza as a Service\"**\n\nIaaS = You make pizza with their oven\nPaaS = You add toppings to their dough\nSaaS = You eat pizza they made\n\n**More convenience = Less control = More trust needed**"
        },
        {
          title: 'Cloud Security Controls',
          type: 'table',
          headers: ['Control Area', 'Key Controls'],
          rows: [
            ['Identity & Access', 'SSO, MFA, privileged access management'],
            ['Data Protection', 'Encryption at rest/transit, key management'],
            ['Network Security', 'VPCs, firewalls, DDoS protection'],
            ['Monitoring', 'SIEM, logging, threat detection'],
            ['Compliance', 'SOC reports, certifications, contracts']
          ]
        },
        {
          title: 'Evaluating Cloud Providers',
          type: 'text',
          content: "**Due diligence checklist:**\n\n✓ SOC 2 Type II report (annual)\n✓ ISO 27001 certification\n✓ Data residency and jurisdiction\n✓ Business continuity/disaster recovery\n✓ Incident response procedures\n✓ Subservice organizations (4th parties)"
        },
        {
          title: '⚠️ Exam Trap: Multi-Tenancy',
          type: 'warning',
          content: "**Cloud environments are multi-tenant!**\n\n• Your data shares infrastructure with others\n• Logical separation must be strong\n• Side-channel attacks are a risk\n• Data isolation controls are critical\n\n**Don't assume physical segregation exists!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IaaS/PaaS/SaaS determine responsibility split",
            "Customer ALWAYS responsible for data and access",
            "SOC 2 Type II is standard for cloud provider assurance",
            "Multi-tenancy requires strong logical controls",
            "Evaluate data residency, BCP, and incident response",
            "4th party risk from subservice organizations"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-002',
    section: 'ISC',
    title: "Cybersecurity Frameworks and Standards",
    description: "Apply NIST, ISO 27001, and other security frameworks",
    order: 35,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Security", "Frameworks", "Compliance"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          content: "Security frameworks provide structured approaches to managing cyber risk. CPAs use them in SOC engagements, security assessments, and advising on governance structures."
        },
        {
          title: 'NIST Cybersecurity Framework',
          type: 'table',
          headers: ['Function', 'Purpose', 'Example Activities'],
          rows: [
            ['Identify', 'Know your assets and risks', 'Asset inventory, risk assessment'],
            ['Protect', 'Safeguard critical services', 'Access controls, training, encryption'],
            ['Detect', 'Discover security events', 'Monitoring, anomaly detection'],
            ['Respond', 'Take action on incidents', 'Incident response, communication'],
            ['Recover', 'Restore capabilities', 'Recovery planning, improvements']
          ]
        },
        {
          title: '🧠 Memory Aid: NIST Functions',
          type: 'callout',
          content: "**\"I Prefer Doughnuts Regularly, Really!\"**\n\n**I**dentify what you have\n**P**rotect it from threats\n**D**etect when something happens\n**R**espond to incidents\n**R**ecover operations\n\n**Sequential flow from planning to restoration**"
        },
        {
          title: 'ISO 27001 Overview',
          type: 'text',
          content: "**International standard for ISMS:**\n\n• Risk-based approach to security\n• Requires management commitment\n• Continuous improvement (PDCA)\n• 114 controls in Annex A\n• Certification available from accredited bodies\n\n**More prescriptive than NIST CSF**"
        },
        {
          title: 'Framework Comparison',
          type: 'table',
          headers: ['Framework', 'Best For', 'Certification?'],
          rows: [
            ['NIST CSF', 'US organizations, flexibility', 'No (self-assessment)'],
            ['ISO 27001', 'Global, formal certification', 'Yes'],
            ['COBIT', 'IT governance, audit', 'Yes (ISACA)'],
            ['CIS Controls', 'Technical prioritization', 'No'],
            ['SOC 2', 'Service organizations', 'Yes (CPA report)']
          ]
        },
        {
          title: '⚠️ Exam Trap: Framework vs. Standard',
          type: 'warning',
          content: "**They're different!**\n\n**Framework:** Flexible guidance, principles-based\n(NIST CSF, COBIT)\n\n**Standard:** Specific requirements, certifiable\n(ISO 27001, PCI DSS)\n\n**Frameworks guide; Standards prescribe**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "NIST CSF: Identify, Protect, Detect, Respond, Recover",
            "ISO 27001: Certifiable international ISMS standard",
            "COBIT: IT governance and management framework",
            "Frameworks are flexible; Standards are prescriptive",
            "Selection depends on industry, customers, regulations",
            "Many organizations map multiple frameworks together"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-003',
    section: 'ISC',
    title: "Penetration Testing and Vulnerability Assessment",
    description: "Understand security testing methodologies and their role in assurance",
    order: 36,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Security", "Testing", "Vulnerability Management"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          content: "Security testing provides evidence of control effectiveness. CPAs evaluate penetration test results in SOC engagements and may recommend testing as part of security assessments."
        },
        {
          title: 'Testing Types Comparison',
          type: 'table',
          headers: ['Type', 'Purpose', 'Depth', 'Frequency'],
          rows: [
            ['Vulnerability Scan', 'Find known weaknesses', 'Surface-level', 'Continuous/weekly'],
            ['Penetration Test', 'Exploit vulnerabilities', 'Deep, targeted', 'Annual/semi-annual'],
            ['Red Team', 'Simulate real attack', 'Most comprehensive', 'Annual or less'],
            ['Bug Bounty', 'Crowdsourced testing', 'Varies', 'Ongoing']
          ]
        },
        {
          title: 'Penetration Test Phases',
          type: 'text',
          content: "**Standard methodology:**\n\n1. **Planning** - Scope, rules of engagement\n2. **Reconnaissance** - Gather information\n3. **Scanning** - Identify vulnerabilities\n4. **Exploitation** - Attempt to breach\n5. **Post-exploitation** - Assess impact\n6. **Reporting** - Document findings"
        },
        {
          title: '🧠 Memory Aid: Pen Test Phases',
          type: 'callout',
          content: "**\"Please Remain Seated, Everyone's Panicking, Run!\"**\n\n**P**lanning the engagement\n**R**econnaissance gathering\n**S**canning for vulns\n**E**xploitation attempts\n**P**ost-exploitation impact\n**R**eporting results\n\n**Systematic approach to ethical hacking**"
        },
        {
          title: '⚠️ Exam Trap: Scope Limitations',
          type: 'warning',
          content: "**Pen tests have limitations:**\n\n• Point-in-time assessment only\n• Scope excludes some systems\n• Tester skill varies\n• \"No findings\" ≠ Secure\n\n**Complement with continuous monitoring!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Vulnerability scan: Automated, broad, frequent",
            "Penetration test: Manual, deep, periodic",
            "Phases: Plan, Recon, Scan, Exploit, Post-exploit, Report",
            "Scoping: Knowledge level, location, targets",
            "Evaluate tester qualifications and scope adequacy",
            "Pen tests are point-in-time, not continuous assurance"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-004',
    section: 'ISC',
    title: "Incident Response Planning",
    description: "Evaluate and advise on security incident response capabilities",
    order: 37,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Security", "Incident Response", "Business Continuity"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          content: "Incidents are inevitable! CPAs evaluate incident response capabilities in SOC engagements, advise on IRP development, and may serve as part of response teams for financial incidents."
        },
        {
          title: 'Incident Response Phases',
          type: 'table',
          headers: ['Phase', 'Purpose', 'Key Activities'],
          rows: [
            ['Preparation', 'Be ready', 'Plan, train, tools, contacts'],
            ['Identification', 'Detect and verify', 'Monitor, triage, classify'],
            ['Containment', 'Stop spread', 'Isolate, preserve evidence'],
            ['Eradication', 'Remove threat', 'Clean systems, patch vulns'],
            ['Recovery', 'Restore operations', 'Rebuild, verify, monitor'],
            ['Lessons Learned', 'Improve', 'Document, update plans']
          ]
        },
        {
          title: '🧠 Memory Aid: IR Phases',
          type: 'callout',
          content: "**\"People In Crisis Eventually Recover Lessons\"**\n\n**P**reparation (before)\n**I**dentification (detect)\n**C**ontainment (stop)\n**E**radication (remove)\n**R**ecovery (restore)\n**L**essons Learned (improve)\n\n**Circular process—lessons feed back to prep**"
        },
        {
          title: '⚠️ Exam Trap: Evidence Preservation',
          type: 'warning',
          content: "**Forensic evidence is fragile!**\n\n• Create forensic images before changes\n• Document chain of custody\n• Don't run live tools on compromised systems\n• Preserve logs immediately\n\n**Eradication destroys evidence—preserve first!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Six phases: Prep, ID, Contain, Eradicate, Recover, Lessons",
            "IRP should have clear roles, escalation, communications",
            "Classify incidents by severity for appropriate response",
            "Know notification requirements (GDPR, state laws, SEC)",
            "Preserve evidence before eradication",
            "Lessons learned feeds continuous improvement"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-005',
    section: 'ISC',
    title: "Identity and Access Management",
    description: "Evaluate IAM controls and authentication mechanisms",
    order: 38,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Security", "Access Controls", "Identity Management"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          content: "Access controls are foundational to ITGC! IAM determines who can access what—critical for segregation of duties, privileged access, and preventing unauthorized transactions."
        },
        {
          title: 'IAM Components',
          type: 'table',
          headers: ['Component', 'Purpose', 'Examples'],
          rows: [
            ['Identity Store', 'Central user repository', 'Active Directory, LDAP'],
            ['Authentication', 'Verify identity', 'Passwords, MFA, biometrics'],
            ['Authorization', 'Determine permissions', 'RBAC, ABAC, ACLs'],
            ['Administration', 'Manage lifecycle', 'Provisioning, deprovisioning'],
            ['Audit', 'Track access events', 'Logging, access reviews']
          ]
        },
        {
          title: 'Authentication Factors',
          type: 'text',
          content: "**Three authentication factors:**\n\n**Something you KNOW:** Password, PIN\n**Something you HAVE:** Token, phone, smart card\n**Something you ARE:** Fingerprint, face, iris\n\n**MFA = Two or more factors**\n**2FA is minimum for sensitive access**"
        },
        {
          title: '🧠 Memory Aid: Authentication Factors',
          type: 'callout',
          content: "**\"Know, Have, Are\"**\n\n**K**now = Brain (password)\n**H**ave = Hand (token)\n**A**re = Body (biometric)\n\n**Stronger when combined: Password + Token + Fingerprint**"
        },
        {
          title: '⚠️ Exam Trap: Access Reviews',
          type: 'warning',
          content: "**Periodic access reviews are CRITICAL!**\n\n• Compare actual access to job requirements\n• Remove terminated user access immediately\n• Review privileged access frequently\n• Document review and remediation\n\n**\"Joiner-Mover-Leaver\" processes prevent access creep**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IAM: Identity store, authentication, authorization, admin, audit",
            "Three factors: Know, Have, Are (MFA uses 2+)",
            "RBAC is most common access control model",
            "PAM protects privileged/admin accounts",
            "Access reviews detect inappropriate access",
            "Joiner-Mover-Leaver process manages lifecycle"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-006',
    section: 'ISC',
    title: "Encryption and Cryptography",
    description: "Understand cryptographic controls for data protection",
    order: 39,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Security", "Cryptography", "Data Protection"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          content: "Encryption protects data confidentiality! CPAs evaluate encryption controls for data at rest and in transit, assess key management, and understand its role in compliance."
        },
        {
          title: 'Encryption Types',
          type: 'table',
          headers: ['Type', 'Keys', 'Speed', 'Use Cases'],
          rows: [
            ['Symmetric', 'Same key encrypt/decrypt', 'Fast', 'Data at rest, bulk data'],
            ['Asymmetric', 'Public/private key pair', 'Slow', 'Key exchange, signatures'],
            ['Hashing', 'One-way, no key', 'Fast', 'Passwords, integrity']
          ]
        },
        {
          title: 'Common Algorithms',
          type: 'text',
          content: "**Symmetric:** AES (128/256-bit) - current standard\n**Asymmetric:** RSA, ECC - key exchange/signatures\n**Hashing:** SHA-256, SHA-3 - integrity verification\n\n**Avoid:** DES, MD5, SHA-1 (deprecated/weak)"
        },
        {
          title: '🧠 Memory Aid: Symmetric vs Asymmetric',
          type: 'callout',
          content: "**Symmetric = Same key (like house key)**\n• Fast but key distribution problem\n\n**Asymmetric = Different keys (like mailbox)**\n• Public key to encrypt, Private to decrypt\n• Solves key distribution\n\n**Use asymmetric to exchange symmetric keys!**"
        },
        {
          title: '⚠️ Exam Trap: Key Custody',
          type: 'warning',
          content: "**Encryption is only as strong as key protection!**\n\n• Who has access to encryption keys?\n• Cloud provider key management vs. BYOK\n• Escrow and recovery procedures\n• Separation of duties for key access\n\n**Bad key management = No real protection**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Symmetric: Fast, same key (AES)",
            "Asymmetric: Slow, key pairs (RSA, ECC)",
            "Hashing: One-way for integrity (SHA-256)",
            "Key management lifecycle is critical",
            "Protect data at rest and in transit",
            "Key custody determines true protection level"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-007',
    section: 'ISC',
    title: "Data Privacy Regulations",
    description: "Navigate GDPR, CCPA, and privacy compliance requirements",
    order: 40,
    duration: 55,
    difficulty: 'advanced',
    topics: ["Security", "Privacy", "Compliance"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          content: "Data privacy is a major compliance and risk area! CPAs advise on privacy programs, assess privacy controls in SOC engagements, and help organizations navigate regulatory requirements."
        },
        {
          title: 'Major Privacy Regulations',
          type: 'table',
          headers: ['Regulation', 'Jurisdiction', 'Scope', 'Key Penalty'],
          rows: [
            ['GDPR', 'EU + global reach', 'EU resident data', 'Up to 4% global revenue'],
            ['CCPA/CPRA', 'California', 'CA resident data', '$7,500 per violation'],
            ['HIPAA', 'US healthcare', 'PHI', 'Up to $1.5M per category'],
            ['GLBA', 'US financial', 'Consumer financial data', 'Up to $100K per violation']
          ]
        },
        {
          title: 'GDPR Key Principles',
          type: 'text',
          content: "**Seven principles:**\n\n1. **Lawfulness** - Legal basis for processing\n2. **Purpose limitation** - Specific, stated purposes\n3. **Data minimization** - Collect only what needed\n4. **Accuracy** - Keep data correct\n5. **Storage limitation** - Retain only as long as needed\n6. **Security** - Protect data appropriately\n7. **Accountability** - Demonstrate compliance"
        },
        {
          title: '🧠 Memory Aid: GDPR Rights',
          type: 'callout',
          content: "**\"RAEPDOP\"** for Data Subject Rights:\n\n**R**ight to be informed\n**A**ccess\n**E**rasure (right to be forgotten)\n**P**ortability\n**D**ata rectification\n**O**bject to processing\n**P**revent automated decisions\n\n**RAEPDOP protects individuals!**"
        },
        {
          title: '⚠️ Exam Trap: Extraterritorial Reach',
          type: 'warning',
          content: "**GDPR applies beyond EU borders!**\n\n• Any organization processing EU resident data\n• Even if no EU presence\n• Include offering goods/services to EU\n• Or monitoring EU resident behavior\n\n**US companies often subject to GDPR!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "GDPR: EU regulation with global reach, severe penalties",
            "Seven principles: Lawfulness through Accountability",
            "Data subject rights: Access, erasure, portability, etc.",
            "Privacy program: Policy, inventory, consent, DSAR, breach response",
            "SOC 2 includes privacy criteria option",
            "GDPR applies to US companies processing EU data"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-008',
    section: 'ISC',
    title: "Third-Party Risk Management",
    description: "Evaluate vendor and third-party risks and controls",
    order: 41,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Risk Management", "Vendor Management", "SOC"],
    blueprintArea: 'null',
    blueprintTopic: 'null-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters for CPAs',
          type: 'callout',
          content: "Organizations rely heavily on third parties! CPAs assess vendor risks, evaluate SOC reports from service providers, and advise on third-party risk management programs."
        },
        {
          title: 'Third-Party Risk Categories',
          type: 'table',
          headers: ['Category', 'Examples'],
          rows: [
            ['Operational', 'Service outages, quality failures'],
            ['Compliance', 'Regulatory violations, audit failures'],
            ['Strategic', 'Vendor viability, concentration risk'],
            ['Reputational', 'Vendor incidents reflect on you'],
            ['Cybersecurity', 'Data breaches at vendor'],
            ['Financial', 'Vendor insolvency, cost overruns']
          ]
        },
        {
          title: 'TPRM Lifecycle',
          type: 'text',
          content: "**Third-Party Risk Management process:**\n\n1. **Planning:** Identify third-party needs\n2. **Due Diligence:** Assess vendor risks\n3. **Contracting:** Include risk provisions\n4. **Onboarding:** Implement controls\n5. **Monitoring:** Ongoing oversight\n6. **Termination:** Secure exit process"
        },
        {
          title: '🧠 Memory Aid: Vendor Due Diligence',
          type: 'callout',
          content: "**\"FRISCO\"** for vendor assessment:\n\n**F**inancial stability\n**R**egulatory compliance\n**I**nformation security\n**S**ervice capability\n**C**ontinuity planning\n**O**perational controls\n\n**FRISCO covers key diligence areas!**"
        },
        {
          title: '⚠️ Exam Trap: CUECs',
          type: 'warning',
          content: "**Complementary User Entity Controls matter!**\n\n• Service org controls assume you do your part\n• Review CUEC section in SOC report\n• Implement all applicable CUECs\n• Document your CUEC compliance\n\n**SOC opinion assumes CUECs are in place!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Third-party risks: Operational, compliance, strategic, cyber",
            "TPRM lifecycle: Planning through Termination",
            "Due diligence: FRISCO framework",
            "SOC reports: Check scope, period, opinion, CUECs",
            "Fourth-party risk from subservice organizations",
            "Implement CUECs for SOC report reliance"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-009',
    section: 'ISC',
    title: "SOC Examination Deep Dive",
    description: "Master SOC 1, SOC 2, and SOC 3 examination requirements",
    order: 42,
    duration: 60,
    difficulty: 'advanced',
    topics: ["SOC", "Attestation", "Service Organizations"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "SOC examinations are core to ISC! CPAs perform these engagements and rely on SOC reports for audit evidence. Understanding the differences between SOC 1, 2, and 3—and Type I vs Type II—is heavily tested!"
        },
        {
          title: 'SOC Report Comparison',
          type: 'table',
          headers: ['Feature', 'SOC 1', 'SOC 2', 'SOC 3'],
          rows: [
            ['Purpose', 'ICFR impact', 'Trust Services', 'Trust Services'],
            ['Users', 'User auditors/management', 'Management/specified', 'General public'],
            ['Standard', 'AT-C 320', 'AT-C 205', 'AT-C 205'],
            ['Criteria', 'Control objectives', 'TSC (COSO-based)', 'TSC'],
            ['Distribution', 'Restricted', 'Restricted', 'Unrestricted'],
            ['Detail', 'Full description', 'Full description', 'Summary only']
          ]
        },
        {
          title: 'Type I vs Type II',
          type: 'text',
          content: "**Type I (Point in Time):**\n• Design of controls as of a date\n• Controls SUITABLY DESIGNED\n• No operating effectiveness testing\n\n**Type II (Period of Time):**\n• Design AND operating effectiveness\n• Covers minimum 6-month period (typically 12)\n• Controls OPERATING EFFECTIVELY\n\n**Type II is more valuable—proves controls actually work!**"
        },
        {
          title: '🧠 Memory Aid: SOC Types',
          type: 'callout',
          content: "**\"1 = Financial, 2 = Ops, 3 = Public\"**\n\n**SOC 1:** Controls over Financial reporting (ICFR)\n**SOC 2:** Controls over Operations (Trust Services)\n**SOC 3:** Same as 2, but Public-friendly\n\n**Type I = Snapshot (design)**\n**Type II = Movie (operating)**"
        },
        {
          title: 'Trust Services Criteria (TSC)',
          type: 'text',
          content: "**Five categories (SOC 2 basis):**\n\n1. **Security** (Common Criteria - REQUIRED)\n2. **Availability** - System is available for operation\n3. **Processing Integrity** - Processing is complete, accurate\n4. **Confidentiality** - Info is protected as committed\n5. **Privacy** - Personal info handled per policy\n\n**Security is ALWAYS included; others optional**"
        },
        {
          title: 'SOC Report Components',
          type: 'text',
          content: "**Standard SOC 2 Type II report sections:**\n\n1. **Auditor's Report** - Opinion on controls\n2. **Management's Assertion** - Responsibility statement\n3. **System Description** - Infrastructure, people, data\n4. **Control Activities** - Description of each control\n5. **Tests & Results** - Procedures and findings\n\n**Section 5 = Most valuable for user auditors!**"
        },
        {
          title: '⚠️ Exam Trap: Carve-Out vs Inclusive',
          type: 'warning',
          content: "**How subservice organizations are handled:**\n\n**Carve-out method:**\n• Excludes subservice org controls\n• Identifies what subservice org does\n• User must get separate assurance\n\n**Inclusive method:**\n• Includes subservice org controls in scope\n• Tests subservice org controls\n• More complete—but harder to get\n\n**Most reports use carve-out method!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SOC 1: ICFR impact; SOC 2: Trust Services; SOC 3: Public",
            "Type I: Design only; Type II: Design + Operating effectiveness",
            "TSC: Security (required), Availability, PI, Confidentiality, Privacy",
            "User auditors use SOC reports as audit evidence",
            "Check period covered, opinion, exceptions, CUECs",
            "Carve-out excludes subservice orgs; inclusive includes them"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-010',
    section: 'ISC',
    title: "IT Governance and Control Frameworks",
    description: "Apply COBIT, ITIL, and governance frameworks",
    order: 43,
    duration: 55,
    difficulty: 'advanced',
    topics: ["IT Governance", "COBIT", "ITIL", "Frameworks"],
    blueprintArea: 'ISC-I',
    blueprintTopic: 'ISC-I-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "IT governance frameworks help organizations align IT with business objectives! CPAs evaluate IT governance in audits and advisory engagements. COBIT and ITIL are the most common frameworks tested on ISC!"
        },
        {
          title: 'COBIT 2019 Overview',
          type: 'text',
          content: "**Control Objectives for Information and Related Technology:**\n\n**Purpose:** Governance and management of enterprise IT\n\n**Key concepts:**\n• **Governance:** Ensure stakeholder needs met (Evaluate-Direct-Monitor)\n• **Management:** Plan, build, run, and monitor IT\n\n**40 governance/management objectives organized by domain**"
        },
        {
          title: 'COBIT Domains',
          type: 'table',
          headers: ['Domain', 'Code', 'Focus'],
          rows: [
            ['Evaluate, Direct, Monitor', 'EDM', 'Governance (board level)'],
            ['Align, Plan, Organize', 'APO', 'Strategic planning'],
            ['Build, Acquire, Implement', 'BAI', 'Solutions and changes'],
            ['Deliver, Service, Support', 'DSS', 'Operations'],
            ['Monitor, Evaluate, Assess', 'MEA', 'Performance monitoring']
          ]
        },
        {
          title: '🧠 Memory Aid: COBIT Domains',
          type: 'callout',
          content: "**\"Every Day Makes A Better DSS MEA\"**\n\n**EDM** = Executive oversight\n**APO** = Architecture and Planning\n**BAI** = Building systems\n**DSS** = Daily operations\n**MEA** = Measuring results\n\n**Flow: Plan → Build → Run → Monitor**"
        },
        {
          title: 'ITIL Overview',
          type: 'text',
          content: "**Information Technology Infrastructure Library:**\n\n**Purpose:** IT Service Management (ITSM) best practices\n\n**ITIL 4 Service Value Chain:**\n• Plan, Improve, Engage\n• Design & Transition\n• Obtain/Build, Deliver & Support\n\n**Focus: Delivering VALUE through IT services**"
        },
        {
          title: 'COBIT vs ITIL',
          type: 'table',
          headers: ['Aspect', 'COBIT', 'ITIL'],
          rows: [
            ['Focus', 'Governance & Control', 'Service Management'],
            ['Scope', 'Enterprise IT', 'IT Operations'],
            ['Primary users', 'Auditors, governance', 'IT operations'],
            ['Orientation', 'Control objectives', 'Process practices'],
            ['Certification', 'Framework assessment', 'Individual certification']
          ]
        },
        {
          title: 'Key ITSM Processes',
          type: 'text',
          content: "**Critical ITIL processes:**\n\n• **Incident Management:** Restore service quickly\n• **Problem Management:** Find and fix root causes\n• **Change Management:** Control changes to minimize risk\n• **Configuration Management:** Track IT assets (CMDB)\n• **Service Level Management:** Define and monitor SLAs"
        },
        {
          title: '⚠️ Exam Trap: Incident vs Problem',
          type: 'warning',
          content: "**Different processes!**\n\n**Incident Management:**\n• Restore service ASAP\n• Workarounds acceptable\n• Speed is priority\n\n**Problem Management:**\n• Find ROOT CAUSE\n• Prevent recurrence\n• Quality over speed\n\n**Incident = Symptom; Problem = Disease**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "COBIT: IT governance framework (auditor-focused)",
            "COBIT domains: EDM, APO, BAI, DSS, MEA",
            "ITIL: IT service management best practices",
            "Incident = Restore quickly; Problem = Fix root cause",
            "Change management: Control changes to minimize risk",
            "Both frameworks can be used together"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-011',
    section: 'ISC',
    title: "Business Continuity and Disaster Recovery",
    description: "Evaluate BCP/DR plans and recovery capabilities",
    order: 44,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Business Continuity", "Disaster Recovery", "Risk Management"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-A-3',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Disasters happen! CPAs evaluate whether organizations can survive disruptions. Understanding BCP/DR concepts—especially RTO and RPO—is essential for risk assessments and SOC engagements!"
        },
        {
          title: 'BCP vs DR',
          type: 'text',
          content: "**Business Continuity Planning (BCP):**\n• Overall organizational resilience\n• People, processes, facilities\n• Keep business running\n\n**Disaster Recovery (DR):**\n• IT-focused recovery\n• Systems and data restoration\n• Subset of BCP\n\n**BCP is broader; DR is technical**"
        },
        {
          title: 'Critical Metrics',
          type: 'table',
          headers: ['Metric', 'Definition', 'Question It Answers'],
          rows: [
            ['RTO', 'Recovery Time Objective', 'How FAST must we recover?'],
            ['RPO', 'Recovery Point Objective', 'How much DATA can we lose?'],
            ['MTPD', 'Max Tolerable Period of Disruption', 'How long before business fails?'],
            ['MTBF', 'Mean Time Between Failures', 'How reliable is the system?']
          ]
        },
        {
          title: '🧠 Memory Aid: RTO vs RPO',
          type: 'callout',
          content: "**\"Time vs Point\"**\n\n**RTO = TIME to recover (looking forward)**\n• \"We need systems back in 4 hours\"\n\n**RPO = POINT of data (looking backward)**\n• \"We can lose up to 1 hour of data\"\n\n**RTO = Downtime tolerance**\n**RPO = Data loss tolerance**"
        },
        {
          title: 'Recovery Site Options',
          type: 'table',
          headers: ['Type', 'Description', 'Recovery Time', 'Cost'],
          rows: [
            ['Hot Site', 'Fully equipped, ready to go', 'Minutes to hours', 'Highest'],
            ['Warm Site', 'Hardware ready, needs data', 'Hours to days', 'Medium'],
            ['Cold Site', 'Empty facility, needs everything', 'Days to weeks', 'Lowest'],
            ['Cloud DR', 'Cloud-based recovery', 'Variable (can be hot)', 'Pay per use']
          ]
        },
        {
          title: 'BIA - Business Impact Analysis',
          type: 'text',
          content: "**Foundation of BCP planning:**\n\n1. Identify critical business functions\n2. Determine impact of disruption over time\n3. Establish recovery priorities (RTO/RPO)\n4. Identify dependencies\n5. Calculate financial/operational impact\n\n**BIA drives recovery strategy decisions!**"
        },
        {
          title: '⚠️ Exam Trap: Testing Requirements',
          type: 'warning',
          content: "**Plans are worthless if not tested!**\n\n**Test types (increasing realism):**\n• **Tabletop:** Discussion-based walkthrough\n• **Walkthrough:** Step-by-step review\n• **Simulation:** Realistic scenario\n• **Full interruption:** Actually failover\n\n**Minimum annual testing recommended**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "BCP: Business-wide; DR: IT-focused",
            "RTO: How fast to recover; RPO: Data loss tolerance",
            "Hot site: Fast recovery; Cold site: Slow but cheap",
            "BIA identifies critical functions and priorities",
            "Test plans regularly (tabletop to full interruption)",
            "Document and update plans after tests and changes"
          ]
        }
      ]
    }
  },

  // =============================================
  // ISC: ADDITIONAL INFORMATION SYSTEMS TOPICS
  // =============================================
  {
    id: 'ISC-IV-005',
    section: 'ISC',
    title: "Encryption and Cryptography",
    description: "Understand encryption types and cryptographic controls",
    order: 55,
    duration: 50,
    difficulty: 'advanced',
    topics: ["Cryptography", "Security", "Data Protection"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Encryption protects data confidentiality! Understanding symmetric vs asymmetric, hashing, and digital signatures is essential for ISC. This is how we keep data safe in transit and at rest!"
        },
        {
          title: 'Symmetric Encryption',
          type: 'text',
          content: "**Same key for encryption and decryption:**\n\n**Characteristics:**\n• Fast, efficient for large data\n• Key distribution challenge\n• Both parties must have key\n\n**Examples:**\n• AES (Advanced Encryption Standard)\n• DES, 3DES (older)\n\n**Use case:** Encrypting stored data, bulk data transfer"
        },
        {
          title: 'Asymmetric Encryption',
          type: 'table',
          headers: ['Key Type', 'Used For', 'Known To'],
          rows: [
            ['Public key', 'Encrypt messages TO owner', 'Everyone'],
            ['Private key', 'Decrypt messages; Sign', 'Owner only'],
            ['Both together', 'Create key pair', 'Mathematically linked']
          ]
        },
        {
          title: '🧠 Memory Aid: Public/Private Keys',
          type: 'callout',
          content: "**\"Encrypt with Public, Sign with Private\"**\n\n**To send CONFIDENTIAL message:**\n→ Encrypt with recipient's PUBLIC key\n→ Only they can decrypt with PRIVATE key\n\n**To SIGN (prove it's from you):**\n→ Sign with YOUR private key\n→ Anyone can verify with your PUBLIC key"
        },
        {
          title: 'Hashing',
          type: 'text',
          content: "**One-way function creating fixed-length output:**\n\n**Characteristics:**\n• Cannot reverse to original\n• Same input = Same hash (deterministic)\n• Small change = Completely different hash\n• Fixed length regardless of input\n\n**Examples:** SHA-256, SHA-3, MD5 (deprecated)\n\n**Use case:** Password storage, data integrity"
        },
        {
          title: 'Digital Signatures',
          type: 'text',
          content: "**Provides authentication and integrity:**\n\n**Process:**\n1. Hash the message\n2. Encrypt hash with sender's PRIVATE key\n3. Attach signature to message\n\n**Verification:**\n1. Decrypt signature with sender's PUBLIC key\n2. Hash received message\n3. Compare hashes\n\n**Proves: Who sent it AND it wasn't changed**"
        },
        {
          title: 'Digital Certificates',
          type: 'text',
          content: "**Issued by Certificate Authority (CA):**\n\n**Contains:**\n• Owner's public key\n• Owner's identity\n• CA's digital signature\n• Validity period\n\n**Purpose:**\n• Verify public key belongs to claimed entity\n• Enable trusted communication\n• Used in HTTPS/SSL/TLS"
        },
        {
          title: '⚠️ Exam Trap: Encryption vs Hashing',
          type: 'warning',
          content: "**Encryption:** Reversible (decrypt with key)\n**Hashing:** One-way (cannot reverse)\n\n**Common mistake:**\n• Passwords should be HASHED, not encrypted\n• If encrypted, attacker with key gets all passwords\n• Hashed = Each must be cracked individually"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Symmetric: Same key both ways, fast, key distribution issue",
            "Asymmetric: Public/Private pair, slower, solves distribution",
            "Public key encrypts; Private key decrypts/signs",
            "Hashing: One-way, fixed output, used for integrity",
            "Digital signatures: Hash + Private key encryption",
            "Certificates: CA verifies public key ownership",
            "Passwords: Hash, don't encrypt"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-006',
    section: 'ISC',
    title: "Network Security Fundamentals",
    description: "Understand firewalls, VPNs, and network security architecture",
    order: 56,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Network Security", "Firewalls", "VPN"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Networks are the highways of data! Understanding how firewalls, VPNs, and network segmentation protect information is essential for ISC. This is the perimeter defense of cybersecurity!"
        },
        {
          title: 'Firewalls',
          type: 'text',
          content: "**Network security barrier controlling traffic:**\n\n**Types:**\n• **Packet filtering:** Rules on IP/port\n• **Stateful inspection:** Tracks connection state\n• **Application layer:** Inspects content/protocol\n• **Next-gen (NGFW):** Deep packet inspection + IDS/IPS\n\n**Rule of thumb:** Deny all, allow specific"
        },
        {
          title: 'Network Zones',
          type: 'table',
          headers: ['Zone', 'Description', 'Trust Level'],
          rows: [
            ['Internal/LAN', 'Corporate network', 'High trust'],
            ['DMZ', 'Public-facing servers', 'Medium trust'],
            ['External/Internet', 'Outside world', 'No trust'],
            ['VLAN', 'Logical segmentation', 'Configurable']
          ]
        },
        {
          title: '🧠 Memory Aid: DMZ',
          type: 'callout',
          content: "**\"Demilitarized Zone\"**\n\n**Buffer between internal and external:**\n• Web servers\n• Email servers\n• FTP servers\n\n**If DMZ compromised:**\n→ Internal network still protected\n\n**Never put database in DMZ!**"
        },
        {
          title: 'VPN - Virtual Private Network',
          type: 'text',
          content: "**Encrypted tunnel over public network:**\n\n**Types:**\n• **Site-to-site:** Office to office\n• **Remote access:** User to office\n• **SSL/TLS VPN:** Browser-based\n• **IPSec VPN:** Network layer encryption\n\n**Benefits:**\n• Encrypted communication\n• Appear as if on local network\n• Remote access to resources"
        },
        {
          title: 'Intrusion Detection/Prevention',
          type: 'text',
          content: "**IDS - Intrusion Detection System:**\n• Monitors and ALERTS on threats\n• Passive (doesn't block)\n\n**IPS - Intrusion Prevention System:**\n• Monitors and BLOCKS threats\n• Active (stops attacks)\n\n**Detection methods:**\n• Signature-based (known patterns)\n• Anomaly-based (behavioral deviation)"
        },
        {
          title: 'Network Segmentation',
          type: 'text',
          content: "**Dividing network into segments:**\n\n**Benefits:**\n• Contain breaches (lateral movement)\n• Regulatory compliance\n• Performance optimization\n• Access control by segment\n\n**Methods:**\n• VLANs (virtual)\n• Physical separation\n• Microsegmentation (software-defined)"
        },
        {
          title: '⚠️ Exam Trap: Defense in Depth',
          type: 'warning',
          content: "**Multiple layers of security:**\n\n**Don't rely on just firewall!**\n\n**Layers:**\n• Perimeter (firewall, IPS)\n• Network (segmentation, monitoring)\n• Host (antivirus, patching)\n• Application (secure coding, WAF)\n• Data (encryption, DLP)\n\n**If one fails, others protect**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Firewalls control traffic based on rules",
            "Next-gen firewalls include deep inspection",
            "DMZ: Buffer zone for public-facing servers",
            "VPN: Encrypted tunnel for remote access",
            "IDS detects, IPS prevents intrusions",
            "Network segmentation contains breaches",
            "Defense in depth: Multiple security layers"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-007',
    section: 'ISC',
    title: "Data Analytics and Visualization",
    description: "Apply data analytics techniques for audit and business insights",
    order: 57,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Data Analytics", "Visualization", "Audit"],
    blueprintArea: 'ISC-IV',
    blueprintTopic: 'ISC-IV-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Data analytics transforms how we audit and analyze! Understanding techniques like regression, Benford's Law, and visualization is essential for modern CPAs. This is the future of the profession!"
        },
        {
          title: 'Types of Analytics',
          type: 'table',
          headers: ['Type', 'Question Answered', 'Example'],
          rows: [
            ['Descriptive', 'What happened?', 'Summary statistics, dashboards'],
            ['Diagnostic', 'Why did it happen?', 'Root cause analysis, drill-down'],
            ['Predictive', 'What will happen?', 'Forecasting, regression'],
            ['Prescriptive', 'What should we do?', 'Optimization, recommendations']
          ]
        },
        {
          title: '🧠 Memory Aid: Analytics Progression',
          type: 'callout',
          content: "**\"What → Why → Will → Should\"**\n\n**Descriptive:** What happened (past)\n**Diagnostic:** Why it happened (cause)\n**Predictive:** What will happen (future)\n**Prescriptive:** What to do (action)\n\n**Complexity and value increase →**"
        },
        {
          title: 'Benford\'s Law',
          type: 'text',
          content: "**Expected distribution of first digits:**\n\n• 1 appears ~30% of the time\n• 9 appears ~5% of the time\n• Not uniform distribution!\n\n**Audit use:**\n• Compare actual to expected\n• Identify potential fraud or errors\n• Works on: Financial data, populations, invoices\n\n**Does NOT work on:** Assigned numbers, small ranges"
        },
        {
          title: 'Regression Analysis',
          type: 'text',
          content: "**Statistical technique for relationships:**\n\n**Simple linear regression:**\ny = a + bx\n\n**Audit applications:**\n• Predict account balances\n• Identify outliers\n• Substantive analytical procedures\n\n**Key metrics:**\n• R² (explained variance)\n• Residuals (differences from prediction)"
        },
        {
          title: 'Data Visualization',
          type: 'text',
          content: "**Choose the right chart:**\n\n• **Bar/Column:** Compare categories\n• **Line:** Trends over time\n• **Pie:** Parts of a whole (use sparingly!)\n• **Scatter:** Relationship between variables\n• **Heat map:** Intensity/concentration\n• **Dashboard:** Multiple metrics at once\n\n**Keep it simple—communicate clearly!**"
        },
        {
          title: '⚠️ Exam Trap: Data Quality',
          type: 'warning',
          content: "**Analytics only as good as the data!**\n\n**Data quality dimensions:**\n• Accuracy\n• Completeness\n• Timeliness\n• Consistency\n• Validity\n\n**GIGO = Garbage In, Garbage Out**\n\n**Always validate data before analysis!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "Four types: Descriptive → Diagnostic → Predictive → Prescriptive",
            "Benford's Law: Digit distribution for fraud detection",
            "Regression: Predict values, identify outliers",
            "Visualization: Match chart to message",
            "Data quality critical—validate before analysis",
            "Analytics enhances but doesn't replace judgment",
            "Document methodology and conclusions"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-008',
    section: 'ISC',
    title: "Cloud Computing Models",
    description: "Understand IaaS, PaaS, SaaS and cloud security considerations",
    order: 58,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Cloud Computing", "Security", "Architecture"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-A-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Cloud computing has transformed IT! Understanding the service models, shared responsibility, and security considerations is essential for ISC. Most organizations now use cloud services!"
        },
        {
          title: 'Service Models',
          type: 'table',
          headers: ['Model', 'What You Manage', 'Provider Manages'],
          rows: [
            ['IaaS', 'OS, Middleware, Apps, Data', 'Hardware, Virtualization, Network'],
            ['PaaS', 'Apps and Data only', 'Everything else'],
            ['SaaS', 'Just your data', 'Entire stack'],
            ['On-Premise', 'Everything', 'Nothing']
          ]
        },
        {
          title: '🧠 Memory Aid: Cloud Stack',
          type: 'callout',
          content: "**\"Pizza as a Service\"**\n\n**On-Premise:** Make pizza from scratch\n**IaaS:** Kitchen provided (infrastructure)\n**PaaS:** Kitchen + dough (platform)\n**SaaS:** Pizza delivered (software)\n\n**More \"aaS\" = Less you manage**"
        },
        {
          title: 'Deployment Models',
          type: 'text',
          content: "**Public cloud:**\n• Shared infrastructure\n• AWS, Azure, Google Cloud\n• Cost-effective, scalable\n\n**Private cloud:**\n• Dedicated to one organization\n• On-premise or hosted\n• More control, higher cost\n\n**Hybrid cloud:**\n• Mix of public and private\n• Data sovereignty, flexibility"
        },
        {
          title: 'Shared Responsibility Model',
          type: 'text',
          content: "**Security is shared:**\n\n**Provider responsible for:**\n• Physical security of data centers\n• Infrastructure security\n• Underlying platform/software\n\n**Customer responsible for:**\n• Data classification and protection\n• Access management\n• Application security (varies by model)\n\n**The line shifts based on service model!**"
        },
        {
          title: 'Cloud Security Considerations',
          type: 'text',
          content: "**Key concerns:**\n\n• **Data location:** Where is data stored?\n• **Multi-tenancy:** Shared resources with others\n• **Vendor lock-in:** Portability challenges\n• **Compliance:** Regulatory requirements\n• **Incident response:** Who responds to breaches?\n• **Exit strategy:** Getting data out"
        },
        {
          title: '⚠️ Exam Trap: SOC Reports for Cloud',
          type: 'warning',
          content: "**Auditing cloud providers:**\n\n**Request SOC reports:**\n• SOC 1: Financial reporting controls\n• SOC 2: Security, availability, etc.\n\n**Subservice organizations:**\n• Cloud provider may use other providers\n• Inclusive vs carve-out methods\n\n**Cannot audit provider directly!**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IaaS: Infrastructure only (you manage most)",
            "PaaS: Platform provided (you manage apps/data)",
            "SaaS: Software delivered (you manage data only)",
            "Shared responsibility: Security duties split",
            "Public/Private/Hybrid deployment options",
            "Consider: Location, compliance, vendor lock-in",
            "Use SOC reports to assess cloud provider controls"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-009',
    section: 'ISC',
    title: "Change Management and SDLC",
    description: "Understand software development lifecycle and change controls",
    order: 59,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["Change Management", "SDLC", "Controls"],
    blueprintArea: 'ISC-III',
    blueprintTopic: 'ISC-III-B-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Uncontrolled changes cause outages and security issues! Understanding SDLC phases and change management controls is critical for IT governance. This ensures systems remain reliable and secure!"
        },
        {
          title: 'SDLC Phases',
          type: 'table',
          headers: ['Phase', 'Activities', 'Key Deliverable'],
          rows: [
            ['Planning', 'Feasibility, requirements', 'Project plan'],
            ['Analysis', 'Detailed requirements', 'Requirements doc'],
            ['Design', 'System architecture', 'Design specifications'],
            ['Development', 'Coding, unit testing', 'Working software'],
            ['Testing', 'Integration, UAT', 'Test results'],
            ['Implementation', 'Deployment, training', 'Production system'],
            ['Maintenance', 'Updates, support', 'Ongoing operation']
          ]
        },
        {
          title: '🧠 Memory Aid: SDLC',
          type: 'callout',
          content: "**\"Please Artfully Design Dynamic Technology In Motion\"**\n\n**P**lanning\n**A**nalysis\n**D**esign\n**D**evelopment\n**T**esting\n**I**mplementation\n**M**aintenance"
        },
        {
          title: 'Development Methodologies',
          type: 'text',
          content: "**Waterfall:**\n• Sequential phases\n• Formal documentation\n• Changes difficult\n\n**Agile:**\n• Iterative sprints\n• Flexible to change\n• Continuous delivery\n\n**DevOps:**\n• Development + Operations\n• Continuous integration/deployment\n• Automation focus"
        },
        {
          title: 'Change Management Controls',
          type: 'text',
          content: "**Key controls:**\n\n• **Request documentation:** All changes logged\n• **Impact assessment:** What could be affected?\n• **Approval:** Appropriate authorization\n• **Testing:** Before production deployment\n• **Rollback plan:** If something goes wrong\n• **Post-implementation review:** Did it work?\n\n**Separation of duties: Developers ≠ Implementers**"
        },
        {
          title: 'Testing Types',
          type: 'text',
          content: "**Unit testing:** Individual components\n**Integration testing:** Components together\n**System testing:** Complete system\n**User Acceptance Testing (UAT):** End-user validation\n**Regression testing:** Ensure changes don't break existing\n\n**Progress: Unit → Integration → System → UAT**"
        },
        {
          title: '⚠️ Exam Trap: Emergency Changes',
          type: 'warning',
          content: "**Emergency changes still need control!**\n\n**After the fact:**\n• Document the change\n• Obtain retroactive approval\n• Review and validate\n\n**Pre-authorization for emergencies:**\n• Define what qualifies as emergency\n• Limit who can make emergency changes\n• Review all emergency changes promptly"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "SDLC: Planning through Maintenance phases",
            "Waterfall: Sequential; Agile: Iterative",
            "Change management: Request, assess, approve, test, deploy, review",
            "Separation of duties: Devs shouldn't deploy to production",
            "Testing progression: Unit → Integration → System → UAT",
            "Emergency changes: Still document and review",
            "Rollback plan always needed"
          ]
        }
      ]
    }
  },
  {
    id: 'ISC-IV-010',
    section: 'ISC',
    title: "Identity and Access Management (IAM)",
    description: "Understand authentication, authorization, and access controls",
    order: 60,
    duration: 50,
    difficulty: 'intermediate',
    topics: ["IAM", "Access Control", "Authentication"],
    blueprintArea: 'ISC-II',
    blueprintTopic: 'ISC-II-C-1',
    content: {
      sections: [
        {
          title: 'Why This Matters',
          type: 'callout',
          content: "Access control is the gatekeeper of security! Understanding authentication factors, authorization models, and access management is fundamental to ISC. Who can access what—and why?"
        },
        {
          title: 'IAM Fundamentals',
          type: 'text',
          content: "**Three key concepts:**\n\n**Identification:** Who are you? (username)\n**Authentication:** Prove it! (password, biometrics)\n**Authorization:** What can you do? (permissions)\n\n**Plus:**\n**Accountability:** Track what you did (logging)"
        },
        {
          title: 'Authentication Factors',
          type: 'table',
          headers: ['Factor', 'Type', 'Examples'],
          rows: [
            ['Something you know', 'Knowledge', 'Password, PIN, security question'],
            ['Something you have', 'Possession', 'Token, smart card, phone'],
            ['Something you are', 'Inherence', 'Fingerprint, face, iris'],
            ['Somewhere you are', 'Location', 'GPS, IP address']
          ]
        },
        {
          title: '🧠 Memory Aid: Multi-Factor Authentication',
          type: 'callout',
          content: "**\"Know-Have-Are\"**\n\n**MFA = Two or more DIFFERENT factors**\n\n**Good MFA:**\n• Password (know) + Token (have) ✓\n\n**NOT MFA:**\n• Password + Security question ✗\n(Both are \"something you know\")"
        },
        {
          title: 'Access Control Models',
          type: 'text',
          content: "**Discretionary (DAC):**\n• Owner controls access\n• Flexible but risky\n\n**Mandatory (MAC):**\n• System enforces classification\n• Government/military use\n\n**Role-Based (RBAC):**\n• Access based on job role\n• Most common in business\n\n**Attribute-Based (ABAC):**\n• Policies based on attributes\n• Most flexible"
        },
        {
          title: 'Principle of Least Privilege',
          type: 'text',
          content: "**Only access needed to do the job:**\n\n**Benefits:**\n• Reduces attack surface\n• Limits damage if compromised\n• Supports compliance\n\n**Implementation:**\n• Regular access reviews\n• Remove unnecessary access\n• Time-limited elevated access"
        },
        {
          title: 'Privileged Access Management',
          type: 'text',
          content: "**Admin accounts need special handling:**\n\n• Separate admin and regular accounts\n• Strong authentication required\n• Session monitoring and recording\n• Just-in-time elevation\n• Regular rotation of credentials\n• Avoid shared admin accounts"
        },
        {
          title: '⚠️ Exam Trap: SSO vs Federation',
          type: 'warning',
          content: "**Single Sign-On (SSO):**\n• One login for multiple apps\n• Within ONE organization\n\n**Federation:**\n• Trust between organizations\n• Use your company credentials elsewhere\n• Example: SAML, OAuth\n\n**Federation enables cross-org SSO**"
        },
        {
          title: 'Key Takeaways',
          type: 'summary',
          content: [
            "IAM: Identification, Authentication, Authorization, Accountability",
            "MFA: Two+ different factor types",
            "RBAC: Access based on job role (most common)",
            "Least privilege: Only access needed for job",
            "Privileged accounts: Extra controls required",
            "SSO: One login within org; Federation: Cross-org trust",
            "Regular access reviews essential"
          ]
        }
      ]
    }
  }
];

