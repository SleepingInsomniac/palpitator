;(function(){
	
	"use strict";
	
	function Lx(subject) {
		if (this instanceof Lx) {
			this.subject = subject;
			return this;
		} else {
			return new Lx(subject);
		}
	}
	
	Lx.getId = function(id) {
		return new Lx(document.getElementById(id));
	}
	
	Lx.select = function(tagName) {
		var tag = document.querySelector(tagName);
		return new Lx(tag);
	}
	
	Lx.selectAll = function(tagNames) {
		var tags = document.querySelectorAll(tagNames);
		var array = [];
		for (var i in tags) {
			if (tags[i].tagName) array.push(tags[i]);
		}
		return new Lx(array);
	}
	
	Lx.prototype = {
		
		set subject(value) {
			this._subject = value;
		},
		get subject() {
			return this._subject;
		},
		
		get e() {
			return this._subject;
		},
		
		get asElement() {
			return this._subject;
		},
		
		// =================================================
		// = Make an element based on an object for params =
		// =================================================
		make: function(attrs) {
			attrs = attrs || {};
			if (typeof attrs == 'string') attrs = {textContent: attrs};

			// allow tag to be set within attributes object
			if (!this.subject && attrs.tag) {
				this.subject = attrs.tag;
				delete attrs.tag;
			}

			// the actual element
			this.subject = document.createElement(this.subject);
			
			// create children based on key/object params
			if (attrs.children) {
				for (var c in attrs.children) {
					var child = attrs.children[c];
					if (child.tagName || (child instanceof Lx)) {
						Lx(child).appendTo(this);
					} else {
						Lx().make(child).appendTo(this);
					}
				}
				delete attrs.children;
			}
			
			// set styles
			if (attrs.styles) {
				this.styles(attrs.styles);
				delete attrs.styles;
			}
			
			// callback variable
			if (attrs.assignTo) {
				attrs.assignTo = this;
				delete attrs.assignTo;
			}
			
			// apply other object options to new element
			for (var i in attrs) this.subject[i] = attrs[i];
			return this;
		},
		
		// ===================================================================
		// = Make many elements with keys as the type and an object for info =
		// ===================================================================
		makeMany: function(objects) {
			for (var e in objects) objects[e] = Lx(e).make(objects[e]);
			return objects;
		},
		
		prependTo: function(elm) {
			if (elm instanceof Lx) elm = elm.subject;
			elm.insertBefore(this.subject, elm.firstChild)
			return this;
		},
		
		prepend: function(elm) {
			if (elm instanceof Lx) elm = elm.subject;
			this.subject.insertBefore(elm, this.subject.firstChild);
			return this;
		},
		
		append: function(elm) {
			if (elm instanceof Lx) elm = elm.subject;
			this.subject.appendChild(elm);
			return this;
		},
		
		appendTo: function(elm) {
			if (elm instanceof Lx) elm = elm.subject;
			Lx(elm).append(this.subject);
			return this
		},
		
		insertBefore: function(elm) {
			if (elm instanceof Lx) elm = elm.subject;
			elm.parentNode.insertBefore(this.subject, elm);
			return this;
		},
		
		replaceChild: function(elm, newElm) {
			if (elm instanceof Lx) elm = elm.subject;
			if (newElm instanceof Lx) newElm = newElm.subject;
			Lx(newElm).insertBefore(elm);
			elm.rm();
			return this;
		},
		
		replaceWith: function(elm) {
			if (elm instanceof Lx) elm = elm.subject;
			Lx(elm).insertBefore(this);
			this.rm();
			return this;
		},
		
		replaces: function(elm) {
			if (elm instanceof Lx) elm = elm.subject;
			this.insertBefore(elm);
			Lx(elm).rm();
			return this;
		},
		
		rm: function() {
			if (this.subject.parentNode) this.subject.parentNode.removeChild(this.subject);
			return this;
		},
		
		hasClass: function(name) {
			cname = this.subject.className || '';
			return (cname.indexOf(name) > -1);
		},
		
		addClass: function(cls) {
			var current = this.subject.className || '';
			this.subject.className = current.split(/\s/).concat(cls).join(' ');
			return this;
		},
		
		rmClass: function(cls) {
			var current = this.subject.className || '';
			current = current.split(/\s/).filter(function(c){return (c != cls)}).join(' ');
			this.subject.className = current;
			return this;
		},
		
		on: function(event, callback) {
			// W3C model
			if (this.subject.addEventListener) {
			    this.subject.addEventListener(event, callback, false);
			    return this;
			} 
			// Microsoft model
			else if (this.subject.attachEvent) {
			    this.subject.attachEvent('on' + event, callback);
				return this;
			}
			// failure model ¯\_(ツ)_/¯
			return false;
		},
		
		off: function(event, callback) {
			this.subject.removeEventListener(event, callback);
			return this;
		},
		
		waitFor: function(event, callback) {
			var _sub = this.subject;
			var func = function(e) {
				callback(e);
				Lx(_sub).off(event, func);
			}
			Lx(_sub).on(event, func);
			return this;
		},
		
		defaults: function(defaults) {
			for (var i in defaults) {
				if (this.subject[i] == undefined) {
					this.subject[i] = defaults[i];
				}
			}
			return this.subject;
		},
		
		get guts() {
			return this.subject.innerHTML;
		},
		
		set guts(value) {
			this.subject.innerHTML = value;
		},
		
		clear: function() {
			this.guts = '';
		},
		
		styles: function(styles) {
			for (var i in styles) {
				if (!this.subject) continue;
				this.subject.style[i] = styles[i] || '';
			}
			return this;
		},
		
		getStyles: function() {
			var styles = {};
			for (var i in arguments) {
				styles[arguments[i]] = this.subject.style[arguments[i]] || '';
			}
			return styles;
		},
		
		rect: function() {
			return this.subject.getBoundingClientRect();
		},
		
		each: function(callback) {
			for (var i in this.subject) {
				callback.call(this.subject[i]);
			}
			return this;
		},
		
		pathJoin: function() {
			var path = [];
			for (var i in arguments) path.push(arguments[i]);
			return path.join('/').replace(/\/{2,}/g, '/');
		}
		
	}
	
	window.Lx = Lx;
	
}());

