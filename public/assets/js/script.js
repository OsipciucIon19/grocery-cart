$(document).ready(function () {
    let flag = 0;
    let resetButton = document.getElementById("search-reset"),
        input = document.getElementById("search-input");

    $(".menu-button").click(function () {
        $(this).toggleClass('menu-toggle').find('i').toggle();
        $(".navbar-links").slideToggle(500);

        flag++;

        if (flag % 2 === 0) {
            $("#fruits-app").css("margin-left", "0");
            $(".crud-form").css("margin-left", "0");
            $(".product-list").css("display", "block");
        } else {
            $("#fruits-app").css("margin-left", "500px");
            $("#carousel-container").css("width", "60%");
            $(".crud-form").css("margin-left", "500px");
            $(".product-list").css("display", "none");
        }
    });

    $(input).keyup(function(e) {

        if($(this).val().length > 0) {
            resetButton.style.display = "block";
        }

        if ((e.keyCode === 8 || e.keyCode === 46) && $(this).val().length === 0) {
            resetButton.style.display = "none";
        }
    });

    $(resetButton).click(function () {
        resetButton.style.display = "none";
    });
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

const buttons = document.getElementsByClassName("navbar-item");

for (const button of buttons) {
    button.addEventListener("click", createRipple);
}