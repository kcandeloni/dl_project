"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listGames = void 0;
const http_status_1 = __importDefault(require("http-status"));
const games_service_1 = __importDefault(require("../service/games-service"));
async function listGames(req, res) {
    try {
        const listGames = await games_service_1.default.resumeGames();
        return res.status(http_status_1.default.OK).send(listGames);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.listGames = listGames;
