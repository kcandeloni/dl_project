import { prisma } from "@/config";
import { Avatar } from "@prisma/client";

export type newAvatarParams = Omit<Avatar, "createdAt" | "updatedAt" | "id">;
export type updateAvatarParams = Omit<Avatar, "createdAt" | "updatedAt" | "userId">;

async function findAvatar(avatarId: number) {
  return prisma.avatar.findFirst({
    where: {
      id: avatarId
    },
    include: {
      EquipItem: true,
      AvatarGame: true,
    }
  });
}

async function findAvatarByUserId(userId: number) {
  return prisma.avatar.findFirst({
    where: {
      userId
    },
    include: {
      EquipItem: true,
      AvatarGame: true,
    }
  });
}

async function createAvatar(paramsAvatar: newAvatarParams) {
  return prisma.avatar.create({
    data: paramsAvatar
  });
}

async function updateAvatar(paramsUpdate: updateAvatarParams) {
  return prisma.avatar.update({
    where: {
      id: paramsUpdate.id,
    },
    data: paramsUpdate
  });
}

const avatarsRepository = {
  findAvatar,
  findAvatarByUserId,
  createAvatar,
  updateAvatar,
};

export default avatarsRepository;
