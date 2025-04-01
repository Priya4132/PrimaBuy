import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../redux/actions/cartActions";
import { Box, Button, Heading, Text, VStack, HStack, Image,  Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Cart() {
    const userId= useSelector((state) => state.auth.userId); // Get logged-in user ID
    const cart = useSelector((state) => state.cart.cart.filter(item => item.userId === userId));
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const handleIncrease = (id) => {
        dispatch(updateCartQuantity(id, 1, userId)); // Pass userId
    };

    const handleDecrease = (id, quantity) => {
        if (quantity > 1) {
            dispatch(updateCartQuantity(id, -1, userId)); // Pass userId
        } else {
            dispatch(removeFromCart(id, userId)); // Remove only if quantity is 1
        }
    };

    // Calculate total quantity and total price
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const handleCheckout = () => {
        alert("Proceeding to checkout..."); 
        navigate("/checkout");
        // You can replace this with navigation to a checkout page or payment gateway logic
    };

    return (
        <Box maxW="800px" mx="auto" p={5}>
            <Heading as="h2" size="lg" mb={4} textAlign="center">
                Cart
            </Heading>

            {cart.length === 0 ? (
                <Text textAlign="center" fontSize="lg" color="gray.600">
                    No items in cart
                </Text>
            ) : (
                <HStack align="start" spacing={8}>
                    {/* Product List */}
                    <VStack spacing={4} align="stretch" flex="2">
                        {cart.map((item) => (
                            <Box key={item.id} p={4} borderWidth="1px" borderRadius="md" shadow="md">
                                <HStack justifyContent="space-between">
                                    <Box>
                                        <Text fontWeight="bold" fontSize="lg">{item.name}</Text>
                                        <Image rounded="md" src={item.image} height="100px" alt={item.name} />
                                        <Text color="blue.500">{item.title}</Text>
                                        <Text>Price: ${item.price}</Text>

                                        <HStack mt={2}>
                                            <Text>Quantity:</Text>
                                            <Button 
                                                size="sm" 
                                                color={"white"}
                                                onClick={() => handleDecrease(item.id, item.quantity)}
                                            >-</Button>
                                            <Text>{item.quantity}</Text>
                                            <Button 
                                                size="sm" 
                                                color={"white"}
                                                onClick={() => handleIncrease(item.id)}
                                            >+</Button>
                                        </HStack>
                                    </Box>
                                    <Button 
                                        colorScheme="red" 
                                        size="sm" 
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        Remove
                                    </Button>
                                </HStack>
                            </Box>
                        ))}
                    </VStack>

                    {/* Total Summary & Checkout on the Right */}
                    <VStack spacing={4} align="stretch" flex="1">
                        <Box p={4} borderWidth="1px" borderRadius="md" shadow="md">
                            <Text fontSize="lg" fontWeight="bold">Total Items: {totalQuantity}</Text>
                            <Text fontSize="lg" fontWeight="bold">Total Price: ${totalPrice}</Text>
                           
                            <Button  
                                bg={"blue"}
                                size="md" 
                                w="full" 
                                mt={2} 
                                onClick={handleCheckout}
                            >
                                Checkout
                            </Button>
                        </Box>
                    </VStack>
                </HStack>
            )}
        </Box>
    );
}

export default Cart;
