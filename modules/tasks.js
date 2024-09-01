import { tasksContainer } from "./dom.js";
import { completeTask, deleteTask } from "./task management.js";
import { displayEditModalModule } from "./modals.js";

export const storedTasks = (function () {
  const myTasks = [];
  return { myTasks };
})();

export class Task {
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
    completeTaskButton.addEventListener("click", completeTask.completeNewTask);

    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.classList.add("task-check");

    if ((this.priority = "High")) {
      svg.classList.add("high-priority");
    }

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
    editTaskButton.addEventListener("click", displayEditModalModule.showModal);

    deleteTaskButton.appendChild(trashIcon);
    deleteTaskButton.addEventListener("click", deleteTask.deleteNewTask);
  }
}
