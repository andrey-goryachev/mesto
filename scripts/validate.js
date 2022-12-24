//показать ошибку
const showInputError = (form, inputElement, errorMessage, settingsObject) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsObject.inputErrorClass);
  errorElement.textContent = errorMessage;
}

// спрятать ошибку
const hideInputError = (form, inputElement, settingsObject) => {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObject.inputErrorClass);
  errorElement.textContent = '';
}

// показать ошибку если инпут не валидный
const isValid = (form, inputElement, settingsObject) => {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage, settingsObject);
  } else {
    hideInputError(form, inputElement, settingsObject);
  }
}

// хотя бы один инпут невалидный?
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

// сделать кнопку неактивной, если хотя бы один инпут не валиден
const toggleButtonState = (inputList, button, settingsObject) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(settingsObject.inactiveButtonClass)
    button.disabled = true
  } else {
    button.classList.remove(settingsObject.inactiveButtonClass)
    button.disabled = false
  }
}

// установить слушатель изменения для всех инпутов формы,
const setEventListenersForm = (form, settingsObject) => {
  const inputList = Array.from(form.querySelectorAll(settingsObject.inputSelector))
  const button = form.querySelector(settingsObject.submitButtonSelector)
  toggleButtonState(inputList, button, settingsObject)
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input,settingsObject)
      toggleButtonState(inputList, button, settingsObject)
    })
  })
}

const enableValidation = (settingsObject) => {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formList.forEach((form) => {
    setEventListenersForm(form, settingsObject);
  });
}

enableValidation(settingsValidation)


