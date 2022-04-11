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

const q = query(colRefCart)
onSnapshot(q, (snapshot) => {
    let col = []
    snapshot.docs.forEach((doc) => {
        renderDocument(doc);
    })
})

const userCartList = document.querySelector('#userCartList');
function renderDocument(doc) {
    let division = document.createElement('div');
    let el_ucCommissionType = document.createElement('p');
    let el_ucDescription = document.createElement('p');
    let el_ucEmail = document.createElement('p');
    let el_ucName = document.createElement('p');
    let el_ucPrice = document.createElement('p');
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

    el_ucQuantityUpBtn.addEventListener('click', function() {
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
    });

    //el_addToCartBtn.setAttribute("onclick", "addToCart()");
    el_ucPicture.setAttribute('src', doc.data().ucPicture);

    el_ucQuantityUpBtn.textContent = "QuantityUpBtn";
    el_ucQuantityDownBtn.textContent = "QuantityDownBtn";

    el_ucCommissionType.textContent = doc.data().ucCommissionType;
    el_ucDescription.textContent = doc.data().ucDescription;
    el_ucEmail.textContent = doc.data().ucEmail;
    el_ucName.textContent = doc.data().ucName;
    el_ucPrice.textContent = doc.data().ucPrice;
    el_ucQuantity.textContent = doc.data().ucQuantity;

    division.appendChild(el_ucCommissionType);
    division.appendChild(el_ucDescription);
    division.appendChild(el_ucEmail);
    division.appendChild(el_ucName);
    division.appendChild(el_ucPrice);
    division.appendChild(el_ucQuantity);
    division.appendChild(el_ucPicture);
    division.appendChild(el_ucQuantityUpBtn);
    division.appendChild(el_ucQuantityDownBtn);

    userCartList.appendChild(division);
};
