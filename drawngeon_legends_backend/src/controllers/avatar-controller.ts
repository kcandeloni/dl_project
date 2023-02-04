import { Request, Response } from "express";
import httpStatus from "http-status";
import avatarService from "@/services/avatars-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function findAvatar(req: Request, res: Response) {
  const { avatarId } = req.params;
  try {
    const avatar = await avatarService.findAvatar(Number(avatarId));
    return res.status(httpStatus.OK).send(avatar);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function findAvatarByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const avatar = await avatarService.findMyAvatar(Number(userId));
    return res.status(httpStatus.OK).send(avatar);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function newAvatar(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const newAvatar = await avatarService.createAvatar({ ...req.body, userId });
    return res.status(httpStatus.CREATED).send(newAvatar);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updateAvatar(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const avatar = await avatarService.updateAvatar({ ...req.body }, userId);
    return res.status(httpStatus.OK).send(avatar);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
