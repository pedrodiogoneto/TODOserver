const express = require('express')
const router = express.Router()

const noteService = require('../services/noteService')

function noteController() {

    async function getAllNotes(req, res) {
        try {
            let notesList = await noteService.getAllNotes()
            return res.status(200).json(notesList)
        } catch (error) {
            Error('There was an error receiving the Note List')
        } 
    }

    async function postNewNote(req, res) {
        try {
            const { title, content } = req.body;
            let notes = await noteService.postNewNote(title, content)
            return res.status(200).json(notes)
        } catch (error) {
            Error('There was an error Saving the New Note')
        } 
    }

    async function editNote(req, res) {
        try {
            const { params: { id }, body: { title, content } } = req;
            let notes = await noteService.editNote(id, title, content)
            return res.status(200).json(notes)
        } catch (error) {
            Error('There was an error editing the Note')
        } 
    }
    
    async function deleteNote(req, res) {
        try {
            const { id } = req.params;
            let notes = await noteService.deleteNote(id)
            return res.status(200).json(notes)
        } catch (error) {
            Error('There was an error deleting the Note')
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

