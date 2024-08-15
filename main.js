document.addEventListener("DOMContentLoaded", () => {
  const taskTitle = document.querySelector(".task-title-input");
  const taskDescription = document.querySelector(".task-description-input");
  const taskDueDate = document.querySelector(".task-due-date-input");
  const addTaskButton = document.querySelector(".add-new-task");
  const modal = document.querySelector(".modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const createTask = document.querySelector(".create-task");
  const addTask = document.querySelector(".add-task-button");

  const allTasks = [];
  const todayTasks = [];
  const noDateTasks = [];

  function showModal() {
    modal.classList.add("visible");
    modalOverlay.classList.remove("hidden");

    document.addEventListener("keydown", keyboardCloseModal);
  }

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

  addTask.addEventListener("click", showModal);
  modalOverlay.addEventListener("click", hideModal);
});
