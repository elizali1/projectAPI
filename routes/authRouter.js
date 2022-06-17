const express = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const UserModel = require('../models/usersSchema')

const router = express.Router()

router.post('/', [
    check('email', "Please provide a valid email.").isEmail(),
    check('password', "Check your password").notEmpty()
], async (req,res) => {
    const userData = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.json(errors.array())
    }

    try {
        const user = await UserModel.findOne({email: userData.email})

        if (!user){
            return res.json('User not found!')
        }
        const isMatch = await bcrypt.compare(userData.password, user.password)

        if (!isMatch){
            return res.json('Password is not a match!')
        }
        res.status(200).json('Success!')

        const payload = {
            id: user._id,
            email: user.email
        }
        const TOKEN = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2 Days"})

        res.status(201).json({
            user: user,
            token: TOKEN    })
        }
        catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
        
    }
})







module.exports = router