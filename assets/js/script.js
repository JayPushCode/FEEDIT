const recipeKey = "70516f6e9f1db69f66850da24b13cac0";
const recipeId = "af4ea1f8";
const cookEl = $("#cook");
const takeoutEl = $("#submitBtn");
const drinkEl = $("#drink");
var foodSearch = $("#foodSearch");
var food = "popular";
var drinkSearch = $("#drinksSearch");
var drink = "";


function clearSearch() {
    searchHistory = [];
    renderSearchHistory();
}

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
                    <br>
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
fetchData();

// Recipe event listener
$("#cook").click(function(event) {
    event.preventDefault();
    food = foodSearch.val();
    fetchData();

    // Search history
    searchHistory.push(food);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
});

// Drinks API
function fetchDrinksData() {
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
                    let ingredients = '';
                    let ingredientNum = 1;

                    while (data[`strIngredient${ingredientNum}`]) {
                        const ingredient = data[`strIngredient${ingredientNum}`];
                        const measure = data[`strMeasure${ingredientNum}`];
                        ingredients += `<p class="data">Ingredient ${ingredientNum}: ${measure}: ${ingredient}</p>`;
                        ingredientNum++;
                    }

                    return ` <div class="item">
                <div id="imgBx"> 
                  <img id="resultImg" src=${data.strDrinkThumb} alt="Drink Image"</img>
                  <h1 class="title">${data.strDrink}</h1>
                </div>
                <div class="data-details">
                    ${ingredients}
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
fetchDrinksData();

// Drinks event listener
$("#drink").click(function(event) {
    event.preventDefault();
    drink = drinkSearch.val();
    fetchDrinksData();

    // Search history
    searchHistory.push(drink);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
});

// Local storage