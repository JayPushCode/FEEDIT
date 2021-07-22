const cookEl = document.getElementById("cook");
const takeoutEl = document.getElementById("takeout");
let searchQuery = document.querySelector("#foodsearch");
var foodSearch = $("#foodsearch");
var food = "";

function fetchData() {
  var searchUrl =
    "https://api.edamam.com/search?q=" +
    food +
    "&app_id=af4ea1f8&app_key=70516f6e9f1db69f66850da24b13cac0&from=0&to=20";

  fetch(searchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.hits);
      const html = data.hits
        .map((data) => {
          return ` <div class="item">
                    <div> 
                        <img src=${data.recipe.image} alt="Food Image"</img>
                        <h1 class="title">${data.recipe.label}</h1>
                        <a class="view-btn" target="_blank" href="${
                          data.recipe.url
                        }">View Recipe</a>
                    </div>
                    <div class="data-details">
                    <p class="data">Calories: ${data.recipe.calories.toFixed(
                      2
                    )}</p>
                    <p class="data">Diet label: ${
                      data.recipe.dietLabels.length > 0
                        ? data.recipe.dietLabels
                        : "No Data Found"
                    }</p>
                    <p class="data">Health labels: ${
                      data.recipe.healthLabels
                    }</p>
                    </div>
                </div>`;
        })
        .join("");
      document
        .getElementById("recipe-results-container")
        .insertAdjacentHTML("afterbegin", html);
    })
    .catch((error) => {
      console.log(error);
    });
}

// fetchData() from search query on "Show me reccipes" Btn;

$("#cook").click(function () {
  event.preventDefault();
  food = foodSearch.val();
  fetchData();
});

// Resturant API
function fetchResturantData() {
  fetch(
    `https://api.documenu.com/v2/restaurant/4072702673999819?key=abedd9965f4dfa8202f12142a2545cf8`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.hits);
    });
}
fetchResturantData();
