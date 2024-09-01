import { storedTasks } from "./tasks.js";

export const storeTasksLocal = (function () {
  function storeTasks() {
    const storedTaskArray = JSON.stringify(storedTasks.myTasks);
    localStorage.setItem("Tasks", storedTaskArray);
  }

  return { storeTasks };
})();

export const retrieveStoredTasks = (function () {
  function getStoredTasks() {
    storeTasksLocal.storeTasks();
    const retrievedTasks = JSON.parse(localStorage.getItem("Tasks"));
    storedTasks.myTasks.push[retrievedTasks];
    console.log(storedTasks.myTasks);
  }

  return { getStoredTasks };
})();
