const mongoose = require('mongoose')

const Note = new mongoose.Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    isCompleted: {type: Boolean},
    description: {type: Array},
    type: [{type: String, ref: 'Type'}]
})

module.exports = mongoose.model('Note', Note)