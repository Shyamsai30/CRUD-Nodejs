const writeToFile = require("../utils/write-to-file")
module.exports = (req, res) => {
    let id = req.url.split("/")[3];
    if (id.length > 0) {
        const index = req.movies.findIndex((movie) => {
            return movie.imdbID === id;
        })
        if (index == -1) {
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Movie Not Found", message: "Movie not found" }));
            res.end();
        } else {
            req.movies.splice(index, 1);
            writeToFile(req.movies);
            res.writeHead(204, { "Content-Type": "application/json" })
            res.end(JSON.stringify(req.movies));
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Route Not valid", message: "Route Not Valid" }))
    }
}