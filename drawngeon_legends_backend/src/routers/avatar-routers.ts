import { Router } from "express";
import { findAvatar, findAvatarByUserId, newAvatar, updateAvatar } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { newAvatarSchema, updateAvatarSchema } from "@/schemas";

const avatarRouter = Router();

avatarRouter
  .get("/:avatarId", findAvatar)
  .all("/*", authenticateToken)
  .get("/", findAvatarByUserId)
  .post("/create", validateBody(newAvatarSchema), newAvatar)
  .post("/update", validateBody(updateAvatarSchema), updateAvatar);

export { avatarRouter };
