import FormValidator from "./FormValidator.js";


const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

export const toggleButtonState = (inputList, button, settingsObject) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(settingsObject.inactiveButtonClass)
    button.disabled = true
  } else {
    button.classList.remove(settingsObject.inactiveButtonClass)
    button.disabled = false
  }
}

const enableValidation = (settingsObject) => {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formList.forEach((form) => {
    new FormValidator(settingsObject, form).enableValidation()
  });
}

enableValidation(settingsValidation)


