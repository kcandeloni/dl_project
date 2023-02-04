import { Router } from "express";
import { listStages, findStageId, newStage, updateStage } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { newStageSchema, updateStageSchema } from "@/schemas";

const stagesRouter = Router();

stagesRouter
  .get("/resume", listStages)
  .all("/*", authenticateToken)
  .get("/:stageId", findStageId)
  .post("/create", validateBody(newStageSchema), newStage)
  .post("/update", validateBody(updateStageSchema), updateStage);

export { stagesRouter };
