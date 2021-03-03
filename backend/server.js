require('rootpath')();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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
app.use(apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend starts on PORT ${PORT}`)
});
