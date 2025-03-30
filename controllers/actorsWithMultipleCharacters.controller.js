import { Worker, isMainThread } from "worker_threads";
import {forwardMessageToWorker, handleResult} from "../utils/utils.js";
import {actors, movies} from "../dataForQuestions.js";
import {actorCharacterInMovie} from "../tmdb/tmdb.handler.js";
import {fileURLToPath} from "url";
import logger from "../logging/logger.js";


export function handleActorsWithMultipleCharactersRequest(res) {
    const __filename = fileURLToPath(import.meta.url);
    const worker = new Worker(__filename);

    handleResult(worker, res)
}

// Worker Thread: Process actors with multiple characters
if (!isMainThread) {
    async function manageActors() {
        let moviesPerActor = [];

        // Create an array of promises for each actor
        const actorMoviesPromises = actors.map(async (actor) => {
            const result = await processActor(actor);
            if (result) moviesPerActor.push(result); // Push only valid results
        });

        // Wait for all promises to resolve concurrently
        await Promise.all(actorMoviesPromises);

        return moviesPerActor;
    }

    // Process a single actor concurrently
    async function processActor(actor) {
        let actorsToCharacters = [];
        // For each actor, check each movie concurrently
        const moviePromises = Object.entries(movies).map(async ([movieName, movieID]) => {
            try {
                const characterName = await actorCharacterInMovie(movieID, actor);
                // if characterName contains a "/", it means the actor has multiple characters in that movie
                if (characterName && characterName.includes("/")) {
                    actorsToCharacters.push({movieName, characterName}); // Add the character name
                }
            } catch (error) {
                logger.error(`Error fetching movie ${movieID} for actor ${actor}:`, error);
            }
        });

        // Wait for all movie checks to finish
        await Promise.all(moviePromises);

        return actorsToCharacters.length > 0 ? {[actor]: actorsToCharacters} : undefined;

    }

    forwardMessageToWorker(manageActors);
}

