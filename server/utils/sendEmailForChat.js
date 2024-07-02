require("dotenv").config();
const nodemailer = require("nodemailer");

const primaryTransport = {
  host: process.env.PRIMARY_MAIL,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

const sendFirstMessage = async (user = null, data, email) => {
  const transporter = nodemailer.createTransport(primaryTransport);
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `New message from ${user?.buyerName} on Turkeytrademarket`,
    html: `
      <body style="background-color: #f4f4f4; margin: 0; padding: 0;">
    <div
        style="max-width: 600px; width: 100%; margin: 0 auto; font-family: 'Cabin',sans-serif; text-align:center; background-color: #ffff;">
        <div style="width: 100%; background-color: #037d41; align-items: center; padding:30px 0px">
            <p style=" color:#ffff; margin: 0px;     line-height: 39.2px;
    font-size: 28px;">Welcome to Turkeytrademarket</p>
        </div>


        <div style="padding: 20px; margin-top: 20px; text-align: left; line-break: auto;">
            <p style="color: #636465;font-size:14px;line-height:180% ; "><strong>Hi ${user?.name},</strong></p>

            <p style="color: #636465;font-size:14px;line-height:180% ; ">You have a new message from ${user?.buyerName}:</p>
            <div style="margin-left: 15px; margin-top: 0;">
                <p style="color: #636465;font-size:14px;line-height:180% ; ">
                    "${data?.message}"
                </p>
                <a href="${process.env.CLIENT_URL}/inbox" target="_blank" >
                    <button
                        style="padding: 10px 16px; border-radius: 6px; background-color: #037d41; color: white; outline: none; border: none; cursor: pointer;">Go
                        to your
                        inbox</button>
                </a>
            </div>

        </div>

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

const sendFirstRespondMessage = async (user = null, data, email) => {
  const transporter = nodemailer.createTransport(primaryTransport);
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: `Seller has responded to your message on Turkeytrademarket`,
    html: `
      <body style="background-color: #f4f4f4; margin: 0; padding: 0;">
    <div
        style="max-width: 600px; width: 100%; margin: 0 auto; font-family: 'Cabin',sans-serif; text-align:center; background-color: #ffff;">
        <div style="width: 100%; background-color: #037d41; align-items: center; padding:30px 0px">
            <p style=" color:#ffff; margin: 0px;     line-height: 39.2px;
    font-size: 28px;">Welcome to Turkeytrademarket</p>
        </div>


        <div style="padding: 20px; margin-top: 20px; text-align: left; line-break: auto;">
            <p style="color: #636465;font-size:14px;line-height:180% ; "><strong>Hi ${user?.name},</strong></p>

            <p style="color: #636465;font-size:14px;line-height:180% ; ">${user?.buyerName} has responded to your message:</p>
            <div style="margin-left: 15px; margin-top: 0;">
                <p style="color: #636465;font-size:14px;line-height:180% ; ">
                    "${data?.message}"
                </p>
                <a href="${process.env.CLIENT_URL}/inbox" target="_blank" >
                    <button
                        style="padding: 10px 16px; border-radius: 6px; background-color: #037d41; color: white; outline: none; border: none; cursor: pointer;">Go
                        to your
                        inbox</button>
                </a>
            </div>

        </div>

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

const sendMailForUnseenMsg = async (data) => {
  const transporter = nodemailer.createTransport(primaryTransport);
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: data?.email,
    subject: `You have unread messages from ${data?.buyerName}`,
    html: `
      <body style="background-color: #f4f4f4; margin: 0; padding: 0;">
    <div
        style="max-width: 600px; width: 100%; margin: 0 auto; font-family: 'Cabin',sans-serif; text-align:center; background-color: #ffff;">
        <div style="width: 100%; background-color: #037d41; align-items: center; padding:30px 0px">
            <p style=" color:#ffff; margin: 0px;     line-height: 39.2px;
    font-size: 28px;">Welcome to Turkeytrademarket</p>
        </div>


        <div style="padding: 20px; margin-top: 20px; text-align: left; line-break: auto;">
            <p style="color: #636465;font-size:14px;line-height:180% ; "><strong>Hi ${data?.name},</strong></p>

            <p style="color: #636465;font-size:14px;line-height:180% ; ">You have unread messages from ${data?.buyerName}:</p>
            <div style="margin-left: 15px; margin-top: 0;">
                <p style="color: #636465;font-size:14px;line-height:180% ; ">
                    "${data?.message}"
                </p>
                <a href="${process.env.CLIENT_URL}/inbox" target="_blank" >
                    <button
                        style="padding: 10px 16px; border-radius: 6px; background-color: #037d41; color: white; outline: none; border: none; cursor: pointer;">Go
                        to your
                        inbox</button>
                </a>
            </div>

        </div>

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
  sendFirstMessage,
  sendFirstRespondMessage,
  sendMailForUnseenMsg,
};
