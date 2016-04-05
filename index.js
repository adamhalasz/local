// ====================================================
//  Dependencies
// ====================================================
	
	if(module && module.exports){
		var fs = require('fs')
	}


// ====================================================
//  Initialize
// ====================================================
	
	function Local(){
		this._initialize.apply(this, arguments)
		return this;
	}
	
	
// ====================================================
//  Private Methods
// ====================================================
	
	Local.prototype._memory = {};
	Local.prototype._initialize = function(path){
		var local = this;
		if(local._readyCallback){
			
			// start with an empty memory
			if(!path || path == 'memory'){
				local._readyCallback(local._memory)
				
			// read from file system
			} else if (fs) {
				fs.readFile(path, function(error, response){
					if(error) throw error;
					if(response){
						local._memory = response;
						local._readyCallback(local._memory)
					} else {
						throw new Error('No response from localization file at ' + path)
					}
				})
			}
			
			local._readyCallback()
		} else {
			throw new Error('Ready was not defined')
		}
		return local;
	}
	Local.prototype._readyCallback = false;
	
// ====================================================
//  Local Methods
// ====================================================
	
	Local.prototype.ready = function(callback){
		Local.prototype._readyCallback = callback;
	}
	
	Local.prototype.set = function(){
		var local = this;
		return local;
	}
	
	
	Local.prototype.in = function(){
		var local = this;
		return local;
	}
	
	Local.prototype.as = function(){
		var local = this;
		return local;
	}


// ====================================================
//  Export (common js)
// ====================================================
	
	if(module && module.exports) module.exports = Local;
	