-- CreateTable
CREATE TABLE "Livro" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "idAutor" TEXT NOT NULL,
    "local" TEXT,
    "idEditora" TEXT NOT NULL,
    "idCategoria" TEXT NOT NULL,
    "ano" INTEGER,
    "edicao" INTEGER,
    "volume" INTEGER,
    "nrPaginas" INTEGER NOT NULL,
    "observacoes" TEXT NOT NULL,
    "dataRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nrCopias" INTEGER NOT NULL,
    CONSTRAINT "Livro_idEditora_fkey" FOREIGN KEY ("idEditora") REFERENCES "Editora" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Livro_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Livro_idAutor_fkey" FOREIGN KEY ("idAutor") REFERENCES "Autor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Autor" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "dataNasc" DATETIME
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Editora" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "telefone" TEXT
);

-- CreateTable
CREATE TABLE "Multa" (
    "id" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL,
    "dataPag" DATETIME
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "nrBI" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    CONSTRAINT "Funcionario_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "funcao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Aquisicao" (
    "id" TEXT NOT NULL,
    "idFuncionario" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "nrCopias" INTEGER NOT NULL,
    "dataAquisicao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Aquisicao_idFuncionario_fkey" FOREIGN KEY ("idFuncionario") REFERENCES "Funcionario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Aquisicao_idLivro_fkey" FOREIGN KEY ("idLivro") REFERENCES "Livro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Membro" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "nrBI" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    CONSTRAINT "Membro_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" TEXT NOT NULL,
    "idLivro" TEXT NOT NULL,
    "idMembro" TEXT NOT NULL,
    "idFuncEmp" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" DATETIME NOT NULL,
    "dataDevolucao" DATETIME,
    "idFuncDev" TEXT,
    "idMulta" TEXT,
    "devolvido" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Emprestimo_idFuncEmp_fkey" FOREIGN KEY ("idFuncEmp") REFERENCES "Funcionario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_idMulta_fkey" FOREIGN KEY ("idMulta") REFERENCES "Multa" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_idLivro_fkey" FOREIGN KEY ("idLivro") REFERENCES "Livro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Emprestimo_idMembro_fkey" FOREIGN KEY ("idMembro") REFERENCES "Membro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Livro_id_key" ON "Livro"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Autor_id_key" ON "Autor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_titulo_key" ON "Categoria"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_id_key" ON "Categoria"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Editora_nome_key" ON "Editora"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Editora_id_key" ON "Editora"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Multa_id_key" ON "Multa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_nrBI_key" ON "Funcionario"("nrBI");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_id_key" ON "Funcionario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nomeUsuario_key" ON "Usuario"("nomeUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_key" ON "Usuario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Aquisicao_id_key" ON "Aquisicao"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Membro_nrBI_key" ON "Membro"("nrBI");

-- CreateIndex
CREATE UNIQUE INDEX "Membro_id_key" ON "Membro"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Emprestimo_id_key" ON "Emprestimo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Emprestimo_id_idLivro_key" ON "Emprestimo"("id", "idLivro");
