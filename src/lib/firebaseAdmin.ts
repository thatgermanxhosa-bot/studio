
import * as admin from 'firebase-admin';

// This is a placeholder for the service account key.
// In a real application, this should be loaded securely, e.g., from an environment variable.
const serviceAccountString = process.env.FIREBASE_ADMIN_SDK_CONFIG;

let db: admin.firestore.Firestore | null = null;
let auth: admin.auth.Auth | null = null;

if (serviceAccountString && !admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    db = admin.firestore();
    auth = admin.auth();
  } catch (error) {
    console.error("Firebase admin initialization error:", error);
  }
} else if (admin.apps.length > 0 && admin.app()) {
    db = admin.firestore();
    auth = admin.auth();
} else {
    console.warn("Firebase Admin SDK not initialized. Service account key is missing, invalid, or initialization failed.");
}


export { db, auth, admin };
