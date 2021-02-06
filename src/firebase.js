import firebase from 'firebase';
import firebaseConfig from './config';

const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebaseapp.firestore();
const auth = firebaseapp.auth();
const storage = firebaseapp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };