require('colors');


exports.action = function(data, callback){
  
	var tblCommand = {
		
		error: function() {Avatar.speak(data.action.error, data.client, function() {  
								Avatar.Speech.end(data.client);
							});
		},
		wiki: function() {knowledge(data.client, data.action.sentence, data.action.info)}
	};
	
	info("Wikipedia command:", data.action.command.yellow, "From:", data.client.yellow);
	tblCommand[data.action.command]();
  
	callback();
  
}



function knowledge(client, sentence, wiki) {
	
	if (wiki) {
		
		var tblwiki = [];
		var next;
		var wikisentence = '';
		var wikicut = wiki.split('. ');
		
		// Création d'un tableau de phrases
		for(var i=0;i<wikicut.length;i++) {
			next = false;
			if (wikicut[i].length < Config.modules.wikipedia.sentence_lenght) {
				wikisentence = (wikisentence.length > 0) ? wikisentence + '. ' + wikicut[i] : wikicut[i];
				if (wikisentence.length > Config.modules.wikipedia.sentence_lenght) next = true;
			} else {
				if (wikisentence.length > 0)  tblwiki.push(wikisentence);
		
				wikisentence = wikicut[i];
				next = true;
			}
			
			if (next) {
				tblwiki.push(wikisentence);
				wikisentence = '';
			}
						
		}
		
		// Envoi du tableau au speak 
		wiki_speak(client, tblwiki, 0 );
		
	} else
		Avatar.speak("Je ne suis pas arrivé a récupérer des info" + (sentence ? (" sur " + sentence) : ''), client, function(){
			Avatar.Speech.end(client);
		});

}


function wiki_speak (client, tblwiki, pos ) {
	
	if (pos == tblwiki.length) {
		return Avatar.Speech.end(client);
	}
	
	// speak 
	Avatar.speak(tblwiki[pos], client, function(){
		if (!tblwiki[pos + 1]) return Avatar.Speech.end(client);
		
		var tts = Config.modules.wikipedia.next_askme.split('|');
		tts = tts[Math.floor(Math.random() * tts.length)];
		
		// Demande si il faut continuer
	    Avatar.askme( tts, client, 
		Config.modules.wikipedia.next_answer
		, 0, function(answer, end){
			switch (answer) {
				case 'again' : // Recommence...
					end(client);
					wiki_speak (client, tblwiki, pos );
					break;
				case 'yes' :   // on continue
					end(client);
					wiki_speak (client, tblwiki, ++pos );
					break;
				default:
				case 'stop' :  // on arrete
					Avatar.speak('d\'accord', client, function(){
						end(client,true);
					})
			}
		});
	}); 
	
}



