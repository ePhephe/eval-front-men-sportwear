//On définit l'aperçu pour nos photos
let thumbSwiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});

//On définit notre slider
let swiper = new Swiper('.mySwiper2', {
    //Paramètre du slider
    loop: true, //On reboucle sur la première photo en arrivant à la fin
    effect: "fade", //On met en effet de fondu en transition des images
    lazy: true, //On active le lazy loading

    //Définition des flèches de navigation
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    //On attache l'aperçu à notre slider
    thumbs: {
        swiper: thumbSwiper,
    }
});

//On récupère nos couleurs
let tabDivCouleur = document.querySelectorAll(`#choix-couleur div`);
//On ajoute un listener sur chaque couleur pour envoyer à la bonne photo
tabDivCouleur.forEach((divCouleur, index) => {
    divCouleur.addEventListener(`click`, (e) => {
        e.preventDefault();
        swiper.slideTo(index)
    })
});