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

feedbackformRef.addEventListener('submit', (e) => {
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
            feedDetails: feedbackformRef.feedbackInput.value,
            feedEmail: feedbackformRef.emailInput.value,
            feedName: feedbackformRef.nameInput.value,
            feedTime: time
        })
        .then(()=>{
        alert("Feedback Sent Added");
        })

    } else {
        alert("Please Login First")
    }
});
