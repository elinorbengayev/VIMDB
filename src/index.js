import cluster from 'cluster';
import http from 'http';
import {handleMoviesPerActorRequest} from '../controllers/moviesPerActor.controller.js';
import {handleCharactersWithMultipleActorsRequest} from '../controllers/charactersWithMultipleActors.controller.js';
import {handleActorsWithMultipleCharactersRequest} from '../controllers/actorsWithMultipleCharacters.controller.js';
import {cpus} from 'os';
import logger from "../logging/logger.js";
import {port} from "../config.js";

let PORT = port;


if (cluster.isPrimary) {
    // Fork workers for each CPU
    for (let i = 0; i < cpus().length; i++) {
        cluster.fork();
    }

    logger.info(`Server started on port ${PORT}`);

    cluster.on('exit', (worker) => {
        logger.info(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    function app(req, res) {
        if (req.url === "/moviesPerActor") {
            logger.info("Processing Movies per Actor Request");
            handleMoviesPerActorRequest(res);
        } else if (req.url === "/actorsWithMultipleCharacters") {
            logger.info("Processing Actors with Multiple Characters Request");
            handleActorsWithMultipleCharactersRequest(res);
        } else if (req.url === "/charactersWithMultipleActors") {
            logger.info("Processing Characters with Multiple Actors Request");
            handleCharactersWithMultipleActorsRequest(res);
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end(`Page not found`);
        }
    }

    http.createServer(app).listen(PORT, () => {
        logger.debug(`Worker ${process.pid} started on port ${PORT}`);
    });
}