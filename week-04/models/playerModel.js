// 선수 조회
export const lookUp = async (playerData) => {
  return playerData.map((i) => i);
};

// 선수 생성
export const createUser = async (playerData, value) => {
  playerData.push(value);
};

// 선수 업데이트
export const updateUser = async (playerData, value) => {
  return playerData.map((i) => {
    if (i.name === value.name) return value;
    return i;
  });
};

// 선수 삭제
export const deleteUser = async (playerData, value) => {
  return playerData.filter(i => i.name !== value)
};
