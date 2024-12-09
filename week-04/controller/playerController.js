import * as playerModel from "../models/playerModel.js";
import { player, setPlayer } from "../app.js";

// 선수 조회
export const lookUp = async (req, res) => {
  try {
    if (!player)
      return res
        .status(404)
        .json({ error: "선수가 한명도 없습니다. 추가해 주세요!" });
    return res.status(200).json({ player });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "서버 오류가 발생하였습니다." });
  }
};

// 선수 생성
export const createUser = async (req, res) => {
  try {
    const { name, speed, shouting } = req.body;

    if (!name || !speed || !shouting)
      return res
        .status(400)
        .json({ error: "name, speed, shouting을 전부 입력해 주세요" });
    if (player[0] && player.filter((i) => i.name === name)[0])
      return res.status(400).json({ error: "이미 존재하는 선수입니다." });
    let value = { name, speed, shouting };
    await playerModel.createUser(player, value);
    return res
      .status(200)
      .json({ message: "성공적으로 선수가 생성되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "서버 오류가 발생하였습니다." });
  }
};

// 선수 업데이트
export const updateUser = async (req, res) => {
  try {
    const { name, speed, shouting } = req.body;

    if (!name || !speed || !shouting)
      return res
        .status(400)
        .json({ error: "name, speed, shouting을 전부 입력해 주세요" });
    if (!player[0] || !player.filter((i) => i.name === name)[0])
      return res.status(400).json({ error: "존재하지 않는 선수입니다." });
    let value = { name, speed, shouting };
    setPlayer(await playerModel.updateUser(player, value));
    return res
      .status(201)
      .json({ message: "성공적으로 선수가 업데이트 되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "서버 오류가 발생하였습니다." });
  }
};

// 선수 삭제
export const deleteUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!player[0] || !player.filter((i) => i.name === name)[0])
      return res.status(400).json({ error: "존재하지 않는 선수입니다." });

    setPlayer(await playerModel.deleteUser(player, name));
    return res
      .status(200)
      .json({ message: "성공적으로 선수가 삭제되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "서버 오류가 발생하였습니다." });
  }
};

