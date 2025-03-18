import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux"
import { authReducers } from "./reducers/authReducers"
import { thunk } from "redux-thunk"
import { productReducer } from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";



const rootReducer=combineReducers({
    auth:authReducers,
    products:productReducer,
    cart: cartReducers,
  
})
export const store=createStore(rootReducer, applyMiddleware(thunk));