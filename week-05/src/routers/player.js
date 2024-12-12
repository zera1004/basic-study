import express from "express";
import * as controller from "../controller/playerController.js";

const router = express.Router();

router.get("/", controller.lookUp);

router.post("/create", controller.createPlayer);

router.patch("/update", controller.updatePlayer);

router.delete("/delete", controller.deletePlayer);

export default router;