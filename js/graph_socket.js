var socket = io();

var room_id = sessionStorage.getItem("room_id_graph");

if(room_id == null){
  console.log("No token");
  window.location.href="/redirect.html";
}

function onCreate(){
  //updateFunction('a');
}

socket.on('connect', function () {
    socket.emit('joinGraph', {
      id: room_id
    });
});

socket.on('studentAnswer', function (data) {
  updateFunction(data.answer.toLowerCase());
})

socket.on('studentPreviouslyAnswered', function (data) {
    // data = {answer: answer, previous: previous}
    previousUpdateFunction(data.answer.toLowerCase(), data.previous.toLowerCase());

})

socket.on('joinedGraph', function () {
  console.log("Joined graph room");
})

socket.on('closedGraph', function () {
  for(var i = 0; i < 4; i++){
    myLiveChart.data.datasets[0].data[i] = 0;
  }
  myLiveChart.update();
})

var optionMap = {
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3
}

function updateFunction(optionVar){
  // Update one of the points in the second dataset
  myLiveChart.data.datasets[0].data[optionMap[optionVar]] =
    myLiveChart.data.datasets[0].data[optionMap[optionVar]] + 1;

  myLiveChart.update();
}

function previousUpdateFunction(newOption, oldOption) {
  if(myLiveChart.data.datasets[0].data[optionMap[oldOption]] <= 0){
    myLiveChart.data.datasets[0].data[optionMap[oldOption]] =
    myLiveChart.data.datasets[0].data[optionMap[oldOption]] + 1
    ;
  }
    myLiveChart.data.datasets[0].data[optionMap[oldOption]] =
      myLiveChart.data.datasets[0].data[optionMap[oldOption]] - 1;

   myLiveChart.data.datasets[0].data[optionMap[newOption]] =
     myLiveChart.data.datasets[0].data[optionMap[newOption]] + 1;
     myLiveChart.update();
}
