export const initialState = {
    basket : [],
    user : null,
};

export const getBasketTotal = (basket) => {
    console.log(basket)
    return basket?.reduce((amount , item) => parseFloat(item.price) + amount, 0);
};

const reducer = (state , action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_BASKET':
            return {
                ...state,
                basket: [...state.basket , action.item]
            };
        case 'REMOVE_BASKET' :
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
            console.log(index)
            let newBasket = [...state.basket];

            if(index >= 0) {
                newBasket.splice(index , 1);
            }else{
                console.warn("Cant remove item id doesn't have it")
            }

            return {
                ...state,
                basket: newBasket
            }
        case 'EMPTY_BASKET' :
            return {
                ...state,
                basket: [],
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default reducer;