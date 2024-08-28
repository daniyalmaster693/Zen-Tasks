import { mainContainer, mainContainerCompleted } from "./dom.js";

export const homeSection = (function () {
  function showHomeSection() {
    mainContainer.classList.add("visible");
    mainContainer.classList.remove("invisible");

    mainContainerCompleted.classList.add("invisible");
    mainContainerCompleted.classList.remove("visible");
  }

  return { showHomeSection };
})();

export const showCompletedTasksSection = (function () {
  function showCompletedSection() {
    mainContainer.classList.add("invisible");
    mainContainer.classList.remove("visible");

    mainContainerCompleted.classList.add("visible");
    mainContainerCompleted.classList.remove("invisible");
  }

  return { showCompletedSection };
})();
