import express from "express";
import * as controller from "../controller/playerController.js";

const router = express.Router();

router.get("/", controller.lookUp);

router.post("/create", controller.createUser);

router.patch("/update", controller.updateUser);

router.delete("/delete", controller.deleteUser);

export default router;