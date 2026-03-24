const express = require('express');
require('dotenv').config();
const cors = require('cors');
const databaseconnection = require('./database');

// database connection
databaseconnection("mongodb+srv://praveen12:praveen12@cluster0.icv4not.mongodb.net/")


const app = express();

app.use(cors());
app.use(express.json());

// mount API routes
const books = require('./routes/books');
app.use('/api/books', books);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
