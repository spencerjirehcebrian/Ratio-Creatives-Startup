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
const colRefCart = collection(db, 'userCart') //collection reference

const q = query(colRefInventory)
onSnapshot(q, (snapshot) => {
    let delivery = []
    snapshot.docs.forEach((doc) => {
        renderDocument(doc);
    })
})

const productDetails = document.querySelector('#selectedproducttop');
const productImages = document.querySelector('#selectedproducttop');

function renderDocument(doc) {
    let el_itemName = document.createElement('h1');
    let el_itemPrice = document.createElement('p2');
    let el_itemQuantity = document.createElement('p1');
    let el_itemPicture = document.createElement('img');
    let el_itemDescription = document.createElement('h3');
    let el_itemType = document.createElement('h2');
    let el_itemProductDescLabel = document.createElement('h4');

    el_itemName.setAttribute("class", "itemName");
    el_itemPrice.setAttribute("class", "itemPrice");
    el_itemQuantity.setAttribute("class", "itemQuantity");
    el_itemPicture.setAttribute("class", "itemPicture");
    el_itemDescription.setAttribute("class", "itemDescription");
    el_itemType.setAttribute("class", "itemType");

    el_itemProductDescLabel.textContent = "Product Details";

    let el_addToCartBtn = document.createElement('button');

    el_addToCartBtn.setAttribute("class", "addtocartb");
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

    //el_itemPicture.setAttribute('src', doc.data().itemPicture);
    //el_itemPicture.setAttribute("class", "sticker");
    el_addToCartBtn.textContent = "Add To Cart";
    el_itemName.textContent = doc.data().itemName;
    el_itemPrice.textContent = "P "+doc.data().itemPrice;
    el_itemQuantity.textContent = "Stock: "+doc.data().itemQuantity;
    el_itemDescription.textContent = doc.data().itemDescription;
    el_itemType.textContent = doc.data().itemType;

    let type = doc.data().itemType;

    productDetails.appendChild(el_itemType);
    productDetails.appendChild(el_itemName);
    productDetails.appendChild(el_itemDescription);
    productDetails.appendChild(el_itemProductDescLabel);
    productDetails.appendChild(el_itemQuantity);
    productDetails.appendChild(el_itemPrice);
    productDetails.appendChild(el_addToCartBtn);
    //productDetails.appendChild(el_itemPicture);

    //division



};
