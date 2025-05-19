const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    proimg: {
        type: String,
    },
})


// Password hashing.

userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(user.password, salt);

        user.password = hashPassword;
        next();
    } catch (err) {
        return next(err);
    }
})


// Password matching funtion

userSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const User = mongoose.model('Person', userSchema);
module.exports = User;