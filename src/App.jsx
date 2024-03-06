import React, { createContext, useEffect, useReducer } from 'react'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Nomatch from './pages/notFoundRoute/Nomatch'
import { reducer } from './reducer/reducer'
import { ToastContainer } from 'react-toastify'
import Detail from './pages/Detail'
import Wishlist from './pages/Wishlist'
import Scale from './pages/Scale'
import Discount from './pages/Discount'
import Contact from './pages/Contact'
import { fetchDiscount } from './Fetches/ProductFetching'
import Cart from './pages/Cart'
// import parse from 'html-react-parser';
// import Wishlist from './pages/Wishlist'

export const productsContext = createContext()

const initialValue = {
  products: [],
  categories: [],
  detail: [],
  wishlist: [],
  cart: [],
  scale: [],
  allPrice: 0,
  contact:[],
  discount:[],
  loading: true,

}


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialValue)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    const scale = JSON.parse(localStorage.getItem("scale")) || []
    dispatch({ type: "UPDATE_CART", payload: cart })
    dispatch({ type: "UPDATE_WISHLIST", payload: wishlist })
    dispatch({ type: "UPDATE_SCALE", payload: scale })
    fetchDiscount(dispatch)
  }, [])

  return (
    <productsContext.Provider value={[state, dispatch]}>

      <div className='flex flex-col h-full'>

        <ToastContainer
          position='top-right'
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/product/:detailSlug' element={<Detail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wish-list' element={<Wishlist />} />
          <Route path='/compare' element={<Scale />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/discount' element={<Discount />} />
          <Route path='*' element={<Nomatch />} />
        </Routes>
        <Footer />
      </div>
    </productsContext.Provider>
  )
}

export default App
