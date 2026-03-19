const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(taskText) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const span = document.createElement("span");
    span.textContent = taskText;

    span.addEventListener("click", function () {
        span.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        li.remove();

        // remove from array
        tasks = tasks.filter(task => task !== taskText);
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function createTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Type a task before adding.");
        return;
    }

    tasks.push(taskText);
    saveTasks();

    renderTask(taskText);

    taskInput.value = "";
    taskInput.focus();
    
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem("tasks");
    
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
    
            tasks.forEach(task => {
                renderTask(task);
            });
        }
    }

    addTaskBtn.addEventListener("click", createTask);

    taskInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            createTask();
    }

    });
    
    loadTasks();