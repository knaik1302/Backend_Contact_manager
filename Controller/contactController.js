const asyncHandler = require("express-async-handler");
const Contacts = require("../Model/contactModel");

//@desc Get all Contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler( async (req, res) => {
    const contact = await Contacts.find({ user_id: req.user.id });
    res.status(200).json(contact);
});

//@desc Get Contacts by id
//@route GET /api/contacts/:id
//@access private
const getContactsById = asyncHandler( async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Record Not Found");
    }
    res.status(200).json(contact);
});

//@desc Create Contacts
//@route POST /api/contacts
//@access private
const createContacts = asyncHandler( async (req, res) => {
    const { name, email, phoneNo } = req.body;

    if(!name || !email || !phoneNo){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contacts.create({
        name,
        email,
        phoneNo,
        user_id: req.user.id
    });

    res.status(201).json(contact);
});

//@desc Update Contacts by Id
//@route PUT /api/contacts/:id
//@access private
const updateContacts = asyncHandler( async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Record Not Found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User is not authorized to update");
    }

    const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true }
    );
    res.status(200).json(updatedContact);
});

//@desc Delete Contacts by Id
//@route DELETE /api/contacts/:id
//@access private
const deleteContacts = asyncHandler( async (req, res) => {
    const contact = await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Record Not Found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User is not authorized to delete");
    }

    await Contacts.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = {
    getAllContacts,
    getContactsById,
    createContacts,
    updateContacts,
    deleteContacts
};