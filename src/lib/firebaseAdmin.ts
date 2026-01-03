
import * as admin from 'firebase-admin';

let db: admin.firestore.Firestore;
let auth: admin.auth.Auth;

if (!admin.apps.length) {
  try {
    // When deployed to App Hosting, initializeApp() automatically uses the 
    // project's service account credentials.
    admin.initializeApp();
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

db = admin.firestore();
auth = admin.auth();

export { db, auth, admin };
