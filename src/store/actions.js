export default {
    // 因为mutatons方法应该尽可能的单一，如果方法里有判断逻辑的语句，那么就放到actions
    addCart(content, payload) {
        return  new Promise((resolve,reject) => {
            let oldProduct = content.state.cartList.find(item => item.iid === payload.iid)

            if (oldProduct) {
                content.commit('addCount', oldProduct)
                resolve('商品添加成功+1')
            } else {
                payload.count = 1
                content.commit('addToCart', payload)
                resolve('商品数量添加成功啦宝')
            }
        })
       
    }
}
