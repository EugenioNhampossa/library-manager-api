"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operacoesFuncionario = void 0;
const routes_1 = require("../routes");
const prisma_1 = require("../prisma");
const bcrypt = require('bcrypt');
function operacoesFuncionario() {
    routes_1.routes.post("/funcionario/registrar", async (req, res) => {
        const data = req.body;
        try {
            bcrypt.hash(data.senha, 10, async function (err, hash) {
                const funcionario = await prisma_1.prisma.funcionario.create({
                    data: {
                        nome: data.nome,
                        apelido: data.apelido,
                        nrBI: data.nrBI,
                        nomeUsuario: data.nomeUsuario,
                        senha: hash,
                        permissao: data.permissao
                    }
                });
                return res.status(201).json(funcionario);
            });
        }
        catch (error) {
            return res.status(500);
        }
    });
    routes_1.routes.get("/funcionario/lista", async (req, res) => {
        try {
            const funcionario = await prisma_1.prisma.funcionario.findMany({
                orderBy: {
                    nome: 'asc'
                }
            });
            return res.status(201).json(funcionario);
        }
        catch (error) {
            return res.status(500);
        }
    });
    routes_1.routes.get("/funcionario/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const funcionario = await prisma_1.prisma.funcionario.findUnique({
                where: {
                    id: id
                }
            });
            return res.status(201).json(funcionario);
        }
        catch (error) {
            return res.status(500);
        }
    });
    routes_1.routes.post("/funcionario/user", async (req, res) => {
        const data = req.body;
        try {
            const funcionario = await prisma_1.prisma.funcionario.findUnique({
                where: {
                    nomeUsuario: data.nomeUsuario
                }
            });
            if (funcionario) {
                if (bcrypt.compareSync(data.senha, funcionario.senha)) {
                    return res.status(201).json(funcionario);
                }
                else {
                    return res.json(null);
                }
            }
            return res.json(null);
        }
        catch (error) {
        }
    });
}
exports.operacoesFuncionario = operacoesFuncionario;
