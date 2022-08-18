import fs from "fs";
import express from "express";
import "dotenv/config";

const app = express();

// This is called a MIDDLEWARE, because it goes BETWEEN the request and the response. This middleware in particular, adds the body data to the request object.
app.use(express.json());

// app.get("/", (req, res) => {
//     res.status(200).json({
//         status: "success",
//         message: "You can GET to this endpoint...",
//         app: "Batman-API",
//     });
// });

// app.post("/", (req, res) => {
//     res.status(200).json({
//         status: "success",
//         message: "You can POST to this endpoint...",
//         app: "Batman-API",
//     });
// });

const heroes = JSON.parse(fs.readFileSync("./dev-data/data/heroes.json"));

// This callback function is called a ROUTE HANDLER
app.get("/api/v1/heroes", (req, res) => {
    res.status(200).json({
        status: "success",
        results: heroes.length,
        data: { heroes: heroes },
    });
});

app.post("/api/v1/heroes", (req, res) => {
    const newId = heroes[heroes.length - 1].id + 1;
    const newHero = Object.assign({ id: newId }, req.body);

    heroes.push(newHero);

    fs.writeFile("./dev-data/data/heroes.json", JSON.stringify(heroes), (e) => {
        res.status(201).json({ status: "success", data: { hero: newHero } });
    });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
