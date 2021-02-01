import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBw6TzGplsOMCEU9r_z9P2OZqLlbcWT0-0",
  authDomain: "snapchat-f1b2e.firebaseapp.com",
  projectId: "snapchat-f1b2e",
  storageBucket: "snapchat-f1b2e.appspot.com",
  messagingSenderId: "807293513478",
  appId: "1:807293513478:web:43770798f39300212ef887"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebaseapp.firestore();
const auth = firebaseapp.auth();
const storage = firebaseapp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };