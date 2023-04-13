import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import "firebase/compat/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCTHZ8iXzzOPkiIFe6aKIYqMHDSr16Vtfo",
    authDomain: "snapchat-clone-zach.firebaseapp.com",
    projectId: "snapchat-clone-zach",
    storageBucket: "snapchat-clone-zach.appspot.com",
    messagingSenderId: "147461178146",
    appId: "1:147461178146:web:6d0a98d62576dbb4ebdb7b"
};


const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);
const provider = new firebase.auth.GoogleAuthProvider();

export {db,auth,storage,provider};
export default firebaseApp;
