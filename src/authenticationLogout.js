import { getAuth,
createUserWithEmailAndPassword,
signOut,
signInWithEmailAndPassword,
onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { auth } from "./firebaseConfig.js";

onAuthStateChanged(auth, user=> {
	if (user != null){
		console.log('logged in')
	} else {
		console.log('No user')
	}
});
//logout
const logoutButton = document.querySelector('.userLogout')

logoutButton.addEventListener('click',()=>{
	signOut(auth)
		.then(()=>{
			console.log('user signed out')
		})
		.catch((err)=>{
			console.log(err.message)
		})
})
