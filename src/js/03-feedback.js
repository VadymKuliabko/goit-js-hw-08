import throttle from 'lodash.throttle';

const key = 'feedback-form-state';

const refs = {
  form: document.querySelector('feedback-form'),
  input: document.querySelector('feedback-form input'),
  textarea: document.querySelector('feedback-form textarea'),
};

const formData = {};
getFormData();

refs.input.addEventListener('input', throttle(onInput, 500));
refs.textarea.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(key, JSON.stringify(formData));
}

function getFormData() {
  const dataForm = JSON.parse(localStorage.getItem(key));

  if (dataForm) {
    refs.textarea.value = dataForm.message;
    formData.message = dataForm.message;
    refs.input.value = dataForm.email;
    formData.email = dataForm.email;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(key);
}

console.log(formData.email);
console.log(formData.message);
