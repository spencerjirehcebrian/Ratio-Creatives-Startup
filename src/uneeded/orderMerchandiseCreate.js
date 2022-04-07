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

const colRefCart = collection(db, 'OrderCommissions') //collection reference

//realtime sub
onSnapshot(colRefCart, (snapshot)=>{
  let cart = []
  snapshot.docs.forEach((doc) => {
    cart.push({ ...doc.data(), id: doc.id })
  })
  console.log(cart)
})

// adding docs
const addOrderCommissionsForm = document.querySelector('.addOrderCommissions')
 addOrderCommissionsForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRefCart, {
    ocAddress: addOrderCommissionsForm.ocAddress.value,
    ocDetails: addOrderCommissionsForm.ocDetails.value,
    ocOrderDate: addOrderCommissionsForm.ocOrderDate.value,
    ocUsername: addOrderCommissionsForm.ocUsername.value,
    ocTrackingNumber: addOrderCommissionsForm.ocTrackingNumber.value,
    ocType:addOrderCommissionsForm.ocType.value
  })
  .then(() => {
    addOrderCommissionsForm.reset()
  })
})
