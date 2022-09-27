import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from "../../cartItems"
import { openModal } from "../modal/modalSlice";

const url = "https://course-api.com/react-useReducer-cart-project"

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async(name, thunkAPI) => {
    try {
        // // ARAŞTIRILACAK ÖZELLİKLER!!!
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal())
        const resp = await axios(url)
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong")
    }
})
//     fetch 404 error'u error olarak görmediği için axios kullanılacak
// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//     return
//     fetch(url).then(resp => resp.json()).catch((err) => console.log(err))
// })

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        increase: (state, action) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload);
            cartItem.amount += 1
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount -= 1
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers:{
        [getCartItems.pending]:(state) => { state.isLoading = true },
        [getCartItems.fulfilled]:(state, action) => { state.isLoading = false; state.cartItems = action.payload },
        [getCartItems.rejected]:(state, action) => { console.log(action); state.isLoading = false },
    }
});

console.log(cartSlice.reducer)

export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions;

export default cartSlice.reducer;