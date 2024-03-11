import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; //getDoc - setting documents data //setDoc - getting documents data //collection->document->data

const firebaseConfig = {
  apiKey: "AIzaSyDVz17Z6bXdzOEI_cKAqqCU4uvT2T_aNGY",
  authDomain: "crwn-clothing-db-ff39a.firebaseapp.com",
  projectId: "crwn-clothing-db-ff39a",
  storageBucket: "crwn-clothing-db-ff39a.appspot.com",
  messagingSenderId: "763140775800",
  appId: "1:763140775800:web:2dbddf1fa1fe924da1f28d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();//this is a class that's why new keyword

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();//u want only 1 authentication for ur web app for its lifetime so only initialized once.
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if user data does not exists
  //create / set the document with the data from userAuth in my collection

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //if user data exists
  //return userDecRef
  return userDocRef;
};