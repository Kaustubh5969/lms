const express = require('express');
const router = express.Router();
const Books = require('../models/Books');

router.post('/addNewBook', async (req, res) => {

    try {
        const data = req.body

        const newBooks = new Books(data);

        const response = await newBooks.save();
        console.log('Data Saved');

        res.status(200).json({ response: response });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });;
    }

})



router.get('/allBooks', async (req, res) => {
    try {
        const data = await Books.find();
        console.log('Data fetch');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


router.put('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const updateData = req.body;

        const response = await Books.findByIdAndUpdate(bookId, updateData, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return res.status(404).json("Book not found");
        }

        console.log('Data Update');
        return res.status(200).json(response);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



router.delete('/delete', async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || ids.length === 0) {
            return res.status(400).json({ error: 'No IDs provided' });
        }

        const response = await Books.deleteMany({ _id: { $in: ids } });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: 'No Books found to delete' });
        }

        console.log('Books deleted:', response.deletedCount);
        res.status(200).json({ message: 'Books deleted successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router; 