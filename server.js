const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const compression = require('compression')
// Environment Variable Config
env.config()
require("dotenv").config();    
// const authRoutes = require("./routes/auth");

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const newsletterRoutes = require('./routes/newsletter');
const queryRoutes = require('./routes/query');
const blogRoutes = require('./routes/blog');
const quoteRoutes = require('./routes/quote');
const categoryRoutes = require('./routes/category');

// Database Connect
mongoose.connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qceio.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    // `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.re5la.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify: false
})
    .then(() => {
        console.log("Database Connected!!!")
    })
    .catch((err) => {
        console.log(err)
    })


// Route Setup
app.use(compression());
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', newsletterRoutes);
app.use('/api', queryRoutes);
app.use('/api', blogRoutes);
app.use('/api', quoteRoutes);
app.use('/api', categoryRoutes);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    });
}

const port = process.env.PORT || 4000;

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})