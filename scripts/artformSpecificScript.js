import Cookies from "./js.cookie.mjs";


let buttonRefLong = document.querySelector(".bustcard");
let buttonRefSweet = document.querySelector(".fullrendercard");

 buttonRefSweet.addEventListener('click', (e) => {
  e.preventDefault();
  let commDescriptionRef = Cookies.get("commDescription");
  commDescriptionRef += " Bust Card"
  console.log(commDescriptionRef);
  Cookies.set("commDescription", commDescriptionRef);
  window.open('artform3.html', 'Layout Commission Form 2', 'width=1003,height=457');
  window.close();
});

buttonRefLong .addEventListener('click', (e) => {
  e.preventDefault();
  let commDescriptionRef = Cookies.get("commDescription");
  commDescriptionRef += " Full Render Card"
  console.log(commDescriptionRef);
  Cookies.set("commDescription", commDescriptionRef);
  window.open('artform3.html', 'Layout Commission Form 2', 'width=1003,height=457');
  window.close();
});
