const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1)-MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//In this case, this is giving us access to the data from the POST request in the body, it PARSES THE DATA (the data is stored in an object,in req.body)
app.use(express.json());

// This enables us to serve static files
app.use(express.static(`${__dirname}/public`));

// It adds the requestTime property to the req object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// 3)- ROUTES (where we mount our routers)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
