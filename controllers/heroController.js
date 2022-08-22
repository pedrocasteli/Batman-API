import Hero from "../models/heroModel.js";

export const getAllHeroes = async (req, res) => {
    try {
        const heroes = await Hero.find();

        res.status(200).json({
            status: "success",
            results: heroes.length,
            data: { heroes: heroes },
        });
    } catch (e) {
        res.status(404).json({ status: "fail", message: e });
    }
};

export const getHero = async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        // Hero.findOne({_id: req.params.id})
        res.status(200).json({
            status: "success",
            data: { hero: hero },
        });
    } catch (e) {
        res.status(404).json({
            status: "fail",
            message: e,
        });
    }
};

export const insertNewHero = async (req, res) => {
    try {
        const newHero = await Hero.create(req.body);

        res.status(201).json({ status: "success", data: { hero: newHero } });
    } catch (e) {
        res.status(400).json({ status: "fail", message: e });
    }
};

export const updateHero = async (req, res) => {
    try {
        const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: {
                hero: hero,
            },
        });
    } catch (e) {
        res.status(400).json({ status: "fail", message: e });
    }
};

export const deleteHero = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null,
    });
};
