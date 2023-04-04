import '../css/common.css';

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  stopButton.disabled = true;
  startButton.disabled = false;
  clearInterval(intervalId);
});
