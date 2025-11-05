import { initializeApp } from "firebase/app";
import { FirebaseConstants } from "@/src/constants/firebase.constants";

const firebaseConfig = {
  apiKey: FirebaseConstants.apiKey,
  authDomain: FirebaseConstants.authDomain,
  projectId: FirebaseConstants.projectId,
  storageBucket: FirebaseConstants.storageBucket,
  dbURL: FirebaseConstants.dbURL,
  messagingSenderId: FirebaseConstants.messagingSenderId,
  appId: FirebaseConstants.appId,
  measurementId: FirebaseConstants.measurementId,
};

// Initialize Firebase
export const AppInstance = initializeApp(firebaseConfig);
