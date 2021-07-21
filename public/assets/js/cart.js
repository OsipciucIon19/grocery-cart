let cartItems,
    itemsWrapper = document.getElementById("items-wrapper");

let addToCartBtn = document.getElementById("");

function init() {
    if (window.localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
    } else {
        cartItems = [];
    }

    if (cartItems.length === 0) {
        // noProducts.style.display = "block";
    }

    showCart();
}

function showCart() {
    if (cartItems.length) {
        getLastCartItemId();
        for (let i = 0; i < cartItems.length; i++) {
            addProductToCart(cartItems[i]);
        }
        syncEvents();
    }
}

function saveCartItem(product) {
    let itExists = false;

    for (let item of cartItems) {
        if (item.itemId === product.productId) {
            item.amount++;
            syncCartItem();
            itExists = true;

            break;
        }
    }

    if (!itExists) {
        const cartItem = {
            itemId: product.productId,
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description,
            image: product.image,
            amount: 1,
        }
        cartItems.push(cartItem);
        syncCartItem();
    }
}

function addProductToCart(item) {
    let removeIcon = document.createElement('i'),
        element = document.createElement('li'),
        image = document.createElement('img'),
        name = document.createElement('div'),
        price = document.createElement('div'),
        amount = document.createElement('div'),
        totalRow = document.createElement('div');

    image.src = item.image;

    name.innerText = item.name;
    price.innerText = `${item.price} $`;
    amount.innerText = `${item.amount} kg`;
    totalRow.innerText = `${item.price * item.amount} $`;

    element.className = "cart-item";
    image.className = "cart-image";
    name.className = "cart-name";
    price.className = "cart-price";
    amount.className = "cart-amount";
    totalRow.className = "cart-total-row";

    element.appendChild(image);
    element.appendChild(name);
    element.appendChild(price);
    element.appendChild(amount);
    element.appendChild(totalRow);

    itemsWrapper.appendChild(element);
}

function syncCartItem() {
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
}

function getLastCartItemId() {
    let lastTask = cartItems[cartItems.length - 1];
    lastId = lastTask.itemId + 1;
}

init();