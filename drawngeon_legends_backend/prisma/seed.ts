import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findFirst();
    if(user){
      console.log("database is not empty!");
      return;
    }
    const admin = await prisma.user.create({
      data: {
        email: "admin@drawngeonlegends.com",
        password: "******",
        active: false
      }
    });

    await prisma.enrollment.create({
      data: {
        name: "Drawngeon Legends",
        birthday: dayjs().toDate(),
        userId: admin.id
      }
    });
    
    async function createGame(name: string) {
      return await prisma.game.create({
        data: {
          name,
          level: 1,
          description: "A fascinating adventure.",
          userId: admin.id
        }
      });
    }

    const beholder = await createGame("Beholder's dungeon");
    const driven = await createGame("Driven");

    const options = {1: "op1", 2: "op2"};
    const stageJson = JSON.stringify(
      options
    );

    const initStage = await prisma.stage.create({
      data: {
        name: "Init",
        options: stageJson,
        description: "",
        objects: "",
        refStageId: 0,
        userId: admin.id
      }
    });

    const endStage = await prisma.stage.create({
      data: {
        name: "End",
        options: stageJson,
        description: "",
        objects: "",
        refStageId: 0,
        userId: admin.id
      }
    });

    await prisma.gameStage.createMany({
      data: [
        {gameId: beholder.id, stageId: initStage.id, position: 1},
        {gameId: beholder.id, stageId: endStage.id, position: 2},
        {gameId: driven.id, stageId: initStage.id, position: 1},
        {gameId: driven.id, stageId: endStage.id, position: 2},
      ]
    });

  console.log("DB OK!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
