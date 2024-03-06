import React, { useContext, useEffect, useState } from 'react'
import { productsContext } from '../App'
import Checked from './Checked'
import { BsPlusLg } from "react-icons/bs";
import { FiMinus } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { RiHeartLine } from "react-icons/ri";
import { RiScales3Line } from "react-icons/ri";


const ChooseCart = () => {
    const [state, dispatch] = useContext(productsContext)
    const AllPrice = ()=> {
        let dataFromLS = JSON.parse(localStorage.getItem("cart")) || []
        let sum = 0;
        dataFromLS.forEach(elem => {
            sum += +(elem.price).toFixed(2) * elem.count
        })
        dispatch({type: "ALL_PRICE", payload: sum})
    }
    useEffect(() => {
        AllPrice()
    }, [])
    

    const toggleHandler = (store, dispatchType, card) => {
        let dataFromLS = JSON.parse(localStorage.getItem(store)) || []
        const el = dataFromLS?.find(item => item.id === card.id)
        if (el) {
            const FilteredArr = dataFromLS.filter(item => item.id !== card.id)
            localStorage.setItem(store, JSON.stringify(FilteredArr))
            dispatch({ type: dispatchType, payload: FilteredArr })
        }
        else{
            localStorage.setItem(store, JSON.stringify([...dataFromLS, card]))
            dispatch({type: dispatchType, payload : [...dataFromLS, card]})
        }
        AllPrice()
    }

    const quantityHandler = (ishora, item) => {
        if (ishora) {
            item.count = item.count + 1
        }
        else {
            item.count = item.count !== 1 ? item.count - 1 : 1
        }
        let dataFromLS = JSON.parse(localStorage.getItem("cart"))
        dataFromLS.forEach(card => { card.id === item.id ? card.count = item.count : null })
        localStorage.setItem("cart", JSON.stringify(dataFromLS))
        dispatch({ type: "UPDATE_CART", payload: dataFromLS })
        AllPrice() 
    }

    return (
        <div className='border rounded-md p-3 '>
            {
                state.cart.length ? state.cart.map((card, i) => (
                    <div key={i} className="border-b relative flex flex-col py-2">
                        <div className='flex flex-col sm:flex-row items-start gap-5 '>
                            <div className="w-32 h-auto relative">
                                <img className='w-full h-full aspect-square object-cover origin-center' src={card.images[0]} alt="" />
                                <div className="absolute bottom-0 left-0 rounded text-sm bg-green-500 text-white px-1">{card.type}</div>
                                <Checked cardId={card.id} />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-slate-900 text-lg font-bold">{card?.name}</h1>
                                <p className={`${card?.discount !== 0 ? "inline" : "hidden"} text-gray-400 text-xs sm:text-sm block`}>
                                    Discount:
                                    <span>{card.discount} <span>$</span></span>
                                </p>
                                <p className='text-gray-400 text-xs sm:text-sm block'>
                                    Caategory:
                                    <span className='text-slate-900 font-semibold ml-3'>{card?.category?.name}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between items-end mt-2">
                            <div className="mt-2 sm:flex gap-5 text-center">
                                <div className="flex sm:block gap-2 justify-between items-center">
                                    <p className='text-green-400 sm:mb-2 text-xs '>Price</p>
                                    <p className="text-green-500 font-semibold">${(card?.price).toFixed(2)}</p>
                                </div>
                                <div className="flex sm:block gap-2 justify-between items-center ">
                                    <p className='text-gray-400 sm:mb-2 text-xs '>Quantitiy</p>
                                    <div className="border flex justify-between rounded-md w-28 px-1 py-1 cursor-pointer">
                                        <button onClick={() => quantityHandler(false, card)}><FiMinus className='w-5 h-5 text-red-500' /></button>
                                        <div>{card?.count}</div>
                                        <button onClick={() => quantityHandler(true, card)}><BsPlusLg className='w-5 h-5 text-green-500' /></button>
                                    </div>
                                </div>
                                <div className="flex sm:block gap-2 justify-between items-center">
                                    <p className='text-gray-400 sm:mb-2 text-xs '>Price</p>
                                    <p className="text-red-500 font-semibold">${(card?.price * card.count).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex gap-1 ">
                            <button onClick={() => toggleHandler("cart", "UPDATE_CART", card)} className='text-white p-1 rounded bg-black'>
                                                <BsTrash className='w-5 h-5 ' />
                                            </button>
                                                <button onClick={() => toggleHandler("wishlist", "UPDATE_WISHLIST", card)} className='text-white p-1 rounded bg-red-500'>
                                                <RiHeartLine className='w-5 h-5 ' />
                                                </button>
                                                <button onClick={() => toggleHandler("scale", "UPDATE_SCALE", card)} className='text-white p-1 rounded bg-amber-500'>
                                                    <RiScales3Line className='w-5 h-5 ' />
                                                </button>

                            </div>
                        </div>
                    </div>
                )) :
                    <p className='min-h[500px] ps-10'>No items</p>
            }

        </div>
    )
}

export default ChooseCart
