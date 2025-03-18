import { Image, GridItem, Heading, HStack, VStack, Text, Flex, Box, Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from "@chakra-ui/react";
import { addToCart, fetchProducts } from '@/redux/actions/productActions';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const userId = useSelector((state) => state.auth.userId); 
    const dispatch = useDispatch();
    const navigate=useNavigate();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (id, price, title, image) => {
        if (!userId) {
            console.log("User not logged in.");
            alert("Please Login to Add Item to the Cart")
            return;
        }

        const item = { id, price, quantity: 1, image, userId };
        dispatch(addToCart(item));
        alert("Item Added to the cart")
    };

    return (
        <>
            <Heading textAlign={"center"}>Welcome to Our Ecommerce App</Heading>
            <HStack m={4}>
                {loading && <Text>Loading...</Text>}
                <Grid templateColumns="repeat(3, 1fr)" gap="6">
                    {products.length > 0 && products.map((product) => (
                        <Box bg="bg" shadow="md" borderRadius="md" key={product.id} p={4}>
                            <Image rounded="md" src={product.image} height={"100px"} />
                            <Text colorPalette={"blue"}>{product.title}</Text>
                            <Text>{product.price}</Text>
                            <Button colorPalette={"blue"} onClick={() => handleAddToCart(product.id, product.price, product.title, product.image)}>
                                Add To Cart
                            </Button>
                        </Box>
                    ))}
                </Grid>
            </HStack>
        </>
    );
};

export default Products;
