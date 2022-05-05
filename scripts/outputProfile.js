import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
    orderBy,
    getDoc,
    updateDoc,
    limit,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth,
createUserWithEmailAndPassword,
signOut,
signInWithEmailAndPassword,
onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

import { auth } from "./firebaseConfig.js";

import {
    db,
    storage
} from "./firebaseConfig.js";

import Cookies from "./js.cookie.mjs";
let cookieEmail = Cookies.get('userEmail')
let cookieType = Cookies.get('userType')


if (cookieType == "admin"){
  window.open("../adminView/index.html", "_self")
}

const colRefUser = collection(db, 'userProfile') //collection reference
console.log(cookieEmail);
const q = query(colRefUser, where("userEmail", "==", cookieEmail))
onSnapshot(q, (snapshot) => {
    snapshot.docs.forEach((doc) => {
        console.log(doc.data().userName);
        document.getElementById('userNameOutput').innerHTML = doc.data().userName;
        document.getElementById('userEmailOutput').innerHTML = doc.data().userEmail;
        document.getElementById('userContactOutput').innerHTML = doc.data().userContact;
        document.getElementById('userAddressOutput').innerHTML  = doc.data().userAddress;
    })
})

const deleteaccRef = document.querySelector(".deleteacc");

deleteaccRef.addEventListener('click',()=>{
	signOut(auth)
		.then(()=>{
			console.log('Logged Out')
      Cookies.remove('userEmail')
      Cookies.remove('userType')
		})
		.catch((err)=>{
			console.log(err.message)
		})
})
