// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2L8lggnMbn_1CJlN4jJAyIwgH1yYbrp8",
  authDomain: "freetimeactivities-7fa1e.firebaseapp.com",
  projectId: "freetimeactivities-7fa1e",
  storageBucket: "freetimeactivities-7fa1e.firebasestorage.app",
  messagingSenderId: "694476809263",
  appId: "1:694476809263:web:117ca2079febf1344ed2da",
  measurementId: "G-KRS1V40RNT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});

export default firebaseApp;

// Initialize Firestore
export const db = getFirestore(app);
