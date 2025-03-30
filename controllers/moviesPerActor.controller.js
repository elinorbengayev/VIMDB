import {isMainThread, Worker} from "worker_threads"
import {forwardMessageToWorker, handleResult} from "../utils/utils.js";
import {actors, movies} from "../dataForQuestions.js"
import {isActorInMovie} from "../tmdb/tmdb.handler.js";
import {fileURLToPath} from 'url';

export function handleMoviesPerActorRequest(res) {
    const __filename = fileURLToPath(import.meta.url);
    const worker = new Worker(__filename);

   handleResult(worker, res);
}

// Worker Thread: Process movies per actor
if (!isMainThread) {
    async function manageActors() {
        let moviesPerActor;

        // Create an array of promises for each actor
        const actorMoviesPromises = actors.map((actor) => {
            return processActor(actor); // process each actor concurrently
        });

        // Wait for all promises to resolve concurrently
        moviesPerActor = await Promise.all(actorMoviesPromises);

        return moviesPerActor;
    }

    async function processActor(actor) {
        let actorsMovies = [];

        // For each actor, check each movie concurrently
        const moviePromises = Object.entries(movies).map(([movieName, movieID]) => {
            return isActorInMovie(movieID, actor)
                .then((result) => {
                    if (result) {
                        actorsMovies.push(movieName); // add movie name if actor is in it
                    }
                })
                .catch((error) => console.error(`Error fetching movie ${movieID} for actor ${actor}:`, error));
        });

        // Wait for all movie checks to finish for this actor
        await Promise.all(moviePromises);

        // Return the actor and their movies
        return { [actor]: actorsMovies };
    }

    forwardMessageToWorker(manageActors);
}
