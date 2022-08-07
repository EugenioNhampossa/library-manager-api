"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operacoesMembro = void 0;
const routes_1 = require("../routes");
const prisma_1 = require("../prisma");
function operacoesMembro() {
    routes_1.routes.post("/membro/registrar", async (req, res) => {
        const data = req.body;
        console.log(data);
        try {
            const membro = await prisma_1.prisma.membro.create({
                data: {
                    nome: data.nome,
                    apelido: data.apelido,
                    nrBI: data.nrBI,
                    eDocente: data.eDocente,
                }
            });
            return res.status(201).json(membro);
        }
        catch (error) {
            return res.status(500);
        }
    });
    routes_1.routes.get("/membro/lista", async (req, res) => {
        console.log(req);
        try {
            const getMembros = await prisma_1.prisma.membro.findMany({
                orderBy: {
                    nome: 'asc'
                }
            });
            return res.json(getMembros);
        }
        catch (error) {
            return res.statusCode;
        }
    });
    routes_1.routes.get("/membro/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const getMembro = await prisma_1.prisma.membro.findUnique({
                where: {
                    id: id
                }
            });
            return res.json(getMembro);
        }
        catch (error) {
            return res.statusCode;
        }
    });
}
exports.operacoesMembro = operacoesMembro;
