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
