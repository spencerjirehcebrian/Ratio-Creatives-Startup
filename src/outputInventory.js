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

var picURL = "";

const colRefInventory = collection(db, 'inventory') //collection reference
const colRefCart = collection(db, 'userCart') //collection reference

const q = query(colRefInventory)
onSnapshot(q, (snapshot) => {
	let delivery = []
	snapshot.docs.forEach((doc) => {
		renderDocument(doc);
	})
})

const productactionbustsList = document.querySelector('#productactionbustsList');
const productbobbleheadsList = document.querySelector('#productbobbleheadsList');
const productgenshinpetsList = document.querySelector('#productgenshinpetsList');
const productgenshinphotocardsList = document.querySelector('#productgenshinphotocardsList');

function renderDocument(doc) {
	let division = document.createElement('div');
	let el_itemName = document.createElement('p');
	let el_itemPrice = document.createElement('p');
	let el_itemQuantity = document.createElement('p');
	let el_itemPicture = document.createElement('img');
	let el_itemDescription = document.createElement('p');
	let el_itemType = document.createElement('p');

	el_itemName.setAttribute("class", "itemName");
	el_itemPrice.setAttribute("class", "itemPrice");
	el_itemQuantity.setAttribute("class", "itemQuantity");
	el_itemPicture.setAttribute("class", "itemPicture");
	el_itemDescription.setAttribute("class", "itemDescription");
	el_itemType.setAttribute("class", "itemType");

	division.setAttribute("id", doc.id);
	let el_addToCartBtn = document.createElement('button');
	el_addToCartBtn.addEventListener('click', function(){

		const details = document.getElementById(doc.id)
		let itemTypeRef = details.getElementsByClassName('itemType')[0].innerHTML;
		let itemDescriptionRef = details.getElementsByClassName('itemDescription')[0].innerHTML;
		let itemNameRef = details.getElementsByClassName('itemName')[0].innerHTML;
		let itemQuantity = details.getElementsByClassName('itemQuantity')[0].innerHTML;
		let itemPriceRef = details.getElementsByClassName('itemPrice')[0].innerHTML;
		console.log(itemTypeRef);
		addDoc(colRefCart, {

			ucType: itemTypeRef,
			ucDescription: itemDescriptionRef,
			ucEmail: itemTypeRef,
			ucName: itemNameRef,
			ucQuantity: itemQuantity ,
			ucPrice: itemPriceRef
		})
	});

	//el_addToCartBtn.setAttribute("onclick", "addToCart()");
	el_itemPicture.setAttribute('src', doc.data().itemPicture);

	el_addToCartBtn.textContent = "Add To Cart";
	el_itemName.textContent = doc.data().itemName;
	el_itemPrice.textContent = doc.data().itemPrice;
	el_itemQuantity.textContent = doc.data().itemName;
	el_itemDescription.textContent = doc.data().itemName;
	el_itemType.textContent = doc.data().itemType;

	division.appendChild(el_itemName);
	division.appendChild(el_itemPrice);
	division.appendChild(el_itemQuantity);
	division.appendChild(el_itemDescription);
	division.appendChild(el_itemType);
	division.appendChild(el_itemPicture);
	division.appendChild(el_addToCartBtn);

	let type = doc.data().itemType;
	if (type == "actionbusts") {
		productactionbustsList.appendChild(division);
	} else if (type == "bobbleheads") {
		productbobbleheadsList.appendChild(division);
	} else if (type == "genshinpets") {
		productgenshinpetsList.appendChild(division);
	} else if (type == "genshinphotocards") {
		productgenshinphotocardsList.appendChild(division);
	}

};
