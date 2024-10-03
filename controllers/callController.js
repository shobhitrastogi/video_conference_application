const Call = require('../models/Call');

exports.createCall = async (req, res) => {
    const { participants, roomID } = req.body;
    try {
        const newCall = new Call({ participants, roomID });
        await newCall.save();
        res.json(newCall);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.endCall = async (req, res) => {
    const { callID } = req.params;
    try {
        const call = await Call.findById(callID);
        call.endTime = Date.now();
        await call.save();
        res.json(call);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
