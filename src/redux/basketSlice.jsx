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
    drawer: false
}

const writeBasketToStorage = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket));
}

export const selectTotalPrice = (state) =>
    state.basket.basket.reduce((total, product) => total + (product.price) * (product.count), 0);

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.basket && state.basket.find(product => product.id == action.payload.id);
            if (findProduct) {
                findProduct.count += action.payload.count;
            } else {
                state.basket.push(action.payload);
            }
            writeBasketToStorage(state.basket);
        },
        changeDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        deleteProductFromBasket: (state, action) => {
            state.basket = state.basket && state.basket.filter(product => product.id != action.payload.id);
            writeBasketToStorage(state.basket);
        },
        increaseCount: (state, action) => {
            const product = state.basket.find(product => product.id == action.payload.id);
            if (product) {
                product.count += 1;
                writeBasketToStorage(state.basket);
            }
        },
        decreaseCount: (state, action) => {
            const product = state.basket.find(product => product.id == action.payload.id);
            if (product && product.count > 1) {
                product.count -= 1;
                writeBasketToStorage(state.basket);
            }
        }
    }
})

export const { addToBasket, changeDrawer, deleteProductFromBasket, increaseCount, decreaseCount } = basketSlice.actions;
export default basketSlice.reducer;