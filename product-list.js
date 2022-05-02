window.addEventListener("DOMContentLoaded", dataFetch);

class ProductList {
  constructor(data, id = null) {
    this._template = document.querySelector("#product-temp").content;
    this._container = document.querySelector(".product-list");
    this._id = id;
    this._Init(data);
  }

  _Init(data) {
    data.forEach((el) => {
      if (!this._id) {
        this._ShowProduct(el, this._container, this._template);
      } else {
        this._ShowProduct(el, this._container, this._template, this._id);
      }
    });
  }

  _ShowProduct(el, container, template, id) {
    if (el.id != id) {
      const clone = template.cloneNode(true);
      //   adding the image
      clone.querySelector("img").src = el.thumbnail.guid;
      clone.querySelector("img").alt = el.productname;

      //   adding the Titles
      clone.querySelector("h2").textContent = el.productname;
      clone.querySelector(".price-tag > span").textContent = el.price;

      // Adding color
      clone.querySelector(".product-color div").style.backgroundColor =
        el.colors;

      // Feed the link
      clone.querySelector("a").href = `./product.html?product=${el.id}`;
      clone.querySelector("a.--link").href = `./product.html?product=${el.id}`;

      container.appendChild(clone);
    }
  }
}

let _productList = null;
async function dataFetch() {
  const res = await fetch(
    "https://lucaszago.dk/silfen-wp/wp-json/wp/v2/product?_embed"
  );
  const data = await res.json();
  if (window.location.search) {
    _productList = new ProductList(data, product);
  } else {
    _productList = new ProductList(data);
  }
}
