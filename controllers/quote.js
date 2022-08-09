const Quote = require('../models/quote')
const nodemailer = require('nodemailer');

exports.getQuoteById = (req,res,next,id) => {
        Quote.findById(id)
        .exec((err, quote) => {
            if(err || !quote) return res.status(400).json({ error: "No Quote Found!" })
            req.quote = quote;
            next();
        })
}

exports.sendQuoteMessage = (req,res) => {
    const _newQuote = new Quote(req.body);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.GMAIL_USER}`,
          pass: `${process.env.GMAIL_PASS}`
        }
      });
    const mailList = [ 'raolakshayyadav02@gmail.com', 'rahulsarswat57@gmail.com', 'nipungoyal84328@gmail.com' ]

    _newQuote.save((err,data) => {
        if(err) return res.status(400).json({ message: "Something Went Wrong! Try Again Later!", error: err })
        if(data) {
            transporter.sendMail({
                from: 'miracleofficialteam@gmail.com',
                to: mailList,
                subject: 'New Quote Request',
                html: `Id: ${data._id} <br>Name: ${data.name} <br>Phone: ${data.phone} <br>Email: ${data.email} <br>Service: ${data.service} <br>Message: ${data.message}`
              }, function (errorMsg, info) {
                if (errorMsg) {
                  console.log(errorMsg);
                  return res.status(400).json({ message: errorMsg })
                } else {
                  console.log('Email sent: ' + info.response);
                  return res.status(201).json({ message:"We Have Received Your Request And We'll Get Back To You Soon!", data: data })
                }
              });
        } 
    })
}

exports.getAllQuotes = (req,res) => {
  Quote.find({})
    .exec((err, quotes) => {
      if(err) return res.status(400).json({ error: "Faile To Get Quotes! Try Again Later!" })
      return res.json(quotes)
    })
}

exports.removeQuote = (req,res) => {
      const quote = req.quote;

      quote.remove((err, quote) => {
          if(err) return res.status(400).json({ error: "Failed To Delete This Quote!" })
          return res.json({ message: `Quote By ${quote.name} deleted successfully!` })
      })
}