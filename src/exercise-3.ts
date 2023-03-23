// EXERCISE 3
interface ITask {
    title: string;
    deadline: Date;
    isDone: boolean;
  }
  
// Task class will be used to create Task objects whichl will be stored in taskList to keep track of data.
class Task implements ITask {
    title: string;
    deadline: Date;
    isDone: boolean;
    constructor(title:string, deadline:Date, isDone:boolean) {
      this.title = title;
      this.deadline = deadline;
      this.isDone = isDone;
    }
}

let taskList: Task[] = [];
let listOrderedAscending = false;
let currentTable = document.querySelector(".exercise-3") ?? document.createElement("table");

// Assigning our event listeners for two main buttons.
document.querySelector(".submit")?.addEventListener("click", addNewTask);
document.querySelector(".sort-list")?.addEventListener("click", sortList);

// This interface will be used by handleClick function for inputs to prevent any null possiblity.
// With this, no optional chaining is needed.
interface ListenerInterface extends HTMLTableRowElement{
  parentElement: HTMLTableSectionElement
  lastElementChild: HTMLTableCellElement
}

// This function will be assigned to each <tr> element created by this script.
function handleClick(this: ListenerInterface) {
  // Updating element as done.
  this.classList.toggle("done");  
  this.lastElementChild.innerText =
  this.lastElementChild.innerText === "Done"
    ? "In Progress"
    : "Done";


  // Changing our HTMLCollection (this.parentElement.children) to array of elements so we can detect our current clicked <tr> element's index.
  let dummy: Element[] = []
  for(let i=0; i<this.parentElement.children.length; i++){
    dummy.push(this.parentElement.children[i])
  }
  
  // Finding which index was clicked and toggling isDone property of that object.
  taskList[
    dummy.indexOf(
      this
    ) - 1
  ].isDone = !taskList[
    dummy.indexOf(
      this
    ) - 1
  ].isDone;
  console.log(taskList[
    dummy.indexOf(
      this
    ) - 1
  ].isDone)

}

// Function to add a new task. Two things here:
// Create new Task object and push to taskList
// Create new <tr> with required event listener and all the necessary children.
function addNewTask() {

    taskList.push({
      title: (<HTMLInputElement>document.getElementById("title"))?.value,
      deadline: new Date((<HTMLInputElement>document.getElementById("deadline"))?.value),
      isDone: false
    });
  
    let newTask = document.createElement("tr");
    newTask.addEventListener("click", handleClick, false)

  



  newTask.appendChild(document.createElement("td"));
  newTask.appendChild(document.createElement("td"));
  newTask.appendChild(document.createElement("td"));

  let td1 = document.createTextNode(taskList[taskList.length - 1].title);
  newTask.children[0].appendChild(td1);

  let td2 = document.createTextNode(taskList[taskList.length - 1].deadline.toDateString());
  newTask.children[1].appendChild(td2);

  let td3 = document.createTextNode("In Progress");
  newTask.children[2].appendChild(td3);

  currentTable.children[0].appendChild(newTask);
}

// Function that sorts the tasks and updates taskList & view.
function sortList() {
  taskList.sort((a, b) => {


    return listOrderedAscending ? b.deadline.getTime() - a.deadline.getTime() : a.deadline.getTime() - b.deadline.getTime();
  });
  listOrderedAscending = !listOrderedAscending;

  currentTable.children[0].innerHTML =
    "<tr> <th>Task Title</th>  <th>Deadline</th>  <th>Status</th></tr>";

  console.log(currentTable);

  for (let i = 0; i < taskList.length; i++) {
    let newSortedTask = document.createElement("tr");

    newSortedTask.addEventListener("click", handleClick);

    newSortedTask.appendChild(document.createElement("td"));
    newSortedTask.appendChild(document.createElement("td"));
    newSortedTask.appendChild(document.createElement("td"));

    let td1 = document.createTextNode(taskList[i].title);
    newSortedTask.children[0].appendChild(td1);

    let td2 = document.createTextNode(taskList[i].deadline.toDateString());
    newSortedTask.children[1].appendChild(td2);

    let td3Text = taskList[i].isDone ? "Done" : "In Progress";
    let td3 = document.createTextNode(td3Text);
    newSortedTask.children[2].appendChild(td3);

    if (taskList[i].isDone) {
      newSortedTask.classList.toggle("done");
    }

    currentTable.children[0].appendChild(newSortedTask);
  }
}