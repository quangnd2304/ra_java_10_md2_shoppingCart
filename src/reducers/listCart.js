import { BUY_PRODUCT, DELETE_CART, UPDATE_CART } from "../constants/actionType";
import { SHOP_CARTS } from "../constants/shoppingCart";
let initialState = [];
// Giỏ hàng được lưu trong localStorage với tên là SHOP_CARTS
//-Lấy giỏ hàng của khách hàng trong localStorage
let carts = JSON.parse(localStorage.getItem(SHOP_CARTS));
initialState = (carts != null && carts.length != 0) ? carts : initialState;
//Hàm kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
const getIndexProduct = (productId, listCarts) => {
    for (let i = 0; i < listCarts.length; i++) {
        if (listCarts[i].product.productId == productId) {
            return i;
        }
    }
    return -1;
}
const listCart = (state = initialState, action) => {
    switch (action.type) {
        case BUY_PRODUCT:
            let index = getIndexProduct(action.payload.product.productId, state);
            if (index >= 0) {
                // Sản phẩm đã có trong giỏ hàng --> tăng số lượng              
                state[index].quantity += parseInt(action.payload.quantity);
            } else {
                // Sản phẩm chưa có trong giỏ hàng --> add thêm vào
                state = [...state, { product: action.payload.product, quantity: action.payload.quantity }]
            }
            //set giỏ hàng vào localStorage
            localStorage.setItem(SHOP_CARTS, JSON.stringify(state));
            return [...state];
        case UPDATE_CART:
            let { productId, quantity } = action.payload;
            let indexUpdate = getIndexProduct(productId, state);
            state[indexUpdate].quantity = quantity;
            //set giỏ hàng vào localStorage
            localStorage.setItem(SHOP_CARTS, JSON.stringify(state));
            return [...state];
        case DELETE_CART:
            let indexDelete = getIndexProduct(state.payload, state);
            state.splice(indexDelete, 1);
            return [...state];
        default:
            return state;
    }

}
export default listCart;