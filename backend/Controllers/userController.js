const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynHandler = require('express-async-handler')
const User = require('../Models/userModel')

// @desc    Register User
// @route   Post /api/user
// @access  public
const registerUser = asynHandler(async (req, res) =>{
    const {name, surname, email, password} = req.body
    const userVerify = await User.findOne({email:email}).exec();
    
    if(userVerify){
        res.status(400)
        throw new Error('email is already taken')
    }
    
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Name, pass or email empty');
        // res.status(400).json({
        //     message: 'Nmae Or email empty'
        // })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name: name,
        surname: surname,
        email: email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            id: user.id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid data')
    }
})

// @desc    Login User
// @route   Post /api/user/login
// @access  public
const loginUser = asynHandler(async (req,res) =>{
    const {email, password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error('Fill all fields')
    }
    
    const user = await User.findOne({email:email}).exec()
    
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getMe = asynHandler(async (req,res)=>{
    const {_id,name,surname,email} = await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        name,
        surname,
        email
    })
})


//Generate JWT token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}