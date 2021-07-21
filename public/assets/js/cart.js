let cartItems;

let addToCartBtn = document.getElementById("")

function init() {
    if (window.localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
    } else {
        cartItems = [];
    }

    if (cartItems.length === 0) {
        // noProducts.style.display = "block";
    }

    // showCart();
}

function showCart() {
    if (cartItems.length) {
        getLastProductId();
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
        editButtons = document.createElement('div');

    element.innerHTML += `${item.productId}<pre> - </pre>
                          ${item.name}<pre> - </pre>
                          ${item.price} $<pre> - </pre>
                          ${item.category}`;

    editButtons.className = "edit-buttons";

    updateIcon.className = "update-item bi bi-pencil";
    updateIcon.setAttribute("title", "Update");

    removeIcon.className = "remove-item bi bi-trash";
    removeIcon.setAttribute("title", "Remove");

    element.appendChild(editButtons);
    editButtons.appendChild(updateIcon);
    editButtons.appendChild(removeIcon);
    element.setAttribute("id", item.productId);
    productWrapper.appendChild(element);

    noProducts.style.display = "none";
}

function syncCartItem() {
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
}

function getLastCartItemId() {
    let lastTask = productList[productList.length - 1];
    lastId = lastTask.productId + 1;
}

// function syncEvents() {
//     updateIcon = document.getElementsByClassName("update-item");
//     removeIcon = document.getElementsByClassName("remove-item");
//     if (removeIcon.length) {
//         for (let i = 0; i < removeIcon.length; i++) {
//             removeIcon[i].addEventListener('click', removeProduct);
//         }
//     }
//     if (updateIcon.length) {
//         for (let i = 0; i < updateIcon.length; i++) {
//             updateIcon[i].addEventListener('click', updateProduct);
//         }
//     }
// }


init();