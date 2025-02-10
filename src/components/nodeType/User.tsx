import { Input } from '@/components/ui/input'
import useUserNodeService from '@/services/useUserNodeService'
import { Handle, NodeProps, Position } from 'reactflow'
import 'reactflow/dist/style.css'

interface UserNodeData {
  label: string
  fields: { id: string; value: string }[]
}

const UserNode = ({ data }: NodeProps<UserNodeData>) => {
  const { fields, scrollUp, scrollDown, addField, updateField, containerRef } =
    useUserNodeService(data)

  return (
    <div className='flex max-h-72 w-42 flex-col gap-2 overflow-auto rounded-lg bg-gradient-to-br from-blue-500 to-blue-300 p-4 shadow-lg'>
      <h3 className='text-md text-center font-semibold text-white'>
        {data.label}
      </h3>
      {fields.length > 3 && (
        <button
          onClick={scrollUp}
          className='self-center rounded-md bg-blue-300 px-3 py-1 text-xs text-white transition hover:bg-blue-800'
        >
          ▲
        </button>
      )}
      <div ref={containerRef} className='max-h-40 overflow-y-hidden'>
        {fields.map((field, index) => (
          <Input
            key={field.id}
            type='text'
            value={field.value}
            onChange={(e) => updateField(field.id, e.target.value)}
            className='w-full rounded border border-white p-2 text-sm text-white'
            placeholder={`Field ${index + 1}`}
          />
        ))}
      </div>
      {fields.length > 3 && (
        <button
          onClick={scrollDown}
          className='self-center rounded-md bg-blue-300 px-3 py-1 text-xs text-white transition hover:bg-blue-800'
        >
          ▼
        </button>
      )}
      {fields.length < 20 && (
        <button
          onClick={addField}
          className='mt-2 self-center rounded-md bg-blue-600 px-3 py-1 text-xs text-white transition hover:bg-blue-700'
        >
          + Add Field
        </button>
      )}
      <Handle
        type='target'
        position={Position.Left}
        className='h-2 w-2 border-2 border-blue-500 bg-white'
      />
      <Handle
        type='source'
        position={Position.Right}
        className='h-2 w-2 border-2 border-blue-500 bg-white'
      />
    </div>
  )
}

export default UserNode
