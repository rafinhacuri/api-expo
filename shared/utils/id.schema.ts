import { z } from 'zod'

export const IdSchema = z.object({
  id: z.string().trim().min(1, { message: 'ID é obrigatório' }),
})

export type Id = z.infer<typeof IdSchema>
