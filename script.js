// js script, weather dashboard, TWH, 6-22-21

var cityInput = document.querySelector('#city-name');
var apiKey = '9b2ae69bfce6899c26e740f85827a619'
var searchButton = document.getElementById('search-button')
var blankUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=9b2ae69bfce6899c26e740f85827a619';
var currentDay = document.querySelector('.current-title')
var currentTemp = document.querySelector('.current-temp')
var currentWind = document.querySelector('.current-wind')
var currentHumidity = document.querySelector('.current-humidity')
var currentDate = document.querySelector('.current-date')
var today = moment();

//SECTION #1: LOAD IN DEFAULT WEATHER DATA

// handles refresh events, so API call doesn't break on refresh
function getBlankApi() {
  // fetch request loads Minneapolis by default if user left field blank and page refreshes
  fetch(blankUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    });
}

getBlankApi()


//SECTION #2: CURRENT WEATHER DATA

var cityFormHandler = function (event) {
    event.preventDefault();
  
    var cityTyped = cityInput.value.trim();
  
    if (cityTyped) {

      var cityApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityTyped + '&appid=' + apiKey;

      var fiveDayApi = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityTyped + '&appid=' + apiKey;
      
    // add in another var called uvApi to get UV index pass through functions below 

      cityInput.value = '';

      // current weather api call
      getCityApi(cityApi)

      // five day forecast api call
      getFiveDayApi(fiveDayApi)
    
    } else {
      alert('Please enter a city');
    }
  };

  // search button initiates data load in
  searchButton.addEventListener('click', cityFormHandler);

  function getCityApi(cityApi) {
    // fetch request loads city typed in
    fetch(cityApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

    loadCurrentWeather(data)

      });
  }

  // function for loading current weather data (temp, humidity, wind, uv, weather icon image)
  function loadCurrentWeather(data) {

    //title of city
    currentDay.textContent = data.name
  
    //current moment js data
    var today = moment();
    $(".current-date").text(today.format("(MM/D/YYYY)"));

    //converts from K to deg F
    var currentFtemp = Math.round(((data.main.temp - 273.15) * 9/5) + 32)

    //displays temp, wind speed, and humidity
    currentTemp.textContent = currentFtemp + " F"

    currentWind.textContent = data.wind.speed + " mph"

    currentHumidity.textContent = data.main.humidity + "%"

    //add in UV index
    //add weather icon img (see hw6 folder)

  }

//SECTION #3: 5-DAY FORECAST WEATHER DATA

  //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  // five day API function request
  function getFiveDayApi(fiveDayApi) {
    // fetch request loads city typed in
    fetch(fiveDayApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

      console.log(data)

      });
  }

















 
