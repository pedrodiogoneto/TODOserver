const Note = require('../models/Note')

function noteService() {

    async function getAllNotes() {
        try {
            let notesList = await Note.find({ })
            return notesList
        }
        catch (err) {
          throw err;
        }
    }

    async function postNewNote(title, content) {
        try {
            let newNote = await Note({ title, content }).save({ title, content })
            return getAllNotes()
        }
        catch (err) {
          throw err;
        }
    }
    
    async function editNote(id, title, content) {
        try {
            let note = await Note.findOneAndUpdate({ _id: id }, { title, content })
            return getAllNotes()
        }
        catch (err) {
          throw err;
        }
    }
 
    async function deleteNote(id) {
        try {
            let note = await Note.remove({ _id: id })
            return getAllNotes()
        }
        catch (err) {
          throw err;
        }
    }

    return {
        getAllNotes,
        postNewNote,
        editNote,
        deleteNote,
    }

}

module.exports = noteService();
