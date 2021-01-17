var lat
var long

// On page load display user's current location's weather
if (window.addEventListener) {
    // Mozilla, Netscape, Firefox
    window.addEventListener('load', WindowLoad, false);
} else if (window.attachEvent) {
    // IE
    window.attachEvent('onload', WindowLoad);
}
function WindowLoad(event) {
    console.log("Page Loaded!")
    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos) {
        var crd = pos.coords;

        lat = $(crd.latitude);
        long = $(crd.longitude);
        localStorage.setItem("Latitude", lat[0]);
        localStorage.setItem("Longitude", long[0]);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        alert('Please refresh the page and enable your location sharing.')
    }
};

var userLat = localStorage.getItem("Latitude");
var userLong = localStorage.getItem("Longitude");

// OpenWeather API
var userQueryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLong + "&appid=79f78d4405a86f3c387469b830755e28"

$.ajax({
    url: userQueryURL,
    method: "GET",
}).then(function (response) {
    console.log(response);

    var currentWeather = $("<div>");
    currentWeather.attr("class", "row");

    $("#resultContainer").append(currentWeather)

});

// History variable where the user input is stored.
var searchHistory = ["Adelaide"];

// Function for displaying history buttons
function renderButtons() {

    // Delete the content inside the searchHistoryContainer div prior to adding new movies
    $("#listBox").empty();
    // (this is necessary otherwise you will have repeat buttons)
    // Loop through the array of movies, then generate buttons for each movie in the array
    for (i = 0; i < searchHistory.length; i++) {
        console.log(searchHistory[i]);

        // <li class="list-group-item" id="listLine">
        // <button type="button" class="btn btn-outline-secondary">Adelaide</button>
        //</li>
        var historyBtn = $("<button>").text(searchHistory[i]);
            historyBtn.attr("type", "button"),
            historyBtn.attr("class", "btn btn-outline-secondary")

        var listDiv = $("<li>").html(historyBtn);
        listDiv.attr("class", "list-group-item");

        // var historyBtn = $("<button>").text(searchHistory[i]);
        // historyBtn.attr("type", "button"),
        //     historyBtn.attr("class", "btn btn-outline-secondary")

        $("#listBox").prepend(listDiv);

    }
}

// Storing player's name and score in the local storage
$("#searchBtn").click(function (event) {
    event.preventDefault();

    // Reaching for locally stored values
    // if (localStorage.getItem('history')) {
    //     searchHistory = localStorage.getItem('history');
    //     searchHistory = JSON.parse(searchHistory);
    // } else {
    //     searchHistory = [];
    // };
    var userSearch = userInput.value.trim();

    searchHistory.push(userSearch);

    localStorage.setItem("history", JSON.stringify(searchHistory));

    renderButtons();

    //Searched City API Call
    var searchedCity = $("#userInput").val();

    // OpenWeather API
    var userQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=metric&appid=79f78d4405a86f3c387469b830755e28"

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
        $("#hum").html("<b>Humidity: </b>" + response.main.humidity) + "%";
        $("#wind").html("<b>Wind Speed: </b>" + response.wind.speed + " Km/H");
        $("#uv").html("<b>UV Index: </b>" + response.name);

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

    });

});

