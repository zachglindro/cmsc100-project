import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../models/user-model.js';
import jwt from 'jsonwebtoken';

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

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json(users)
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to get users.'})
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
            const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })
            return res.json({ message: 'Login successful!', userType: 'merchant' })
        }

        // If not the merchant, redirect to /account
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })
        res.json({ message: 'Login successful!', userType: 'customer' })
    } catch (error) {
        res.status(500).json({ error: 'Error logging in.' })
    }
}

export { register, login, getUsers };