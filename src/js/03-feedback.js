import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

enteredValues();

form.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
});

form.addEventListener(
  'input',
  throttle(evt => {
    let savedForm = localStorage.getItem(STORAGE_KEY);
    savedForm = savedForm ? JSON.parse(savedForm) : {};
    savedForm[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedForm));
  }, 500),
);

function enteredValues() {
  let savedForm = localStorage.getItem(STORAGE_KEY);
  if (savedForm) {
    savedForm = JSON.parse(savedForm);
    Object.entries(savedForm).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
