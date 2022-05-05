import Cookies from "./js.cookie.mjs";


let buttonRef = document.querySelector(".proceednext");

buttonRef.addEventListener('click', (e) => {
  e.preventDefault();
  let commDescriptionRef = document.getElementById("form1text").value;
  console.log(commDescriptionRef);
  Cookies.set("commDescription", commDescriptionRef);
  console.log(Cookies.get("commDescription"));
  window.open('videoform2.html', 'Video Commission Form 2', 'width=1003,height=457');
  window.close();
});
