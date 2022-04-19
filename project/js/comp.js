Vue.component('products-list', {
    props: ['products', 'img'],
    template: `
        <div class="products">
            <product-item v-for="item in products" :product="item" :img="img" :key="item.id_product"></product-item>
        </div>
        `
});

Vue.component('product-item', {
    props: ['product', 'img'],
    template: `
            <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}</p>
                    <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                </div>
            </div>
            `
})

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

Vue.component('comp-filter', {
    template: `
            <form action="#" class="search-form" @submit.prevent="$root.filter">
                <input type="text" class="search-field" 
                v-model="$parent.userSearch">
                <button type="submit" class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
})

Vue.component('comp-error', {
    props: ['error'],
    template: `
            <h3 v-show='error'>Не удается выполнить запрос к серверу</h3>
            `
})



