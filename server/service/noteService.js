// const noteModel = require('../models/noteModel')

// class noteService {
//     async create(title) {
//         const newNote = await noteModel.create(title)
//         return newNote
//     }

//     async getAll() {
//         const notes = await noteModel.find()
//         return notes
//     }

//     async getOne(id) {
//         const note = await noteModel.findById(id)
//         return note
//     }

//     async delete(id) {
//         const deletedNote = await noteModel.findByIdAndDelete(id)
//         return deletedNote
//     }

//     async update (note) {
//         if(!note._id) {
//             throw new Error('ID missed')
//         }
//         const updatedNote = await noteModel.findByIdAndUpdate(note._id, note, {new: true})
//         return updatedNote
//     }
// }

// module.exports = new noteService()