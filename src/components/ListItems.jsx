import React, { useContext, useState } from 'react'
import Checked from './Checked'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiScales3Line } from "react-icons/ri";
import { RiHeartLine } from "react-icons/ri";
import { productsContext } from '../App';
import { Link } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import ReactSceleton from './skeleton/ReactSceleton';
import Modal from './Modal';

// import cardImg from '../assets/comp.jpg'
const ListItems = ({ list, remove }) => {
    // console.log(list);

    const [state, dispatch] = useContext(productsContext)
    const [modal, setModal] = useState(false)

    const toggleHandler = (store, dispatchType, item) => {

        item = { ...item, count: 1 }
        let dataFromLS = JSON.parse(localStorage.getItem(store)) || []
        const el = dataFromLS?.find(elem => elem.id === item.id)
        if (el) {
            const FilteredArr = dataFromLS.filter(elem => elem.id !== item.id)
            localStorage.setItem(store, JSON.stringify(FilteredArr))
            dispatch({ type: dispatchType, payload: FilteredArr })
        }
        else {
            localStorage.setItem(store, JSON.stringify([...dataFromLS, item]))
            dispatch({ type: dispatchType, payload: [...dataFromLS, item] })
        }
    }

    const quantityHandler = (ishora, item) => {
        let dataFromLS = JSON.parse(localStorage.getItem('cart')) || []
        const el = dataFromLS?.find(card => ((card.id === item.id) ? item : ""))
        // console.log(el);
        if (el !== undefined) {
            if (ishora) {
                el.count = el.count + 1
            }
            else {
                el.count = el.count !== 1 ? el.count - 1 : 1
            }
            dataFromLS.forEach(card => { card.id === item.id ? card.count = el.count : "" })
            localStorage.setItem("cart", JSON.stringify(dataFromLS))
            dispatch({ type: "UPDATE_CART", payload: dataFromLS })
        }
        else {
            item = { ...item, count: 1 }
            localStorage.setItem("cart", JSON.stringify([...dataFromLS, item]))
            dispatch({ type: "UPDATE_CART", payload: [...dataFromLS, item] })
        }
        setModal(true)
    }

    // console.log(list);
    return (
        <div className='main-container mt-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6'>

            {
                modal && <Modal setModal={setModal} />
            }

            {
                state.loading ?
                    <ReactSceleton card={8} />
                    :
                    list?.length ?
                        list.map((item, i) => {
                            return (
                                <div key={i} className="overflow-hidden flex flex-col shadow sm:rounded-lg hover:shadow-xl transition-all relative">
                                    <Link to={`/product/${item.slug}`} className="relative cursor-pointer">
                                        <div className="absolute bottom-0 left-0 rounded text-sm bg-green-500 text-white px-1">{item?.type}</div>
                                        <img className='w-full aspect-square object-cover object-center' src={item?.images[0]} alt="" />
                                        <Checked cardId={item.id} />
                                    </Link>
                                    <div className="p-2 sm:p-4 relative flex flex-col gap-2 flex-1 border ">
                                        <Link to={`/product/${item.slug}`} className="text-slate-900 sm:text-lg font-semibold sm:font-bold cursor-pointer">{item?.name}
                                        </Link>
                                        <div>
                                            <p className={`${item.discount !== 0 ? 'inline' : 'hidden'} text-gray-400 text-xs sm:text-sm block `}>Discount:  <span className='text-red-500 line-through font-semibold ml-3 '><span>$</span> {(item?.discount).toFixed(2)} </span></p>
                                            <p className='text-gray-400 text-xs sm:text-sm block '>Price:  <span className='text-green-500 text-sm sm:text-lg font-semibold ml-3 '> <span>$</span> {(item?.price).toFixed(2)}</span></p>
                                            <p className='text-gray-400 text-xs sm:text-sm block '>Category:  <span className='text-slate-900 font-semibold ml-3 '>{item?.category?.name}</span></p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 mt-auto ">
                                            <button onClick={() => quantityHandler(true, item)} className='bg-green-500 gap-2 flex items-center justify-center transition-all hover:bg-green-500 text-white rounded-md p-1 sm:py-2 flex-1 '>
                                                <HiOutlineShoppingCart className='w-5 h-5 ' />
                                                <span className='text-sm sm:text-base'>Buy</span>
                                            </button>
                                            <div className='flex gap-2 '>
                                                <button onClick={() => toggleHandler("wishlist", "UPDATE_WISHLIST", item)} className='bg-red-500 hover:bg-red-600 transition-all flex-1 flex items-center justify-center text-white p-1 sm:p-2'>
                                                    {
                                                        remove === "wishlist" ? <IoCloseSharp />
                                                            :
                                                            <RiHeartLine className='w-5 h-5 ' />
                                                    }
                                                </button>
                                                <button onClick={() => toggleHandler("scale", "UPDATE_SCALE", item)} className='bg-amber-400 hover:bg-amber-500 transition-all flex-1 flex items-center justify-center text-white p-1 sm:p-2'>
                                                    <RiScales3Line className='w-5 h-5 ' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : <p className='min-h-[500px] ps-10'>No items...</p>
            }

        </div>
    )
}

export default ListItems
