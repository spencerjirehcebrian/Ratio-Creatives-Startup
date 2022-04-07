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
			window.open("./homepage.html", self);
    })
    .catch(err => {
      console.log(err.message)
    })
})
