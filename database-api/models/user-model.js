const mongoose = require('mongoose')

const userSchema = mongoose.Schema("User", {
    firstname: {type: String, required: true},
    middlename: {type: String, required: true},
    lastname: {type: String, required: true},
    usertype: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const User = mongoose.model('User', userSchema)

module.exports = User