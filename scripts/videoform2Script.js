import Cookies from "./js.cookie.mjs";

document.querySelectorAll('.submitbutton').forEach(item => {
  item.addEventListener('click', event => {
    window.open('videospecific.html', 'Video Commission Specific', 'width=1003,height=457');
    window.close();
  })
})
