window.addEventListener('DOMContentLoaded', ()=>{
  const token = localStorage.getItem("token") || "";
  document.getElementById("changeable-js")?.setAttribute("src", "/main.js?token=" + token);
  document.getElementById("changeable-css")?.setAttribute("href", "/main.css?token=" + token);
});