var log = {
	send: function (s) {
		try{
			if(config.logType == 'none'){
				return false;
			}else{
				if (typeof(s.callee) == "undefined") {
					s.callee = arguments.callee.caller
				}
				if (typeof(s) == "object") {
					s = this.array_toString(s)
				}		
				if(config.logType == 'alert'){
					alert('Debug:\n\n'+s);
					return true;
				}		
				if(config.logType == 'navigator'){
					Notification.prototype.alert(s, "Debug", "Ok");
					return true;
				}
				if(config.logType == 'console'){
					consolelog.push(s);
					console.log(s);
					return true;
				}			
				if ( (DeviceInfo.platform == "iPhone Simulator" || config.logToDevice) && config.logType == 'device') {
					PhoneGap.exec("DebugConsole.log", s);
					return true;
				}
			}	
		}catch(e){return false;}
	},
	
	array_toString: function (s) {
		var c = "";
		for (var b in a) {
			if (typeOf(a[b]) == "object") {
				c += (b + "(Array) = " + this.array_toString(a[b]) + ", ")
			} else {
				c += (b + "=" + a[b] + ", ")
			}
		}
		return c
	},
	
	object_toString: function(objRef, expandedFlag, parseLevel, recurChain){
		if (typeof objRef != 'object')
			return 'Not Object';
		
		parseLevel = parseLevel ? parseLevel : 0;
		var indent = parseLevel ? log.strPad ('', parseLevel, String.fromCharCode (9)) : '';
		var subIndent = indent + String.fromCharCode (9);
		
		var funcHeader = '';
		
		if (!recurChain) recurChain = [objRef];
		else
		{
			for (var i = 0; i < recurChain.length; i ++)
				if (objRef == recurChain [i])
					return '[recursion #' + i + ']\n';
			
			recurChain [recurChain.length] = objRef;
		}
		
		var outStr = '';
		if (log.isArray (objRef)) outStr += 'Array';
		else outStr += 'Object #' + (recurChain.length - 1);
		outStr += '\n' + indent + '{\n';
		
		for (var handle in objRef)
		{
			outStr += subIndent + handle + (objRef.hasOwnProperty (handle) ? '' : ' [inherited]') + ' : ';
			
			if (objRef [handle] == null) outStr += 'null\n';
			else if (typeof objRef [handle] == objRef) outStr += '[recursion #0]\n';
			else if (log.isDomNode (objRef [handle])) outStr += '[DOM Node: ' + objRef [handle].nodeName + ']\n';
			else if (typeof objRef [handle] == 'object' && typeof objRef [handle].constructor == 'function') outStr += log.object_toString (objRef [handle], expandedFlag, parseLevel + 1, recurChain);
			else if (typeof objRef [handle] == 'function')
			{
				if (expandedFlag) outStr += objRef [handle].toString ().replace (/\s+/g, ' ') + '\n';
				else if (funcHeader = objRef [handle].toString ().match (/^function\s\(.*\)/)) outStr += funcHeader + '\n';
				else outStr += '[function]\n';
			}
			else outStr += objRef [handle].toString ().replace (/\n+/g, '\\n') + '\n';
		}
		
		return outStr + indent + '}\n';
	},
	
	strPad: function(inputStr, padLength, padStr, padType){
		if (!padStr) padStr = ' ';
		
		if (padType != 'left' && padType != 'both' && padType != 'right')
			padType = 'right';
		
		var padSize = padLength - inputStr.length;
		if (!(padSize > 0)) return inputStr;
		
		if (padType == 'both' && padSize == 1)
			padType == 'right';
		
		var ii = 0;
		var padBlock = '';
		for (var i = 0; i < (padType == 'both' ? Math.floor (padSize / 2) : padSize); i ++)
		{
			if (!padStr [ii]) ii = 0;
			padBlock += padStr [ii];
			ii ++;
		}
		
		var reminderBlock = '';
		if (padType == 'both' && padSize % 2)
			reminderBlock = padStr [ii] ? padStr [ii] : padStr [0];
		
		return ((padType == 'left' || padType == 'both') ? padBlock : '') + inputStr + ((padType == 'right' || padType == 'both') ? padBlock : '') + reminderBlock;
	},
	
	isArray: function(objRef){
		if (objRef == null || typeof objRef != 'object')
			return false;
		
		return (objRef.constructor === Array) ? true : false;
	},

	isDomNode: function(objRef){
		return (typeof Node == 'object' ? typeof objRef == 'object' && objRef instanceof Node : typeof objRef == 'object' && typeof objRef.nodeType == 'number' && typeof objRef.nodeName == 'string');
	}

}

