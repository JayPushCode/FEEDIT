const cookEl = document.getElementById("cook");
const APP_ID = "af4ea1f8";
const APP_key = "70516f6e9f1db69f66850da24b13cac0";

const takeoutEl = document.getElementById("takeout");


cookEl.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
    console.log(baseUrl);
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
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