const express = require('express');
const router = express.Router();

const validateToken = require('../Middleware/validateTokenHandler');

const {
    getAllContacts,
    getContactsById,
    createContacts,
    updateContacts,
    deleteContacts
} = require('../Controller/contactController');

router.use(validateToken);
router.route("/").get(getAllContacts).post(createContacts);
router.route("/:id").get(getContactsById).put(updateContacts).delete(deleteContacts);

module.exports = router;