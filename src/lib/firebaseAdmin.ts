
import * as admin from 'firebase-admin';

// Load your service account key securely.
// In a production environment, it's highly recommended to use environment variables
// to store the service account key JSON as a string, rather than referencing a file directly.
// Example: const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG!);
let serviceAccount;
try {
  serviceAccount = require('../../pichulik-studios-firebase-adminsdk.json');
} catch (error) {
    console.error("Service account key not found. Please ensure 'pichulik-studios-firebase-adminsdk.json' is in the root directory.");
    // In a production environment, you would want to handle this more gracefully.
    // For local development, this helps identify the missing file.
    if (process.env.NODE_ENV !== 'production') {
      console.log("Please download the service account key from your Firebase project settings and place it in the root directory.");
    }
}


if (serviceAccount && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error("Firebase admin initialization error:", error);
  }
}

const db = admin.apps.length ? admin.firestore() : null;
const auth = admin.apps.length ? admin.auth() : null;

export { db, auth, admin };
