const searchicon = document.querySelector('.searchicon');

let cookieSearch;
cookieSearch = Cookies.get('cookieSearch');
document.getElementById("mySearch").value = cookieSearch;
if (cookieSearch == null || cookieSearch == undefined || cookieSearch == "" || cookieSearch == "null" || cookieSearch == "undefined"){
  Cookies.set('cookieSearch', "");
  Cookies.set('cookieSearchActive', "false");
  //document.getElementById("mySearch").value = " ";
}



import Cookies from "./js.cookie.mjs";

searchicon.addEventListener('click', (e) => {
  e.preventDefault()
  let searchRef = document.getElementById("mySearch").value;

  let cookieSearch = Cookies.get('cookieSearch');

  console.log(searchRef);
  if (cookieSearch == null || cookieSearch == undefined || cookieSearch == "" || cookieSearch == "null" || cookieSearch == "undefined"){
    Cookies.set('cookieSearch', "")
    Cookies.set('cookieSearchActive', "false");
  }
  else{
    Cookies.set('cookieSearch', searchRef)
    console.log(cookieSearch);
    Cookies.set('cookieSearchActive', "true");
  }

  window.open("../customerView/product.html", "_self");

})
