# MagicBrain API

Back-End for the MagicBrain App (https://github.com/sgtbrunner/magicbrain), a modern web application which identifies faces in images and display its boundaries.

## Prerequisites

NPM installed
<br>
Clarifai API Key -> Get yours at https://www.clarifai.com/
<br>
Postgres installed and running locally

## Getting Started

On terminal:
1. Create a local postgres database `createdb 'your-database'`
2. Inside your newly created database, add two tables with the following scripts:
   ```
    CREATE TABLE users {
        id serial PRIMARY KEY,
        name VARCHAR(100),
        email text UNIQUE NOT NULL,
        entries BIGINT DEFAULT,
        joined TIMESTAMP NOT NULL
    };
   ```
   and
   ```
    CREATE TABLE login {
        id serial PRIMARY KEY,
        hash varchar(100) NOT NULL,
        email text UNIQUE NOT NULL
    };
   ```
3. Run `git clone https://github.com/sgtbrunner/magicbrain-api.git`
4. Run `cd magicbrain-api`
5. Run `npm install`
6. Create a config.js file in the project root folder and export your API KEY:
    ```
    const API_KEY = // your api key

    module.exports = {
        API_KEY,
    }
    ```
7. Setup your personal database info in database.js  `DEV_DB_CONNECTION` as:
    ```
    host: '127.0.0.1',
    user: '', // your master local db user name
    password: '', // the local database password
    database: 'your-database', // the local dabatase name
    ```
8. Run `npm run start:dev`

## Built With

* Javascript
* Restful API
* Node & Express
* PostgreSQL

## Authors

* **Guilherme Brunner** - *Initial work* - [sgtbrunner](https://github.com/sgtbrunner)

## Acknowledgement
* **Clarifai Face-Detection API** - https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection
