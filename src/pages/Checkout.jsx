import { useState } from "react";
import { Box, Button, Heading, VStack, HStack, Select, Text} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
    NativeSelectField,
    NativeSelectRoot,
  } from "@/components/ui/native-select"

function Checkout() {
    const cart = useSelector((state) => state.cart.cart);
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    // State for form inputs
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = () => {
        if (Object.values(formData).some((val) => val.trim() === "")) {
            alert("Error: Please fill in all fields.");
            return;
        }

        alert("Payment Successful! Your order has been placed.");
        console.log("Order Data:", formData);
    };

    return (
        <Box maxW="600px" mx="auto" p={5} borderWidth="1px" borderRadius="md" shadow="md">
            <Heading textAlign="center">Checkout</Heading>

            {/* Shipping Details */}
            <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="bold">Shipping Address</Text>

                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" style={{ padding: "8px", borderRadius: "5px", border: "1px solid gray" }} />

                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" style={{ padding: "8px", borderRadius: "5px", border: "1px solid gray" }} />

                <HStack>
                    <Box flex="1">
                        <label>City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid gray" }} />
                    </Box>
                    <Box flex="1">
                        <label>State</label>
                        {/* <Select name="state" value={formData.state} onChange={handleChange} placeholder="Select State">
    <option value="">Select state</option>
    <option value="NY">New York</option>
    <option value="CA">California</option>
    <option value="TX">Texas</option>
</Select> */}

<NativeSelectRoot size="sm" width="240px">
      <NativeSelectField placeholder="Select option"  onChange={handleChange}>
      <option value="NY">India</option>       
    <option value="NY">New York</option>
    <option value="CA">California</option>
    <option value="TX">Texas</option>
      </NativeSelectField>
    
    </NativeSelectRoot>

                    </Box>
                </HStack>

                <label>Zip Code</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleChange} style={{ padding: "8px", borderRadius: "5px", border: "1px solid gray" }} />
            </VStack>

          

            {/* Payment Details */}
            <VStack spacing={4} align="stretch">
                <Text fontSize="lg" fontWeight="bold">Payment Details</Text>

                <label>Card Number</label>
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" style={{ padding: "8px", borderRadius: "5px", border: "1px solid gray" }} />

                <HStack>
                    <Box flex="1">
                        <label>Expiry Date</label>
                        <input type="text" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid gray" }} />
                    </Box>
                    <Box flex="1">
                        <label>CVV</label>
                        <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid gray" }} />
                    </Box>
                </HStack>
            </VStack>

       
            {/* Order Summary & Checkout Button */}
            <VStack spacing={3} align="stretch">
                <Text fontSize="lg" fontWeight="bold">Order Summary</Text>
                <Text>Total Items: {totalQuantity}</Text>
                <Text fontSize="lg" fontWeight="bold">Total Price: ${totalPrice}</Text>

                <Button colorScheme="blue" w="full" mt={2} onClick={handlePayment}>
                    Proceed to Payment
                </Button>
            </VStack>
        </Box>
    );
}

export default Checkout;
