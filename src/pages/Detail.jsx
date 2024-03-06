import React, { useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { DetailFunc } from '../Fetches/ProductFetching'
import { productsContext } from '../App'
import Checked from '../components/Checked'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiScales3Line } from "react-icons/ri";
import { RiHeartLine } from "react-icons/ri";
import parse from 'html-react-parser';
import Spinner from '../components/spinner/Spinner'


const Detail = () => {
  const { detailSlug } = useParams()
  const imgRef = useRef()
  const [state, dispatch] = useContext(productsContext)

  useEffect(() => {
    DetailFunc(detailSlug, dispatch)
  }, [])
  // console.log(state.detail);

  const imgHandler = (e) => {
    imgRef.current.src = e.target.src
  }


  return (
    <>
      {
        state.loading ?
          <Spinner /> :
          <div className="main-container w-full mt-10 grid grid-cols-1 lg:grid-cols-2 p-10 gap-6">

            <div className="flex flex-col gap-3 sm:flex-row items-center justify-between border w-full rounded-md lg:col-span-2 py-5 px-2">

              <div className="text-slate-900 text-xl sm:text-3xl font-semibold cursor-pointer ">
                {state?.detail[0]?.name}
              </div>

              <p className='text-white p-2 rounded-md text-sm font-normal bg-green-500 '>Category: <span>{state?.detail[0]?.category.name}</span></p>
            </div>

            <div className="flex border overflow-hidden flex-col sm:flex-row col-span-1 rounded-md ">

              <div className="flex flex-wrap sm:flex-nowrap overflow-y-scroll max-h-[400px] gap-3 sm:flex-col sm:w-[100px]">
                {state?.detail[0]?.images.map((item, i) => {
                  return (
                    <img onClick={imgHandler} key={i} src={item} className='cursor-pointer w-[100px] h-[80px] object-cover object-center' alt="" />

                  )
                })}

              </div>
              <div className='relative cursor-pointer border w-full'>
                <div className="absolute bottom-0 rounded left-0 text-sm bg-green-600 text-white px-1 ">
                  {state?.detail[0]?.type}
                </div>
                <img ref={imgRef} src={state?.detail[0]?.images[0]} className='w-full h-full aspect-[5/4] object-cover object-center' alt="" />
                <Checked />
              </div>
            </div>
            <div className="p-4 relative flex flex-col col-span-1 gap-2 flex-1 border rounded-md">
              <div className="flex flex-col gap-3">
                <span className={`font-bold sm:text-xl block ${state?.detail[0]?.discount !== 0 ? "block" : "hidden"}`}>Discount:<span className='ms-4 text-red-500 line-through font-semibold '>${state?.detail[0]?.discount}</span></span>
                <span className='font-bold sm:text-xl block'>Price:<span className='ms-4 text-green-500 text-2xl font-semibold'>${state?.detail[0]?.price}</span></span>
                {
                  state?.detail[0] ?
                    <span className='font-bold sm:text-xl block'>Detail:<span className='ms-4 text-base font-normal'> <br />{parse(state?.detail[0]?.description)}</span></span>
                    :
                    null
                }
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-auto ">
                <button className='bg-green-500 gap-2 flex items-center justify-center transition-all hover:bg-green-500 text-white rounded-md p-1 sm:py-2 flex-1 '>
                  <HiOutlineShoppingCart className='w-5 h-5 ' />
                  <span className='text-sm sm:text-base'>Buy</span>
                </button>
                <div className='flex gap-2 '>
                  <button className='bg-amber-400 hover:bg-amber-500 transition-all flex-1 flex items-center justify-center text-white p-1 sm:p-2'>
                    <RiScales3Line className='w-5 h-5 ' />
                  </button>
                  <button className='bg-red-500 hover:bg-red-600 transition-all flex-1 flex items-center justify-center text-white p-1 sm:p-2'>
                    <RiHeartLine className='w-5 h-5 ' />
                  </button>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Detail
