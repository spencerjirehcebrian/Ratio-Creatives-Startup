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
const q = query(colRefOrder, where("isCommission", "==", false))
onSnapshot(q, (snapshot)=>{
  let books = []
  snapshot.docs.forEach((doc) => {
    renderAccount(doc);
  })
})


const orderCommissionList = document.querySelector('#orderMerchandiseList') ;
function renderAccount(doc){
    let tr = document.createElement('tr');
    let td_orderAddress = document.createElement('td');
    let td_orderDate = document.createElement('td');
    let td_orderDetails = document.createElement('td');
    let td_orderPayment = document.createElement('td');
    let td_orderPaymentMethod = document.createElement('td');
    let td_orderTrackingNumber = document.createElement('td');
    let td_orderType = document.createElement('td');
    let td_orderUsername = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    td_orderAddress.textContent =  doc.data().orderAddress;
    td_orderDate.textContent  =  doc.data().orderDate;
    td_orderDetails.textContent =  doc.data().orderDetails;
    td_orderPayment.textContent =  doc.data().orderPayment;
    td_orderPaymentMethod.textContent =  doc.data().orderPaymentMethod;
    td_orderTrackingNumber.textContent =  doc.data().orderTrackingNumber;
    td_orderType.textContent =  doc.data().orderType;
    td_orderUsername.textContent =  doc.data().orderUsername;

    tr.appendChild(td_orderAddress);
    tr.appendChild(td_orderAddress);
    tr.appendChild(td_orderDate);
    tr.appendChild(td_orderDetails);
    tr.appendChild(td_orderPayment);
    tr.appendChild(td_orderPaymentMethod);
    tr.appendChild(td_orderTrackingNumber);
    tr.appendChild(td_orderType);
    tr.appendChild(td_orderUsername);
     orderCommissionList.appendChild(tr);
};
