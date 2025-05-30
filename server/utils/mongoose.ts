import mongoose, { Schema } from 'mongoose'
import type { Tarefa } from '../../shared/utils/tarefa.schema'
import type { Usuario } from '../../shared/utils/usuario.schema'

const { MONGO_URL, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_NAME } = useRuntimeConfig()

mongoose.connect(MONGO_URL, {
  tls: true,
  auth: { username: MONGO_USERNAME, password: MONGO_PASSWORD },
  dbName: MONGO_DB_NAME,
})

export const Tarefas = mongoose.model('tarefas', new Schema<Tarefa>({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  data: { type: String, required: true },
  feita: { type: Boolean, default: false },
  email: { type: String, required: true },
}))

export const Usuarios = mongoose.model('usuarios', new Schema<Usuario>({
  nome: { type: String, required: true },
  idade: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  nivel: { type: String, enum: ['adm', 'usuario'], required: true },
}))
