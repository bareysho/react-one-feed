const { transporter } = require('config/nodemailer');

const sendEmailToken = (mailTo, emailToken) => {
  transporter.sendMail({
    from: '"Node js" <nodejs@example.com>',
    to: mailTo,
    subject: 'Message from Node js',
    html:
      `Code verification is: ${emailToken.token}`,
  })
}

module.exports = {
  sendEmailToken,
}
