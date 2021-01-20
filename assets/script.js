// History variable where the user input is stored.
var searchHistory = [];

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

// Storing city's name and displaying current weather info
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

        // Main weather card information
        var wholeTemp = response.main.temp;
        var newTemp = parseInt(wholeTemp, 10);

        $("#city").html(response.name);
        $("#temp").html(newTemp + "\u00B0");
        $("#date").text(moment().format("dddd, MMMM Do YYYY"));
        $("#hum").html("<b>Humidity: </b>" + response.main.humidity + "%");
        $("#wind").html("<b>Wind Speed: </b>" + response.wind.speed + " Km/H");
        $("#uv").html("<b>UV Index: </b>" + response.name);

        $("#weatherIcon").empty();
        var iconResponse = response.weather[0].main
        var icon = $("<img>")
        icon.attr("src", "img/" + iconResponse + ".png");
        $("#weatherIcon").append(icon);

        //UV Index Call
        let lat = response.coord.lat;
        console.log(lat);
        let lon = response.coord.lon;
        console.log(lon);
        let UVQueryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=79f78d4405a86f3c387469b830755e28&cnt=0";
        $.ajax({
            url: UVQueryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            console.log(response[0].value)
            $("#uv").html("<b>UV Index: </b>" + response[0].value);

            if (response[0].value < 4) {
                $("#uv").attr("class", "success");
            }
            else if (response[0].value < 8) {
                $("#uv").attr("class", "warning");
            }
            else {
                $("#uv").attr("class", "danger");
            }
        })

        //Get 5-Day Forecast
        var forecastCity = response.name;
        var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + forecastCity + "&appid=79f78d4405a86f3c387469b830755e28"

        $.ajax({
            url: forecastQueryURL,
            method: "GET",
        }).then(function (forecastResponse) {
            console.log(forecastResponse);

            for (var i = 0; i < 40; i++) {
                var fiveDayForecast = forecastResponse.list[i];

                var dateStamp = fiveDayForecast.dt_txt;
                var dateStampString = JSON.stringify(dateStamp);
                var date = dateStampString.slice(1, 11);
                var time = dateStampString.slice(12, 20);
                var foreTemp = fiveDayForecast.main.temp - 273;
                foreTemp = Math.round(foreTemp * 100) / 100;

                if (time == "12:00:00") {

                    //         foreDiv.attr("class", "weakly-weather-item p");
                    //         var foreP = $("<p>");
                    //         foreP.attr("class","mb-0");
                    //         foreP.attr("id", "foreTemp");
                    //         foreDiv.append(foreP);
                    //         var temp = $(".weakly-weather-item").html(
                    //             "<p class='mb-0' id='foreTempOne'" + foreTemp + '°' + "</p>"
                    //             );
                    //         var hum = $("#foreTemp").text("Humidity: " + fiveDayForecast.main.humidity + "%");
                }
            }
        });

    });
});
