//get new task input
var taskInput = document.querySelector(".new-task__input");
//get add button
var addButton = document.querySelector(".new-task__btn-add");
//get list of incomplete tasks
var incompleteTaskHolder = document.querySelector(".incomplete-tasks");
//get list of completed tasks
var completedTasksHolder = document.querySelector(".completed-tasks");

var createNewTaskElement = function (taskString) {
    var task = document.createElement("section");
    task.classList.add("task");

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("task__checkbox");

    var taskText = document.createElement("p");
    taskText.innerText = taskString;
    taskText.className = "task__text";

    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("input-text", "task__input");

    var editButton = document.createElement("button");
    //innerText encodes special characters, HTML does not.
    editButton.innerText = "Edit";
    editButton.classList.add("btn", "task__btn-edit");

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "task__btn-delete");

    var deleteButtonImg = document.createElement("img");
    deleteButtonImg.classList.add("task__btn-delete-img");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "";
    deleteButton.appendChild(deleteButtonImg);

    task.appendChild(checkBox);
    task.appendChild(taskText);
    task.appendChild(editInput);
    task.appendChild(editButton);
    task.appendChild(deleteButton);
    return task;
}

var addTask = function () {
    if (!taskInput.value) return;
    var task = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(task);
    bindTaskEvents(task, taskCompleted);

    taskInput.value = "";
}

var editTask = function () {
    var task = this.parentNode;

    var taskText = task.querySelector(".task__text");
    var taskInput = task.querySelector(".task__input");

    var editBtn = task.querySelector(".task__btn-edit");
    var editMode = taskInput.classList.contains("task__input_edit-mode");

    if (editMode) {
        taskText.innerText = taskInput.value;
        editBtn.innerText = "Edit";
    } else {
        taskInput.value = taskText.innerText;
        editBtn.innerText = "Save";
    }

    taskText.classList.toggle("task__text_edit-mode");
    taskInput.classList.toggle("task__input_edit-mode");
};

var deleteTask = function () {
    var task = this.parentNode;
    var taskList = task.parentNode;

    taskList.removeChild(task);
}

var taskCompleted = function () {
    var task = this.parentNode;
    var taskText = task.querySelector(".task__text");
    taskText.classList.add("task__text_completed");

    completedTasksHolder.appendChild(task);
    bindTaskEvents(task, taskIncomplete);
}

var taskIncomplete = function () {
    var task = this.parentNode;
    var taskText = task.querySelector(".task__text");
    taskText.classList.remove("task__text_completed");

    incompleteTaskHolder.appendChild(task);
    bindTaskEvents(task, taskCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector(".task__checkbox");
    var editButton = taskListItem.querySelector(".task__btn-edit");
    var deleteButton = taskListItem.querySelector(".task__btn-delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 1; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 1; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}