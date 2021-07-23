const recipeKey = "70516f6e9f1db69f66850da24b13cac0";
const recipeId = "af4ea1f8";
const restaurantKey = "abedd9965f4dfa8202f12142a2545cf8";
const cookEl = $("#cook");
const takeoutEl = $("#submitBtn");
var foodSearch = $("#foodSearch");
var restaurantSearch = $("#restaurantSearch");
var food = "";
var restaurant = "";

// Recipe API

function fetchRecipeData() {

    fetch(`https://api.edamam.com/search?q=${food}&app_id=${recipeId}&app_key=${recipeKey}&from=0&to=20`)
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
                    <div id="imgBx"> 
                        <img id="resultImg" src=${data.recipe.image} alt="Food Image"</img>
                        <h1 class="title">${data.recipe.label}</h1>
                        <a class="view-btn" target="_blank" href="${data.recipe.url}">View Recipe</a>
                    </div>
                    <div class="data-details">
                    <p class="data">Calories: ${data.recipe.calories.toFixed(2)}</p>
                    <p class="data">Diet label: ${data.recipe.dietLabels.length > 0? data.recipe.dietLabels: "No Data Found"}</p>
                    <p class="data">Health labels: ${data.recipe.healthLabels}</p>
                    </div>
                </div>`;
                })
                .join("");
            document
                .getElementById("results-container")
                .insertAdjacentHTML("afterbegin", html);
        })
        .catch((error) => {
            console.log(error);
        });
}
fetchRecipeData();

// Recipe event listener
$("#cook").click(function(event) {
    event.preventDefault();
    food = foodSearch.val();
    fetchData();
});

// Resturant API
function fetchRestaurantData() {

    fetch(`https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${restaurant}&&key=${restaurantKey}`)

        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
}
fetchRestaurantData();

// Restaurant event listener
$("#submitBtn").click(function(event) {
    event.preventDefault();
    restaurant = restaurantSearch.val();
    zipSearch = zipCode.val();
    fetchRestaurantData();
});

// https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=${restaurant}&zip_code=${zipSearch}&key=${restaurantKey}