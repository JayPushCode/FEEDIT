const cookEl = document.getElementById("cook");
const takeoutEl = document.getElementById("takeout");
let searchQuery = document.querySelector("#foodsearch");
var foodSearch = $('#foodsearch');
var food = "";


function fetchData() {

    var searchUrl = 'https://api.edamam.com/search?q=' + food + '&app_id=af4ea1f8&app_key=70516f6e9f1db69f66850da24b13cac0&from=0&to=20'

    fetch(searchUrl)

        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        }).then(data => {
            console.log(data.hits);
            const html = data.hits.map(data => {
                    return `<img src=${data.recipe.image} alt="Food Image"</img>
                    <div class="flex-container">
                <h1 class="title">${data.recipe.label}</h1>
                <a class="view-btn" target="_blank" href="${data.recipe.url}">View Recipe</a>
              </div>
            <p class="item-data">Calories: ${data.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet label: ${data.recipe.dietLabels.length > 0 ? data.recipe.dietLabels: "No Data Found"}</p>
            <p class="item-data">Health labels: ${data.recipe.healthLabels}</p>
            </div>`;
                })
                .join("")
            document.getElementById("recipe-results-container").insertAdjacentHTML("afterbegin", html);
        }).catch(error => {
            console.log(error);
        });
}

// fetchData();

$("#cook").click(function(){
    event.preventDefault();
    food = foodSearch.val()
    fetchData();
});


// // https://api.edamam.com/search?q=pizza&app_id=af4ea1f8&app_key=70516f6e9f1db69f66850da24b13cac0&from=0&to=20



// function generateHTML(results) {
//     let generatedHTML = "";
//     results.map((result) => {
//         generatedHTML +=
//             `<div class="item">
//         <img src="${result.recipe.image}" alt="img"></img>
//           <div class="flex-container">
//             <h1 class="title">${result.recipe.label}</h1>
//             <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
//           </div>
//         <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
//         <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels: "No Data Found"}</p>
//         <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
//         </div>`;
// //     });
//     resultsEl.innerHTML = generateHTML;
// };

// $("#cook").on("click", generateHTML());

fetchRecipeData();


// Resturant API
function fetchResturantData() {
    fetch(``)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        }).then(data => {

        })
}
fetchResturantData();