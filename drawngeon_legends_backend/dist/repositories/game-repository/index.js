"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
async function getGames() {
    return config_1.prisma.game.findMany({});
}
async function insertUser() {
    return config_1.prisma.user.create({
        data: {
            email: "kcandeloni@gmail.com",
            password: "123"
        }
    });
}
async function insertGame(userId) {
    return config_1.prisma.game.create({
        data: {
            name: "Masmorra Driven",
            level: 1,
            description: "",
            userId
        }
    });
}
const gamesRepository = {
    getGames,
    insertUser,
    insertGame,
};
exports.default = gamesRepository;
