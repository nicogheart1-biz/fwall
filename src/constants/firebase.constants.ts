export const FirebaseConstants = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  dbURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SERVER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,

  // TODO inject at build-time via secrets
  appCheckProjectId: process.env.NEXT_PUBLIC_APP_CHECK_PROJECT_ID,
  appCheckPublicKey: process.env.NEXT_PUBLIC_APP_CHECK_PUBLIC_KEY,
  appCheckApiKey: process.env.NEXT_PUBLIC_APP_CHECK_API_KEY,
};

export const FirebaseErrors = {
  USER_EXIST: "auth/email-already-in-use",
};
