import { Worker, isMainThread } from "worker_threads";
import {forwardMessageToWorker, handleResult} from "../utils/utils.js";
import {movies} from "../dataForQuestions.js";
import {CharactersActorsMapping} from "../tmdb/tmdb.handler.js";
import {fileURLToPath} from "url";


export function handleCharactersWithMultipleActorsRequest(res) {
    const __filename = fileURLToPath(import.meta.url);
    const worker = new Worker(__filename);

    handleResult(worker, res);
}

// Worker Thread: Process characters with multiple actors
if (!isMainThread) {
    async function mapCharactersByMovies() {
        const moviePromises = Object.entries(movies).map(([movieName, movieID]) =>
            CharactersActorsMapping(movieName, movieID) // Returns a promise
        );

        // Wait for all movie promises to resolve concurrently
        return Promise.all(moviePromises); // Run all promises concurrently
    }

    async function manageCharacters() {
        const CharacterToMovies = await mapCharactersByMovies();
        let charactersDict = {};

        // For each movie, map characters to their actors
        CharacterToMovies.forEach(movie => {
            Object.entries(movie).forEach(([character, actorMovie]) => {
                // If the character already exists, append the actor
                if (character in charactersDict) {
                    charactersDict[character].push(actorMovie[0]);
                } else {
                    // If the character doesn't exist, create a new entry
                    charactersDict[character] = [actorMovie[0]];
                }
            });
        });

        // checks if all actors for a character are the same
        function isSameActor(characterActors) {
            return characterActors.every(actor => actor["actorName"] === characterActors[0]["actorName"]);
        }

        // Filter characters with multiple actors
        Object.keys(charactersDict).forEach(character => {
            if (isSameActor(charactersDict[character])) {
                delete charactersDict[character];
            }
        });

        return charactersDict;
    }

    forwardMessageToWorker(manageCharacters);
}
