import FormValidator from "./FormValidator.js";


const enableValidation = (settingsObject) => {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(settingsObject, form)
    validator.enableValidation()
  });
}

enableValidation(settingsValidation)


