// routes/callRoutes.js
const express = require('express');
const { createCall, endCall } = require('../controllers/callController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createCall);
router.put('/end/:callID', authMiddleware, endCall);

module.exports = router;
