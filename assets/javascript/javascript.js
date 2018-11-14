var config = {
    apiKey: "AIzaSyCt1uv0OaCnq7zk6acyu-S-0ZHlA6gBcfw",
    authDomain: "train-scheduler-f94f7.firebaseapp.com",
    databaseURL: "https://train-scheduler-f94f7.firebaseio.com",
    projectId: "train-scheduler-f94f7",
    storageBucket: "train-scheduler-f94f7.appspot.com",
    messagingSenderId: "355639663956"
  };
  firebase.initializeApp(config);

var database = firebase.database();

function clear() {
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#firstTrain").val("");
    $("#trainFrequency").val("");
}


$("#submit").on("click", function(event) {
    trainName = $("#trainName").val().trim()
    trainDestination = $("#trainDestination").val().trim()
    firstTrain = $("#firstTrain").val().trim()
    trainFrequency = $("#trainFrequency").val().trim()

    var newTrainInfo = {
        name: trainName,
        destination: trainDestination,
        time: firstTrain,
        frequency: trainFrequency,
    };

    
    database.ref().push(newTrainInfo)
    clear();

    database.ref().on("child_added", function(childSnapshot) {
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().time;
        var trainFrequency = childSnapshot.val().frequency;
        
         
            

            var firstTimeTwo = moment(firstTrain, "HH:mm").subtract(1, "years");
            var timeDiff = moment().diff(moment(firstTimeTwo), "minutes");
            var tApart = timeDiff % trainFrequency;
            var minutesUntil = trainFrequency - tApart;
            var nextTrain = moment().add(minutesUntil, "minutes");

            




    $(`
   <tr>
       <td scope="row"> ${trainName} </td>
       <td>${trainDestination}</td>
       <td>${trainFrequency}</td>
       <td> ${moment(nextTrain).format("HH:mm")}</td>
       <td>${minutesUntil}</td>
    </tr>
    
       
   `).appendTo('#newTrainInfo')

})
})