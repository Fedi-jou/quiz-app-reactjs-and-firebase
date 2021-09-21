import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  // inscription
  signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Déconnexion
  signoutUser = () => this.auth.signOut();

  //Reset password
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);
  // user firestore
  user = (uid) => this.db.doc(`users/${uid}`);
}

export default Firebase;
