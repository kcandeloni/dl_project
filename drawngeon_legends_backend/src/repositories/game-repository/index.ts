import { prisma } from "@/config";
import { Game, GameStage } from "@prisma/client";

export type newGameParams = Omit<Game, "createdAt" | "updatedAt" | "id">;
export type updateGameParams = Omit<Game, "createdAt" | "updatedAt" | "userId">;
export type gameStageParams = Array<Omit<GameStage, "createdAt" | "updatedAt" | "id">>;

async function getGames() {
  return prisma.game.findMany({});
}

async function findGame(gameId: number) {
  return prisma.game.findFirst({
    where: {
      id: gameId
    },
    include: {
      GameStage: {
        include: {
          Stage: true,
        },
      }
    }
  });
}

async function createGame(paramsGame: newGameParams) {
  return prisma.game.create({
    data: paramsGame
  });
}

async function updateGame(paramsUpdate: updateGameParams) {
  return prisma.game.update({
    where: {
      id: paramsUpdate.id,
    },
    data: paramsUpdate
  });
}

async function upsertGameStages(gameStages: gameStageParams) {
  return prisma.$transaction(
    async (prisma) => {
      await prisma.gameStage.deleteMany({
        where: {
          gameId: gameStages[0].gameId
        }
      });

      return prisma.gameStage.createMany({
        data: gameStages
      });
    });
}

async function findUseGameStagebyStageId(stageId: number) {
  return prisma.gameStage.findFirst({
    where: {
      stageId
    }
  });
}

const gamesRepository = {
  getGames,
  findGame,
  createGame,
  updateGame,
  upsertGameStages,
  findUseGameStagebyStageId,
};

export default gamesRepository;
