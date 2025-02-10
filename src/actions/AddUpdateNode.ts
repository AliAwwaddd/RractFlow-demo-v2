'use server'

import { z } from 'zod'

export const CreateNodeAction = async (node: z.infer<typeof NodeSchema>) => {
  // console.log(node)
  const parsedNode = NodeSchema.safeParse(node)

  if (!parsedNode.success) {
    console.error('Invalid credentials', parsedNode.error.errors)
    return null
  }

  // await Delay(1)

  return node
}

const NodeSchema = z.object({
  id: z.string().uuid().or(z.string()), // UUID or generic string ID
  type: z.enum(['user', 'habit']), // Only "user" or "habit" allowed
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.object({
    label: z.string().min(1, 'Label cannot be empty').optional(), // Ensures label is required
    fields: z
      .array(
        z.object({
          id: z.string(),
          value: z.string().min(1, 'Field value cannot be empty'), // No empty fields
        }),
      )
      .optional(), // `fields` is optional
  }),
})
