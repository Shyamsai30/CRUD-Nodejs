const requestBodyParser = require("../utils/body-parser");
const crypto = require("crypto");
const writeToFile = require("../utils/write-to-file");
module.exports = async (req, res) => {
    let id = req.url.split("/")[3];
    if (id.length > 0) {
        try {
            let body = await requestBodyParser(req);
            const index = req.movies.findIndex((movie) => {
                return movie.imdbID === id;
            })
            if (index == -1) {
                res.statusCode = 404;
                res.write(JSON.stringify({ title: "Movie Not Found", message: "Movie not found" }));
                res.end();
            } else {
                req.movies[index] = { id, ...body };
                writeToFile(req.movies);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(Json.stringify(req.movies[index]));
            }
        } catch (err) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Request Body is not valid", message: "Not Valid" }))
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Route Not valid", message: "Route Not Valid" }))
    }
}