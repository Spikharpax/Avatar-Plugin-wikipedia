'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../../node_modules/ava-ia/lib/helpers');

// -- Internal
//var RULES = ['translate [Preposition]? [Demonym]', 'translate * [Preposition] [Demonym]'];

exports.default = function (state, actions) {
	
	if (state.isIntent) return (0, _helpers.resolve)(state);
	
	var match = (0, _helpers.syntax)(state.sentence, Config.modules.wikipedia.rules.wiki); 

	if (match) {
		if (state.debug) info('IntentKnowledge'.bold.green, 'syntax:', 'true'.green );
		state.isIntent = true;
		return (0, _helpers.factoryActions)(state, actions);
	} else 
		return (0, _helpers.resolve)(state);	
  
};