const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json());
app.use(cors());


const birdsRouter = require('./src/app/backend/routes/birds');
app.use('/api/birds', birdsRouter);

//MongoDB
const dbURI = 'mongodb+srv://ike:ike@cluster0.cagju.mongodb.net/birds?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});