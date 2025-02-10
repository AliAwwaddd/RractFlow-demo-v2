import GraphContainerProvider from '@/components/ui/GraphContainerProvider'

const page = () => {
  // this is just so we don't have to set the whole page as a client component and utilize the SSR.
  
  return <GraphContainerProvider />
}

export default page
