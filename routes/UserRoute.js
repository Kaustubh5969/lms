const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require('./../jwt');
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.post('/signup', async (req, res) => {

    try {
        const data = req.body

        const newUser = new User(data);

        const response = await newUser.save();
        console.log('Data Saved');

        const payload = {
            id : response.id,
            email: response.email
        }
        const token = generateToken(payload);
        console.log("Token is:", token);

        res.status(200).json({ response: response, token: token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });;
    }

})

router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email: email});

        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        const payload = {
            id: user.id,
            email: user.email
        }
        const token = generateToken(payload);

        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




router.get('/', jwtAuthMiddleware,async (req, res) => {
    try {
        const data = await User.find();
        console.log('Data fetch');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Update the user

router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        if (updateData.password) {
            const saltRounds = 10; // Number of hashing rounds
            const hashedPassword = await bcrypt.hash(updateData.password, saltRounds);
            updateData.password = hashedPassword;
        }

        const response = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            res.status(404).json("User not found");
        }

        console.log('Data Update');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const response = await User.findByIdAndDelete(userId);

        if (!response) {
            res.status(404).json("User not found");
        }

        console.log('Data Delete');
        res.status(200).json("User deleted");

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router; 