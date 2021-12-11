import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDqw6T5vk0ETgTkj9KnKzhQuQrZCnJBonE",
  authDomain: "clone-e2e84.firebaseapp.com",
  projectId: "clone-e2e84",
  storageBucket: "clone-e2e84.appspot.com",
  messagingSenderId: "388494241700",
  appId: "1:388494241700:web:3c001687449203eecedb31",
  measurementId: "G-ETNVMC8DQR"
};

  const firebaseApp =  firebase.initializeApp(firebaseConfig);
//firebase realtime database

const db = firebaseApp.firestore();


const auth = firebase.auth();






  export  {db,auth};