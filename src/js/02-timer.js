import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/common.css';
import confetti from 'canvas-confetti';

const startBtn = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

let countdownInterval = null;

startBtn.setAttribute('disabled', true);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, 0);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
      return;
    }
    startBtn.removeAttribute('disabled');
    const targetTime = selectedDates[0].getTime();
    const showTimer = () => {
      const now = new Date().getTime();
      const timeDifference = targetTime - now;
      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        daysRef.textContent = '0';
        hoursRef.textContent = '00';
        minutesRef.textContent = '00';
        secondsRef.textContent = '00';
        startBtn.setAttribute('disabled', true);

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        return;
      }
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      daysRef.textContent = addLeadingZero(days);
      hoursRef.textContent = addLeadingZero(hours);
      minutesRef.textContent = addLeadingZero(minutes);
      secondsRef.textContent = addLeadingZero(seconds);
    };

    const onClick = () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
      showTimer();
      countdownInterval = setInterval(showTimer, 1000);
    };

    startBtn.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', { ...options });
