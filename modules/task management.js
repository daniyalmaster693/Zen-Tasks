import {
  titleInput,
  descriptionInput,
  dueDateInput,
  tasksContainer,
  editTitleInput,
  editDescriptionInput,
  editDueDateInput,
} from "./dom.js";

import { storedTasks, Task } from "./tasks.js";
import { storedFinishedTasks, CompletedTask } from "./completed task.js";
import { displayTaskStats } from "./task stats.js";
import { displayInputErrors } from "./errors.js";
import { storeTasksLocal, retrieveStoredTasks } from "./storage.js";

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
    storeTasksLocal.storeTasks();
    retrieveStoredTasks.getStoredTasks();
  }

  return { addNewTask };
})();

export const createStoredTasks = (function () {
  function displayStoredTasks() {
    storedTasks.myTasks.forEach((task) => {
      const taskTitle = task.title;
      const taskDescription = task.description;
      const taskDueDate = task.dueDate;

      const userNewTask = new Task(taskTitle, taskDescription, taskDueDate);
      userNewTask.displayTask();
      displayTaskStats.taskStats();
    });
  }

  return { displayStoredTasks };
})();

export const deleteTask = (function () {
  function deleteNewTask() {
    const taskIndex = storedTasks.myTasks.indexOf(event.target, 0);
    storedTasks.myTasks.splice(taskIndex, 1);
    const taskNode = event.target.closest(".task");
    taskNode.remove();

    displayTaskStats.taskStats();
    storeTasksLocal.storeTasks();
    retrieveStoredTasks.getStoredTasks();
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

    displayTaskStats.completedTaskStats();
    storeTasksLocal.storeTasks();
    retrieveStoredTasks.getStoredTasks();
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
    storeTasksLocal.storeTasks();
    retrieveStoredTasks.getStoredTasks();
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

    const updatedTaskTitle = completedTaskTitle.textContent;
    const updatedTaskDescription = completedTaskDescription.textContent;
    const updatedTaskDueDate = completedTaskDueDate.textContent;

    const userNewCompletedTask = new CompletedTask(
      updatedTaskTitle,
      updatedTaskDescription,
      updatedTaskDueDate
    );
    userNewCompletedTask.displayCompletedTask();
    storedFinishedTasks.finishedTasks.push(userNewCompletedTask);

    taskNode.remove();

    displayTaskStats.taskStats();
    displayTaskStats.completedTaskStats();

    storeTasksLocal.storeTasks();
    retrieveStoredTasks.getStoredTasks();
  }

  return { completeNewTask };
})();
