const database = {
	users: [
		{
			id:'123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id:'124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		},
		{
			id:'125',
			name: 'Bob',
			email: 'bob@gmail.com',
			password: 'tomatoes',
			entries: 0,
			joined: new Date()
		}				
	]
};

module.exports = database;