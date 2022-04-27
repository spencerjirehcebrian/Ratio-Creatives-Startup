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
    renderAccount(doc);
  })
})

const orderCommissionList = document.querySelector('#orderCommissionList') ;
function renderAccount(doc){
    let div = document.createElement('div');
    let td_orderDate = document.createElement('h6');
    let td_orderType = document.createElement('h3');

    div.setAttribute('data-id', doc.id);
    div.setAttribute("class", "o-content");
    td_orderDate.textContent  =  doc.data().orderDate;
    td_orderType.textContent =  doc.data().orderType;

    div.appendChild(td_orderDate);
    div.appendChild(td_orderType);
    orderCommissionList.appendChild(div);
};
