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

import { db } from "./firebaseConfig.js";

export function deleteCart(p1) {
const docRef = doc(db, 'userCart', p1)
    //console.log(docRef);
deleteDoc(docRef)
  .then(() => {
    alert("Delete Successful")
    location.reload();
  })
}
