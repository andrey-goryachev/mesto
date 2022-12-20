//показать ошибку
const showInputError = (form, inputElement, errorMessage) => {
  const errorElement = form.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  // errorElement.classList.add('')
}

// спрятать ошибку
const hideInputError = (form, inputElement) => {
  const errorElement = form.querySelector(`.${inputElement.name}-error`);
  console.log('errorElement')
  console.log(errorElement)
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
}

// показать ошибку если инпут не валидный
const isValid = (form, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage);
    console.log(inputElement.validity.valid)
  } else {
    hideInputError(form, inputElement);
  }
}

// хотя бы один инпут невалидный?
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

// сделать кнопку неактивной, если хотя бы один инпут не валиден
const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__submit_inactive')
  } else {
    button.classList.remove('popup__submit_inactive')
  }
}

// установить слушатель изменения для всех инпутов формы,
const setEventListenersForm = (form) => {
  const inputLists = Array.from(form.querySelectorAll('.popup__input'))
  const button = form.querySelector('.popup__submit')
  toggleButtonState(inputLists, button)
  inputLists.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input)
      toggleButtonState(inputLists, button)
    })
  })
}

// установить валидацию на каждую форму
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((form) => {
    setEventListenersForm(form);
  });
}

enableValidation();

