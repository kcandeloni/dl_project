import { notFoundError, requestError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { enrollmentParams } from "@/repositories/enrollment-repository";

async function findEnrollment(userId: number) {
  if(isNaN(userId) || userId < 1) {
    throw notFoundError;
  }
  const enrollment = await enrollmentRepository.findByUserId(Math.floor(userId));
  if(!enrollment) {
    throw notFoundError();
  }
  return enrollment;
}

async function createOrUpdateEnrollment(data: enrollmentParams) {
  const upsertEnrollment = await enrollmentRepository.upsertEnrollment({ ...data });
  if(!upsertEnrollment) {
    throw requestError(500, "Falha ao inserir dados.");
  }
  return upsertEnrollment;
}

const enrollmentService = {
  findEnrollment,
  createOrUpdateEnrollment,
};

export default enrollmentService;
