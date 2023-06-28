const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const cors = require('cors')

// MIDDLEWARES
app.use(cors())
app.use(express.json())

app.post('/contactMe', (req, res) => {
  // CREATE A TRANSPORTER TO CARRY THE EMAIL MESSAGE
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'belloquadriola@gmail.com',
      pass: 'eogakngfjklxsjjp',
    },
  })

  // CREATE EMAIL CREDENTIALS AND INFORMATION
  const emailOptions = {
    from: req.body.Email,
    to: 'belloquadriola@gmail.com',
    subject: `${req.body.Subject} from ${req.body.Email}`,
    text: req.body.Message,
  }

  // CONNECT TRANSPORTER TO EMAIL CREDENTIALS
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err)
      res.status(500).json({ success: false, message: 'something went wrong' })
    } else {
      console.log('message sent')
      res
        .status(200)
        .json({ success: true, message: 'message sent successfully' })
    }
  })
})

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.status(200).send(`<h1>Home</h1>`)
})

app.listen(port, console.log(`server is listening on port ${port}`))
