"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operacoesLivro = void 0;
const routes_1 = require("../routes");
const prisma_1 = require("../prisma");
function operacoesLivro() {
    routes_1.routes.post("/livro/registrar", async (req, res) => {
        const data = req.body;
        try {
            const livro = await prisma_1.prisma.livro.create({
                data: {
                    titulo: data.titulo,
                    autor: data.autor,
                    local: data.local,
                    editora: data.editora,
                    ano: data.ano,
                    edicao: data.edicao,
                    volume: data.volume,
                    nrPaginas: data.nrPaginas,
                    observacoes: data.observacoes,
                    qtyStock: data.qtyStock,
                }
            });
            return res.status(201).json(livro);
        }
        catch (error) {
            return res.status(500);
        }
    });
    routes_1.routes.get("/livro/lista", async (req, res) => {
        try {
            const getLivros = await prisma_1.prisma.livro.findMany({
                orderBy: {
                    titulo: 'asc'
                }
            });
            return res.json(getLivros);
        }
        catch (error) {
            return res.statusCode;
        }
    });
    routes_1.routes.get("/livro/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const getLivros = await prisma_1.prisma.livro.findUnique({
                where: {
                    id: id
                }
            });
            return res.json(getLivros);
        }
        catch (error) {
            return res.statusCode;
        }
    });
}
exports.operacoesLivro = operacoesLivro;
