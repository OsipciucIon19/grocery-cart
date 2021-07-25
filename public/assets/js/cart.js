const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

let cartItems,
    itemsWrapper = document.getElementById("items-wrapper"),
    emptyCart = document.getElementById("empty-cart"),
    cartTitles = document.getElementsByClassName("cart-titles")[0],
    totalContainer = document.getElementById("total"),
    amount = document.createElement("div");

const totalCol = document.createElement("div");

function init() {
    if (window.localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
    } else {
        cartItems = [];
    }

    if (cartItems.length === 0) {
        emptyCart.style.display = "block";
        cartTitles.style.display = "none";
        totalContainer.style.display = "none";
        itemsWrapper.style.display = "none";
    }
    showCart();
}

function showCart() {
    if (cartItems.length) {
        getLastCartItemId();
        for (let i = 0; i < cartItems.length; i++) {
            addProductToCart(cartItems[i]);
        }
        getTotalPrice();
    }
    syncCartEvents();
}

function getTotalPrice() {

    let sum = 0;
    for (let item of cartItems) {
        sum += item.price * item.amount;
    }
    totalCol.innerText = formatter.format(sum);
    document.getElementById("total-price").appendChild(totalCol);
}

function saveCartItem(product, index) {
    let itExists = false;

    const addButton = document.getElementsByClassName("add-to-cart")[index];
    amount.className = "item-amount";

    for (let item of cartItems) {
        if (item.itemId === product.productId) {
            item.amount++;
            syncCartItem();
            syncCartEvents();
            itExists = true;

            amount.innerHTML = item.amount;

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
        syncCartEvents();

        amount.innerHTML = "1";
    }
    addButton.appendChild(amount);
}

function addOneCartItem(product, index) {
    let amount = document.getElementsByClassName("add-to-cart")[index];

    for (let item of cartItems) {
        if (item.itemId === product.productId) {
            item.amount++;
            syncCartItem();

            amount.childNodes[0].innerHTML = item.amount;
        }
    }
}

function removeOneCartItem(product, index) {
    let amount = document.getElementsByClassName("add-to-cart")[index];

    for (let item of cartItems) {
        if (item.itemId === product.productId) {
            if (item.amount === 1) {
                break;
            }
            item.amount--;
            syncCartItem();

            amount.childNodes[0].innerHTML = item.amount;
        }
    }
}

function addProductToCart(item) {
    let removeIcon = document.createElement('i'),
        element = document.createElement('li'),
        image = document.createElement('img'),
        name = document.createElement('div'),
        price = document.createElement('div'),
        amount = document.createElement('div'),
        totalRow = document.createElement('div'),
        totalPrice = item.price * item.amount;

    image.src = item.image;

    name.innerText = item.name;
    price.innerText = formatter.format(item.price);
    amount.innerText = `${item.amount} kg`;
    totalRow.innerText = formatter.format(totalPrice);

    element.className = "cart-item";
    image.className = "cart-image";
    name.className = "cart-name";
    price.className = "cart-price";
    amount.className = "cart-amount";
    totalRow.className = "cart-total-row";
    removeIcon.className = "remove-item bi bi-trash";

    element.appendChild(image);
    element.appendChild(name);
    element.appendChild(price);
    element.appendChild(amount);
    element.appendChild(totalRow);
    element.appendChild(removeIcon);
    element.setAttribute("id", item.itemId);

    itemsWrapper.appendChild(element);
}

function removeItem(event) {
    let itemToRemove = event.target.closest('li'),
        itemId = itemToRemove.id;

    itemsWrapper.removeChild(itemToRemove);

    cartItems.forEach(function (value, i) {

        if (value.itemId === Number(itemId)) {
            cartItems.splice(i, 1);
        }
    });

    getTotalPrice();

    if (cartItems.length === 0) {
        emptyCart.style.display = "block";
        cartTitles.style.display = "none";
        totalContainer.style.display = "none";
        itemsWrapper.style.display = "none";
    }
    syncCartItem();
}

function syncCartItem() {
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
}

function syncCartEvents() {
    const removeIcon = document.getElementsByClassName("remove-item");

    if (removeIcon.length) {
        for (let i = 0; i < removeIcon.length; i++) {
            removeIcon[i].addEventListener('click', removeItem);
        }
    }
}

function getLastCartItemId() {
    let lastTask = cartItems[cartItems.length - 1];
    lastId = lastTask.itemId + 1;
}

init();