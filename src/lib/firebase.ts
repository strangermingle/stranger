import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
let auth: Auth;

if (!firebaseConfig.apiKey) {
  console.warn("⚠️ Firebase environment variables are missing. This is expected during some build phases but will fail at runtime.");
  // Ensure we don't re-initialize the app
  app = getApps().length > 0 ? getApp() : initializeApp({
    ...firebaseConfig,
    apiKey: "AIzaSyDummyKeyForBuildProcess1234567890", // dummy key to bypass invalid-api-key error on getAuth
  });
  auth = getAuth(app);
} else {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { app, auth };
