const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Name should not be empty"]
    },
    email: {
        type: String,
        required: [true, "Email should not be empty"]
    },
    phoneNo: {
        type: String,
        required: [true, "Phone Number should not be empty"]
    }
},
{
    timestamps : true
}
);

module.exports = mongoose.model("Contact", contactSchema);