import React, { useContext } from 'react'
import { productsContext } from '../App'
import ListItems from '../components/ListItems'

const Wishlist = () => {
    const [{wishlist}, _] = useContext(productsContext)
    // console.log(Wishlist);
  return (
    <div className='min-h-screen'>
      <ListItems list={wishlist} remove={"wishlist"} />
    </div>
  )
}

export default Wishlist
