import { Tarefas } from '../../../utils/mongoose'

export default defineEventHandler(async event => {
  const email = event.context.params?.email
  if(!email) throw createError({ status: 400, message: 'Email não informado' })

  const tarefas = await Tarefas.find({ email }).lean()
    .catch(error => {
      console.error('Erro ao buscar tarefas:', error)
      throw createError({ status: 500, message: 'Erro ao buscar tarefas' })
    })

  return tarefas
})
