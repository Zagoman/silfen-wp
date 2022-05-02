window.addEventListener("DOMContentLoaded", dataFetch);

class ProductList {
  constructor(data) {
    this._template = document.querySelector("#product-temp").content;
    this._grid = document.querySelector(".product-list");
    this._Init(data);
  }

  _Init(data) {
    data.forEach((el) => this._ShowProduct(el, this._grid, this._template));
  }

  _ShowProduct(el, parent, template) {
    const clone = template.cloneNode(true);
    //   adding the image
    clone.querySelector("img").src = el.thumbnail.guid;
    clone.querySelector("img").alt = el.productname;

    //   adding the Titles
    clone.querySelector("h2").textContent = el.productname;
    clone.querySelector(".price-tag > span").textContent = el.price;

    // Adding color
    clone.querySelector(".product-color div").style.backgroundColor = el.colors;

    // Feed the link
    clone.querySelector("a").href = `./product.html?product=${el.id}`;
    clone.querySelector("a.--link").href = `./product.html?product=${el.id}`;

    parent.appendChild(clone);
  }
}

let _productList = null;
async function dataFetch() {
  const res = await fetch(
    "https://lucaszago.dk/silfen-wp/wp-json/wp/v2/product?_embed"
  );
  const data = await res.json();

  _productList = new ProductList(data);
}
