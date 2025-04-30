const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../helpers/accessToken");
const { generateRefreshToken } = require("../helpers/refreshToken");



//=======================================//
//=========== Signup Handler =============//
//=======================================//

const signup = async (req, res) => {
   
    //fetch data from request body
    const { username, email, password, accountType } = req.body;

    //validation
    if(!username || !email || !password || !accountType){
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }
   
    try {
        //Check if user already exists
        let user = await User.findOne({ username });
        //validation
        if(user){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        //Hashing password
        const securePassword = await bcrypt.hash(password, 10);

        //Create new user
        user = new User({
            username,
            email,
            password: securePassword,
            accountType,
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        })

    } catch (error) {
        res.status(500).json({
             success: false,
             message: error.message
            });
    }
};



//=======================================//
//=========== Login Handler =============//
//=======================================//

const login = async (req, res) => {
    try {
        //fetch data from request body
        const { email, password } = req.body;
        //Check if user exists
        let user = await User.findOne({email});
        //validation
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist! Please signup first."
            });
        };
        //Compare password
        const comparePassword = await bcrypt.compare(password, user.password);
        //validation
        if(!comparePassword){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials!"
            });
        };

        //Create token

        const data = {
            id: user._id,
            accountType: user.accountType,
            author: user.username,
        };
        const accessToken = generateAccessToken(data);
        const refreshToken = generateRefreshToken(data);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            role: user.accountType,
            author: user.username,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    };
};


const refresh = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Please Login!"
        });
    }

    try {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err){
                return res.status(403).json({
                    success: false,
                    message: err.message
                })
            };

            const accessToken = generateAccessToken({
                id: user.id,
                accountType: user.accountType,
                author: user.author,
            });
            const refreshToken = generateRefreshToken({
                id: user.id,
                accountType: user.accountType,
                author: user.author,
            });

            return res.status(200).json({
                success: true,
                message: "Token refreshed successfully",
                accessToken,
                refreshToken,
                role: user.accountType,
                author: user.author,
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};


const switchProfile = async (req, res) => {
    const authorId = req.id;
    const authorAccountType = req.accountType;
    try {
        const user = await User.findByIdAndUpdate(authorId, {
            accountType: authorAccountType === "buyer" ? "seller" : "buyer",
        });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const data = {
            id: user._id,
            accountType: user.accountType,
            author: user.username,
        };

        const accessToken = generateAccessToken(data);
        const refreshToken = generateRefreshToken(data);

        return res.status(200).json({
            success: true,
            message: `Switch to ${user.accountType}`,
            accessToken,
            refreshToken,
            role: user.accountType,
            author: user.username,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}




module.exports = { login, signup, refresh, switchProfile };