import { Edge, Node } from 'reactflow'

const staticNodes: Node[] = [
  {
    id: '1',
    type: 'user',
    position: { x: 100, y: 200 },
    data: { label: 'Ali Awwad' },
  },
  {
    id: '2',
    type: 'habit',
    position: { x: 400, y: 200 },
    data: { label: 'Reading' },
  },
]

const staticEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
]

export { staticEdges, staticNodes }
