const Mail = require('../models/newsletter')
const nodemailer = require('nodemailer');

const options = {
  styleMap: [
      "p[style-name='Section Title'] => h1:fresh",
      "p[style-name='Subsection Title'] => h2:fresh",
      "p[style-name='Title'] => h1" ,
  ]
};

exports.newsletter = (req, res) => {
  Mail.findOne({ email: req.body.email })
    .exec((err, data) => {
      if (err) return res.status(404).json({ error: err })
      if (data) return res.status(400).json({ message: "You're already subscribed to our newsletter!" })

      const _newMail = new Mail(req.body);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.GMAIL_USER}`,
          pass: `${process.env.GMAIL_PASS}`
        }
      });

      _newMail.save((error, result) => {
        if (error) return res.status(400).json({ message: "Something Went Wrong" })
        if (result) {
          transporter.sendMail({
            from: 'miracleofficialteam@gmail.com',
            to: result.email,
            subject: 'Welcome Message From Miracle Solutions',
            text: "Congratulations! You're Successfully Subscribed to Miracle Solutions Newsletter. You'll start receiving our newsletters very soon."
          }, function (errorMsg, info) {
            if (errorMsg) {
              console.log(errorMsg);
              Mail.findOneAndDelete({ email: result.email })
              return res.status(400).json({ message: errorMsg || "Something Went Wrong" })
            } else {
              console.log('Email sent: ' + info.response);
              return res.status(201).json({ message: "Welcome Aboard To Our Newsletter" })
            }
          });
        }
      })
    })
}

exports.getNewsletter = (req, res) => {
  // Mail.find({})
  //   .exec((err, data) => {
  //     if (err) return res.status(404).json({ message: "Something went wrong", error: err })
  //     if (data) {
  //       const transporter = nodemailer.createTransport({
  //         pool: true,
  //         port: 465,
  //         secure: true, // use TLS
  //         service: 'gmail',
  //         auth: {
  //           user: `${process.env.GMAIL_USER}`,
  //           pass: `${process.env.GMAIL_PASS}`
  //         }
  //       });

  //       const newsEmails = data.map((email) => { return email.email });

  //       mammoth.convertToHtml({path: "uploads/Newsletter.docx"}, options)
  //       .then(function(result){
  //           const html = result.value; // The generated HTML
  //           const messages = result.messages; // Any messages, such as warnings during conversion
  //           console.log(html, messages)
  //           const newsMessage = {
  //             from: 'miracleofficialteam@gmail.com',
  //             bcc: newsEmails,
  //             subject: 'First Newsletter Of The Miracle Solutions',
  //             html: html
  //           };

  //           transporter.sendMail(newsMessage, function (error, info) {
  //             if (error) {
  //               console.log(error);
  //               transporter.close();
  //               return res.status(400).json({ error: error, message: "Failed To Send Newsletter!" })
  //             } else {
  //               console.log('Newsletter sent: ' + info.response);
  //               transporter.close();
  //               return res.status(200).json({ message: "Newsletter Sent To Everybody!" })
  //             }
  //           });
  //       })
  //       .done();

  //     }
  //   })
}