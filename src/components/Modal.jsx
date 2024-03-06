import React, { useContext } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import ChooseCart from './ChooseCart';
import { productsContext } from '../App';


const Modal = ({setModal}) => {
    const [{allPrice}, _] = useContext(productsContext)
    return (
        <div className='bg-black/60 w-full h-screen p-1 sm:p-3 flex items-center justify-center fixed top-0 left-0 z-10'>
            <div className="relative w-[600px] h-[95%] border p-6 bg-white rounded ">
                <div className="flex items-center justify-between mb-3">
                    <h1>Your products</h1>
                    <button onClick={()=> setModal(false)}><IoIosCloseCircleOutline className='w-8 h-8' /></button>
                </div>
                <div className="overflow-y-scroll h-[70%] sm:h-[80%]">
                    <ChooseCart/>
                </div>

                <div className="border-top">
                    <div className="flex items-center justify-between text-xl font-bold border-b py-2">
                        <div>Total:</div>
                        <div className="text-2xl text-red-500">${(allPrice).toFixed(2)}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-between">
                        <button onClick={()=> setModal(false)} className='flex-1 bg-transparent hover:bg-slate-600 transition-all hover:text-white border border-slate-600 text-slate-600 p-2 rounded'>Continue Buy </button>
                        <Link to={"/cart"} className='flex-1'>
                            <button className='bg-black border border-black text-white p-2 w-full rounded'>Booking</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Modal
