import { prisma } from "@/config";
import { Stage } from "@prisma/client";

export type newStageParams = Omit<Stage, "createdAt" | "updatedAt" | "id">;
export type updateStageParams = Omit<Stage, "createdAt" | "updatedAt" | "userId">;

async function getStages() {
  return prisma.stage.findMany({});
}

async function findStage(stageId: number) {
  return prisma.stage.findFirst({
    where: {
      id: stageId
    }
  });
}

async function createStage(paramsStage: newStageParams) {
  return prisma.stage.create({
    data: paramsStage
  });
}

async function updateStage(paramsUpdate: updateStageParams) {
  return prisma.stage.update({
    where: {
      id: paramsUpdate.id,
    },
    data: paramsUpdate
  });
}

const stagesRepository = {
  getStages,
  findStage,
  createStage,
  updateStage,
};

export default stagesRepository;
