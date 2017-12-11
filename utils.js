function trace(s) {
	// affiche une trace avec console.log
	console.log(s);
}

var __utils_compteur = 1; // globale 
var __utils_MAX = 10; // globale 

function debugv1(s) {
	// var compteur = 0; // var. locale => ne fonctionne pas ! 
	// affiche un nombre de messages limité par un compteur

	// affiche le compteur si s n'est pas fourni
	// => un argument non fourni vaut null 
	if (s == null) { 
		trace(__utils_compteur);
		return; 
	}

	if (__utils_compteur++ < __utils_MAX)
		trace(s); 
		
	// e.g. après 10 affichages, la fonction ne fait plus rien 
	// comment remettre à 0 le compteur ?   
}

function razv1() {
	__utils_compteur = 1;
}

var debugv2 = mkDebug(3); // NB : debugv2 est une FONCTION ! 

function mkDebug(max) {
	// Fonction renvoyant une fonction debug()
	// capable de manipuler un scope (ensemble de variables)
	// "protégé" (différent du scope global) 

	// expression "max" = paramètre formel de la fonction mkDebug
	// c'est aussi une variable locale de la fonction mkDebug
	// qui sera accessible depuis la fonction interne 

	var prive_compteur = 0; // var locale à la fonction mkDebug  
	// elle devrait être détruite à la fin de l'exécution de la fonction mkDebug MAIS elle ne le sera pas car la fonction interne garde une référence vers cette variable 
	var prive_MAX = max; 

	return function(s){
		// Cette fonction en cours de construction a accès :
		// 1) au scope global (var. globales) 
		// 2) à ses propres variables locales 
		// QUI n'existeront que pendant l'exécution de la fonction 
		// 3) ET au scope de la fonction mkDebug
		// => que l'on va "enfermer" 
		// pour y donner accès à la fonction interne 

		if (s == null) { 
			trace(prive_compteur + " (max = " + max + ")");
			return; 
		}

		if (prive_compteur++ < prive_MAX)
			trace(s); 
	}; 	
}

// Comment réinitialiser ce compteur ? 
// => debugv3 : objet comportant une fonction d'affichage, une fonction de raz
// pour créer un objet : JSON ! 

function mkODebug(max) {

	var prive_compteur = 0; // var locale à la fonction mkDebug  
	var prive_MAX = max; 

	return {
		print: 			function(s){
							if (s == null) return; 
							if (prive_compteur++ < prive_MAX)
								trace(s); 
						},
		raz: 			function(){
							prive_compteur=0;
						},
		getCompteur: 	function(){
							trace(prive_compteur + " (max = " + max + ")");
						},
		setMax: 		function(newMax){
							max = newMax;
						}
	};  	
}

var oDebug = mkODebug(3); 

function show(refOrId) {
	// affiche l'élément dont la référence ou l'id est fourni
	if (typeof refOrId == "string")
		refOrId = document.getElementById(refOrId); 

	refOrId.style.display="block";	
}
function hide(refOrId) {
	// cache l'élément dont la référence ou l'id est fourni
	if (typeof refOrId == "string")
		refOrId = document.getElementById(refOrId); 

	refOrId.style.display="none";
}
function html(refOrId, val) {
	// affecte une valeur à l'élément dont la référence ou l'id est fourni; si val n'est pas fourni, on renvoie son contenu
	if (typeof refOrId == "string")
		refOrId = document.getElementById(refOrId); 

	if (val == null) {		// lecture 
		return refOrId.innerHTML; 
	} else {				// ecriture 
		refOrId.innerHTML = val; 
	}
}
function val(refOrId, val) {
	// affecte une valeur à l'élément dont la référence ou l'id est fourni; si val n'est pas fourni, on renvoie son contenu
	// l'élément est un champ de formulaire

	if (typeof refOrId == "string")
		refOrId = document.getElementById(refOrId); 

	if (val == null) {		// lecture 
		return refOrId.value; 
	} else {				// ecriture 
		refOrId.value = val; 
	}
}

function checked(refOrId, val) {
	// affecte une valeur à l'élément dont la référence ou l'id est fourni; si val n'est pas fourni, on renvoie son contenu
	// l'élément est une case à cocher 

	if (typeof refOrId == "string")
		refOrId = document.getElementById(refOrId); 

	if (val == null) {		// lecture 
		return refOrId.checked; 
	} else {				// ecriture 
		refOrId.checked = val; 
	}
}

trace("Librairie utils chargee (trace,hide,show,html,val)");





