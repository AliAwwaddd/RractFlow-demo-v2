import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Handle, Position, useNodeId, useReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'

interface props {
  data: { label: string }
}

const Habit = ({ data }: props) => {
  const { setNodes } = useReactFlow()
  const nodeId = useNodeId()

  const updateHabit = (value: string) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: { ...node.data, label: value },
            }
          : node,
      ),
    )
  }
  return (
    <div className='w-30 rounded bg-green-300 p-2 shadow-md'>
      <label className='text-sm font-semibold'>Habit:</label>
      <Select defaultValue={data.label} onValueChange={updateHabit}>
        <SelectTrigger className='mt-1 w-full'>
          <SelectValue>{data.label || 'Select a habit'}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='reading'>Reading</SelectItem>
          <SelectItem value='exercise'>Exercise</SelectItem>
          <SelectItem value='meditation'>Meditation</SelectItem>
        </SelectContent>
      </Select>
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} />
    </div>
  )
}

export default Habit
