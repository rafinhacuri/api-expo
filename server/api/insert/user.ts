import { sha512Crypt } from 'ldap-passwords'
import { UsuarioSchema } from '../../../shared/utils/usuario.schema'
import { Usuarios } from '../../utils/mongoose'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, UsuarioSchema.safeParse)

  if(!body.success) throw createError({ status: 400, message: body.error.errors[0]?.message })

  const { email, idade, nivel, nome, senha } = body.data

  const existe = await Usuarios.findOne({ email })
    .catch(error => {
      console.error('Erro ao verificar usuário:', error)
      throw createError({ status: 500, message: 'Erro ao verificar usuário' })
    })

  if(existe) throw createError({ status: 409, message: 'Email já cadastrado' })

  const senhaCrypt = sha512Crypt(senha)

  await new Usuarios({ nome, idade, email, senha: senhaCrypt, nivel }).save()
    .catch(error => {
      console.error('Erro ao inserir usuário:', error)
      throw createError({ status: 500, message: 'Erro ao inserir usuário' })
    })

  return 'Usuário criado com sucesso!'
})
