import express from "express";
import PlayerRouter from "./routers/player.js";

const app = express();
const PORT = 3030;

app.use(express.json());

app.use("/player", PlayerRouter);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버 열림");
});
