import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  type DocumentData,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function getFirebaseApp(): FirebaseApp {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApps()[0]!;
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  return getAuth(app);
}

export function getFirestoreDB() {
  const app = getFirebaseApp();
  return getFirestore(app);
}

export async function signInWithGoogle() {
  const auth = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}

export async function signOutFirebase() {
  const auth = getFirebaseAuth();
  await signOut(auth);
}

export function observeAuth(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, callback);
}

// Firestore data operations
export async function saveUserData(userId: string, data: DocumentData) {
  const db = getFirestoreDB();
  const userDoc = doc(db, "users", userId);
  await setDoc(userDoc, { data, updatedAt: new Date() });
}

export async function loadUserData(userId: string): Promise<DocumentData | null> {
  const db = getFirestoreDB();
  const userDoc = doc(db, "users", userId);
  const docSnap = await getDoc(userDoc);
  
  if (docSnap.exists()) {
    return docSnap.data().data;
  }
  return null;
}

export function observeUserData(userId: string, callback: (data: DocumentData | null) => void) {
  const db = getFirestoreDB();
  const userDoc = doc(db, "users", userId);
  return onSnapshot(userDoc, (doc) => {
    if (doc.exists()) {
      callback(doc.data().data);
    } else {
      callback(null);
    }
  });
}