;(function(Lx) {
	
	"use strict";
	
	// =============
	// = Constants =
	// =============
	var styles = {
		takeOver: {
			position: 'fixed',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			backgroundColor: 'rgba(0,0,0,0.5)',
			zIndex: '9999',
			opacity: 0,
			
			"-webkit-transition": "0.3s ease-in-out",
			   "-moz-transition": "0.3s ease-in-out",
			    "-ms-transition": "0.3s ease-in-out",
			     "-o-transition": "0.3s ease-in-out",
			        "transition": "0.3s ease-in-out",
		},
		
		container: {
			position: 'fixed',
			top: '0',
			left: '0',
			width: '100%',
			height: '100%',
			textAlign: 'center',
			verticalAlign: 'middle',
			lineHeight: '100vh',
			zIndex: '99999',
			pointerEvents: 'none' // should allow click through
		},
		
		frame: {
			pointerEvents: 'auto',
			border: '1px solid #CCC',
			borderRadius: '3px',
			display: 'inline-block',
			zIndex: '999999',
			opacity: '0',
			lineHeight: '1.3em',
			backgroundColor: "#FFF",
			boxShadow: '0 0 10px rgba(0,0,0,0.3)',
			fontFamily: 'helvetica, sans-serif',
			fontSize: '0.9em',
			minWidth: '10%',
			
			"-webkit-transform": "scale(0.7)",
			   "-moz-transform": "scale(0.7)",
			    "-ms-transform": "scale(0.7)",
			     "-o-transform": "scale(0.7)",
			        "transform": "scale(0.7)",
			
			"-webkit-transition": "0.3s ease-in-out",
			   "-moz-transition": "0.3s ease-in-out",
			    "-ms-transition": "0.3s ease-in-out",
			     "-o-transition": "0.3s ease-in-out",
			        "transition": "0.3s ease-in-out",
		},
		
		title: {
			margin: '0',
			padding: '3px 10px',
			borderBottom: '1px solid #EFEFEF',
			textAlign: 'center',
		},
		
		body: {
			padding: '10px'
		},
		
		text: {
			padding: '0 5px',
			margin: '0'
		},
		
		buttonContainer: {
			padding: '3px 10px 10px',
			textAlign: 'right'
		},
		
	};
	
	// ===================
	// = The alert class =
	// ===================
	function Alert(options) {
		if (!(this instanceof Alert)) return new Alert(options); // make sure it's its own object.
		var _alert = this;
		if (options instanceof String) options = { text: options }; // convert into object if only text.
		
		// ==================
		// = Alert Template =
		// ==================
		// these are the basic options
		options = Lx(options).defaults({
			title: 'Message',
			text: '...',
			buttons: [
				{
					title: 'Okay',
					action: function() { _alert.dismiss(); },
					key: 13
				}
			],
			className: 'lxAlert',
			takeOver: false
		});
		
		// apply the options object to this instance of Alert
		for (var i in options) _alert[i] = options[i];
		
		// create a screen over the page
		if (options.takeOver) {
			_alert.screen = Lx('div').make()
				.styles(styles.takeOver)
				.appendTo(document.body)
		}
		
		_alert.container = Lx('div').make().styles(styles.container).appendTo(document.body);
		
		_alert.keys = {};
		for (var i in _alert.buttons) {
			if (_alert.buttons[i].key) {
				_alert.keys[_alert.buttons[i].key] = _alert.buttons[i].action;
			}
		}
		
		_alert.keyWatch = function(e) {
			// call the button function as _alert
			if (_alert.keys[e.keyCode]) _alert.keys[e.keyCode].call(_alert);
		}
		
		Lx(window).on('keypress', _alert.keyWatch);
		
		// add an element to the body, or just text
		if (!_alert.element) {
			_alert.element = Lx('p').make(_alert.text).styles(styles.text);
		}
		
		var buttonArray = [];
		for (var i in _alert.buttons) {
			buttonArray.push(
				Lx('input').make({
					type: 'button',
					value: _alert.buttons[i].title,
					onclick: function(btnFunc){return function() {btnFunc.call(_alert)}}(_alert.buttons[i].action)
				})
			);
		}
		
		this.frame = Lx('div').make({
			id: 'lx-alert-frame',
			className: 'lxAlert',
			styles: styles.frame,
			children: [
				{
					tag: 'h3',
					id: 'lx-alert-title',
					textContent: _alert.title,
					styles: styles.title
				},
				{
					tag: 'div',
					id: 'lx-alert-body',
					children: [
						_alert.element
					],
					styles: styles.body
				},
				{
					tag: 'div',
					id: 'lx-alert-buttonContainer',
					children: buttonArray,
					styles: styles.buttonContainer
				}
			]
		});
		
		this.frame.appendTo(_alert.container);
		// update styles in delayed call to allow css transitions to take effect
		setTimeout(function() {
			_alert.frame.styles({
				opacity: '1',
				
				"-webkit-transform": "scale(1)",
				   "-moz-transform": "scale(1)",
				    "-ms-transform": "scale(1)",
				     "-o-transform": "scale(1)",
				        "transform": "scale(1)"
			});
			if (_alert.takeOver) {
				_alert.screen.styles({opacity: '1'});
			}
		}, 1);
		
		// auto-dismiss
		if (options.dismissAfter) {
			setTimeout(function() {
				_alert.dismiss();
			}, options.dismissAfter);
		}
						
	}
	Alert.prototype = {
				
		dismiss: function() {
			var _alert = this;
			this.frame.styles({
				opacity: '0',
				'-webkit-transform': 'scale(0.7)'
			});
			
			if (this.screen) {
				this.screen.styles({
					opacity: '0'
				});
			}
			
			setTimeout(function() {
				_alert.container.rm();
				if (_alert.screen) _alert.screen.rm();
			}, 300);
			
			Lx(window).off('keypress', this.keyWatch);
			
		},
	};
	
	Lx.Alert = Alert;
	
}(window.Lx = window.Lx || {}));

