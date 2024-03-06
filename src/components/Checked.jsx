import React from 'react'
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiHeartLine } from "react-icons/ri";
import { RiScales3Line } from "react-icons/ri";

const Checked = ({ cardId }) => {

    const cart = JSON.parse(localStorage.getItem("cart"))
    const isInCart = cart?.find(elem => elem.id === cardId)

    const wishList = JSON.parse(localStorage.getItem("wishlist"))
    const isInWishlist = wishList?.find(elem => elem.id === cardId)

    const scale = JSON.parse(localStorage.getItem("scale"))
    const isInScale = scale?.find(elem => elem.id === cardId)

    return (
        <div className='flex flex-col gap-2 text-white absolute right-2 top-2 '>
            {
                isInCart && (
                    <div className="bg-green-500 rounded-full">
                        <HiOutlineShoppingCart className='w-5 h-5 ' />
                    </div>
                )
            }
            {isInWishlist && (
                <div className="bg-red-500 rounded-full">
                    <RiHeartLine className='w-5 h-5 ' />
                </div>
            )}
            {
                isInScale && (
                    <div className="bg-amber-500 rounded-full">
                        <RiScales3Line className='w-5 h-5 ' />
                    </div>
                )
            }

        </div>
    )
}

export default Checked
