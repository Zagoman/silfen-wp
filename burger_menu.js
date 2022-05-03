document.querySelector("button").addEventListener("click", function () {
    change();
  });
  
  function change() {
    console.log("clicked");
    document.querySelector(".container_menu").classList.toggle("open");
  }