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

import { deleteCart } from "./deleteCart.js";
const colRefCart = collection(db, 'userCart') //collection reference

let value = 0;
let cookieEmail = Cookies.get('userEmail')

const q = query(colRefCart, where("ucEmail","==",cookieEmail))
onSnapshot(q, (snapshot) => {
    let col = []
    snapshot.docs.forEach((doc) => {
        renderDocument(doc);
    })
})

const userCartList = document.querySelector('#cartList');
function renderDocument(doc) {
    let division = document.createElement('div');
    let el_ucCommissionType = document.createElement('h1');
    let el_ucDescription = document.createElement('p');
    let el_ucEmail = document.createElement('p');
    let el_ucName = document.createElement('h1');
    let el_ucPrice = document.createElement('h1');
    let el_ucQuantity = document.createElement('p');
    let el_ucPicture = document.createElement('img');
    let el_ucQuantityUpBtn = document.createElement('button');
    let el_ucQuantityDownBtn = document.createElement('button');

    el_ucCommissionType.setAttribute("class", "ucCommissionType");
    el_ucDescription.setAttribute("class", "ucDescription");
    el_ucEmail.setAttribute("class", "ucEmail");
    el_ucName.setAttribute("class", "ucName");
    el_ucPrice.setAttribute("class", "ucPrice");
    el_ucQuantity.setAttribute("class", "ucQuantity");
    el_ucPicture.setAttribute("class", "ucPicture");

    division.setAttribute("id", doc.id);
    division.setAttribute("class", "cartListItem");

    /*el_ucQuantityUpBtn.addEventListener('click', function() {
      const details = document.getElementById(doc.id)
      let modQuantity = parseInt(details.getElementsByClassName('ucQuantity')[0].innerHTML);
      modQuantity ++;
      el_ucQuantity.textContent = modQuantity;
    });

    el_ucQuantityDownBtn.addEventListener('click', function() {
      const details = document.getElementById(doc.id)
      let modQuantity = parseInt(details.getElementsByClassName('ucQuantity')[0].innerHTML);
      if (modQuantity > 1){
      modQuantity --;
      el_ucQuantity.textContent = modQuantity;
      }
    });*/

    //el_addToCartBtn.setAttribute("onclick", "addToCart()");
    let el_ucPictureTrash = document.createElement('img');
    el_ucPictureTrash.addEventListener("click",
    function() {
      deleteCart(doc.id);
    });

    el_ucPictureTrash.setAttribute('src', './assets/Icons/trash.svg');
    el_ucPicture.setAttribute('src', doc.data().ucPicture);

    el_ucQuantityUpBtn.textContent = "QuantityUpBtn";
    el_ucQuantityDownBtn.textContent = "QuantityDownBtn";

    el_ucCommissionType.textContent = doc.data().ucType;
    el_ucDescription.textContent = doc.data().ucDescription;
    el_ucEmail.textContent = doc.data().ucEmail;
    el_ucName.textContent = doc.data().ucName;
    el_ucPrice.textContent = "PHP "+doc.data().ucPrice;
    el_ucQuantity.textContent = doc.data().ucQuantity;

    el_ucPicture.setAttribute("class","cartitem");

    el_ucCommissionType.setAttribute("class","cartdesc");
    el_ucName.setAttribute("class","cartname");
    el_ucPrice.setAttribute("class","cartprice");
    el_ucPicture.setAttribute("class","cartitem");
    el_ucPictureTrash.setAttribute("class","carttrash");


    //division.appendChild(el_ucDescription);
    //division.appendChild(el_ucEmail);
    division.appendChild(el_ucName);
    division.appendChild(el_ucCommissionType);
    division.appendChild(el_ucPrice);
    //division.appendChild(el_ucQuantity);
    division.appendChild(el_ucPicture);
    division.appendChild(el_ucPictureTrash);
    //division.appendChild(el_ucQuantityUpBtn);
    //division.appendChild(el_ucQuantityDownBtn);

    userCartList.appendChild(division);

    value += parseInt(doc.data().ucPrice);
    let cartsubtotalvalueQuantity = document.getElementById('cartsubtotalvalue');
    cartsubtotalvalueQuantity.textContent = "PHP "+value+".00";
};
