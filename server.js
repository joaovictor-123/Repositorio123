import express from "express";
import routes from "./src/routes/postsRouts.js"
// Importa o framework Express para criar a aplicação web

const app = express();
// Cria uma instância do Express, que será nossa aplicação web
app.use(express.static("uploads"))
routes(app)

app.listen(3000, () => {
  console.log("Servidor escutando...");
});
// Inicia o servidor na porta 3000 e mostra uma mensagem no console quando o servidor estiver pronto