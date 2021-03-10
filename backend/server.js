const fs = require('fs');
const path = require('path');

require('rootpath')();
require('dotenv').config();

const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  const envConfig = dotenv.parse(fs.readFileSync('.env.local'))

  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const passport = require('config/passport');

const apiRouter = require('routes/api');
const errorHandler = require('middlewares/errorHandler');

const createTestUser = require('utils/createTestUser');
createTestUser();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

app.use(cookieParser());
app.use(passport.initialize())

app.use('/static', express.static(path.join(__dirname, './public/static')));

app.use(apiRouter);

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, './public/')});
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend starts on PORT ${PORT}`)
});
