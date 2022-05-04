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
const colRefCart = collection(db, 'userCart') //collection reference
let cookieSearch = Cookies.get('cookieSearch');

if(cookieSearch == "empty" ||cookieSearch == " "  )
{
  console.log(cookieSearch);
  const q = query(colRefInventory, where ("itemName", "==", cookieSearch))
  onSnapshot(q, (snapshot) => {
      let delivery = []
      snapshot.docs.forEach((doc) => {
          renderDocument(doc);
      })
  })

}
else {
  const q = query(colRefInventory)
  onSnapshot(q, (snapshot) => {
      let delivery = []
      snapshot.docs.forEach((doc) => {
          renderDocument(doc);
      })
  })

}


const productactionbustsList = document.querySelector('#productList');

function renderDocument(doc) {
    let division = document.createElement('div');
    let el_itemName = document.createElement('h1');
    let el_itemPrice = document.createElement('h1');
    //let el_itemQuantity = document.createElement('p');
    let el_itemPicture = document.createElement('img');
    //let el_itemDescription = document.createElement('p');a
    //let el_itemType = document.createElement('p');

    el_itemName.setAttribute("class", "itemName");
    el_itemPrice.setAttribute("class", "itemPrice");
    //el_itemQuantity.setAttribute("class", "itemQuantity");
    el_itemPicture.setAttribute("class", "itemPicture");
    //el_itemDescription.setAttribute("class", "itemDescription");
    //el_itemType.setAttribute("class", "itemType");

    division.setAttribute("id", doc.id);
    division.setAttribute("class", "product");

    //let link = document.querySelector('id');
    let id = doc.id;
    division.addEventListener('click', function() {
      Cookies.set('productId', id);
      window.open('selectedproductpage.html', id, 'width=800,height=1000,location=0,status=0,menubar=0,toolbar=0,status=0,titlebar=0');
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
    el_itemPrice.textContent = "PHP "+doc.data().itemPrice+".00";
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

    //let type = doc.data().itemType;
    productList.appendChild(division);

};
