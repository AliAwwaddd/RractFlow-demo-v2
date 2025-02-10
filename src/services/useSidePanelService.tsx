import { CreateNodeAction } from '@/actions/AddUpdateNode'
import { MyNode } from '@/components/ui/GraphContainerProvider'
import { NodeType } from '@/types/nodeType'
import {
  // getNodeSchema,
  habitNodeSchema,
  NodeSchemaType,
  userNodeSchema,
} from '@/validation/NodeSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Edge, useReactFlow } from 'reactflow'

interface props {
  selectedNode: MyNode | null
  setSelectedNode: React.Dispatch<React.SetStateAction<MyNode | null>>
}

const useSidePanelService = ({ selectedNode, setSelectedNode }: props) => {
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow()
  const [nodeType, setNodeType] = useState<'user' | 'habit'>(
    selectedNode?.type || 'user',
  )

  useEffect(() => {
    if (selectedNode) {
      const newNodeType = selectedNode.type
      setNodeType(newNodeType)
      form.reset({
        nodeType: newNodeType,
        label: selectedNode.data.label || '',
        userFields:
          newNodeType === 'user' ? selectedNode.data.fields || [] : undefined,
      })
    }
  }, [selectedNode, nodeType])

  // useEffect(() => {
  //   const newSchema = getNodeSchema(nodeType)
  //   reset()
  //   nodeForm.control._options.resolver = zodResolver(newSchema)
  // }, [nodeType, selectedNode, nodeForm])

  const updateNode = async (values: NodeSchemaType) => {
    // console.log('values from updateNode', values)
    // console.log('selected node ', selectedNode)

    // await Delay(1)

    setNodes((prev) =>
      prev.map((node) =>
        node.id === selectedNode?.id
          ? {
              ...node,
              data: {
                ...node.data,
                label: values.label,
                fields:
                  values.nodeType === 'user'
                    ? values.userFields
                    : node.data.fields,
              },
            }
          : node,
      ),
    )
    setSelectedNode(null)
  }

  const createNode = async (values: NodeSchemaType) => {
    const nodes = getNodes()
    const newNodeId = (nodes.length + 1).toString()

    const lastNode = nodes[nodes.length - 1] // Get the last node
    const newNodePosition = lastNode
      ? {
          x: lastNode.position.x + 300, // Offset horizontally
          y: lastNode.position.y + (nodes.length % 2 === 0 ? 50 : -50), // Stagger vertically
        }
      : { x: 200, y: 100 }

    const newNode: NodeType = {
      id: newNodeId,
      type: values.nodeType,
      position: newNodePosition,
      data: {
        label: values.label,
        fields: values.nodeType === 'user' ? values.userFields : undefined,
      },
    }

    const node = await CreateNodeAction(newNode)

    if (node) {
      setNodes((prev) => [...prev, node])

      if (nodes.length > 0) {
        const lastNodeId = nodes[nodes.length - 1].id
        LinkToPreviousNode(node.id, lastNodeId)
      }
    }
  }

  const LinkToPreviousNode = (newNodeId: string, lastNodeId: string) => {
    const edges = getEdges()

    const existingEdge = edges.find(
      (edge) => edge.source === lastNodeId && edge.target === newNodeId,
    )
    if (!existingEdge) {
      const newEdge: Edge = {
        id: `e${lastNodeId}-${newNodeId}`,
        source: lastNodeId,
        target: newNodeId,
        animated: true,
      }
      setEdges((prev) => [...prev, newEdge])
    }
  }
  const handleSave = async (values: NodeSchemaType) => {
    if (selectedNode) {
      await updateNode(values)
    } else {
      await createNode(values)
      reset()
    }
  }

  // const defaultNodeType = selectedNode?.type || 'user'

  const form = useForm<NodeSchemaType>({
    // resolver: zodResolver(getNodeSchema(defaultNodeType)),
    resolver: zodResolver(userNodeSchema),
    defaultValues: {
      nodeType: 'user',
      label: selectedNode?.data.label || '',
      userFields: selectedNode?.data.fields || [],
    },
  })

  useEffect(() => {
    const newSchema = nodeType === 'user' ? userNodeSchema : habitNodeSchema
    form.reset({
      nodeType,
      label: selectedNode?.data.label || '',
      userFields:
        nodeType === 'user' ? selectedNode?.data.fields || [] : undefined,
    })
    form.control._options.resolver = zodResolver(newSchema)
  }, [nodeType, selectedNode])

  // const nodeType = nodeForm.watch('nodeType')

  // console.log(nodeForm.formState.errors)

  const onSubmit = (values: NodeSchemaType) => {
    // console.log('values from OnSubmit', values)
    handleSave(values)
  }

  const reset = () => {
    form.reset({
      nodeType: nodeType,
      label: selectedNode?.data.label || '',
      userFields: selectedNode?.data.fields || [],
    })
  }

  return {
    handleSave,
    onSubmit,
    setNodeType,
    nodeType,
    form,
  }
}

export default useSidePanelService
