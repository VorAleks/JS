// стрелочные функции наследуют this от родителя.
// сделал функцию наследуемой через класс
class Product {
    constructor(id, title, price, imageUrl) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    /**
     * @returns {string} html-разметка для товара
     */
    renderProduct() {
        return `<div class="product-item">
                    <h3>${this.title}</h3>
                    <img src="${this.imageUrl}" alt="">
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
};

const products = [
    new Product(1, "Notebook", "2000", "../project/img/notebook.jpg"),
    new Product(1, "Mouse", "20", "../project/img/mouse.jpg"),
    new Product(1, "Keyboard", "200", "../project/img/keyboard.jpg"),
    new Product(1, "Gamepad", "50", "../project/img/gamepad.jpg"),
];

// const products = [
//     { id: 1, title: 'Notebook', price: 2000 },
//     { id: 2, title: 'Mouse', price: 20 },
//     { id: 3, title: 'Keyboard', price: 200 },
//     { id: 4, title: 'Gamepad', price: 50 },
// ];
// Функция для формирования верстки каждого товара
// Добавить в выводе изображение

// const renderProduct = (title, price) => {
//     return `<div class="product-item">
//                 <h3>${title}</h3>
//                 <img src="../project/img/imgproduct.jpg" alt="">
//                 <p>${price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };

const renderPage = list => {
    const productsList = list.map(item => item.renderProduct());
    // join без разделтелей используем, чтобы убрать запятые
    document.querySelector('.products').innerHTML = productsList.join("");
};

renderPage(products);