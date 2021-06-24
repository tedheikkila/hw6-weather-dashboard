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
var dayOne = document.querySelector('.day1-title')
var dayTwo = document.querySelector('.day2-title')
var dayThree = document.querySelector('.day3-title')
var dayFour = document.querySelector('.day4-title')
var dayFive = document.querySelector('.day5-title')
var dayOneTempF = document.querySelector('.day1-temp')
var dayOneWind = document.querySelector('.day1-wind')
var dayOneHumidity = document.querySelector('.day1-humidity')
var dayTwoTempF = document.querySelector('.day2-temp')
var dayTwoWind = document.querySelector('.day2-wind')
var dayTwoHumidity = document.querySelector('.day2-humidity')
var dayThreeTempF = document.querySelector('.day3-temp')
var dayThreeWind = document.querySelector('.day3-wind')
var dayThreeHumidity = document.querySelector('.day3-humidity')
var dayFourTempF = document.querySelector('.day4-temp')
var dayFourWind = document.querySelector('.day4-wind')
var dayFourHumidity = document.querySelector('.day4-humidity')
var dayFiveTempF = document.querySelector('.day5-temp')
var dayFiveWind = document.querySelector('.day5-wind')
var dayFiveHumidity = document.querySelector('.day5-humidity')
var today = moment();
var buttonOne = document.querySelector('#btn-1')

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

    console.log(data)
  
    //current moment js data
    var today = moment();
    $(".current-date").text(today.format('l'));

    //converts from K to deg F
    var currentFtemp = Math.round(((data.main.temp - 273.15) * 9/5) + 32)

    //displays temp, wind speed, and humidity
    currentTemp.textContent = currentFtemp + " F"

    currentWind.textContent = data.wind.speed + " mph"

    currentHumidity.textContent = data.main.humidity + "%"

    buttonOne.textContent = data.name

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

      loadFiveDay(data)

      });
  }

  function loadFiveDay(data) {

    console.log(data)

    //Day 1
      dayOneD = data.list[1].dt_txt

      var dayOneF = dayOneD.slice(0,11)

      //day1 date
      dayOne.textContent = dayOneF

      dayOneTemp = data.list[1].main.temp

      var dayOneFTemp = Math.round(((dayOneTemp - 273.15) * 9/5) + 32)

      //day1 temp
      dayOneTempF.textContent = dayOneFTemp + " F"
      //day1 wind
      dayOneWind.textContent = data.list[1].wind.speed + " mph"
      //day1 hum
      dayOneHumidity.textContent = data.list[1].main.humidity + "%"

    //Day 2

      dayTwoD = data.list[8].dt_txt

      var dayTwoF = dayTwoD.slice(0,11)

      //day2 date
      dayTwo.textContent = dayTwoF

      dayTwoTemp = data.list[8].main.temp

      var dayTwoFTemp = Math.round(((dayTwoTemp - 273.15) * 9/5) + 32)

      //day2 temp
      dayTwoTempF.textContent = dayTwoFTemp + " F"
      //day2 wind
      dayTwoWind.textContent = data.list[8].wind.speed + " mph"
      //day2 hum
      dayTwoHumidity.textContent = data.list[8].main.humidity + "%"

    //Day 3
      dayThreeD = data.list[16].dt_txt

      var dayThreeF = dayThreeD.slice(0,11)

      //day3 date
      dayThree.textContent = dayThreeF

      dayThreeTemp = data.list[16].main.temp

      var dayThreeFTemp = Math.round(((dayThreeTemp - 273.15) * 9/5) + 32)

      //day3 temp
      dayThreeTempF.textContent = dayThreeFTemp + " F"
      //day3 wind
      dayThreeWind.textContent = data.list[16].wind.speed + " mph"
      //day3 hum
      dayThreeHumidity.textContent = data.list[16].main.humidity + "%"

    //Day 4
      dayFourD = data.list[24].dt_txt

      var dayFourF = dayFourD.slice(0,11)

      //day4 date
      dayFour.textContent = dayFourF

      dayFourTemp = data.list[24].main.temp

      var dayFourFTemp = Math.round(((dayFourTemp - 273.15) * 9/5) + 32)

      //day4 temp
      dayFourTempF.textContent = dayFourFTemp + " F"
      //day4 wind
      dayFourWind.textContent = data.list[24].wind.speed + " mph"
      //day4 hum
      dayFourHumidity.textContent = data.list[24].main.humidity + "%"

    //Day 5
      dayFiveD = data.list[32].dt_txt

      var dayFiveF = dayFiveD.slice(0,11)

      //day5 date
      dayFive.textContent = dayFiveF

      dayFiveTemp = data.list[32].main.temp

      var dayFiveFTemp = Math.round(((dayFiveTemp - 273.15) * 9/5) + 32)

      //day5 temp
      dayFiveTempF.textContent = dayFiveFTemp + " F"
      //day5 wind
      dayFiveWind.textContent = data.list[32].wind.speed + " mph"
      //day5 hum
      dayFiveHumidity.textContent = data.list[32].main.humidity + "%"

  }

  

















 
