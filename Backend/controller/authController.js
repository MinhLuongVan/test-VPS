const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../router/authRouter');
const authController = {
    registerUser : async(req,res) =>{
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password,salt);

            // create user

            const newUser =  new User({
                fullname:req.body.fullname,
                username: req.body.username,
                password:hashed,
            });
            // save to db
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
        console.log(error)
            res.status(500).json(error);
        }
    },

    createAccessToken : (user) =>{
        return  jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin
        },
        process.env.JWT_ACCESS_KEY,{
            expiresIn : '30d'
            } 
        );
    },
    createRefreshToken : (user) =>{
        return  jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin
        },
        process.env.JWT_REFRESH_KEY,{
            expiresIn : '365d'
            } 
        );
    },
    
    loginUser: async(req,res) =>{
        try {
            const user = await User.findOne({username: req.body.username});
    
            if(user){
                const checkPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (checkPassword) {
                    const Token = authController.createAccessToken(user);
                    const refreshToken = authController.createRefreshToken(user);
                    res.cookie("cookieRefesh", refreshToken)
                    console.log("token",refreshToken)
                    const {password, ...others } = user._doc;
                    res.status(200).json({
                        data: {...others,Token}, message: "Login successfully",
                        success: true
                    });
                } else {
                    res.status(500).json("Sai password");
                }
            } else {
                res.status(500).json("Sai username!"); //Các file được yêu cầu không có trên máy chủ
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //Logout
    // userLogout: async(req,res) =>{
    //     res.clearCookie('cookieRefresh');
    //     res.status(200).json('Logout thành công');
    // }
    
}; 
module.exports = authController;