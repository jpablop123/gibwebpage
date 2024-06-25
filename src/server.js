const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const smtpConfig = {
  host: 'email-smtp.us-east-2.amazonaws.com',
  port: 587,
  auth: {
    user: 'AKIA4BIEFN5YYHZXVRX6',
    pass: 'BKDeZxGsnBrQh+xLXlkX+ZQ6+uaepwsDP+EetWffUHQK'
  }
};

const createTransporter = async () => {
  return nodemailer.createTransport(smtpConfig);
};

const sendEmail = async (mailOptions) => {
  const transporter = await createTransporter();
  return transporter.sendMail(mailOptions);
};

app.post('/send-email', async (req, res) => {
  const { name, telefono, email, ciudad, rows } = req.body;

  const mailOptions = {
    from: '"Daniel Pinto" <Daniel.pinto@gibtraders.com>',
    to: 'juanpablopinto123@icloud.com',
    subject: 'New Shipping Request',
    text: `Name: ${name}\nPhone: ${telefono}\nEmail: ${email}\nCity: ${ciudad}\nDetails: ${JSON.stringify(rows)}`,
  };

  try {
    await sendEmail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending email', error });
  }
});

app.post('/cotizador-importacions', async (req, res) => {
  const { full_name, phone_number, email, select_options, informacion } = req.body;

  const mailOptions = {
    from: '"Daniel Pinto" <Daniel.pinto@gibtraders.com>',
    to: 'juanpablopinto123@icloud.com',
    subject: 'New Import Request',
    text: `Name: ${full_name}\nPhone: ${phone_number}\nEmail: ${email}\nService Interested: ${select_options}\nInformation: ${informacion}`,
  };

  try {
    await sendEmail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending email', error });
  }
});

app.post('/contact-diseno', async (req, res) => {
  const { user_name1, user_email1, user_contactas1, user_message1 } = req.body;

  const mailOptions = {
    from: '"Daniel Pinto" <Daniel.pinto@gibtraders.com>',
    to: 'juanpablopinto123@icloud.com',
    subject: 'New Design Contact Request',
    text: `Name: ${user_name1}\nMessage: ${user_message1}\nEmail: ${user_email1}\nReason for Contact: ${user_contactas1}`,
  };

  try {
    await sendEmail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending email', error });
  }
});

app.post('/contact-us', async (req, res) => {
  const { user_name, user_email, user_contactas, user_message } = req.body;

  const mailOptions = {
    from: '"Daniel Pinto" <Daniel.pinto@gibtraders.com>',
    to: 'juanpablopinto123@icloud.com',
    subject: 'New Contact Us Request',
    text: `Name: ${user_name}\nMessage: ${user_message}\nEmail: ${user_email}\nReason for Contact: ${user_contactas}`,
  };

  try {
    await sendEmail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending email', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
