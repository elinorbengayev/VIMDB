import {parentPort} from "worker_threads";
import logger from "../logging/logger.js";


export function handleResult(worker, res) {
    worker.on("message", (result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
        worker.terminate();
        logger.info("Request processed successfully");
    });

    worker.on("error", (err) => {
        logger.error("Worker error:", err);
        res.writeHead(500);
        res.end("Internal Server Error");
    });
}

export function forwardMessageToWorker(processFunction) {
    processFunction()
        .then((message) => {
            parentPort.postMessage(message); // Send the result back to the main thread
        })
        .catch((error) => {
            logger.error(error);
            parentPort.postMessage({ error: error.message }); // Send error message to the main thread
        });

}

// get attribute value from object safely
export function getValue(obj, key, defaultValue = null) {
    return obj.hasOwnProperty(key) ? obj[key] : defaultValue;
}

