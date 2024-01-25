let menuHamb = document.querySelector('.header__mobile.mobile');
let menuMobile = document.querySelector('.header__menu-mobile');

menuHamb.addEventListener('click', () => {
    if (menuHamb.classList.contains('cerrado')) {
        menuHamb.classList.remove('cerrado');
        menuHamb.children[0].classList.add('sup');
        menuHamb.children[1].classList.add('med');
        menuHamb.children[2].classList.add('inf');
        menuMobile.classList.remove('ocultar');
    } else {
        menuHamb.classList.add('cerrado');
        menuHamb.children[0].classList.remove('sup');
        menuHamb.children[1].classList.remove('med');
        menuHamb.children[2].classList.remove('inf');
        menuMobile.classList.add('ocultar');
    }
});