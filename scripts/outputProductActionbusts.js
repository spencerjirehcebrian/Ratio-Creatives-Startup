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

import Cookies from '../node_modules/js-cookie/dist/js.cookie.mjs'

//let cookieEmail = ;

const colRefInventory = collection(db, 'inventory') //collection reference
const colRefCart = collection(db, 'userCart') //collection reference

const q = query(colRefInventory, where("itemType", "==", "actionbusts"));
onSnapshot(q, (snapshot) => {
    let delivery = []
    snapshot.docs.forEach((doc) => {
        renderDocument(doc);
    })
})

const productactionbustsList = document.querySelector('#productList');

function renderDocument(doc) {
    let division = document.createElement('div');
    let el_itemName = document.createElement('h1');
    let el_itemPrice = document.createElement('h1');
    //let el_itemQuantity = document.createElement('p');
    let el_itemPicture = document.createElement('img');
    //let el_itemDescription = document.createElement('p');
    //let el_itemType = document.createElement('p');

    el_itemName.setAttribute("class", "itemName");
    el_itemPrice.setAttribute("class", "itemPrice");
    //el_itemQuantity.setAttribute("class", "itemQuantity");
    el_itemPicture.setAttribute("class", "itemPicture");
    //el_itemDescription.setAttribute("class", "itemDescription");
    //el_itemType.setAttribute("class", "itemType");

    division.setAttribute("id", doc.id);
    division.setAttribute("class", "product");
    let el_addToCartBtn = document.createElement('button');
    el_addToCartBtn.addEventListener('click', function() {

        const details = document.getElementById(doc.id)
        let itemTypeRef = details.getElementsByClassName('itemType')[0].innerHTML;
        let itemDescriptionRef = details.getElementsByClassName('itemDescription')[0].innerHTML;
        let itemNameRef = details.getElementsByClassName('itemName')[0].innerHTML;
        let itemQuantityRef = details.getElementsByClassName('itemQuantity')[0].innerHTML;
        let itemPriceRef = details.getElementsByClassName('itemPrice')[0].innerHTML;
				let itemPictureRef = details.getElementsByClassName('itemPicture')[0].getAttribute("src");

        const cookieEmail = document.cookie
            .split('; ')
            .find(row => row.startsWith('userEmail='))
            .split('=')[1];

        if (cookieEmail != null) {
            addDoc(colRefCart, {

                ucType: itemTypeRef,
                ucDescription: itemDescriptionRef,
                ucEmail: cookieEmail,
                ucName: itemNameRef,
                ucQuantity: itemQuantityRef,
                ucPrice: itemPriceRef,
								ucPicture: itemPictureRef
            })
        } else {
            alert("Please Login First")
        }
    });

    division.addEventListener('click', function() {
      Cookies.set('productId', id);
      window.open('selectedproductpage.html', '_self', 'width=1000vw,height=fixed');
    });

/*    division.addEventListener('mouseover', function(event) {
      event.target.style.color = "orange";
      setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false); */

    //el_addToCartBtn.setAttribute("onclick", "addToCart()");
    el_itemPicture.setAttribute('src', doc.data().itemPicture);
    el_itemPicture.setAttribute("class", "sticker");
    //el_addToCartBtn.textContent = "Add To Cart";
    el_itemName.textContent = doc.data().itemName;
    el_itemName.setAttribute("class", "stickername");
    el_itemPrice.textContent = doc.data().itemPrice;
    el_itemPrice.setAttribute("class", "stickerprice");
    //el_itemQuantity.textContent = doc.data().itemName;
    //el_itemDescription.textContent = doc.data().itemName;
    //el_itemType.textContent = doc.data().itemType;

    division.appendChild(el_itemPicture);
    division.appendChild(el_itemName);
    division.appendChild(el_itemPrice);
    //division.appendChild(el_itemQuantity);
    //division.appendChild(el_itemDescription);
    //division.appendChild(el_itemType);

    //division.appendChild(el_addToCartBtn);

    let type = doc.data().itemType;
    productList.appendChild(division);

};
