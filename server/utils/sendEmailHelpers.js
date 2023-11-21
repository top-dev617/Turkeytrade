require("dotenv").config();
const nodemailer = require("nodemailer");

const sendStoreApprovedMail = async (email, store) => {
  const transporter = nodemailer.createTransport({
    host: "mail.turkeytrademarket.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // GMAIL_USER -> MAIL_USER
      pass: process.env.MAIL_PASS, // GMAIL_PASS -> MAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `Your Verified Seller Status on Turkeytrademarket `,
    html: `
    <body style="background-color: #f4f4f4; margin: 0; padding: 0;">
    <div
        style="max-width: 600px; width: 100%; margin: 0 auto; font-family: 'Cabin',sans-serif; text-align:center; background-color: #ffff;">
        <div style="width: 100%; background-color: #037d41; align-items: center; padding:30px 0px">
            <small style=" color:#ffff;">Your Verified Seller Status on Turkeytrademarket </small>
            <p style=" color:#ffff; margin: 0px;     line-height: 39.2px;
    font-size: 28px;">Welcome to Turkeytrademarket</p>
        </div>


        <div style="padding: 20px; margin-top: 20px; text-align: left; line-break: auto;">
            <small style="color: #0f0f0f;">Hello <strong>${store?.user?.name}</strong>,</small>
            <p style="color: #636465;font-size:14px;line-height:180% ; ">We are pleased to confirm that your
                application
                has been approved, and you are now a Verified Seller on Turkeytrademarket! This means you're all set to
                begin listing your products on the platform and making them visible to a vast network of potential
                buyers.</p>


            <p style="color: #636465;font-size:14px;line-height:180% ; ">As a Verified Seller, you now have access to
                the <a href="https://turkeytrademarket.com/mystore" target="_blank"
                    style="text-decoration: none; color: #037d41;"><strong>My
                        Store</strong></a> section on our
                website. Here's what you can do next:</p>


            <div style="margin-left: 15px; margin-top: 0;">
                <p style="color: #636465;font-size:14px;line-height:180% ; ">Go to <a
                        href="https://turkeytrademarket.com/mystore" target="_blank"
                        style="text-decoration: none; color: #037d41;"><strong>My
                            Store</strong></a>: This new section is now
                    visible on your dashboard. Here you can upload your products and manage your listings.
                    Upload Your Products: Add your products with high-quality images and detailed descriptions to
                    attract buyers.
                    Respond Promptly: Ensure you reply to potential buyers messages quickly to increase sales
                    opportunities and provide excellent customer service.

                </p>
            </div>
            <p style="color: #636465;font-size:14px;line-height:180% ; ">To start adding your products and managing your
                store, simply log in to your account and navigate to the <a href="https://turkeytrademarket.com/mystore"
                    target="_blank" style="text-decoration: none; color: #037d41;"><strong>My
                        Store</strong></a> section.</p>
            <p style="color: #636465;font-size:14px;line-height:180% ; ">Should you need any help or have questions as
                you set up your store, our support team is just an email away at <a
                    href="mailto:support@turkeytrademarket.com" target="_blank">support@turkeytrademarket.com</a>.</p>
            <p style="color: #636465;font-size:14px;line-height:180% ; "><strong>Congratulations</strong> once again,
                and we look forward
                to seeing your products on Turkeytrademarket!</p>
            <p style="color: #636465;font-size:14px;line-height:180% ; ">Best regards, </p>
            <p style="color: #636465;font-size:14px;line-height:180% ; ">The Turkeytrademarket Team</p>
        </div>

        <div
            style="background-color: #d9eee4; padding:10px; font-size:14px;color:#003399;line-height:160%;text-align:center;word-wrap:break-word">
            <p style="font-size:14px;line-height:160%"><span style="font-size:20px;line-height:32px"><strong>Get in
                        touch</strong></span></p>
            <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000000">+11
                    111
                    333
                    4444</span></p>
            <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000000"><a
                        href="mailto:Info@turkeytrademarket.com" target="_blank">Info@turkeytrademarket.com</a></span>
            </p>
        </div>
        <div style="color:#ffff; background-color: #037d41; padding: 1px;">
            <p style="font-size:14px;line-height:180% ; color:#ffff">Copyrights © Company
                All
                Rights Reserved</p>
        </div>
    </div>
</body>
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

const sendStoreDeclineMail = async (email, store) => {
  const transporter = nodemailer.createTransport({
    host: "mail.turkeytrademarket.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // GMAIL_USER -> MAIL_USER
      pass: process.env.MAIL_PASS, // GMAIL_PASS -> MAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `Verified Seller Application `,
    html: `
    <body style="background-color: #f4f4f4; margin: 0; padding: 0;">
    <div
        style="max-width: 600px; width: 100%; margin: 0 auto; font-family: 'Cabin',sans-serif; text-align:center; background-color: #ffff;">
        <div style="width: 100%; background-color: #037d41; align-items: center; padding:30px 0px">
            <small style=" color:#ffff;">Your Decline Seller Status on Turkeytrademarket </small>
            <p style=" color:#ffff; margin: 0px;     line-height: 39.2px;
    font-size: 28px;">Verified Seller Application </p>
        </div>


        <div style="padding: 20px; margin-top: 20px; text-align: left; line-break: auto;">
            <small style="color: #0f0f0f;">Hello <strong>${store?.user?.name}</strong>,</small>
            <p style="color: #636465;font-size:14px;line-height:180% ; ">We appreciate your interest in becoming a
                Verified Seller on Turkeytrademarket. After reviewing your application, we find that we are unable to
                approve it at this time.</p>


            <p style="color: #636465;font-size:14px;line-height:180% ; ">If you have questions or need further
                clarification, feel free to reach out at <a href="mailto:support@turkeytrademarket.com"
                    target="_blank">support@turkeytrademarket.com</a>.</p>
            <p style="color: #636465;font-size:14px;line-height:180% ; ">Thank you for understanding, and we encourage
                you to reapply in the future.
            </p>
            <p style="color: #636465;font-size:14px;line-height:180% ; ">Best, The Turkeytrademarket Team</p>
        </div>

        <div
            style="background-color: #d9eee4; padding:10px; font-size:14px;color:#003399;line-height:160%;text-align:center;word-wrap:break-word">
            <p style="font-size:14px;line-height:160%"><span style="font-size:20px;line-height:32px"><strong>Get in
                        touch</strong></span></p>
            <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000000">+11
                    111
                    333
                    4444</span></p>
            <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000000"><a
                        href="mailto:Info@turkeytrademarket.com" target="_blank">Info@turkeytrademarket.com</a></span>
            </p>
        </div>
        <div style="color:#ffff; background-color: #037d41; padding: 1px;">
            <p style="font-size:14px;line-height:180% ; color:#ffff">Copyrights © Company
                All
                Rights Reserved</p>
        </div>
    </div>
</body>
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

const sendForgotOTPMail = async (user, otp) => {
  const transporter = nodemailer.createTransport({
    host: "mail.turkeytrademarket.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // GMAIL_USER -> MAIL_USER
      pass: process.env.MAIL_PASS, // GMAIL_PASS -> MAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: user?.email,
    subject: "Forgot Password - Reset Your Password",
    html: `
    <div
    style="max-width: 600px; width: 100%; margin: 0 auto; font-family: 'Cabin',sans-serif; text-align:center; background-color: #ffff;">
    <div style="width: 100%; background-color: #037d41; align-items: center; padding:30px 0px">
      <p style=" color:#ffff; font-weight: 700;">R E S E T <span style="margin-left: 10px;">P A S S W O R D</span></p>
      <p style=" color:#ffff; margin: 0px;     line-height: 39.2px;
      font-size: 28px;">Forget Password</p>
    </div>
  
    <div style="text-align: center; padding:10px">
      <p style="font-size: 22px;
      line-height: 35.2px;">Hi,</p>
      <small style="color: #636465;">You have requested to reset your password. Please use the following
        OTP
        to
        complete the password reset process:</small>
    </div>
    <button
      style="
  text-align:center; width: fit-content;min-width: 100px;    display: block;
  padding: 14px 44px 13px;
  line-height: 120%; margin: 30px auto; background-color: #037d41 ; color:#ffff; border:none;border-radius: 5px;">${otp}</button>
  
    <div style="text-align: center; padding:10px">
      <small style="color: #636465; font-size: 12px;"><span style="color:red;">*</span> If you did not initiate this
        password reset, please
        contact our
        support team immediately.</small>
    </div>
    <div
      style="background-color: #d9eee4; padding:10px; font-size:14px;color:#003399;line-height:160%;text-align:center;word-wrap:break-word">
      <p style="font-size:14px;line-height:160%"><span style="font-size:20px;line-height:32px"><strong>Get in
            touch</strong></span></p>
      <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000000">+11 111 333
          4444</span></p>
      <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000000"><a
            href="mailto:Info@turkeytrademarket.com" target="_blank">Info@turkeytrademarket.com</a></span></p>
    </div>
    <div style="color:#ffff; background-color: #037d41; padding: 1px;">
      <p style="font-size:14px;line-height:180%"><span style="font-size:16px;line-height:28.8px">Copyrights © Company All
          Rights Reserved</span></p>
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
const sendContactMessage = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "mail.turkeytrademarket.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // GMAIL_USER -> MAIL_USER
      pass: process.env.MAIL_PASS, // GMAIL_PASS -> MAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.SUPPORT_MAIL,
    subject: `New Contact Us Form Submission`,
    html: `
    <p><strong>Name:</strong> ${data?.first_name} ${
      data?.last_name && data?.last_name
    }</p>
    <p><strong>Email:</strong> ${data?.email}</p>
    <p><strong>Message:</strong></p>
    <p>${data?.message}</p>
  `,
  };

  let status = true;
  transporter.sendMail(mailOptions, (error, info) => {
    if (info) {
      status = true;
    }
    if (error) {
      status = false;
    }
  });
  return status;
};

const sendWelcomeMail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "mail.turkeytrademarket.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER, // GMAIL_USER -> MAIL_USER
      pass: process.env.MAIL_PASS, // GMAIL_PASS -> MAIL_PASS
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: data?.email,
    subject: `Welcome to Turkeytrademarket – `,
    html: `
    <body style="background-color: #f4f4f4; margin: 0; padding: 0;">
    <div
        style="max-width: 600px; width: 100%; margin: 0 auto; font-family: 'Cabin',sans-serif; text-align:center; background-color: #ffff;">
        <div style="width: 100%; background-color: #037d41; align-items: center; padding:30px 0px">
            <p style=" color:#ffff; font-weight: 700;">T H A N K S <span style="margin-left: 10px;">F O R</span> <span
                    style="margin-left: 10px;">REGISTERING
                    !</span></p>
            <p style=" color:#ffff; margin: 0px;     line-height: 39.2px;
    font-size: 28px;">Welcome to Turkeytrademarket</p>
        </div>


        <div style="padding: 10px; margin-top: 20px; text-align: left; line-break: auto;">
            <small style="color: #0f0f0f;">Hello <strong>${data?.name}</strong>,</small>
            <p style="color: #636465;font-size:14px;line-height:180% ; "><strong>Congratulations!</strong> Your
                Turkeytrademarket account has been
                successfully created
                and you are now signed in and ready to explore. </p>

            <p style="color: #151616;font-size:14px;line-height:180% ; "><strong>Here's what you can do next:</strong>
            </p>
            <div style="margin-left: 10px; margin-top: 0;">
                <p style="color: #2c2d2e;font-size:14px;line-height:180% ; "><strong>Explore the platform:</strong>
                    Familiarize yourself with the features and tools that can help grow your business.
                </p>
                <p style="color: #2c2d2e;font-size:14px;line-height:180% ; "><strong>Start networking:</strong>
                    Connect with suppliers and potential business partners to expand your reach.
                </p>
                <p style="color: #2c2d2e;font-size:14px;line-height:180% ; "><strong>Are you a supplier from
                        Turkey?</strong>
                    Apply to become a verified seller and enhance your visibility to buyers.
                </p>
                <p style="color: #2c2d2e;font-size:14px;line-height:180% ;margin-top: 5px; ">
                    Should you have any questions or need support, our team is here for you. Contact us anytime at
                    <a href="mailto:Info@turkeytrademarket.com" target="_blank">support@turkeytrademarket.com</a>.
                </p>
                <p style="color: #2c2d2e;font-size:14px;line-height:180% ;margin-top: 5px; ">
                    We are glad to have you with us and look forward to supporting your business endeavors.
                    Best regards,
                </p>
                <p style="color: #0f0f0f;font-size:14px;line-height:180% ;margin-top: 5px; ">
                    Turkeytrademarket team
                </p>
            </div>

        </div>

        <div
            style="background-color: #d9eee4; padding:10px; font-size:14px;color:#003399;line-height:160%;text-align:center;word-wrap:break-word">
            <p style="font-size:14px;line-height:160%"><span style="font-size:20px;line-height:32px"><strong>Get in
                        touch</strong></span></p>
            <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000000">+11
                    111
                    333
                    4444</span></p>
            <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000000"><a
                        href="mailto:Info@turkeytrademarket.com" target="_blank">Info@turkeytrademarket.com</a></span>
            </p>
        </div>
        <div style="color:#ffff; background-color: #037d41; padding: 1px;">
            <p style="font-size:14px;line-height:180% ; color:#ffff">Copyrights © Company
                All
                Rights Reserved</p>
        </div>
    </div>
</body>
  `,
  };

  let status = true;
  transporter.sendMail(mailOptions, (error, info) => {
    if (info) {
      status = true;
    }
    if (error) {
      status = false;
    }
  });
  return status;
};

module.exports = {
  sendStoreApprovedMail,
  sendStoreDeclineMail,
  sendForgotOTPMail,
  sendContactMessage,
  sendWelcomeMail,
};
