import { z } from 'zod'

export const TarefaSchema = z.object({
  nome: z.string().trim().min(1, { message: 'Selecione o nome' }),
  descricao: z.string().trim().min(1, { message: 'Selecione a descrição' }),
  data: z.string().trim().min(1, { message: 'Selecione a data' }),
  feita: z.boolean(),
  email: z.string().email({ message: 'Email inválido' }),
})

export type Tarefa = z.infer<typeof TarefaSchema>

export const TarefaUpdateSchema = TarefaSchema.extend({
  id: z.string().trim().min(1, { message: 'ID é obrigatório' }),
})

export type TarefaUpdate = z.infer<typeof TarefaUpdateSchema>
