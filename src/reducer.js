export const initialState = {
    basket:[],
    user : null
};

//selector
export const getBasketTotal = (basket) =>
//reduce iterate through each item akhir mein zero khrha ha ke amount ko zero se initialize karo
    basket?.reduce((amount,item) => item.price + amount , 0)

const reducer = (state , action) => {

    switch(action.type ){
        case "ADD_TO_BASKET":
            
            return{
                ...state,
                basket:[...state.basket,action.item]
            };
        case "EMPTY_BASKET":
            return{
                ...state,
                basket:[]
            };
        case "REMOVE_FROM_BASKET":
             const index = state.basket.findIndex(
                 (basketItem) => basketItem.id === action.id
             );

             let newBasket = [...state.basket];

             if(index >= 0){
                 newBasket.splice(index,1);

             }else{
                 console.warn("can't remove product");
             }

             return{
                 ...state,
                 basket:newBasket
             }
             case "SET_USER":
                 return {
                     ...state,
                     user:action.user
                 }

        default:
            return state;
    }
}
export default reducer;