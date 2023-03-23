var _a, _b, _c;
// Task class will be used to create Task objects whichl will be stored in taskList to keep track of data.
var Task = /** @class */ (function () {
    function Task(title, deadline, isDone) {
        this.title = title;
        this.deadline = deadline;
        this.isDone = isDone;
    }
    return Task;
}());
var taskList = [];
var listOrderedAscending = false;
var currentTable = (_a = document.querySelector(".exercise-3")) !== null && _a !== void 0 ? _a : document.createElement("table");
// Assigning our event listeners for two main buttons.
(_b = document.querySelector(".submit")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", addNewTask);
(_c = document.querySelector(".sort-list")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", sortList);
// This function will be assigned to each <tr> element created by this script.
function handleClick() {
    // Updating element as done.
    this.classList.toggle("done");
    this.lastElementChild.innerText =
        this.lastElementChild.innerText === "Done"
            ? "In Progress"
            : "Done";
    // Changing our HTMLCollection (this.parentElement.children) to array of elements so we can detect our current clicked <tr> element's index.
    var dummy = [];
    for (var i = 0; i < this.parentElement.children.length; i++) {
        dummy.push(this.parentElement.children[i]);
    }
    // Finding which index was clicked and toggling isDone property of that object.
    taskList[dummy.indexOf(this) - 1].isDone = !taskList[dummy.indexOf(this) - 1].isDone;
    console.log(taskList[dummy.indexOf(this) - 1].isDone);
}
// Function to add a new task. Two things here:
// Create new Task object and push to taskList
// Create new <tr> with required event listener and all the necessary children.
function addNewTask() {
    var _a, _b;
    taskList.push({
        title: (_a = document.getElementById("title")) === null || _a === void 0 ? void 0 : _a.value,
        deadline: new Date((_b = document.getElementById("deadline")) === null || _b === void 0 ? void 0 : _b.value),
        isDone: false
    });
    var newTask = document.createElement("tr");
    newTask.addEventListener("click", handleClick, false);
    newTask.appendChild(document.createElement("td"));
    newTask.appendChild(document.createElement("td"));
    newTask.appendChild(document.createElement("td"));
    var td1 = document.createTextNode(taskList[taskList.length - 1].title);
    newTask.children[0].appendChild(td1);
    var td2 = document.createTextNode(taskList[taskList.length - 1].deadline.toDateString());
    newTask.children[1].appendChild(td2);
    var td3 = document.createTextNode("In Progress");
    newTask.children[2].appendChild(td3);
    currentTable.children[0].appendChild(newTask);
}
// Function that sorts the tasks and updates taskList & view.
function sortList() {
    taskList.sort(function (a, b) {
        return listOrderedAscending ? b.deadline.getTime() - a.deadline.getTime() : a.deadline.getTime() - b.deadline.getTime();
    });
    listOrderedAscending = !listOrderedAscending;
    currentTable.children[0].innerHTML =
        "<tr> <th>Task Title</th>  <th>Deadline</th>  <th>Status</th></tr>";
    console.log(currentTable);
    for (var i = 0; i < taskList.length; i++) {
        var newSortedTask = document.createElement("tr");
        newSortedTask.addEventListener("click", handleClick);
        newSortedTask.appendChild(document.createElement("td"));
        newSortedTask.appendChild(document.createElement("td"));
        newSortedTask.appendChild(document.createElement("td"));
        var td1 = document.createTextNode(taskList[i].title);
        newSortedTask.children[0].appendChild(td1);
        var td2 = document.createTextNode(taskList[i].deadline.toDateString());
        newSortedTask.children[1].appendChild(td2);
        var td3Text = taskList[i].isDone ? "Done" : "In Progress";
        var td3 = document.createTextNode(td3Text);
        newSortedTask.children[2].appendChild(td3);
        if (taskList[i].isDone) {
            newSortedTask.classList.toggle("done");
        }
        currentTable.children[0].appendChild(newSortedTask);
    }
}
