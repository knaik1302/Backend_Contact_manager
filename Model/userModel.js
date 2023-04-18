const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required:[true, "Name field is mandatory"]
    },
    userEmail:{
        type: String,
        required:[true, "email field is mandatory"],
        unique:[true, "Email is already taken"]
    },
    password:{
        type: String,
        required:[true, "please enter password"]
    }
},
{
    timestamp:true
});

module.exports = mongoose.model("User", userSchema);