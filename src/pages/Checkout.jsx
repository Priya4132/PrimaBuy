import { useState } from "react";
import { Box, Button, Heading, VStack, HStack, Select, Text} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
    NativeSelectField,
    NativeSelectRoot,
  } from "@/components/ui/native-select"
import { useNavigate } from "react-router-dom";

function Checkout() {
    const cart = useSelector((state) => state.cart.cart);
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
const navigate=useNavigate();
    // State for form inputs
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


        // if (Object.values(formData).some((val) => val.trim() === "")) {
        //     alert("Error: Please fill in all fields.");
        //     return;
        // }
        const amount = 5;
        const currency = "INR";
        const receiptId = "qwsaq1";
      
        const paymentHandler = async (e) => {
          e.preventDefault();
          
          try {
            // ✅ Call backend to create order
            const response = await fetch("http://localhost:5000/order", {
              method: "POST",
              body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (!response.ok) {
              throw new Error(`Failed to create order: ${response.statusText}`);
            }
      
            const order = await response.json();
            console.log("Order created:", order);
      
            // ✅ Razorpay options
            var options = {
              key: "rzp_test_bEWNPZaAnEdkkv",
              amount: order.amount,
              currency,
              name: "PrimaBuy",
              description: "Test Transaction",
              image: "https://example.com/your_logo",
              order_id: order.id,
              handler: async function (response) {
                console.log("Payment response:", response);
      
                const validateRes = await fetch("http://localhost:5000/order/validate", {
                  method: "POST",
                  body: JSON.stringify(response),
                  headers: { "Content-Type": "application/json" },
                });
      
                if (!validateRes.ok) {
                  throw new Error(`Validation failed: ${validateRes.statusText}`);
                }
      
                const jsonRes = await validateRes.json();
                console.log("Validation response:", jsonRes);
                alert("Payment successful!");
                navigate("/orders")
              },
              prefill: {
                name: "Priya",
                email: "Priya@gmail.com",
                contact: "9000000000",
              },
              notes: {
                address: "Razorpay Corporate Office",
              },
              theme: { color: "#3399cc" },
            };
      
            var rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
              alert(`Payment failed: ${response.error.description}`);
            });
            rzp1.open();
          } catch (error) {
            console.error("Payment error:", error);
            alert(error.message);
          }
        };
//alert("Payment Successful! Your order has been placed.");
        // console.log("Order Data:", formData);
    

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
            
      <option value="AP">Andhra Pradesh</option>
<option value="AR">Arunachal Pradesh</option>
<option value="AS">Assam</option>
<option value="BR">Bihar</option>
<option value="CT">Chhattisgarh</option>
<option value="GA">Goa</option>
<option value="GJ">Gujarat</option>
<option value="HR">Haryana</option>
<option value="HP">Himachal Pradesh</option>
<option value="JH">Jharkhand</option>
<option value="KA">Karnataka</option>
<option value="KL">Kerala</option>
<option value="MP">Madhya Pradesh</option>
<option value="MH">Maharashtra</option>
<option value="MN">Manipur</option>
<option value="ML">Meghalaya</option>
<option value="MZ">Mizoram</option>
<option value="NL">Nagaland</option>
<option value="OD">Odisha</option>
<option value="PB">Punjab</option>
<option value="RJ">Rajasthan</option>
<option value="SK">Sikkim</option>
<option value="TN">Tamil Nadu</option>
<option value="TG">Telangana</option>
<option value="TR">Tripura</option>
<option value="UP">Uttar Pradesh</option>
<option value="UK">Uttarakhand</option>
<option value="WB">West Bengal</option>

      </NativeSelectField>
    
    </NativeSelectRoot>

                    </Box>
                </HStack>

                <label>Zip Code</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleChange} style={{ padding: "8px", borderRadius: "5px", border: "1px solid gray" }} />
            </VStack>

          

            {/* Payment Details
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
            </VStack> */}

       
            {/* Order Summary & Checkout Button */}
            <VStack spacing={3} align="stretch">
                <Text fontSize="lg" fontWeight="bold">Order Summary</Text>
                <Text>Total Items: {totalQuantity}</Text>
                <Text fontSize="lg" fontWeight="bold">Total Price: ${totalPrice}</Text>

                <Button colorScheme="blue" w="full" mt={2} onClick={paymentHandler}>
                    Proceed to Payment
                </Button>
            </VStack>
        </Box>
    );
}

export default Checkout;
