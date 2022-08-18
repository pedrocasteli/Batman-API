import fs from "fs";
import express from "express";
import morgan from "morgan";
import "dotenv/config";

const app = express();

// 1) Middlewares ################################################################################################

app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const heroes = JSON.parse(fs.readFileSync("./dev-data/data/heroes.json"));

// 2) Route handlers ###############################################################################################3

const getAllHeroes = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: heroes.length,
        data: { heroes: heroes },
    });
};

const getHero = (req, res) => {
    const hero = heroes.find((el) => el.id === req.params.id * 1);

    if (!hero) {
        return res.status(404).json({ status: "fail", message: "Invalid ID" });
    }

    res.status(200).json({
        status: "success",
        data: { hero: hero },
    });
};

const insertNewHero = (req, res) => {
    const newId = heroes[heroes.length - 1].id + 1;
    const newHero = Object.assign({ id: newId }, req.body);

    heroes.push(newHero);

    fs.writeFile("./dev-data/data/heroes.json", JSON.stringify(heroes), (e) => {
        res.status(201).json({ status: "success", data: { hero: newHero } });
    });
};

const updateHero = (req, res) => {
    if (req.params.id * 1 > heroes.length) {
        return res.status(404).json({ status: "fail", message: "Invalid ID" });
    }

    res.status(200).json({
        status: "success",
        data: {
            hero: "<Updated hero here>",
        },
    });
};

const deleteHero = (req, res) => {
    if (req.params.id * 1 > heroes.length) {
        return res.status(404).json({ status: "fail", message: "Invalid ID" });
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
};

const getAllVillains = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

const insertNewVillain = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

const getVillain = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

const updateVillain = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

const deleteVillain = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined",
    });
};

// 3) Routes ##############################################################################################
const heroRouter = express.Router();
const villainRouter = express.Router();

heroRouter.route("/").get(getAllHeroes).post(insertNewHero);
heroRouter.route("/:id").get(getHero).patch(updateHero).delete(deleteHero);

villainRouter.route("/").get(getAllVillains).post(insertNewVillain);
villainRouter
    .route("/:id")
    .get(getVillain)
    .patch(updateVillain)
    .delete(deleteVillain);

app.use("/api/v1/heroes", heroRouter);
app.use("/api/v1/villains", villainRouter);

// 3) Start server ########################################################################################

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
