import { verifySha512Crypt } from 'ldap-passwords'
import { z } from 'zod'
import { Usuarios } from '../utils/mongoose'

const LoginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(1),
})

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, LoginSchema.safeParse)

  if(!body.success) throw createError({ status: 400, message: body.error.errors[0]?.message || '' })

  const { email, senha } = body.data

  const user = await Usuarios.findOne({ email }).lean()
    .catch(error => {
      console.error('Erro ao buscar usuário:', error)
      throw createError({ status: 500, message: 'Erro ao buscar usuário' })
    })

  if(!user) throw createError({ status: 401, message: 'Credenciais inválidas' })

  if(!verifySha512Crypt(senha, user.senha)) throw createError({ status: 401, message: 'Usuário e/ou senha inválidos' })

  return user
})
