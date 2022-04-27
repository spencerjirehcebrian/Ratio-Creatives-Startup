import { getAuth,
createUserWithEmailAndPassword,
signOut,
signInWithEmailAndPassword,
onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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
serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import { auth, db, storage  } from "./firebaseConfig.js";

const colRefUser = collection(db, 'userProfile') //collection reference

onAuthStateChanged(auth, user=> {
	if (user != null){
		alert("Already Logged In");
		window.open("../customerView/homepage.html", "_self");
	}
});

//login
const loginForm = document.querySelector('.userLogin')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm.userEmail.value
	const password = loginForm.userPassword.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      //loginForm.reset()
      window.open("../customerView/homepage.html", "_self");
    })
    .catch(err => {
      console.log(err.message)
    })
})
