'use client'
import { staticEdges, staticNodes } from '@/static/Nodes'
import React, { useCallback } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Node as NodeType,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import Habit from '../nodeType/Habit'
import Header from '../nodeType/Header'
import User from '../nodeType/User'
import SidePanel from '../SidePanel'

const nodeTypes = {
  user: User,
  habit: Habit,
}

export interface MyNodeData {
  label: string
  fields: { id: string; value: string }[]
}

export interface MyNode extends NodeType<MyNodeData> {
  type: 'user' | 'habit'
}

const GraphContainer = () => {
  const [selectedNode, setSelectedNode] = React.useState<MyNode | null>(null)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(staticEdges)
  const [nodes, _, onNodesChange] = useNodesState<MyNode[]>(staticNodes)

  const onConnect = useCallback((connection: Connection) => {
    const edge = { ...connection, animated: true, id: `${edges.length} + 1` }
    setEdges((prevEdges) => addEdge(edge, prevEdges))
  }, [])

  const onNodeClick = (_: any, node: NodeType<any, string | undefined>) => {
    if (Node === undefined) return null
    setSelectedNode(node as MyNode)
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-neutral-100'>
      <div className='absolute top-2'>
        <Header />
      </div>
      <div className='ml-[300px] mr-5 h-[600px] w-full rounded-lg border bg-neutral-200 p-2 shadow-lg'>
        <SidePanel
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          edges={edges}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          // fitView
        >
          <Background />
          <Controls />
          {/* <MiniMap /> */}
        </ReactFlow>
      </div>
    </div>
  )
}

export default function GraphContainerProvider() {
  return (
    <ReactFlowProvider>
      <GraphContainer />
    </ReactFlowProvider>
  )
}
