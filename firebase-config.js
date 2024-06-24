// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZ-CJ1iSiaZuQkxYS4BwjJeo3sMACofTY",
  authDomain: "examenveronicacal.firebaseapp.com",
  projectId: "examenveronicacal",
  storageBucket: "examenveronicacal.appspot.com",
  messagingSenderId: "294412716603",
  appId: "1:294412716603:web:62e646711b2604e7e16a1e"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
