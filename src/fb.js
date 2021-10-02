import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/storage";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT
  };

firebase.initializeApp(firebaseConfig);


export const Providers = {
    github: new firebase.auth.GithubAuthProvider()
}

export const authService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = firebase.storage();

export default firebase;