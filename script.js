/*First — select your elements
Select input by id
Select button by id
Select ul by id
Store each in a variable!

Then — add click event to button
When button clicked
Get value from input
Check if input is empty — if empty do nothing!
If not empty — add task to list*/

/*When Add button clicked:

get input value
create <li>
set task text
create delete button
add delete button into li
add li into ul
add delete click event
clear input*/

//Currently: when page refreshes: ❌ all tasks disappear
//Because tasks exist only in: DOM memory
/*Main Idea ⭐
Whenever:
✅ task added
✅ task deleted
✅ task completed
you should:
⭐ save updated tasks into localStorage.

Then when page loads:
⭐ read tasks back from localStorage and display them again.*/



/*const btn = document.querySelector("#addBtn");
const input = document.querySelector("#taskInput");
const list = document.querySelector("#taskList");

btn.addEventListener("click", function () {

    const task = input.value;
    if (task === "") { //checks empty input
        return;
    }

    //Create list item
    const li = document.createElement("li");//inside li button and task is there
    const span = document.createElement("span");
    span.textContent = task;
    span.addEventListener("click", function() {
        span.classList.toggle("completed");
    });//toggle means — if class is there, remove it. If not there, add it. One line does both!
    li.appendChild(span);

    //Create delete button
    const deleteBtn=document.createElement("button");
    deleteBtn.textContent="Delete";
    
    // Add class
    deleteBtn.classList.add("delete-btn")

    // Add button into li
    li.appendChild(deleteBtn) //add del button inside each task

    //Add li into ul
    list.appendChild(li); //Add item to list(so list has task and button)
    
    //Delete task
    deleteBtn.addEventListener("click",function(){
        li.remove(); //remove the list item

    });
    
    //clear input
    input.value = ""; //clears input box after adding task.

});*/

const btn = document.querySelector("#addBtn")
const input = document.querySelector("#taskInput")
const list = document.querySelector("#taskList")

// Step 1 — load saved tasks on page load
let tasks = []
const savedTasks = localStorage.getItem("tasks")
if (savedTasks) {
    tasks = JSON.parse(savedTasks)
    tasks.forEach(function(task) { //loop thriough each item
        createTask(task)//task on screen
    })
}

// Step 2 — add task on button click
btn.addEventListener("click", function() {
    const task = input.value.trim()
    if (task === "") return

    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    createTask(task)
    input.value = ""
})

// Enter key support
input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") btn.click()
})

// Step 3 — render function (reusable)
function createTask(task) {
    const li = document.createElement("li")
    
    const span = document.createElement("span")
    span.textContent = task
    span.addEventListener("click", function() {
        span.classList.toggle("completed");
    });//toggle means — if class is there, remove it. If not there, add it. One line does both!
    

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("delete-btn")
    
    deleteBtn.addEventListener("click", function() {
        li.remove()
        tasks = tasks.filter(t => t !== task)//delete from localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks))
    })
    
    li.appendChild(span)
    li.appendChild(deleteBtn)
    list.appendChild(li)
}

