const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../Model/userModel");
const jwt = require("jsonwebtoken")

//@desc Register User
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler( async (req, res)=>{
    const { userName, userEmail, password } = req.body;

    if(!userName || !userEmail || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({userEmail});

    if(userAvailable){
        res.status(400);
        throw new Error("User already Registered");
    }

    const hashedPassword= await bcrypt.hash(password, 10);

    const user = await User.create({
        userName,
        userEmail,
        password : hashedPassword
    });

    console.log(user);
    if(user){
        res.status(201).json({_id:user._id, email:user.userEmail});
    }
    else{
        res.status(400);
        throw new Error("user data is not registered");
    }
});

//@desc Login User
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler( async (req, res)=>{
    const { userEmail, password } = req.body;

    if(!userEmail || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ userEmail });
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user: {
                    userName : user.userName,
                    userEmail : user.userEmail,
                    id : user._id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn : "20m" }
        )
        res.status(201).json({ accessToken });
    }
    else{
        res.status(401);
        throw new Error("The password or username is not valid");
    }
});

//@desc Get current User
//@route GET /api/user/current
//@access private
const currentUser = asyncHandler( async (req, res)=>{
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}