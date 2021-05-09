import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig ={
    apiKey: "AIzaSyAsNtrMITv0SJKJXTiVRK1TnFK3qM_1nMs",
    authDomain: "photogallery-f12ca.firebaseapp.com",
    projectId: "photogallery-f12ca",
    storageBucket: "photogallery-f12ca.appspot.com",
    messagingSenderId: "235714333876",
    appId: "1:235714333876:web:41e0d3712d803110eddbe1"
};

const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage };

export const auth = firebase.auth()
export default app
