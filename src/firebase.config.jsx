import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiRluv4qdEuCITlypXJbTyjFugLaNCXgc",
  authDomain: "multimart-50ea6.firebaseapp.com",
  projectId: "multimart-50ea6",
  storageBucket: "multimart-50ea6.appspot.com",
  messagingSenderId: "818753877098",
  appId: "1:818753877098:web:e00f67f612ccf0f5578613",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
