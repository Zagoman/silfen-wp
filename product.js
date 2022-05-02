window.addEventListener("DOMContentLoaded", getData);
let _productPage = null;
const urlParams = new URLSearchParams(window.location.search);
const product = urlParams.get("product");

class ProductPage {
  constructor(data) {
    this._template = document.querySelector("#product-temp2").content;
    this._container = document.querySelector("main");
    this._Init(data);
  }

  _Init(data) {
    this._ShowProduct(data);
    const splide = new Splide(".splide");
    splide.mount();
  }

  _ShowProduct(el) {
    const clone = this._template.cloneNode(true);
    const slider = clone.querySelector(".slider");
    // Adding image src and alt
    el.images.forEach((image) =>
      this._ShowImage(slider, image, el.productname)
    );

    // Adding content
    clone.querySelector("h1").textContent = el.productname;
    clone.querySelector(".price-tag span").textContent = el.price;
    clone.querySelector(".short-desc").textContent = el.shortdescription;

    // adding color
    clone.querySelector(".product-color div").style.backgroundColor = el.colors;
    this._container.prepend(clone);
  }

  _ShowImage(container, image, alt) {
    const liTag = document.createElement("li");
    const imageTag = document.createElement("img");
    imageTag.src = image.guid;
    imageTag.alt = alt;
    liTag.classList.add("splide__slide");
    liTag.append(imageTag);
    container.append(liTag);
  }
}

async function getData() {
  const res = await fetch(
    `https://lucaszago.dk/silfen-wp/wp-json/wp/v2/product/${product}?_embed`
  );
  const data = await res.json();

  _productPage = new ProductPage(data);
}
