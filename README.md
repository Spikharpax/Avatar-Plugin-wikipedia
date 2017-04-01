wikipedia
=========

Ce plugin est un add-on pour le framework [Avatar](https://github.com/Spikharpax/Avatar-Serveur)

Demandez ce que vous voulez à Avatar, il a une connaissance sur tout... Merci Wikipedia !! ;-D

Ce plugin est fait à titre d'exemple, n'hésitez pas à le modifier pour l'améliorer. Enjoy


## Installation

- Dézippez le fichier `Avatar-Plugin-wikipedia-Master.zip` dans un répertoire temporaire
- Copiez le répertoire `wikipedia` dans le répertoire `Avatar-Serveur/plugins`
- Copiez le fichier `intents/intent.knowledge.js`dans le répertoire `Avatar-Serveur/ia/intents/`
- Copiez le fichier `actions/action.wikipedia` dans le répertoire `Avatar-Serveur/ia/actions/`
- Editez le fichier `Avatar-Serveur/ia/actions/index.js`, allez à la fin du fichier et juste avant `function _interopRequireDefault(obj)` ajoutez les lignes suivantes:

```javascript
var _actionWikipedia = require('./action.wikipedia');

Object.defineProperty(exports, 'wikipedia', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_actionWikipedia).default;
  }
});

// Fin du fichier...
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

- Editez le fichier `Avatar-Serveur/ia/intents/index.js`, allez à la fin du fichier et juste avant `function _interopRequireDefault(obj)` ajoutez les lignes suivantes:

```javascript
var _intentKnowledge = require('./intent.knowledge');

Object.defineProperty(exports, 'knowledge', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_intentKnowledge).default;
  }
});

// Fin du fichier...
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

- Editez le fichier `Avatar-Serveur/ia/index.js`
	- Ajoutez dans l'import des intents, l'intention `knowledge`
	- Ajoutez dans l'import des actions, l'action `wikipedia`
	- Ajoutez dans la fonction export.intent(), l'association de l'intention-action

```javascript
import { knowledge, tvChannels, tvActions, music, weather, hour,  blague, manageAvatar, shoppingList, translate, lastAction, intentEnd} from './intents';
import { wikipedia, freeTV, freeRules, Sonos, forecastMsn, forecastYahoo, worldHour, jokeOfDay, avatarRules, shopping, translator, backupAction, actionEnd} from './actions';


exports.intent = function () {

	// Configure the intents
	ava
	 .intent(translate, translator)
	 // Déclaration wiki CI-DESSOUS !
	 .intent(knowledge, wikipedia)
	 .intent(hour, worldHour)
	 .intent(weather, [forecastYahoo, forecastMsn])
	 .intent(music, Sonos)
	 .intent(blague, jokeOfDay)
	 .intent(manageAvatar, avatarRules)
	 .intent(shoppingList, shopping)
	 .intent(lastAction, backupAction)
	 .intent(intentEnd, actionEnd)  // Toujours à la fin, controle si une règle est passée
}
```


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

Si Avatar ne trouve pas des informations dans wikipedia, il vous le signifie.

Si Avatar trouve des informations, il commence la lecture puis lorsque la première partie du texte a été vocalisé, il vous demande si il doit continuer.

Dites alors:
- ["oui s'il te plait","s'il te plait","vas-y","oui vas-y"] => Passe à la partie suivante.
- ["répete","encore"] =>  Repête la partie du texte vocalisée.
- ["non c'est bon","non merci","merci"] =>  Stop la lecture.

Toutes ces réponses sont définies dans le fichier de propriétés du plugin. Vous pouvez les modifier ou en ajouter.

   
## Versions
Version 1.0 
- Version Released
