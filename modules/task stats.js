import {
  pendingTasksNumber,
  completedTasksNumber,
  dailyTasksNumber,
} from "./dom.js";

import { storedTasks } from "./tasks.js";
import { storedFinishedTasks } from "./completed task.js";

export const displayTaskStats = (function () {
  function taskStats() {
    pendingTasksNumber.textContent = `${storedTasks.myTasks.length}`;
  }

  function completedTaskStats() {
    completedTasksNumber.textContent = `${
      storedFinishedTasks.finishedTasks.length - 1
    }`;
    dailyTasksNumber.textContent = `${
      storedFinishedTasks.finishedTasks.length - 1
    }/5`;
  }

  return { taskStats, completedTaskStats };
})();
