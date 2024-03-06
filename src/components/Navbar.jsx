import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineBars2 } from "react-icons/hi2";
import logo from '../assets/halal.png'
import { productsContext } from '../App';

const navLinkStyle = 'py-2 lg:py-4 block group hover:bg-red-500 lg:hover:bg-transparent rounded-md transition-all'
const spanClass = 'group-hover:text-white lg:group-hover:text-red-600 lg:group-hover:lg:pl-0 group-hover:pl-5 transition-all'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { state, dispatch } = useContext(productsContext)




  return (
    <div className='lg:flex bg-white py-4 items-center justify-between main-container w-full'>
      <div className="flex items-center justify-between">
        <NavLink to={'/'}>
          <h1 className='text-3xl font-semibold'>
            <img className='w-16 ' src={logo} alt="" />
          </h1>
        </NavLink>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          <HiOutlineBars2 className='w-6 h-6' />

        </button>
      </div>

      <div className={`${isOpen ? 'h-auto' : 'h-0'} lg:flex lg:h-auto mt-5 lg:mt-0 overflow-hidden`}>
        <ul className='lg:flex items-center lg:ml-20 lg:gap-6 text-[15px] '>
          <NavLink to={'/'} className={navLinkStyle}><span className={spanClass}>Home</span></NavLink>
          <NavLink to={'/about'} className={navLinkStyle}><span className={spanClass}>About</span></NavLink>
          {state?.discount.length ? <NavLink to={'/discount'} className={navLinkStyle}><span className={spanClass}>Discount</span></NavLink> : ''}
          <NavLink to={'/contact'} className={navLinkStyle}><span className={spanClass}>Contact</span></NavLink>
        </ul>

      </div>

    </div>
  )
}

export default Navbar
