// js script, weather dashboard, TWH, 6-22-21

// global vars
var cityInput = document.querySelector('#city-name')
var apiKey = '9b2ae69bfce6899c26e740f85827a619'
var blankUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=9b2ae69bfce6899c26e740f85827a619'
var searchButton = document.getElementById('search-button')
var currentDay = document.querySelector('.current-title')
var currentTemp = document.querySelector('.current-temp')
var currentWind = document.querySelector('.current-wind')
var currentHumidity = document.querySelector('.current-humidity')
var currentDate = document.querySelector('.current-date')
var currentUv = document.querySelector('.current-uv')
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
var buttonOne = document.querySelector('#search-btn-one')
var currentIcon = document.querySelector('.current-icon')
var dayOneIcon = document.querySelector('.day1-icon')
var dayTwoIcon = document.querySelector('.day2-icon')
var dayThreeIcon = document.querySelector('.day3-icon')
var dayFourIcon = document.querySelector('.day4-icon')
var dayFiveIcon = document.querySelector('.day5-icon')
var uvButton = document.querySelector('#uv-btn')
var fiveDayDisplay = document.querySelector('.five-day')

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

// initiates when user clicks search buttons; validates input; gives user feedback for false values
var cityFormHandler = function (event) {
    event.preventDefault();
  
    var cityTyped = cityInput.value.trim();
  
    if (cityTyped) {

      // current weather API call
      var cityApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityTyped + '&appid=' + apiKey;

      // five day API call
      var fiveDayApi = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityTyped + '&appid=' + apiKey;
      
      cityInput.value = '';

      // current weather api call
      getCityApi(cityApi)

      // five day forecast api call
      getFiveDayApi(fiveDayApi)
    
    } else {
      alert('Please enter a city');
    }
  };

  // search button initiates the above
  searchButton.addEventListener('click', cityFormHandler);


  //API call for city loading in 
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
    var currentDayStore = data.name

  
    //current moment js data
    var today = moment();
    $(".current-date").text(today.format('(l)'));

    //converts from K to deg F
    var currentFtemp = Math.round(((data.main.temp - 273.15) * 9/5) + 32)

    //displays temp, wind speed, and humidity
    currentTemp.textContent = currentFtemp + " F"
    var currentTempStore = currentFtemp + " F"

    currentWind.textContent = data.wind.speed + " mph"
    var currentWindStore = data.wind.speed + " mph"


    currentHumidity.textContent = data.main.humidity + "%"
    var currentHumStore = data.main.humidity + "%"

    // changes prev search btn's text to typed in city
    buttonOne.textContent = data.name
    var buttonOneStore = data.name

    // provides overcast status
    currentIcon.textContent = data.weather[0].description
    currentIconStore = data.weather[0].description

    // declaring lat and lon from previous API call
    var latIn = data.coord.lat
    var lonIn = data.coord.lon

    //initiates UV API call and prepares above values into local storage 
    getUvi(lonIn, latIn)
    setCurrentStorage(currentDayStore, currentTempStore, currentWindStore, currentHumStore, buttonOneStore, currentIconStore)

  }

  //calls getUvi API call and loads in 
  function getUvi(lonIn, latIn) {
    var lon = lonIn;
    var lat = latIn;

    var uVApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,daily&appid=' + apiKey

     // fetch request loads city typed in
     fetch(uVApi)
     .then(function (response) {
       return response.json();
     })
     .then(function (data) {

      var UviEl = data.current.uvi
      // displays green, orange, or red depending on uvi (favorable, moderate, severe)
      if (UviEl<3) {
        currentUv.textContent = UviEl
        currentUv.style.color = 'green'
      } else if (4<UviEl<6) {
        currentUv.textContent = UviEl
        currentUv.style.color = 'orange'
      } else if (7<UviEl<10) {
        currentUv.textContent = UviEl
        currentUv.style.color = 'red'
      }

      // passes UviEl into local storage
      setUvStorage(UviEl)

     });
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

  // loads the five day forecast API data into HTML fields; for loop would've been more concise
  function loadFiveDay(data) {

    fiveDayDisplay.style.display = "block"

    //Day 1
      dayOneD = data.list[0].dt_txt

      var dayOneF = dayOneD.slice(0,11)

      //day1 date
      dayOne.textContent = dayOneF

      //day1 icon
      dayOneIcon.textContent = data.list[0].weather[0].description

      dayOneTemp = data.list[0].main.temp

      var dayOneFTemp = Math.round(((dayOneTemp - 273.15) * 9/5) + 32)

      //day1 temp
      dayOneTempF.textContent = dayOneFTemp + " F"
      //day1 wind
      dayOneWind.textContent = data.list[0].wind.speed + " mph"
      //day1 hum
      dayOneHumidity.textContent = data.list[0].main.humidity + "%"

    //Day 2
      dayTwoD = data.list[8].dt_txt

      var dayTwoF = dayTwoD.slice(0,11)

      //day2 date
      dayTwo.textContent = dayTwoF

      //day2 icon
      dayTwoIcon.textContent = data.list[8].weather[0].description

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

      //day3 icon
      dayThreeIcon.textContent = data.list[16].weather[0].description

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

      //day4 icon
      dayFourIcon.textContent = data.list[24].weather[0].description

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

      //day5 icon
      dayFiveIcon.textContent = data.list[32].weather[0].description

      dayFiveTemp = data.list[32].main.temp

      var dayFiveFTemp = Math.round(((dayFiveTemp - 273.15) * 9/5) + 32)

      //day5 temp
      dayFiveTempF.textContent = dayFiveFTemp + " F"
      //day5 wind
      dayFiveWind.textContent = data.list[32].wind.speed + " mph"
      //day5 hum
      dayFiveHumidity.textContent = data.list[32].main.humidity + "%"

  }

  //SECTION #4: local storage and saving previous searches btns

  //brings vars into an array, stringifies, and sets to local storage
  function setCurrentStorage(currentDayStore, currentTempStore, currentWindStore, currentHumStore, buttonOneStore, currentIconStore) {

  var currentStorage = [currentDayStore, currentTempStore, currentWindStore, currentHumStore, buttonOneStore, currentIconStore]

  localStorage.setItem("current", JSON.stringify(currentStorage));

  }

  function getStorage() {
    // Get stored data from localStorage
  var storedCurrent = JSON.parse(localStorage.getItem("current"));

    // re-renders current weather data
  currentDay.textContent = storedCurrent[0]
  currentTemp.textContent = storedCurrent[1]
  currentWind.textContent = storedCurrent[2]
  currentHumidity.textContent = storedCurrent[3]
  buttonOne.textContent = storedCurrent[4]
  currentIcon.textContent = storedCurrent[5]

  }

  // intiates getStorage for current weather
  buttonOne.addEventListener('click', getStorage)

  // sets uvi values into local
  function setUvStorage(UviEl) {

    localStorage.setItem("current-uv", UviEl);

    }

  //gets uvi and re-color codes it; re-renders onto page
  function getUvStorage() {

    var storedUv = localStorage.getItem("current-uv")

    if (storedUv<3) {
      currentUv.textContent = storedUv
      currentUv.style.color = 'green'
    } else if (4<storedUv<6) {
      currentUv.textContent = storedUv
      currentUv.style.color = 'orange'
    } else if (7<storedUv<10) {
      currentUv.textContent = storedUv
      currentUv.style.color = 'red'
    }

  }

  // UV i button click event initiates putting uvi into local storage
  uvButton.addEventListener('click', getUvStorage)


  //OMISSIONS & Room for Improvements (time permitting):
    //display icons not textual info for overcast status
    //re-render five day using some type of for loop sequence/object manipulation to set/get into local storage
    //re-factor five day load-in using for loop over relevant API's output

  console.log("This app is best used while listening to 'Mr. Blue Sky' by ELO.")
