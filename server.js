const express = require('express'); // Importing Express: Libray for server management
const moment = require('moment'); // Importing Moment: Libray for printing timestamp
const bcrypt = require('bcrypt'); // Importing Bcrypt: Allows password encryption using hash
const cors = require('cors'); // Importing CORS: Grants Access-Control-Allow-Origin between browser and server'
const knex = require('knex'); // Importing Knex: Connects Server and Database
const Clarifai = require('clarifai'); // Importing clarifai for image recognition
require('dotenv').config({path: __dirname + '/' + 'variables.env'}); // Imports environmental variables from variables.env and configs them

// DATABASE SETTINGS
const database = knex({
	//process.env.{variable} imports variables from variables.env file in root directory
  client: process.env.client,
  connection: {
    host : process.env.host,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
  }
});

const app = express();

//**** VERY IMPORTANT - Must be copied and pasted in every server project ****
// Body Parser Middleware (built-in in express, no need for body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable Cors
app.use(cors());

// Server logger
app.use((req, res, next) => {
	console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: Attempt to ${req.method} from/to SERVER at ${req.hostname}:${process.env.PORT}${req.originalUrl}`);
	next();
})

// Get Database on root
app.get('/', (req, res) => {
	console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - Heroku is working!`);
	return res.send('it is working!');
})

// Get single user
app.get('/profile/:id', (req, res) => {
	const {id} = req.params; // destructuring
	database('users')
	.where('id', '=', id)
	.then(user => {
		if (user.length) {
			console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - user's ${user[0].name} (id ${id}) info RETRIEVED sucessfully`);
			return res.json(user[0]);			
		} else {
			console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: HTTP ERROR STATUS 404 - User id ${id} not found`);
			return res.status(404).json(`HTTP ERROR STATUS 404 - User id ${id} not found`);			
		}
	}).catch(err => {
		console.log(`Unable to get profile`);
		res.status(400).json(`Unable to get profile`);
	});
});

// Sign-In users
app.post('/signin', (req, res) => {
	const {email, password} = req.body; // destructuring
	database.select('email','hash').from('login')
			.where('email', '=', email)
			.then(data => {
				const isValid = bcrypt.compareSync(password, data[0].hash);
				if (isValid) {
					return database.select('*').from('users')
							.where('email', '=', email)
							.then(user => {
								console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - User ${user[0].name} SIGNED-IN sucessfully`);
								return res.json(user[0]);
							}).catch(err => {
								console.log(`Server unable to return user: ${err}`);
								res.status(400).json(`Server unable to return user: ${err}`);
							})
				} else {
					console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: HTTP ERROR STATUS 400 - Invalid user and/or password`);
					return res.status(400).json(`HTTP ERROR STATUS 400  - Invalid user and/or password`);					
				}
			}).catch(err => {
				console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: HTTP ERROR STATUS 400 - Invalid user and/or password`);
				return res.status(400).json(`HTTP ERROR STATUS 400  - Invalid user and/or password`);
			})
});

// Register
app.post('/register', (req, res) => {
	const { name, email, password } = req.body; // destructuring
	const hash = bcrypt.hashSync(password, 10);
		database.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name: name,
						joined: new Date()
					})
					.then(user => {
						res.json(user[0]);
						console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - User ${name} (email:${email}) REGISTERED sucessfully`);
					})
				})
				.then(trx.commit)
				.then(trx.rollback)
				.catch(err => {
					res.status(400).json('Unable to register!');
					console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: FAIL - User ${name} (email:${email}) ALREADY REGISTERED`);
				})
		})
});


// Get image and update entries
app.put('/image', (req, res) =>{
	const {id} = req.body; // destructuring
	database('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		if(entries.length) {
			console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - User id ${id} SUBMITED a new image sucessfully`);
			return res.json(entries[0]);
		} else {
			console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: HTTP ERROR STATUS 404 - User id ${id} not found`);
			return res.status(404).json(`User id ${id} not found`);
		}
	}).catch(err => {
		console.log(`Unable to get entries`);
		res.status(400).json(`Unable to get entries`);
	});
});

// End-Point for checking image for face-recognition
app.post('/imageurl', (req, res) => {
	const clarifaiApp = new Clarifai.App({
	  apiKey: 'a9f14c51e25149479e18ee68eb3fa84b'
	});
	clarifaiApp.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with API'))
});

app.listen(process.env.PORT || 3000, () => console.log(`CORS-enabled SERVER is RUNNING on port ${process.env.PORT}`));