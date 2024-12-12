import { prisma } from "../uts/prisma/index.js";

export const lookUp = async () => {
  return await prisma.players.findMany({
    select: {
      name: true,
      speed: true,
      shooting: true,
    },
  });
};

// 선수 유무
export const findPlayer = async (value) => {
  return await prisma.players.findUnique({
    where: {
      name: value,
    }
  });
};

// 선수 생성
export const createPlayer = async (value) => {
  await prisma.players.create({
    data: {
      name: value.name,
      speed: value.speed,
      shooting: value.shooting,
    },
  });
};

// 선수 업데이트
export const updatePlayer = async (value) => {
  await prisma.players.update({
    where: {
      name: value.name,
    },
    data: {
      speed: value.speed,
      shooting: value.shooting,
    },
  });
};

// 선수 삭제
export const deletePlayer = async (value) => {
  await prisma.players.delete({
    where: {
      name: value,
    },
  });
};
