"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_repository_1 = __importDefault(require("../../repositories/game-repository"));
async function resumeGames() {
    const user = await game_repository_1.default.insertUser();
    console.log(user);
    await game_repository_1.default.insertGame(user.id);
    const listGames = await game_repository_1.default.getGames();
    return listGames;
}
const gameService = {
    resumeGames,
};
exports.default = gameService;
