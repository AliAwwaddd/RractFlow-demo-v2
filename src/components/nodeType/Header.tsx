import { Linkedin } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='relative mt-3 flex items-center gap-4'>
      <div className='text-lg font-semibold text-black/70'>Ali Awwad</div>

      <div className='group relative flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 shadow-lg transition-all hover:scale-110 hover:bg-blue-600'>
        <Link
          href='https://www.linkedin.com/in/ali-awwad-18499a283/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-white'
        >
          <Linkedin size={24} />
        </Link>
      </div>
    </div>
  )
}

export default Header
