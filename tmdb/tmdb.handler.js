import axios from 'axios';
import {getMovieByIdURL} from './urls.js';
import {apiKey} from '../config.js';
import {getValue} from "../utils/utils.js";
import logger from "../logging/logger.js";

async function getMovieById(movieId) {
    const options = {
        method: 'GET',
        url: getMovieByIdURL(movieId),
        headers: {
            accept: 'application/json',
        },
        params: {
            api_key: apiKey,
        },
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        logger.error('Error:', error);
        throw error;
    }
}

async function getMovieCast(movieID) {
    const data = await getMovieById(movieID);
    return getValue(data, "cast", []);
}

export async function actorCharacterInMovie(movieID, actor) {
    try {

        const foundActor = (await getMovieCast(movieID)).find(c => c.name === actor);

        if (foundActor) {
            return getValue(foundActor, "character")
        } else {
            return undefined; // Return undefined if actor not found
        }
    } catch (error) {
        logger.error('Fetch error:', error);
        return undefined; // Return undefined on error
    }
}
export async function isActorInMovie(movieID, actor) {
    try {
        const character = await actorCharacterInMovie(movieID, actor);
        return !!character;
    } catch (error) {
        logger.error('Fetch error:', error);
        return false;
    }
}

export async function CharactersActorsMapping(movieName, movieID) {
    try {
        const cast = await getMovieCast(movieID);
        const charactersActors = {};

        for (const actor of cast) {
            if (!charactersActors[actor["character"]]) {
                charactersActors[actor["character"]] = [{"movieName": movieName, "actorName": actor["name"]}];
            } else {
                charactersActors[actor["character"]].push({"movieName": movieName, "actorName": actor["name"]});
            }
        }
        return charactersActors;
    } catch (error) {
        logger.error('Fetch error:', error);
        return undefined;
    }
}


