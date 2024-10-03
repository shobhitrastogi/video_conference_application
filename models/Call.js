const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    roomID: { type: String, required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
});

module.exports = mongoose.model('Call', CallSchema);
