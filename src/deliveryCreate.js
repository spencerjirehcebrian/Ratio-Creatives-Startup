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

import { trueOrFalse } from "./functions.js";
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
  let isCommissionBoolForm = trueOrFalse(addDeliveryForm.isDmCommission.value)
  addDoc(colRefDelivery, {
    dmAddress: addDeliveryForm.dmAddress.create,
    dmDueDate: addDeliveryForm.dmDueDate.create,
    dmName: addDeliveryForm.dmName.create,
    dmOrderDetails: addDeliveryForm.dmOrderDetails.create,
    dmPayment: addDeliveryForm.dmPayment.create,
    dmPaymentMethod: addDeliveryForm.dmPaymentMethod.create,
    dmStartDate: addDeliveryForm.dmStartDate.create,
    dmStatus: addDeliveryForm.dmStatus.create,
    dmTrackingNumber: addDeliveryForm.dmTrackingNumber.create,
    isDmCommission: isCommissionBoolForm
  })
  .then(() => {
    addDeliveryForm.reset()
  })
})
