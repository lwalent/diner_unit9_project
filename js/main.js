
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD01aWFsfTl0xVa3bBPfQACaF65LkxanMw",
    authDomain: "monkscafe-lw-app.firebaseapp.com",
    databaseURL: "https://monkscafe-lw-app.firebaseio.com",
    projectId: "monkscafe-lw-app",
    storageBucket: "monkscafe-lw-app.appspot.com",
    messagingSenderId: "358881147193"
  };
  firebase.initializeApp(config);

// Connect with database
var database = firebase.database();

// Assign empty object literal

var reservationData = {};


// When the form is submitted, get 
$('#reserveForm').on('submit', function (e) {
  // prevent the page from reloading
  e.preventDefault();
  // grab user's name and reservation day from input field
  
  var nameInput = $('#name').val();
  var dayInput = $('#day').val();
  
  // clear the user's name and reservation day from the input (for UX purposes)
  $('#name').val('');
  $('#day').val('');

  // create a section for name and reservation day data in your db
  var reservationReference = database.ref('reservationData');
  
  // use the set method to save data to the names and reservation days
  reservationReference.push({
    name: nameInput,
    day: dayInput
  });
  
  
});


// queries our database for reservations
function getReservations() {
  // Listen for changes in reservations data
  database.ref('reservationData').on('value', function (results) {

    // Get all reservations stored in the results we received back from Firebase  
    var allReservations = results.val();
    
    // Set an empty array where we can add all reservations we'll append to the DOM
    var reservationData = [];
    
    // iterate (loop) through all reservations coming from database call
    for (var item in allReservations) {
      
      // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[item].name,
        day: allReservations[item].day
      };
      // Create a Handlebars template and add our data to the template

       // Get the HTML from our Handlebars comment template
      var source = $("#reservation-template").html();
      // Compile our Handlebars template
      var template = Handlebars.compile(source);
      // Pass the data for this reservation (context) into the template
      var reservationListElement = template(context);
      // push newly created element to array of reservations
      reservationData.push(reservationListElement)
    }

    // remove all list items from DOM before appending list items
    $('.reservationData').empty()

    // append each reservation to the list of reservations in the DOM
    for (var i in reservationData) {
      $('.reservationData').append(reservationData[i])
    }    
  });
}

// Call function
getReservations();



// For inserting realtime map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 8,
    scrollwheel: false
  });

  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Cafe'

  });
}