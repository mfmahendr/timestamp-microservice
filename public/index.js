const form = document.querySelector('form');
const input = document.querySelector('input');
const url = window.location.href;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(input.value) window.location.href = url + 'api/' + input.value;
});