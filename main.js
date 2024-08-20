document.addEventListener("DOMContentLoaded", () => {
  // Task Stats

  const pendingTasksNumber = document.querySelector(".pending-number");
  const completedTasksNumber = document.querySelector(".completed-number");
  const dailyGoalTasksNumber = document.querySelector(".daily-goal-number");
  const tasksContainer = document.querySelector(".tasks-container");

  // Creating a task fields

  const titleInput = document.querySelector(".task-title-input");
  const descriptionInput = document.querySelector(".task-description-input");
  const dueDateInput = document.querySelector(".task-due-date-input");
  const taskPriorityLevel = document.querySelector(".task-priority-level");
  const createTask = document.querySelector(".create-task");

  // Add Task Modal

  const modal = document.querySelector(".modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const inputError = document.querySelector(".input-error");
  const addTask = document.querySelector(".add-task-button");

  // Editing a task fields

  const editTitleInput = document.querySelector(".edit-task-title-input");
  const editDescriptionInput = document.querySelector(
    ".edit-task-description-input"
  );
  const editDueDateInput = document.querySelector(".edit-task-due-date-input");

  // Edit Modal

  const editModal = document.querySelector(".edit-modal");
  const editModalOverlay = document.querySelector(".edit-modal-overlay");

  // Displaying Modals

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

  const displayEditModalModule = (function () {
    function showModal() {
      editModal.classList.add("visible");
      editModalOverlay.classList.remove("hidden");

      document.addEventListener(
        "keydown",
        hideEditModalModule.keyboardCloseModal
      );

      editTask.editNewTask();
    }

    return {
      showModal,
    };
  })();

  const hideEditModalModule = (function () {
    function hideModal() {
      editModal.classList.remove("visible");
      editModalOverlay.classList.add("hidden");

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

  const clearModalModule = (function () {
    function clearModal() {
      titleInput.value = "";
      descriptionInput.value = "";
      dueDateInput.value = "";
      taskPriorityLevel.selectedIndex = 3;
      inputError.opacity = "0";
    }

    return { clearModal };
  })();

  // Creating Tasks

  const storedTasks = (function () {
    const myTasks = [];
    return { myTasks };
  })();

  class Task {
    constructor(title, description, dueDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
    }

    displayTask() {
      const displayedTask = document.createElement("div");
      displayedTask.classList.add("task");

      const svgNamespace = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNamespace, "svg");
      svg.classList.add("task-check");

      svg.setAttribute("class", "task-check");
      svg.setAttribute("width", "24");
      svg.setAttribute("height", "24");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "none");
      svg.setAttribute("stroke", "#f0f5f9");
      svg.setAttribute("stroke-width", "2");
      svg.setAttribute("stroke-linecap", "round");
      svg.setAttribute("stroke-linejoin", "round");

      const circle = document.createElementNS(svgNamespace, "circle");
      circle.setAttribute("cx", "12");
      circle.setAttribute("cy", "12");
      circle.setAttribute("r", "10");

      svg.appendChild(circle);

      const taskLeftSideContainer = document.createElement("div");
      taskLeftSideContainer.classList.add("task-left-side");

      const displayedTaskContent = document.createElement("div");
      displayedTaskContent.classList.add("task-content");

      const displayedTaskTitle = document.createElement("h2");
      displayedTaskTitle.classList.add("task-title");
      displayedTaskTitle.textContent = `${this.title}`;

      const displayedTaskDescription = document.createElement("p");
      displayedTaskDescription.classList.add("task-description");
      displayedTaskDescription.textContent = `${this.description}`;

      const taskRightSideContainer = document.createElement("div");
      taskRightSideContainer.classList.add("task-right-side");

      const displayedTaskDueDate = document.createElement("p");
      displayedTaskDueDate.classList.add("date");
      displayedTaskDueDate.textContent = `${this.dueDate}`;

      const displayedTaskActions = document.createElement("div");
      displayedTaskActions.classList.add("task-actions");

      const editTaskButton = document.createElement("button");
      editTaskButton.classList.add("edit-task");

      const pencilIcon = document.createElement("img");
      pencilIcon.src = "/Odin Project/Zen-Tasks/Assets/Edit.svg";
      pencilIcon.alt = "Pencil Icon";

      const deleteTaskButton = document.createElement("button");
      deleteTaskButton.classList.add("delete-task");

      const trashIcon = document.createElement("img");
      trashIcon.src = "/Odin Project/Zen-Tasks/Assets/Trash.svg";
      trashIcon.alt = "Trash Icon";

      const displayedTaskHr = document.createElement("hr");
      displayedTaskHr.classList.add("task-hr");

      tasksContainer.appendChild(displayedTask);
      tasksContainer.appendChild(displayedTaskHr);

      displayedTask.appendChild(taskLeftSideContainer);
      displayedTask.appendChild(taskRightSideContainer);

      taskLeftSideContainer.appendChild(displayedTaskContent);
      taskLeftSideContainer.appendChild(svg);
      taskLeftSideContainer.appendChild(displayedTaskContent);

      displayedTaskContent.appendChild(displayedTaskTitle);
      displayedTaskContent.appendChild(displayedTaskDescription);

      taskRightSideContainer.appendChild(displayedTaskDueDate);
      taskRightSideContainer.appendChild(displayedTaskActions);

      displayedTaskActions.appendChild(editTaskButton);
      displayedTaskActions.appendChild(deleteTaskButton);

      editTaskButton.appendChild(pencilIcon);
      editTaskButton.addEventListener(
        "click",
        displayEditModalModule.showModal
      );

      deleteTaskButton.appendChild(trashIcon);
      deleteTaskButton.addEventListener("click", deleteTask.deleteNewTask);
    }
  }

  const createTasks = (function () {
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
      console.log(storedTasks.myTasks);
    }

    return { addNewTask };
  })();

  const deleteTask = (function () {
    function deleteNewTask() {
      const taskIndex = storedTasks.myTasks.indexOf(event.target, 0);
      storedTasks.myTasks.splice(taskIndex, 1);
      const taskNode = event.target.closest(".task");
      taskNode.remove();
      displayTaskStats.taskStats();
    }

    return { deleteNewTask };
  })();

  const editTask = (function () {
    function editNewTask() {
      const taskIndex = storedTasks.myTasks.indexOf(event.target, 0);

      editTitleInput.value = `${storedTasks.myTasks[0].title}`;
      editDescriptionInput.value = `${storedTasks.myTasks[0].description}`;
      editDueDateInput.value = `${storedTasks.myTasks[0].dueDate}`;

      // Add priority
    }

    return { editNewTask };
  })();

  const displayTaskStats = (function () {
    function taskStats() {
      pendingTasksNumber.textContent = `${storedTasks.myTasks.length}`;
    }

    return { taskStats };
  })();

  const displayInputErrors = (function () {
    function displayErrors() {
      let errors = false;

      if (titleInput.value === "") {
        titleInput.classList.add("error");
        inputError.style.opacity = "1";
        errors = true;
      } else {
        titleInput.classList.remove("error");
        inputError.style.opacity = "0";
        errors = false;
      }

      return errors;
    }

    return { displayErrors };
  })();

  createTask.addEventListener("click", createTasks.addNewTask);
  addTask.addEventListener("click", displayModalModule.showModal);
  modalOverlay.addEventListener("click", hideModalModule.hideModal);
  editModalOverlay.addEventListener("click", hideEditModalModule.hideModal);
});
