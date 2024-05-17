const mongoose = require('mongoose')

const userSchema = mongoose.Schema("User", {
    fname: {type: String, required: true},
    mname: {type: String, required: true},
    lname: {type: String, required: true},
    usertype: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

const User = mongoose.model('User', userSchema)

module.exports = User