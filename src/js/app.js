document.addEventListener('DOMContentLoaded',function(){
    iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body= document.querySelector('body')

    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().top < 0){
           barra.classList.add('fijo')
            body.classList.add('body-scroll')
        }else{
            barra.classList.remove('fijo')
            body.classList.remove('body-scroll')
        }
    })
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace =>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const seccionScroll= e.target.attributes.href.value
            const seccion= document.querySelector(seccionScroll)
            seccion.scrollIntoView({behavior:"smooth"});
        })
    })
}

function crearGaleria(){
    const galeria= document.querySelector('.galeria-imagenes')//seleccionamos la clase

    for(let i=1; i <= 12; i++){
        const imagenes = document.createElement('picture');//creamos los elementos
        imagenes.innerHTML= `
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img src="build/img/thumb/${i}.jpg" alt="imagen galeria" loading="lazy">    
        `;
        imagenes.onclick=function(){
            mostrarImagenes(i);
        }
        galeria.appendChild(imagenes);//las mostramos en la pagina
    }
}

function mostrarImagenes(id){
    const imagenes = document.createElement('picture');//creamos los elementos
        imagenes.innerHTML= `
                <source srcset="build/img/grande/${id}.webp" type="image/webp">
                <img src="build/img/grande/${id}.jpg" alt="imagen galeria" loading="lazy">    
        `;
    //CREA EL OVERLAY CON LA IMAGEN
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagenes);
    overlay.classList.add('overlay');

    //BOTON  PARA CERRAR EL OVERLAY
    const cerrarFoto = document.createElement('P');
    cerrarFoto.textContent='X';
    cerrarFoto.classList.add('btn-cerrar');
    cerrarFoto.onclick =  function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    overlay.appendChild(cerrarFoto);
    //LO AÑADE AL HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}