const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const convertDate = (originalDate) => {
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const dateArray = originalDate.split("/"); // Splitting date into array using seperator '/'
    let updatedDate = [dateArray[0], dateArray[2]].join(", ");
    let newMonth = "";

    for (let i = 1; i <= month.length; i++) {  // A loop to compare the month date with month name and assigning name to the month respectively
        // eslint-disable-next-line eqeqeq
        if (dateArray[1] == i) {
            newMonth = month[i - 1];
        }
    }
    return `${newMonth} ${updatedDate} `;
};

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    author: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
      min: 100  
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        default: convertDate(new Date().toLocaleDateString())
    },
    comments: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    }
},{ timestamps: true });


module.exports = mongoose.model("Blog", BlogSchema)