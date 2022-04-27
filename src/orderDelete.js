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

const colRefOrder = collection(db, 'order') //collection reference

const deleteOrderForm = document.querySelector('.deleteOrder')
deleteOrderForm.addEventListener('submit', (e) => {
  e.preventDefault()
  //gets the doc as a reference
  const docRef = doc(db, 'order', deleteCartForm.id.value)
      console.log(docRef);
  deleteDoc(docRef)
    .then(() => {
      deleteOrderForm.reset()
    })
});
