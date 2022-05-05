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
const colRefDelivery = collection(db, 'deliveryMerchandise') //collection reference
const colRefFeed = collection(db, 'userFeedback') //collection reference

let ctr = 0;
const q2 = query(colRefFeed)
onSnapshot(q2, (snapshot)=>{
  let books = []
  snapshot.docs.forEach((doc) => {
    ctr++;
    renderMerchandise(doc, ctr);
  })
})


const orderMerchandiseList = document.querySelector('.orderMerchandiseList') ;
function renderMerchandise(doc, x){
    let div = document.createElement('div');
    let td_orderDate = document.createElement('h6');
    let td_orderTrackingNumber = document.createElement('h3');

    div.setAttribute('data-id', doc.id);
    div.setAttribute("class", "o-content");
    td_orderDate.textContent  =  doc.data().feedDate;
    td_orderTrackingNumber.textContent =  "# " +x;

    let id = doc.id;
    div.appendChild(td_orderTrackingNumber);
    div.appendChild(td_orderDate);
    orderMerchandiseList.appendChild(div);
};
