import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/dbmongodb.js';

import bcrypt from 'bcryptjs';



dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.CORS_ORIGIN, //|| 'http://localhost:3000', 
    //origin: 'https://frontend-1xcy1478e-marco-de-castros-projects.vercel.app/',
    //origin: process.env.CORS_ORIGIN, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // aceitar todas as origens
    origin: '*',
    optionsSuccessStatus: 200
  };

app.use(cors(corsOptions));
  

const PORT = process.env.PORT || 5000;
  
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my application.' });
});


// Rota de cadastro de usuário
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  // Verifique se o usuário já existe
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Usuário já existe.' });
  }

  // Criptografe a senha antes de armazená-la
  const hashedPassword = await bcrypt.hash(senha, 10);

  // Armazene o novo usuário
  users.push({
    nome,
    email,
    senha: hashedPassword,
  });

  res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
});



// Rota de login de usuário
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  // Verifique se o usuário existe
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado.' });
  }

  // Verifique se a senha está correta
  const senhaCorreta = await bcrypt.compare(senha, user.senha);
  if (!senhaCorreta) {
    return res.status(400).json({ message: 'Senha incorreta.' });
  }

  // Se tudo estiver correto, retorne uma mensagem de sucesso
  res.status(200).json({ message: 'Login bem-sucedido.' });
});




  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  



  