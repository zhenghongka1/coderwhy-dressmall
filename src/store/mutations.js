export default {
    addCount(state, payload) {
        payload.count++
    },
    addToCart(state, payload) {
        payload.ischeck = true
        state.cartList.push(payload)
    }
}