// js script, weather dashboard, TWH, 6-22-21

var cityInput = document.querySelector('#city-name');
var apiKey = '9b2ae69bfce6899c26e740f85827a619'
var searchButton = document.getElementById('search-button')
var blankUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=9b2ae69bfce6899c26e740f85827a619';
var currentDay = document.querySelector('.current-title')
var currentTemp = document.querySelector('.current-temp')
var currentWind = document.querySelector('.current-wind')
var currentHumidity = document.querySelector('.current-humidity')

// handles refresh events, so API call doesn't break on refresh
function getBlankApi() {
  // fetch request loads Minneapolis by default if user left field blank and page refreshes
  fetch(blankUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    });
}

getBlankApi()


var cityFormHandler = function (event) {
    event.preventDefault();
  
    var cityTyped = cityInput.value.trim();
  
    if (cityTyped) {
      console.log(cityTyped)

      var cityApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityTyped + '&appid=' + apiKey;
      
    // add in another var called uvApi to get UV index pass through functions below 

      getCityApi(cityApi)
    
      cityInput.textContent = '';
    } else {
      alert('Please enter a city');
    }
  };

  searchButton.addEventListener('click', cityFormHandler);

  function getCityApi(cityApi) {
    // fetch request loads city typed in
    fetch(cityApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data)

    
    loadCurrentWeather(data)

      });
  }

  function loadCurrentWeather(data) {
    console.log(data.name)

    currentDay.textContent = data.name

    var currentFtemp = Math.round(((data.main.temp - 273.15) * 9/5) + 32)

    currentTemp.textContent = currentFtemp + " F"

    console.log(data.wind.speed)

    currentWind.textContent = data.wind.speed + " mph"

    currentHumidity.textContent = data.main.humidity + "%"


  }













  //Loop over the data to generate a table, each table row will have a link to the repo url
    //   for (var i = 0; i < data.length; i++) {
        //   console.log(data.length)
        // Creating elements, tablerow, tabledata, and anchor
            // var createTableRow = document.createElement('tr');
            // var tableData = document.createElement('td');
            // var link = document.createElement('a');

        // Setting the text of link and the href of the link
            // link.textContent = data[i].html_url;
            // link.href = data[i].html_url;

        // Appending the link to the tabledata and then appending the tabledata to the tablerow
        // The tablerow then gets appended to the tablebody
            // tableData.appendChild(link);
            // createTableRow.appendChild(tableData);
            // tableBody.appendChild(createTableRow);
    //   }
