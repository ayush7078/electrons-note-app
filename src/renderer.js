const { ipcRenderer } = require('electron');

const notesList = document.getElementById('notes-list');
const noteText = document.getElementById('note-text');
const saveButton = document.getElementById('save-button');

let selectedNoteId = null; // Track the selected note ID

// Load notes from the main process
async function loadNotes() {
  const notes = await ipcRenderer.invoke('load-notes');
  displayNotes(notes);
}

// Display notes in the list view
function displayNotes(notes) {
  notesList.innerHTML = '';
  notes.forEach((note) => {
    const noteItem = document.createElement('div');
    noteItem.textContent = note.content;
    noteItem.className = 'note-item p-2 cursor-pointer hover:bg-gray-200';
    noteItem.onclick = () => {
      noteText.value = note.content;
      selectedNoteId = note.id; // Set the ID of the selected note
    };
    notesList.appendChild(noteItem);
  });
}

// Save the current note
async function saveNote() {
  const noteContent = noteText.value.trim();
  if (noteContent) {
    let notes;
    if (selectedNoteId) {
      // Update existing note
      notes = await ipcRenderer.invoke('update-note', { content: noteContent, id: selectedNoteId });
      selectedNoteId = null; // Reset the selected ID after updating
    } else {
      // Add a new note with a unique ID
      const newNote = { id: Date.now().toString(), content: noteContent }; // Use timestamp as a unique ID
      notes = await ipcRenderer.invoke('save-note', newNote);
    }
    displayNotes(notes);
    noteText.value = ''; // Clear the text area
  }
}

saveButton.addEventListener('click', saveNote);
loadNotes();
