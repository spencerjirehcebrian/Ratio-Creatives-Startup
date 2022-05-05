import Cookies from "./js.cookie.mjs";
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
const colRefCart = collection(db, 'userCart') //collection reference
let buttonRef = document.querySelector(".reserve");

let cookieProduct = Cookies.get('productId');
let cookieEmail = Cookies.get('userEmail');

let commDescriptionRef = Cookies.get("commDescription")
document.querySelector(".form3text").value = commDescriptionRef;

buttonRef.addEventListener('click', (e) => {
  e.preventDefault();


  addDoc(colRefCart, {
      ucType: "Commission - Video Editing",
      ucInvRef: "",
      ucDescription: commDescriptionRef,
      ucEmail: cookieEmail,
      ucName: "Commission - Video Editing",
      ucQuantity: 1,
      ucPrice: 200,
      ucPicture: ""
  })
  .then(()=>{
  alert("Cart Added");
  window.close();
  })



});
