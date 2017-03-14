

 var config = {
    apiKey: "AIzaSyAFlbXIrstKmTL3drHw641Z6rWHoGsiYs4",
    authDomain: "fir-dave.firebaseapp.com",
    databaseURL: "https://fir-dave.firebaseio.com",
    storageBucket: "fir-dave.appspot.com",
    messagingSenderId: "936693713047"
  };
  firebase.initializeApp(config);



var database = firebase.database();




var url = "";
var dataRef = new Firbase(url);
var name = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
var nextTrainFormatted = "";
var minutesAway = "";
var firstTimeConverted = "";
var currentTime = "";
var diffTime = "";
var tRemainder ="";
var minutesTillTrain = "";
var keyHolder = "";
var getKey = ""; 

$(document).ready(function(){
// add train function to 
$("#add-train").on("click" , function(){
	// grabbing the input from the html id form 
 name = $("name-input").val().trim();
 destination = $("destination-input").val().trim();
 firstTrainTime = $("#first-train--time-input").val().trim()
 frequency = $("frequency-input").val().trim();
 





})



})