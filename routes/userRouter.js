const express = require('express')
const UserModel = require('../models/usersSchema')
const {check, validationResult, body} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/', [
    check('username', "Username is required!").notEmpty(),
    check("email", "Please use a valid email").isEmail(),
    check("password", "Please enter a password").notEmpty(),
    check("password", "Please enter a password with six or more characters").isLength({min: 6}),
] ,async (req, res) => {
    const userData = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.json(errors.array())
    }

    try {
        const userExist = await UserModel.findOne({email: userData.email})
        if(userExist) {
            return res.json({msg: "User already exists, please sign in."})
        }

        const SALT = await bcrypt.genSalt(7)
        const hashedPassword = await bcrypt.hash(userData.password, SALT)
        userData.password = hashedPassword
        
        const user = await UserModel.create(userData)

   const payload = {
    id: user._id,
    email: user.email
}

const SECRET_KEY='MY_SECRET_KEY'

const TOKEN = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2 Days"})

res.status(201).json({
    user: user,
    token: TOKEN
})
    } catch (error) {
        console.log(error)
        res.status(400).json('ERROR-Try again!')
    }
})

module.exports = router