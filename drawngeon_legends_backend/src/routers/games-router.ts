import { Router } from "express";
import { listGames, findGameId, newGame, updateGame, updateGameStage } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { newGameSchema, updateGameSchema, arrayGameStages } from "@/schemas";

const gamesRouter = Router();

gamesRouter
  .get("/resume", listGames)
  .all("/*", authenticateToken)
  .get("/:gameId", findGameId)
  .post("/create", validateBody(newGameSchema), newGame)
  .post("/update", validateBody(updateGameSchema), updateGame)
  .post("/stages/update", validateBody(arrayGameStages), updateGameStage);

export { gamesRouter };
