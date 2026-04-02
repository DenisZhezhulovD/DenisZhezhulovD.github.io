var app = new Vue({
    el: '#app',
    data: {
        products: [
            {id: 1, title: 'Pear Conference', image: 'p1.jpg', short_text: 'Classic European Autumn Pear', desc: 'Strong vigor that provides good leaf coverage.'},
            {id: 2, title: 'Pear Williams', image: 'p2.jpg', short_text: 'World Favorite Dessert Variety', desc: 'Nice shiny attractive deep red color.'},
            {id: 3, title: 'Pear Bosc', image: 'p3.jpg', short_text: 'Elegant Long-Necked Bronze Pear', desc: 'Long shelf life on plant and post harvest.'},
            {id: 4, title: 'Pear Abbot Fetel', image: 'p4.jpg', short_text: 'Premium Italian Slender Pear', desc: 'Early matured variety.'},
            {id: 5, title: 'Pear Kyrgyz', image: 'p5.jpg', short_text: 'Winter Hardy Crisp Variety', desc: 'Breeding for earliness, flavor, crack resistance.'}
        ],
        product: {}, 
        cart: [], 
        btnVisible: 0 
    },
    mounted: function() {
        this.getCart();
        this.getProduct();
        this.checkInCart();
    },
    methods: {
        getProduct: function() {
            var hash = window.location.hash.substring(1);
            if (hash) {
                this.product = this.products.find(p => p.id == hash);
            }
        },
        addToCart: function(id) {
            var currentCart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Приводим к числу для консистентности
            id = Number(id);

            if (!currentCart.includes(id)) {
                currentCart.push(id);
                localStorage.setItem('cart', JSON.stringify(currentCart));
            }
            
            this.cart = currentCart;
            this.btnVisible = 1;
            console.log("Товар добавлен в корзину:", id);
        },
        // НОВАЯ ФУНКЦИЯ ДЛЯ КРЕСТИКА
        removeFromCart: function(id) {
            // 1. Оставляем только те товары, ID которых не равен удаляемому
            this.cart = this.cart.filter(itemId => Number(itemId) !== Number(id));
            
            // 2. Сохраняем обновленный массив в память браузера
            localStorage.setItem('cart', JSON.stringify(this.cart));
            
            // 3. Проверяем кнопку (если мы на странице этого товара, она сменится обратно на "Add to cart")
            this.checkInCart();
            
            console.log("Товар удален из корзины:", id);
        },
        getCart: function() {
            var saved = localStorage.getItem('cart');
            if (saved) {
                this.cart = JSON.parse(saved);
            }
        },
        checkInCart: function() {
            // Используем some + Number, чтобы проверка работала на 100% точно
            if (this.product && this.product.id) {
                var isInCart = this.cart.some(itemId => Number(itemId) === Number(this.product.id));
                this.btnVisible = isInCart ? 1 : 0;
            } else {
                this.btnVisible = 0;
            }
        }
    }
});