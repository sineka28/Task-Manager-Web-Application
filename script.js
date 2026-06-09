function saveTasks() {
    localStorage.setItem(
        "tasks",
        document.getElementById("taskList").innerHTML
    );
}

function updateCounter() {
    const tasks = document.querySelectorAll("#taskList li");
    document.getElementById("taskCounter").textContent =
        "Total Tasks: " + tasks.length;
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let dueDate = document.getElementById("dueDate");
    let taskList = document.getElementById("taskList");
    let priority = document.getElementById("priority").value;

    if (taskInput.value.trim() === "") {
        alert("Enter a task");
        return;
    }

    let li = document.createElement("li");

    let priorityClass = priority.toLowerCase();

    li.innerHTML = `
        <strong>${taskInput.value}</strong><br>
        📅 Due: ${dueDate.value}<br>
        <span class="${priorityClass}">
            ⭐ Priority: ${priority}
        </span>
        <button onclick="deleteTask(this)">
            Delete
        </button>
    `;

    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });

    taskList.appendChild(li);

    taskInput.value = "";
    dueDate.value = "";

    updateCounter();
    saveTasks();
}

function deleteTask(button) {
    button.parentElement.remove();
    updateCounter();
    saveTasks();
}

function clearTasks() {
    document.getElementById("taskList").innerHTML = "";
    updateCounter();
    saveTasks();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

window.onload = function () {
    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        document.getElementById("taskList").innerHTML = savedTasks;
        updateCounter();
    }
};