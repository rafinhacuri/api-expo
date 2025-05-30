import { Usuarios } from '../../utils/mongoose'

export default defineEventHandler(async () => {
  const usuarios = await Usuarios.find().lean()
    .catch(error => {
      console.error('Erro ao buscar usuários:', error)
      throw createError({ status: 500, message: 'Erro ao buscar usuários' })
    })

  return usuarios
})
