export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";

export const addToCart = (product, userId) => {
    return {
        type: ADD_TO_CART,
        payload: { ...product, userId }
    };
};

export const updateCartQuantity = (id, amount, userId) => ({
    type: UPDATE_CART_QUANTITY,
    payload: { id, amount, userId },  // Include userId
});

export const removeFromCart = (id, userId) => ({
    type: REMOVE_FROM_CART,
    payload: { id, userId },  // Include userId
});
