import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS must be set");
}

const serviceAccount = require('../../../todoAppserviceaccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});
const db = admin.firestore();
export { db, admin };
