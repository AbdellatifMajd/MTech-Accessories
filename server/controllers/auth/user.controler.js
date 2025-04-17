const User = require('../../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookie = require('cookie-parser')


//register 
const register = async (req, res) => {
    try{
        const {fullName, email, password, confirmPassword} = req.body; 
        if(password !== confirmPassword){
            return res.send("passwords do not match!");
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.json({
                message: 'User already exist, please try again.',
                success: false
            })
        }

        const newUser = new User({fullName, email, password:hashPassword}); 
        await newUser.save();

        return res.status(201).json({
            message: "User created successfully.",
            success: true
        })
    }

    catch(error){
        return res.status(401).json({
            error: true, 
            message: "an error occured", error 
        })
    }
}




//login 
const login = async (req, res) => {
    const {email, password} = req.body;


    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.json({
                success: false,
                message: "User not found, Please register first." 
            })
        }
        const checkPassword = await bcrypt.compare(password, existingUser.password)

        if(!checkPassword){
            return res.json({
                success: false, 
                message: "Incorrect Password, Please try again."
            })
        }

        const token = jwt.sign({
            id: existingUser._id, 
            role: existingUser.role, 
            email: existingUser.email 
        }, 'CLIENT_SECRET_KEY', {expiresIn: '1440m'})

        //Use httpOnly: true to help protect against XSS attacks.
        //Use secure: true only in production with HTTPS.
        res.cookie('token', token, {httpOnly: true, secure: false}).json({
            success: true, 
            message: 'Logged in successfully',
            user: {
                id: existingUser._id, 
                email: existingUser.email, 
                role: existingUser.role 
            }


        })






    }
    catch(error){
        return res.json({
            message: "An error occured, Please try again."
        })
    }



}










module.exports = {register, login}
