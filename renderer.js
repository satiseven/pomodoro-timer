const db = require("./database"); // Import the database
const fs = require("fs"); // For exporting data if needed
const path = require("path"); // For file paths

document.addEventListener("DOMContentLoaded", () => {
  // Elements for timer display and buttons
  const startButton = document.getElementById("start-timer");
  const skipResetButton = document.getElementById("skip-reset");
  const timerDisplay = document.getElementById("timer-display");
  const workTimeInput = document.getElementById("work-time-input");
  const resetTimeInput = document.getElementById("reset-time-input");

  let workTime = 25 * 60; // Default work time in seconds
  let resetTime = 5 * 60; // Default reset time in seconds
  let timerInterval;
  let isPaused = false; // Track if the timer is paused
  let remainingTime; // Store remaining time for resuming
  let sessionCount = 0; // Track work/reset sessions

  // Function to toggle between Start and Pause
  function toggleStartPause() {
    if (isPaused) {
      // Resume timer if it's paused
      isPaused = false;
      startButton.textContent = "Pause";
      startButton.classList.remove("bg-yellow-500");
      startButton.classList.add("bg-blue-500");
      resumeTimer(); // Resume the timer with remaining time
    } else {
      // Pause the timer
      isPaused = true;
      clearInterval(timerInterval); // Pause timer interval
      startButton.textContent = "Start";
      startButton.classList.remove("bg-blue-500");
      startButton.classList.add("bg-yellow-500");
    }
  }

  // Function to start the work timer
  function startWorkTimer() {
    remainingTime = workTime; // Initialize remaining time with work time
    startButton.textContent = "Pause";
    startButton.classList.remove("bg-blue-500");
    startButton.classList.add("bg-yellow-500");
    updateTimer(); // Start the countdown
  }

  // Function to update the timer display
  function updateTimer() {
    timerInterval = setInterval(() => {
      if (isPaused) {
        clearInterval(timerInterval); // Stop the timer if paused
        return;
      }
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        sessionCount++;
        adjustResetTime(); // Adjust reset time if necessary
        startResetTimer(); // Switch to reset timer
      } else {
        remainingTime--;
      }
    }, 1000);
  }

  // Function to resume timer from paused state
  function resumeTimer() {
    updateTimer(); // Continue the countdown with the remaining time
  }

  // Function to start the reset timer
  function startResetTimer() {
    remainingTime = resetTime; // Initialize remaining time with reset time
    timerDisplay.textContent = "Break Time!";
    updateTimer(); // Start the countdown
  }

  // Adjust reset time based on session count
  function adjustResetTime() {
    if (sessionCount % 2 === 0) {
      resetTime = 15 * 60; // Change reset time to 15 minutes every two sessions
      resetTimeInput.value = 15;
    }
    if (sessionCount % 15 === 0) {
      resetTime = 5 * 60; // Reset to 5 minutes after 15 sessions
      resetTimeInput.value = 5;
    }
  }

  // Event listener for Start/Pause button
  startButton.addEventListener("click", () => {
    if (!timerInterval) {
      // Start a new work timer if no timer is running
      startWorkTimer();
    } else {
      // Toggle pause/resume if timer is already running
      toggleStartPause();
    }
  });

  // Event listener for Skip Reset button
  skipResetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    const resetSkippedTime = new Date();

    db.insert(
      {
        type: "reset",
        startTime: resetSkippedTime,
        endTime: resetSkippedTime,
        skipped: true,
      },
      (err) => {
        if (err) console.error("Error saving skipped reset session:", err);
      },
    );

    skipResetButton.classList.add("hidden");
    startButton.classList.remove("hidden");
    timerDisplay.textContent = "Reset Skipped!";
  });

  // Load session history and preferences on startup
  function loadPreferences() {
    db.findOne({ type: "preferences" }, (err, doc) => {
      if (err) console.error("Error loading preferences:", err);
      if (doc) {
        workTime = doc.workTime;
        resetTime = doc.resetTime;
        workTimeInput.value = workTime / 60;
        resetTimeInput.value = resetTime / 60;
      }
    });
  }

  function loadSessionHistory() {
    db.find({})
      .sort({ startTime: 1 })
      .exec((err, docs) => {
        if (err) {
          console.error("Error loading session history:", err);
          return;
        }
        sessionHistory.innerHTML = docs
          .map(
            (doc) =>
              `<p>${doc.type} - Start: ${new Date(doc.startTime).toLocaleTimeString()}, End: ${new Date(doc.endTime).toLocaleTimeString()}</p>`,
          )
          .join("");
      });
  }

  loadPreferences();
  loadSessionHistory();
});
