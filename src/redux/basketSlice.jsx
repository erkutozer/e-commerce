import { createSlice } from '@reduxjs/toolkit'

const getBasketFromStorage = () => {
    if (localStorage.getItem('basket')) {
        return JSON.parse(localStorage.getItem('basket'));
    } else {
        return [];
    }
}

const initialState = {
    basket: getBasketFromStorage(),
    totalPrice: 0,
    drawer: false
}

const writeBasketToStorage = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket));
}


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.basket && state.basket.find(product => product.id == action.payload.id);
            if (findProduct) {
                const otherProduct = state.basket.filter(product => product.id != action.payload.id);
                state.basket = [...otherProduct, findProduct];
            } else {
                state.basket = [...state.basket, action.payload];
            }
            writeBasketToStorage(state.basket);
        },
        calculateTotalPrice: (state) => {
            state.totalPrice = state.basket && state.basket.reduce((total, product) => {
                return total + (product.count) * (product.price)
            }, 0)
        },
        changeDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        deleteProductFromBasket: (state, action) => {
            state.basket = state.basket && state.basket.filter(product => product.id != action.payload.id);
            writeBasketToStorage(state.basket);
        }
    }
})

export const { addToBasket, calculateTotalPrice, changeDrawer, deleteProductFromBasket } = basketSlice.actions;
export default basketSlice.reducer;