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

const colRefDelivery = collection(db, 'deliveryMerchandise') //collection reference

//realtime sub
onSnapshot(colRefDelivery, (snapshot)=>{
  let delivery = []
  snapshot.docs.forEach((doc) => {
    delivery.push({ ...doc.data(), id: doc.id })
  })
  console.log(delivery)
})

// adding docs
const addDeliveryForm = document.querySelector('.addDelivery')
 addDeliveryForm.addEventListener('submit', (e) => {
  e.preventDefault()


  let isCommissionBoolForm = document.getElementById('isDeliveryCommissionCheckbox').checked;


  addDoc(colRefDelivery, {
    dmAddress: addDeliveryForm.dmAddress.value,
    dmDueDate: addDeliveryForm.dmDueDate.value,
    dmName: addDeliveryForm.dmName.value,
    dmOrderDetails: addDeliveryForm.dmOrderDetails.value,
    dmPayment: addDeliveryForm.dmPayment.value,
    dmPaymentMethod: addDeliveryForm.dmPaymentMethod.value,
    dmStartDate: addDeliveryForm.dmStartDate.value,
    dmStatus: addDeliveryForm.dmStatus.value,
    dmTrackingNumber: addDeliveryForm.dmTrackingNumber.value,
    isDmCommission: isCommissionBoolForm
  })
  .then(() => {
    addDeliveryForm.reset()
  })
})
