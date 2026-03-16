#!/usr/bin/env node
/**
 * qbank CLI - World-class question bank management tool
 * 
 * Commands:
 *   validate [section]     Validate questions against schema
 *   stats [section]        Show question bank statistics
 *   migrate [section]      Migrate TypeScript questions to JSON
 *   enhance [section]      AI-enhance questions with UWorld-style explanations
 *   lint [section]         Check questions for quality issues
 *   duplicates [section]   Find duplicate/similar questions
 *   coverage [section]     Blueprint coverage analysis
 *   build                  Generate TypeScript bundles from JSON
 * 
 * Examples:
 *   npx qbank validate FAR
 *   npx qbank stats
 *   npx qbank migrate --all
 *   npx qbank enhance FAR --limit 10
 */

const { execSync } = require('child_process');
const path = require('path');

const COMMANDS = {
  validate: './qbank-validate.cjs',
  stats: './qbank-stats.cjs',
  migrate: './qbank-migrate.cjs',
  enhance: './qbank-enhance.cjs',
  lint: './qbank-lint.cjs',
  duplicates: './qbank-duplicates.cjs',
  coverage: './qbank-coverage.cjs',
  build: './qbank-build.cjs',
};

function showHelp() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    VoraPrep Question Bank                     ║
║                    World-Class CPA Content                    ║
╚══════════════════════════════════════════════════════════════╝

Usage: npx qbank <command> [section] [options]

Commands:
  validate [section]     Validate questions against JSON schema
  stats [section]        Show question statistics & coverage
  migrate [section]      Migrate TypeScript files to JSON format
  enhance [section]      AI-enhance with UWorld-style explanations
  lint [section]         Check for quality issues
  duplicates [section]   Find similar/duplicate questions
  coverage [section]     Blueprint coverage gap analysis
  build                  Generate optimized TypeScript from JSON

Sections: FAR, AUD, REG, BAR, ISC, TCP (or --all)

Options:
  --all            Process all sections
  --limit N        Limit processing to N questions
  --dry-run        Preview changes without writing
  --verbose        Show detailed output
  --help           Show this help message

Examples:
  npx qbank stats                    # Show all stats
  npx qbank validate FAR             # Validate FAR questions
  npx qbank migrate --all            # Migrate all sections
  npx qbank enhance FAR --limit 10   # Enhance 10 FAR questions
`);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }
  
  const command = args[0].toLowerCase();
  const scriptPath = COMMANDS[command];
  
  if (!scriptPath) {
    console.error(`❌ Unknown command: ${command}`);
    console.log('Run "npx qbank --help" for available commands');
    process.exit(1);
  }
  
  const fullPath = path.join(__dirname, scriptPath);
  const remainingArgs = args.slice(1).join(' ');
  
  try {
    execSync(`node "${fullPath}" ${remainingArgs}`, { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
  } catch (error) {
    process.exit(error.status || 1);
  }
}

main();
