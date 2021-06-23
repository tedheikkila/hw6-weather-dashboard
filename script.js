// js script, weather dashboard, TWH, 6-22-21


// var cityInput = document.getElementsByClassName('form-control')
var apiKey = '9b2ae69bfce6899c26e740f85827a619'
var searchButton = document.getElementById('search-button')


var blankUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=9b2ae69bfce6899c26e740f85827a619';


function getBlankApi() {
  // fetch request loads Minneapolis by default if user left field blank
  fetch(blankUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    });
}

getBlankApi()

var cityTyped = $("input[name='form-control']").val();

// var cityTest = getElementByClassName('test').value


function checkInput() {
    // checks and validate the cityTyped variable
    // var cityTyped = $("input[name='form-control']").val();

    var cityTyped = $("input[name='form-control']").val();
    console.log(cityTyped)
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityTyped + '&appid=9b2ae69bfce6899c26e740f85827a619';


    fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    });


}





// searchButton.addEventListener('click', checkInput);



function debug() {




    var cityTyped = $("input[name='form-control']").val();
    console.log(cityTyped)

}

// console.log(cityTyped)


var cityInput = document.querySelector('#city-name');


var cityFormHandler = function (event) {
    event.preventDefault();
  
    var cityTyped = cityInput.value.trim();
  
    if (cityTyped) {
      console.log(cityTyped)
  
      cityInput.textContent = '';
    } else {
      alert('Please enter a city');
    }
  };

  searchButton.addEventListener('click', cityFormHandler);











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
