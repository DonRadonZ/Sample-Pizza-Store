// import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-yellow-400 uppercase px-4 py-3 border-b border-stone-200 sm:px-6">
      <Link to='/' className='tracking-widest'>Sample Pizza Store</Link>
      
      <SearchOrder />
      <Username/>
    </header>
  )
}
