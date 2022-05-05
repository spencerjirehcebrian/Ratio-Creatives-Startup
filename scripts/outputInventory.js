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
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {
    db,
    storage
} from "./firebaseConfig.js";

import Cookies from "./js.cookie.mjs";

const colRefInventory = collection(db, 'inventory') //collection reference
const colRefOrder = collection(db, 'order') //collection reference

const q = query(colRefInventory)
onSnapshot(q, (snapshot) => {
    let delivery = []
    snapshot.docs.forEach((doc) => {
        renderDocument(doc);
    })
})

const productemoteheadsList = document.querySelector('.productgenshinemoteheadsList');
const productactionbustsList = document.querySelector('.productactionbustsList');
const productbobbleheadsList = document.querySelector('.productbobbleheadsList');
const productgenshinpetsList = document.querySelector('.productgenshinpetsList');
const productgenshinphotocardsList = document.querySelector('.productgenshinphotocardsList');

function renderDocument(doc) {
    let division = document.createElement('div');
    let el_itemName = document.createElement('div');
    let el_itemPrice = document.createElement('p');
    let el_itemQuantity = document.createElement('div');
    let el_itemPicture = document.createElement('img');
    let el_itemDescription = document.createElement('p');
    let el_itemType = document.createElement('p');

    el_itemName.setAttribute("class", "desc");
    //el_itemPrice.setAttribute("class", "itemPrice");
    el_itemQuantity.setAttribute("class", "stocklabel");
    //el_itemDescription.setAttribute("class", "itemDescription");
    //el_itemType.setAttribute("class", "itemType");

    division.setAttribute("id", doc.id);
    division.setAttribute("class", "stock-gallery");

    //el_addToCartBtn.setAttribute("onclick", "addToCart()");
    el_itemPicture.setAttribute('src', doc.data().itemPicture);

    el_itemName.textContent = doc.data().itemName;
    el_itemPrice.textContent = doc.data().itemPrice;
    el_itemQuantity.textContent = "Stock: "+doc.data().itemQuantity;
    el_itemDescription.textContent = doc.data().itemDescription;
    el_itemType.textContent = doc.data().itemType;

    let id1 = doc.id;

    division.addEventListener('click', function() {
      Cookies.set('inventoryId', id1)
      window.open("viewProductDetails.html","_self");
    });
    //division.appendChild(el_itemPrice);

    //division.appendChild(el_itemDescription);
    //division.appendChild(el_itemType);
    division.appendChild(el_itemPicture);
    division.appendChild(el_itemName);
    division.appendChild(el_itemQuantity);

    let type = doc.data().itemType;
    if (type == "actionbusts") {
        productactionbustsList.appendChild(division);
    } else if (type == "bobbleheads") {
        productbobbleheadsList.appendChild(division);
    } else if (type == "genshinpets") {
        productgenshinpetsList.appendChild(division);
    } else if (type == "genshinphotocards") {
        productgenshinphotocardsList.appendChild(division);
    } else if (type == "genshinemoteheads") {
        productemoteheadsList.appendChild(division);
    }

};



function renderCommissions(doc) {
  let division = document.createElement('div');
  let td_dmCheck = document.createElement('p');
  let td_dmAddress = document.createElement('p');
  let td_dmDueDate = document.createElement('p');
  let td_dmName = document.createElement('p');
  let td_dmOrderDetails = document.createElement('p');
  let td_dmPaymentMethod = document.createElement('p');
  let td_dmPayment = document.createElement('p');
  let td_dmStartDate = document.createElement('p');
  let td_dmStatus = document.createElement('p');
  let td_dmTrackingNumber = document.createElement('p');

  division.setAttribute('data-id', doc.id);


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

/*
  slotsRef.appendChild(td_dmTrackingNumber);
  slotsRef.appendChild(td_dmStatus);
  slotsRef.appendChild(td_dmName);
  slotsRef.appendChild(td_dmAddress);
  slotsRef.appendChild(td_dmOrderDetails);
  //tr.appendChild(td_dmPaymentMethod);
  slotsRef.appendChild(td_dmPayment);
  slotsRef.appendChild(td_dmStartDate);
  slotsRef.appendChild(td_dmDueDate);*/
};


