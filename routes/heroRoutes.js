import express from "express";

import {
    getAllHeroes,
    insertNewHero,
    getHero,
    updateHero,
    deleteHero,
} from "../controllers/heroController.js";

const router = express.Router();

router.route("/").get(getAllHeroes).post(insertNewHero);
router.route("/:id").get(getHero).patch(updateHero).delete(deleteHero);

export default router;
