/**
 * Set isAdmin: true on admin user documents using Firestore REST API.
 * Uses the access token from Firebase CLI login.
 *
 * Usage:
 *   node scripts/set-admin-rest.cjs staging
 *   node scripts/set-admin-rest.cjs production
 *   node scripts/set-admin-rest.cjs development
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const https = require('https');

const ADMIN_EMAILS = [
  'admin@voraprep.com',
  'rob@sagecg.com',
  'rob@voraprep.com',
];

const PROJECT_MAP = {
  development: 'passcpa-dev',
  staging: 'voraprep-staging',
  production: 'voraprep-prod',
};

function getAccessToken() {
  const configPath = path.join(os.homedir(), '.config/configstore/firebase-tools.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return config.tokens.access_token;
}

function firestoreRequest(projectId, method, urlPath, body, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'firestore.googleapis.com',
      path: `/v1/projects/${projectId}/databases/(default)/documents${urlPath}`,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runQuery(projectId, collectionId, email, token) {
  const body = {
    structuredQuery: {
      from: [{ collectionId }],
      where: {
        fieldFilter: {
          field: { fieldPath: 'email' },
          op: 'EQUAL',
          value: { stringValue: email },
        },
      },
      limit: 1,
    },
  };

  const result = await firestoreRequest(projectId, 'POST', ':runQuery', body, token);
  if (result && result[0] && result[0].document) {
    return result[0].document;
  }
  return null;
}

async function patchDocument(projectId, docPath, token) {
  const urlPath = docPath.replace(`projects/${projectId}/databases/(default)/documents`, '');
  const body = {
    fields: {
      isAdmin: { booleanValue: true },
    },
  };

  await firestoreRequest(
    projectId,
    'PATCH',
    `${urlPath}?updateMask.fieldPaths=isAdmin`,
    body,
    token
  );
}

async function main() {
  const env = process.argv[2] || 'staging';
  const projectId = PROJECT_MAP[env] || env;

  console.log(`Setting isAdmin on project: ${projectId}\n`);

  const token = getAccessToken();

  for (const email of ADMIN_EMAILS) {
    process.stdout.write(`Looking up ${email}... `);

    try {
      const doc = await runQuery(projectId, 'users', email, token);

      if (!doc) {
        console.log('⚠ No user document found');
        continue;
      }

      const docName = doc.name;
      const isAdmin = doc.fields?.isAdmin?.booleanValue;

      if (isAdmin === true) {
        console.log(`✓ Already isAdmin (${docName.split('/').pop()})`);
        continue;
      }

      await patchDocument(projectId, docName.replace(`projects/${projectId}/databases/(default)/documents`, ''), token);
      console.log(`✓ Set isAdmin: true (${docName.split('/').pop()})`);
    } catch (err) {
      console.log(`✗ Error: ${err.message.substring(0, 100)}`);
    }
  }

  console.log('\nDone.');
}

main();
