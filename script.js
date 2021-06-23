// js script, weather dashboard, TWH, 6-22-21

// var tableBody = document.getElementById('repo-table');
// var fetchButton = document.getElementById('fetch-button');

// var requestUrl = 'https://api.github.com/orgs/nodejs/repos';

var cityInput = document.getElementsByClassName('form-control')
var cityTyped = $("input[name='form-control']").val();
var apiKey = '9b2ae69bfce6899c26e740f85827a619'

// var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=9b2ae69bfce6899c26e740f85827a619'


var testUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Champlin&appid=9b2ae69bfce6899c26e740f85827a619'

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization

  fetch(testUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
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
    });
}

getApi()

