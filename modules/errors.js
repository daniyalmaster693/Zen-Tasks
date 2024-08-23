import { titleInput, inputError } from "./dom.js";

export const displayInputErrors = (function () {
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
