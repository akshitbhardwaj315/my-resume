const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // You can use any available port

app.use(bodyParser.json());

// Create a POST endpoint to send emails
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).send({ message: 'Invalid email address' });
    }

    // Create a transporter using your email service
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // or any other email service you prefer
        auth: {
            user: 'akshitbhardwaj315@gmail.com', // Your email
            pass: 'kigd ywxu cbrs hxlb' // Your email password or app password
        }
    });

    // Setup email data
    const mailOptions = {
        from: email,
        to: 'akshitbhardwaj315@gmail.com', // Your email
        subject: `Message from ${name}`,
        text: message
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Log the error for debugging
            return res.status(500).send({ message: 'Error sending email', error });
        }
        res.status(200).send({ message: 'Email sent successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
