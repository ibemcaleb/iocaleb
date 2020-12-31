var express = require("express");
var nodemailer = require("nodemailer");

var router = express.Router();

router.use(function(req, res, next) {
    var yr = new Date().getFullYear();
    res.locals.year = yr;
    next();
});

router.get("/", function(req, res) {
    res.render("index", { title: "Home" });
});

router.get("/about", function(req, res) {
    res.render("about", { title: "About" });
});

router.get("/project", function(req, res) {
    res.render("project", { title: "Projects" });
});

router.get("/blog", function(req, res) {
    res.render("blog", { title: "Blog" });
});

router.get("/contact", function(req, res) {
    res.render("contact", { title: "Contact" });
});

router.post("/contact", function(req, res) {
    //Initiate the SMTP server
    var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    //Specify what the mail will look like
    var mailOptions = {
        from: "Your sender info here", //Gmail ignores this
        to: GMAIL_USER,
        subject: "MESSAGE FROM IOCALEB CONTACT FORM",
        message: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    }

    //Attempt to send the mail
    smtpTransport.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log("Message was not sent. Try again!"); //Replace with flash message
        } else {
            console.log("Your message has been sent successfully!"); //Replace with flash message
        }
    });
});
module.exports = router;