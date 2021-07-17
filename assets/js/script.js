const cookEl = document.getElementById("cook");
const APP_ID = "af4ea1f8";
const APP_key = "70516f6e9f1db69f66850da24b13cac0";


const takeoutEl = document.getElementById("takeout");

cookEl.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("#foodsearch").value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(foodsearch);
}

// https://api.edamam.com/search?q=pizza&app_id=af4ea1f8&app_key=70516f6e9f1db69f66850da24b13cac0&from=0&to=20

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://worldwide-restaurants.p.rapidapi.com/typeahead",
    "method": "POST",
    "headers": {
        "content-type": "application/x-www-form-urlencoded",
        "x-rapidapi-key": "c93426bca1msh85e091a6e2679b7p1b7275jsn85ff73249622",
        "x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com"
    },
    "data": {
        "q": "band",
        "language": "en_US"
    }
};

$.ajax(settings).done(function(response) {
    console.log(response);
});

// Code to Generate Results on Recipe.html

const resultsEl = document.getElementById("recipe-results-container");



function generateHTML(results) {

    let generatedHTML = "";
    results.map((result) => {
        console.log(result);
        generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-btn" target="_blank" href="${
              result.recipe.url
            }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet label: ${
            result.recipe.dietLabels.length > 0
              ? result.recipe.dietLabels
              : "No Data Found"
          }</p>
          <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
        </div>
      `;
    });
    resultsEl.innerHTML = generateHTML;

};

$("#cook").on("click", generateHTML());