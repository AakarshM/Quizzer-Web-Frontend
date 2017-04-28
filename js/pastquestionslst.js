// Create a "close" button and append it to each list item

////////////AUTH STUFF


var token = sessionStorage.getItem("authHeader");

if(token == null){
  console.log("No token");
  window.location.href="/redirect.html";
}

var postCourseRoute = "/teachers/archive";

var config = {
  headers: {'x-auth': token}
};

var idList = [];

//////////////

function postCourseRequest(courseName){
  courseName = courseName.replace(/\s/g, '').toLowerCase();
  axios.post(postCourseRoute,{
    course: courseName
  }, {
       headers :{
        'x-auth': token
       }
   })
    .then(function(response){
      console.log(response.data); // ex.: { user: 'Your User'}
      console.log(response.status); // ex.: 200

    });
};


var cList;


 var questionNames;

  var questiondIDS;
  var questionsArray;

function classListRequest(){
/*   axios.get('/pastquestions/', config)
     .then(function(response){
       //console.log(JSON.stringify(response.data)); // ex.: { user: 'Your User'}
       console.log(response.status); // ex.: 200

      cList = response.data.map(function (element) {
          return element.course;
      });

      idList = response.data.map(function (element) {
        return element._id;
      })
       for(var i = 0; i < cList.length; i++){
        var listItem = createNewTaskElement(cList[i]);
         //Append listItem to incompleteTasksHolder
         incompleteTasksHolder.appendChild(listItem);
         bindTaskEvents(listItem, taskCompleted);
       }


     });
     */


     var questionJSON = sessionStorage.getItem("questions");
     console.log(questionJSON);

     var questionJSONObject = JSON.parse(questionJSON);

      questionsArray = questionJSONObject.questions;

      questionNames = questionsArray.map(function (element) {
       return element.question;
     });

      questiondIDS = questionsArray.map(function (element) {
       return element._id;
     })

     for(var i = 0; i < questionNames.length; i++){
       //console.log(questionNames[i]);
      var listItem = createNewTaskElement(questionNames[i]);
       //Append listItem to incompleteTasksHolder
       incompleteTasksHolder.appendChild(listItem);
       bindTaskEvents(listItem, taskCompleted);
     }
}





// Problem: User interaction doesn't provide desired results.
// Solution: Add interactivity so the user can manage daily tasks


var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//loadTasks();
//New Task List Item
var createNewTaskElement = function(taskString) {
  //Create List Item
  var listItem = document.createElement("li");

  //input (checkbox)
//  var checkBox = document.createElement("input"); // checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); // text  CLASS
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  // var deleteButton = document.createElement("button");

      //Each element needs modifying

  //checkBox.type = "checkbox";
  editInput.type = "text";

   editButton.innerText = "Details";
  editButton.className = "edit";
//  deleteButton.innerText = "Delete";
//  deleteButton.className = "delete";

  label.innerText = taskString;


      // each element needs appending
//  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
//  listItem.appendChild(deleteButton);



  return listItem;
}

var addCourse = function (){
  axios.get('/classlist/teacher', config)
     .then(function(response){
       console.log(response.data); // ex.: { user: 'Your User'}
       console.log(response.status); // ex.: 200
     });
}

// Add a new task
var addTask = function() {
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  if(taskInput.value != ""){
    var listItem = createNewTaskElement(taskInput.value);
    postCourseRequest(taskInput.value);
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  } else{
    alert("No course name entered");
  }


  taskInput.value = "";
}

// Edit an existing task
var editTask = function() {
  console.log("Edit Task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]")
  var label = listItem.querySelector("label");

  var classSelected = label.innerText.toString();
  var indexOfSelected = -1;
  for(var i = 0; i < questionNames.length; i++){
    if(questionNames[i] == classSelected){
      indexOfSelected = i;
      break;
    }
  }

  var IDofSelected = questiondIDS[indexOfSelected];

//  console.log("Question: " + questionNames[indexOfSelected] + "  ID: " + questiondIDS[indexOfSelected]);

var selectedQuestionStr = JSON.stringify(questionsArray[indexOfSelected]);
sessionStorage.setItem("selectedQuestionPast", selectedQuestionStr);

  console.log("Selected: " + JSON.stringify(questionsArray[indexOfSelected]));
  //var ran5 = 10000+Math.round(Math.floor()*90000);


  window.location.href="/specificquestion.html";

/*  var containsClass = listItem.classList.contains("editMode");
    //if the class of the parent is .editMode
  if(containsClass) {
      //switch from .editMode
      //Make label text become the input's value
    label.innerText = editInput.value;
  } else {
      //Switch to .editMode
      //input value becomes the label's text
    editInput.value = label.innerText;
  }*/

    // Toggle .editMode on the parent
  //listItem.classList.toggle("editMode");

}


// Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

// Mark a task as complete
var taskCompleted = function() {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task Incomplete...");
  // When checkbox is unchecked
  // Append the task list item #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  //var deleteButton = taskListItem.querySelector("button.delete");

  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deleteTask to delete button
//  deleteButton.onclick = deleteTask;

  //bind checkBoxEventHandler to checkbox
  //checkBox.onchange = checkBoxEventHandler;
}



var ajaxRequest = function() {
  console.log("AJAX Request");
}

// Set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// Cycle over the incompleteTaskHolder ul list items
for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
    // bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
// Cycle over the completeTaskHolder ul list items
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
    // bind events to list item's children (taskIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);

}
