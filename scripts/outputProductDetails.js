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

let cookieProduct = Cookies.get('productId');
let cookieEmail = Cookies.get('userEmail');
console.log(cookieProduct);

const colRefInventory = collection(db, 'inventory') //collection reference
const colRefCart = collection(db, 'userCart') //collection reference


const q = query(colRefInventory, where('__name__', '==', cookieProduct))
onSnapshot(q, (snapshot) => {
    let delivery = []
    snapshot.docs.forEach((doc) => {
        renderDocument(doc);
    })
})

const productDetails = document.querySelector('#selectedproducttop');
const productImages = document.querySelector('.mySlides');

function renderDocument(doc) {
    let el_itemName = document.createElement('h1');
    let el_itemPrice = document.createElement('p2');
    let el_itemQuantity = document.createElement('p1');

    let el_itemDescription = document.createElement('h3');
    let el_itemType = document.createElement('h2');
    let el_itemProductDescLabel = document.createElement('h4');

    el_itemName.setAttribute("class", "itemName");
    el_itemPrice.setAttribute("class", "itemPrice");
    el_itemQuantity.setAttribute("class", "itemQuantity");
    el_itemDescription.setAttribute("class", "itemDescription");
    el_itemType.setAttribute("class", "itemType");

    el_itemProductDescLabel.textContent = "Product Details";

    let el_addToCartBtn = document.createElement('button');

    el_addToCartBtn.setAttribute("class", "addtocartb");
    el_addToCartBtn.addEventListener('click', function() {

        const details = document.getElementById(doc.id);
        let itemTypeRef = doc.data().itemType;
        let itemDescriptionRef = doc.data().itemDescription;
        let itemNameRef = doc.data().itemName;
        let itemQuantityRef = "1";
        let itemPriceRef = doc.data().itemPrice;
				let itemPictureRef = doc.data().itemPicture;

        console.log(cookieEmail);
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
            .then(()=>{
            alert("Cart Added");
            window.open('product.html', '_self')
            })

        } else {
            alert("Please Login First")
        }
    });


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

    let division = document.createElement('div');
    division.setAttribute('class', 'mySlides fade');

    let el_itemPicture = document.createElement('img');
    el_itemPicture.setAttribute('src', doc.data().itemPicture);
    el_itemPicture.setAttribute('style', 'width:100%');

    /*let el_arrowleft = document.createElement('a');
    el_arrowleft.setAttribute('class', 'prev');
    el_arrowleft.setAttribute("onclick", "plusSlides(-1)");
    el_arrowleft.textContent = "&#10094;";
    let el_arrowRight = document.createElement('a');
    el_arrowRight.setAttribute('class', 'next');
    el_arrowRight.setAttribute("onclick", "plusSlides(1)");
    el_arrowRight.textContent ="&#10095;";
    let el_br = document.createElement('br');*/

    //division.appendChild(el_itemPicture);

    productImages.appendChild(el_itemPicture);

    //productImages.appendChild(el_arrowleft);
    //productImages.appendChild(el_arrowRight);
    //productImages.appendChild(el_br);
    //division



};
