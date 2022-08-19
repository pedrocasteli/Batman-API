import Hero from "../models/heroModel.js";

export const getAllHeroes = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        // results: heroes.length,
        // data: { heroes: heroes },
    });
};

export const getHero = (req, res) => {
    res.status(200).json({
        status: "success",
    });
};

export const insertNewHero = async (req, res) => {
    try {
        const newHero = await Hero.create(req.body);

        res.status(201).json({ status: "success", data: { hero: newHero } });
    } catch (e) {
        res.status(400).json({ status: "fail", message: e });
    }
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
