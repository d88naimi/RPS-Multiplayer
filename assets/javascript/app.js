 


 // FIrebase
  var config = {
    apiKey: "AIzaSyAFlbXIrstKmTL3drHw641Z6rWHoGsiYs4",
    authDomain: "fir-dave.firebaseapp.com",
    databaseURL: "https://fir-dave.firebaseio.com",
    storageBucket: "fir-dave.appspot.com",
    messagingSenderId: "936693713047"
  };
  firebase.initializeApp(config);

var database = firebase.database();
// var for train
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;


// function to set form input to var
$("#addTrain").on("click", function() {
// grab user input with a val and .trim cleans out white space 
  trainName = $('#nameInput').val().trim();
  destination = $('#trainDest').val().trim();
  firstTrainTime = $('#trainFirst').val().trim();
  frequency = $('#trainFreq').val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);
// push this to the firebase database 
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });
  // stay false until called 
    return false;
});


// database adding snapshot child to firebase snapshot is best practice term to firebase
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  // Grab the val from firebase database and store them over to these var names.
  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;


  // moment methods for time calls and calculations. 
  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  console.log("firstTrainMoment" + firstTrainMoment);
  var nowMoment = moment(); // moment object of current time 
  console.log("nowMoment" + firstTrainMoment);
  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");


  // appending  to table withthin a table row
  var tr = $('<tr class="active">');
  var lineOne = $('<td>');
  var lineTwo = $('<td>');
  var lineThree = $('<td>');
  var lineFour = $('<td>');
  var lineFive = $('<td>');
  lineOne.append(trainName);
  lineTwo.append(destination);
  lineThree.append(frequency);
  lineFour.append(formatNextArrival);
  lineFive.append(minutesAway);
  tr.append(lineOne).append(lineTwo).append(lineThree).append(lineFour).append(lineFive);
  $('#newTrains').append(tr);


  }, function (errorObject) {

  // In case of error this will print the error
    console.log("didnt go through " + errorObject.code);

// remove train function 
    $("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
	});


});

