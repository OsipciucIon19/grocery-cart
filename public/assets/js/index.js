let productList = JSON.parse(window.localStorage.getItem('productList')),
    fruitList = [],
    vegetableList = [];

let fruitSlider = document.getElementById('fruit-slider'),
    fruitSliderItems = document.getElementById('fruit-slider-items'),
    fruitPrev = document.getElementById('fruit-prev'),
    fruitNext = document.getElementById('fruit-next');

let vegetableSlider = document.getElementById('vegetable-slider'),
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

function showFruits(list, sliderItems) {

    let itemsNumber = 5,
        firstItem = 0;

    for (let i = 0; i < Math.ceil(list.length / 5); i++) {
        let slides = document.createElement("div");

        slides.className = "slide";
        sliderItems.appendChild(slides);

        for (let j = firstItem; j < itemsNumber; j++) {
            if (j === list.length) break;

            let product = document.createElement("div"),
                productImage = document.createElement("img");

            product.className = "product";
            slides.appendChild(product);

            productImage.className = "product-image";
            productImage.src = list[j].image;
            product.appendChild(productImage);
        }
        itemsNumber += 5;
        firstItem += 5;
    }

}

function slide(slider, sliderItems, prev, next) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = sliderItems.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = slides[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    sliderItems.appendChild(cloneFirst);
    sliderItems.insertBefore(cloneLast, firstSlide);
    slider.classList.add('loaded');

    sliderItems.onmousedown = dragStart;

    sliderItems.addEventListener('touchstart', dragStart);
    sliderItems.addEventListener('touchend', dragEnd);
    sliderItems.addEventListener('touchmove', dragAction);

    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    sliderItems.addEventListener('transitionend', checkIndex);

    function dragStart (e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = sliderItems.offsetLeft;

        if (e.type === 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction (e) {
        e = e || window.event;

        if (e.type === 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        sliderItems.style.left = (sliderItems.offsetLeft - posX2) + "px";
    }

    function dragEnd (e) {
        posFinal = sliderItems.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            sliderItems.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        sliderItems.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = sliderItems.offsetLeft; }

            if (dir === 1) {
                sliderItems.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir === -1) {
                sliderItems.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        }

        allowShift = false;
    }

    function checkIndex (){
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

showFruits(fruitList, fruitSliderItems);
showFruits(vegetableList, vegetableSliderItems);

slide(fruitSlider, fruitSliderItems, fruitPrev, fruitNext);
slide(vegetableSlider, vegetableSliderItems, vegetablePrev, vegetableNext);