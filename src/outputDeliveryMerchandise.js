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

const q = query(colRefDelivery , where("isDmCommission", "==", false))
onSnapshot(q, (snapshot)=>{
  let delivery = []
  snapshot.docs.forEach((doc) => {
    renderDocument(doc);
  })
})

const deliveryMerchandiseList = document.querySelector('#deliveryMerchandiseList') ;
function renderDocument(doc){
    let tr = document.createElement('tr');
    let td_dmCheck = document.createElement('td');
    let td_dmAddress = document.createElement('td');
    let td_dmDueDate = document.createElement('td');
    let td_dmName = document.createElement('td');
    let td_dmOrderDetails = document.createElement('td');
    let td_dmPaymentMethod = document.createElement('td');
    let td_dmPayment = document.createElement('td');
    let td_dmStartDate = document.createElement('td');
    let td_dmStatus = document.createElement('td');
    let td_dmTrackingNumber = document.createElement('td');

    //tr.setAttribute();
    let z = document.createElement('input'); // is a node
    z.setAttribute("type","checkbox");
    z.setAttribute("id","checkbox");
    z.setAttribute("value","check");
    td_dmCheck.appendChild(z);

    let status = document.createElement('div'); // is a node
    let statusRetrieved = doc.data().dmStatus;
    if(statusRetrieved == "Preparing"){
      status.setAttribute("class","status-preparing");
    } else if (statusRetrieved == "To ship") {
      status.setAttribute("class","status-ship");
    }else if (statusRetrieved == "Canceled") {
      status.setAttribute("class","status-canceled");
    }else if (statusRetrieved == "Delivered") {
      status.setAttribute("class","status-delivered");
    }else if (statusRetrieved == "Received") {
      status.setAttribute("class","status-recieved");
    } else {
      status.setAttribute("class","status-error");
    };

    td_dmStatus.appendChild(status);


    //td_dmCheck = ('<input type="checkbox" id="checkbox" value="check">');
    td_dmPayment.setAttribute('style', 'white-space: pre;');
    td_dmTrackingNumber.textContent =  "#" +doc.data().dmTrackingNumber;

    td_dmName.textContent =  doc.data().dmName;
    td_dmAddress.textContent =  doc.data().dmAddress;
    td_dmOrderDetails.textContent =  doc.data().dmOrderDetails;
    //td_dmPaymentMethod.textContent =  ;
    td_dmPayment.textContent =  doc.data().dmPaymentMethod + "\r\n";
    td_dmPayment.textContent += doc.data().dmPayment;
    td_dmStartDate.textContent =  doc.data().dmStartDate;
    td_dmDueDate.textContent =  doc.data().dmDueDate;

    tr.appendChild(td_dmCheck);
    tr.appendChild(td_dmTrackingNumber);
    tr.appendChild(td_dmStatus);
    tr.appendChild(td_dmName);
    tr.appendChild(td_dmAddress);
    tr.appendChild(td_dmOrderDetails);
    //tr.appendChild(td_dmPaymentMethod);
    tr.appendChild(td_dmPayment);
    tr.appendChild(td_dmStartDate);
    tr.appendChild(td_dmDueDate);
    deliveryMerchandiseList.appendChild(tr);
};
