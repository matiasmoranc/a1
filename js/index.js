let menuHamb = document.querySelector('.header__mobile.mobile');
let menuMobile = document.querySelector('.header__menu-mobile');
let website = document.querySelector('.website');

//menu hamb
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

//abrir fotos
console.log('entro');
let fotos = document.querySelectorAll('.fotos__cont-img');
// let fondoOscuro = document.querySelector('.fondo-oscuro');
for (let i = 0; i < fotos.length; i++) {
    let foto = fotos[i];
    
    foto.addEventListener('click', () => {
        // let src = foto.children[0].src.split('assets/')[1];
        console.log('click');
        let src = foto.children[0].src;
        console.log(src);
        
        let div = document.createElement('div');
        div.classList.add('fondo-oscuro');
        div.classList.add('activar-fondo-oscuro');

        div.innerHTML = `
            <div class="cont-img-abrir">
                <img src="${src}" alt="foto">
            </div>
            <div class="cerrar-img">
                <img src="img/cerrar.png" alt="cerrar">
            </div>
        `;

        website.appendChild(div);

        let cerrar = document.querySelector('.cerrar-img');
        cerrar.addEventListener('click', () => {
           div.remove();
            
        });
    });

}

