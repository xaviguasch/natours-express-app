const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1)-MIDDLEWARES
app.use(morgan('dev'));

//In this case, this is giving us access to the data from the POST request in the body, it PARSES THE DATA (the data is stored in an object,in req.body)
app.use(express.json());

// This enables us to serve static files
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('hello from the middleware!');

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// 3)- ROUTES (where we mount our routers)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
