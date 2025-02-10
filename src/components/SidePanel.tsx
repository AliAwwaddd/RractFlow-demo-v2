import useSidePanelService from '@/services/useSidePanelService'
import { habitOptions } from '@/types/habitType'
import { motion } from 'framer-motion'
import React from 'react'
import { CreateNodeFormField } from './CreateNodeFormField'
import { CreateNodeSelectField } from './CreateNodeSelectField'
import LoadingButton from './LoadingButton'
import { Form } from './ui/form'
import { MyNode } from './ui/GraphContainerProvider'
import UserFieldsArray from './UserFieldsArray'

interface Props {
  selectedNode: MyNode | null
  setSelectedNode: React.Dispatch<React.SetStateAction<MyNode | null>>
}

const SidePanel = ({ selectedNode, setSelectedNode }: Props) => {
  const { onSubmit, form, setNodeType, nodeType } = useSidePanelService({
    selectedNode,
    setSelectedNode,
  })

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className='absolute left-4 top-[100px] flex max-h-[600px] w-64 -translate-y-1/2 flex-col gap-4 rounded-lg border border-gray-300 bg-white p-6 shadow-lg'
    >
      <h3 className='text-lg font-semibold text-gray-800'>
        {selectedNode ? 'Edit Node' : 'Add Node'}
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <CreateNodeSelectField
            name='nodeType'
            label='Node Type'
            options={[
              { value: 'user', label: 'User' },
              { value: 'habit', label: 'Habit' },
            ]}
            formControl={form.control}
            setNodeType={setNodeType}
          />

          {nodeType === 'user' && (
            <>
              {/* Label Input for User */}
              <CreateNodeFormField
                name='label'
                label='Label'
                placeholder='Enter node label'
                formControl={form.control}
              />
              <UserFieldsArray control={form.control} />
            </>
          )}

          {nodeType === 'habit' && (
            <>
              <CreateNodeSelectField
                name='label'
                label='Select a Habit'
                options={habitOptions}
                formControl={form.control}
              />
            </>
          )}

          <LoadingButton
            pending={form.formState.isSubmitting}
            text={selectedNode ? 'Save Changes' : 'Add Node'}
          />
        </form>
      </Form>
    </motion.div>
  )
}

export default SidePanel
