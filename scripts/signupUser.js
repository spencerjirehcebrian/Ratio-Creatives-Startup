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

import { db, storage } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js";

const colRefUser = collection(db, 'userProfile') //collection reference

onAuthStateChanged(auth, user=> {
	if (user != null){
		const emailRef = user.email;
		document.cookie = "userEmail="+emailRef;

		const cookieEmail = document.cookie
  	.split('; ')
  	.find(row => row.startsWith('userEmail='))
  	.split('=')[1];

		console.log('Logged in: ' + cookieEmail);
	} else {
		console.log('No user')
	}
});

const signupForm = document.querySelector('.userRegister')

signupForm.addEventListener('submit', (e)=>{
	e.preventDefault()

	const email = signupForm.userEmail.value
	const password = signupForm.userPassword1.value
	createUserWithEmailAndPassword(auth, email, password)
		.then((cred)=>{
			console.log('User Created:', cred.user);
			addDoc(colRefUser, {
				userName: signupForm.userName.value,
				userType: "customer",
				userEmail: email,
				userAddress: signupForm.userAddress.value,
				userContact: signupForm.userContact.value
				})
			.then(()=>{
				signupForm.reset()
				})
      alert('Account Created');
      window.open("../customerView/login.html", "_self");
		})
		.catch((err)=>{
			console.log(err.message);
      alert(err.message);
		})


})
