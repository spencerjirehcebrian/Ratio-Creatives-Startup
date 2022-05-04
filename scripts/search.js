const searchicon = document.querySelector('.searchicon');
let cookieSearch = Cookies.get('cookieSearch');
document.getElementById("mySearch").value = cookieSearch;

import Cookies from "./js.cookie.mjs";
console.log(cookieSearch);

searchicon.addEventListener('click', (e) => {
  e.preventDefault()
  let searchRef = document.getElementById("mySearch").value;

  let cookieSearch = Cookies.get('cookieSearch');

  console.log(searchRef);
  if (cookieSearch == null || cookieSearch == undefined || cookieSearch == "" ||cookieSearch == "null" || cookieSearch == "undefined"){
    Cookies.set('cookieSearch', " ")
  }
  else{
    Cookies.set('cookieSearch', searchRef)
    console.log(cookieSearch);
  }

  window.open("../customerView/product.html", "_self");

})
