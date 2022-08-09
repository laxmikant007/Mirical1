const mongoose = require('mongoose');

const blogImageSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model("BlogImage", blogImageSchema)