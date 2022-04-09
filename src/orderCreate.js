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

//realtime sub
onSnapshot(colRefOrder, (snapshot)=>{
  let cart = []
  snapshot.docs.forEach((doc) => {
    cart.push({ ...doc.data(), id: doc.id })
  })
  console.log(cart)
})

// adding docs
const addOrderForm = document.querySelector('.addOrder')
 addOrderForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let isCommissionBoolForm = document.getElementById('isOrderCommissionCheckbox').checked;

  addDoc(colRefOrder, {
    orderAddress: addOrderForm.orderAddress.value,
    orderDetails: addOrderForm.orderDetails.value,
    orderDate: addOrderForm.orderDate.value,
    orderUsername: addOrderForm.orderUsername.value,
    orderTrackingNumber: addOrderForm.orderTrackingNumber.value,
    orderType: addOrderForm.orderType.value,
    orderPaymentMethod: addOrderForm.orderPaymentMethod.value,
    orderPayment: addOrderForm.orderPayment.value,
    isCommission:isCommissionBoolForm
  })
  .then(() => {
    addOrderForm.reset()
  })
})
