import bcrypt from 'bcrypt';
import { User } from '../models/user-model.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secretkey'

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json(users)
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to get users.'})
    }
}

const getUserByUsername = async (req,res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        res.status(201).json(user)
    }
    catch (error) {
        res.status(500).json({error: 'User not found'})
    }
}

const register = async (req,res) => {
    try{
        const { fname, lname, userType, email, username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ fname, lname, userType, email, username, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User created successfully.' }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error signing up.' })
    }
}


const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isMerchant = await User.findOne({ username, userType: 'Merchant' })

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials!' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials!' })
        }

        // Check if the user is the merchant
        if (isMerchant) {
            const token = jwt.sign({ userId: user._id, userType: 'merchant' }, SECRET_KEY, { expiresIn: '1hr' })
            console.log(token)
            return res.json({ message: 'Login successful!', userType: 'merchant' })
        }

        // If not the merchant, redirect to /account
        const token = jwt.sign({ userId: user._id, userType: 'customer' }, SECRET_KEY, { expiresIn: '1hr' })
        console.log(token)
        res.json({ message: 'Login successful!', userType: 'customer' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error logging in.' })
    }
}

export { register, login, getUsers, getUserByUsername };