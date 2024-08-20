//!=====  HTML ELEMENTS =====!\\
const cards = document.querySelector(".cards");
const buttons = document.querySelectorAll(".btn");
const searchBar = document.querySelector(".search-bar");
//!=====  variables =====!\\
const apiLink = "https://fakestoreapi.com/products";
let elements;
let productNames;
let productData = [];
let searchedData = [];
let currentFilter = "All";
let currentSort = "Default";
//!=====  FUNCTIONS =====!\\
async function getProducts() {
  const res = await fetch(apiLink);
  const data = await res.json();
  productData = data;
  displayCards(data);
  filterAndSortProducts();
}
getProducts();

function displayCards(data) {
  let box = "";
  for (let i = 0; i < data.length; i++) {
    box += `
        <div class="col-md-4 ">
            <div class=" m-4 px-4 py-2  card  ">
                    <img class="w-100" src=${data[i]?.image} alt="">
                    <h5 class="text-center product-title">${data[i]?.title}</h5>
                    <p class="text-center product-Price">Price: ${data[i]?.price}</p>
            </div>
        </div>  
        `;
  }
  cards.innerHTML = box;
  elements = document.querySelectorAll(".card");
  productNames = document.querySelectorAll(".product-title");
}

function filterAndSortProducts() {
  let filteredData = productData;
  if (currentFilter !== "All") {
    filteredData = productData.filter(
      (product) =>
        product.category.toLowerCase() === currentFilter.toLowerCase()
    );
  }
  if (currentSort === "LowToHigh") {
    filteredData.sort((a, b) => a.price - b.price);
  } else if (currentSort === "HighToLow") {
    filteredData.sort((a, b) => b.price - a.price);
  } else if (currentSort === "Name") {
    filteredData.sort((a, b) => a.title.localeCompare(b.title));
  }
  displayCards(filteredData);
}

function filterProduct(filter) {
  currentFilter = filter;
  buttons.forEach((button) => {
    if (filter.toLowerCase() == button.innerText.toLowerCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
  filterAndSortProducts();
}

function sortProduct(order) {
  currentSort = order;
  filterAndSortProducts();
}

//!=====  EVENTS =====!\\
searchBar.addEventListener("input", (e) => {
  let value = e.target.value;
  searchedData = productData.filter((product) => {
    return product.title.toLowerCase().includes(value.toLowerCase());
  });
  displayCards(searchedData);
});
