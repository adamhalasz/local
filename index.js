// ====================================================
//  Dependencies
// ====================================================
	
	if(module && module.exports){
		var fs = require('fs')
		var async = require('async')
		var drivers = {
			'memory': require('./drivers/memory'),
			'fileSystem': require('./drivers/fileSystem')
		};
	}


// ====================================================
//  Initialize
// ====================================================
	
	function Local(source){
		
		if(!source || typeof source == 'object'){
			this._storage = 'memory';
			this.memory = source;
			
		} else if (typeof source == 'string') {
			this._storage = 'fileSystem';
			this.path = source;
			
		} else {
			throw new Error('Undefined source type')
		}
		
		return this;
	}
	
	
// ====================================================
//  Shared Variables
// ====================================================
	
	Local.prototype.memory = {};
	Local.prototype._readyCallback = false;
	Local.prototype.storages = {};
	Local.prototype._initialize = function(){
		var local = this;
		this._driver = drivers[local._storage](local);
		if(local._readyCallback){
			
			// start with an empty memory
			if(this._storage == 'memory'){
				if(!local.memory) local.memory = {};
				local._readyCallback(local.memory)
				
			// read from file system
			} else if (this._storage == 'fileSystem' && fs) {
				var fileContents;
				async.series([ readFile, updateMemory ], local._readyCallback)
				
				function readFile(done){
					fs.readFile(local.path, function(error, response){
						if(error && error.code == 'ENOENT'){
							fileContents = '{}';
							fs.writeFile(local.path, fileContents, function(error){
								if(error) throw error;
								done()
							})
						} else {
							fileContents = response;
							done()
						}
					})
				}
				
				function updateMemory(done){
					if(fileContents){
						local.memory = JSON.parse(fileContents);
						local._readyCallback(local.memory)
					} else {
						throw new Error('No fileContents from localization file at ' + local.path)
					}
				}
				
			} else {
				throw new Error('Invalid storage mechanism');
			}
			
		} else {
			throw new Error('Ready was not defined')
		}
		
		return local;
	}

// ====================================================
//  Storage
// ====================================================	

	function Storage(storageName, parent){
		this.name = storageName;
		this.parent = parent;
		return this;
	}
	Storage.prototype.setter = function(callback){
		this.parent._set = callback;
		return this;
	}
	Storage.prototype.getter = function(callback){
		this.parent._get = callback;
		return this;
	}
	Storage.prototype.init = function(callback){
		this.parent._init = callback;
		return this;
	}
	Local.prototype.storage = function LocalStorage(storageName){
		return new Storage(storageName, this)
	}
	
// ====================================================
//  Set
// ====================================================

	function Set(query, parentClass){
		this.query = query;
		this.parentClass = parentClass;
		return this;
	}

	Set.prototype.to = function(translation){
		this.translation = translation;
		return this;
	}
	
	Set.prototype.in = function(language){
		this.language = language;
		this.run();
		return this;
	}
	
	Set.prototype.run = function(){
		var parent = this.parentClass;
		var scope = this;
		
		parent._set(parent, scope.query, scope.language, scope.translation, function(error, response){
			if(error) {
				if(scope._catch) {
					scope._catch(error)
				} else {
					throw error;
				}
			} else if (scope._then) {
				scope._then(response)
			}
		})
		
		return this.parentClass;
	}
	
	Set.prototype.then = function(callback){
		this._then = callback;
	}
	
	Set.prototype.catch = function(callback){
		this._catch = callback;
	}
	
// ====================================================
//  Get
// ====================================================

	function Get(query, parentClass){
		this.query = query;
		this.parentClass = parentClass;
		return this;
	}

	Get.prototype.in = function(language){
		this.language = language;
		this.run();
		return this;
	}
	
	Get.prototype.run = function(){
		var parent = this.parentClass;
		var scope = this;
		process.nextTick(function(){
			parent._get(parent, scope.query, scope.language, function(error, response){
				if(error) {
					if(scope._catch) {
						scope._catch(error)
					} else {
						throw error;
					}
				} else if (scope._then) {
					
					scope._then(response)
				}
			})
		})
		return this.parentClass;
	}
	
	Get.prototype.then = function(callback){
		this._then = callback;
	}
	
	Get.prototype.catch = function(callback){
		this._catch = callback;
	}

// ====================================================
//  Locale
// ====================================================
	
	function Locale(language, parent){
		this.language = language;
		this.parent = parent;
		return function(query){
			return parent.get(query).in(language);
		}
	}
	
	Local.prototype.locale = function(language){
		return new Locale(language, this)
	};


// ====================================================
//  Local Methods
// ====================================================
	
	Local.prototype.ready = function(callback){
		this._readyCallback = callback;
		this._initialize.apply(this)
	}
	
	Local.prototype.set = function(query){
		return new Set(query, this)
	};
	
	Local.prototype.get = function(query){
		return new Get(query, this)
	};


// ====================================================
//  Export (common js)
// ====================================================
	
	if(module && module.exports) module.exports = Local;
	
	