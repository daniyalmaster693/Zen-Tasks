// Import Statement
import {
  createTask,
  addTask,
  editTaskButton,
  modalOverlay,
  editModalOverlay,
} from "./modules/dom.js";

import {
  displayModalModule,
  hideModalModule,
  hideEditModalModule,
} from "./modules/modals.js";

import { createTasks, updateExistingTask } from "./modules/task management.js";

document.addEventListener("DOMContentLoaded", () => {
  createTask.addEventListener("click", createTasks.addNewTask);
  addTask.addEventListener("click", displayModalModule.showModal);
  editTaskButton.addEventListener("click", updateExistingTask.updateTask);
  modalOverlay.addEventListener("click", hideModalModule.hideModal);
  editModalOverlay.addEventListener("click", hideEditModalModule.hideModal);
});
