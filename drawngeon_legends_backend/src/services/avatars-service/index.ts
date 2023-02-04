import { notFoundError, requestError, unauthorizedError } from "@/errors";
import avatarsRepository from "@/repositories/avatar-repository";
import { newAvatarParams, updateAvatarParams } from "@/repositories/avatar-repository";

async function findAvatar(avatarIdIdParams: number) {
  if(isNaN(avatarIdIdParams) || avatarIdIdParams < 1) {
    throw notFoundError();
  }
  const avatar = await avatarsRepository.findAvatar(Math.floor(avatarIdIdParams));
  if(!avatar) {
    throw notFoundError();
  }
  return avatar;
}

async function findMyAvatar(userId: number) {
  const avatar = await avatarsRepository.findAvatarByUserId(userId);
  if(!avatar) {
    throw notFoundError();
  }
  return avatar;
}

async function createAvatar(avatarParams: newAvatarParams) {
  const newAvatar = await avatarsRepository.createAvatar(avatarParams);
  if(!newAvatar) {
    throw requestError(500, "Falha ao criar avatar");
  }
  return newAvatar;
}

async function updateAvatar(avatarParams: updateAvatarParams, userId: number) {
  const avatar = await avatarsRepository.findAvatar(avatarParams.id);
  if(!avatar) {
    throw notFoundError();
  }
  if(avatar.userId !== userId) {
    throw unauthorizedError();
  }
  const updateAvatar = await avatarsRepository.updateAvatar(avatarParams);
  if(!updateAvatar) {
    throw requestError(500, "Falha ao atualizar avatar");
  }
  return updateAvatar;
}

const avatarSevice = {
  findAvatar,
  findMyAvatar,
  createAvatar,
  updateAvatar,
};

export default avatarSevice;
