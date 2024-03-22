//On récupère le formulaire de contact
let formContact = document.getElementById(`form-contact`);
//On récupère chacun des champs qu'il faudra tester
let inputNom = document.getElementById(`nom`);
let inputPrenom = document.getElementById(`prenom`);
let inputEmail = document.getElementById(`email`);
let inputObjet = document.getElementById(`objet`);
let inputMessage = document.getElementById(`message`);
let inputReference = document.getElementById(`reference`);

/**
 * Vérifie qu'un champ nom ou prénom est correct
 * @param {object} element - Element à tester
 * @returns booléen - True si tout est bon, false s'il y a une erreur
 */
function verifNomPrenom(element){
    //On définit le test à true par défaut
    let test = true;
    //on définit notre expression régulière
    let reg = /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*$/;

    //On remet les erreurs à zéro
    enleveErreur(element.id);

    //On teste si le champ est à la bonne longueur
    if (element.value.length > 50 || element.value.length < 2) {
        if (element.value === ``) {
            afficheErreur(element.id, `Ce champ ne peut pas être vide`);
            test = false;
        } else {
            afficheErreur(element.id, `Ce champ doit être compris entre 2 et 50 caractères`);
            test = false;
        }
    }

    //On teste si le champ respecte l'expression régulière
    if (reg.test(element.value)===false && element.value != ``) {
        afficheErreur(element.id, `Ce champ comporte des caractères non autorisés`);
        test = false;
    }

    //On teste si il y a du code dans le champ
    if (hasCode(element.value)) {
        afficheErreur(element.id, `Vous ne pouvez pas injecter de code ici ! `);
        test = false;
    }

    return test;
}
/**
 * Vérifie si un email est valide
 * @param {object} email - Element input d'un e-mail
 * @returns booléen - True l'email est valide, False sinon
 */
function validationEmail(email){
    let test = true;
    let reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //On remet à zéro les erreurs
    enleveErreur(email.id);

    if(reEmail.test(email.value)===false) {
        //Si c'est vide on affiche une erreur particulière
        if(email.value === ``){
            afficheErreur(email.id,`Ce champ ne peut pas être vide.`);
        } 
        else {
            afficheErreur(email.id,`Le format de votre email est incorrect. Il doit être du type : test@test.fr.`);
        }
        test = false;
    }

    //On teste la taille maximale
    if(email.value.length > 320) {
        afficheErreur(email.id,`Le format de votre email est incorrect. Il doit faire moins de 320 caractères.`);
        test = false;
    }
    
    return test;
}
/**
 * Vérifie si la référence saisie est valide
 * @returns booléen - True la référence est valide, False sinon
 */
function validationReference() {
    //On définit l'expression régulière correspondate au format XXX-123456
    let regReference = /^[a-zA-Z]{3}-\d{6}$/;
    
    //On remet à zéro les erreurs au début du test
    enleveErreur(`reference`);

    //Si l'expression régullère ne passe pas on affiche une erreur
    if(regReference.test(inputReference.value)===false) {
        afficheErreur(`reference`,`Ce champ doit respecter le format XXX-123456`);
    }

    return regReference.test(inputReference.value);
}
/**
 * Vérifie si l'objet est correctement saisie et gère l'affichage de la référence
 * @returns booléen - True la référence est valide, False sinon
 */
function testObjet() {
    //On remet les erreurs à zéro au début du test
    enleveErreur(`objet`);

    //Si la valeur est vide, on affiche une erreur
    if(inputObjet.selectedOptions[0].value===``) {
        afficheErreur(`objet`,`Ce champ ne peut pas être vide`);
        return false;
    }

    //On récupère la div qui contient la référence
    let divReference = document.getElementById(`div-reference`);
    //On teste si l'objet appartient à ceux qui demande la référence
    if(inputObjet.selectedOptions[0].value===`info-produit` || inputObjet.selectedOptions[0].value===`probleme-produit`){
        divReference.classList.remove(`d-none`);
    }
    else {
        divReference.classList.add(`d-none`);
    }

    return true;
}
/**
 * Vérifie si le message saisi est valide
 * @returns booléen - True la message est valide, False sinon
 */
function testMessage() {
    //On remet les erreurs à zéro
    enleveErreur(`message`);

    //Premier test : est-ce que le message est vide
    if(inputMessage.value===``) {
        afficheErreur(`message`,`Ce champ ne peut pas être vide`);
        return false;
    }
    else {
        //Deuxième test : est-ce qu'il y a du code html dans le message
        if(hasCode(inputMessage.value)) {
            afficheErreur(`message`,`Vous ne pouvez pas injecter de code ici ! `);
            return false;
        }
        else {
            //Dernier test : est-ce que le message fait plus de 500 caractères
            if(inputMessage.value.length>500) {
                afficheErreur(`message`,`Votre message est trop long `);
                return false;
            }
        }
    }

    return true;
}
/**
 * Affiche le nombre de caractères saisis par l'utilisateur dans le message
 */
function compteurCaracteres() {
    //On récupère le span correspondant
    let spanLabelMessage = document.getElementById(`nb-caracteres-message`);
    //On lui donne la longueur de la chaine de caractère du message
    spanLabelMessage.innerText = inputMessage.value.length;
}

//On ajoute un listener sur chaque élément pour sa validation
inputNom.addEventListener(`change`,(e)=>{
    verifNomPrenom(e.target);
});
inputPrenom.addEventListener(`change`,(e)=>{
    verifNomPrenom(e.target);
});
inputEmail.addEventListener(`change`,(e)=>{
    validationEmail(e.target);
});
inputObjet.addEventListener(`change`,(e)=>{
    testObjet();
});
inputReference.addEventListener(`change`,(e)=>{
    validationReference();
});
inputMessage.addEventListener(`input`,(e)=>{
    testMessage();
    compteurCaracteres();
});

//On ajoute un listener sur la validation du formulaire
formContact.addEventListener(`submit`,(e)=>{
    //On interrompt le comportement par
    e.preventDefault();

    //On définit nos variables pour les tests
    let valide = true;
    let tabTest = [];

    tabTest.push(verifNomPrenom(inputNom));
    tabTest.push(verifNomPrenom(inputPrenom));
    tabTest.push(validationEmail(inputEmail));
    tabTest.push(testObjet());
    tabTest.push(testMessage());
    if(inputObjet.selectedOptions[0].value===`info-produit` || inputObjet.selectedOptions[0].value===`probleme-produit`) {
        tabTest.push(validationReference());
    }

    //On parcourt tous les tests pour chercher une erreur
    tabTest.forEach(test => {
        if(test===false) {
            valide = false;
        }
    });

    if(valide === true) {
        //On pourrait ici lancer le traitement back nécessaire à l'envoi du message

        //On récupère notre div modal pour afficher le résultat
        let divModal = document.getElementById(`modal`);

        //On affiche notre modal
        divModal.classList.remove(`d-none`);

        //On définit le comportement du bouton de la modal
        let btnFermer = document.getElementById(`btn-fermer`);
        btnFermer.addEventListener(`click`,()=>{
            divModal.classList.add(`d-none`);
        });
    }
    else {
        //console.log(`KO`);
    }
});
