const fs = require('fs');
const express = require('express');

const app = express();

// MIDDLEWARE. In this case, this is adding the data from the POST request to the body (of the request in an object, so in req.body)
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1; // Converts the id string to a number

  const tour = tours.find((tour) => tour.id === id);

  // if (id > tours.length) {
  if (!tour) {
    // we put "return" because we want to exit the function
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  // we're adding + 1 to the last id in the tours array.
  const newId = tours[tours.length - 1].id + 1;

  // Creating a new object with the data of the post request (in req.body) and the ID we just generated
  const newTour = Object.assign({ id: newId }, req.body);

  // We're adding the newTour to the tours array
  tours.push(newTour);

  // We're replacing the old tours-simple.json file with a new one with the updated tours data.
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    // we put "return" because we want to exit the function
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  // We aren't really updating the tour item as this is just a demo app to familiarize us with Express
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    // we put "return" because we want to exit the function
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  // We aren't really deleting the tour item as this is just a demo app to familiarize us with Express
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
