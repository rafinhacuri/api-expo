import { TarefaSchema } from '../../../shared/utils/tarefa.schema'
import { Tarefas } from '../../utils/mongoose'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, TarefaSchema.safeParse)

  if(!body.success) throw createError({ status: 400, message: body.error.errors[0]?.message })

  const { email, data, descricao, feita, nome } = body.data

  await new Tarefas({ email, data, descricao, feita, nome }).save()
    .catch(error => {
      console.error('Erro ao inserir tarefa:', error)
      throw createError({ status: 500, message: 'Erro ao inserir tarefa' })
    })
  return 'Tarefa criada com sucesso!'
})
