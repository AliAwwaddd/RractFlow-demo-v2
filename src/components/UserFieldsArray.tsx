'use client'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, useFieldArray } from 'react-hook-form'

type UserFieldsArrayProps = {
  control: Control<any>
}

export default function UserFieldsArray({ control }: UserFieldsArrayProps) {
  const { fields, append } = useFieldArray({
    control,
    name: 'userFields',
  })

  return (
    <div className='flex max-h-[250px] flex-col gap-2'>
      <FormLabel>User Fields</FormLabel>
      <div className='flex flex-col gap-2 overflow-y-auto p-1'>
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`userFields.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={`Field ${index + 1}`}
                    className='m-0 bg-neutral-100 p-0 pl-2'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
      {fields.length < 20 && (
        <Button
          type='button'
          className='w-full bg-gray-300 text-gray-700 hover:bg-gray-400'
          onClick={() => append({ id: Math.random().toString(), value: '' })}
        >
          + Add Field
        </Button>
      )}
    </div>
  )
}
