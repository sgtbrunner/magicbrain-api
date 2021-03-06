const express = require('express'); // Importing Express: Libray for server management
const cors = require('cors'); // Importing CORS: Grants Access-Control-Allow-Origin between browser and server'

const { PORT } = require('./constants');
const { logger } = require('./controllers/logger');
const { handleServerStatus } = require('./controllers/status');
const { handleProfileGet } = require('./controllers/profile');
const { handleSignIn } = require('./controllers/signin');
const { handleRegister } = require('./controllers/register');
const { handleApiCall, handleImage } = require('./controllers/image');

const app = express();

//**** VERY IMPORTANT - Must be set up in every server project ****
// Body Parser Middleware (built-in in express, no need for body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable Cors
app.use(cors());

// Server logger
app.use(logger);

//ROUTES

// Get Server status
app.get('/', handleServerStatus);

// Get single user
app.get('/profile/:id', handleProfileGet);

// Sign-In users
app.post('/signin', handleSignIn);

// Register
app.post('/register', handleRegister);

// Get image and update entries
app.put('/image', handleImage);

// Checks image for face-recognition
app.post('/imageurl', handleApiCall);

app.listen(PORT, () =>
  console.log(`CORS-enabled SERVER is RUNNING on port ${PORT}`)
);
