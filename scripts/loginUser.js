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

const colRefUser = collection(db, 'userProfile') //collection reference

//FOR AUOTMATIC LOGIN
/*onAuthStateChanged(auth, user=> {
	if (user != null){
		alert("Logged In");
		let cookieType = Cookies.get('userType');
		if(cookieType == "customer"){
		window.open("../customerView/homepage.html", "_self");
		} else if (cookieType == "admin")
		{
		window.open("../adminView/index.html", "_self");
		}
		else {
		window.open("../customerView/homepage.html", "_self");
	}
	}
});*/

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
      //window.open("../customerView/homepage.html", "_self");

        cookieType = Cookies.get('userType');
				if(cookieType == "customer"){
				window.open("../customerView/homepage.html", "_self");
				} else if (cookieType == "admin")
				{
				window.open("../adminView/index.html", "_self");
				}
    })
    .catch(err => {
      alert(err.message);
    })
})
