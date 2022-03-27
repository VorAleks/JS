
/* ===  формат ООП  === */
class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
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
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
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
// хотел сделать наследование, но у меня массив товаров
//копировал все исходные продукты.думаю, если наполнение массива
// родителя убрать из конструктора, а поставить теле программы, 
// то тогда можно наследовать класс..
class goodInCart {
    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.count = product.count;
    }
    render() {
        return `
        <div class="basketRow" data-id="${this.id}">
          <div>${this.title}</div>
          <div>
            <span class="productCount">${this.count}</span> шт.
          </div>
          <div>$${this.price}</div>
          <div>
            $<span class="productTotalRow">
                ${(this.price * this.count).toFixed(2)}</span>
          </div>
        </div>
        `;
    }
}

class Cart {
    constructor(container = ".basketTotal") {
        this.container = container;
        this.basket = [];
    }
    // метод добавить строку в корзину
    addToCart(id, title, price) {
        if (!(id in this.basket)) {
            this.basket[id] = { id: id, title: title, price: price, count: 0 };
        }
        // Добавляем в количество +1 к количеству купленного товаров 
        this.basket[id].count++;

        // Ставим новое количество добавленных товаров у значка корзины.
        goodsInCartEl.textContent = this.getTotalBasketCount().toString();
        // Ставим новую общую стоимость товаров в корзине.
        basketTotalValueEl.textContent = this.getTotalBasketPrice().toFixed(2);
    }
    // метод для подсчета общего числа купленного товара
    getTotalBasketCount() {
        let goodsInCart = 0, key;
        for (key in this.basket) {
            goodsInCart += parseInt(this.basket[key].count);
        }
        // или так можно посчитать
        // this.basket.forEach(element => {
        //     goodsInCart += parseInt(element.count);
        // })
        return goodsInCart;
    }
    //метод для подсчета общей стоимости товара в корзине
    getTotalBasketPrice() {
        let sumInCart = 0, key;
        for (key in this.basket) {
            sumInCart += +(this.basket[key].count) * +(this.basket[key].price);
        }
        return sumInCart;
    }

    render() {
        const block = document.querySelector(this.container);

        this.basket.forEach(element => {
            if (element) {
                const basketRowEl = goodsCartEl
                    .querySelector(`.basketRow[data-id="${element.id}"]`);
                // Если такой строки нет, то отрисовываем новую строку.
                if (!basketRowEl) {
                    const item = new goodInCart(element);
                    block.insertAdjacentHTML("beforebegin", item.render());
                    return;
                }
                // выводим на экран изменненные данные о продукте
                // Ставим новое количество в строке продукта корзины.
                basketRowEl.querySelector('.productCount').textContent = element.count;
                // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
                basketRowEl.querySelector('.productTotalRow')
                    .textContent = (element.price * element.count).toFixed(2);
            }
        });
    }

    // нужен метод который минусует какой то товар, то есть поставить минусик рядом с количеством в каждой строке
    decreaseFromCart(id) {

    }
    // можно сделать метод, который обнуляет корзину.
    cleanCart() {

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
    // запускаем метод добавления строки в корзину или увеличение количества
    // товара в корзине
    productCart.addToCart(id, title, price);
    // отрисовываем новую строку в корзине или меняем количество и суммы
    productCart.render();
});




