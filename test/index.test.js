// import supertest from 'supertest';
// import {app, closeApp} from '../src/index.js';
//
// const request = supertest(app);

// describe('VIMDB API Tests', () => {
    // it('should return object, movies as keys and actors as values', async () => {
    //     const response = await request(app).get('/moviesPerActor'); // Adjust route as per your API
    //     expect(response.status).toBe(200); // Check if status is OK (200)
    //     expect(response.body).toBeInstanceOf(Object); // Check if response body is an Object
    //     expect(response.body.length).toBeGreaterThan(0); // Ensure there's at least one movie
    //     expect(Object.keys(response.body)).toBeInstanceOf(Array) //Ensure the values of the keys are arrays (of movies)
    // });
    //
    // // Example Test for GET /api/users/:id (Fetch single user)
    // it('should return object, actors as keys and list of objects', async () => {
    //     const response = await request(app).get('/actorsWithMultipleCharacters');
    //     expect(response.body).toBeInstanceOf(Object); // Check if response body is an Object
    //     expect(response.body.length).toBeGreaterThan(0); // Ensure there's at least one movie
    //     expect(Object.keys(response.body)).toBeInstanceOf(Array) //Ensure the values of the keys are arrays (of movies)
    //
    // });
    //
    // it('should return an object with keys as actor names and values as object of [{movieName, characterName}]', async () => {
    //     const response = await request(app).get('/actorsWithMultipleCharacters');
    //
    //     // Check if the returned object has keys (actor names) and values as arrays of strings
    //     for (const [actor, movies] of Object.entries(response)) {
    //         // Ensure each value is an array
    //         expect(Array.isArray(movies)).toBe(Object);
    //
    //         // Ensure each movie name inside the array is an object
    //         movies.forEach(movie => {
    //             expect(typeof movie).toBe(Object);
    //         });
    //     }
    // });

    // Example Test for invalid endpoint
    // it('should return 404 for non-existent route', async () => {
    //     const response = await request.get('/unknown'); // Non-existent route
    //     expect(response.status).toBe(404); // Expect 404 Not Found
    // });

// });
