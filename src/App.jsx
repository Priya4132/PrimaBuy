import React from 'react'
import Navbar from './component/Navbar'
import { Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'

const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/products' element={<Products/>} ></Route>
      <Route path='/cart' element={<Cart/>} ></Route>
      <Route path='/checkout' element={<Checkout/>} ></Route>
      <Route path='/orders' element={<Orders/>} ></Route>
      </Routes>
      </>
  )
}

export default App
