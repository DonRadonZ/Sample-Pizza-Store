import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartStateProps, ICartItem } from "../../types/types";
import { RootState } from "../../store";

const initialState:CartStateProps = {
    cart: [],
    // cart: [
    //     {
    //         pizzaId: 12,
    //         name: 'Mediterranean',
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32,
    //     },
    // ],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ICartItem>) {
            // payload = newItem
            state.cart.push(action.payload)
        },
        deleteItem(state, action: PayloadAction<number>) {
            // payload = pizzaId
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action: PayloadAction<number>) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            if (item) {
                item.quantity++;
                item.totalPrice = item.quantity * item.unitPrice;
            }
        },
        decreaseItemQuantity(state, action: PayloadAction<number>) {
            const item = state.cart.find(item => item.pizzaId === action.payload);
            if (item) {
                item.quantity--;
                item.totalPrice = item.quantity * item.unitPrice;
                if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action); 
            }
        },
        clearCart(state) {
            state.cart = [];
        },
    }
});

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: RootState) => state.cart.cart;

export const getTotalCartQuantity = (state: RootState) => (
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
);

export const getTotalCartPrice = (state: RootState) => (
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
);

export const getCurrentQuantityById = (pizzaId: number) => (state: RootState) => (
    state.cart.cart.find(item => item.pizzaId === pizzaId)?.quantity ?? 0);


// 'reselect'