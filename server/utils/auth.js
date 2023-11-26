require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateToken = async (user) => {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
      _id: user?._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7days",
    }
  );
};

// GMAIL service won't be used. Were using our smtp server.
const sendVerificationCode = async (user, otp) => {
  const transporter = nodemailer.createTransport({
    host: "mail.turkeytrademarket.com",
    port: 465, // STARTTLS port
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // GMAIL_USER -> MAIL_USER
      pass: process.env.MAIL_PASS, // GMAIL_PASS -> MAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: user?.email,
    subject: "Verify Your Email Address with OTP",
    html: `
    <div
    style="max-width: 600px; width: 100%; margin: 0 auto; font-family: 'Cabin',sans-serif; text-align:center; background-color: #ffff;">
    <div style="width: 100%; background-color: #037d41; align-items: center; padding:30px 0px">
        <p style=" color:#ffff; font-weight: 700;">T H A N K S <span style="margin-left: 10px;">F O R</span> <span
                style="margin-left: 10px;">REGISTERING
                !</span></p>
        <p style=" color:#ffff; margin: 0px;     line-height: 39.2px;
    font-size: 28px;">Verify Your E-mail Address</p>
    </div>

    <div style="text-align: center; padding:10px">
        <p style="font-size: 22px;
    line-height: 35.2px;">Hi,</p>
        <small style="color: #636465;">Please use the following OTP code to complete the registration process</small>
    </div>
    <button
        style="
text-align:center; width: fit-content;min-width: 100px;    display: block;
padding: 14px 44px 13px;
line-height: 120%; margin: 30px auto; background-color: #037d41 ; color:#ffff; border:none;border-radius: 5px;">${otp}</button>


<div
style="background-color: #d9eee4; padding:10px; font-size:14px;color:#003399;line-height:160%;text-align:center;word-wrap:break-word">
<p style="font-size:14px;line-height:160%"><span style="font-size:20px;line-height:32px"><strong>Get in
            touch</strong></span></p>
<p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000000"><a
            href="mailto:support@turkeytrademarket.com"
            target="_blank">support@turkeytrademarket.com</a></span>
</p>
</div>
<div style="color:#ffff; background-color: #037d41; padding: 1px;">
<p style="font-size:14px;line-height:180% ; color:#ffff">Copyrights © Turkeytrademarket AB
    All
    Rights Reserved</p>
</div>
</div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });

  // if (emailSent === true) {
  //   return true;
  // }
};

module.exports = {
  generateToken,
  sendVerificationCode,
};
