let saisie = "";
let operateur = "";
let signe = "";
let calcul = "";
var nb1 = "";
var nb2 = "";
let inv = false;
let virgule = false;
var resultat = false;

function afficher(touche) {

    // on bloque les touches lorsque le résultat est validé/affiché
    if (resultat) { return }

    // on empêche de saisir la virgule si la saisie est vide
    if (saisie == "" && touche == ".") { return }

    // on empêche de saisir plusieurs fois la virgule
    if (virgule == true && touche == ".") { return saisie }

    // on empêche de saisir des zéros inutiles
    if (saisie == "0" && touche == "0") { return saisie }

    // on incrémente la variable "saisie" en prenant en compte un éventuel appui sur la touche +/-
    if (inv) { saisie = String(touche) } else { saisie += String(touche) }

    // on affiche le résultat en bas de l'écran
    document.getElementById("ecran2").innerHTML = saisie;

    // on définit un booléen correspondant à l'appui sur la touche virgule
    if (touche == ".") { virgule = true }

    // on réinitialise le booléen correspondant à l'appui sur la touche +/-
    inv = false;

    return saisie;
}

function operation(operateur) {

    // on bloque les touches le cas échéant
    if (resultat || saisie == "" || signe != "") { return }

    // on mémorise l'opérateur
    signe = operateur;

    // on récupère le premier nombre suivi de l'opérateur
    nb1 = afficher(operateur); // nb1 = saisie;

    // on récupère le premier nombre sans l'opérateur
    nb1 = String(nb1).substr(0, String(nb1).length - 1)

    // on supprime une éventuelle virgule inutile
    if (nb1.substr(String(nb1).length - 1, 1) == ".") { 
        nb1 = String(nb1).substr(0, String(nb1).length - 1); 
        virgule = false;
    }

    // on formate la chaine avant affichage
    calcul = String(nb1) + ' ' + String(saisie).substr(String(saisie).length - 1, 1);

    // on affiche le calcul en haut de l'écran
    document.getElementById("ecran1").innerHTML = calcul;
    document.getElementById("ecran2").innerHTML = "";

    // on réinitialise la saisie
    saisie = "";

    // on réinitialise le booléen correspondant à l'appui sur la touche virgule 
    virgule = false;

    return;
}

function egal(operateur) {

    // on vérifie si un deuxième nombre a bien été saisi
    if (saisie == "" || signe == "") { return }
    if (saisie == '+' || saisie == '-' || saisie == '*' || saisie == '/' || saisie == '.') {
        saisie = "";
        return;
    }

    // on récupère le deuxième nombre suivi du signe =
    nb2 = afficher(operateur); // nb2 = saisie;

    // on récupère le deuxième nombre sans le signe =
    nb2 = String(nb2).substr(0, String(saisie).length - 1);

    // on supprime une éventuelle virgule inutile
    if (String(nb2).substr(String(nb2).length - 1, 1) == ".") {
        nb2 = String(nb2).substr(0, String(nb2).length - 1);
        virgule = false;
    }

    // on formate la chaine avant affichage
    calcul += ' ' + String(nb2) + ' =';

    // on affiche le calcul en haut de l'écran
    document.getElementById("ecran1").innerHTML = calcul;

    // on appelle la fonction idoine en se basant sur l'opérateur
    switch (operateur) {
        case "+":
            document.getElementById("ecran2").innerHTML = addition(nb1, nb2);
            break;
        case "-":
            document.getElementById("ecran2").innerHTML = soustraction(nb1, nb2);
            break;
        case "*":
            document.getElementById("ecran2").innerHTML = multiplication(nb1, nb2);
            break;
        case "/":
            document.getElementById("ecran2").innerHTML = division(nb1, nb2);
            break;
    }

    // on mémorise que le calcul est terminé
    resultat = true;

    // on réinitialise la saisie
    saisie = "";

    return;
}

function retourArr(a) {

    // on teste si la saisie est nulle
    if (a == "") { return }

    // on détecte une éventuelle virgule
    if (String(a).substr(String(a).length - 1, 1) == ".") { virgule = false }

    // on supprime le dernier caractère
    saisie = String(a).substr(0, String(a).length - 1);

    // on affiche le résultat en bas de l'écran
    document.getElementById("ecran2").innerHTML = saisie;

    return;
}

function inversion(a) {

    // on bloque la touche lorsque le résultat est validé/affiché
    if (resultat) { return }

    // on vérifie la validité de la saisie
    if (a == "" || a == "0") { return }

    // on supprime les zéros inutiles à droite
    while (virgule && String(a).substr(a.length - 1, 1) === "0") {
        a = String(a).substr(0, String(a).length - 1);
    }
    
    // on supprime une éventuelle virgule inutile
    if (String(a).substr(a.length-1, 1) == ".") { 
        a = String(a).substr(0, String(a).length-1);
        virgule = false;
    }

    saisie = a * -1;
    inv = true;
    afficher(saisie);

    return;
}

function nettoyer() {

    // on réinitialise toutes les variables
    saisie = "";
    operateur = "";
    signe = "";
    calcul = "";
    nb1 = "";
    nb2 = "";
    inv = false;
    virgule = false;
    resultat = false;

    // on réinitialise l'affichage
    document.getElementById("ecran1").innerHTML = "";
    document.getElementById("ecran2").innerHTML = "";

    return;
}

function nettoyerEntree() {

    // on réinitialise tout en cas de calcul terminé
    if (resultat) {
        nettoyer();
        return;
    }

    // on réinitialise les variables correspondants à la dernière saisie
    inv = false;
    virgule = false;
    saisie = "";

    // on supprime nb1 en bas de l'écran
    if (nb1 == "") {
        document.getElementById("ecran1").innerHTML = "";
        document.getElementById("ecran2").innerHTML = "";
        return;
    }

    // on supprime nb2 en bas de l'écran
    if (signe != "" && nb2 == "") {
        document.getElementById("ecran1").innerHTML = calcul;
        document.getElementById("ecran2").innerHTML = "";
        return;
    }

    return;
}

function addition(a, b) {

    let c = (+a) + (+b);

    // on limite  le résultat à 2 décimales
    c = c.toFixed(2);
    if (c.substr(c.length - 3, 3) == ".00") { return c.substr(0, c.length - 3) }

    return c;

}

function soustraction(a, b) {

    let c = a - b;

    // on limite  le résultat à 2 décimales
    c = c.toFixed(2);
    if (c.substr(c.length - 3, 3) == ".00") { return c.substr(0, c.length - 3) }

    return c;
}

function multiplication(a, b) {

    let c = a * b;

    // on limite  le résultat à 2 décimales
    c = c.toFixed(2);
    if (c.substr(c.length - 3, 3) == ".00") { return c.substr(0, c.length - 3) }

    return c;
}

function division(a, b) {
    
    let c = a / b;

    // on limite  le résultat à 2 décimales
    c = c.toFixed(2);
    if (c.substr(c.length - 3, 3) == ".00") { return c.substr(0, c.length - 3) }

    return c;
}