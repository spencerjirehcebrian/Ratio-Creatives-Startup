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

import Cookies from "./js.cookie.mjs";
Cookies.remove('userType');

const colRefUser = collection(db, 'userProfile') //collection reference

onAuthStateChanged(auth, user=> {
	if (user != null){
		const emailRef = user.email;
		const q = query(colRefUser, where("userEmail", "==", emailRef));

			onSnapshot(q, (snapshot) => {
		    snapshot.docs.forEach((doc) => {
					let nameRef = doc.data().userName;
					let addressRef = doc.data().userAddress;
					let contactRef = doc.data().userContact;
					let typeRef = doc.data().userType;
					//document.cookie = "+ userEmail="+emailRef+"+ userName="+nameRef;
					Cookies.set('userEmail', user.email);
					Cookies.set('userName', nameRef)
					Cookies.set('userAddress', addressRef)
					Cookies.set('userContact', contactRef)
					Cookies.set('userType', typeRef)
          console.log(user.email + "/" + typeRef);
				})
			})
    }

});


//login
const loginForm = document.querySelector('.userLogin')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm.userEmail.value
	const password = loginForm.userPassword.value
  let cookieType;
	const q = query(colRefUser, where("userEmail", "==", email))
	onSnapshot(q, (snapshot) => {
	    snapshot.docs.forEach((doc) => {
	        let typeRef = doc.data().userType;
					Cookies.set('userType', typeRef);
          cookieType = Cookies.get('userType');
          console.log(cookieType);
	    })
	})

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
        cookieType = Cookies.get('userType');
				if(cookieType == "customer"){
        alert("Customer Logged In")
			  window.open("../customerView/homepage.html", "_self");
				} else if (cookieType == "admin")
				{
        alert("Admin Logged In")
				window.open("../adminView/index.html", "_self");
				}
    })
    .catch(err => {
      alert(err.message);
    })
})
