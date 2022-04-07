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

const colRefCart = collection(db, 'userCart') //collection reference

//realtime sub
onSnapshot(colRefCart, (snapshot)=>{
  let cart = []
  snapshot.docs.forEach((doc) => {
    cart.push({ ...doc.data(), id: doc.id })
  })
  console.log(cart)
})

// adding docs
const addCartForm = document.querySelector('.addCart')
 addCartForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRefCart, {
    ucCommissionType: addCartForm.ucCommissionType.value,
    ucDescription: addCartForm.ucDescription.value,
    ucEmail: addCartForm.ucEmail.value,
    ucName: addCartForm.ucName.value,
    ucQuantity: addCartForm.ucQuantity.value
  })
  .then(() => {
    addCartForm.reset()
  })
})
