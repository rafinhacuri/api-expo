import { sha512Crypt } from 'ldap-passwords'
import { UsuarioUpdateSchema } from '../../../shared/utils/usuario.schema'
import { Usuarios } from '../../utils/mongoose'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, UsuarioUpdateSchema.safeParse)

  if(!body.success) throw createError({ status: 400, message: body.error.errors[0]?.message })

  const { id, nome, idade, email, senha, nivel } = body.data

  const usuario = await Usuarios.findById(id)
    .catch(error => {
      console.error('Erro ao buscar usuário:', error)
      throw createError({ status: 500, message: 'Erro ao buscar usuário' })
    })

  if(!usuario) throw createError({ status: 404, message: 'Usuário não encontrado' })

  const senhaCrypt = sha512Crypt(senha)

  usuario.nome = nome
  usuario.idade = idade
  usuario.email = email
  usuario.senha = senhaCrypt
  usuario.nivel = nivel

  await usuario.save()
    .catch(error => {
      console.error('Erro ao atualizar usuário:', error)
      throw createError({ status: 500, message: 'Erro ao atualizar usuário' })
    })

  return 'Usuário atualizado com sucesso!'
})
