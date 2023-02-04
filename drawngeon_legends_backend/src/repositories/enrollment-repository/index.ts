import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";

export type enrollmentParams = Omit<Enrollment, "createdAt" | "updatedAt" | "id">;

async function upsertEnrollment({ name, birthday, userId }: enrollmentParams) {
  return prisma.enrollment.upsert({
    where: {
      userId
    },
    create: {
      name,
      birthday,
      userId,
    },
    update: {
      name,
      birthday
    }
  });
}

async function findByUserId(userId: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId
    }
  });
}

const enrollmentRepository = {
  upsertEnrollment,
  findByUserId,
};

export default enrollmentRepository;
