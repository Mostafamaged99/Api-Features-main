//!=====  HTML ELEMENTS =====!\\
const cards = document.querySelector(".cards");
const buttons = document.querySelectorAll(".btn");
const searchBar = document.querySelector(".search-bar");
//!=====  variables =====!\\
const apiLink = "https://fakestoreapi.com/products";
let elements;
let productNames;
let productData = [];
//!=====  FUNCTIONS =====!\\
async function getProducts() {
  const res = await fetch(apiLink);
  const data = await res.json();
  productData = data;
  displayCards(data);
  filterProduct("All");
  console.log(data);
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

// // function filterProduct(value) {
// //   buttons.forEach((button) => {
// //     if (value.toLowerCase() == button.innerText.toLowerCase()) {
// //       button.classList.add("active");
// //     } else {
// //       button.classList.remove("active");
// //     }
// //     elements?.forEach((element) => {
// //       if (value == "All") {
// //         element.classList.remove("hidden");
// //       } else {
// //         if (element.classList.contains(value)) {
// //           element.classList.remove("hidden");
// //         } else {
// //           element.classList.add("hidden");
// //         }
// //       }
// //     });
// //   });
// // }

function filterProduct(filter) {
    let filteredData = [...productData];
    buttons.forEach((button) => {
      if (filter.toLowerCase() == button.innerText.toLowerCase()) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
    if (filter !== "All") {
      filteredData = productData.filter((product) =>
        product.category.toLowerCase() === filter.toLowerCase()
      );
    }
    displayCards(filteredData);
  }

function sortProduct(order) {
  let sortedData = [...productData];
  if (order === "LowToHigh") {
    sortedData.sort((a, b) => a.price - b.price);
  } else if (order === "HighToLow") {
    sortedData.sort((a, b) => b.price - a.price);
  } else if (order === "Default") {
    sortedData = [...productData];
  } else if (order === "Name") {
    sortedData.sort((a, b) => a.title.localeCompare(b.title));
  }
  displayCards(sortedData);
  filterProduct("All");
}

//!=====  EVENTS =====!\\
searchBar.addEventListener("input", (e) => {
  let value = e.target.value;
  productNames?.forEach((name, i) => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      elements[i].classList.remove("hidden");
    } else {
      elements[i].classList.add("hidden");
    }
  });
});

//!=====  EVENTS =====!\\
// searchBar.addEventListener("input", (e) => {
//   const value = e.target.value.toLowerCase();
//   elements.forEach((element) => {
//     const title = element.querySelector(".product-title").innerText.toLowerCase();
//     if (title.includes(value)) {
//       element.classList.remove("hidden");
//     } else {
//       element.classList.add("hidden");
//     }
//   });
// });
