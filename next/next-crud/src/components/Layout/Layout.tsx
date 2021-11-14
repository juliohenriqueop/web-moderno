import { ReactNode } from 'react'
import Title from './Title'

export type LayoutProps = {
  title: string,
  children: ReactNode
}

export default function Layout(props: LayoutProps) {
  return (
    <div className='
      flex
      h-screen
      justify-center
      items-center
      bg-gradient-to-r
      from-purple-500
      to-blue-500'
    >
      <div className='flex flex-col w-2/3 bg-white text-gray-800 rounded-sm'>
        <Title>{props.title}</Title>
        <div className="p-6">
          {props.children}
        </div>
      </div>
    </div>
  )
}