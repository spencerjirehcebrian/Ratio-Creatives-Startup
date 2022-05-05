import Cookies from "./js.cookie.mjs";


let buttonRefLong = document.querySelector(".publicitycard");
let buttonRefSweet = document.querySelector(".socialcard");

 buttonRefSweet.addEventListener('click', (e) => {
  e.preventDefault();
  let commDescriptionRef = Cookies.get("commDescription");
  commDescriptionRef += " Publicity Card"
  console.log(commDescriptionRef);
  Cookies.set("commDescription", commDescriptionRef);
  window.open('layoutform3.html', 'Layout Commission Form 2', 'width=1003,height=457');
  window.close();
});

buttonRefLong .addEventListener('click', (e) => {
  e.preventDefault();
  let commDescriptionRef = Cookies.get("commDescription");
  commDescriptionRef += " Social Card"
  console.log(commDescriptionRef);
  Cookies.set("commDescription", commDescriptionRef);
  window.open('layoutform3.html', 'Layout Commission Form 2', 'width=1003,height=457');
  window.close();
});
