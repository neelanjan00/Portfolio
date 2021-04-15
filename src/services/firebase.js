import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"
import "firebase/auth"

const firebaseApp = firebase.initializeApp({
    /*Replace with your own Firebase Project details*/
})

const db = firebaseApp.firestore()
const storage = firebaseApp.storage()
const auth = firebaseApp.auth()

export { db, storage, auth }
