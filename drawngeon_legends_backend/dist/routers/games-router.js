"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const gamesRouter = (0, express_1.Router)();
exports.gamesRouter = gamesRouter;
gamesRouter
    .get("/resume", controllers_1.listGames);
