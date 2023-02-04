import { Router } from "express";
import { findEnrollment, upsertEnrollment } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { enrollmentSchema } from "@/schemas";

const enrollmentRouter = Router();

enrollmentRouter
  .all("/*", authenticateToken)
  .get("/:userId", findEnrollment)
  .post("/upsert", validateBody(enrollmentSchema), upsertEnrollment);
export { enrollmentRouter };
