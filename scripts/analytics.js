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

const colRefInv = collection(db, 'inventory') //collection reference
const colRefOrder = collection(db, 'order') //collection reference

let stickerNumberRef = document.getElementById('stickerNumber');
let photocardNumberRef = document.getElementById('photocardNumber');
let commissionNumberRef = document.getElementById('commissionNumber');
let stickerStockRef = document.getElementById('stickerStock');
let photocardStockRef = document.getElementById('photocardStock');
let commissionStockRef = document.getElementById('commissionStock');
let stickerNumberCount = 0;
let photocardNumberCount = 0;
let commissionNumberCount = 0;
let stickerStockCount = 0;
let photocardStockCount = 0;
let commissionStockCount = 0;

let revenueOutputRef = document.getElementById('revenueOutput');
let customerOutputRef = document.getElementById('customerOutput');
let profitOutputRef = document.getElementById('profitOutput');
let revenueOutputNumber = 0;
let customerOutputNumber = 0;
let profitOutputNumber = 0;

const queryCommission = query(colRefOrder, where("isCommission", "==", true))
onSnapshot(queryCommission, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      commissionNumberCount++;
      commissionNumberRef.textContent = commissionNumberCount;
      commissionStockCount = 5 - commissionNumberCount;
      commissionStockRef.textContent = commissionStockCount;
    })
    console.log(commissionNumberCount);
    console.log(commissionStockCount);
})

const queryStickerStock = query(colRefInv, where("itemType", "!=", "genshinphotocards"))
onSnapshot(queryStickerStock, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      stickerStockCount += parseInt(doc.data().itemQuantity);
      stickerStockRef.textContent = stickerStockCount;
    })
    console.log(stickerStockCount);
})

const queryStickerNumber = query(colRefOrder, where("orderType", "!=", "genshinphotocards"))
onSnapshot(queryStickerNumber, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      stickerNumberCount ++;
      stickerNumberRef.textContent = stickerNumberCount;
    })
    console.log(stickerNumberCount);
})

const queryPhotoCardStock = query(colRefInv, where("itemType", "==", "genshinphotocards"))
onSnapshot(queryPhotoCardStock, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      photocardStockCount += parseInt(doc.data().itemQuantity);
      photocardStockRef.textContent = photocardStockCount;
    })
    console.log(photocardStockCount);
})

const queryPhotoCardNumber = query(colRefOrder, where("orderType", "==", "genshinphotocards"))
onSnapshot(queryPhotoCardNumber, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      photocardNumberCount ++;
      photocardNumberRef.textContent = photocardNumberCount;
    })
    console.log(photocardNumberCount);
})

onSnapshot(colRefOrder, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      profitOutputNumber += parseFloat(doc.data().orderPayment);
      profitOutputRef.textContent = "Php " + profitOutputNumber+".00";
    })
    console.log(profitOutputNumber);
})

onSnapshot(colRefOrder, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      revenueOutputNumber += parseFloat(doc.data().orderPayment);
      revenueOutputRef.textContent = "Php " + revenueOutputNumber+".00";
    })
    console.log(revenueOutputNumber);
})

onSnapshot(colRefOrder, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      customerOutputNumber ++;
      customerOutputRef.textContent = customerOutputNumber;
    })
    console.log(customerOutputRef);
})
