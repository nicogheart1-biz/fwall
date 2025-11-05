import { isServer } from "@/src/utils/common.utils";
import admin from "firebase-admin";

type FirebaseAdminAppParamsI = {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
  databaseURL: string;
};

const formatPrivateKey = (key: FirebaseAdminAppParamsI["privateKey"]) =>
  key.replace(/\\n/g, "\n");

const createFirebaseAdminApp = (props: FirebaseAdminAppParamsI) => {
  const { projectId, clientEmail, storageBucket, databaseURL } = props;
  const privateKey = formatPrivateKey(props.privateKey);

  if (admin?.apps?.length) return admin.app();

  const cert = admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId,
    storageBucket,
    databaseURL,
  });
};

export async function initAdmin() {
  try {
    if (isServer) {
      return createFirebaseAdminApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
        storageBucket: process.env
          .NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
        privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL as string,
      });
    }
  } catch (error) {
    console.error("FirebaseAdmin init error", error);
  }
}
