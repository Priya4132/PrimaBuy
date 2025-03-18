import { login, register } from '@/redux/actions/authActions';
import { Box ,Button,Input,Text} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    //state for email and password
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    //handle register

    const handleLogin=()=>{
        dispatch(login(email,password));
        navigate("/");//redirecting to Login Page
        


    }
  return (
   <Box width={"50%"} m={"10px auto"}>
    <Text textAlign={"center"}>Login</Text>
    <Input type="text" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
    <Input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
<Button onClick={handleLogin} color={"white"} bg={"blue"} m={2} 

>Login</Button>
<Text textAlign="center" mt={2}>
            Don't have an account? <Button variant="link" color="blue.700" colorScheme="blue" onClick={() => navigate("/register")}>Register</Button>
        </Text>
   </Box>
  )
}

export default Login
