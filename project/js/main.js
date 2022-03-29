const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/* ===  формат ООП  === */
class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}" data-name="${this.title}" data-price="${this.price}">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts()
            .then(data => { //data - объект js
                // console.log(`goods - ${data}`)
                this.goods = data;
                // console.log(data);
                this.render()
            });//рекомендация, чтобы метод был вызван в текущем классе
        // this.render();//вывод товаров на страницу
    }
    _fetchProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
        // this.goods = [
        //     { id: 1, title: 'Notebook', price: 2000 },
        //     { id: 2, title: 'Mouse', price: 20 },
        //     { id: 3, title: 'Keyboard', price: 200 },
        //     { id: 4, title: 'Gamepad', price: 50 },
        // ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //           block.innerHTML += item.render();
        }
    }
    // метод для суммирования стоимость всех товаров
    sumGoods() {
        let sum = 0;
        this.goods.forEach(element => {
            sum += element.price;
        });
        return sum;
    }
}

let list = new ProductList();

// класс корзина

class goodInCart {
    constructor(product) {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.count = product.quantity;
    }
    render() {
        return `
        <div class="basketRow" data-id="${this.id}">
          <div><img  src='https://via.placeholder.com/20x20' alt="">${this.title}</div>
          <div class="quantity">
            <button class="decrease">-<button>
            <span class="productCount">${this.count}</span> шт.
            <button class="increase">+<button>
          </div>
          <div>$${this.price}</div>
          <div class="sum">
            $<span class="productTotalRow">
                ${(this.price * this.count).toFixed(2)}</span> 
                <span class="delete-btn"></span>
          </div>
          
        </div>
        `;
    }
}

class Cart {
    constructor(container = ".basketTotal") {
        this.container = container;
        this.amount = 0;
        this.countGoods = 0;
        this.basket = [];
        this._fetchProducts()
            .then(data => { //data - объект js
                this.basket = data.contents;
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this.render()
            });
    }
    _fetchProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    };

    // метод отрисовывает корзину
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.basket) {
            const item = new goodInCart(product);
            block.insertAdjacentHTML("beforebegin", item.render());
            //           block.innerHTML += item.render();
        }
        // вывод количества товара в корзине и общей стоимости
        goodsInCartEl.textContent = this.getTotalBasketCount().toString();
        basketTotalValueEl.textContent = this.getTotalBasketPrice().toFixed(2);
    }

    addToCart(id, title, price) {
        const block = document.querySelector(this.container);
        this.basket.push({ id_product: +(id), product_name: title, price: +(price), quantity: +(1) });
        const item = new goodInCart(this.basket[this.basket.length - 1]);
        block.insertAdjacentHTML("beforebegin", item.render());
        return;
    }
    removeFromCart(id) {
        // определяем id товара который хотят удалить
        const basketRowEl = goodsCartEl
            .querySelector(`.basketRow[data-id="${id}"]`);

        // по id  иищем строку в корзине на удаление
        for (let i = 0; i < this.basket.length; i++) {
            const item = this.basket[i];
            if (id == item.id_product) {
                this.countGoods -= item.quantity;
                basketRowEl.remove();
                this.basket.splice(i, 1);
            }
        }
    }

    // метод изменяет строку плюс минус количество или убрать строку
    changeCart(id, title, price, action) {
        // проверяем есть ли в корзине товар с ID
        const basketRowEl = goodsCartEl
            .querySelector(`.basketRow[data-id="${id}"]`);
        if (!basketRowEl) {
            // Если такой строки нет, то добавляем строку в корзину 
            // вызывая метод addToCart
            this.addToCart(id, title, price);
        } else {
            //перебираю товар в корзине..
            for (let i = 0; i < this.basket.length; i++) {
                const item = this.basket[i];
                //нашел id в корзине изменения в зависимости, что нажали
                if (id == item.id_product) {
                    switch (action) {
                        // нажали повторно на карточку товара
                        case 'buy-btn':
                        // делаем, что и при нажатом плюсе
                        case 'increase':
                            item.quantity++;
                            // this.countGoods++;
                            // выводим на экран изменненные данные о продукте
                            // Ставим новое количество в строке продукта корзины.
                            basketRowEl.querySelector('.productCount').textContent =
                                item.quantity;
                            // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
                            basketRowEl.querySelector('.productTotalRow')
                                .textContent = (item.price * item.quantity).toFixed(2);
                            break;
                        case 'decrease':
                            if (item.quantity > 0) {
                                item.quantity--;
                                // this.countGoods--;
                                // выводим на экран изменненные данные о продукте
                                // Ставим новое количество в строке продукта корзины.
                                basketRowEl.querySelector('.productCount').textContent =
                                    item.quantity;
                                // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
                                basketRowEl.querySelector('.productTotalRow')
                                    .textContent = (item.price * item.quantity).toFixed(2);
                            }
                            break;
                        case 'delete-btn':
                            this.removeFromCart(id);
                    }
                }
            }
        }
        // Ставим новое количество добавленных товаров у значка корзины.
        goodsInCartEl.textContent = this.getTotalBasketCount().toString();
        // Ставим новую общую стоимость товаров в корзине.
        basketTotalValueEl.textContent = this.getTotalBasketPrice().toFixed(2);
    }

    // метод для подсчета общего числа купленного товара
    getTotalBasketCount() {
        let goodsInCart = 0;
        this.basket.forEach(element => {
            goodsInCart += parseInt(element.quantity);
        });
        this.countGoods = goodsInCart;
        return goodsInCart;
    }
    //метод для подсчета общей стоимости товара в корзине
    getTotalBasketPrice() {
        let sumInCart = 0, key;
        for (key in this.basket) {
            sumInCart += +(this.basket[key].quantity) * +(this.basket[key].price);
        }
        this.amount = sumInCart;
        return sumInCart;
    }
};

