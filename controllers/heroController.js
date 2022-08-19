import fs from "fs";

const heroes = JSON.parse(fs.readFileSync("./dev-data/data/heroes.json"));

export const checkID = (req, res, next, val) => {
    console.log(`==> Hero ID: ${val}`);
    if (req.params.id * 1 > heroes.length) {
        return res.status(404).json({ status: "fail", message: "Invalid ID" });
    }
    next();
};

export const getAllHeroes = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: heroes.length,
        data: { heroes: heroes },
    });
};

export const getHero = (req, res) => {
    const hero = heroes.find((el) => el.id === req.params.id * 1);

    res.status(200).json({
        status: "success",
        data: { hero: hero },
    });
};

export const insertNewHero = (req, res) => {
    const newId = heroes[heroes.length - 1].id + 1;
    const newHero = Object.assign({ id: newId }, req.body);

    heroes.push(newHero);

    fs.writeFile("./dev-data/data/heroes.json", JSON.stringify(heroes), (e) => {
        res.status(201).json({ status: "success", data: { hero: newHero } });
    });
};

export const updateHero = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            hero: "<Updated hero here>",
        },
    });
};

export const deleteHero = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null,
    });
};
