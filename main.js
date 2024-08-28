// Import Statements

import {
  createTask,
  addTask,
  editTaskButton,
  modalOverlay,
  editModalOverlay,
  homeButton,
  completedButton,
  completedHomeButton,
  completedTodayButton,
  completedSectionButton,
  completedProjectsButton,
} from "./modules/dom.js";

import {
  displayModalModule,
  hideModalModule,
  hideEditModalModule,
} from "./modules/modals.js";

import {
  homeSection,
  showCompletedTasksSection,
} from "./modules/page switcher.js";

import { createTasks, updateExistingTask } from "./modules/task management.js";

// Event Listeners

document.addEventListener("DOMContentLoaded", () => {
  createTask.addEventListener("click", createTasks.addNewTask);
  addTask.addEventListener("click", displayModalModule.showModal);
  editTaskButton.addEventListener("click", updateExistingTask.updateTask);

  modalOverlay.addEventListener("click", hideModalModule.hideModal);
  editModalOverlay.addEventListener("click", hideEditModalModule.hideModal);

  completedHomeButton.addEventListener("click", homeSection.showHomeSection);
  completedButton.addEventListener(
    "click",
    showCompletedTasksSection.showCompletedSection
  );
});
