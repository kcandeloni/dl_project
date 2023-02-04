import { Request, Response } from "express";
import httpStatus from "http-status";
import stageService from "@/services/stages-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function listStages(req: Request, res: Response) {
  try {
    const listStages = await stageService.resumeStages();
    return res.status(httpStatus.OK).send(listStages);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function findStageId(req: Request, res: Response) {
  const stageId = Number(req.params.stageId);
  try {
    const stage = await stageService.findStageId(stageId);
    return res.status(httpStatus.OK).send(stage);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function newStage(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const stage = await stageService.createStage({ ...req.body, userId });
    return res.status(httpStatus.CREATED).send(stage);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updateStage(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const stage = await stageService.updateStage({ ...req.body }, userId);
    return res.status(httpStatus.OK).send(stage);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
