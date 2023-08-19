// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth ,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getFirestore , doc, setDoc, getDoc,collection, addDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, query, orderBy} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  import { getStorage ,ref, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyD3zP9IZUkG0QH9X6nXh_a14Lo8PQeKMa8",
    authDomain: "hackathon-smit-516f3.firebaseapp.com",
    projectId: "hackathon-smit-516f3",
    storageBucket: "hackathon-smit-516f3.appspot.com",
    messagingSenderId: "698112462816",
    appId: "1:698112462816:web:d3dee52175f02afd5e6585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage();
export{
    app ,
    auth,
    createUserWithEmailAndPassword,
    db ,
    doc , 
    setDoc,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    getDoc,
    deleteDoc,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    serverTimestamp,
    query,
    orderBy,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL
}


