import { TarefaUpdateSchema } from '../../../shared/utils/tarefa.schema'
import { Tarefas } from '../../utils/mongoose'

export default defineEventHandler(async event => {
  const body = await readValidatedBody(event, TarefaUpdateSchema.safeParse)

  if(!body.success) throw createError({ status: 400, message: body.error.errors[0]?.message || '' })

  const { data, descricao, email, feita, nome, id } = body.data

  const tarefa = await Tarefas.findById(id)
    .catch(error => {
      console.error('Erro ao buscar tarefa:', error)
      throw createError({ status: 500, message: 'Erro ao buscar tarefa' })
    })

  if(!tarefa) throw createError({ status: 404, message: 'Tarefa não encontrada' })

  tarefa.nome = nome
  tarefa.descricao = descricao
  tarefa.data = data
  tarefa.feita = feita
  tarefa.email = email
  await tarefa.save()
    .catch(error => {
      console.error('Erro ao atualizar tarefa:', error)
      throw createError({ status: 500, message: 'Erro ao atualizar tarefa' })
    })

  return `Tarefa "${nome}" editada com sucesso!`
})
