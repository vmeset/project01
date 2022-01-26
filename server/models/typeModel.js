const mongoose = require('mongoose')

const Type = new mongoose.Schema({
    value: {type: String, required: true},
})

module.exports = mongoose.model('Type', Type)