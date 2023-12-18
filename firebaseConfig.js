import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyA6Cvw3VQ2BgfRMudKb7kLg8SKwPfoR2TU",
    authDomain: "next-lms-b93fb.firebaseapp.com",
    projectId: "next-lms-b93fb",
    storageBucket: "next-lms-b93fb.appspot.com",
    messagingSenderId: "388376558187",
    appId: "1:388376558187:web:43273c2d16444d8eb68f2e",
    measurementId: "G-KPGV45BQHV"
}

const app = initializeApp(config);

export const projectFirestore = getFirestore(app);