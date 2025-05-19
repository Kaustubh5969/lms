const express = require('express');
const router = express.Router();
const Transactions = require('../models/Transactions');

router.post('/borrow', async (req, res) => {

    try {
        const data = req.body

        const newTransaction = new Transactions(data);

        const response = await newTransaction.save();
        console.log('Data Saved');

        res.status(200).json({ response: response });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });;
    }

})



router.get('/allTransctions', async (req, res) => {
    try {
        const data = await Transactions.find();
        console.log('Data fetch');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const transactionId = req.params.id;
        const updateData = req.body;

        const response = await Transactions.findByIdAndUpdate(transactionId, updateData, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return res.status(404).json("Transaction not found");
        }

        console.log('Data Update');
        return res.status(200).json(response);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router; 