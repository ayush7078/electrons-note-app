const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs-extra');

const notesFilePath = path.join(__dirname, 'notes.json');

// Create the main window
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile(path.join(__dirname, 'index.html'));
}

// Initialize the app
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit app on close
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Load notes from JSON
ipcMain.handle('load-notes', async () => {
  try {
    const notesData = await fs.readJson(notesFilePath);
    return notesData;
  } catch (error) {
    return [];
  }
});

// Save a new note to JSON
ipcMain.handle('save-note', async (event, note) => {
  try {
    const notes = await fs.readJson(notesFilePath).catch(() => []);
    notes.push(note);
    await fs.writeJson(notesFilePath, notes);
    return notes;
  } catch (error) {
    console.error(error);
  }
});

// Update an existing note in JSON by ID
ipcMain.handle('update-note', async (event, { content, id }) => {
  try {
    const notes = await fs.readJson(notesFilePath).catch(() => []);
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex !== -1) {
      notes[noteIndex].content = content;
      await fs.writeJson(notesFilePath, notes);
    }
    return notes;
  } catch (error) {
    console.error(error);
  }
});
