import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0nT_FejM8tVJ5lAzd_uz0Nw4jgAIBb88",
    authDomain: "fanta-beauty-fc716.firebaseapp.com",
    projectId: "fanta-beauty-fc716",
    storageBucket: "fanta-beauty-fc716.appspot.com",
    messagingSenderId: "1075869773533",
    appId: "1:1075869773533:web:fc11334bf291c7c4f1b534",
    measurementId: "G-NKY6X96JJG"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);