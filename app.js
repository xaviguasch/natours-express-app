const fs = require('fs');
const express = require('express');

const app = express();

// MIDDLEWARE. In this case, this is adding the data from the POST request to the body (of the request in an object, so in req.body)
app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endcode...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
