Vue.component('cart-block', {
    data() {
        return {
            countGoods: 0,
            cartItems: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                this.$data.countGoods = data.countGoods;
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            // this.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if (data.result === 1) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);//создание нового объекта на основе двух, указанных в параметрах
                // item.imgPath = `img/${item.id_product}.jpg`;
                // this.cartItems.push(prod)
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
            //     }
            // })
        },
        remove(item) {
            // this.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if (data.result === 1) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            item.quantity--;
                        }
                    })
            } else {
                this.$parent.removeJson(`/api/cart/${item.id_product}`, item)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        } else {
                            console.log('error');
                        }
                    })
            }
            //     }
            // })
        },
    },
    template: `
        <section class="cart-block" v-show="$root.$refs.header.showCart">
        <div class="cart__container">
            <h3>Cart</h3>
            <p class="cart__container--empty" v-if="!cartItems.length">Empty</p>
            <cart-item v-for="item of cartItems" 
            :key="item.id_product"
            :item="item"
            @remove="remove"></cart-item>
        </div>
        <div class="nav__icon-close">
            <button @click="$root.$refs.header.showCart = !$root.$refs.header.showCart">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.4158 6.00409L11.7158 1.71409C11.9041 1.52579 12.0099 1.27039 12.0099 1.00409C12.0099 0.73779 11.9041 0.482395 11.7158 0.294092C11.5275 0.105788 11.2721 0 11.0058 0C10.7395 0 10.4841 0.105788 10.2958 0.294092L6.0058 4.59409L1.7158 0.294092C1.52749 0.105788 1.2721 -1.9841e-09 1.0058 0C0.739497 1.9841e-09 0.484102 0.105788 0.295798 0.294092C0.107495 0.482395 0.0017066 0.73779 0.0017066 1.00409C0.0017066 1.27039 0.107495 1.52579 0.295798 1.71409L4.5958 6.00409L0.295798 10.2941C0.20207 10.3871 0.127676 10.4977 0.0769072 10.6195C0.0261385 10.7414 0 10.8721 0 11.0041C0 11.1361 0.0261385 11.2668 0.0769072 11.3887C0.127676 11.5105 0.20207 11.6211 0.295798 11.7141C0.388761 11.8078 0.499362 11.8822 0.621222 11.933C0.743081 11.9838 0.873786 12.0099 1.0058 12.0099C1.13781 12.0099 1.26852 11.9838 1.39038 11.933C1.51223 11.8822 1.62284 11.8078 1.7158 11.7141L6.0058 7.41409L10.2958 11.7141C10.3888 11.8078 10.4994 11.8822 10.6212 11.933C10.7431 11.9838 10.8738 12.0099 11.0058 12.0099C11.1378 12.0099 11.2685 11.9838 11.3904 11.933C11.5122 11.8822 11.6228 11.8078 11.7158 11.7141C11.8095 11.6211 11.8839 11.5105 11.9347 11.3887C11.9855 11.2668 12.0116 11.1361 12.0116 11.0041C12.0116 10.8721 11.9855 10.7414 11.9347 10.6195C11.8839 10.4977 11.8095 10.3871 11.7158 10.2941L7.4158 6.00409Z" fill="#6F6E6E"/>
                </svg>     
            </button>
        </div>
    </section>
        `
});

Vue.component('cart-item', {
    props: ['item'],
    template: `
            <article class="cart__product">
                <div class="cart__product__img">
                    <img :src="item.imgProduct" alt="Cart Product Image">
                </div>
                <div class="cart__product__info">
                    <h3>{{ item.product_name }}</h3>
                    <p>Quantity: {{ item.quantity }}</p>
                    <p>Price per Item: $ {{ item.price }}</p>
                    <p class="cart__product__info--price">Total Price: $ {{ item.quantity * item.price }}</p>
                    <button @click="$emit('remove', item)">Remove</button>
                </div>
            </article>    
            `
})


