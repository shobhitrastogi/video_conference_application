const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register User
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword); // Log the hashed password for verification
        user = new User({ username, password: hashedPassword });
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send('Server error');
    }
};

// Login User
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.error(`Login attempt failed: User ${username} does not exist.`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Log the retrieved user for verification
        console.log('User Retrieved:', user);

        // Check if the provided password matches the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     console.error(`Login attempt failed: Incorrect password for user ${username}.`);
        //     return res.status(400).json({ message: 'Invalid credentials' });
        // }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }
};
