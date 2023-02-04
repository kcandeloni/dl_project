/*
  Warnings:

  - Added the required column `skill` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `GameStage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Skills" AS ENUM ('BERSEKER', 'SHIELD_OF_FAITH', 'CLAIRVOYANCE', 'INVISIBILITY', 'STEALTH');

-- AlterTable
ALTER TABLE "Avatar" ADD COLUMN     "skill" "Skills" NOT NULL;

-- AlterTable
ALTER TABLE "AvatarGame" ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "skill" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "GameStage" ADD COLUMN     "position" INTEGER NOT NULL;
