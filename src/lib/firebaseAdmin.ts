
import * as admin from 'firebase-admin';

// This is a placeholder for the service account key.
// In a real application, this should be loaded securely, e.g., from an environment variable.
const serviceAccount = process.env.FIREBASE_ADMIN_SDK_CONFIG 
  ? JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG)
  : null;

if (serviceAccount && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error("Firebase admin initialization error:", error);
  }
} else if (!admin.apps.length) {
    console.warn("Firebase Admin SDK not initialized. Service account key is missing or invalid. Firestore submissions will be skipped.");
}

const db = admin.apps.length ? admin.firestore() : null;
const auth = admin.apps.length ? admin.auth() : null;

export { db, auth, admin };
