import firebase from "firebase";

var config = {
    apiKey: "AIzaSyBXqWVdM1bS4mb9O-M_ht69CRcP0IUsD-Q",
    authDomain: "jamesmacdonaldproject5.firebaseapp.com",
    databaseURL: "https://jamesmacdonaldproject5.firebaseio.com",
    projectId: "jamesmacdonaldproject5",
    storageBucket: "jamesmacdonaldproject5.appspot.com",
    messagingSenderId: "809523473986"
};
firebase.initializeApp(config);

export default firebase;