const cookEl = document.getElementById("cook");
const takeoutEl = document.getElementById("takeout");
const APP_ID = "af4ea1f8";
const APP_key = "70516f6e9f1db69f66850da24b13cac0";
let searchQuery = document.querySelector("#foodsearch");


function fetchData() {
    fetch(`https://api.edamam.com/search?q=pizza&app_id=af4ea1f8&app_key=70516f6e9f1db69f66850da24b13cac0&from=0&to=20`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }
            return response.json();
        }).then(data => {
            console.log(data.hits);
            const html = data.hits.map(data => {
                    return `
                <div class="item">
                    <div> 
                        <img src=${data.recipe.image} alt="Food Image"</img>
                        <h1 class="title">${data.recipe.label}</h1>
                        <a class="view-btn" target="_blank" href="${data.recipe.url}">View Recipe</a>
                    </div>
                    <div>
                    <p class="data">Calories: ${data.recipe.calories.toFixed(2)}</p>
                    <p class="data">Diet label: ${data.recipe.dietLabels.length > 0 ? data.recipe.dietLabels: "No Data Found"}</p>
                    <p class="data">Health labels: ${data.recipe.healthLabels}</p>
                    </div>
                </div>`;
                })
                .join("")
            console.log(html);
            document.getElementById("recipe-results-container").insertAdjacentHTML("afterbegin", html);
        }).catch(error => {
            console.log(error);
        });
}


fetchData();




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

// Resturant API

// const settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://worldwide-restaurants.p.rapidapi.com/typeahead",
//   "method": "POST",
//   "headers": {
//       "content-type": "application/x-www-form-urlencoded",
//       "x-rapidapi-key": "c93426bca1msh85e091a6e2679b7p1b7275jsn85ff73249622",
//       "x-rapidapi-host": "worldwide-restaurants.p.rapidapi.com"
//   },
//   "data": {
//       "q": "band",
//       "language": "en_US"
//   }
// };

// $.ajax(settings).done(function(response) {
//   console.log(response);
// });