import { logout } from '@/redux/actions/authActions';
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Orders from '@/pages/Orders';

const Navbar = () => {
 const userId = useSelector((state) => state.auth.userId);
 const dispatch=useDispatch();
 const navigate=useNavigate();
  const handleLogout = () => {
         dispatch(logout());
         navigate("/"); // Redirect to home after logout
     };
 
  return (
    <Flex justifyContent={"space-around"} bg={"blue.200"} p={2}
    >
       <Link to="/" >PrimaBuy</Link> 
       {/* <Link to="/">Home</Link>  */}
     {
      userId? (<Link><Button onClick={handleLogout}> Logout</Button></Link>):(<Link to="/login">Login</Link> )
     }  
       <Link to="/products">Products</Link>

{
  userId &&  <Link to="/cart">Cart</Link>}
  
  {
    userId &&  <Link to="/orders">Orders</Link>
    
  }
      
    </Flex>
  )
}

export default Navbar
