const recipeKey = "70516f6e9f1db69f66850da24b13cac0";
const recipeId = "af4ea1f8";
const cookEl = $("#cook");
const takeoutEl = $("#submitBtn");
const drinkEl = $("#drink");
var foodSearch = $("#foodSearch");
var food = "popular";
var drinkSearch = $("#drinksSearch");
var drink = "";


// Recipe API
function fetchData() {

    fetch(`https://api.edamam.com/search?q=${food}&app_id=${recipeId}&app_key=${recipeKey}&from=0&to=20`)
        
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then((data) => {
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
                    <p class="data">Diet label: ${data.recipe.dietLabels.length > 0 ? data.recipe.dietLabels : "No Data Found"}</p>
                    <p class="data">Health labels: ${data.recipe.healthLabels}</p>
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

// This preloads the website with recipes with the search criteria of popular recipes
// This keeps page filled instead of empty
// It will get overwritten when users enter a a new food to search
fetchData();

// Recipe event listener
$("#cook").click(function(event) {
    event.preventDefault();
    food = foodSearch.val();
    fetchData();
});



// Drinks API
function fetchDrinksData() {
    // https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
    drinkURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink;

    fetch(drinkURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        })
        .then((data) => {
            let drinks = data.drinks
            console.log(drinks)
            let html = drinks.map((data) => {
                    return ` <div class="item">
                    <div id="imgBx"> 
                      <img id="resultImg" src=${data.strDrinkThumb} alt="Drink Image"</img>
                      <h1 class="title">${data.strDrink}</h1>
                    </div>
                    <div class="data-details">
                      <p class="data">Ingredient 1: ${data.strMeasure1}: ${data.strIngredient1}</p>
                      <p class="data">Ingredient 2: ${data.strMeasure2}: ${data.strIngredient2}</p>
                      <p class="data">Ingredient 3: ${data.strMeasure3}: ${data.strIngredient3}</p>
                      <p class="data">Ingredient 4: ${data.strMeasure4}: ${data.strIngredient4}</p>
                      <p class="data">Ingredient 5: ${data.strMeasure5}: ${data.strIngredient5}</p>
                    </div>
                    <div class="instructions">
                      <p class="data">Instructions: ${data.strInstructions}</p>
                    </div>
                </div>`;
                })
                .join("");
            document
                .getElementById("drinks-results-container")
                .insertAdjacentHTML("afterbegin", html);
        })
        .catch((error) => {
            console.log(error);
        });
}
// fetchDrinksData();

// Drinks event listener
$("#drink").click(function(event) {
    event.preventDefault();
    drink = drinkSearch.val();
    fetchDrinksData();
});
