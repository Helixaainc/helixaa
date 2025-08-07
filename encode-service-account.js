// encode-service-account.js
const fs = require('fs');
const path = require('path');

try {
  // Read service account file
  const serviceAccountPath = path.join(__dirname, 'lib/serviceAccountKey.json');
  const serviceAccountJson = fs.readFileSync(serviceAccountPath, 'utf8');
  
  // Convert to Base64
  const base64String = Buffer.from(serviceAccountJson).toString('base64');
  
  // Output result with instructions
  console.log('============================================');
  console.log('COPY THIS TO YOUR .env.local FILE:');
  console.log('============================================');
  console.log(`FIREBASE_SERVICE_ACCOUNT_BASE64=${base64String}`);
  console.log('============================================');
  console.log('NOTE: Add this to your .env.local file');
  console.log('      Make sure to restart your development server');
} catch (error) {
  console.error('Error:', error.message);
  console.log('Make sure serviceAccountKey.json exists in your project root');
}