import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "@/config";

import {
  gamesRouter,
  usersRouter,
  authenticationRouter,
  stagesRouter,
  avatarRouter,
  enrollmentRouter,
} from "@/routers";

loadEnv();

import { handleApplicationErrors } from "@/middlewares";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/status", (_req, res) => res.send("d20.roll() = 20!"))
  .use("/games", gamesRouter)
  .use("/users", usersRouter)
  .use("/auth", authenticationRouter)
  .use("/stages", stagesRouter)
  .use("/avatars", avatarRouter)
  .use("/enrollment", enrollmentRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
