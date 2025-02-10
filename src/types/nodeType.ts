export type NodeType = {
  id: string
  type: 'user' | 'habit'
  position: {
    x: number
    y: number
  }
  data: {
    label?: string
    fields?: {
      id: string
      value: string
    }[]
  }
}
