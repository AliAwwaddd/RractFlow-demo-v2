'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'

type CreateNodeSelectFieldProps<TSchema extends z.ZodType<any, any>> = {
  name: FieldPath<z.infer<TSchema>>
  label: string
  options: { value: string; label: string }[]
  formControl: Control<z.infer<TSchema>>
  setNodeType?: (value: 'user' | 'habit') => void
  // nodeType?: 'user' | 'habit'
}

export function CreateNodeSelectField<TSchema extends z.ZodType<any, any>>({
  name,
  label,
  options,
  formControl,
  setNodeType,
  // nodeType,
}: CreateNodeSelectFieldProps<TSchema>) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value: 'user' | 'habit') => {
                field.onChange(value)
                setNodeType && setNodeType(value)
              }}
              value={field.value}
            >
              {' '}
              {/* 👈 Default to 'user' */}
              <SelectTrigger className='bg-neutral-100'>
                <SelectValue>{field.value || 'Select a habit'}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
