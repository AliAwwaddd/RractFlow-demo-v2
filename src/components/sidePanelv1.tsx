// import useSidePanelService from '@/services/useSidePanelService'
// import { motion } from 'framer-motion'
// import React from 'react'
// import { CreateNodeFormField } from './CreateNodeFormField'
// import { CreateNodeSelectField } from './CreateNodeSelectField'
// import LoadingButton from './LoadingButton'
// import { Form } from './ui/form'
// import { MyNode } from './ui/GraphContainerProvider'
// import UserFieldsArray from './UserFieldsArray'

// interface Props {
//   selectedNode: MyNode | null
//   setSelectedNode: React.Dispatch<React.SetStateAction<MyNode | null>>
// }

// const SidePanel = ({ selectedNode, setSelectedNode }: Props) => {
//   const { onSubmit, habitNodeForm, userNodeForm, setNodeType, nodeType } =
//     useSidePanelService({
//       selectedNode,
//       setSelectedNode,
//     })

//   return (
//     <motion.div
//       initial={{ x: -300, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className='absolute left-4 top-[100px] flex w-64 -translate-y-1/2 flex-col gap-4 rounded-lg border border-gray-300 bg-white p-6 shadow-lg'
//     >
//       <h3 className='text-lg font-semibold text-gray-800'>
//         {selectedNode ? 'Edit Node' : 'Add Node'}
//       </h3>

//       {nodeType === 'user' && (
//         <Form {...userNodeForm}>
//           <form
//             onSubmit={userNodeForm.handleSubmit(onSubmit)}
//             className='flex flex-col gap-4'
//           >
//             <CreateNodeSelectField
//               name='nodeType'
//               label='Node Type'
//               options={[
//                 { value: 'user', label: 'User' },
//                 { value: 'habit', label: 'Habit' },
//               ]}
//               formControl={userNodeForm.control}
//               setNodeType={setNodeType}
//             />

//             {/* Node Label Input */}
//             <CreateNodeFormField
//               name='label'
//               label='Label'
//               placeholder='Enter node label'
//               formControl={userNodeForm.control}
//             />

//             {/* User Fields Array (only shown for "user" type) */}

//             <UserFieldsArray control={userNodeForm.control} />

//             {/* Submit Button */}
//             <LoadingButton
//               pending={userNodeForm.formState.isSubmitting}
//               text={selectedNode ? 'Save Changes' : 'Add Node'}
//             />
//           </form>
//         </Form>
//       )}

//       {nodeType === 'habit' && (
//         <Form {...habitNodeForm}>
//           <form
//             onSubmit={habitNodeForm.handleSubmit(onSubmit)}
//             className='flex flex-col gap-4'
//           >
//             <CreateNodeSelectField
//               name='nodeType'
//               label='Node Type'
//               options={[
//                 { value: 'user', label: 'User' },
//                 { value: 'habit', label: 'Habit' },
//               ]}
//               formControl={habitNodeForm.control}
//               setNodeType={setNodeType}
//             />

//             {/* Node Label Input */}
//             <CreateNodeFormField
//               name='label'
//               label='Label'
//               placeholder='Enter node label'
//               formControl={habitNodeForm.control}
//             />

//             {/* Submit Button */}
//             <LoadingButton
//               pending={habitNodeForm.formState.isSubmitting}
//               text={selectedNode ? 'Save Changes' : 'Add Node'}
//             />
//           </form>
//         </Form>
//       )}
//     </motion.div>
//   )
// }

// export default SidePanel
