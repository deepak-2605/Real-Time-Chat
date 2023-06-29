const express = require('express');
const { sendMessage,allMessage } =require('../controllers/messageController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:chatId').get(protect, allMessage);
router.route('/').post(protect, sendMessage);



module.exports = router;