import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/halal.png'
import { RiCustomerService2Line } from "react-icons/ri";
import { MdLocalPhone } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import ModalForm from './ModalForm';
import { productsContext } from '../App';
import { fetchContact } from '../Fetches/ProductFetching';
import SocialLink from './SocialLink';


const Footer = () => {
  const [showModal, setShowModal] = useState(false)
  const [state, dispatch] = useContext(productsContext)
  useEffect(() => {
     fetchContact(dispatch)
  }, [])

  // console.log(state.contact);
  
  return (
    <div className='bg-[#f3f3f3] mt-5'>
      {showModal ? <ModalForm setShowModal={setShowModal}/> : null}
      <div className="main-container text-center lg:text-start text-[14px] py-14 xl:gap-32 gap-5 grid grid-cols-1 lg:grid-cols-3">
        <div className="flex flex-col mt-5 lg:mt-0 items-center lg:items-start justify-between col-span-1">
          <Link to={'/'}>
            <h1 className='text-3xl font-semibold'>
              <img className='w-20' src={logo} alt="" />
            </h1>
          </Link>
          <button onClick={()=>setShowModal(true)} className='cursor-pointer rounded py-2 gap-3 px-3 w-52 flex items-center border bg-red-600 text-white my-3'>
            <RiCustomerService2Line className='w-9 h-9 ' />
            <span className='text-[14px] '>Customer Services</span>
          </button>
          <p>&copy; Online Shopping Halal Food</p>
        </div>
        <div className="flex flex-col mt-5 lg:mt-0 justify-between gap-4 col-span-1">
          <h1 className='text-lg font-semibold uppercase'>About Shop</h1>
          <ul className="flex flex-col gap-2 text-[14px] ">
            <li>
              <Link to={'/'} className='hover:text-red-600'>Home</Link>
            </li>
            <li>
              <Link to={'/about'} className='hover:text-red-600'>About</Link>
            </li>
            <li>
              <Link to={'/discount'} className='hover:text-red-600'>Discount</Link>
            </li>
            <li>
              <Link to={'/contact'} className='hover:text-red-600'>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center mt-5 lg:mt-0 lg:items-start justify-between col-span-1">
          <h1 className='text-lg font-semibold uppercase'>
            Contact
          </h1>
          <ul className='flex flex-col gap-2 text-[14px]'>
            <li>
              <SocialLink/>
            </li>
            <li> 
              <a className='flex gap-2' href={`tel:${state?.contact[0]?.phone_number}`}>
                <MdLocalPhone className='w-5 h-5' />
                <span>{state?.contact[0]?.phone_number}</span>
              </a>
            </li>
            <li>
              <a className='flex gap-2' href={`#`}>
                <MdOutlineAlternateEmail  className='w-5 h-5' />
                <span>{state?.contact[0]?.email}</span> </a>
            </li>

          </ul>

        </div>
      </div>

    </div>
  )
}

export default Footer
