import { habitType } from '@/types/habitType'
import { z } from 'zod'

const habitTypes = Object.values(habitType) as [string, ...string[]]

export const userNodeSchema = z.object({
  label: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters'),
  userFields: z
    .array(
      z.object({
        id: z.string(),
        value: z.string().min(1, 'Field value cannot be empty'),
      }),
    )
    .optional(),
  nodeType: z.string(),
})

export const habitNodeSchema = z.object({
  label: z.enum(habitTypes, { message: 'Select a valid habit' }),
  nodeType: z.string(),
})

export const getNodeSchema = (nodeType: 'user' | 'habit') => {
  return nodeType === 'user' ? userNodeSchema : habitNodeSchema
}

export type NodeSchemaType =
  | (z.infer<typeof userNodeSchema> & { nodeType: 'user' })
  | (z.infer<typeof habitNodeSchema> & { nodeType: 'habit' })
