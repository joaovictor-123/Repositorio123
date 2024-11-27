import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o módulo Multer para lidar com uploads de arquivos

// Importa funções controladoras para posts vindas de um arquivo externo (postsController.js)
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({ // Configura o armazenamento de arquivos
  destination: function (req, file, cb) { // Define o diretório de destino para os uploads
    cb(null, 'uploads/'); // Define o caminho para a pasta 'uploads'
  },
  filename: function (req, file, cb) { // Define o nome do arquivo
    cb(null, file.originalname); // Mantém o nome original do arquivo
  }
});

const upload = multer({dest: "./uploads", storage}); // Cria uma instância do Multer com o armazenamento configurado
// Comente a linha anterior se estiver usando Linux ou Mac (já definido no storage)
//const upload = multer({dest: "./uploads"}) // Opcional para Linux/Mac: define o diretório padrão de uploads

const routes = (app) => { // Função para definir as rotas da aplicação

  app.use(express.json()); // Habilita o middleware para analisar o corpo das requisições JSON
  app.use(cors(corsOptions))
  app.get("/posts", listarPosts); // Rota para listar todos os posts (usa a função listarPosts do controlador)

  app.post("/posts", postarNovoPost); // Rota para criar um novo post (usa a função postarNovoPost do controlador)

  app.post("/upload", upload.single("imagem"), uploadImagem); // Rota para upload de imagem (usa o middleware multer e a função uploadImagem do controlador)

  app.put("/upload/:id", atualizarNovoPost)
}

export default routes; // Exporta a função routes para ser utilizada no arquivo principal da aplicação