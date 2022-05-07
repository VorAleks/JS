Vue.component('cart-block', {
    props: ['goods', 'img', 'visibility'],
    template: `
        <div class="cart-block" v-show="visibility">
            <p v-if="!goods.length">Cart is empty</p>
            <goods-item v-for="good in goods" :item="good" :img="img" :key="good.id_product"></goods-item>
        </div>
        `
});

Vue.component('goods-item', {
    props: ['item', 'img'],
    template: `
    <div class="cart-item" >
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ item.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ item.quantity }}</div>
                            <div class="product-single-price">$ {{ item.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{item.quantity*item.price}}</div>
                        <button class="del-btn" @click="$root.remove(item)">&times;</button>
                    </div>
                </div>
            `
})


