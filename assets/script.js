//Weather Icons


var city = "Adelaide"
// OpenWeather API
var userQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=79f78d4405a86f3c387469b830755e28"

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

    function renderIcons() {
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
    };

    renderIcons();

    //---------------------------------------------------//
    //Get 5-Day Forecast
    var forecastCity = response.name;
    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + forecastCity + "&units=metric&appid=79f78d4405a86f3c387469b830755e28"

    $.ajax({
        url: forecastQueryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        $("#dayOne").text(moment().day(0 + 1).format("ddd"));
        $("#oneIcon").attr("src", "img/clouds.png")
        $("#dayTwo").text(moment().day(0 + 2).format("ddd"));
        $("#twoIcon").attr("src", "img/clouds.png")
        $("#dayThree").text(moment().day(0 + 3).format("ddd"));
        $("#threeIcon").attr("src", "img/clouds.png")
        $("#dayFour").text(moment().day(0 + 4).format("ddd"));
        $("#fourIcon").attr("src", "img/clouds.png")
        $("#dayFive").text(moment().day(0 + 5).format("ddd"));
        $("#fiveIcon").attr("src", "img/clouds.png")
    });

});



//-----------------------------------------------------//
// History variable where the user input is stored.
var searchHistory = ["Adelaide"];

// Function for displaying history buttons
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

// Storing player's name and score in the local storage
$("#searchBtn").click(function currentWeather() {
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

        //Get 5-Day Forecast
        var forecastCity = response.name;
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + forecastCity + "&appid=79f78d4405a86f3c387469b830755e28"

        $.ajax({
            url: forecastQueryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
        });
    });

});