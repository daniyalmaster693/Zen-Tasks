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

  //  Modal

  const modal = document.querySelector(".modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const addTask = document.querySelector(".add-task-button");

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

      const displayedTaskDate = document.createElement("div");
      displayedTaskDate.classList.add("task-date");

      const displayedTaskDueDate = document.createElement("p");
      displayedTaskDueDate.classList.add("date");
      displayedTaskDueDate.textContent = `${this.dueDate}`;

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

      taskRightSideContainer.appendChild(displayedTaskDate);
      displayedTaskDate.appendChild(displayedTaskDueDate);
    }
  }

  const createTasks = (function () {
    function addNewTask() {
      const taskTitle = titleInput.value;
      const taskDescription = descriptionInput.value;
      const taskDueDate = dueDateInput.value;

      const userNewTask = new Task(taskTitle, taskDescription, taskDueDate);
      userNewTask.displayTask();
      storedTasks.myTasks.push(userNewTask);

      displayTaskStats.taskStats();
      hideModalModule.hideModal();
    }

    return { addNewTask };
  })();

  const displayTaskStats = (function () {
    function taskStats() {
      pendingTasksNumber.textContent = `${storedTasks.myTasks.length}`;
    }

    return { taskStats };
  })();

  createTask.addEventListener("click", createTasks.addNewTask);
  addTask.addEventListener("click", displayModalModule.showModal);
  modalOverlay.addEventListener("click", hideModalModule.hideModal);
});
