document.addEventListener("DOMContentLoaded", () => {
  // Task Stats

  const pendingNumber = document.querySelector(".pending-number");
  const completedNumber = document.querySelector(".completed-number");
  const dailyGoalNumber = document.querySelector(".daily-goal-number");

  // Tasks Container

  const tasksContainer = document.querySelector(".tasks-container");

  // Creating a task fields

  const taskTitle = document.querySelector(".task-title-input");
  const taskDescription = document.querySelector(".task-description-input");
  const taskDueDate = document.querySelector(".task-due-date-input");
  const taskPriorityLevel = document.querySelector(".task-priority-level");
  const createTask = document.querySelector(".create-task");

  //  Modal

  const modal = document.querySelector(".modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const addTask = document.querySelector(".add-task-button");

  // Modal Modules

  const displayModalModule = (function () {
    function showModal() {
      modal.classList.add("visible");
      modalOverlay.classList.remove("hidden");

      document.addEventListener("keydown", hideModalModule.keyboardCloseModal);
    }

    return {
      showModal,
    };
  })();

  const hideModalModule = (function () {
    function hideModal() {
      modal.classList.remove("visible");
      modalOverlay.classList.add("hidden");

      document.removeEventListener("keydown", keyboardCloseModal);
    }

    function keyboardCloseModal() {
      const key = event.key;
      if (key === "Escape") {
        hideModal();
      }
    }

    hideModal();

    return {
      hideModal,
      keyboardCloseModal,
    };
  })();

  addTask.addEventListener("click", displayModalModule.showModal);
  modalOverlay.addEventListener("click", hideModalModule.hideModal);
});
