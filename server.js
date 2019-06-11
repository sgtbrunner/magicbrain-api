const express = require('express'); // Importing Express
const moment = require('moment'); // Prints timestamp
const database = require('./database.js'); //Temporary database
const bcrypt = require('bcrypt'); //Allows password encryption using hash
var cors = require('cors'); //Grants Access-Control-Allow-Origin between browser and server'
const PORT = 3000;

const app = express();

// REMOVES PASSWORD FROM SERVER RETURNED USER FOR SAFETY MEASURES
// const makePublic = (user) => {
// 	const safeUser = user;
// 	delete safeUser.password;
// 	return safeUser;
// }

//**** VERY IMPORTANT - Must be copied and pasted in every server project ****
// Body Parser Middleware (built-in in express, no need for body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable Cors
app.use(cors());

// Server logger
app.use((req, res, next) => {
	console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: Attempt to ${req.method} from/to SERVER at ${req.hostname}:${PORT}${req.originalUrl}`);
	next();
})

// Get Database on root
app.get('/', (req, res) => {
	console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - Database RETRIEVED sucessfully`);
	return res.send(database.users);
})

// Get single user
app.get('/profile/:id', (req, res) => {
	const {id} = req.params; // destructuring
	const found = database.users.some(user => user.id === id);
	if (found){
		database.users.forEach(user =>{
			if(user.id === id){
				console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - user's ${user.name} (id ${user.id}) info RETRIEVED sucessfully`);
				return res.json(user);
			}
		});
	} else {
		console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: HTTP ERROR STATUS 404 - User ${id} not found`);
		return res.status(404).json(`HTTP ERROR STATUS 404 - User ${id} not found`);
	}
});

app.post('/signin', (req, res) => {
	const {email, password} = req.body; // destructuring
	const userFound = database.users.some(user => user.email === email && user.password === password);
	//bcrypt syntax to compare a password
	// bcrypt.compare(password, '$2b$10$yyQEjy7ZJ83yV0lSugNsg.G/FHcTcClf4cA2wP5mFjX2tEkcEtVdi', (err, res) => {
 //    	console.log('first guess', res);
	// });
	// bcrypt.compare('password', '$2b$10$yyQEjy7ZJ83yV0lSugNsg.G/FHcTcClf4cA2wP5mFjX2tEkcEtVdi', (err, res) => {
 //    	console.log('second guess', res);
	// });
	if (userFound) {
		console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - User ${email} SIGNED-IN sucessfully`);
		database.users.forEach(user =>{
			if(user.email === email && user.password === password){
				return res.json(user);
			}
		});
		
	} else {
		console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: HTTP ERROR STATUS 400 - Invalid user and/or password`);
		return res.status(400).json(`HTTP ERROR STATUS 400  - Invalid user and/or password`);
	}
})

// Register
app.post('/register', (req, res) => {
	const { name, email, password } = req.body; // destructuring
	const emailFound = database.users.some(user => user.email === email);
	if(emailFound) {
		return res.status(403).json(`Email ${email} already registered!`);
	} else {
		// bcrypt.hash(password, 10, (err, hash) => { //bcrypt syntax from bcrypt website to hash a password 
		// 	console.log('hash', hash);
		// })
		database.users.push(
			{
				id: (parseInt(database.users[database.users.length-1].id)+1).toString(),
				name: name,
				email: email,
				password: password,
				entries: 0,
				joined: new Date
			}
		)
		console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - User ${name} (email:${email}) REGISTERED sucessfully`);
		return res.json(database.users[database.users.length-1]);
	}
});


// Get image and update entries
app.put('/image', (req, res) =>{
	const {id} = req.body; // destructuring
	const found = database.users.some(user => user.id === id);
	if (found){
		database.users.forEach(user =>{
			if(user.id === id){
				user.entries++
				console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: SUCCESS - ${user.name} (id ${user.id}) SUBMITED a new image sucessfully`);
				return res.json(user.entries);
			}
		});
	} else {
		console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: HTTP ERROR STATUS 404 - User not found`);
		return res.status(404).json('No such user');
	}
});

app.listen(PORT, () => console.log(`CORS-enabled SERVER is RUNNING on port ${PORT}`));