// СВАЙПЕР

var swiper = new Swiper('.swiper', {
    // loop: true,
    slidesPerView: 4,
    direction: getDirection(),
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
    });

    function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
    }



// МОДАЛЬНОЕ ОКНО - ПОПАП

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector(".body");
const lockPadding = document.querySelectorAll(".lockPadding");

let unlock = true;

const timeout = 500;

if(popupLinks.length > 0) {
    for(let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute("href").replace("#", "");
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        })
    }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if(popupCloseIcon.length > 0) {
    for(let index = 0; index > popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener("click", function (e) {
            popupClose(el.closest(".popup"));
            e.preventDefault();
        })
    }
}

function popupOpen(curentPopup) {
    if(curentPopup && unlock) {
        const popupActive = document.querySelector(".popup.open");
        if(popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add("open");
        curentPopup.addEventListener("click", function (e){
            if(!e.target.closest(".popup__content")) {
                popupClose(e.target.closest(".popup"));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if(unlock) {
        popupActive.classList.remove("open");
        if(doUnlock) {
            bodyLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    if(lockPadding.length > 0) {
        for(let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add("lock");

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }
}

function bodyUnlock(){
    setTimeout(function() {
        if(lockPadding.length > 0) {
            for(let index = 0; index < lockPadding.length; index++){
                const el = lockPadding[index];
                el.style.paddingRight = "0px";
            }
        }
        body.style.paddingRight = "0px";
        body.classList.remove("lock");
    }, timeout);

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, timeout);
}

document.addEventListener("keydown", function (e) {
    if(e.which === 27) {
        const popupActive = document.querySelector(".popup.open");
        popupClose(popupActive);
    }
});



// ЛОАДЕР
window.onload = function() {

    setTimeout(function() {

        document.getElementById("preloader").style.display = "none";

    }, 2000);

};


