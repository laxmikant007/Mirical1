const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        trim: true,
        min: 3,
        max: 20
    },
    user_name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
        min: 3,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    hash_password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        trim: true
    },
    blogs: {
        type: Array,
        default: []
    },
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    role: {
        type: Number,
        default: 0
    },
    socialLinks: {
        type: Object,
        default: 
            {
                "Facebook": "",
                "Twitter": "",
                "Linkedin": "",
                "Instagram": ""
            }
    },
    funFact: {
        type: String,
        trim: true,
        default: "Writing to me is simply thinking through my fingers."
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    }
},{ timestamps: true });

UserSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});

UserSchema.virtual('fullName')
.get(function() {
    return `${this.firstName} ${this.lastName}`
})

UserSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}

module.exports = mongoose.model("User", UserSchema)