import mongoose from 'mongoose';

const User = mongoose.model("User", {
    firstname: String,
    middlename: String,
    lastname: String,
    usertype: String,
    email: String,
    password: String
})

const getUsers = async (req, res) => {
    const users = await Subject.find({});
    res.send(users)
}

const getUserByEmail = async (req,res) => {
    const user = await Subject.findOne({ email: req.query.email })
    res.send(user)
}

const addUser = async (req,res) => {
    const { firstname, middlename, lastname, usertype, email, password} = req.body
    const newUser = new User({ firstname, middlename, lastname, usertype, email, password})

    const result = await newUser.save()

    if (result._id){
        res.send({success: true})
    } else {
        res.send({success: false})
    }
}

const deleteUser = async (req, res) => {
    const {email} = req.body

    const result = await User.deleteOne({ email })

    if (result.deletedCount == 1) {
        res.send({success: true })
    } else {
        res.send({success: false})
    }
}

export { getUsers, getUserByEmail, addUser, deleteUser }