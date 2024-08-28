import { mainContainer, mainContainerCompleted } from "./dom.js";

export const homeSection = (function () {
  function showHomeSection() {
    mainContainer.classList.add("visible");
    mainContainerCompleted.classList.add("invisible");
  }

  return { showHomeSection };
})();

export const showCompletedTasksSection = (function () {
  function showCompletedSection() {
    mainContainer.classList.add("invisible");
    mainContainerCompleted.classList.add("visible");
  }

  return { showCompletedSection };
})();
