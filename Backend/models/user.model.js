const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { use } = require('../app');


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength:[3,'First name must be at least 3 characters long'],
    },
    lastname: {
        type: String,
        minlength:[3,'last name must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
     socketId: {
        type: String,
    },

})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET);
    return token;
}
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;