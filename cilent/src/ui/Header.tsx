// import React from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'

export default function Header() {
  return (
    <header>
      <Link to='/'>Sample Pizza Store</Link>
      
      <SearchOrder />

      <p>Supachai</p>
    </header>
  )
}