var fs = require('fs')

module.exports = function(Local){
	Local
	.storage('fileSystem')
	.init(function(done){
		fs.readFile(Local.path, function(error, response){
			done.apply(this, arguments)
			Local.memory = JSON.parse(response);
		})
	})
	.setter(function(parent, query, language, translation, done){
		// get query from memory
		if(!parent.memory[query]) parent.memory[query] = {};
		
		// get query in language from memory
		if(!parent.memory[query][language]) parent.memory[query][language] = {};
		
		// save translation into memory for the query and the right language
		parent.memory[query][language] = translation;
		
		fs.writeFile(parent.path, JSON.stringify(parent.memory, null, 4), function(error){
			if(error) {
				done.apply(this, arguments)
			} else {
				done(null, parent.memory[query][language])
			}
		})
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