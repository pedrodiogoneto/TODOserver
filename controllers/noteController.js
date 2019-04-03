const express = require('express')
const router = express.Router()

const noteService = require('../services/noteService')

function noteController() {

    async function getAllNotes(req, res) {
        try {
            let notesList = await noteService.getAllNotes()
            return res.status(200).json(notesList)
        } catch (error) {
            Error('ocurreu erro')

        } 
    }

    async function postNewNote(req, res) {
        try {
            const { title, content } = req.body;
            let notes = await noteService.postNewNote(title, content)
            return res.status(200).json(notes)
        } catch (error) {
            Error('ocurreu erro')
        } 
    }

    async function editNote(req, res) {
        try {
            const { params: { id }, body: { title, content } } = req;
            let notes = await noteService.editNote(id, title, content)
            return res.status(200).json(notes)
        } catch (error) {
            Error('ocurreu erro')
        } 
    }
    
    async function deleteNote(req, res) {
        try {
            const { id } = req.params;
            let notes = await noteService.deleteNote(id)
            return res.status(200).json(notes)
        } catch (error) {
            Error('ocurreu erro')
        } 
    }

    return {
        getAllNotes,
        postNewNote,
        editNote,
        deleteNote,
    }

}

module.exports = noteController();

