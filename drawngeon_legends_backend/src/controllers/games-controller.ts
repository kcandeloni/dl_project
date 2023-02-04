import { Request, Response } from "express";
import httpStatus from "http-status";
import gameService from "@/services/games-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function listGames(req: Request, res: Response) {
  try {
    const listGames = await gameService.resumeGames();
    return res.status(httpStatus.OK).send(listGames);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function findGameId(req: Request, res: Response) {
  const gameId = Number(req.params.gameId);
  try {
    const game = await gameService.findGameId(gameId);
    return res.status(httpStatus.OK).send(game);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function newGame(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const game = await gameService.createGame({ ...req.body, userId });
    return res.status(httpStatus.CREATED).send(game);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updateGame(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const game = await gameService.updateGame({ ...req.body }, userId);
    return res.status(httpStatus.OK).send(game);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updateGameStage(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const gameStages = await gameService.createGameStages(req.body, userId);
    return res.status(httpStatus.OK).send(gameStages);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
