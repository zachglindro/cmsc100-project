import mongoose from 'mongoose';
import { Product } from './product-model.js';

const userSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    userType: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    shoppingCart: {type: [Product.schema]}
});

const User = mongoose.model('User', userSchema);

export { User };