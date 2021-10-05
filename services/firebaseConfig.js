import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBr47g9RPUOupRVIpc79IlTMeGReiulHuI',
  authDomain: 'learning-courses-bd97d.firebaseapp.com',
  projectId: 'learning-courses-bd97d',
  storageBucket: 'learning-courses-bd97d.appspot.com',
  messagingSenderId: '564036352571',
  appId: '1:564036352571:web:e23b88431b20d6d05c7a1e',
  measurementId: 'G-9RQBY484QX',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const { auth } = firebase;
export const firestore = firebase.firestore();
export const db = firebase.firestore();
export const storage = firebase.storage();
