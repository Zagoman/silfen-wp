window.addEventListener("DOMContentLoaded", dataFetch);

function init(data) {
  const template = document.querySelector("#product-temp").content;
  const grid = document.querySelector(".product-list");
  data.forEach((el) => showProduct(el, grid, template));
  console.log(template);
}

function showProduct(el, parent, template) {
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

  parent.appendChild(clone);
}

async function dataFetch() {
  const res = await fetch(
    "https://lucaszago.dk/silfen-wp/wp-json/wp/v2/product?_embed"
  );
  const data = await res.json();

  init(data);
}
