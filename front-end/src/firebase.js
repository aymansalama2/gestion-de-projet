// Importer les fonctions nécessaires du SDK Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Importer l'authentification Firebase
import { getAnalytics } from "firebase/analytics";

// Configuration de votre application Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD4JFFXD3XD1Yi89hB2bWDt9A3kHkc5oAc",
  authDomain: "emsi-test-ff5d3.firebaseapp.com",
  databaseURL: "https://emsi-test-ff5d3-default-rtdb.firebaseio.com",
  projectId: "emsi-test-ff5d3",
  storageBucket: "emsi-test-ff5d3.firebasestorage.app",
  messagingSenderId: "171742778297",
  appId: "1:171742778297:web:1825ccd78ba757efc15c68",
  measurementId: "G-70YM89DPS4"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser l'authentification
const auth = getAuth(app);

// Initialiser les analytics (facultatif)
const analytics = getAnalytics(app);

// Exporter l'authentification pour l'utiliser ailleurs dans l'application
export { auth };
