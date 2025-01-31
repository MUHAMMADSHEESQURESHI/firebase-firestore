import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAiWzHT8n_qz8bJiwuSocPVAmeoyMxBHno",
    authDomain: "todo-app-with-firestore-3b1fe.firebaseapp.com",
    projectId: "todo-app-with-firestore-3b1fe",
    storageBucket: "todo-app-with-firestore-3b1fe.firebasestorage.app",
    messagingSenderId: "467995934727",
    appId: "1:467995934727:web:53cc9918b1d4d6692baaa2",
    measurementId: "G-Y2Y8MLX9CJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);