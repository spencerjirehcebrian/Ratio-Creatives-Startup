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

const q = query(colRefDelivery , where("isDmCommission", "==", true))
onSnapshot(q, (snapshot)=>{
  let delivery = []
  snapshot.docs.forEach((doc) => {
    renderDocument(doc);
  })
})

const deliveryCommissionList = document.querySelector('#deliveryCommissionList') ;
function renderDocument(doc){
    let tr = document.createElement('tr');
    let td_dmAddress = document.createElement('td');
    let td_dmDueDate = document.createElement('td');
    let td_dmName = document.createElement('td');
    let td_dmOrderDetails = document.createElement('td');
    let td_dmPaymentMethod = document.createElement('td');
    let td_dmPayment = document.createElement('td');
    let td_dmStartDate = document.createElement('td');
    let td_dmStatus = document.createElement('td');
    let td_dmTrackingNumber = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    td_dmAddress.textContent =  doc.data().dmAddress;
    td_dmDueDate.textContent =  doc.data().dmDueDate;
    td_dmName.textContent =  doc.data().dmName;
    td_dmOrderDetails.textContent =  doc.data().dmOrderDetails;
    td_dmPaymentMethod.textContent =  doc.data().dmPaymentMethod;
    td_dmPayment.textContent =  doc.data().dmPayment;
    td_dmStartDate.textContent =  doc.data().dmStartDate;
    td_dmStatus.textContent =  doc.data().dmStatus;
    td_dmTrackingNumber.textContent =  doc.data().dmTrackingNumber;

    tr.appendChild(td_dmAddress);
    tr.appendChild(td_dmDueDate);
    tr.appendChild(td_dmName);
    tr.appendChild(td_dmOrderDetails);
    tr.appendChild(td_dmPaymentMethod);
    tr.appendChild(td_dmPayment);
    tr.appendChild(td_dmStartDate);
    tr.appendChild(td_dmStatus);
    tr.appendChild(td_dmTrackingNumber);
     deliveryCommissionList.appendChild(tr);
};
