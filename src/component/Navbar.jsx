import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Navbar = () => {
 const userId = useSelector((state) => state.auth.userId); 
  return (
    <Flex justifyContent={"space-around"} bg={"blue.200"} p={2}
    >
       <Link to="/" >PrimaBuy</Link> 
       {/* <Link to="/">Home</Link>  */}
       <Link to="/login">Login</Link> 
       <Link to="/products">Products</Link>

{
  userId &&  <Link to="/cart">Cart</Link>
}
      
    </Flex>
  )
}

export default Navbar
