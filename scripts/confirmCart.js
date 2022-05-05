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

const colRefCart = collection(db, 'userCart') //collection reference

let quantityVar = 0;
let priceVar = 0;
let priceComm = 0;
let shippingFee = 25.00;

const cookieEmail = Cookies.get('userEmail');
const cookieName = Cookies.get('userName');
const cookieAddress = Cookies.get('userAddress');
const cookieContact = Cookies.get('userContact');

const q = query(colRefCart, where("ucEmail","==",cookieEmail))
onSnapshot(q, (snapshot) => {
    let col = []
    snapshot.docs.forEach((doc) => {
        renderDocument(doc);
    })
})

const confirmOrderList = document.querySelector('#oclList');
const confirmCommissionList = document.querySelector('#oclListComm');
function renderDocument(doc) {
    let division = document.createElement('div');
    let el_ucCommissionType = document.createElement('h1');
    let el_ucDescription = document.createElement('h1');
    let el_ucEmail = document.createElement('h1');
    let el_ucName = document.createElement('h1');
    let el_ucPrice = document.createElement('h1');
    let el_ucQuantity = document.createElement('h1');
    let el_ucPicture = document.createElement('img');

    /*el_ucCommissionType.setAttribute("class", "ucCommissionType");
    el_ucDescription.setAttribute("class", "ucDescription");
    el_ucEmail.setAttribute("class", "ucEmail");
    el_ucName.setAttribute("class", "ucName");
    el_ucPrice.setAttribute("class", "ucPrice");
    el_ucQuantity.setAttribute("class", "ucQuantity");
    el_ucPicture.setAttribute("class", "ucPicture");*/

    division.setAttribute("id", doc.id);
    division.setAttribute("class", "oclDiv");

    el_ucPicture.setAttribute('src', doc.data().ucPicture);

    el_ucCommissionType.textContent = doc.data().ucType;
    el_ucDescription.textContent = doc.data().ucDescription;
    el_ucEmail.textContent = doc.data().ucEmail;
    el_ucName.textContent = doc.data().ucName;
    el_ucPrice.textContent = "Total Price: PHP "+doc.data().ucPrice;
    el_ucQuantity.textContent = "Quantity: "+doc.data().ucQuantity+"x";

    el_ucPicture.setAttribute("class","cartitem");

    //el_ucCommissionType.setAttribute("class","cartdesc");
    el_ucName.setAttribute("class","ocitemname");
    el_ucQuantity.setAttribute("class", "ocquantity");
    el_ucPrice.setAttribute("class","octotalprice");
    el_ucPicture.setAttribute("class","ocprodimage");

    //division.appendChild(el_ucEmail);
    division.appendChild(el_ucPicture);
    division.appendChild(el_ucName);

    division.appendChild(el_ucQuantity);
    division.appendChild(el_ucPrice);

    //division.appendChild(el_ucQuantityUpBtn);
    //division.appendChild(el_ucQuantityDownBtn);



    let type = doc.data().ucType;

    let division2 = document.createElement('div');
    let commImageType = document.querySelector('.ocfilmsize');
    let commNameType = document.querySelector('.oceditingtext');
    let commDesc = document.querySelector('.occomideatext');

    let displayUsername = document.querySelector('#displayUsername');
    let displayEmail = document.querySelector('#displayEmail');

    let displayCommisionType = document.querySelector('#displayCommisionType');
    let displayCommissionPayment = document.querySelector('#displayCommissionPayment');

    let displayQuantity = document.querySelector('#displayQuantity')
    let displayShippingType = document.querySelector('#displayShippingType');
    let displayOrderPayment = document.querySelector('#displayOrderPayment');
    let displayShippingPayment = document.querySelector('#displayShippingPayment');
    let displayPayment = document.querySelector('#displayPayment');

    //NOT YET IMPLEMENTED
    let displayContact  = document.querySelector('#displayContact');
    let displayDate  = document.querySelector('#displayDate');
    let displayAddress  = document.querySelector('#displayAddress');

    if ((type == "Commission - Video Editing")||(type == "Commission - Layout")||(type == "Commission - Art Commissions")){
      if (type == "Commission - Video Editing"){
        //src="./assets/Icons/film.png"
        commImageType.setAttribute("src","./assets/Icons/film.svg");
      }else if (type == "Commission - Layout"){
        //src="./assets/Icons/dashboard.png"
        commImageType.setAttribute("src","./assets/Icons/dashboard.png");
      }else if(type == "Commission - Art Commissions"){
        //src="./assets/Icons/paint-brush.svg"
        commImageType.setAttribute("src","./assets/Icons/paint-brush.svg");
      }
      commNameType.textContent = doc.data().ucType;
      commDesc.textContent = doc.data().ucDescription;
      displayCommisionType.textContent = doc.data().ucType;

      priceComm = doc.data().ucPrice;
      displayCommissionPayment.textContent = "PHP "+ priceComm +".00";
      }
      else{
      confirmOrderList.appendChild(division);
      priceVar += parseInt(doc.data().ucPrice);
      quantityVar += parseInt(doc.data().ucQuantity);
      displayOrderPayment.textContent = "PHP "+ priceVar +".00";
      displayShippingPayment.textContent = "PHP "+ shippingFee +".00";
      displayQuantity.textContent = quantityVar + " items";
      let priceTotal = parseInt(priceVar) + parseInt(priceComm) + parseInt(shippingFee);
      Cookies.set('totalPrice', priceVar);
      displayPayment.textContent = "PHP "+ priceTotal +".00";
    }
    displayUsername.textContent = cookieName;
    displayEmail.textContent = cookieEmail;
    displayContact.textContent = cookieContact;
    displayDate.textContent = Cookies.get('currentDate'); //NEEDS IMPLEMENTATION
    displayAddress.textContent = cookieAddress; //NEEDS IMPLEMENTATION


};
