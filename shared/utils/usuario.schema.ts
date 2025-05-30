import { z } from 'zod'

export const UsuarioSchema = z.object({
  nome: z.string().min(1, { message: 'Nome é obrigatório' }).trim(),
  idade: z.string().min(1, { message: 'Idade é obrigatória' }).trim(),
  email: z.string().email({ message: 'Email inválido' }),
  senha: z.string().min(1, { message: 'Senha é obrigatória' }).trim(),
  nivel: z.enum(['adm', 'usuario']),
})

export type Usuario = z.infer<typeof UsuarioSchema>

export const UsuarioUpdateSchema = UsuarioSchema.extend({
  id: z.string().min(1, { message: 'ID é obrigatório' }).trim(),
})
