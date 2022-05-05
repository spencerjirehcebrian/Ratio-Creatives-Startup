import Cookies from "./js.cookie.mjs";

document.querySelectorAll('.submitbutton').forEach(item => {
  item.addEventListener('click', event => {
    window.open('artform2.html', 'Layout Commission Form 2', 'width=1003,height=457');
    window.close();
  })
})
