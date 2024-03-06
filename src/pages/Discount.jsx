import React, { useContext, useEffect } from 'react'
import { productsContext } from '../App'
import { fetchDiscount } from '../Fetches/ProductFetching'
import ListItems from '../components/ListItems'

const Discount = () => {
    const [state, dispatch] = useContext(productsContext)
    // console.log(state.discount);
    useEffect(() => {
      fetchDiscount(dispatch)
    }, [])
    
  return (
    <div className='min-h-screen'>
      <ListItems list={state.discount} />
        
    </div>
  )
}

export default Discount