// кнопка корзины в меню
const cartBtnEl = document.querySelector('.btn-cart');
// место вывода количества товара в корзине 
const goodsInCartEl = document.querySelector('.btn-cart>span');
// корзина
const goodsCartEl = document.querySelector('.basket');
// место итоговой строки
const basketTotalEl = document.querySelector('.basketTotal');
// сумма товаров в корзине
const basketTotalValueEl = document.querySelector('.basketTotalValue');
// событие открывает закрывает корзину 
cartBtnEl.addEventListener('click',
    event => goodsCartEl.classList.toggle('hidden'));

// корзина покупателя
const productCart = new Cart();
// вешаем обработку клика на кнопки купить всех продуктов
document.querySelector('.products').addEventListener('click', event => {
    if (!event.target.closest('.buy-btn')) {
        return;
    }
    // проверяем на каком продукте нажали кнопку купить и запоминаем его параметры
    const addProductItem = event.target.closest('.product-item');
    const id = addProductItem.dataset.id;
    const title = addProductItem.dataset.name;
    const price = addProductItem.dataset.price;
    const action = event.target.classList.value;
    // запускаем метод добавления строки в корзину или увеличение количества
    // товара в корзине
    productCart.changeCart(id, title, price, action);
});
// вешаем обрабочик событий на корзину. проверяем +, - и X
document.querySelector('.basket').addEventListener('click', event => {
    if (!event.target.closest('.increase') &&
        !event.target.closest('.decrease') &&
        !event.target.closest('.delete-btn')) {
        return;
    }
    // проверяем на каком продукте нажали + или - или X и запоминаем его параметры
    const addProductItem = event.target.closest('.basketRow');
    const id = addProductItem.dataset.id;
    const title = addProductItem.dataset.name;
    const price = addProductItem.dataset.price;
    const action = event.target.classList.value;
    // запускаем метод изменения строки в корзину
    productCart.changeCart(id, title, price, action);
});







