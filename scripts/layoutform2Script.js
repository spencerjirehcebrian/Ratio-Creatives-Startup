import Cookies from "./js.cookie.mjs";

document.querySelectorAll('.submitbutton').forEach(item => {
  item.addEventListener('click', event => {
    window.open('layoutspecific.html', 'Layout Commission Specific', 'width=1003,height=457');
    window.close();
  })
})
