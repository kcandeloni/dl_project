import { notFoundError, requestError, unauthorizedError } from "@/errors";
import gamesRepository from "@/repositories/game-repository";
import stagesRepository from "@/repositories/stage-repository";
import { newGameParams, updateGameParams, gameStageParams } from "@/repositories/game-repository";
type bodyGameStages = {
  gameStages: gameStageParams
}

async function resumeGames() {
  const listGames = await gamesRepository.getGames();
  return listGames;
}

async function findGameId(gameId: number) {
  if(gameId < 1 || isNaN(gameId)) {
    throw notFoundError();
  }
  const game = await gamesRepository.findGame(gameId);
  if(!game) {
    throw notFoundError();
  }
  return game;
}

async function createGame(gameParams: newGameParams) {
  const newGame = await gamesRepository.createGame(gameParams);
  if(!newGame) {
    throw requestError(500, "Falha ao criar game");
  }
  return newGame;
}

async function updateGame(gameParams: updateGameParams, userId: number) {
  const game = await gamesRepository.findGame(gameParams.id);
  if(!game) {
    throw notFoundError();
  }
  if(game.userId !== userId) {
    throw unauthorizedError();
  }
  const updateGame = await gamesRepository.updateGame(gameParams);
  if(!updateGame) {
    throw requestError(500, "Falha ao atualizar game");
  }
  return updateGame;
}

async function createGameStages(body: bodyGameStages, userId: number) {
  const { gameStages } = body;
  const game = await gamesRepository.findGame(gameStages[0].gameId);
  if(!game) {
    throw notFoundError();
  }
  if(game.userId !== userId) {
    throw unauthorizedError();
  }
  for(let i = 0; i < gameStages.length; i++) {
    const stage = await stagesRepository.findStage(gameStages[i].stageId);
    if(!stage || gameStages[i].gameId !== game.id) {
      throw requestError(500, "Falha ao criar Games Stages");
    }
  }

  const upsertGameStage = await gamesRepository.upsertGameStages(gameStages);
  if(!upsertGameStage) {
    throw requestError(500, "Falha ao criar Games Stages");
  }
  return upsertGameStage;
}

const gameService = {
  resumeGames,
  findGameId,
  createGame,
  updateGame,
  createGameStages,
};

export default gameService;
