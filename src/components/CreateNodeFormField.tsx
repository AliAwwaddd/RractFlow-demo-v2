'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'

type CreateNodeFormFieldProps<TSchema extends z.ZodType<any, any>> = {
  name: FieldPath<z.infer<TSchema>>
  label: string
  placeholder: string
  description?: string
  inputType?: string
  formControl: Control<z.infer<TSchema>>
}

export function CreateNodeFormField<TSchema extends z.ZodType<any, any>>({
  name,
  label,
  placeholder,
  description,
  inputType = 'text',
  formControl,
}: CreateNodeFormFieldProps<TSchema>) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={inputType}
              placeholder={placeholder}
              className='bg-neutral-100'
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
