import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({});

export default admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});
