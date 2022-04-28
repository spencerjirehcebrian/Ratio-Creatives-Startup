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

const q = query(colRefOrder, where("isCommission", "==", true))
onSnapshot(q, (snapshot)=>{
  let books = []
  snapshot.docs.forEach((doc) => {
    renderCommission(doc);
  })
})

const orderCommissionList = document.querySelector('.orderCommissionList') ;
function renderCommission(doc){
    let div = document.createElement('div');
    let td_orderDate = document.createElement('h6');
    let td_orderTrackingNumber = document.createElement('h3');

    div.setAttribute('data-id', doc.id);
    div.setAttribute("class", "o-content");
    td_orderDate.textContent  =  doc.data().orderDate;
    td_orderTrackingNumber.textContent =  "# " +doc.data().orderTrackingNumber;

    div.appendChild(td_orderDate);
    div.appendChild(td_orderTrackingNumber);
     orderCommissionList.appendChild(div);
};

const q2 = query(colRefOrder, where("isCommission", "==", false))
onSnapshot(q2, (snapshot)=>{
  let books = []
  snapshot.docs.forEach((doc) => {
    renderMerchandise(doc);
  })
})


const orderMerchandiseList = document.querySelector('.orderMerchandiseList') ;
function renderMerchandise(doc){
    let div = document.createElement('div');
    let td_orderDate = document.createElement('h6');
    let td_orderTrackingNumber = document.createElement('h3');

    div.setAttribute('data-id', doc.id);
    div.setAttribute("class", "o-content");
    td_orderDate.textContent  =  doc.data().orderDate;
    td_orderTrackingNumber.textContent =  "# " +doc.data().orderTrackingNumber;

    div.appendChild(td_orderDate);
    div.appendChild(td_orderTrackingNumber);
    orderMerchandiseList.appendChild(div);
};
