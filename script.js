// Update the digital clock every second.
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const ampmElement = document.getElementById('ampm');
const dateElement = document.getElementById('date');

function updateClock() {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Convert the 24-hour time to a 12-hour time.
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
  ampmElement.textContent = ampm;
  dateElement.textContent = currentTime.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

updateClock();
setInterval(updateClock, 1000);

// Stopwatch values and button elements.
const stopwatchDisplay = document.getElementById('stopwatch-display');
const stopwatchStatus = document.getElementById('stopwatch-status');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');

let stopwatchInterval;
let startTime = 0;
let savedTime = 0;
let stopwatchRunning = false;

function displayStopwatch() {
  const currentTime = stopwatchRunning
    ? savedTime + (performance.now() - startTime)
    : savedTime;
  const hours = Math.floor(currentTime / 3600000);
  const minutes = Math.floor((currentTime % 3600000) / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const centiseconds = Math.floor((currentTime % 1000) / 10);

  stopwatchDisplay.innerHTML =
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}` +
    `<span class="milliseconds">.${String(centiseconds).padStart(2, '0')}</span>`;
}

function startStopwatch() {
  if (stopwatchRunning) {
    return;
  }

  stopwatchRunning = true;
  startTime = performance.now();
  stopwatchStatus.textContent = 'Running...';
  stopwatchInterval = setInterval(displayStopwatch, 10);
}

function stopStopwatch() {
  if (!stopwatchRunning) {
    return;
  }

  savedTime += performance.now() - startTime;
  stopwatchRunning = false;
  clearInterval(stopwatchInterval);
  stopwatchStatus.textContent = 'Stopped.';
  displayStopwatch();
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  startTime = 0;
  savedTime = 0;
  stopwatchStatus.textContent = 'Ready to start.';
  displayStopwatch();
}

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);

displayStopwatch();
