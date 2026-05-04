// Firebase Configuration - RM. Pondok Marisa
const firebaseConfig = {
    apiKey: "AIzaSyCPc7vU7_s-DE1jJVbqQ3uAzNbcLHwvs5I",
    authDomain: "menu-rm-pondok-marisa.firebaseapp.com",
    projectId: "menu-rm-pondok-marisa",
    storageBucket: "menu-rm-pondok-marisa.firebasestorage.app",
    messagingSenderId: "251373330445",
    appId: "1:251373330445:web:caf7dd7a9e5b5cb134b544",
    measurementId: "G-CVNWYNE9RW",
    databaseURL: "https://menu-rm-pondok-marisa-default-rtdb.firebaseio.com"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();
const storage = firebase.storage().ref();
