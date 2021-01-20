var APIKey = "79f78d4405a86f3c387469b830755e28";
var cityName = "Adelaide"

function getWeather() {
    // Execute a current weather get request from open weather api
    let userQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + APIKey;
    console.log(userQueryURL)

    $.ajax({
        url: userQueryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        var wholeTemp = response.main.temp;
        var newTemp = parseInt(wholeTemp, 10);

        $("#city").html(response.name);
        $("#temp").html(newTemp + "\u00B0");
        $("#date").text(moment().format("dddd, MMMM Do YYYY"));
        $("#hum").html("<b>Humidity: </b>" + response.main.humidity + "%");
        $("#wind").html("<b>Wind Speed: </b>" + response.wind.speed + " Km/H");

        // Weather Icons
        if (response.weather[0].main === "Clouds") {
            $("#weatherIcon").empty();
            var icon = $("<img>")
            icon.attr("src", "img/clouds.png")
            $("#weatherIcon").append(icon);
        } else if (response.weather[0].main === "Clear") {
            $("#weatherIcon").empty();
            var icon = $("<img>")
            icon.attr("src", "img/clear.png")
            $("#weatherIcon").append(icon);
        } else if (response.weather[0].main === "Mist") {
            $("#weatherIcon").empty();
            var icon = $("<img>")
            icon.attr("src", "img/rain.png")
            $("#weatherIcon").append(icon);
        } else if (response.weather[0].main === "Rain") {
            $("#weatherIcon").empty();
            var icon = $("<img>")
            icon.attr("src", "img/rain.png")
            $("#weatherIcon").append(icon);
        } else if (response.weather[0].main === "Wind") {
            $("#weatherIcon").empty();
            var icon = $("<img>")
            icon.attr("src", "img/wind.png")
            $("#weatherIcon").append(icon);
        } else if (response.weather[0].main === "Thunder") {
            $("#weatherIcon").empty();
            var icon = $("<img>")
            icon.attr("src", "img/thunder.png")
            $("#weatherIcon").append(icon);
        } else if (response.weather[0].main === "Partial Clouds") {
            $("#weatherIcon").empty();
            var icon = $("<img>")
            icon.attr("src", "img/partialclouds.png")
            $("#weatherIcon").append(icon);
        } else {
            $("#weatherIcon").empty();
        }

        //  Get UV Index
        var lati = response.coord.lat;
        console.log(lat);
        var long = response.coord.lon;
        console.log(lon);
        var UVQueryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lati + "&lon=" + long + "&appid=" + APIKey "&cnt=0";
         $.ajax({
             url: UVQueryURL,
             method: "GET",
         }).then(function (response) {
             console.log(response);
        //      $("#uv").html("<b>UV Index: </b>" + response[0].value);

        //      if (response[0].value < 4) {
        //          $("#uv").attr("class", "success");
        //      }
        //      else if (response[0].value < 8) {
        //          $("#uv").attr("class", "warning");
        //      }
        //      else {
        //          $("#uv").attr("class", "danger");
        //      }
        //  }

        //Get 5-Day Forecast
        var forecastCity = response.name;
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + forecastCity + "&appid=" + APIKey;

        $.ajax({
            url: forecastQueryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);


        });
    });
};

getWeather();

let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// Get history from local storage if any
$("searchBtn").click(function () {
    const searchTerm = $("#searchBtn").val();
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderButtons();
})
// Render Funtion button
function renderButtons() {

    // Delete the content inside the searchHistoryContainer div prior to adding new movies
    $("#listBox").empty();

    // Loop through the array of searched cities, then generate buttons for each movie in the array
    for (i = 0; i < searchHistory.length; i++) {
        console.log(searchHistory[i]);

        var historyBtn = $("<button>").text(searchHistory[i]);
        historyBtn.attr("type", "button"),
            historyBtn.attr("class", "btn btn-outline-secondary pastSearch")

        var listDiv = $("<li>").html(historyBtn);
        listDiv.attr("class", "list-group-item");

        $("#listBox").prepend(listDiv);
    }
}

// renderSearchHistory();
// if (searchHistory.length > 0) {
//     getWeather(searchHistory[searchHistory.length - 1]);
// }