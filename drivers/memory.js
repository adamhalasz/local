module.exports = function(Local){
	Local
	.storage('memory')
	.init(function(done){
		done()
	})
	.setter(function(parent, query, language, translation, done){
		// get query from memory
		if(!parent.memory[query]) parent.memory[query] = {};
		
		// get query in language from memory
		if(!parent.memory[query][language]) parent.memory[query][language] = {};
		
		// save translation into memory for the query and the right language
		parent.memory[query][language] = translation;
		
		// callback
		if(done) done(null, parent.memory[query][language])
	})
	.getter(function(parent, query, language, done){
		if(parent.memory[query] && parent.memory[query][language]){
			if(done) done(null, parent.memory[query][language])
			return parent.memory[query][language];
		} else {
			if(done) done(null, null)
			return null;
		}
	})
}