;(function(Lx) {
	
	"use strict";
	
	Lx.prototype.canDrag = function(opts) {
		opts = opts || {};
		Lx(opts).defaults({
			onDrag: function(evt, elm) {
				
			},
			onDrop: function(evt, elm) {
				
			}
		});
		
		var _Lx = this;
		var defaultStyles = _Lx.e.getAttribute('style');
		
		_Lx.addClass('draggable');
		_Lx.on('mousedown', function(e) {
			
			var dim = _Lx.e.getBoundingClientRect();
			
			_Lx.addClass('dragging');
			_Lx.appendTo(document.body);
			Lx(document.body).addClass('dragging');
			
			_Lx.styles({
				     // width: dim.width  + 'px',
				    // height: dim.height + 'px',
				marginLeft: -(dim.width  / 2) + 'px',
				 marginTop: -(dim.height / 2) + 'px',
				  position: 'absolute',
				    zIndex: 9999
			});
			
			var move = function(e) {
				// console.log(e);
				_Lx.e.style.left = e.clientX + 'px';
				_Lx.e.style.top  = (e.clientY + window.scrollY) + 'px';
			}
			move(e);
			
			Lx(window).on('mousemove', move);
			
			Lx(window).waitFor('mouseup', function(e) {
				Lx(document.body).rmClass('dragging');
				Lx(window).off('mousemove', move);
				
				_Lx.rmClass('dragging');
				_Lx.e.setAttribute('styles', defaultStyles);
				opts.onDrop.call(_Lx.e, e); // custom drop function
				
			});
			
			opts.onDrag.call(_Lx.e, e); // custom drag started function
			
		});
		
		return this;
	}
	
	
}( window.Lx ));

