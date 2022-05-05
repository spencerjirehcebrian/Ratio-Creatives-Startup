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
                ucInvRef: doc.id,
                ucDescription: itemDescriptionRef,
                ucEmail: cookieEmail,
                ucName: itemNameRef,
                ucQuantity: itemQuantityRef,
                ucPrice: itemPriceRef,
								ucPicture: itemPictureRef
            })
            .then(()=>{
            alert("Cart Added");
            window.close();
            })

        } else {
            alert("Please Login First")
        }
    });


    el_addToCartBtn.textContent = "Add To Cart";
    el_itemName.textContent = doc.data().itemName;
    el_itemPrice.textContent = "Php "+doc.data().itemPrice+".00";
    el_itemQuantity.textContent = "Stock: "+doc.data().itemQuantity;
    el_itemDescription.textContent = doc.data().itemDescription;
    el_itemType.textContent = doc.data().itemType;

    let type = doc.data().itemType;



    productDetails.appendChild(el_itemType);
    productDetails.appendChild(el_itemName);
    productDetails.appendChild(el_itemDescription);
    productDetails.appendChild(el_itemProductDescLabel);

    let el_divLeft = document.createElement('div');
    let el_divRight = document.createElement('div');
    el_divLeft.setAttribute("class","detailsright");
    el_divRight.setAttribute("class","detailsleft");

    let el_ulLeft = document.createElement('ul');
    let el_ulRight = document.createElement('ul');

    let el_liLeft1 = document.createElement('li');
    let el_liLeft2 = document.createElement('li');
    let el_liLeft3 = document.createElement('li');

    let el_liRight1 = document.createElement('li');
    let el_liRight2 = document.createElement('li');
    let el_liRight3 = document.createElement('li');

    el_liLeft1.textContent = "Sold per Piece";
    el_liLeft2.textContent = "2.5x2.5 inches";
    el_liLeft3.textContent = "Sticker Type: Vinyl";

    el_liRight1.textContent = "Glossy Laminated";
    el_liRight2.textContent = "Non-fading";
    el_liRight3.innerHTML = "Color may vary per <br> device lighting";

    el_ulLeft.appendChild(el_liLeft1);
    el_ulLeft.appendChild(el_liLeft2);
    el_ulLeft.appendChild(el_liLeft3);

    el_ulRight.appendChild(el_liRight1);
    el_ulRight.appendChild(el_liRight2);
    el_ulRight.appendChild(el_liRight3);

    el_divLeft.appendChild(el_ulLeft);
    el_divRight.appendChild(el_ulRight);

    productDetails.appendChild(el_divLeft);
    productDetails.appendChild(el_divRight);

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
