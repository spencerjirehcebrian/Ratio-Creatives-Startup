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
serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

import { db, storage } from "./firebaseConfig.js";

var picURL = "";

const colRefInventory = collection(db, 'inventory') //collection reference



//realtime sub
onSnapshot(colRefInventory, (snapshot)=>{
  let inventory = []
  snapshot.docs.forEach((doc) => {
    inventory.push({ ...doc.data(), id: doc.id })
  })
  console.log(inventory)
})

// adding
const addInvForm = document.querySelector('.addInventory');
addInvForm.addEventListener('submit', (e) => {
  e.preventDefault()
  uploadProcess();
  promiseLoop();
  function promiseLoop () {
      if (picURL == ""){
        setTimeout(() => promiseLoop(), 3000);
      }
      else{
        try{
          //let awaitURL = await i;
          addDoc(colRefInventory, {
            itemName: addInvForm.itemName.value,
            itemPrice:addInvForm.itemPrice.value,
            itemQuantity :addInvForm.itemQuantity.value,
            itemPicture: picURL,
            itemDescription: addInvForm.itemDescription.value,
            itemType: addInvForm.itemType.value
            })
          .then(()=>{
            addInvForm.reset()
            picURL = "";
            })
          }
            catch (e){
              alert(e);
          }
      }
  }
});

// updating
const updateInvForm = document.querySelector('.updateInventory');
const updateOrderBtn = document.getElementById('updateItemBtn');

updateOrderBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'inventory', updateInvForm.itemId.value)

  updateDoc(docRef, {
    itemName: updateInvForm.itemName.value,
    itemPrice: updateInvForm.itemPrice.value,
    itemQuantity:updateInvForm.itemQuantity.value,
    itemPicture: updateInvForm.itemPicture.value,
    itemDescription: updateInvForm.itemDescription.value,
    itemType: addInvForm.itemType.value
  	})
  	.then(()=>{
  		updateInvForm.reset()
  	})

});

//deleting
const deleteOrderBtn = document.getElementById('deleteItemBtn');
deleteOrderBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'inventory', updateInvForm.itemId.value)

  deleteDoc(docRef)
  	.then(()=>{
  		updateInvForm.reset()
  	})
});

//storage initialization and image management
import { ref as sRef,
uploadBytesResumable,
getDownloadURL} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

var files = [];
var reader = new FileReader();

var itemPictureName = document.getElementById('itemPictureName');
var extLab = document.getElementById('extLab');
var imgDemo = document.getElementById('imgDemo');
var upProcess = document.getElementById('upProcess');
var selectBtn = document.getElementById('selectBtn');
var uploadBtn = document.getElementById('uploadBtn');
var retrieveBtn = document.getElementById('retrieveBtn');

var input = document.createElement('input');
input.type = 'file';

input.onchange = (e) => {
  files = e.target.files;

  reader.readAsDataURL(files[0]);
  console.log(files[0]);
  var extentionPic = GetFileExt(files[0]);//selects only one file
  var namePic = GetFileName(files[0]);
  itemPictureName.value = namePic;
  extLab.innerHTML = extentionPic

}

reader.onload = function(){
  imgDemo.src = reader.result;
}

selectBtn.onclick = function(){
  input.click();
}

function GetFileExt(file){
  let temp = file.name.split('.');
  let ext = temp.slice(temp.length-1,temp.length);
  return '.'+ ext[0];
}

function GetFileName(file){
  let temp = file.name.split('.');
  let fname = temp.slice(0,-1).join('.');
  return fname;
}

//image upload
//uploadBtn.onclick = uploadProcess;
async function uploadProcess(){
  let imgToUpload = files[0];
  let imgName = itemPictureName.value + extLab.innerHTML;
  console.log(imgName);
  /*const metaData = {
    contentType: imgToUpload.type
  }*/

  const storageRef = sRef(storage, "Images/"+imgName);

  const uploadTask = uploadBytesResumable(storageRef, imgToUpload/*, metaData*/);

  uploadTask.on('state-changed', (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    upProcess.innerHTML = "Upload "+progress+"%";
  },

  (error) => {
    alert("error");
  },

  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
      picURL = downloadURL;
      console.log(picURL);
    });
  }
  );
};

async function getURLfromFirebase(){
  let name = itemPictureName.value;
  //const docRef =  doc(db, 'inventory', name);
  const q = query(collection(db, "inventory"), where("itemName", "==", name));
  const docSnap = await getDocs(q);
  console.log(q);

  const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    console.log(doc.data().itemPicture);
    imgDemo.src = doc.data().itemPicture;
  })
}

//retrieveBtn.onclick = getURLfromFirebase;
