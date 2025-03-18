import { Box, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Banner from '../assets/Banner.png'
import { motion } from "framer-motion";


const BannerPage = () => {
   const userId = useSelector((state) => state.auth.userId); 
    //const userDetails=JSON.parse(localStorage.getItem("user"))||[];
  const navigate = useNavigate();
  const MotionHeading = motion(Heading);
  const handleStart=()=>{
    if(!userId){
      
        navigate("/stories")
    }
   
  }
  return (
    <Box
      bgGradient="linear(to-r, teal.500, blue.500)"
      
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={4}
    >
      <VStack spacing={6} maxW="lg">
        <Image mt={"10px"} src= {Banner} alt="Banner Image" borderRadius="lg" boxSize="500px" objectFit="cover" />
        <MotionHeading 
          size="2xl" 
          color={"blue.800"}
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 10 }}
        >
          Welcome to My E-Commerce Website
        </MotionHeading>
      
        <Button colorScheme="teal" bg={"red.500"} size="lg" onClick={handleStart}>Start Exploring Products</Button>
      </VStack>
    </Box>
  );
};

export default BannerPage;
