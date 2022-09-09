const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    fname: { type: String, required: true },

    lname: { type: String, required: true },

    title: { type: String, required: true, enum: ["Mr", "Mrs", "Miss"] },

    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email address.',
        ],
        required: true, unique: true, lowercase: true
    },

    password: { type: String, required: true }
},
    { timestamps: true });

module.exports = mongoose.model('author', authorSchema)
