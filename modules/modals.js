import {
  mainContainer,
  modal,
  modalOverlay,
  editModal,
  editModalOverlay,
  titleInput,
  descriptionInput,
  dueDateInput,
  taskPriorityLevel,
  inputError,
} from "./dom.js";

import { editTask } from "./task management.js";

// Displaying Modals

export const displayModalModule = (function () {
  function showModal() {
    modal.classList.add("visible");
    modalOverlay.classList.remove("hidden");

    document.addEventListener("keydown", hideModalModule.keyboardCloseModal);
  }

  return {
    showModal,
  };
})();

export const hideModalModule = (function () {
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

export const displayEditModalModule = (function () {
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

export const hideEditModalModule = (function () {
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

export const clearModalModule = (function () {
  function clearModal() {
    titleInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = "";
    taskPriorityLevel.selectedIndex = 3;
    inputError.opacity = "0";
  }

  return { clearModal };
})();

// export const showCompletedTasksSection = (function () {
//   function showCompletedSection() {
//     mainContainer.style.display = "none";
//     mainContainerCompleted.style.display = "flex";
//   }

//   return { showCompletedSection };
// })();

// export const homeSection = (function () {
//   function showHomeSection() {
//     mainContainer.style.display = "flex";
//     mainContainerCompleted.style.display = "none";
//   }

//   return { showHomeSection };
// })();
