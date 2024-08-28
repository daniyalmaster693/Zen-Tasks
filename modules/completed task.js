import { taskContainerCompleted } from "./dom.js";

export const storedFinishedTasks = (function () {
  const finishedTasks = [];
  return { finishedTasks };
})();

export class CompletedTask {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  displayCompletedTask() {
    const displayedTask = document.createElement("div");
    displayedTask.classList.add("task-completed");

    const taskInformation = document.createElement("div");
    taskInformation.classList.add("task-information-completed");

    const completeTaskButton = document.createElement("button");
    completeTaskButton.classList.add("complete-task-completed");

    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.classList.add("task-check-completed");

    svg.setAttribute("class", "task-check-completed");
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
    taskLeftSideContainer.classList.add("task-left-side-completed");

    const displayedTaskContent = document.createElement("div");
    displayedTaskContent.classList.add("task-content-completed");

    const displayedTaskTitle = document.createElement("h2");
    displayedTaskTitle.classList.add("task-title-completed");
    displayedTaskTitle.textContent = `${this.title}`;

    const displayedTaskDescription = document.createElement("p");
    displayedTaskDescription.classList.add("task-description-completed");
    displayedTaskDescription.textContent = `${this.description}`;

    const taskRightSideContainer = document.createElement("div");
    taskRightSideContainer.classList.add("task-right-side-completed");

    const displayedTaskDueDate = document.createElement("p");
    displayedTaskDueDate.classList.add("date-completed");
    displayedTaskDueDate.textContent = `${this.dueDate}`;

    const displayedTaskActions = document.createElement("div");
    displayedTaskActions.classList.add("task-actions-completed");

    const editTaskButton = document.createElement("button");
    editTaskButton.classList.add("edit-task-completed");

    const pencilIcon = document.createElement("img");
    pencilIcon.src = "/Odin Project/Zen-Tasks/Assets/Edit.svg";
    pencilIcon.alt = "Pencil Icon";

    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.classList.add("delete-task-completed");

    const trashIcon = document.createElement("img");
    trashIcon.src = "/Odin Project/Zen-Tasks/Assets/Trash.svg";
    trashIcon.alt = "Trash Icon";

    const hrContainer = document.createElement("div");
    hrContainer.classList.add("hr-container-completed");

    const displayedTaskHr = document.createElement("hr");
    displayedTaskHr.classList.add("task-hr-completed");

    taskContainerCompleted.appendChild(displayedTask);
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
    deleteTaskButton.appendChild(trashIcon);
  }
}
