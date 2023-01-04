require('dotenv').config();

const express = require('express');
const app = express();
const words = require('./routes/words');
const connectDB = require('./db/connect');

app.use(express.json());
app.use('/api/v1/words', words);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
