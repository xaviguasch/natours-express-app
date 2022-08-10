const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    // we put "return" because we want to exit the function
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; // Converts the id string to a number

  const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  // We aren't really updating the tour item as this is just a demo app to familiarize us with Express
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // We aren't really deleting the tour item as this is just a demo app to familiarize us with Express
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
