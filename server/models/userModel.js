const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    // roles: [{type: String, ref: 'Role'}]
    role: {type: String, default: "USER", required: true}
})

module.exports = mongoose.model('User', User)