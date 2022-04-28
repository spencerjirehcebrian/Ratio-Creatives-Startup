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

//let cookieEmail = ;

const colRefInventory = collection(db, 'inventory') //collection reference
const colRefOrder = collection(db, 'order') //collection reference



let slotsRef = document.querySelector('.slot-commission1');
let slotCtr = 0;
const q2 = query(colRefOrder, where("isDmCommission", "==", true))
onSnapshot(q2, (snapshot) => {
    snapshot.docs.forEach((doc) => {
        slotCtr ++;
        renderCommissions(doc);
    })
})

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

  if (slotCtr == 1){
    slotsRef = document.querySelector('.slot-commission1');
  } else if (slotCtr == 2) {
    slotsRef = document.querySelector('.slot-commission2');
  }else if (slotCtr == 3) {
    slotsRef = document.querySelector('.slot-commission3');
  }else if (slotCtr == 4) {
    slotsRef = document.querySelector('.slot-commission4');
  }else if (slotCtr == 5) {
    slotsRef = document.querySelector('.slot-commission5');
  }

  slotsRef.appendChild(td_dmTrackingNumber);
  slotsRef.appendChild(td_dmStatus);
  slotsRef.appendChild(td_dmName);
  slotsRef.appendChild(td_dmAddress);
  slotsRef.appendChild(td_dmOrderDetails);
  //tr.appendChild(td_dmPaymentMethod);
  slotsRef.appendChild(td_dmPayment);
  slotsRef.appendChild(td_dmStartDate);
  slotsRef.appendChild(td_dmDueDate);
};

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
        productgenshinemoteheads.appendChild(division);
    }

};
