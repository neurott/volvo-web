(function ($) {
    
    "use strict";

    $(window).on('load', function() {
        $('#js-preloader').addClass('loaded');
    });

    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      var box = $('.header-text').height();
      var header = $('header').height();

      if (scroll >= box - header) {
        $("header").addClass("background-header");
      } else {
        $("header").removeClass("background-header");
      }
    })

    var width = $(window).width();
        $(window).resize(function() {
        if (width > 767 && $(window).width() < 767) {
            location.reload();
        }
        else if (width < 767 && $(window).width() > 767) {
            location.reload();
        }
    })

    if($('.menu-trigger').length){
        $(".menu-trigger").on('click', function() {
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    }

    const formSubscribe = document.querySelector('#subscribe');
    if (formSubscribe) {
        formSubscribe.addEventListener('submit', function(e) {
            e.preventDefault();
            const avisoSubscribe = document.querySelector('#subscribe-aviso');
            const inputEmail = document.querySelector('#exampleInputEmail1');
            const correo = inputEmail.value.trim();
            const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

            if (!correoValido) {
                avisoSubscribe.className = "avisoerror";
                avisoSubscribe.textContent = "Ingresa un correo electrónico válido";
                avisoSubscribe.hidden = false;
                return;
            }

            avisoSubscribe.className = "aviso";
            avisoSubscribe.textContent = "¡Listo! Te suscribiste con " + correo + ". Revisa tu correo por el descuento.";
            avisoSubscribe.hidden = false;
            formSubscribe.reset();
        });
    }

    $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                var width = $(window).width();
                if(width < 991) {
                    $('.menu-trigger').removeClass('active');
                    $('.header-area .nav').slideUp(200);    
                }               
                $('html,body').animate({
                    scrollTop: (target.offset().top) - 80
                }, 700);
                return false;
            }
        }
    });

    $(window).on('load', function() {
        if($('.cover').length){
            $('.cover').parallax({
                imageSrc: $('.cover').data('image'),
                zIndex: '1'
            });
        }

        $("#preloader").animate({
            'opacity': '0'
        }, 600, function(){
            setTimeout(function(){
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });
    });
    
})(window.jQuery);

function actualizarContadorCarrito() {
    const contador = document.querySelector('#carrito-contador');
    if (!contador) {
        return;
    }
    let carrito = [];
    try {
        carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    } catch (e) {
        carrito = [];
    }
    const totalUnidades = carrito.reduce((total, item) => total + (item.cantidad || 0), 0);
    if (totalUnidades > 0) {
        contador.textContent = totalUnidades;
        contador.hidden = false;
    } else {
        contador.hidden = true;
    }
}
actualizarContadorCarrito();

// Juegos que rota el banner del inicio. El precio y el enlace deben coincidir
// con lo que tiene el mismo juego en el arreglo de productos.js.
const juegosBanner = [
    {
        fondo: "assets/images/wj1cjy6hy0t51.jpg", 
        tarjeta: "assets/images/assassinscreed2.jpg",
        nombre: "Assassin's Creed",
        enlace: "detalle-producto.html?id=assassins-creed",
        precio: "$19.990",
        oferta: "-50%",
        posicion: "center bottom"
    },
    {
        fondo: "assets/images/igra-art-sushchestvo-warframe-voin-oruzhie-fantastika-landsh.jpg",
        tarjeta: "assets/images/warframe-portada.jpg",
        nombre: "Warframe",
        enlace: "detalle-producto.html?id=warframe",
        precio: "GRATIS",
        oferta: "",
        posicion: "center top"
    }

];

let indiceActual = 0;

function cambiarBanner() {
    const banner = document.querySelector('.main-banner');
    if (!banner) {
        return;
    }
    const imgTarjeta = document.querySelector('.main-banner .right-image img');
    const enlaceTarjeta = document.querySelector('.main-banner .right-image a');
    const txtPrecio = document.querySelector('.main-banner .right-image .precio');
    const txtOferta = document.querySelector('.main-banner .right-image .oferta');

    banner.style.transition = "opacity 0.4s ease-in-out";
    banner.style.opacity = "0";


    setTimeout(() => {
        indiceActual = (indiceActual + 1) % juegosBanner.length;

        banner.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.1) 70%), url(${juegosBanner[indiceActual].fondo})`;
        banner.style.backgroundPosition = juegosBanner[indiceActual].posicion;
        imgTarjeta.src = juegosBanner[indiceActual].tarjeta;
        imgTarjeta.alt = `Portada de ${juegosBanner[indiceActual].nombre}`;
        // El enlace tambien cambia, si no la portada llevaria siempre al mismo juego
        if (enlaceTarjeta) {
            enlaceTarjeta.href = juegosBanner[indiceActual].enlace;
        }
        txtPrecio.textContent = juegosBanner[indiceActual].precio;

        if (juegosBanner[indiceActual].oferta === "") {
            txtOferta.style.display = "none";
        } else {
            txtOferta.style.display = "inline-block";
            txtOferta.textContent = juegosBanner[indiceActual].oferta;
        }


        banner.style.opacity = "1";
    }, 400);
}

if (document.querySelector('.main-banner')) {
    setInterval(cambiarBanner, 10000);
}

// Selector de tema claro/oscuro. El atributo data-theme ya lo deja puesto
// el script inline en el <head> (evita el parpadeo del tema equivocado).
(function () {
    "use strict";

    var THEME_KEY = "volvo-theme";
    var root = document.documentElement;

    function guardarTema(tema) {
        try {
            localStorage.setItem(THEME_KEY, tema);
        } catch (e) {}
    }

    function aplicarIcono(boton, tema) {
        boton.innerHTML = tema === "dark"
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }

    function crearBotonTema() {
        var boton = document.createElement("button");
        boton.type = "button";
        boton.className = "theme-toggle";
        boton.setAttribute("aria-label", "Cambiar entre tema claro y oscuro");
        aplicarIcono(boton, root.getAttribute("data-theme"));

        boton.addEventListener("click", function () {
            var temaActual = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
            var nuevoTema = temaActual === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", nuevoTema);
            guardarTema(nuevoTema);
            aplicarIcono(boton, nuevoTema);
        });

        document.body.appendChild(boton);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", crearBotonTema);
    } else {
        crearBotonTema();
    }
})();