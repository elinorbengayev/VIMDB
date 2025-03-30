# Vi Coding Assignment 

This project is a coding assignment for Vi.
The goal is to create a simple REST API that answers the following questions:
1. Which Marvel movies did each actor play in? 
2. Who are the actors who played more than one Marvel character?
3. Roles (characters) that were played by more than one actor? 

The data is extracted from a file called dataForQuestions.json which contains a movies object (movieName: movieID) and an actors list. 
The data is fetched from the [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction?).

## Tools
- Jest for testing

## Getting Started

### Install dependencies

Before starting to code, don't forget to install all dependencies with:

```shell
npm install
```

### Running tests

So, there are some basic tests written in test/test.js, but I didn't verify them as I got some running errors and was out of time.
They are there but commented out.
No need to run this command. 
```shell
npm test
```

### How to use

Set up your environment variables:
- API_KEY - must.
- LOG_LEVEL - optional, default is info.
- RUN_PORT - optional, default is 8000.

Then, you can run the application with:

```shell
npm start
```

Then you can use the following endpoints:
- GET /moviesPerActor 
  - returns a list of movies per actor: { actorName: [movies names] }
- GET /actorsWithMultipleCharacters
  - returns a list of actors who played more than one Marvel character: { actorName: [{movieName, characterName}] } 
- GET /charactersWithMultipleActors
  - returns a list of characters played by more than one actor: { characterName: [{movieName, actorName}] }

### Project Tech Stack

Main points:
- 'cluster' to support parallelization, utilizing multiple cores to provide better performance and scalability.
- 'axios' is used to fetch data from the TMDB API.
- Promises and async/await are used to handle asynchronous operations.
