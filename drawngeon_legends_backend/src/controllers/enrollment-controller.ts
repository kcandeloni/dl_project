import { Response } from "express";
import httpStatus from "http-status";
import enrollmentService from "@/services/enrollment-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function findEnrollment(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.params.userId);
  try {
    const enrollment = await enrollmentService.findEnrollment(userId);
    return res.status(httpStatus.OK).send(enrollment);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function upsertEnrollment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const enrollment = await enrollmentService.createOrUpdateEnrollment({ ...req.body, userId });
    return res.status(httpStatus.CREATED).send(enrollment);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
