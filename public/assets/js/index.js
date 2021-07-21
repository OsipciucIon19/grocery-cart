$(document).ready(function () {
    $(".control").on("click", function () {
        $(".product").removeClass("hover");

        setTimeout(function () {
            $(".product").addClass("hover");
        }, 1000);
    });

    $(".search").submit(function () {
        return false;
    });
});

let productList = JSON.parse(window.localStorage.getItem('productList')),
    fruitList = [],
    vegetableList = [],
    noProducts = document.getElementsByClassName("no-products"),
    searchBtn = document.getElementById("search-button");

let fruitSlider = document.getElementById('fruit-slider'),
    fruitSliderItems = document.getElementById('fruit-slider-items'),
    fruitPrev = document.getElementById('fruit-prev'),
    fruitNext = document.getElementById('fruit-next'),
    vegetableSlider = document.getElementById('vegetable-slider'),
    vegetableSliderItems = document.getElementById('vegetable-slider-items'),
    vegetablePrev = document.getElementById('vegetable-prev'),
    vegetableNext = document.getElementById('vegetable-next');

for (let i = 0; i < productList.length; i++) {
    if (productList[i].category === "fruits") {
        fruitList.push(productList[i]);
    } else {
        vegetableList.push(productList[i]);
    }
}

checkExistentProducts(fruitList, vegetableList);

searchBtn.onclick = function () {
    $(".slide").remove();
    checkExistentProducts(fruitList, vegetableList);
};

function checkExistentProducts(fruitList, vegetableList) {
    let isPresent;

    isPresent = show(fruitList, fruitSliderItems);
    if (isPresent) {
        noProducts[0].style.display = "none";
        fruitSlider.style.display = "flex";
        slide(fruitSlider, fruitSliderItems, fruitPrev, fruitNext);

        // $(".add-to-cart").on("click", function () {
        //     let index = $(".add-to-cart").index(this);
        //
        //     $(".add-item").eq(index).css("display", "flex");
        //     $(".remove-item").eq(index).css("display", "flex");
        //
        //     $(".product").eq(index).mouseleave(function () {
        //         $(".add-item").eq(index).css("display", "none");
        //         $(".remove-item").eq(index).css("display", "none");
        //     })
        // });

    } else {
        noProducts[0].style.display = "flex";
        fruitSlider.style.display = "none";
    }

    isPresent = show(vegetableList, vegetableSliderItems);
    if (isPresent) {
        noProducts[1].style.display = "none";
        vegetableSlider.style.display = "flex";
        slide(vegetableSlider, vegetableSliderItems, vegetablePrev, vegetableNext);

    } else {
        noProducts[1].style.display = "flex";
        vegetableSlider.style.display = "none";
    }

    $(".add-to-cart").on("click", function () {
        let index = $(".add-to-cart").index(this);

        let id = $(".product-cart").eq(index).attr("data-id");

        for (let product of productList) {
            if (product.productId === Number(id)) {
                saveCartItem(product);
            }
        }

        $(".add-item").eq(index).css("display", "flex");
        $(".remove-item").eq(index).css("display", "flex");

        $(".product").eq(index).mouseleave(function () {
            $(".add-item").eq(index).css("display", "none");
            $(".remove-item").eq(index).css("display", "none");
        })
    });
}

function show(list, sliderItems) {
    let itemsNumber = 5,
        firstItem = 0;

    let searchValue = $("#search-input").val();
    let sortedList = [];

    for (let i = 0; i < list.length; i++) {
        let search = list[i].name.search(new RegExp(searchValue, "i"));

        if (search > -1) {
            sortedList.push(list[i]);
        }
    }

    for (let i = 0; i < Math.ceil(sortedList.length / 5); i++) {
        let slides = document.createElement("div");

        slides.className = "slide";
        sliderItems.appendChild(slides);

        for (let j = firstItem; j < itemsNumber; j++) {
            if (j === sortedList.length) break;

            let product = document.createElement("div"),
                productId = document.createElement("div"),
                productImage = document.createElement("img"),
                productName = document.createElement("div"),
                productPrice = document.createElement("div"),
                productDescription = document.createElement("div"),
                productCart = document.createElement("div");

            let productCartButton = document.createElement("i"),
                productCartAddItem = document.createElement("div"),
                productCartRemoveItem = document.createElement("div");

            product.className = "product";
            product.classList.add("hover");
            slides.appendChild(product);

            productImage.className = "product-image";
            productName.className = "product-name";
            productPrice.className = "product-price";
            productDescription.className = "product-description";
            productCart.className = "product-cart";

            productCartButton.className = "add-to-cart bi bi-basket2-fill";
            productCart.dataset.id = sortedList[j].productId;
            productCartAddItem.className = "add-item";
            productCartRemoveItem.className = "remove-item";

            productImage.src = sortedList[j].image;
            productName.innerText = sortedList[j].name;
            productPrice.innerText = `${sortedList[j].price} $ / kg`;
            productDescription.innerText = sortedList[j].description;

            productCartAddItem.innerText = '+';
            productCartRemoveItem.innerText = '-';

            product.appendChild(productImage);
            product.appendChild(productName);
            product.appendChild(productPrice);
            // product.appendChild(productDescription);
            product.appendChild(productCart);

            productCart.appendChild(productCartRemoveItem);
            productCart.appendChild(productCartButton);
            productCart.appendChild(productCartAddItem);
        }
        itemsNumber += 5;
        firstItem += 5;
    }

    return sortedList.length !== 0;
}

function slide(slider, sliderItems, prev, next) {
    let posInitial,
        slides = sliderItems.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = slides[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        allowShift = true,
        index = 0;

    sliderItems.appendChild(cloneFirst);
    sliderItems.insertBefore(cloneLast, firstSlide);

    prev.onclick = function () {
        shiftSlide(-1);
    };
    next.onclick = function () {
        shiftSlide(1);
    };

    function shiftSlide(dir) {
        sliderItems.classList.add('shifting');

        if (allowShift) {
            posInitial = sliderItems.offsetLeft;

            if (dir === 1) {
                sliderItems.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir === -1) {
                sliderItems.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        }

        allowShift = false;

        setTimeout(checkIndex, 600);
    }

    function checkIndex() {
        sliderItems.classList.remove('shifting');

        if (index === -1) {
            sliderItems.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }
        if (index === slidesLength) {
            sliderItems.style.left = -(slideSize) + "px";
            index = 0;
        }
        allowShift = true;
    }
}
