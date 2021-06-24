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


var cityFormHandler = function (event) {
    event.preventDefault();
  
    var cityTyped = cityInput.value.trim();
  
    if (cityTyped) {

      var cityApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityTyped + '&appid=' + apiKey;
      
    // add in another var called uvApi to get UV index pass through functions below 

      getCityApi(cityApi)
    
      cityInput.textContent = '';
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

    currentTemp.textContent = currentFtemp + " F"

    currentWind.textContent = data.wind.speed + " mph"

    currentHumidity.textContent = data.main.humidity + "%"

    //add in UV index
    //add weather icon img 

  }


  













 
