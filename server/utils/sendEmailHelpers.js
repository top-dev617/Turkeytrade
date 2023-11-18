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
    <p>Hello ${store?.user?.name},</p>
    
    <p>We are pleased to confirm that your application has been approved, and you are now a Verified Seller on Turkeytrademarket! This means you're all set to begin listing your products on the platform and making them visible to a vast network of potential buyers.</p>
    
    <p>As a Verified Seller, you now have access to the "My Store" section on our website. Here's what you can do next:</p>
    
    <ul>
      <li>Go to "My Store": This new section is now visible on your dashboard. Here you can upload your products and manage your listings.</li>
      <li>Upload Your Products: Add your products with high-quality images and detailed descriptions to attract buyers.</li>
      <li>Respond Promptly: Ensure you reply to potential buyers messages quickly to increase sales opportunities and provide excellent customer service.</li>
    </ul>
    
    <p>To start adding your products and managing your store, simply log in to your account and navigate to the "My Store" section.</p>
    
    <p>Should you need any help or have questions as you set up your store, our support team is just an email away at <a href="mailto:support@turkeytrademarket.com">support@turkeytrademarket.com</a>.</p>
    
    <p>Congratulations once again, and we look forward to seeing your products on Turkeytrademarket!</p>
    
    <p>Best regards,<br>
    The Turkeytrademarket Team</p>
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
    <p>Hello ${store?.user?.name},</p>
    
    <p>We appreciate your interest in becoming a Verified Seller on Turkeytrademarket.</p>
    
    <p>After reviewing your application, we regret to inform you that we are unable to approve it at this time.</p>
    
    <p>If you have any questions or need further clarification, please feel free to reach out to us at <a href="mailto:support@turkeytrademarket.com">support@turkeytrademarket.com</a>.</p>
    
    <p>Thank you for your understanding, and we encourage you to reapply in the future.</p>
    
    <p>Best regards,<br>
    The Turkeytrademarket Team</p>
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
    <!doctype html>
    <html ⚡4email data-css-strict>
    
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <style amp4email-boilerplate>
        body {
          visibility: hidden
        }
      </style>
    
      <script async src="https://cdn.ampproject.org/v0.js"></script>
    
    
      <style amp-custom>
        .u-row {
          display: flex;
          flex-wrap: nowrap;
          margin-left: 0;
          margin-right: 0;
        }
        
        .u-row .u-col {
          position: relative;
          width: 100%;
          padding-right: 0;
          padding-left: 0;
        }
        
        .u-row .u-col.u-col-100 {
          flex: 0 0 100%;
          max-width: 100%;
        }
        
        @media (max-width: 767px) {
          .u-row:not(.no-stack) {
            flex-wrap: wrap;
          }
          .u-row:not(.no-stack) .u-col {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
        
        table,
        td {
          color: #000000;
        }
        
        #u_body a {
          color: #0000ee;
          text-decoration: underline;
        }
      </style>
    
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;background-color: #f9f9f9;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
                    <!-- ... (Your existing email content) ... -->
                    <div style="padding: 0px;">
                        <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                            <div class="u-row">
                                <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                    <div style="width: 100%;padding:0px;">
                                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
                                                        <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                            <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi, </span></p>
                                                            <p style="font-size: 14px; line-height: 160%;"><span style="color: #636465; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: 14px; text-align: center; white-space: normal; background-color: #ffffff; float: none; display: inline; line-height: 22.4px;">You've requested to reset your password. Please use the following passcode to complete the process.</span></p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                            <tbody>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
                                                        <!--[if mso]><style>.v-button {background: transparent;}</style><![endif]-->
                                                        <div align="center">
                                                            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:44px; v-text-anchor:middle; width:143px;" arcsize="9%" stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                                            <a target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;text-align: center;color: #FFFFFF; background-color: #ff6600; border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; font-size: 14px;">
                                                                <span style="display:block;padding:14px 44px 13px;line-height:120%;">${otp}</span>
                                                            </a>
                                                            <!--[if mso]></center></v:roundrect><![endif]-->
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ... (Your existing email content) ... -->
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
</body>

</html>
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
    <p>  <p><strong>Name:</strong> ${data?.name}</p>

    <strong>Congratulations!</strong> Your Turkeytrademarket account has been successfully created and you are now signed in and ready to explore. 
    
    Here's what you can do next:
    
    Explore the platform: Familiarize yourself with the features and tools that can help grow your business.
    
    Start networking: Connect with suppliers and potential business partners to expand your reach.
    
    Are you a supplier from Turkey? Apply to become a verified seller and enhance your visibility to buyers.
    
    
    Should you have any questions or need support, our team is here for you. Contact us anytime at support@turkeytrademarket.com. 
    
    We are glad to have you with us and look forward to supporting your business endeavors.
    Best regards, 
    
    Turkeytrademarket team
    </p>

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
