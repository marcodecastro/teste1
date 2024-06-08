import mongoose from 'mongoose';

const User = mongoose.model('User', {
    nome: String,
    email: String,
    senha: String,
    isAdmin: { type: Boolean, default: false },
  });


  export default User;