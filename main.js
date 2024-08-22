document.addEventListener("DOMContentLoaded", () => {
  // Task Stats

  const pendingTasksNumber = document.querySelector(".pending-number");
  const completedTasksNumber = document.querySelector(".completed-number");
  const dailyTasksNumber = document.querySelector(".daily-tasks-number");
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
  const editTaskButton = document.querySelector(".edit-task-button");

  // Other

  const completedSectionCount = document.querySelector(
    "completed-section-tasks-count"
  );

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

      editTask.editTaskDisplay();
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

  const storedFinishedTasks = (function () {
    const finishedTasks = [];
    return { finishedTasks };
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

      const taskInformation = document.createElement("div");
      taskInformation.classList.add("task-information");

      const completeTaskButton = document.createElement("button");
      completeTaskButton.classList.add("complete-task");
      completeTaskButton.addEventListener(
        "click",
        completeTask.completeNewTask
      );

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

      const hrContainer = document.createElement("div");
      hrContainer.classList.add("hr-container");

      const displayedTaskHr = document.createElement("hr");
      displayedTaskHr.classList.add("task-hr");

      tasksContainer.appendChild(displayedTask);
      hrContainer.appendChild(displayedTaskHr);

      displayedTask.appendChild(taskInformation);
      displayedTask.appendChild(hrContainer);

      taskInformation.appendChild(taskLeftSideContainer);
      taskInformation.appendChild(taskRightSideContainer);

      taskLeftSideContainer.appendChild(displayedTaskContent);
      taskLeftSideContainer.appendChild(completeTaskButton);
      taskLeftSideContainer.appendChild(displayedTaskContent);

      completeTaskButton.appendChild(svg);
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
    function editTaskDisplay() {
      const errors = displayInputErrors.displayErrors();
      if (errors) {
        return;
      }

      const taskContainerIndex = tasksContainer.children;
      const taskIndexList = Array.from(taskContainerIndex);
      9;

      const taskNode = event.target.closest(".task");
      const clickedTaskIndex = taskIndexList.indexOf(taskNode);
      const currentTaskIndex = clickedTaskIndex - 1;

      editTitleInput.value = `${storedTasks.myTasks[currentTaskIndex].title}`;
      editDescriptionInput.value = `${storedTasks.myTasks[currentTaskIndex].description}`;
      editDueDateInput.value = `${storedTasks.myTasks[currentTaskIndex].dueDate}`;
    }

    return { editTaskDisplay };
  })();

  // const updateExistingTask = (function () {
  //   function updateTask() {
  //     const editTaskTitle = editTitleInput.value;
  //     const editTaskDescription = editDescriptionInput.value;
  //     const editTaskDueDate = editDueDateInput.value;

  //     storedTasks.myTasks[0].title = editTaskTitle;
  //     storedTasks.myTasks[0].description = editTaskDescription;
  //     storedTasks.myTasks[0].dueDate = editTaskDueDate;
  //     console.log(storedTasks.myTasks);

  //     hideEditModalModule.hideModal();
  //   }

  //   return { updateTask };
  // })();

  const completeTask = (function () {
    function completeNewTask() {
      const taskIndex = storedTasks.myTasks.indexOf(event.target, 0);
      storedTasks.myTasks.splice(taskIndex, 1);
      const taskNode = event.target.closest(".task");
      storedFinishedTasks.finishedTasks.push(taskNode);
      console.log(storedFinishedTasks.finishedTasks);

      taskNode.remove();
      displayTaskStats.taskStats();
    }

    return { completeNewTask };
  })();

  const displayTaskStats = (function () {
    function taskStats() {
      pendingTasksNumber.textContent = `${storedTasks.myTasks.length}`;
      completedTasksNumber.textContent = `${storedFinishedTasks.finishedTasks.length}`;
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
  // editTaskButton.addEventListener("click", updateExistingTask.updateTask);
  modalOverlay.addEventListener("click", hideModalModule.hideModal);
  editModalOverlay.addEventListener("click", hideEditModalModule.hideModal);
});
