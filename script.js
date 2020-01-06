var today = moment().format('DD/MM/YYYY');
var cities = [];
let weatherKey = "&units=imperial&APPID=9a647febf9f38555b7d2dd6d12233d54";
let APIKey = "9a647febf9f38555b7d2dd6d12233d54";
var forecastIndex = 0;



function displayWeatherInfo(city) {
    $("#current").empty();
    $(".five-day").empty();
    $(".forecast-head").empty();
    
    console.log(city)

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + weatherKey;
    console.log(queryURL + " is response for today's weather")

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response, lat, long) { 
        var lat = response.coord.lat;
        var long = response.coord.lon;
        console.log(city + long + " and " + lat)
        var cityTemp = Math.round(response.main.temp);
        var cityTempIcon = response.weather[0].icon;
        var cityTempIconURL = "http://openweathermap.org/img/w/" + cityTempIcon + ".png";
        var cityHumidity = response.main.humidity;
        var cityWindSpeed = response.wind.speed;
        $("#current-weather").empty();
        var cityLat = lat;
        var cityLong = long;
        console.log(city + cityLong + " and " + cityLat)

      
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLong;
            console.log(queryURL + " is the OpenWeather City response for the uv index")
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                $("#current-weather")
                    .append($("<h2>").html(city + " (" + today + ")" + "<img src=" + cityTempIconURL + ">"))
                    .append($("<p>").html("Temperature: " + cityTemp + " °F")) 
                    .append($("<p>").html("Humidity: " + cityHumidity + "%"))
                    .append($("<p>").html("Windspeed: " + cityWindSpeed + " MPH"))
                    .append($("<p>").html("<p>UV Index: <span id = current-UV><nbsp>" + response.value + "<nbsp></span></p>"))
            });
    });


    // 5 Day Forecast


    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + weatherKey;
    console.log(queryURL + " is the response for 5 day forecast")

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $(".five-day-forecast").empty();
        $(".forecast-head").empty();
        $(".forecast-head")

            .append($("<h2>").text("5-Day Forecast:"))
        for (i = 0; i <= 4; i++) {
            console.log(i)
            var nextDay = moment().add(1 + i, 'days').format('DD/MM/YYYY');
            var cityIconForecast = response.list[i].weather[0].icon;
            var cityIconURLForecast = "http://openweathermap.org/img/w/" + cityIconForecast + ".png";
            var cityTempForecast = Math.round(response.list[i].main.temp);
            var cityHumidityForecast = response.list[i].main.humidity;
            $(".five-day-forecast")
                .append($("<div>").addClass("col-sm-2 days")
                    .append($("<p>").html(nextDay))
                    .append($("<img src=" + cityIconURLForecast + ">")) 
                    .append($("<p>").html("Temp: " + cityTempForecast + " °F"))
                    .append($("<p>").html("Humidity: " + cityHumidityForecast + "%")))
            console.log(nextDay + ", " + cityHumidityForecast + ", " + cityTempForecast)
       
        }
    });

}


// City Search History Button

function renderButtons() {
    var cityInitial = $("#city-input").val().trim();
    var citySearch=cityInitial.charAt(0).toUpperCase() + cityInitial.substring(1);
        if (cities.indexOf($("#city-input").val().trim()) === -1) {
                 $("#history").append($("<button>").addClass("past-city").attr("city-name",citySearch ).text(citySearch))
                 cities.push(citySearch);
        }

    $(".past-city").on("click", function () { o 
        console.log($(this).attr("city-name"))       
        displayWeatherInfo($(this).attr("city-name"));
    }) 
}

$("#add-city").on("click", function (event) {
    event.preventDefault();
 
    var city = $("#city-input").val().trim();
    displayWeatherInfo(city);
    renderButtons();

});

function newFunction() {
    console.log("new function");
    displayWeatherInfo();
}
