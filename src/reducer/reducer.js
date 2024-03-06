export const reducer = (state, action) => {
    if(action.type === "PRODUCT_LIST") return {...state, products: action.payload, loading: false}

    if(action.type === "CATEGORY_LIST") return {...state, categories: action.payload, loading: false}

    if(action.type === "FETCH_DETAIL") return {...state, detail: action.payload, loading: false}

    if(action.type === "CONTACT") return {...state, contact: action.payload, loading: false}

    if(action.type === "DISCOUNT") return {...state, discount: action.payload, loading: false}

    if(action.type === "UPDATE_WISHLIST") return {...state, wishlist: action.payload}

    if(action.type === "UPDATE_CART") return {...state, cart: action.payload}

    if(action.type === "UPDATE_SCALE") return {...state, scale: action.payload}
    
    if(action.type === "LOADING") return {...state, loading: true}

    if(action.type === "ALL_PRICE") return {...state, allPrice: action.payload}

    return state 
} 
