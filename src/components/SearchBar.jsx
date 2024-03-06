import React, { useContext, useEffect, useRef, useState } from 'react'
import DropCategory from './DropCategory'
import { Link, useSearchParams } from 'react-router-dom'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiHeartLine } from "react-icons/ri";
import { RiScales3Line } from "react-icons/ri";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { fetchAllCategory } from '../Fetches/ProductFetching';
import { productsContext } from '../App';
import { toast } from 'react-toastify';
import ModalForm from './ModalForm';



const SearchBar = () => {
  const [state, dispatch] = useContext(productsContext)
  const [count, setCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  // console.log(state.categories);
  useEffect(()=>{
    let sanoq = 0;
    state.cart.forEach(item => sanoq = item.count + sanoq)
    setCount(sanoq)
  },[state?.cart])



  useEffect(() => {
    fetchAllCategory({dispatch})
  }, [])
  const [_, setParam] = useSearchParams()
   const inputRef = useRef()
   const dropRef = useRef()
  const searchHandler = ()=> {
    const inputValue = inputRef.current.value
    inputRef.current.value = ''
    if(inputValue) {
      setParam({search: `${inputValue}`})
    }
    else {
      setParam({})
      toast.error('inputga malumot kiritilmadi!!!')
    }

  }

  return (
    <div className='bg-red-600 py-3 sticky z-10 top-[-1px]'>
      {showModal ? <ModalForm setShowModal={setShowModal}/> : null}
      <div className="main-container gap-5 flex flex-wrap items-center justify-between">
        <div className="relative bg-slate-800 px-3 py-1 cursor-pointer rounded-md w-full sm:w-64">
          <DropCategory inputRef={inputRef} dropRef={dropRef} category={state?.categories} />
        </div>
        <div className="flex text-black lg:w-[500px] xl:w-[650px] w-full order-2 lg:order-1">
          <input ref={inputRef} type="text" className='rounded-s-md rounded-e-none w-full py-3 text-[13px] bg-white placeholder:text-black' placeholder='Search...' />
          <button onClick={searchHandler} className='bg-slate-800 rounded-e-md rounded-s-none text-[14px] text-white py-3 px-2 sm:px-10'>Search</button>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-6 justify-evenly items-center text-white order-1 lg:order-2 w-full sm:w-auto ">

          <Link to={'/cart'} className='flex cursor-pointer flex-col items-center relative'>
            <HiOutlineShoppingCart className='w-9 h-9 ' />
            <span className='absolute right-0 top-0 bg-black w-max px-1 min-w-4 h-4 flex items-center justify-center rounded-full'>{count}</span>
            <span className='text-[14px]'>Cart</span>
          </Link>
          <Link to={'/wish-list'} className='flex cursor-pointer flex-col items-center relative'>
            <RiHeartLine className='w-9 h-9 ' />
            <span className='absolute right-0 top-0 bg-black w-max px-1 min-w-4 h-4 flex items-center justify-center rounded-full'>{state.wishlist.length}</span>
            <span className='text-[14px] '>Wish List</span>
          </Link>
          <Link to={'/compare'} className='flex cursor-pointer flex-col items-center relative'>
            <RiScales3Line className='w-9 h-9 ' />
            <span className='absolute right-0 top-0 bg-black w-max px-1 min-w-4 h-4 flex items-center justify-center rounded-full'>{state.scale.length}</span>
            <span className='text-[14px] '>Compare</span>
          </Link>
          <div onClick={()=> setShowModal(true)} className='flex cursor-pointer flex-col items-center relative'>
            <RiCustomerService2Line className='w-9 h-9 ' />
            <span className='text-[14px] '>services</span>
          </div>
          <Link to={'/'} className='flex cursor-pointer flex-col items-center relative'>
            <IoHomeOutline className='w-9 h-9 ' />
            <span className='text-[14px] sm:text-[16px]'>Home</span>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default SearchBar
