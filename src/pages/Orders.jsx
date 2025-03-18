import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Orders() {
    const cart = useSelector((state) => state.cart.cart);
    const userId =useSelector((state) => state.auth.userId);
    const userEmail = useSelector((state) => state.auth.email);
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    const navigate = useNavigate();

    return (
        <Box maxW="600px" mx="auto" p={5} borderWidth="1px" borderRadius="md" shadow="md" textAlign="center">
            <Heading>Order Confirmation</Heading>
            <Text fontSize="lg" mt={2}>Thank you for your purchase! Your order has been placed successfully.</Text>
            
            {/* Order Summary */}
            <VStack spacing={3} align="stretch" mt={5}>
                <Text fontSize="lg" fontWeight="bold">Order Summary</Text>
                <Text>User ID: {userId}</Text>
                <Text>Email: {userEmail}</Text>
                <Text>Total Items: {totalQuantity}</Text>
                <Text fontSize="lg" fontWeight="bold">Total Price: ${totalPrice}</Text>
            </VStack>
            
            <Button colorScheme="blue" mt={5} onClick={() => navigate("/")}>Return to Home</Button>
        </Box>
    );
}

export default Orders;
