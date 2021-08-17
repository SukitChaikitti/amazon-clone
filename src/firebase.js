import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCJ9Eq8wYe4cpGextlh81elNXVcf06yIQw",
    authDomain: "clone-134c2.firebaseapp.com",
    projectId: "clone-134c2",
    storageBucket: "clone-134c2.appspot.com",
    messagingSenderId: "813887326178",
    appId: "1:813887326178:web:a16c3b0d539612b18d9bbb",
    measurementId: "G-NS6V76DD18"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db , auth };