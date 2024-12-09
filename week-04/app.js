import express from "express";
import PlayerRouter from "./routers/player.js";

const app = express();
const PORT = 3030;

export let player = [];

// player에 let을 썼는데, 다른파일에서 가져올 때 계속 TypeError: Assignment to constant variable. 오류가 떠서 찾아보니
// ESM에서는 가져온거 재할당 안된다고 해서, 찾아보니까 함수로 가능하다 해서 넣은거!!
// player값 재할당을 위해 사용!!
export function setPlayer(data) {
  player = data;
}

app.use(express.json());

app.use("/player", PlayerRouter);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버 열림");
});
