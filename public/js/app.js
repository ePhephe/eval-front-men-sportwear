//Fonctions accessibles sur l'ensemble du site

//Utilisattion de Leaflet pour l'affichage de la carte
//On détermine le point central de la map (Ici, Saint-Etienne long 45.439 lat 4.387)
let map = L.map('map').setView([45.439, 4.387], 12);
//On met en place le fond de la map
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);
//On crée un icone marqueur pour les boutiques M'S
var msIcon = L.icon({
    iconUrl: '/public/images/images-site/pin-map-ms.png',
    iconSize:     [32, 64], // size of the icon
    iconAnchor:   [16, 64], // point of the icon which will correspond to marker's location
});
//On place un marqueur sur Saint-Etienne (notre position)
let marker = L.marker([45.439, 4.387], {
    color:'#0E6286'
}).addTo(map);
//On place un marqueur pour une première boutique
let markerStore1 = L.marker([45.458, 4.381], {
    icon:msIcon
}).addTo(map).bindPopup(`<strong>M'S Store - Saint-Etienne Nord</strong><br>63 avenue Albert Raymond<br>42 320 Saint-Priest-en-Jarez`);
//On place un marqueru pour une deuxième boutique
let markerStore2 = L.marker([45.446, 4.421], {
    icon:msIcon
}).addTo(map).bindPopup(`<strong>M'S Store Steel - Saint-Etienne Est</strong><br>2 rue Ferrer<br>42 000 Saint-Etienne`);
//On place un marqueru pour une troisième boutique
let markerStore3 = L.marker([45.432, 4.323], {
    icon:msIcon
}).addTo(map).bindPopup(`<strong>M'S Store - Saint-Etienne Ouest</strong><br>3 boulevard Pierre et Marie Curie<br>42 230 Roche-la-Molière`);

//On récupère les éléments pour le menu burger
let divMenuBurger = document.getElementById(`menuBurger`);
let divNavBurger = document.getElementById(`navigationBurger`);
//On ajouter un listener click sur le menu burger
divMenuBurger.addEventListener(`click`,(e)=>{
    divMenuBurger.classList.toggle(`menu-burger-close`);
    divNavBurger.classList.toggle(`navigation-burger-affiche`);    
});

//On récupère l'élément pour la police accessible
let tabInputPolice = document.querySelectorAll(`.switch-input-police`);
let divPolice = document.querySelector(`.switch p`);
let divSwitch = document.querySelector(`.switch`);
//Listener sur le bouton pour la slide en haut
tabInputPolice.forEach(inputPolice => {
        inputPolice.addEventListener(`change`,(e)=>{
        setPolice(e.target.checked);
    });
});

divPolice.addEventListener(`click`,(e)=>{
    divSwitch.classList.toggle(`ouvert`);
})

/**
 * Applique la bonne police selon le choix de l'utilsateur
 * @param {boolean} police - True si la police accessible est choisie, false sinon.
 */
function setPolice(police){
    let body = document.querySelector(`body`);

    if(police===true) {
        body.classList.add(`accessible-theme`);
    }
    else {
        body.classList.remove(`accessible-theme`);
    }
}
//On place ici les fonctions réutilisées dans plusieurs pages
/**
 * Test si du code HTML est présent dans le texte passé en paramètre
 * @param {string} texte - Texte à tester
 * @returns booléen - True s'il y a du code HTML, sinon false
 */
function hasCode(texte) {
    let regHTML = /<("[^"]*"|'[^']*'|[^'">])*>/;
    return regHTML.test(texte);
}
/**
 * Affiche une erreur sur le champ dont l'id est passé en paramètre
 * @param {string} id - id unique de l'élément dans le DOM
 * @param {string} messageErreur - Message d'erreur à afficher
 */
function afficheErreur(id,messageErreur){
    //On récupère l'élément et son élément message d'erreur
    let element = document.getElementById(id);
    let message = document.getElementById(`error-` + id);

    //On lui ajoute la classe d'erreur sur un input
    element.classList.add(`input-error`);
    //On insère le message d'erreur et on l'affiche en lui retirant la classe display none
    message.innerHTML += messageErreur + `<br>`;
    message.classList.remove(`d-none`);

}
/**
 * Enlève les erreurs sur le champ dont l'id est passé en paramètre
 * @param {string} id - id unique de l'élément dans le DOM
 */
function enleveErreur(id){
    //On récupère l'élément et son élément message d'erreur
    let element = document.getElementById(id);
    let message = document.getElementById(`error-` + id);

    //On enlève la classe d'erreur sur l'input
    element.classList.remove(`input-error`);
    //On enlève le message d'erreur et on le masque en lui remettant la classe display none
    message.innerHTML = ``;
    message.classList.add(`d-none`);
    
}

//Lancement de AOS pour les animations au scroll uniquement en desktop
AOS.init({disable: function() {
    let maxWidth = 1080;
    return window.innerWidth < maxWidth;
  }});