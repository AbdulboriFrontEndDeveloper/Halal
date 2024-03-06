import React, { useContext, useEffect, useState } from 'react'
import HomeSlider from '../components/HomeSlider'
import ListItems from '../components/ListItems'
import { productsContext } from '../App'
// import { instance } from '../API/API'
import { fetchAllProducts } from '../Fetches/ProductFetching'
import { useSearchParams } from 'react-router-dom'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css' 


const ProductList = () => {

  const [state, dispatch] = useContext(productsContext)
  const [isReversed, setIsReversed] = useState(true)
  const [param, _] = useSearchParams()
  // console.log(param.get('filter'));
  const filter = param.get('filter')
  const search = param.get('search')

  useEffect(() => {
    fetchAllProducts({ dispatch, filter, search })

  }, [filter, search])

  // console.log(state);

  const sortHandler = (type) => {
    setIsReversed(!isReversed)
    const sortArr = state.products.sort((a,b)=>{
        if(type === "price") {
          return a.price - b.price
        }
        else if (type === "name") {
          const nameA = a.name.toLowerCase()
          const nameB = b.name.toLowerCase()
          if(nameA < nameB) return -1
          if(nameA > nameB) return 1
          return 0
        }
    })
    if(type === "default") {
      fetchAllProducts({dispatch})
    }
    else if(isReversed) {
      dispatch({type:"PRODUCT_LIST", payload:sortArr})
    }
    else{
      dispatch({type:"PRODUCT_LIST", payload:sortArr.reverse()})
    }
  }

  return (
    <div className='min-h-[70vh] w-full'>
      <div className="main-container mt-10 ">
        <HomeSlider />

      </div>
      <div className='flex flex-col sm:flex-row gap-3 main-container justify-between items-center mt-10'>
        <div className='text-lg font-bold'>Filtered Product:</div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => sortHandler("default")} className='border rounded p-2 '>Default order</button>
          <button onClick={() => sortHandler("price")} className='border rounded p-2 '>Price order</button>
          <button onClick={() => sortHandler("name")} className='border rounded p-2 '>Name order</button>
        </div>
      </div>
      <ListItems list={state?.products} />




    </div>
  )
}

export default ProductList
