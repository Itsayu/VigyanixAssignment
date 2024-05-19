const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasks = require('./routes/tasks');
const app = express();
const port = process.env.PORT || 5000; // Use port 5000

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/tasks', tasks);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
