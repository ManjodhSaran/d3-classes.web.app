import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "8727091325",
    authDomain: "d3-classes.firebaseapp.com",
    databaseURL: "https://d3-classes.firebaseio.com",
    projectId: "d3-classes",
    storageBucket: "d3-classes.appspot.com",
    messagingSenderId: "1001998099461",
    appId: "1:1001998099461:web:288b6b165051e936eee86c",
    measurementId: "G-Y26C3W7Z6T"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
