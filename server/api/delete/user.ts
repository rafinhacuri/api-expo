import { IdSchema } from '../../../shared/utils/id.schema'
import { Usuarios } from '../../utils/mongoose'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, IdSchema.safeParse)

  if(!body.success) throw createError({ status: 400, message: body.error.errors[0]?.message })

  const { id } = body.data

  const usuario = await Usuarios.findById(id)
    .catch(error => {
      console.error('Erro ao buscar usuário:', error)
      throw createError({ status: 500, message: 'Erro ao buscar usuário' })
    })

  if(!usuario) throw createError({ status: 404, message: 'Usuário não encontrado' })

  await Usuarios.findByIdAndDelete(id)
    .catch(error => {
      console.error('Erro ao deletar usuário:', error)
      throw createError({ status: 500, message: 'Erro ao deletar usuário' })
    })

  return 'Usuário deletado com sucesso!'
})
