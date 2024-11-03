Electron Notes App
A simple, cross-platform note-taking application built with Electron, using Tailwind CSS for styling and JSON for data persistence. The app allows users to create, edit, and save notes with a clean, intuitive UI.


Features
Add New Notes: Write and save notes with a click.
Edit Existing Notes: Click on a note from the list to view and edit it.
Persistent Storage: All notes are saved in a JSON file, ensuring they are available on app restart.
Responsive UI: Designed with Tailwind CSS for a clean, responsive layout.


Project Structure
electron-notes-app/
├── src/
│   ├── assets/
│   │   └── styles.css           # Tailwind CSS input file
│   ├── index.html               # Main HTML layout
│   ├── main.js                  # Electron main process file
│   ├── renderer.js              # Renderer process JavaScript
│   └── notes.json               # JSON file for storing notes
├── tailwind.config.js           # Tailwind CSS configuration
├── package.json                 # Project configuration and dependencies
└── README.md                    # Project documentation


Getting Started
Prerequisites
Node.js (v14 or above recommended)
npm or yarn (for installing dependencies)


Installation

Clone the repository:
git clone https://github.com/ayush7078/electrons-note-app.git
cd electron-notes-app
Install dependencies:

npm install
Install Tailwind CSS and related dependencies:

npm install -D tailwindcss postcss autoprefixer
Initialize Tailwind CSS:

npx tailwindcss init -p
Compile Tailwind CSS:

npm run build:css


Running the App
To run the app locally:

npm start
This will start the Electron app, compiling Tailwind CSS and opening the main application window.


Usage
Adding Notes: Type your note in the text area and click "Save Note" to save it.
Editing Notes: Select a note from the list on the left to load it in the text area, make changes, and click "Save Note" again to update it.
Persistent Storage: Notes are stored in notes.json, so all saved notes will be available the next time the app is launched.


Scripts
npm start: Compiles Tailwind CSS and launches the Electron application.
npm run build:css: Compiles Tailwind CSS from src/assets/styles.css to src/assets/tailwind.output.css.


Dependencies
Electron - Framework for building cross-platform desktop apps
Tailwind CSS - Utility-first CSS framework
fs-extra - Extended file system module for Node.js


Dev Dependencies
PostCSS - CSS transformation tool
Autoprefixer - PostCSS plugin to parse CSS and add vendor prefixes


License
This project is licensed under the ISC License.