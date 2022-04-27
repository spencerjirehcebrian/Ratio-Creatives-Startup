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
import Cookies from '../node_modules/js-cookie/dist/js.cookie.mjs'

const colRefUser = collection(db, 'userProfile') //collection reference

onAuthStateChanged(auth, user=> {
	if (user != null){
		const emailRef = user.email;
		const q = query(colRefUser, where("userEmail", "==", emailRef));

			onSnapshot(q, (snapshot) => {
		    snapshot.docs.forEach((doc) => {
					let nameRef = doc.data().userName;
					//document.cookie = "+ userEmail="+emailRef+"+ userName="+nameRef;
					Cookies.set('userEmail', 'emailRef');
					Cookies.set('userName', 'nameRef')
				})
			})

		//console.log(document.cookie);
		/*const cookieEmail = document.cookie
  	.split('+ ')
  	.find(row => row.startsWith('userEmail='))
  	.split('=')[1];

		const cookieName = document.cookie
		.split('+ ')
		.find(row => row.startsWith('userName='))
		.split('=')[1];

		//window.close("../customerView/login.html", "_blank");*/
		console.log('Logged in: ' + Cookies.get('userEmail') +" "+ Cookies.get('userName'));
	} else {
		//console.log('No user');
    window.open("../customerView/login.html", "_self");
	}
});
