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

import { db } from "./firebaseConfig.js";

import Cookies from "./js.cookie.mjs";



const colRefFeedback = collection(db, 'userFeedback') //collection reference
const feedbackformRef = document.querySelector('.feedbackform');
const feedbackformSubRef = document.querySelector('.csubmitb');

feedbackformSubRef.addEventListener('click', (e) => {
  e.preventDefault()
  let cookieEmail = Cookies.get('userEmail')
  let cookieName = Cookies.get('userName')

  let currentDate = new Date();
  let cDay = currentDate.getDate()
  let cMonth = currentDate.getMonth() + 1
  let cYear = currentDate.getFullYear()
  let cDate = cDay + "/" + cMonth + "/" + cYear;
  var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

    if (cookieEmail != null) {
        addDoc(colRefFeedback, {
            feedDate: cDate,
            feedType: document.querySelector('.feedbackabout').value,
            feedDetails: document.querySelector('.feedbacktext').value,
            feedEmail: document.querySelector('.cemailbox').value,
            feedName: document.querySelector('.cnamebox').value,
            feedTime: time
        })
        .then(()=>{
        alert("Thank You For The Feedbacks");
        feedbackformRef.reset();
        })

    } else {
        alert("Error")
    }
});
