import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDTlGKeiqPJpMvMijIR5xSR1E-QnjIAEo8",
  authDomain: "class-platform-57dea.firebaseapp.com",
  databaseURL: "https://class-platform-57dea.firebaseio.com",
  projectId: "class-platform-57dea",
  storageBucket: "class-platform-57dea.appspot.com",
  messagingSenderId: "449317956477",
  appId: "1:449317956477:web:6e45879acffe5d7cfbba14",
  measurementId: "G-LL9FS4STKY"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const storage = firebase.storage();

export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  })
  const {user} = await auth.signInWithPopup(provider);
  return user;
}

export const signInWithFacebook = async  () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({});
  const { user } = await auth.signInWithPopup(provider);
  return user;
}

export const createNewUserIfNoMatch = async (user, additionalData) => {
  if(!user) return;
  const userRef = firestore.doc(`/users/${user.uid}`)
  const newUser = await userRef.get();

  if(!newUser.exists) {
    const {displayName, email} = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch(err) {
      console.log(err.message);
    }
  }

  return userRef;
}

