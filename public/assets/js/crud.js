let lastId = 0,
    productWrapper = document.getElementById("product_wrapper"),
    btnSave = document.getElementById("save_product"),
    removeIcon,
    updateIcon,
    productList;

function init() {

    if (window.localStorage.getItem('productList')) {
        productList = JSON.parse(window.localStorage.getItem('productList'));
    } else {
        productList = [];
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
        name: document.getElementById("product_name").value,
        price: document.getElementById("product_price").value,
        category: document.getElementById("product_category").value,
        description: document.getElementById("product_description").value,
        image: document.getElementById("product_image").value,
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

    element.innerHTML += product.name;

    editButtons.className = "edit_buttons";

    updateIcon.className = "update_item bi bi-pencil";
    updateIcon.setAttribute("title", "Update");

    removeIcon.className = "remove_item bi bi-trash";
    removeIcon.setAttribute("title", "Remove");

    element.appendChild(editButtons);
    editButtons.appendChild(updateIcon);
    editButtons.appendChild(removeIcon);
    element.setAttribute("id", product.productId);
    // element.setAttribute("class", "items");
    productWrapper.appendChild(element);

//    <i class="bi bi-trash"></i> -- remove
//    <i class="bi bi-pencil"></i> -- edit

//    <i class="bi bi-trash"></i> -- remove
//    <i class="bi bi-pencil"></i> -- edit
}

function updateProduct(event) {

    let productTag = event.target.closest('li'),
        productId = productTag.id,
        productToUpdate = findProduct(productId).product,
        pos = findProduct(productId).pos,
        modal = document.getElementById("modal"),
        btn = document.getElementById(productTag.id),
        span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    if (productToUpdate) {

        let productName = document.getElementById("update_name"),
            productPrice = document.getElementById("update_price"),
            productCategory = document.getElementById("update_category"),
            productDescription = document.getElementById("update_description"),
            productImage = document.getElementById("update_image"),
            updateBtn = document.getElementById("update_product");

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

    console.log(productToRemove);

    productWrapper.removeChild(productToRemove);
    productList.forEach(function (value, i) {
        if (value.productId === Number(productId)) {
            productList.splice(i, 1);
        }
    });

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

    updateIcon = document.getElementsByClassName("update_item");
    removeIcon = document.getElementsByClassName("remove_item");
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

