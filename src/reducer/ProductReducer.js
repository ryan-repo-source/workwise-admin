const ProductReducer = (state, action) => {
    switch (action.type) {
        case "JOBS":
            return {
                ...state,
                jobs: action.payload,
                isloading: false,
            }
        default:
            return state;
    }
}

export default ProductReducer;