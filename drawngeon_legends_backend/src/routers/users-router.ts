import { Router } from "express";

import { newUserSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { usersPost } from "@/controllers";

const usersRouter = Router();

usersRouter.post("/", validateBody(newUserSchema), usersPost);

export { usersRouter };
