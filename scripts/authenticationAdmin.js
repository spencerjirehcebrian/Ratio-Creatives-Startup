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
	if ((user != null)){
		const emailRef = user.email;
		const q = query(colRefUser, where("userEmail", "==", emailRef));
			onSnapshot(q, (snapshot) => {
		    snapshot.docs.forEach((doc) => {
					let nameRef = doc.data().userName;
					let addressRef = doc.data().userAddress;
					let contactRef = doc.data().userContact;
					let typeRef = doc.data().userType;
					//document.cookie = "+ userEmail="+emailRef+"+ userName="+nameRef;
					if(typeRef != "admin")
					{
						signOut(auth)
							.then(()=>{

							})
							.catch((err)=>{
								console.log(err.message)
							})
					}
					else{
						Cookies.set('userEmail', user.email);
						Cookies.set('userName', nameRef)
						Cookies.set('userAddress', addressRef)
						Cookies.set('userContact', contactRef)
						Cookies.set('userType', typeRef)
					}
				})
			})



	} else {
		//console.log('No user');
    window.open("../customerView/login.html", "_self");
	}
});
