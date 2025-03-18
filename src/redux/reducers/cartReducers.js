import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../actions/cartActions";

// Load cart from local storage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialCartState = { cart: loadCartFromStorage() };

export const cartReducers = (state = initialCartState, action) => {
    let updatedCart;

    switch (action.type) {
        case ADD_TO_CART:
            const { id, userId } = action.payload;
            const existingItem = state.cart.find(item => item.id === id && item.userId === userId);
            
            if (existingItem) {
                updatedCart = state.cart.map(item =>
                    item.id === id && item.userId === userId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return { ...state, cart: updatedCart };

        case REMOVE_FROM_CART:
            updatedCart = state.cart.filter(item => !(item.id === action.payload.id && item.userId === action.payload.userId));
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return { ...state, cart: updatedCart };

            case UPDATE_CART_QUANTITY:
                updatedCart = state.cart.map(item =>
                    item.id === action.payload.id && item.userId === action.payload.userId
                        ? { ...item, quantity: item.quantity + action.payload.amount }
                        : item
                );
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { ...state, cart: updatedCart };
            

        default:
            return state;
    }
};
