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
const colRefInv = collection(db, 'inventory') //collection reference
let colRefVar = collection(db, 'globalVariables'); //collection reference
let docRefVar = doc(db, 'globalVariables', 'mLbbsMiPtMrFFdHEkAPM'); //document reference

const cookieEmail = Cookies.get('userEmail');
const cookieName = Cookies.get('userName');
const cookieAddress = Cookies.get('userAddress');
const cookieContact = Cookies.get('userContact');

let isCommissionBoolForm = false;
let trackingNo = 0;
let stockQuantity;

let details = "";

const q = query(colRefCart, where("ucEmail", "==", cookieEmail))

const occonfirmorder = document.querySelector('.occonfirmorder');

//query for tracking number
const docSnap = await getDoc(docRefVar);
if (docSnap.exists()) {
  trackingNo = parseInt(docSnap.data().currentTrackingNumber);
  console.log(trackingNo);
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}


occonfirmorder.addEventListener('click', (e) => {
  e.preventDefault()
  let paymentMethodValue = document.getElementById('displayPaymentMethod').innerHTML;
  let dateValue = document.getElementById('displayDate').innerHTML;
  let totalPrice = Cookies.get('totalPrice');
  Cookies.set('productDetails', "");

  onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((docu) => {
        let type = docu.data().ucType;

        if ((type == "Commission - Video Editing")||(type == "Commission - Layout")||(type == "Commission - Art Commissions"))
        {
        trackingNo ++;
        updateDoc(docRefVar, {
          currentTrackingNumber: trackingNo
        })
        .then(() => {
          console.log(trackingNo);
        })
        .catch(err =>{
          console.log(err.message);
        })

            addDoc(colRefOrder, {
              orderAddress: cookieAddress,
              orderDetails: docu.data().ucType + ": " + docu.data().ucDescription,
              orderDate: dateValue,
              orderUsername: cookieName,
              orderTrackingNumber: trackingNo,
              orderType: docu.data().ucType,
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
          }else
          {
            details += docu.data().ucName +"-"+docu.data().ucType +"-"+ docu.data().ucQuantity+"\n";
            //updateQuantity(docu.data().ucInvRef, docu.data().ucQuantity);
            updateQuantity(docu.data().ucInvRef, docu.data().ucQuantity).then(
              function(value) {
                let docRefInv = doc(db, 'inventory', docu.data().ucInvRef);//document reference
                updateDoc(docRefInv, {
                  itemQuantity: stockQuantity
                })
                .then(() => {
                  console.log(stockQuantity);
                })
                .catch(err =>{
                  console.log(err.message);
                })
              },
            );
          }
        })
        console.log(details);
        //Cookies.set('productDetails', details);
        //details = Cookies.get('productDetails');
        trackingNo ++;
        updateDoc(docRefVar, {
          currentTrackingNumber: trackingNo
        })
        .then(() => {
          console.log(trackingNo);
        })
        .catch(err =>{
          console.log(err.message);
        })

        addDoc(colRefOrder, {
          orderAddress: cookieAddress,
          orderDetails: details,
          orderDate: dateValue,
          orderUsername: cookieName,
          orderTrackingNumber: trackingNo,
          orderType: "Merchandise Order",
          orderPaymentMethod: paymentMethodValue,
          orderPayment: parseInt(totalPrice),
          isCommission: false
        })
        .then(() => {
          //deleteCart();
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
    //alert("Checkout Successful");
    window.open("confirmation.html", "_self")
}

async function updateQuantity(x, y){
  let docRefInv = doc(db, 'inventory', x);//document reference
  let docSnap1 = await getDoc(docRefInv);
  if (docSnap1.exists()) {
    console.log(x +" = "+ parseInt(docSnap1.data().itemQuantity));
    stockQuantity = parseInt(docSnap1.data().itemQuantity) - parseInt(y);
  }
}
