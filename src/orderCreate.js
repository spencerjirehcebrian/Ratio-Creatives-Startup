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

const colRefCart = collection(db, 'userCart') //collection reference
let details="";

const cookieEmail = document.cookie
.split('+ ')
.find(row => row.startsWith('userEmail='))
.split('=')[1];

const cookieName = document.cookie
.split('+ ')
.find(row => row.startsWith('userName='))
.split('=')[1];

const q = query(colRefCart, where("ucEmail", "==", cookieEmail))
onSnapshot(q, (snapshot) => {
    let col = []
    snapshot.docs.forEach((doc) => {
        details += doc.data().ucName + doc.data().ucQuantity+"\n";
    })
})


// adding docs
const addOrderForm = document.querySelector('.addOrder')
 addOrderForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let isCommissionBoolForm = document.getElementById('isOrderCommissionCheckbox').checked;


    console.log(details);

  addDoc(colRefOrder, {
    orderAddress: addOrderForm.orderAddress.value,
    orderDetails: details,
    orderDate: addOrderForm.orderDate.value,
    orderUsername: cookieName,
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
