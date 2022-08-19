import express from "express";

import {
    getAllVillains,
    insertNewVillain,
    getVillain,
    updateVillain,
    deleteVillain,
} from "../controllers/villainController.js";

const router = express.Router();

router.route("/").get(getAllVillains).post(insertNewVillain);
router.route("/:id").get(getVillain).patch(updateVillain).delete(deleteVillain);

export default router;
