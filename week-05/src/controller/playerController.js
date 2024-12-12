import * as playerModel from "../models/playerModel.js";

// 선수 조회
export const lookUp = async (req, res) => {
  try {
    const player = await playerModel.lookUp();
    if (player.length === 0)
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
export const createPlayer = async (req, res) => {
  try {
    const { name, speed, shooting } = req.body;

    if (!name || !speed || !shooting)
      return res
        .status(400)
        .json({ error: "name, speed, shooting을 전부 입력해 주세요" });
    if (await playerModel.findPlayer(name))
      return res.status(400).json({ error: "이미 존재하는 선수입니다." });
    let value = { name, speed, shooting };
    await playerModel.createPlayer(value);
    return res
      .status(200)
      .json({ message: "성공적으로 선수가 생성되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "서버 오류가 발생하였습니다." });
  }
};

// 선수 업데이트
export const updatePlayer = async (req, res) => {
  try {
    const { name, speed, shooting } = req.body;

    if (!name || !speed || !shooting)
      return res
        .status(400)
        .json({ error: "name, speed, shooting을 전부 입력해 주세요" });
    if (!(await playerModel.findPlayer(name)))
      return res.status(400).json({ error: "존재하지 않는 선수입니다." });
    let value = { name, speed, shooting };
    await playerModel.updatePlayer(value);
    return res
      .status(201)
      .json({ message: "성공적으로 선수가 업데이트 되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "서버 오류가 발생하였습니다." });
  }
};

// 선수 삭제
export const deletePlayer = async (req, res) => {
  try {
    const { name } = req.body;
    if (!(await playerModel.findPlayer(name)))
      return res.status(400).json({ error: "존재하지 않는 선수입니다." });

    await playerModel.deletePlayer(name);
    return res
      .status(200)
      .json({ message: "성공적으로 선수가 삭제되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "서버 오류가 발생하였습니다." });
  }
};
