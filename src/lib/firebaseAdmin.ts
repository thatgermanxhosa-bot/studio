
import * as admin from 'firebase-admin';

// Load your service account key securely.
// In a production environment, it's highly recommended to use environment variables
// to store the service account key JSON as a string, rather than referencing a file directly.
// Example: const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG!);
const serviceAccount = require('../../path/to/your/serviceAccountKey.json'); // **UPDATE THIS PATH**

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth, admin };
