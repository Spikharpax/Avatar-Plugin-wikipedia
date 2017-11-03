wikipedia
=========

Ce plugin est un add-on pour le framework [Avatar](https://github.com/Spikharpax/Avatar-Serveur)

Demandez ce que vous voulez à Avatar, il a une connaissance sur tout... Merci Wikipedia !! ;-D

## Installation

- Dézippez le fichier `Avatar-Plugin-wikipedia-Master.zip` dans un répertoire temporaire
- Copiez le répertoire `wikipedia` dans le répertoire `Avatar-Serveur/plugins`

## Configuration
La configuration du plugin se fait dans le fichier `Avatar-Serveur/plugins/wikipedia/wikipedia.prop`

### Longueur des tts
Pour un meilleur dialogue, la définition wiki est coupée par des textes d'une longueur définie dans la propriété `sentence_lenght` (par défaut 300 caractères).

```xml
"sentence_lenght" : 300,
```	


## Les commandes

Les règles sont définies dans le tableau de syntaxes `wiki`

Une seule syntaxe est définie. La règles doit inclure le mot **wikipedia** 

Toutes les syntaxes de phrases qui comprennent ce mot peuvent être utilisées. Il n'y a pas de règles fixes.

Quelques exemples possibles:
- Cherche dans wikipedia qui est Albert Einstein
- Cherche dans wikipedia des infos sur l'univers
- Tu peux regarder dans wikipedia ce que c'est que le temps 
- Recherche dans wipidepia qui est Louis XVI
- Fais une recherche dans wikipedia sur apollo 11 s'il te plait
- Recherche dans wikipedia des informations sur la coupe du monde de football
- On veux savoir sur wikipedia c'est qui Michel Platini
- C'est quoi pour Wikipédia le billard
- Fais une recherche dans Wikipédia sur le billard américain
- Tu peux faire une recherche dans Wikipédia pour savoir qui est john Wayne s'il te plait
- Cherche dans Wikipédia la définition du cinéma
- Recherche dans Wikipédia des informations sur le Brésil

Si Avatar ne trouve pas des informations dans wikipedia, il vous le signifie.

Si Avatar trouve des informations, il commence la lecture puis lorsque la première partie du texte a été vocalisé, il vous demande si il doit continuer.

Dites alors:
- ["oui s'il te plait","s'il te plait","vas-y","oui vas-y"] => Passe à la partie suivante.
- ["Sauvegarde le"] => Sauvegarde la recherche dans un fichier <wikipedia>/wikidoc/<Recherche>.txt
- ["répete","encore"] =>  Repête la partie du texte vocalisée.
- ["non c'est bon","non merci","merci"] =>  Stop la lecture.

Toutes ces réponses sont définies dans le fichier de propriétés du plugin. Vous pouvez les modifier ou en ajouter.

   
## Versions
Version 1.4 (03-11-2017)
- Les fichiers intent et action déplacés dans le répertoire du plugin. Chargés automatiquement (Avatar serveur 0.1.5)

Version 1.3 (22-04-2017)
- Petite mise à jour, amélioration de la recherche

Version 1.2 (17-04-2017)
- Amélioration du à la correction du modules wtf_wikipedia
	- Copiez le fichier modules wtf_wikipedia/src/index.js depuis Avatar Serveur V 0.1.3 (17-04-2017) et + 
- Ajout d'une règle 'sauvegarde le' pour enregistrer la recherche dans un fichier.
	
Version 1.1 (15-04-2017)
- Petite mise à jour, amélioration de la recherche

Version 1.0 
- Version Released
