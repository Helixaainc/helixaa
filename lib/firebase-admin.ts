import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (getApps().length === 0) {
  try {
    // Get Base64 string from environment
    const base64String = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || '';
    
    // Validate input
    if (!base64String) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is missing');
    }
    
    // Decode and parse
    const serviceAccountJson = Buffer.from(base64String, 'base64').toString('utf8');
    const serviceAccount = JSON.parse(serviceAccountJson);
    
    // Initialize Firebase
    initializeApp({
      credential: cert(serviceAccount),
      databaseURL: "https://paylater-8b38c.firebaseio.com"
    });
    
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase Admin initialization error", error);
    // Rethrow to prevent silent failures
    throw error;
  }
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();