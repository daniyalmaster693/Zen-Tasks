import {
  pendingTasksNumber,
  completedTasksNumber,
  dailyTasksNumber,
} from "./dom.js";

import { storedTasks, storedFinishedTasks } from "./tasks.js";

export const displayTaskStats = (function () {
  function taskStats() {
    pendingTasksNumber.textContent = `${storedTasks.myTasks.length}`;
    completedTasksNumber.textContent = `${storedFinishedTasks.finishedTasks.length}`;
  }

  return { taskStats };
})();
