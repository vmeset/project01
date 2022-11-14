const noteModel = require('../models/noteModel')

const ApiError = require('../error/ApiError')

class noteController {
    async create(req, res, next) {
        // try {
        //     const note = await noteModel.create(req.body)

        //     // const buyType = new typeModel({value: "TODO"})
        //     // const todoType = new typeModel({value: "BUY"})

        //     // await buyType.save()
        //     // await todoType.save()


        //     return res.json(note)
        // } catch (e) {
        //     next(ApiError.badRequest(e.message))
        // }

        try {
            const {author, title, isCompleted, description, type} = req.body
            const newNote = await noteModel.create({author, title, isCompleted, description, type})
            return res.json(newNote)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        // try {
        //     // let {limit, page} = req.query
        //     // page = page || 1
        //     // limit = limit || 1
        //     // let offset = page * limit - limit

        //     const notes = await noteService.getAll()

        //     return res.json(notes)
        //     // const notes = await noteService.getAll({limit, offset})
        //     // return res.json(notes)
        // } catch (e) {
        //     next(ApiError.badRequest(e.message))
        // }

        // try {
        //     const notes = await noteModel.find()
        //     return res.json(notes)
        // } catch (e) {
        //     next(ApiError.badRequest(e.message))
        // }

        try {
            let {author, limit, page} = req.query
            limit = limit || 20
            page = page || 1
            let offset = page * limit - limit

            let filteredNotes = await noteModel.find({author}).skip(parseInt(offset)).limit(parseInt(limit))
            // добавить фильтрацию по type!!!
            // findandcountall, для фронта не считает общее кол-во ноток
            return res.json(filteredNotes)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const myNote = await noteModel.findById(req.params.id)
            return res.json(myNote)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        // try {
        //     const id = req.body
        //     const deletedNote = await noteService.delete(id)
        //     return res.json(deletedNote)
        // } catch (e) {
        //     next(ApiError.badRequest(e.message))
        // }
        try {
            const deletedNote = await noteModel.findByIdAndDelete(req.params.id)
            return res.json(deletedNote)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update (req, res, next) {
        // try {
        //     const updatedNote = await noteService.update(req.body)
        //     return res.json(updatedNote)
        // } catch (e) {
        //     next(ApiError.badRequest(e.message))
        // }
        try {
            const note = req.body
            const updatedNote = await noteModel.findByIdAndUpdate(note._id, note, {new: true})
            return res.json(updatedNote)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new noteController()