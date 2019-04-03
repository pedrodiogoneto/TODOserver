const express = require('express')
const noteRoutes = express()
const noteController = require('../controllers/noteController')

noteRoutes.get("/", noteController.getAllNotes)
noteRoutes.post("/", noteController.postNewNote)
noteRoutes.post("/:id", noteController.editNote)
noteRoutes.delete("/:id", noteController.deleteNote)

module.exports = noteRoutes
