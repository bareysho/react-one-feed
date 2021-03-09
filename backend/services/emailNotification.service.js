const { transporter } = require('config/nodemailer');

const sendEmailToken = (user, emailToken) => {
  transporter.sendMail({
    from: '"Node js" <nodejs@example.com>',
    to: user.email,
    subject: 'Message from Node js',
    html:
      `Code verification is: ${emailToken.token}`,
  })
}

module.exports = {
  sendEmailToken,
}
