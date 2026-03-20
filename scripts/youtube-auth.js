/**
 * YouTube OAuth Helper
 * 
 * Run this script to get a refresh token for the YouTube Data API.
 * 
 * Prerequisites:
 * 1. Create OAuth 2.0 credentials in Google Cloud Console
 * 2. Download the credentials JSON file
 * 3. Run: node youtube-auth.js /path/to/credentials.json
 */

const http = require('http');
const url = require('url');
const fs = require('fs');

const SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube',
];

const REDIRECT_PORT = 3333;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/callback`;

async function main() {
  const credentialsPath = process.argv[2];
  
  if (!credentialsPath) {
    console.error('Usage: node youtube-auth.js /path/to/credentials.json');
    console.error('');
    console.error('Steps to get credentials:');
    console.error('1. Go to https://console.cloud.google.com/apis/credentials');
    console.error('2. Create OAuth 2.0 Client ID (Desktop app type)');
    console.error('3. Download JSON and run this script with the path');
    process.exit(1);
  }
  
  if (!fs.existsSync(credentialsPath)) {
    console.error(`File not found: ${credentialsPath}`);
    process.exit(1);
  }
  
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
  const { client_id, client_secret } = credentials.installed || credentials.web || {};
  
  if (!client_id || !client_secret) {
    console.error('Invalid credentials file. Expected "installed" or "web" OAuth credentials.');
    process.exit(1);
  }
  
  console.log('');
  console.log('='.repeat(60));
  console.log('YouTube OAuth Setup');
  console.log('='.repeat(60));
  console.log('');
  console.log('Client ID:', client_id.substring(0, 30) + '...');
  console.log('');
  
  // Build authorization URL
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', client_id);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', SCOPES.join(' '));
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent'); // Force refresh token
  
  console.log('1. Open this URL in your browser:');
  console.log('');
  console.log(authUrl.toString());
  console.log('');
  console.log('2. Sign in with the Google account that owns your YouTube channel');
  console.log('3. Grant the requested permissions');
  console.log('4. You will be redirected back here');
  console.log('');
  console.log('Waiting for callback...');
  
  // Start local server to receive callback
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      const parsedUrl = url.parse(req.url, true);
      
      if (parsedUrl.pathname === '/callback') {
        const code = parsedUrl.query.code;
        const error = parsedUrl.query.error;
        
        if (error) {
          res.writeHead(400);
          res.end(`Error: ${error}`);
          console.error('Authorization failed:', error);
          server.close();
          resolve();
          return;
        }
        
        if (!code) {
          res.writeHead(400);
          res.end('No authorization code received');
          server.close();
          resolve();
          return;
        }
        
        // Exchange code for tokens
        try {
          const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              code,
              client_id,
              client_secret,
              redirect_uri: REDIRECT_URI,
              grant_type: 'authorization_code',
            }),
          });
          
          const tokenData = await tokenResponse.json();
          
          if (tokenData.error) {
            throw new Error(tokenData.error_description || tokenData.error);
          }
          
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <html>
              <body style="font-family: sans-serif; padding: 40px;">
                <h1>✅ Authorization Successful!</h1>
                <p>You can close this window and return to the terminal.</p>
              </body>
            </html>
          `);
          
          console.log('');
          console.log('='.repeat(60));
          console.log('SUCCESS! Copy these values to Firebase secrets:');
          console.log('='.repeat(60));
          console.log('');
          console.log('Run these commands:');
          console.log('');
          console.log(`firebase functions:secrets:set YOUTUBE_CLIENT_ID`);
          console.log(`  → Enter: ${client_id}`);
          console.log('');
          console.log(`firebase functions:secrets:set YOUTUBE_CLIENT_SECRET`);
          console.log(`  → Enter: ${client_secret}`);
          console.log('');
          console.log(`firebase functions:secrets:set YOUTUBE_REFRESH_TOKEN`);
          console.log(`  → Enter: ${tokenData.refresh_token}`);
          console.log('');
          console.log(`firebase functions:secrets:set YOUTUBE_CHANNEL_ID`);
          console.log(`  → Enter: YOUR_CHANNEL_ID (find in YouTube Studio > Settings > Channel > Advanced)`);
          console.log('');
          console.log('='.repeat(60));
          console.log('');
          console.log('Access Token (for testing, expires in 1 hour):');
          console.log(tokenData.access_token);
          console.log('');
          
        } catch (err) {
          res.writeHead(500);
          res.end(`Token exchange failed: ${err.message}`);
          console.error('Token exchange failed:', err);
        }
        
        server.close();
        resolve();
      }
    });
    
    server.listen(REDIRECT_PORT, () => {
      console.log(`Local server listening on port ${REDIRECT_PORT}`);
    });
  });
}

main().catch(console.error);
