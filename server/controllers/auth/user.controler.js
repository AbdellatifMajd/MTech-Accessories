const User = require('../../models/User'); 
const bcrypt = require('bcryptjs');

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

module.exports = {register}