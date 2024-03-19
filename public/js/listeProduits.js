//On récupère la DIV qui va accueillir les informations
let divProduits = document.getElementById(`listeProduits`);

//On récupère tous nos inputs qui servent à filtrer la recherche
let inputSearch = document.getElementById(`search`);
let inputPrixMini = document.getElementById(`prix-mini`);
let inputPrixMaxi = document.getElementById(`prix-maxi`);
let inputTri = document.getElementById(`tri-prix`);
//Sur chacun, on applique un listener au changement de valeur qui affiche les produits
inputSearch.addEventListener(`change`, (e) => {
    chargeProduits();
});
inputPrixMini.addEventListener(`change`, (e) => {
    chargeProduits();
});
inputPrixMaxi.addEventListener(`change`, (e) => {
    chargeProduits();
});
inputTri.addEventListener(`change`, (e) => {
    chargeProduits();
});

/**
 * Vérifie que le champ de recherche est correctement rempli (pas de code injecté)
 * @param {string} texte - Chaîne de caractères à tester
 * @returns booléen - True si du code est détecté, false sinon
 */
function valideRecherche(texte) {
    //On remet les erreurs à zéro
    enleveErreur(`search`);

    //On teste si le chaîne contient du code et on affiche l'erreur en fonction
    if (hasCode(texte) === true) {
        afficheErreur(`search`, `Le champ de recherche ne peut pas contenir de code HTML`);
    }

    return hasCode(texte);
}

/**
 * Vérifie que le prix passé en paramètre est correct
 * @param {float} prix - Prix à tester
 * @param {string} id - Id de l'élément tester
 * @returns booléen - True s'il y a une erreur, False sinon
 */
function validePrix(prix, id) {
    //On remet les erreurs à zéro
    enleveErreur(id);

    //On teste si le prix fourni n'est pas inférieur à 0
    if (prix < 0) {
        afficheErreur(id, `Le prix ne peut pas être inférieur à 0 €`);
        return true;
    }
    //On teste si le prix fourni n'est pas trop grand
    else if (prix > 9999999) {
        afficheErreur(id, `Le prix ne peut pas être supérieur à 9 999 999 €`);
        return true;
    }
    else {
        return false;
    }
}

/**
 * Filtre le tableau des produits
 * @param {array} tabProduits - Tableau des produits à trier
 * @returns array - Tableau des produits triés
 */
function filtreProduit(tabProduits) {
    //On déclare notre nouveau tableau
    let newTabProduits = [];
    //On initialise la valeurs des filtres
    let prixMini = inputPrixMini.value != `` ? parseFloat(inputPrixMini.value) : 0;
    let prixMaxi = inputPrixMaxi.value != `` ? parseFloat(inputPrixMaxi.value) : 9999999;
    let search = inputSearch.value != `` ? inputSearch.value : ``;

    //Si les champs de filtre ne sont pas corrects, on retourne le tableau sans tri
    if (valideRecherche(search) === true) {
        return tabProduits;
    }
    if (validePrix(prixMini, inputPrixMini.id) === true) {
        return tabProduits;
    }
    if (validePrix(prixMaxi, inputPrixMaxi.id) === true) {
        return tabProduits;
    }

    //Si tout est OK, on parcourt nos éléments pour vérifier s'ils correspondent
    tabProduits.forEach(unProduit => {
        if (unProduit.nom.search(search) != -1 && unProduit.prix > prixMini && unProduit.prix < prixMaxi) {
            //On ajoute l'élément dans le nouveau tableau s'il est OK
            newTabProduits.push(unProduit);
        }
    });

    //On retourne le tableau filtré
    return newTabProduits;
}

/**
 * Trie le tableau des produits
 * @param {array} tabProduits - Tableau des produits à trier
 * @returns array - Tableau des produits trié
 */
function triProduit(tabProduits) {
    //On récupère la valeur du tri
    let tri = inputTri.selectedOptions[0].value != `` ? inputTri.selectedOptions[0].value : ``;

    //Selon le tri, on applique la bonne fonction de tri
    if (tri === `prix-asc`) {
        tabProduits = tabProduits.sort(function (a, b) {
            return a.prix - b.prix;
        });
    }
    else if (tri === `prix-desc`) {
        tabProduits = tabProduits.sort(function (a, b) {
            return b.prix - a.prix;
        });
    }

    return tabProduits;
}

/**
 * Affiche la liste des produits dans l'élément HTML correspondant
 * @param {*} tabProduits 
 */
function afficheProduits(tabProduits) {
    //On initialise le template et la div produit
    let templateHTML = ``;
    divProduits.innerHTML = ``

    //On applique les filtres et les tris
    tabProduits = filtreProduit(tabProduits);
    tabProduits = triProduit(tabProduits);

    //On parcourt tous nos produits pour les mettre en forme
    tabProduits.forEach(unProduit => {
        templateHTML += `<article data-aos="fade-up" class="large-3-12 small-4-4 medium-4-8 padding-20px">
            <a class="flex direction-column gap" href="./detail-produit.html?id-produit=365896" title="Accès à la page produit de la ${unProduit.nom}">
                <div class="large-12-12">
                    <img class="responsive" src="./public/images/images-produits/${unProduit.photo}" alt="Photos de la paire de basket ${unProduit.nom}">
                </div>
                <div class="flex justify-between">
                    <h3 class="large-7-12">${unProduit.nom}</h3>
                    <span class="prix large-5-12">${unProduit.prix} €</span>
                </div>
                <p>
                ${unProduit.description}
                </p>
            </a>
        </article>`;
    });

    //On applique le template à l'élément HTML
    divProduits.innerHTML = templateHTML;
}

/**
 * Charge la liste des produits
 */
function chargeProduits() {
    //Appel du fichier json pour construire la liste
    fetch(`./public/json/baskets.json`).then(res => {
        return res.json();
    }).then(rep => {
        //On appelle notre fonction d'affichage
        afficheProduits(rep);
        //console.log(rep);
    }).catch(err => {
        console.log(err);
    });
}

//On initialise notre liste au chargement de la page
chargeProduits();