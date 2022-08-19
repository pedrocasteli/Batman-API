import express from "express";

import {
    getAllHeroes,
    insertNewHero,
    getHero,
    updateHero,
    deleteHero,
    checkID,
    checkBody,
} from "../controllers/heroController.js";

const router = express.Router();

router.param("id", checkID);

router.route("/").get(getAllHeroes).post(checkBody, insertNewHero);
router.route("/:id").get(getHero).patch(updateHero).delete(deleteHero);

export default router;
