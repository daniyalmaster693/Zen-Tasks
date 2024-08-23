import {
  titleInput,
  descriptionInput,
  dueDateInput,
  tasksContainer,
  editTitleInput,
  editDescriptionInput,
  editDueDateInput,
} from "./dom.js";

import { storedFinishedTasks, storedTasks, Task } from "./tasks.js";
import { displayTaskStats } from "./task stats.js";
import { displayInputErrors } from "./errors.js";

import {
  hideModalModule,
  hideEditModalModule,
  clearModalModule,
} from "./modals.js";

export const createTasks = (function () {
  function addNewTask() {
    const errors = displayInputErrors.displayErrors();
    if (errors) {
      return;
    }

    const taskTitle = titleInput.value;
    const taskDescription = descriptionInput.value;
    const taskDueDate = dueDateInput.value;

    const userNewTask = new Task(taskTitle, taskDescription, taskDueDate);
    userNewTask.displayTask();
    storedTasks.myTasks.push(userNewTask);

    displayTaskStats.taskStats();
    displayInputErrors.displayErrors();
    hideModalModule.hideModal();
    clearModalModule.clearModal();
  }

  return { addNewTask };
})();

export const deleteTask = (function () {
  function deleteNewTask() {
    const taskIndex = storedTasks.myTasks.indexOf(event.target, 0);
    storedTasks.myTasks.splice(taskIndex, 1);
    const taskNode = event.target.closest(".task");
    taskNode.remove();
    displayTaskStats.taskStats();
  }

  return { deleteNewTask };
})();

export const editTask = (function () {
  function editTaskDisplay() {
    const taskContainerIndex = tasksContainer.children;
    const taskIndexList = Array.from(taskContainerIndex);

    const taskNode = event.target.closest(".task");
    const clickedTaskIndex = taskIndexList.indexOf(taskNode);
    const currentTaskIndex = clickedTaskIndex - 1;

    editTitleInput.value = `${storedTasks.myTasks[currentTaskIndex].title}`;
    editDescriptionInput.value = `${storedTasks.myTasks[currentTaskIndex].description}`;
    editDueDateInput.value = `${storedTasks.myTasks[currentTaskIndex].dueDate}`;
  }

  return { editTaskDisplay };
})();

export const updateExistingTask = (function () {
  function updateTask() {
    // Add error checking

    const editTaskTitle = editTitleInput.value;
    const editTaskDescription = editDescriptionInput.value;
    const editTaskDueDate = editDueDateInput.value;

    storedTasks.myTasks[0].title = editTaskTitle;
    storedTasks.myTasks[0].description = editTaskDescription;
    storedTasks.myTasks[0].dueDate = editTaskDueDate;

    const taskTitle = document.querySelector(".task-title");
    const taskDescription = document.querySelector(".task-description");
    const taskDueDate = document.querySelector(".date");

    taskTitle.textContent = editTaskTitle;
    taskDescription.textContent = editTaskDescription;
    taskDueDate.textContent = editTaskDueDate;

    hideEditModalModule.hideModal();
  }

  return { updateTask };
})();

export const completeTask = (function () {
  function completeNewTask() {
    const taskIndex = storedTasks.myTasks.indexOf(event.target, 0);
    storedTasks.myTasks.splice(taskIndex, 1);

    const taskNode = event.target.closest(".task");
    storedFinishedTasks.finishedTasks.push(taskNode);

    const completedTaskTitle = document.querySelector(".task-title");
    const completedTaskDescription =
      document.querySelector(".task-description");
    const completedTaskDueDate = document.querySelector(".date");

    const taskTitle = completedTaskTitle.textContent;
    const taskDescription = completedTaskDescription.textContent;
    const taskDueDate = completedTaskDueDate.textContent;

    taskNode.remove();
    displayTaskStats.taskStats();
  }

  return { completeNewTask };
})();
