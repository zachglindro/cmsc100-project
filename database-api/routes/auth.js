const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const register = async (req,res) => {
    try{
        const { fname, mname, lname, userType, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ fname, mname, lname, userType, email, username, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User created successfully.' }) 
    } catch (error) {
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
            return res.json({ message: 'Login successful!', userType: 'merchant' })
        }

        // If not the merchant, redirect to /account
        res.json({ message: 'Login successful!', userType: 'customer' })
    } catch (error) {
        res.status(500).json({ error: 'Error logging in.' })
    }
}