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




