let flag = 0;
const menuButton = document.querySelector(".menu-button"),
    navBarLinks = document.querySelector(".navbar-links"),
    buttons = document.getElementsByClassName("navbar-item");

const Utils = {
    menuButton: document.querySelector(".menu-button"),
    navBarLinks: document.querySelector(".navbar-links"),
    buttons: document.getElementsByClassName("navbar-item"),
}

menuButton.addEventListener("click", function () {
    const mainContainer = document.querySelector(".main-container"),
        crudForm = document.querySelector(".crud-form"),
        productList = document.querySelector(".product-list"),
        totalPrice = document.querySelector("#total"),
        cartList = document.querySelector(".cart-list");

    menuButton.classList.toggle("menu-toggle");
    document.querySelector("i").classList.toggle("bi-x-lg");

    if (navBarLinks.style.display !== "none") {
        navBarLinks.style.display = "none";
    } else {
        navBarLinks.style.display = "flex";
    }

    flag++;

    if (flag % 2 === 0) {

        if (window.location.href.includes("index")) {
            mainContainer.style.marginLeft = "150px";
            mainContainer.style.width = "80%";
        }

        if (window.location.href.includes("create-a-product")) {
            crudForm.style.marginLeft = "0";
            productList.style.display = "block";
        }

        if (window.location.href.includes("cart.html")) {
            totalPrice.style.display = "flex";
            cartList.style.marginLeft = "0";
        }
    } else {

        if (window.location.href.includes("index")) {
            mainContainer.style.marginLeft = "335px";
            mainContainer.style.width = "76%";
        }

        if (window.location.href.includes("create-a-product")) {
            crudForm.style.marginLeft = "500px";
            productList.style.display = "none";
        }

        if (window.location.href.includes("cart.html")) {
            totalPrice.style.display = "none";
            cartList.style.marginLeft = "300px";
        }
    }
});

function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }
    button.appendChild(circle);
}

for (const button of buttons) {
    button.addEventListener("click", createRipple);
}