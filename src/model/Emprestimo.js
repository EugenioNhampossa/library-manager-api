"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operacoesEmprestimo = void 0;
const routes_1 = require("../routes");
const prisma_1 = require("../prisma");
function operacoesEmprestimo() {
    routes_1.routes.post("/emprestimo/registrar", async (req, res) => {
        const data = req.body;
        try {
            const emprestimo = await prisma_1.prisma.emprestimo.create({
                data: {
                    idLivro: data.idLivro,
                    idMembro: data.idMembro,
                    idFuncionario: data.idFuncionario
                }
            });
            actualizarStock("emprestimo", data.idLivro);
            return res.status(201).json(emprestimo);
        }
        catch (error) {
            return res.status(500);
        }
    });
    async function actualizarStock(accao, idLivro) {
        const livro = await prisma_1.prisma.livro.findUnique({
            where: {
                id: idLivro
            }
        });
        let qtyStock = livro.qtyStock;
        if (accao == 'emprestimo') {
            qtyStock = qtyStock - 1;
        }
        else {
            qtyStock = qtyStock + 1;
        }
        await prisma_1.prisma.livro.update({
            where: {
                id: idLivro
            },
            data: {
                qtyStock
            }
        });
    }
    routes_1.routes.get("/emprestimo/lista", async (req, res) => {
        try {
            const getEmprestimos = await prisma_1.prisma.emprestimo.findMany({
                include: {
                    membro: true,
                    funcionario: true,
                    livro: true
                },
                orderBy: {
                    dataEmprestimo: 'desc'
                }
            });
            return res.json(getEmprestimos);
        }
        catch (error) {
            return res.json(null);
        }
    });
    routes_1.routes.get("/emprestimo/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const getEmprestimo = await prisma_1.prisma.emprestimo.findUnique({
                where: {
                    id
                },
                include: {
                    membro: true,
                    funcionario: true,
                    livro: true
                }
            });
            return res.json(getEmprestimo);
        }
        catch (error) {
            return res.json(null);
        }
    });
    routes_1.routes.put("/emprestimo/devolucao/:id", async (req, res) => {
        const id = req.params.id;
        const idLivro = req.body.idLivro;
        try {
            const updateEmprestimo = await prisma_1.prisma.emprestimo.update({
                where: {
                    id: id,
                },
                data: {
                    dataDevolucao: new Date(),
                    devolvido: true,
                },
            });
            actualizarStock("devolucao", idLivro);
            return res.status(201).json(updateEmprestimo);
        }
        catch (error) {
            return res.json(null);
        }
    });
}
exports.operacoesEmprestimo = operacoesEmprestimo;