;(function(Lx) {
	
	"use strict";
	
	function Event(count, callable) {
		var _event = this;
		this.callable = callable;
		this.limit = count;
		this.count = 0;
		this.done = function() {
			_event.count++;
			if (_event.count >= _event.limit) {
				_event.callable.call(callable);
			}
		}
	}
	
	Lx.event = function(opts) {
		opts = Lx(opts).defaults({
			count: 1,
			oncomplete: function() {}
		});
		return new Event(opts.count, opts.oncomplete);
	}
	
}(window.Lx));

;(function(Lx){
	
	"use strict";
	
	function Set() {
		this._set = {};
		this.add = function(thing) {
			if (!this.contains(thing)) {
				this._set[thing] = true;
				return true;
			} else {
				return false;
			}
		}
		this.contains = function(thing) {
			if (Object.prototype.hasOwnProperty.call(this._set, thing)) {
			    return true;
			} else {
				return false;
			}
		}
		this.remove = function(thing) {
			if (this.contains(thing)) {
				delete this._set[thing];
				return true;
			} else {
				return false;
			}
		}

		return this;
	}

	function FormParser(form) {
		this.form = form;
	
		this.parseObject = function() {
			var object = {};
			var inputSet = new Set();
			var blankSet = new Set();
		
			var addValue = function(_object, name, value) {
			
				// if the set already contains the name and value... there's no need (for some reason this occurs in newer browsers);
				if (inputSet.contains(name+'['+value+']') || value === undefined) {
					return false;
				} else {
					inputSet.add(name+'['+value+']');
				}
			
				// split the name (blah[name1][name1] etc.) into an array.
				var nameStack = name.split(/[\[\]]+/);
				if (nameStack.length > 1) {
					nameStack.pop();
				}
				// if there's an empty array indicator... figure out some keys (by incrementing index until there's an available key)
				if (name.match(/\[\]$/)) {
					var index = 0;
					while (blankSet.contains(name+index)) index++;
					blankSet.add(name+index);
					nameStack.push(index);
				}
			
				var reference = _object;
			
				// traverse the name array...
				for (var i = 0; i < nameStack.length; i++) {
					var name = nameStack[i];
				
					if (reference[name] === undefined) {
						if (nameStack.length-1 > i) {
							reference[name] = {};
							reference = reference[name];
						} else {
							reference[name] = value;
						}
					} else {
						if (nameStack.length-1 > i) {
							if (reference[name][nameStack[i+1]] === undefined) {
								reference[name][nameStack[i+1]] = {};
							}
							reference = reference[name];
						} else {
							reference[name] = value;
						}
					}				
				}			
			}
		
			for (i in form.elements) {
				var element = form.elements[i];
				// console.log(element);
				var name = element.name;
				var value = element.value;
				
				if (name) {
					switch(element.type) {
						case undefined:
							console.log('nothing');
						break;
						case 'checkbox':
							if (element.checked)
								addValue(object, name, value);
						break;
						default:
							addValue(object, name, value);
						break;
					}
				}
				

			}
			// console.log(inputSet._set);
			return object;
		}
	
		return this;
	}
	
	Lx.prototype.parseForm = function() {
		return new FormParser(this._subject).parseObject();
	}
	
}(window.Lx));
;(function () {
    
	// ================================================================
	// = applies any defaults to unset properties of object 'options' =
	// ================================================================
	function setDefaults(defaults, options) {
		defaults = defaults || {}; // defaults to blank object
		for (var i in defaults) {
			if (options[i] == undefined) {
				options[i] = defaults[i];
			}
		}
		return options;
	}
	
	// =====================================================
	// = Convert object to URI serialized key value string =
	// =====================================================
	function uriSerialize(obj, prefix) {
		var str = [];
		for(var p in obj) {
			var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
			str.push(typeof v == "object" ?
				uriSerialize(v, k) :
	      		encodeURIComponent(k) + "=" + encodeURIComponent(v));
		}
		return str.join("&");
	}
	
	// ====================================
	// = The main Inquisition constructor =
	// ====================================
	function Inquisition(opts) {
        if (this instanceof Inquisition) {
			if (typeof opts == "string") opts = {url: opts}; // if a string was given instead of an object.
            this.opts = setDefaults(this.defaultOptions, opts);
        } else {
            return new Inquisition(opts);
        }
	}
		
	Inquisition.prototype = {
		
		defaultOptions: {
			url: '',
			data: {},
			method: 'GET',
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
			timeout: 0,
			json: false,
			onResponse: function(r) {
				console.log(r);
			},
			onStart: function() {},
			onEnd: function() {},
			onTimeout: function() {},
			onError: function() {}
		},
        
		async: function(onResponse) {
			var _inquisition = this;
			var xmlhttp;
			
            // convert verb to uppercase (get to GET)
			_inquisition.opts.method = _inquisition.opts.method.toUpperCase();
			
			// either what's in options, or what's sent to the async function.
			onResponse = onResponse || _inquisition.opts.onResponse;
			(window.XMLHttpRequest) ? xmlhttp = new XMLHttpRequest() : xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			
			// ===================================
			// = Set up what happens on response =
			// ===================================
			xmlhttp.onreadystatechange = function() {
					
				// ========
				// = Done =
				// ========
				if (xmlhttp.readyState == 4) {
					
					if (xmlhttp.status == 204) {
						var response = {
							status: xmlhttp.status,
							text: '',
							object: null
						}
					} else {
						var response = {
							status: xmlhttp.status,
							text: xmlhttp.responseText,
							object: null // where parsed json ends up
						}
					}
					
					if (_inquisition.opts.json) {
						try {
							response.object = JSON.parse(xmlhttp.responseText);
						} catch(e) {
							console.error('Could not parse response body as json', response);
						}
					}
					onResponse(response);
				}
				
			}
			
			if (typeof _inquisition.opts.data == 'object') {
				var query = uriSerialize(_inquisition.opts.data); // convert the object to uri data
			} else {
				var query = _inquisition.opts.data; // must be a string already.
			}
			
			// if the method is GET, the data has to be tacked on to the url.
			if (_inquisition.opts.method == 'GET') {
				_inquisition.opts.url += ('?' + query);
				query = null;
			}
			
			xmlhttp.open(_inquisition.opts.method, _inquisition.opts.url, true);
            
            // set request headers
            for (var header in _inquisition.opts.headers) {
                var value = _inquisition.opts.headers[header];
                xmlhttp.setRequestHeader(header, value);
            }
            
			(query) ? xmlhttp.send(query) : xmlhttp.send();
			
		}
		
	}
	
	// ===================================
	// = Export the inquisition function =
	// ===================================
	window.Inquisition = window.Iq = window.Lx.Inquisition = window.Lx.Iq = Inquisition;
	
}());

