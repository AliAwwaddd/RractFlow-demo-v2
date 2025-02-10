import React from 'react'
import { useNodeId, useReactFlow } from 'reactflow'

interface UserNodeData {
  label: string
  fields: { id: string; value: string }[]
}
const useUserNodeService = (data: UserNodeData) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { setNodes } = useReactFlow()
  const nodeId = useNodeId()

  const fields = data.fields || [{ id: '1', value: '' }]

  const updateField = (id: string, value: string) => {
    const newFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field,
    )

    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: { ...node.data, fields: newFields },
            }
          : node,
      ),
    )
  }

  const addField = () => {
    if (fields.length < 20) {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  fields: [
                    ...fields,
                    { id: (fields.length + 1).toString(), value: '' },
                  ],
                },
              }
            : node,
        ),
      )
    }
  }

  const scrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: -30, behavior: 'smooth' })
    }
  }

  const scrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: 30, behavior: 'smooth' })
    }
  }

  return { fields, scrollUp, scrollDown, addField, updateField, containerRef }
}

export default useUserNodeService
