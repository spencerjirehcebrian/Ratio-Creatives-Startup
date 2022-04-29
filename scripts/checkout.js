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

import Cookies from "./js.cookie.mjs";

const colRefOrder = collection(db, 'order') //collection reference
const colRefCart = collection(db, 'userCart') //collection reference
let colRefVar = collection(db, 'globalVariables'); //collection reference
let docRefVar = doc(db, 'globalVariables', 'mLbbsMiPtMrFFdHEkAPM'); //document reference

let details="";
const cookieEmail = Cookies.get('userEmail');
const cookieName = Cookies.get('userName');
const cookieAddress = Cookies.get('userAddress');
const cookieContact = Cookies.get('userContact');

let isCommissionBoolForm = false;
let trackingNo = 0;


const q = query(colRefCart, where("ucEmail", "==", cookieEmail))

const occonfirmorder = document.querySelector('.occonfirmorder');

//query for tracking number
const q2 = query(colRefVar)
onSnapshot(q2, (snapshot) => {
    snapshot.docs.forEach((doc) => {
        trackingNo = parseInt(doc.data().currentTrackingNumber);
    })
})


occonfirmorder.addEventListener('click', (e) => {
  e.preventDefault()
  let paymentMethodValue = document.getElementById('displayPaymentMethod').innerHTML;
  let dateValue = document.getElementById('displayDate').innerHTML;
  let totalPrice = Cookies.get('totalPrice');

  onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        let type = doc.data().ucType;

        trackingNo ++;
        console.log(trackingNo);
        if ((type == "Commission - Video Editing")||(type == "Commission - Layout")||(type == "Commission - Art Commissions"))
          {
            addDoc(colRefOrder, {
              orderAddress: cookieAddress,
              orderDetails: doc.data().ucDescription,
              orderDate: dateValue,
              orderUsername: cookieName,
              orderTrackingNumber: trackingNo,
              orderType: doc.data().ucType,
              orderPaymentMethod: paymentMethodValue,
              orderPayment: totalPrice,
              isCommission: true
            })
            .then(() => {
              console.log("Commission Checkout Successful");
            })
            .catch(err =>{
              alert(err.message);
            })

            updateDoc(docRefVar, {
              currentTrackingNumber: trackingNo
            })
          }else
          {
            details += doc.data().ucName +"-"+doc.data().ucType +"-"+ doc.data().ucQuantity+"\n";
          }
        })

        console.log(details);

        addDoc(colRefOrder, {
          orderAddress: cookieAddress,
          orderDetails:details,
          orderDate: dateValue,
          orderUsername: cookieName,
          orderTrackingNumber: trackingNo,
          orderType: "Merchandise Order",
          orderPaymentMethod: paymentMethodValue,
          orderPayment: totalPrice,
          isCommission: false
        })
        .then(() => {
          deleteCart();
        })
        .catch(err =>{
          console.log(err.message);
        })
    })
})

function deleteCart() {
  onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((docu) => {
        let docRefCol = doc(db, 'userCart', docu.id); //document reference
        deleteDoc(docRefCol)
        .then(() => {
          console.log("Cart Delete");
        })
        .catch(err =>{
          console.log(err.message);
        })
      })
    })
    alert("Checkout Successful");
    window.open("confirmation.html", "_self")
}
