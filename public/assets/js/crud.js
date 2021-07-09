let lastId = 0,
    productWrapper = document.getElementById("product-wrapper"),
    btnSave = document.getElementById("save-product"),
    noProducts = document.getElementById("no-products"),
    removeIcon,
    updateIcon,
    productList;

function init() {
    if (window.localStorage.getItem('productList')) {
        productList = JSON.parse(window.localStorage.getItem('productList'));
    } else {
        productList = [];
    }

    if (productList.length === 0) {
        noProducts.style.display = "block";
    }

    btnSave.addEventListener('click', saveProduct);
    showList();
}

function showList() {
    if (productList.length) {
        getLastProductId();
        for (let i = 0; i < productList.length; i++) {
            addProductToList(productList[i]);
        }
        syncEvents();
    }
}

function saveProduct(event) {
    const product = {
        productId: lastId,
        name: document.getElementById("product-name").value,
        price: document.getElementById("product-price").value,
        category: document.getElementById("product-category").value,
        description: document.getElementById("product-description").value,
        image: `../public/assets/images/products/${document.getElementById("product-image").value}`,
    };
    productList.push(product);
    syncProduct();
    addProductToList(product);
    syncEvents();
    lastId++;
}

function addProductToList(product) {
    let removeIcon = document.createElement('i'),
        element = document.createElement('li'),
        updateIcon = document.createElement('i'),
        editButtons = document.createElement('div');

    element.innerHTML += `${product.productId}<pre> - </pre>
                          ${product.name}<pre> - </pre>
                          ${product.price} $<pre> - </pre>
                          ${product.category}`;

    editButtons.className = "edit-buttons";

    updateIcon.className = "update-item bi bi-pencil";
    updateIcon.setAttribute("title", "Update");

    removeIcon.className = "remove-item bi bi-trash";
    removeIcon.setAttribute("title", "Remove");

    element.appendChild(editButtons);
    editButtons.appendChild(updateIcon);
    editButtons.appendChild(removeIcon);
    element.setAttribute("id", product.productId);
    productWrapper.appendChild(element);

    noProducts.style.display = "none";
}

function updateProduct(event) {
    let productTag = event.target.closest('li'),
        productId = productTag.id,
        productToUpdate = findProduct(productId).product,
        pos = findProduct(productId).pos,
        modal = document.getElementById("modal"),
        btn = document.getElementById(productTag.id),
        span = document.getElementsByClassName("close")[0];

    $(btn).click(function () {
        $('#modal-overlay').show().addClass('modal-open');
    });

    $(span).click(function () {
        var elem = $('#modal-overlay');
        elem.removeClass('modal-open');
        setTimeout(function () {
            elem.hide();
        }, 200);
    });

    if (productToUpdate) {
        let productName = document.getElementById("update-name"),
            productPrice = document.getElementById("update-price"),
            productCategory = document.getElementById("update-category"),
            productDescription = document.getElementById("update-description"),
            productImage = document.getElementById("update-image"),
            updateBtn = document.getElementById("update-product");

        productName.value = productToUpdate.name;
        productPrice.value = productToUpdate.price;
        productCategory.value = productToUpdate.category;
        productDescription.value = productToUpdate.description;
        productImage.value = productToUpdate.image;

        updateBtn.onclick = function (event) {
            productToUpdate.name = productName.value;
            productToUpdate.price = productPrice.value;
            productToUpdate.category = productCategory.value;
            productToUpdate.description = productDescription.value;
            productToUpdate.image = productImage.value;

            modal.style.display = "none";

            productList[pos] = productToUpdate;

            syncProduct();
            window.location.reload();
        }
    }
}

function removeProduct(event) {
    let productToRemove = event.target.closest('li'),
        productId = productToRemove.id;

    productWrapper.removeChild(productToRemove);
    productList.forEach(function (value, i) {
        if (value.productId === Number(productId)) {
            productList.splice(i, 1);
        }
    });

    if (productList.length === 0) {
        noProducts.style.display = "block";
    }
    syncProduct();
}

function syncProduct() {
    window.localStorage.setItem('productList', JSON.stringify(productList));
    productList = JSON.parse(window.localStorage.getItem('productList'));
}

function getLastProductId() {
    let lastTask = productList[productList.length - 1];
    lastId = lastTask.productId + 1;
}

function syncEvents() {
    updateIcon = document.getElementsByClassName("update-item");
    removeIcon = document.getElementsByClassName("remove-item");
    if (removeIcon.length) {
        for (let i = 0; i < removeIcon.length; i++) {
            removeIcon[i].addEventListener('click', removeProduct);
        }
    }
    if (updateIcon.length) {
        for (let i = 0; i < updateIcon.length; i++) {
            updateIcon[i].addEventListener('click', updateProduct);
        }
    }
}

function findProduct(id) {
    const response = {
        product: '',
        pos: 0
    };
    productList.forEach(function (value, i) {
        if (value.productId === Number(id)) {
            response.product = value;
            response.pos = i;
        }
    });
    return response;
}

init();