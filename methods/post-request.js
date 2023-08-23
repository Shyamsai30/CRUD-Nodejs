const requestBodyParser = require("../utils/body-parser");
const crypto = require("crypto");
const writeToFile = require("../utils/write-to-file");
module.exports = async (req, res) => {
    if (req.url === "/api/movies") {
        try {
            let body = await requestBodyParser(req);
            body.id = crypto.randomUUID();
            req.movies.push(body);
            writeToFile(req.movies);
            res.writeHead(201, { "Content-Type": "application/json" })
            res.end()
        } catch (err) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Request Body is not valid", message: "Not Valid" }))
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Route Not valid", message: "Route Not Valid" }))
    }
}