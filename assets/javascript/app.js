$(document).ready(function() {

var config = {
    apiKey: "AIzaSyA4huXPAfaUFDqUhvHAmE3SjspzUJOLYYQ",
    authDomain: "first-project-rh-354b0.firebaseapp.com",
    databaseURL: "https://first-project-rh-354b0.firebaseio.com",
    projectId: "first-project-rh-354b0",
    storageBucket: "first-project-rh-354b0.appspot.com",
    messagingSenderId: "774309477678"
  };
  firebase.initializeApp(config);


$("#addTrainBtn").on("click", function(){


	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();


	var newTrain = {
		name:  trainName,
		destination: destination,
		firstTrain: firstTrainUnix,
		frequency: frequency,
	};

	trainData.push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(firstTrainUnix);
	console.log(newTrain.frequency);


	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");


	return false;
});



trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrain;

	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;

	var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
	console.log(tMinutes);
	console.log(tArrival);

	console.log(moment().format("hh:mm A"));
	console.log(tArrival);
	console.log(moment().format("X"));

	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});

