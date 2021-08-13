<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sgtbrunner/magicbrain-api">
    <img src="assets/images/logo.png" alt="Logo" height="120">
  </a>

  <h3 align="center">MagicBrain API</h3>

  <p align="center">
    An API for MagicBrain, a modern web application which identifies faces in images and display its boundaries.
    <br />
    <a href="https://github.com/sgtbrunner/magicbrain-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://mighty-beyond-04256.herokuapp.com/">API in Production</a>
    ·
    <a href="https://github.com/sgtbrunner/magicbrain-api/issues">Report Bug / Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Back-End API for [MagicBrain](https://github.com/sgtbrunner/magicbrain), a modern web application which identifies faces in images and display its boundaries.

This project was originally built as part of a Full Stack pratical exercise, aimed at learning how to build a REST API using Javascript, Node and Express and PostgreSQL database.

### Built With

  MagicBrain API was built with the following technologies:

  <div>
    <img align="center" alt="Brunner-Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
    <img align="center" alt="Brunner-Node" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-plain.svg">
    <img align="center" alt="Brunner-Express" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg">
  </div>
  <br />

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Have `npm` installed in your machine.  
* npm
  ```sh
  npm install npm@latest -g
  ```
* Clarifai API Key -> Get yours [HERE](https://www.clarifai.com/)
* Postgres installed and running locally -> Download it [HERE](https://www.postgresql.org/download/)

### Installation
  
  On terminal

1. Clone the repo
   ```sh
   git clone https://github.com/sgtbrunner/magicbrain-api
   ```

2. Navigate to project folder
   ```sh
   cd magicbrain-api
   ```

3. Install NPM packages
   ```sh
   npm install
   ```

4. Create a local postgres database 
   ```sh
   createdb 'your-database'
   ```

5. Inside your newly created database, add two tables with the following scripts:
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

6.  Create a `config.js` file in the project root folder and export your `API KEY`:
    ```
    const API_KEY = // your api key

    module.exports = {
        API_KEY,
    }
    ```
7.  Setup your personal database info in `database.js` as:
    ```
    const DEV_DB_CONNECTION = {
      host: '127.0.0.1',
      user: '', // your master local db user name
      password: '', // the local database password
      database: 'your-database', // the local dabatase name
    }
    ```

<!-- USAGE EXAMPLES -->
## Usage
  The MagicBrain API doesn't have authentication.
  <br />
  Run the following commands on terminal within the project folder:

1. Starting the app
   ```sh
   npm start:dev
   ```
   The project should be served at:
   ```sh
   http://localhost:5000/
   ```
   Alternatively, you can try out the API in PRODUCTION:
   ```sh
   https://mighty-beyond-04256.herokuapp.com
   ```

  ## Endpoints
  ### Get Server status
   ```sh
   GET /
   ```
   #### Example

   Input: No Input for this endpoint
   <br />
   Output: `server is working!!!!`
   <br />

  ### Get single user
   ```sh
   GET /profile/{id}
   ```
   #### Example
  Input: 
  * id: user's id

  Output:
   ```sh
    {
      "id": 2,
      "name": "test",
      "email": "test@test.com",
      "entries": "1",
      "joined": "2021-05-18T01:18:12.131Z"
    }
   ```

  Errors:
   ```sh
    "HTTP ERROR STATUS 404 - User id 1 not found"
   ```

  ### Sign-In users
   ```sh
   POST /signin
   ```
   #### Example
  Body Input: 
  ```sh
{
    "email": "test@email.com",
    "password": "testtest"
}
  ```

  Output:
   ```sh
    {
      "id": 20,
      "name": "test",
      "email": "test@email.com",
      "entries": "11",
      "joined": "2021-05-18T01:18:12.131Z"
    }
   ```

  Errors:
   ```sh
{
    "error": "You have entered an invalid username and/or password"
}
   ```

  ### Register users
   ```sh
   POST /register
   ```
   #### Example
  Body Input: 
  ```sh
{
    "name": "test",
    "email": "admin@test.com",
    "password": "fasfasf56"
}
  ```

  Output:
   ```sh
  {
      "id": 5,
      "name": "test",
      "email": "admin@test.com",
      "entries": "0",
      "joined": "2021-08-13T15:17:00.125Z"
  }
   ```

  Errors:
   ```sh
{
    "error": "Email \"admin@test.com\" already registered."
}
   ```

  ### Register users
   ```sh
   POST /register
   ```
   #### Example
  Body Input: 
  ```sh
{
    "name": "test",
    "email": "admin@test.com",
    "password": "fasfasf56"
}
  ```

  Output:
   ```sh
  {
      "id": 5,
      "name": "test",
      "email": "admin@test.com",
      "entries": "0",
      "joined": "2021-08-13T15:17:00.125Z"
  }
   ```

  Errors:
   ```sh
{
    "error": "Email \"admin@test.com\" already registered."
}
   ```

  ### Update entries
   ```sh
   PUT /image
   ```
   #### Example
  Body Input: 
  ```sh
{
    "id": "5",
}
  ```

  Output:
   ```sh
  {
      "count": 6,
  }
   ```

  Errors:
   ```sh
{
    "error": "Unable to update your image count. Please try again later"
}
   ```


  ### Checks image for face-recognitiones
   ```sh
   POST /imageurl
   ```
   #### Example
  Body Input: 
  ```sh
{
    "input": "https://www.aceshowbiz.com/images/photo/the_rock.jpg"
}
  ```

  Output:
   ```sh
{
    "status": {
        "code": 10000,
        "description": "Ok",
        "req_id": "32736d634ba346df81879affa5fb5daa"
    },
    "outputs": [
        {
            "id": "af88b1bb78014896b0bcbc6d5273e117",
            "status": {
                "code": 10000,
                "description": "Ok"
            },
            "created_at": "2021-08-13T16:46:05.322537140Z",
            "model": {
                "id": "a403429f2ddf4b49b307e318f00e528b",
                "name": "face",
                "created_at": "2016-10-25T19:30:38.541073Z",
                "app_id": "main",
                "output_info": {
                    "output_config": {
                        "concepts_mutually_exclusive": false,
                        "closed_environment": false,
                        "max_concepts": 0,
                        "min_value": 0
                    },
                    "message": "Show output_info with: GET /models/{model_id}/output_info",
                    "type": "detect-concept",
                    "type_ext": "detect-concept"
                },
                "model_version": {
                    "id": "34ce21a40cc24b6b96ffee54aabff139",
                    "created_at": "2019-01-17T19:45:49.087547Z",
                    "status": {
                        "code": 21100,
                        "description": "Model is trained and ready"
                    },
                    "visibility": {
                        "gettable": 10
                    },
                    "app_id": "main",
                    "user_id": "clarifai",
                    "metadata": {}
                },
                "display_name": "Face Detection",
                "user_id": "clarifai",
                "input_info": {},
                "train_info": {},
                "model_type_id": "visual-detector",
                "visibility": {
                    "gettable": 10
                },
                "metadata": {}
            },
            "input": {
                "id": "2b660a8308a944e5a75a2d96806985fe",
                "data": {
                    "image": {
                        "url": "https://www.aceshowbiz.com/images/photo/the_rock.jpg"
                    }
                }
            },
            "data": {
                "regions": [
                    {
                        "id": "b055216dba030ca1944c06937ccdadd6",
                        "region_info": {
                            "bounding_box": {
                                "top_row": 0.05029705,
                                "left_col": 0.32780963,
                                "bottom_row": 0.6298665,
                                "right_col": 0.7165285
                            }
                        },
                        "data": {
                            "concepts": [
                                {
                                    "id": "ai_8jtPl3Xj",
                                    "name": "face",
                                    "value": 0.99990416,
                                    "app_id": "main"
                                }
                            ]
                        },
                        "value": 0.99990416
                    }
                ]
            }
        }
    ],
    "rawData": {
        "status": {
            "code": 10000,
            "description": "Ok",
            "req_id": "32736d634ba346df81879affa5fb5daa"
        },
        "outputs": [
            {
                "id": "af88b1bb78014896b0bcbc6d5273e117",
                "status": {
                    "code": 10000,
                    "description": "Ok"
                },
                "created_at": "2021-08-13T16:46:05.322537140Z",
                "model": {
                    "id": "a403429f2ddf4b49b307e318f00e528b",
                    "name": "face",
                    "created_at": "2016-10-25T19:30:38.541073Z",
                    "app_id": "main",
                    "output_info": {
                        "output_config": {
                            "concepts_mutually_exclusive": false,
                            "closed_environment": false,
                            "max_concepts": 0,
                            "min_value": 0
                        },
                        "message": "Show output_info with: GET /models/{model_id}/output_info",
                        "type": "detect-concept",
                        "type_ext": "detect-concept"
                    },
                    "model_version": {
                        "id": "34ce21a40cc24b6b96ffee54aabff139",
                        "created_at": "2019-01-17T19:45:49.087547Z",
                        "status": {
                            "code": 21100,
                            "description": "Model is trained and ready"
                        },
                        "visibility": {
                            "gettable": 10
                        },
                        "app_id": "main",
                        "user_id": "clarifai",
                        "metadata": {}
                    },
                    "display_name": "Face Detection",
                    "user_id": "clarifai",
                    "input_info": {},
                    "train_info": {},
                    "model_type_id": "visual-detector",
                    "visibility": {
                        "gettable": 10
                    },
                    "metadata": {}
                },
                "input": {
                    "id": "2b660a8308a944e5a75a2d96806985fe",
                    "data": {
                        "image": {
                            "url": "https://www.aceshowbiz.com/images/photo/the_rock.jpg"
                        }
                    }
                },
                "data": {
                    "regions": [
                        {
                            "id": "b055216dba030ca1944c06937ccdadd6",
                            "region_info": {
                                "bounding_box": {
                                    "top_row": 0.05029705,
                                    "left_col": 0.32780963,
                                    "bottom_row": 0.6298665,
                                    "right_col": 0.7165285
                                }
                            },
                            "data": {
                                "concepts": [
                                    {
                                        "id": "ai_8jtPl3Xj",
                                        "name": "face",
                                        "value": 0.99990416,
                                        "app_id": "main"
                                    }
                                ]
                            },
                            "value": 0.99990416
                        }
                    ]
                }
            }
        ]
    }
}
   ```

  Errors:
   ```sh
{
    "error": "Unable to detect faces on selected image. Please check your url and try again."
}
   ```

<!-- ROADMAP -->
## Roadmap
See the [open issues](https://github.com/sgtbrunner/magicbrain-api/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Contact

Guilherme Brunner - guilherme.brunner@gmail.com

Project Link: [https://github.com/sgtbrunner/magicbrain-api](https://github.com/sgtbrunner/magicbrain-api)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [cors](https://www.npmjs.com/package/cors)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [knex](https://www.npmjs.com/package/knex)
* [pg](https://www.npmjs.com/package/pg)
* [Clarifai API](https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection)
* [Moment.js](https://www.npmjs.com/package/moment)
* [Heroku](https://pages.github.com)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/sgtbrunner/magicbrain-api.svg?style=for-the-badge
[contributors-url]: https://github.com/sgtbrunner/magicbrain-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/sgtbrunner/magicbrain-api.svg?style=for-the-badge
[forks-url]: https://github.com/sgtbrunner/magicbrain-api/network/members
[stars-shield]: https://img.shields.io/github/stars/sgtbrunner/magicbrain-api.svg?style=for-the-badge
[stars-url]: https://github.com/sgtbrunner/magicbrain-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/sgtbrunner/magicbrain-api.svg?style=for-the-badge
[issues-url]: https://github.com/sgtbrunner/magicbrain-api/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/guilherme-brunner
