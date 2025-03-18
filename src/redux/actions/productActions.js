import axios from "axios";

export const FETCH_PRODUCTS_SUCCESS="FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE="FETCH_PRODUCTS_FAILURE";
export const FETCH_PRODUCTS_LOADING="FETCH_PRODUCTS_LOADING";
export const ADD_TO_CART="ADD_TO_CART";


export const fetchProducts=()=>async(dispatch)=>{
    dispatch({type:FETCH_PRODUCTS_LOADING});
    try{
const response=await axios.get("https://fakestoreapi.com/products");
dispatch({type:FETCH_PRODUCTS_SUCCESS, payload:response.data})
    }catch(err){
        dispatch({type:FETCH_PRODUCTS_FAILURE, payload:err.message})
    }
}
export const addToCart=(item)=>{
  
    return {
        type:ADD_TO_CART,
        payload:item
    }
 
  
}

