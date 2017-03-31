'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nlp_compromise = require('nlp_compromise');

var _nlp_compromise2 = _interopRequireDefault(_nlp_compromise);

var _wtf_wikipedia = require('wtf_wikipedia');

var _wtf_wikipedia2 = _interopRequireDefault(_wtf_wikipedia);

var _googleTranslateApi = require('google-translate-api');

var _googleTranslateApi2 = _interopRequireDefault(_googleTranslateApi);

var _helpers = require('../../node_modules/ava-ia/lib/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -- Internal
var CONJUNCTION = 'Conjunction';
var PREPOSITION = 'Preposition';
var DETERMINER = 'Determiner';
var COPULA = 'Copula';
var QUESTION = 'Question';
var PRONOUN = 'Pronoun';
var NOUN = 'Noun';
var EXPRESSION = 'Expression';

exports.default = function (state) {

  return new Promise(function (resolve, reject) {
	
	// Coupe à partir de 'wikipedia'
	var action_index = state.tokens.indexOf('wikipedia');
	var terms = _nlp_compromise2.default.text(state.sentence).sentences[0].terms;
	if (action_index == -1) {
		terms.map(function (term, index) {
			if (term.text.toLowerCase().indexOf('wikipedia') != -1)
				action_index = index;
		})
	}
	
	var sentence = '';
	// Filtre les termes indésirables
	terms.map(function (term, index) {
	  if (index > action_index) {  
		if (terms[index].tag !== PRONOUN && terms[index].tag !== QUESTION && terms[index].tag !== COPULA && terms[index].tag !== CONJUNCTION && terms[index].tag !== PREPOSITION && terms[index].tag !== DETERMINER) {
			if ((terms[index].tag !== NOUN && terms[index].tag !== EXPRESSION) || (terms[index].tag === NOUN && term.text != 'information') || (terms[index].tag === EXPRESSION && term.text != 'please')) {
				if (!terms[index + 1]) { 
					sentence += term.text;
				} else
					sentence += term.text + ' ';
			}
		} 
	  }
	});
	
	// test si on a récupéré quelque chose
	if (sentence) {
		
	  // un dernier filtrage, certaines fois il peut arriver que 2 mots soit vu comme un seul, la traduction n'est pas parfaite.
	  // par exemple "is bowling" est vu comme un verbe (1 seul mot) et si on cherche "bowling", c'est embetant...
	  sentence = sentence.replace('is ', '');
		
	  if (state.debug) info('ActionWikipedia'.bold.yellow, 'sentence:'.bold, sentence);
	  
	  // re-traduit en francais pour le wiki en francais
	  (0, _googleTranslateApi2.default)(sentence, { from: 'en', to: 'fr' }).then(function (response) {
		  
			sentence = response.text;
			
			// recherche sur wikipedia
			_wtf_wikipedia2.default.from_api(sentence, 'fr', function (response) {
				var wiki = _wtf_wikipedia2.default.plaintext(response);
				// Envoi au plugin
				setTimeout(function(){	
					state.action = {
					  module: 'wikipedia',
					  command: 'wiki',
					  sentence: sentence,
					  info : wiki
					};
				
					resolve(state);
				}, 500);  
			});
		}).catch(function (error) {
			  // Envoi au plugin l'erreur
			  setTimeout(function(){
				state.action = {
					module: 'wikipedia',
					command: 'error',
					error: 'je suis désolé, je n\'ai pas compris ce qu\'il faut que je recherche'
				};
				resolve(state);
			}, 500);  
		});
    } else {
		setTimeout(function(){
			 // Envoi au plugin l'erreur
			state.action = {
				module: 'wikipedia',
				command: 'error',
				error: 'je suis désolé, je n\'ai pas compris ce qu\'il faut que je recherche'
			};
			resolve(state);
		}, 500);  
	}
  });
};