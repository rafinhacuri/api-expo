import { IdSchema } from '../../../shared/utils/id.schema'
import { Tarefas } from '../../utils/mongoose'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, IdSchema.safeParse)

  if(!body.success) throw createError({ status: 400, message: body.error.errors[0]?.message || '' })

  const { id } = body.data

  const tarefa = await Tarefas.findById(id)
    .catch(error => {
      console.error('Erro ao buscar tarefa:', error)
      throw createError({ status: 500, message: 'Erro ao buscar tarefa' })
    })

  if(!tarefa) throw createError({ status: 404, message: 'Tarefa não encontrada' })

  await Tarefas.findByIdAndDelete(id)
    .catch(error => {
      console.error('Erro ao deletar tarefa:', error)
      throw createError({ status: 500, message: 'Erro ao deletar tarefa' })
    })
  return `Tarefa "${tarefa.nome}" deletada com sucesso!`
})
