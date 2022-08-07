"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const Emprestimo_1 = require("./model/Emprestimo");
const Funcionario_1 = require("./model/Funcionario");
const Livro_1 = require("./model/Livro");
const Membro_1 = require("./model/Membro");
exports.routes = express_1.default.Router();
(0, Livro_1.operacoesLivro)();
(0, Membro_1.operacoesMembro)();
(0, Funcionario_1.operacoesFuncionario)();
(0, Emprestimo_1.operacoesEmprestimo)();
