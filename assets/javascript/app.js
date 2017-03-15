 


 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAFlbXIrstKmTL3drHw641Z6rWHoGsiYs4",
    authDomain: "fir-dave.firebaseapp.com",
    databaseURL: "https://fir-dave.firebaseio.com",
    storageBucket: "fir-dave.appspot.com",
    messagingSenderId: "936693713047"
  };
  firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function(childSnapshot) {
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().firstTrain;
	var trainFreq = childSnapshot.val().frequency;

	var currentTime = moment();
	console.log("Current time: " + currentTime + " & converted: " + moment(currentTime).format("hh:mm"));

	var convertedFreq = trainFreq * 60000;

	var firstTrainTime = moment().hour(trainFirst.substring(0,2)).minute(trainFirst.substring(3,5));
	console.log("firstTrainTime " + firstTrainTime + " & converted: " + moment(firstTrainTime).format("hh:mm"));

	var minutesAway = convertedFreq - ((currentTime - firstTrainTime) % convertedFreq);
	console.log("minutesAway: " + minutesAway);

	var convertedMinAway = Math.floor(minutesAway / 60000);
	console.log("convertedMinAway: " + convertedMinAway);

	var nextArr = currentTime + minutesAway;
	nextArr = moment(nextArr).format("hh:mm");
	console.log("nextArr: " + nextArr);

	var newRow = $("<tr>")
		.append($("<td width='14%'>").html(trainName))
		.append($("<td width='14%'>").html(trainDest))
		.append($("<td width='14%'>").html(trainFreq + " min"))
		.append($("<td width='14%'>").html(nextArr))
		.append($("<td width='14%'>").html(convertedMinAway));


	$("#scheduleTable").append(newRow);

})

// after submit button launch collect and check form
$("#submitTrain").on("click", function() {
event.preventDefault();

var trainName = $("trainName").val().trim();
var trainDest = $("trainDest").val().trim();
var trainFirst = $("trainFirst").val().trim();
var trainFreq = $("trainFreq").val().trim();

console.log(moment(trainFirst, "hh:mm"));
	// input validation
	if (trainName.length !== 0) {
		var trainNameValid = true;
	}
	if (trainDest.length !== 0 && typeof(trainDest) === 'string') {
		var trainDestValid = true;
	}
	if (moment(trainFirst, "hh:mm").isValid()){
		var startTimeValid = true;
		console.log("test: " + moment(trainFirst, "hh:mm").format("hh:mm"));
	} else {
		console.log("else: " + moment(trainFirst, "hh:mm"))
	}
	if (typeof(trainFreq) === 'number') {
		var trainFreqValid = true;
	}
	

	if (trainNameValid && trainDestValid && startTimeValid && trainFreqValid) {
		// temporary storage for form
		var newTrain = {
			name: trainName,
			destination: trainDest,
			firstTrain: trainFirst,
			frequency: trainFreq,
		}

		// push to the database 
		database.ref().push(newTrain);
	}

	$("#trainName").val("");
	$("#trainDest").val("");	
	$("#trainFirst").val("");
	$("#trainFreq").val("");
	});


console.log(database);


