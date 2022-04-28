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

import Cookies from '../node_modules/js-cookie/dist/js.cookie.mjs';

const colRefOrder = collection(db, 'order') //collection reference
const colRefCart = collection(db, 'userCart') //collection reference
let colRefVar = collection(db, 'globalVariables'); //document reference

let details="";
const cookieEmail = Cookies.get('userEmail');
const cookieName = Cookies.get('userName');
const cookieAddress = Cookies.get('userAddress');
const cookieContact = Cookies.get('userContact');

let isCommissionBoolForm = false;
let trackingNo = 0;


const q = query(colRefCart, where("ucEmail", "==", cookieEmail))

const occonfirmorder = document.querySelector('.occonfirmorder');

//query fro tracking number

const q2 = query(colRefVar)
onSnapshot(q2, (snapshot) => {
    snapshot.docs.forEach((doc) => {
        trackingNo = parseInt(doc.data().currentTrackingNumber);
    })
})


occonfirmorder.addEventListener('click', (e) => {
  e.preventDefault()
  //let isCommissionBoolForm = document.getElementById('isOrderCommissionCheckbox').checked;
  let paymentMethodValue = document.getElementById('displayPaymentMethod').innerHTML;
  let dateValue = document.getElementById('displayDate').innerHTML;
  let totalPrice = Cookies.get('totalPrice');

  onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        let type = doc.data().ucType;

        trackingNo ++;
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
            
            updateDoc(colRefVar, {
              currentTrackingNumber: trackingNo
            })
            .then(()=>{
              updateInvForm.reset()
            })
          }else
          {
            details += doc.data().ucName + doc.data().ucQuantity+"\n";
            console.log(details);
          }
        })

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
          console.log("Merchandise Checkout Successful");
          window.open("confirmation.html", "_self")
        })
        .catch(err =>{
          alert(err.message);
        })
    })
})
