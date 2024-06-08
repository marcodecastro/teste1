import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/dbmongodb.js';
import bcrypt from 'bcryptjs';
import users from './models/User.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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

  try {
    // Verifique se o usuário existe
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    // Verifique se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, existingUser.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    // Se tudo estiver correto, retorne uma mensagem de sucesso
    res.status(200).json({ message: 'Login bem-sucedido.' });
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  



  