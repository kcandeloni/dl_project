import { notFoundError, requestError, unauthorizedError } from "@/errors";
import stagesRepository from "@/repositories/stage-repository";
import gamesRepository from "@/repositories/game-repository";
import { newStageParams, updateStageParams } from "@/repositories/stage-repository"; 

async function resumeStages() {
  const listStages = await stagesRepository.getStages();
  return listStages;
}

async function findStageId(stageId: number) {
  if(stageId < 1 || isNaN(stageId)) {
    throw notFoundError();
  }
  const stage = await stagesRepository.findStage(stageId);
  if(!stage) {
    throw notFoundError();
  }
  return stage;
}

async function createStage(stageParams: newStageParams) {
  const { refStageId } = stageParams;
  const refStage =  await stagesRepository.findStage(refStageId);
  if(!refStage && refStageId !== 0) {
    throw notFoundError();
  }
  const newStage = await stagesRepository.createStage(stageParams);
  if(!newStage) {
    throw requestError(500, "Falha ao criar stage");
  }
  return newStage;
}

async function updateStage(stageParams: updateStageParams, userId: number) {
  const stage = await stagesRepository.findStage(stageParams.id);
  if(!stage) {
    throw notFoundError();
  }
  if(stage.userId !== userId) {
    throw unauthorizedError();
  }
  const stageBeingUsed = await gamesRepository.findUseGameStagebyStageId(stageParams.id);
  if(stageBeingUsed?.id) {
    throw unauthorizedError();
  }
  const updateStage = await stagesRepository.updateStage(stageParams);
  if(!updateStage) {
    throw requestError(500, "Falha ao atualizar stage");
  }
  return updateStage;
}

const stageService = {
  resumeStages,
  findStageId,
  createStage,
  updateStage,
};

export default stageService;
