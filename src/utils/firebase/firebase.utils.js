import { initializeApp } from 'firebase/app';
import {
  getAuth,
  //signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'; //getDoc - setting documents data //setDoc - getting documents data //collection->document->data

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

const googleProvider = new GoogleAuthProvider();//this is a class that's why new keyword

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();//u want only 1 authentication for ur web app for its lifetime so only initialized once.//instances
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
//export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async  (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
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
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //if user data exists
  //return userDecRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);//checking whether auth's state has changed or not. Sign In is 1 callback, Sign out is another callback.

/**
* {
* next: callback,
* error: errorcallback,
* complete: completedcallback
* }
*/