let docRefVar = doc(db, 'globalVariables', 'mLbbsMiPtMrFFdHEkAPM'); //document reference
let slotsFree;
const docSnap = await getDoc(docRefVar);
if (docSnap.exists()) {
  slotsFree = parseInt(docSnap.data().currentSlotsFree);
  console.log(slotsFree);
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

let slotsRef1 = document.querySelector('.slot-commission1');
let slotsRef2 = document.querySelector('.slot-commission2');
let slotsRef3 = document.querySelector('.slot-commission3');
let slotsRef4 = document.querySelector('.slot-commission4');
let slotsRef5 = document.querySelector('.slot-commission5');

switch (slotsFree) {
  case 0:
    break;
  case 1:
    slotsRef1.style.background = "#6ECA57";
    break;
  case 2:
    slotsRef1.style.background = "#6ECA57";
    slotsRef2.style.background = "#6ECA57";
    break;
  case 3:
    slotsRef1.style.background = "#6ECA57";
    slotsRef2.style.background = "#6ECA57";
    slotsRef3.style.background = "#6ECA57";
    break;
  case 4:
    slotsRef1.style.background = "#6ECA57";
    slotsRef2.style.background = "#6ECA57";
    slotsRef3.style.background = "#6ECA57";
    slotsRef4.style.background = "#6ECA57";
    break;
  case 5:
  slotsRef1.style.background = "#6ECA57";
  slotsRef2.style.background = "#6ECA57";
  slotsRef3.style.background = "#6ECA57";
  slotsRef4.style.background = "#6ECA57";
  slotsRef5.style.background = "#6ECA57";
    break;
  default:
     console.log("No value found");
}

let slotCtr = 0;
const q2 = query(colRefOrder, where("isCommission", "==", true))
onSnapshot(q2, (snapshot) => {
    snapshot.docs.forEach((doc) => {
        slotCtr++;
        let slotsRef1 = document.querySelector('.slot-commission1');
        let slotsRef2 = document.querySelector('.slot-commission2');
        let slotsRef3 = document.querySelector('.slot-commission3');
        let slotsRef4 = document.querySelector('.slot-commission4');
        let slotsRef5 = document.querySelector('.slot-commission5');
        switch (slotCtr) {
          case 0:
            break;
          case 1:
            slotsRef1.style.background = "#b5493a";
            break;
          case 2:
            slotsRef1.style.background = "#b5493a";
            slotsRef2.style.background = "#b5493a";
            break;
          case 3:
            slotsRef1.style.background = "#b5493a";
            slotsRef2.style.background = "#b5493a";
            slotsRef3.style.background = "#b5493a";
            break;
          case 4:
            slotsRef1.style.background = "#b5493a";
            slotsRef2.style.background = "#b5493a";
            slotsRef3.style.background = "#b5493a";
            slotsRef4.style.background = "#b5493a";
            break;
          case 5:
          slotsRef1.style.background = "#b5493a";
          slotsRef2.style.background = "#b5493a";
          slotsRef3.style.background = "#b5493a";
          slotsRef4.style.background = "#b5493a";
          slotsRef5.style.background = "#b5493a";
            break;
          default:
             console.log("No value found");
        }
        renderCommissions(doc);
    })

})

let btnYes = document.querySelector('.btnyes');
let btnNo = document.querySelector('.btnno');
btnYes.addEventListener('click', function() {
  console.log(slotCtr);
  let docRefInv = doc(db, 'globalVariables', 'mLbbsMiPtMrFFdHEkAPM');//document reference
  slotsFree+=1;
  updateDoc(docRefInv, {
    currentSlotsFree: slotsFree
  })
  .then(() => {
    console.log(slotsFree);
    location.reload();
  })
  .catch(err =>{
    console.log(err.message);
  })
});

btnNo.addEventListener('click', function() {
  let docRefInv = doc(db, 'globalVariables', 'mLbbsMiPtMrFFdHEkAPM');//document reference
  slotsFree -= 1;
  updateDoc(docRefInv, {
    currentSlotsFree: slotsFree
  })
  .then(() => {
    console.log(slotsFree);
  location.reload();
  })
  .catch(err =>{
    console.log(err.message);
  })
});


/*if (confirm("Start Deliver Process?")) {

} else {
  alert("Cancelled!");
}*/
