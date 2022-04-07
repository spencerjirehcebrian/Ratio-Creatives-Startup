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

const signupForm = document.querySelector('.userRegister')

signupForm.addEventListener('submit', (e)=>{
	e.preventDefault()

	const email = signupForm.userEmail.value
	const password = signupForm.userPassword.value
	createUserWithEmailAndPassword(auth, email, password)
		.then((cred)=>{
			console.log('User Created:', cred.user)
			signupForm.reset()
		})
		.catch((err)=>{
			console.log(err.message)
		})
})

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

//login
const loginForm = document.querySelector('.userLogin')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.userEmail.value
	const password = loginForm.userPassword.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})
