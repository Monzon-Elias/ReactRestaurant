/** When you click on the add button, it dispatches an action
that calls a reducer function that modifies the slice of our redux store (cart).
How to read data? We use a selector. The selector reads data
from our store and presented it on our cart component. 
We say that our cart component is subscribed to our store through a selector.
*/
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => {
                const itemId = item.card?.info?.id || item.dish?.info?.id;
                const newItemId = newItem.card?.info?.id || newItem.dish?.info?.id;
                return itemId === newItemId;
            });
            
            if (existingItem) {
                // Si el item ya existe, solo incrementar la cantidad
                existingItem.quantity += 1;
            } else {
                // Si es nuevo, agregarlo con cantidad 1
                state.items.push({
                    ...newItem,
                    quantity: 1
                });
            }
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            const existingItem = state.items.find(item => {
                const itemIdToFind = item.card?.info?.id || item.dish?.info?.id;
                return itemIdToFind === itemId;
            });
            
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    // Remover el item completamente
                    state.items = state.items.filter(item => {
                        const itemIdToFilter = item.card?.info?.id || item.dish?.info?.id;
                        return itemIdToFilter !== itemId;
                    });
                }
            }
        },
        clearCart: (state, action) => {
            state.items = [];
        },
        getTotalPrice: (state, action) => {
            return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    }
});

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;