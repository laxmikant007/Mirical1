const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },
    phone: {
        type: String,
        trim: true,
        min:10,
        max:10
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        min: 10,
        max: 500
    }
})

module.exports = mongoose.model("Queries", QuerySchema)