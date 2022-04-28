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
const colRefCart = collection(db, 'userCart') //collection reference

let details="";
const cookieEmail = Cookies.get('userEmail');
const cookieName = Cookies.get('userName');
const cookieAddress = Cookies.get('userAddress');
const cookieContact = Cookies.get('userContact');

let isCommissionBoolForm = false;

const q = query(colRefCart, where("ucEmail", "==", cookieEmail))

const occonfirmorder = document.querySelector('.occonfirmorder')
 occonfirmorder.addEventListener('click', (e) => {
  e.preventDefault()


  //let isCommissionBoolForm = document.getElementById('isOrderCommissionCheckbox').checked;
  let paymentValue = document.querySelector('#displayPayment')[0].innerHTML;
  let paymentMethodValue = document.querySelector('#displayPaymentMethod')[0].innerHTML;
  let paymentMethodValue = document.querySelector('#displayPaymentMethod')[0].innerHTML;

  onSnapshot(q, (snapshot) => {
      let col = []
      snapshot.docs.forEach((doc) => {
        let type = doc.data().ucType;
        let typeDecider = ;
        if ((type == "Commission - Video Editing")||(type == "Commission - Layout")||(type == "Commission - Art Commissions"))
          {
            addDoc(colRefOrder, {
              orderAddress: cookieAddress,
              orderDetails: doc.data().ucDescription,
              orderDate: ,
              orderUsername: cookieName,
              orderTrackingNumber: ,
              orderType: doc.data().ucType,
              orderPaymentMethod: paymentMethodValue,
              orderPayment: paymentValue,
              isCommission: true
            })
            .then(() => {
              alert("Commission Checkout Successful");
            })
            .catch(err =>{
              alert(err.message);
            })
          }else
          {
            details += doc.data().ucName + doc.data().ucQuantity+"\n";
          }
      })
  })
    console.log(details);

  addDoc(colRefOrder, {
    orderAddress:,
    orderDetails:details,
    orderDate:,
    orderUsername: cookieName,
    orderTrackingNumber:,
    orderType:,
    orderPaymentMethod:,
    orderPayment:,
    isCommission: false
  })
  .then(() => {
    alert("Merchandise Checkout Successful");
  })
  .catch(err =>{
    alert(err.message);
  })
})
