const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const NoteSchema = Schema({
  id: ObjectId,
  title: String,
  content: String
})

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note
