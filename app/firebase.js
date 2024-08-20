import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKIRhx2HjR4LDOIjWYwJ-pw_qnb4xBnTQ",
  authDomain: "quizzy-e52a1.firebaseapp.com",
  projectId: "quizzy-e52a1",
  storageBucket: "quizzy-e52a1.appspot.com",
  messagingSenderId: "132385830941",
  appId: "1:132385830941:web:b7b35714d01694c2cbeef4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth,db,storage }