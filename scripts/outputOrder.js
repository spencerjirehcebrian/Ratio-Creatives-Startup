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
    td_orderTrackingNumber.textContent =  "# " + doc.data().orderTrackingNumber;

    let id = doc.id;
    div.addEventListener('click', function() {
      if (confirm("Start Deliver Process?")) {
        let currentDate = new Date();
        let cDay = currentDate.getDate()
        let cMonth = currentDate.getMonth() + 1
        let cYear = currentDate.getFullYear()
        let cDate = cDay + "/" + cMonth + "/" + cYear;
        let cDayDue = cDay + 7;
        let cDateDue = cDayDue + "/" + cMonth + "/" + cYear;

        addDoc(colRefDelivery, {
          dmAddress: doc.data().orderAddress,
          dmDueDate: cDateDue,
          dmName: doc.data().orderUsername,
          dmOrderDetails: doc.data().orderDetails,
          dmPayment: doc.data().orderPayment,
          dmPaymentMethod: doc.data().orderPaymentMethod,
          dmStartDate: cDate,
          dmStatus: "Preparing",
          dmTrackingNumber: doc.data().orderTrackingNumber,
          isDmCommission: doc.data().isCommission
        })
        .then(() => {
          deleteOrderQ(doc.id);
        })
        .catch((e)=> {
          alert("Delivery Add Failed" + e)
        })
      } else {
        alert("Cancelled!");
      }
    });


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

    let id = doc.id;
    div.addEventListener('click', function() {
      if (confirm("Start Deliver Process?")) {
        let currentDate = new Date();
        let cDay = currentDate.getDate()
        let cMonth = currentDate.getMonth() + 1
        let cYear = currentDate.getFullYear()
        let cDate = cDay + "/" + cMonth + "/" + cYear;
        let cDayDue = cDay + 7;
        let cDateDue = cDayDue + "/" + cMonth + "/" + cYear;

        addDoc(colRefDelivery, {
          dmAddress: doc.data().orderAddress,
          dmDueDate: cDateDue,
          dmName: doc.data().orderUsername,
          dmOrderDetails: doc.data().orderDetails,
          dmPayment: doc.data().orderPayment,
          dmPaymentMethod: doc.data().orderPaymentMethod,
          dmStartDate: cDate,
          dmStatus: "Preparing",
          dmTrackingNumber: doc.data().orderTrackingNumber,
          isDmCommission: doc.data().isCommission
        })
        .then(() => {
          deleteOrderQ2(doc.id);

        })
        .catch((e)=> {
          alert("Delivery Add Failed" + e)
        })
      } else {
        alert("Cancelled!");
      }
    });

    div.appendChild(td_orderDate);
    div.appendChild(td_orderTrackingNumber);
    orderMerchandiseList.appendChild(div);
};

function deleteOrderQ(x) {
let docRefCol = doc(db, 'order', x);//document reference
  onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((docu) => {
        deleteDoc(docRefCol)
        .then(() => {
          console.log("Cart Delete");
        })
        .catch(err =>{
          console.log(err.message);
        })
      })
    })
    alert("Deliver Process Started Successfully")
    location.reload();
}

function deleteOrderQ2(x) {
let docRefCol = doc(db, 'order', x);//document reference
  onSnapshot(q2, (snapshot) => {
      snapshot.docs.forEach((docu) => {
        deleteDoc(docRefCol)
        .then(() => {
          console.log("Cart Delete");
        })
        .catch(err =>{
          console.log(err.message);
        })
      })
    })
    alert("Deliver Process Started Successfully")
    location.reload();
}
