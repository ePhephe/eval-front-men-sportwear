//Utilisattion de Leeflet pour l'affichage de la carte
//On détermine le point central de la map (Ici, Saint-Etienne long 45.439 lat 4.387)
let map = L.map('map').setView([45.439, 4.387], 13);
//On met en place le fond de la map
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
}).addTo(map);
//On place un marqueru sur Saint-Etienne
let marker = L.marker([45.439, 4.387], {
    color:'#0E6286'
}).addTo(map);

//On récupère les éléments pour le menu burger
let divMenuBurger = document.getElementById(`menuBurger`);
let divNavBurger = document.getElementById(`navigationBurger`);
//On ajouter un listener click sur le menu burger
divMenuBurger.addEventListener(`click`,(e)=>{
    divMenuBurger.classList.toggle(`menu-burger-close`);
    divNavBurger.classList.toggle(`navigation-burger-affiche`);    
});