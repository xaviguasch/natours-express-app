const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1)-MIDDLEWARES
app.use(morgan('dev'));

//In this case, this is giving us access to the data from the POST request in the body, it PARSES THE DATA (the data is stored in an object,in req.body)
app.use(express.json());

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

// 4)- START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
