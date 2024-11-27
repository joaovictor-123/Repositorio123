import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO

export async function getTodosPosts() {
    // Função assíncrona para obter todos os posts do banco de dados
    const db = conexao.db("imersao-instabyte");
    // Seleciona o banco de dados "imersao-instabyte"
    const colecao = db.collection("posts");
    // Seleciona a coleção "posts" dentro do banco de dados
    return colecao.find().toArray();
    // Retorna um array com todos os documentos da coleção
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabyte");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
}