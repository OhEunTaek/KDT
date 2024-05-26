
// 새로고침시 최상단으로 이동
setTimeout(function () {
    window.scrollTo(0, 0);
}, 0);

var typed = new Typed("#typed", {
    strings: ["FRONTEND DEVELOPER", "OH EUN TEAK"],
    typeSpeed: 100,
    showCursor: false,
    fadeOut: true
});

var intro = document.querySelector("#intro");
var btnScroll = intro.querySelectorAll(".btn_scroll");

btnScroll.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var scroll = window.innerHeight;
        intro.style.top = -scroll + "px";
        setTimeout(function () {
            intro.style.display = "none";
            var wrap = document.querySelector("#wrap");
            wrap.style.opacity = 1;
        }, 600);
    });
});

window.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
        btnScroll[0].click();
    }
}, { once: true });

var container = document.querySelector("#container");

var menu = container.querySelectorAll(".menu");
var indicate = container.querySelector(".indicate");
var indicateItems = indicate.querySelectorAll("li");

var oldObj = null;
var stop = true;

menu.forEach(function (menuItem, index) {
    var menuBoxLink = menuItem.querySelector(".menu_box > a");
    menuBoxLink.addEventListener("click", function () {
        if (stop) {
            stop = false;
            menuActive(menuItem);
            selectPager(index);

            oldObj = menuItem.classList.contains("opening") ? menuItem : null;

            setTimeout(function () {
                stop = true;
            }, 1200);
        }
    });
});

indicateItems.forEach(function (indicateItem) {
    indicateItem.addEventListener("click", function () {
        if (stop) {
            stop = false;
            var targetIndex = Array.from(indicateItems).indexOf(indicateItem);
            var targetMenu = menu[targetIndex];
            if (oldObj) {
                if (targetIndex === Array.from(menu).indexOf(oldObj)) {
                    stop = true;
                    return false;
                } else {
                    menuActive(oldObj);
                    selectPager(targetIndex);

                    setTimeout(function () {
                        menuActive(targetMenu);
                    }, 1200);

                    setTimeout(function () {
                        stop = true;
                    }, 2400);
                }
            } else {
                menuActive(targetMenu);
                selectPager(targetIndex);

                setTimeout(function () {
                    stop = true;
                }, 1200);
            }
            oldObj = targetMenu;
        }
    });
});

function logoColor(index) {
    switch (index) {
        case 0:
            return "#f6f7f8";
        case 1:
            return "#000";
        case 2:
            return "#fff";
        default:
            return "#000";
    }
}

function menuActive(obj) {
    if (obj.classList.contains("open") || obj.classList.contains("opening")) {
        obj.classList.remove("open");
        obj.classList.add("closing");
        Array.from(obj.siblings()).forEach(function (sibling) {
            sibling.style.display = "";
            sibling.classList.remove("hiiden");
            sibling.classList.add("visible");
        });

        setTimeout(function () {
            obj.classList.remove("closing");
            Array.from(obj.siblings()).forEach(function (sibling) {
                sibling.classList.remove("visible");
            });
        }, 600);
    } else {
        obj.classList.add("opening");
        Array.from(obj.siblings()).forEach(function (sibling) {
            sibling.classList.add("hiiden");
            setTimeout(function () {
                sibling.style.display = "none";
            }, 600);
        });

        document.querySelector(".logo a").style.color = logoColor(Array.from(menu).indexOf(obj));

        setTimeout(function () {
            obj.classList.remove("opening");
            obj.classList.add("open");
        }, 1200);
    }
}

function selectPager(index) {
    var indicateItem = indicateItems[index];
    if (indicateItem.classList.contains("on")) {
        indicateItem.classList.remove("on");
        indicate.classList.remove("on");
    } else {
        Array.from(indicateItems).forEach(function (item) {
            item.classList.remove("on");
        });
        indicateItem.classList.add("on");
        indicate.classList.add("on");
    }
}