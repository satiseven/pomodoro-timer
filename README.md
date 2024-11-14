# Pomodoro Timer App

A simple yet powerful Pomodoro Timer application built with Electron and Node.js. This app helps boost productivity using the Pomodoro Technique by tracking work sessions and breaks. Customize work/break durations, save session history, and receive desktop notifications.

## Features

- **Start/Pause**: Start and pause the timer at any point.
- **Customizable Durations**: Set work and reset (break) times.
- **Session History**: Track previous work and reset sessions.
- **Automatic Reset Time Adjustment**: After two sessions, break time changes to 15 minutes. After 15 resets, it reverts back to 5 minutes.
- **Cross-Platform**: Runs on macOS, Windows, and Linux.

## Prerequisites

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Electron**: The Electron framework is required to run and build the app.

  ```bash
  npm install -g electron
  ```

## Installation

- Clone the repository:

  ```bash
  git clone <https://github.com/yourusername/pomodoro-timer-app.git>
  cd pomodoro-timer-app
  ```

## Install dependencies

```bash
npm install
```

- Start the application:

  ```bash
  npm start
  ```

## Usage

- Start/Pause Timer: Click the "Start" button to begin the timer. While the timer is running, the button switches to "Pause." Click "Pause" to pause the timer and click "Start" again to resume.
- Customize Durations: Use the input fields to set custom durations for work and reset times.
  View Session History: Navigate to the "Session History" tab to view past work and reset sessions.
- Automatic Adjustments: After every two sessions, reset time changes to 15 minutes. After 15 resets, it reverts to 5 minutes.

## Build

To package the app as a standalone executable for macOS, Windows, and Linux, follow these instructions.

- Install Electron Packager:

```bash
npm install -g electron-packager

- Build for Specific Platforms:
```

- macOS:

```bash
electron-packager . PomodoroTimer --platform=darwin --arch=x64 --out=dist --overwrite --icon=path/to/icon.icns
```

- Windows:

```bash
electron-packager . PomodoroTimer --platform=win32 --arch=x64 --out=dist --overwrite --icon=path/to/icon.ico
```

> Ensure --icon points to a .ico file for Windows.

- Linux:

```bash
electron-packager . PomodoroTimer --platform=linux --arch=x64 --out=dist --overwrite --icon=path/to/icon.png
```

> Use a .png file for the Linux icon, typically 512x512 pixels.

- Locate the Executable:
  - After running the packaging commands, the dist folder will contain the standalone application for the specified platform.
