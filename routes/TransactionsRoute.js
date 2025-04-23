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

// router.put('/:id', async (req, res) => {
//     try {
//         const studentId = req.params.id;
//         const updateData = req.body;

//         const response = await Students.findByIdAndUpdate(studentId, updateData, {
//             new: true,
//             runValidators: true
//         });

//         if (!response) {
//             return res.status(404).json("Student not found");
//         }

//         console.log('Data Update');
//         return res.status(200).json(response);

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });



router.delete('/delete', async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || ids.length === 0) {
            return res.status(400).json({ error: 'No IDs provided' });
        }

        const response = await Transactions.deleteMany({ _id: { $in: ids } });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: 'No Transaction found to delete' });
        }

        console.log('Transaction deleted:', response.deletedCount);
        res.status(200).json({ message: 'Transaction deleted successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router; 