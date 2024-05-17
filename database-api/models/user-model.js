import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    userType: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    shoppingCart: {type: Array}
})

const User = mongoose.model('User', userSchema)

export { User };