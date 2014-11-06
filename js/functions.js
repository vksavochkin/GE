function count( obj )
{
  var length = 0;
  for ( var p in obj )
  {
    if ( obj.hasOwnProperty( p ) )
    {
      length++;
    }
  }
  return length;
}

function isset(val){
	if(Check.isEmpty(val)){
		return false;
	}else{
		return true;
	}
}
function empty(val){
	if(Check.isEmpty(val)){
		return false;
	}else{
		return true;
	}
}
function strpos (haystack, needle, offset) {
  var i = (haystack + '').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}
function foreach (arr, handler) {

    var k, it, pair;
    if (arr && typeof arr === 'object' && arr.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return arr.foreach(handler);
    }
    if (typeof this.Iterator !== 'undefined') {
        var it = this.Iterator(arr); // Does not add prototype items
        if (handler.length === 1) {
            for (pair in it) {
                handler(pair[1]); // only pass the value
            }
        }
        else {
            for (pair in it) {
                handler(pair[0], pair[1]);
            }
        }
    }
    else if (handler.length === 1) {
        for (k in arr) {
            if (arr.hasOwnProperty(k)) {
                handler(arr[k]); // only pass the value
            }
        }
    }
    else {
        for (k in arr) {
            if (arr.hasOwnProperty(k)) {
                handler(k, arr[k]);
            }
        }
    }
}
function arsort (inputArr, sort_flags) {
  // http://kevin.vanzonneveld.net
  // +   original by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  // %        note 1: integrated into all of these functions by adapting the code at
  // %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  // %        note 2: The examples are correct, this is a new way
  // %        note 2: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
  // %        note 3: This function deviates from PHP in returning a copy of the array instead
  // %        note 3: of acting by reference and returning true; this was necessary because
  // %        note 3: IE does not allow deleting and re-adding of properties without caching
  // %        note 3: of property position; you can set the ini of "phpjs.strictForIn" to true to
  // %        note 3: get the PHP behavior, but use this only if you are in an environment
  // %        note 3: such as Firefox extensions where for-in iteration order is fixed and true
  // %        note 3: property deletion is supported. Note that we intend to implement the PHP
  // %        note 3: behavior by default if IE ever does allow it; only gives shallow copy since
  // %        note 3: is by reference in PHP anyways
  // %        note 4: Since JS objects' keys are always strings, and (the
  // %        note 4: default) SORT_REGULAR flag distinguishes by key type,
  // %        note 4: if the content is a numeric string, we treat the
  // %        note 4: "original type" as numeric.
  // -    depends on: i18n_loc_get_default
  // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 1: data = arsort(data);
  // *     returns 1: data == {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
  // *     example 2: ini_set('phpjs.strictForIn', true);
  // *     example 2: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
  // *     example 2: arsort(data);
  // *     results 2: data == {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
  // *     returns 2: true
  var valArr = [], valArrLen = 0,
    k, i, ret, sorter, that = this,
    strictForIn = false,
    populateArr = {};

  switch (sort_flags) {
  case 'SORT_STRING':
    // compare items as strings
    sorter = function (a, b) {
      return that.strnatcmp(b, a);
    };
    break;
  case 'SORT_LOCALE_STRING':
    // compare items as strings, based on the current locale (set with i18n_loc_set_default() as of PHP6)
    var loc = this.i18n_loc_get_default();
    sorter = this.php_js.i18nLocales[loc].sorting;
    break;
  case 'SORT_NUMERIC':
    // compare items numerically
    sorter = function (a, b) {
      return (a - b);
    };
    break;
  case 'SORT_REGULAR':
    // compare items normally (don't change types)
  default:
    sorter = function (b, a) {
      var aFloat = parseFloat(a),
        bFloat = parseFloat(b),
        aNumeric = aFloat + '' === a,
        bNumeric = bFloat + '' === b;
      if (aNumeric && bNumeric) {
        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
      } else if (aNumeric && !bNumeric) {
        return 1;
      } else if (!aNumeric && bNumeric) {
        return -1;
      }
      return a > b ? 1 : a < b ? -1 : 0;
    };
    break;
  }

  // BEGIN REDUNDANT
  this.php_js = this.php_js || {};
  this.php_js.ini = this.php_js.ini || {};
  // END REDUNDANT
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
  populateArr = strictForIn ? inputArr : populateArr;


  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (strictForIn) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return sorter(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0, valArrLen = valArr.length; i < valArrLen; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return strictForIn || populateArr;
}

function explode (delimiter, string, limit) {

  if ( arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined' ) return null;
  if ( delimiter === '' || delimiter === false || delimiter === null) return false;
  if ( typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string === 'object'){
    return { 0: '' };
  }
  if ( delimiter === true ) delimiter = '1';

  // Here we go...
  delimiter += '';
  string += '';

  var s = string.split( delimiter );


  if ( typeof limit === 'undefined' ) return s;

  // Support for limit
  if ( limit === 0 ) limit = 1;

  // Positive limit
  if ( limit > 0 ){
    if ( limit >= s.length ) return s;
    return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
  }

  // Negative limit
  if ( -limit >= s.length ) return [];

  s.splice( s.length + limit );
  return s;
}
function empty(val){
	if(Check.isEmpty(val)){
		return false;
	}else{
		return true;
	}
}
function ShowBuildTime(time){
	return '('+prettyTime(time)+')';
}

function BuildPlanetAdressLink ( planet )
{
	var Link  = '<a onclick="Galaxy.init('+planet.g+','+planet.s+');">['+planet.g+':'+planet.s+':'+planet.p+']</a>';
	return Link;
}

function prettyTime ( seconds ){
	day	= Math.floor ( seconds / (24 * 3600 ) );
	hs 	= Math.floor ( seconds / 3600 % 24 );
	ms 	= Math.floor ( seconds / 60 % 60 );
	sr 	= Math.floor ( seconds / 1 % 60 );
	
	if ( hs < 10 ) { hh = "0" + hs; } else { hh = hs; }
	if ( ms < 10 ) { mm = "0" + ms; } else { mm = ms; }
	if ( sr < 10 ) { ss = "0" + sr; } else { ss = sr; }
	
	time = '';
	if ( day != 0 ) { time += day + 'd '; }
	if ( hs  != 0 ) { time += hh + 'h ';  } else { }
	if ( ms  != 0 ) { time += mm + 'm ';  } else { time += '00m '; }
	time += ss + 's';
	
	return time;
}


function prettyNumber(number, maxPlaces, forcePlaces, forceLetter) {
  number = Number(number);
  forceLetter = forceLetter || false;
  forcePlaces = forcePlaces || 2;
  maxPlaces = maxPlaces || 2;
  
  if(Math.abs(number) < 1000){
	  forcePlaces = false;
  }
  
  if(forceLetter !== false) {
    return Grid.utils.annotate(number, maxPlaces, forcePlaces, forceLetter);
  }
  var abbr;
  if(number >= 1e12) {
    abbr = 'T';
  }
  else if(number >= 1e9) {
    abbr = 'B';
  }
  else if(number >= 1e6) {
    abbr = 'M';
  }
  else if(number >= 1e3) {
    abbr = 'K';
  }
  else {
    abbr = '';
  }
  return annotate(number, maxPlaces, forcePlaces, abbr);
}

function annotate(number, maxPlaces, forcePlaces, abbr) {
  // set places to false to not round
  var rounded = 0;
  switch(abbr) {
    case 'T':
      rounded = number / 1e12;
      break;
    case 'B':
      rounded = number / 1e9;
      break;
    case 'M':
      rounded = number / 1e6;
      break;
    case 'K':
      rounded = number / 1e3;
      break;
    case '':
      rounded = number;
      break;
  }
  if(maxPlaces !== false) {
    var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$');
    if(test.test(('' + rounded))) {
      rounded = rounded.toFixed(maxPlaces);
    }
  }
  if(forcePlaces !== false) {
    rounded = Number(rounded).toFixed(forcePlaces);
  }
  return rounded + abbr;
}


function prettyNumber2( number ) {
        var numberString;
        var scale = '';
        if( isNaN( number ) || !isFinite( number ) ) {
            numberString = 'N/A';
        } else {
            var negative = number < 0;
            number = negative ? -number : number;

            if( number < 1000 ) {
                scale = '';
            } else if( number < 1000000 ) {
                scale = '';//K
                //number = number/1000;
            } else if( number < 1000000000 ) {
                scale = 'M';
                number = number/1000000;
            } else if( number < 1000000000000 ) {
                scale = 'B';
                number = number/1000000000;
            } else if( number < 1000000000000000 ) {
                scale = 'T';
                number = number/1000000000000;
            }
            var maxDecimals = 0;
            if( number < 10 && scale != '' ) {
                maxDecimals = 1;
            }
            number = negative ? -number : number;
			//console.log(number+':'+maxDecimals);
            
            numberString = parseInt(number).toFixed( maxDecimals );
            numberString += scale;
        }
        return numberString;
    }
function colorNumber(n, s){
	var s = typeof s !== 'undefined' ? s : '';
	if (n > 0)
		if (s != '')
			s = '<font color="#00ff00">' + s + '</font>';
		else
			s = '<font color="#00ff00">' + prettyNumber(n) + '</font>';
	else if (n < 0)
		if (s != '')
			s = '<font color="#ff0000">' + s + '</font>';
		else
			s = '<font color="#ff0000">' + prettyNumber(n) + '</font>';
	else
		if (s != '')
			s = s;
		else
			s = n;

	return s;
}  

function roundUp(value, precision){
	precision = typeof precision !== 'undefined' ? precision : 0;
	if ( precision == 0 )
		precisionFactor = 1;
	else
		precisionFactor = Math.pow( 10, precision );

	return Math.ceil( value * precisionFactor )/precisionFactor;
}  

function production(el, BuildLevel){
	var BuildLevelFactor = planet[el+"_percent"];
	var BuildTemp        = planet['temp_max'];
	var CurrentBuildtLvl = planet[el];
	var officers = officerCheck(user);
	
	var off_geologist = 1 + officers['OFF_GEOLOGIST'];
	var off_energy = 1 + officers['OFF_ENERGY'];
		
	BuildLevelEmpty       = CurrentBuildtLvl > 0 ? CurrentBuildtLvl : 1;
	BuildLevel = typeof BuildLevel !== 'undefined' ? BuildLevel : BuildLevelEmpty;
	
	EnergyTech		  = user['energy_tech'] > 0 ? user['energy_tech'] : 0; 
		
	var Prod = {};
	var prod_el
	var metal = 0;
	var crystal = 0;
	var deuterium = 0;
	var energy = 0;
	if(el == 'metal_mine'){
		metal = Math.floor((30 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) * user['resource_multiplier'] * off_geologist);
		energy = Math.floor(-(10 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) * user['ENERGY_MULTIPLIER'] );		
		prod_el = metal;
	}else if(el == 'crystal_mine'){
		crystal = Math.floor((20 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) * user['resource_multiplier'] * off_geologist);
		energy = Math.floor(- (10 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) * user['ENERGY_MULTIPLIER'] );
		prod_el = crystal;
	}else if(el == 'deuterium_synthesizer'){
		deuterium = Math.floor(((10 * BuildLevel * Math.pow((1.1), BuildLevel)) * (1.28-0.002 * BuildTemp)) * (0.1 * BuildLevelFactor) * user['resource_multiplier'] * off_geologist);
		energy = Math.floor(- (20 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) * user['ENERGY_MULTIPLIER'] );
		prod_el = deuterium;
	}else if(el == 'solar_plant'){
		energy = Math.floor((20 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) * user['ENERGY_MULTIPLIER'] * off_energy);
		prod_el = energy;
	}else if(el == 'fusion_reactor'){
		deuterium = Math.floor(- (10 * BuildLevel * Math.pow((1.1), BuildLevel)) * (0.1 * BuildLevelFactor) * user['resource_multiplier'] * off_geologist);
		energy = Math.floor((30 * BuildLevel * Math.pow((1.05 + 0.01 * EnergyTech), BuildLevel)) * (0.1 * BuildLevelFactor) * user['ENERGY_MULTIPLIER'] * off_energy);
		prod_el =energy ;
	}else if(el == 'solar_satellite'){
		energy = Math.floor(((BuildTemp / 4) + 20) * BuildLevel * (0.1 * BuildLevelFactor) * user['ENERGY_MULTIPLIER'] * off_energy);
		prod_el = energy;
	}
	
	Prod = {
		'metal' : metal,
		'crystal' : crystal,
		'deuterium' : deuterium,
		'energy' : energy,
	};
	Prod[el] = prod_el;
	
	return Prod;
}


  
function GetBuildingPrice (el, incremental, destroy){
	incremental = typeof incremental !== 'undefined' ? incremental : true;
	destroy = typeof destroy !== 'undefined' ? destroy : false;
	
	if(incremental){
		var level = planet[el] ? planet[el] : user[el];
	}
	var array = {0:'metal', 1:'crystal', 2:'deuterium', 3:'energy_max'};
	var cost = {};
	
	foreach(array, function(k,v){
		if(isset(pricelist[el][v])){
			if(incremental){
				cost[v] = Math.floor(pricelist[el][v] * Math.pow(pricelist[el]['factor'], level));
			}else{
				cost[v] = Math.floor(pricelist[el][v]);
			}
			if(destroy){
				cost[v]  = Math.floor(cost[v]) / 2;
				cost[v] /= 2;
			}
		}	
	});
	return cost;
} 

function GetElementPrice (el, userfactor, level){
	userfactor = typeof userfactor !== 'undefined' ? userfactor : true;
	level = typeof level !== 'undefined' ? level : false;

	if(userfactor && (level == false)){
		level = planet[el] ? planet[el] : user[el];
	}
	
	var is_buyeable = true;

	var array = {
		'metal'      : lang._T('Metal'),
		'crystal'    : lang._T('Crystal'),
		'deuterium'  : lang._T('Deuterium'),
		'energy_max' : lang._T('Energy')
	};

	text = lang._T('Require:<br/>');
	
	foreach(array, function(res, title){
		if(isset(pricelist[el][res]) && pricelist[el][res] != 0){
			text += title+': ';
			if (userfactor){
				cost = Math.floor(pricelist[el][res] * Math.pow(pricelist[el]['factor'], level));
			}else{
				cost = Math.floor(pricelist[el][res]);	
			}

			if (cost > planet[res]){
				text += '<b style=\"color:red;\"><span class=\"noresources\">'+parseInt(cost)+'</span></b><br/>';
				is_buyeable = false;
			}else{
				text += '<b style=\"color:lime;\">'+parseInt(cost)+'</b><br/> ';
			}
		}
	});
	return text;
}  

function IsTechnologieAccessible(el){
	if (isset(requeriments[el])){
		var enabled = true;
		
		foreach(requeriments[el], function(element, level){
			if (isset(user[element]) && parseInt(user[element]) >= level){
				
			}else if (isset(planet[element]) && parseInt(planet[element]) >= level){
				enabled = true;
			}else{
				//console.log(element+''+planet[element]+':'+level);
				enabled = false;
				return false;
			}
		});
		return enabled;
	}else{
		return true;
	}
} 

function IsVacationMode (){
	if ( user['vacation'] > 0 ){
		return true;
	}
	return false;
}

function IsElementBuyable (el, incremental, destroy){
    incremental = typeof incremental !== 'undefined' ? incremental : true;
	destroy = typeof destroy !== 'undefined' ? destroy : false;
    
    if (IsVacationMode(user)){
	    return false;
    }
       
	if (incremental){
		level  = (planet[el]) ? planet[el] : user[el];
	}
			
	var ret = true;
	var array = {0:'metal', 1:'crystal', 2:'deuterium', 3:'energy_max'};
	var cost = {};
	foreach(array, function(k,v){
		if (isset(pricelist[el][v]) && pricelist[el][v] != 0){
			if (incremental){
				cost[v]  = Math.floor(pricelist[el][v] * Math.pow(pricelist[el]['factor'], level));
			}else{
				cost[v]  = Math.floor(pricelist[el][v]);
			}
			
			if (destroy){
				cost[v]  = Math.floor(cost[v] / 4);
			}
			if (cost[v] > planet[v]){
				ret = false;
			}					
		}
	});
	return ret;
}
	
function GetBuildingTime (el, level, total_lab_level){
	
	level = typeof level !== 'undefined' ? parseInt(level) : false;
	total_lab_level = typeof total_lab_level !== 'undefined' ? total_lab_level : 0;
	
	var officers = officerCheck(user);
	//console.log(officers['OFF_ENGINEER']);
	if(level === false){
		level = (planet[el]) ? parseInt(planet[el]) : parseInt(user[el]);
	}
	var time = 0;
	
	if (isset(reslist_build[el])){
		var cost_metal   = Math.floor(pricelist[el]['metal']   * Math.pow(pricelist[el]['factor'], level));
		var cost_crystal = Math.floor(pricelist[el]['crystal'] * Math.pow(pricelist[el]['factor'], level));
		time = ((cost_crystal + cost_metal) / user.game_speed) * (1 / (parseInt(planet['robotics_factory']) + 1)) * Math.pow(0.5, planet['nanite_factory']);
		time = Math.floor((time * 60 * 60) * (1 - officers['OFF_ENGINEER']));
	}else if (isset(reslist_tech[el])){
		var cost_metal   = Math.floor(pricelist[el]['metal']   * Math.pow(pricelist[el]['factor'], level));
		var cost_crystal = Math.floor(pricelist[el]['crystal'] * Math.pow(pricelist[el]['factor'], level));
		var intergal_lab = parseInt(user['intergalactic_research_tech']);

		if(intergal_lab < 1){
			lablevel 	= parseInt(planet['research_lab']);
		}else{
			lablevel	=	total_lab_level;
		}

		time         = (cost_metal + cost_crystal) / (user.game_speed * (total_lab_level + 1) * 2);//((cost_metal + cost_crystal) / user.game_speed) / ((lablevel + 1) * 2);
		time         = Math.floor((time * 60 * 60) * (1 - officers['OFF_SCIENTIST_RES']));
	}else if (isset(reslist_defense[el])){
		time         = ((pricelist[el]['metal'] + pricelist[el]['crystal']) / user.game_speed) * (1 / (parseInt(planet['shipyard']) + 1)) * Math.pow(1 / 2, planet['nanite_factory']);
		time         = Math.floor((time * 60 * 60) * (1 - officers['OFF_ENGINEER']));
	}else if (isset(reslist_fleet[el])){
		time         = ((pricelist[el]['metal'] + pricelist[el]['crystal']) / user.game_speed) * (1 / (parseInt(planet['shipyard']) + 1)) * Math.pow(1 / 2, planet['nanite_factory']);
		time         = Math.floor((time * 60 * 60) * (1 - officers['OFF_ENGINEER']));
	}

	if (time < 0){
		time = 0;
	}
	return time;
}


function officerCheck(){
	officers = {};
	if(user['rank'] <= 50 && user['rank'] !='' && user['rank'] != 0){
		officers['TOP_FIFTY']			  =    true;
		officers['OFF_GEOLOGIST']		  =    0.1;//!mine production
		officers['OFF_SCIENTIST_RES']	  =     .1;//!research speed
		officers['OFF_SPY']	  		  =      2;//!+ levels of espionage
		officers['OFF_EXSPY']	  		  =      2;//!- levels of espionage
		officers['OFF_ENGINEER']		  =    0.1;//!construction speed
		officers['OFF_GENERAL']		  =    0.1;//!weapon/shields/armor
		officers['OFF_GENERALN']		  =    1;//!weapon/shields/armor
		officers['OFF_ADMIRAL_SLOT']     =      2;//!fleet slots
		officers['OFF_ADMIRAL_SPEED']    =    0.1;//!ship speed	
		officers['OFF_ENERGY']        	  =    0.1;//energy +%	
		officers['OFF_STORER']        	  =    0.2;//storage +%	
	}else if(user['rank'] > 50 && user['rank'] <= 300){
		officers['TOP_FIFTY']			  =    false;
		officers['OFF_GEOLOGIST']		  =    0.2;//!mine production
		officers['OFF_SCIENTIST_RES']	  =     .3;//!research speed
		officers['OFF_SPY']	  		  =      2;//!+ levels of espionage
		officers['OFF_EXSPY']	  		  =      2;//!- levels of espionage
		officers['OFF_ENGINEER']		  =    0.3;//!construction speed
		officers['OFF_GENERAL']		  =    0.2;//!weapon/shields/armor
		officers['OFF_GENERALN']		  =    2;//!weapon/shields/armor
		officers['OFF_ADMIRAL_SLOT']     =      2;//!fleet slots
		officers['OFF_ADMIRAL_SPEED']    =    0.2;//!ship speed
		officers['OFF_ENERGY']       	  =    0.1;//energy +%	
		officers['OFF_STORER']        	  =    0.2;//storage +%
	}else if(user['rank'] > 300 && user['rank'] <= 600){
		officers['TOP_FIFTY']			  =    false;
		officers['OFF_GEOLOGIST']		  =    0.3;//!mine production
		officers['OFF_SCIENTIST_RES']	  =     .3;//!research speed
		officers['OFF_SPY']	  		  =      2;//!+ levels of espionage
		officers['OFF_EXSPY']	  		  =      2;//!- levels of espionage
		officers['OFF_ENGINEER']		  =    0.3;//!construction speed
		officers['OFF_GENERAL']		  =    0.2;//!weapon/shields/armor
		officers['OFF_GENERALN']		  =    2;//!weapon/shields/armor
		officers['OFF_ADMIRAL_SLOT']     =      2;//!fleet slots
		officers['OFF_ADMIRAL_SPEED']    =    0.2;//!ship speed
		officers['OFF_ENERGY']        	  =    0.1;//energy +%	
		officers['OFF_STORER']        	  =    0.2;//storage +%
	}else if(user['rank'] > 600 && user['rank'] <= 1000){
		officers['TOP_FIFTY']			  =    false;
		officers['OFF_GEOLOGIST']		  =    0.4;//!mine production
		officers['OFF_SCIENTIST_RES']	  =     .3;//!research speed
		officers['OFF_SPY']	  		  =      2;//!+ levels of espionage
		officers['OFF_EXSPY']	  		  =      2;//!- levels of espionage
		officers['OFF_ENGINEER']		  =    0.3;//!construction speed
		officers['OFF_GENERAL']		  =    0.2;//!weapon/shields/armor
		officers['OFF_GENERALN']		  =    2;//!weapon/shields/armor
		officers['OFF_ADMIRAL_SLOT']     =      2;//!fleet slots
		officers['OFF_ADMIRAL_SPEED']    =    0.2;//!ship speed
		officers['OFF_ENERGY']        	  =    0.1;//energy +%	
		officers['OFF_STORER']        	  =    0.2;//storage +%
	}else if(user['rank'] > 1000 && user['rank'] <= 1500){
		officers['TOP_FIFTY']			  =    false;
		officers['OFF_GEOLOGIST']		  =    0.5;//!mine production
		officers['OFF_SCIENTIST_RES']	  =     .3;//!research speed
		officers['OFF_SPY']	  		  =      2;//!+ levels of espionage
		officers['OFF_EXSPY']	  		  =      2;//!- levels of espionage
		officers['OFF_ENGINEER']		  =    0.3;//!construction speed
		officers['OFF_GENERAL']		  =    0.2;//!weapon/shields/armor
		officers['OFF_GENERALN']		  =    2;//!weapon/shields/armor
		officers['OFF_ADMIRAL_SLOT']     =      2;//!fleet slots
		officers['OFF_ADMIRAL_SPEED']    =    0.2;//!ship speed
		officers['OFF_ENERGY']        	  =    0.1;//energy +%	
		officers['OFF_STORER']        	  =    0.2;//storage +%
	}else {
		officers['TOP_FIFTY']			  =    false;
		officers['OFF_GEOLOGIST']		  =    1;//!mine production
		officers['OFF_SCIENTIST_RES']	  =     .3;//!research speed
		officers['OFF_SPY']	  		  =      2;//!+ levels of espionage
		officers['OFF_EXSPY']	  		  =      2;//!- levels of espionage
		officers['OFF_ENGINEER']		  =    0.3;//!construction speed
		officers['OFF_GENERAL']		  =    0.2;//!weapon/shields/armor
		officers['OFF_GENERALN']		  =    2;//!weapon/shields/armor
		officers['OFF_ADMIRAL_SLOT']     =      2;//!fleet slots
		officers['OFF_ADMIRAL_SPEED']    =    0.2;//!ship speed
		officers['OFF_ENERGY']        	  =    0.1;//energy +%	
		officers['OFF_STORER']       	  =    0.2;//storage +%
	}
	
	
	if(user['off_geologist'] < 1){
		officers['OFF_GEOLOGIST']= 0;//!mine production
	}
	if(user['off_scientist'] < 1){
		officers['OFF_SCIENTIST_RES']= 0;//!research speed
	}
	if(user['off_spy'] < 1){
		officers['OFF_SPY']= 0;//!+ levels of espionage
	}
	if(user['off_exspy'] < 1){
		officers['OFF_EXSPY']= 0;//!+ levels of espionage
	}
	if(user['off_engineer'] < 1){
		officers['OFF_ENGINEER']= 0;
	}
	if(user['off_general'] < 1){
		officers['OFF_GENERAL']= 0;
		officers['OFF_GENERALN'] = 0;
	}
	if(user['off_admiral'] < 1){
		officers['OFF_ADMIRAL_SLOT']= 0;//!fleet slots
		officers['OFF_ADMIRAL_SPEED']= 0;//!ship speed
	}
	if(user['off_energy'] < 1){
		officers['OFF_ENERGY']= 0;//energy +%
	}
	if(user['off_storer'] < 1){
		officers['OFF_STORER']= 0;//storage +%
	}
	
	return officers;
	
}	


/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 * http://blog.stevenlevithan.com/archives/date-time-format
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

function localize_date(nd,tt,ll,yy){
	var inputtext = (nd*1);
	var epoch=inputtext;
	var outputtext = "";
	if(inputtext > 1000000000000){	
		epoch=Math.round(inputtext/1000);
	}else{
		if(inputtext > 10000000000)extraInfo=1;
		inputtext=(inputtext*1000);
	}
	var datum = new Date(inputtext);
	var localeString = datum.toLocaleString();
	var localeStringEnd = localeString.search(/GMT/i);
	if(localeStringEnd>0){ localeString=localeString.substring(0,localeStringEnd); }
	outputtext += "<span>"+localeString+"</span>";//"<b>GMT</b>: "+datum.toGMTString()+"
	//return outputtext;
	if(tt == true){
		return datum.format("HH:MM TT");
	}else if(ll == true){
		return datum.format("mmm dd yyyy HH:MM:ss TT");
	}else if(yy == true){
		return datum.format("m/d/yy");
	}else{
		return datum.format("mmm dd, HH:MM TT");
	}
	
}





/*
	SHIPYARD
*/
function GetFleetMaxSpeed (fleet_array, ship, user){
	if (!Check.isEmpty(ship)){
		fleet_array[ship] =  1;
	}		
	
	var speedalls = {};
	var officers = officerCheck();
	
	foreach(fleet_array, function(s,c){
		if (s == 'small_cargo'){
			if (parseInt(user['impulse_drive_tech']) >= 5){
				speedalls[s] = pricelist[s]['speed2'] + ((pricelist[s]['speed2'] * user['impulse_drive_tech']) * 0.2);
			}else{
				speedalls[s] = pricelist[s]['speed']  + ((pricelist[s]['speed'] * user['combustion_drive_tech']) * 0.1);
			}				
		}
		
		if (s == 'large_cargo' || s == 'light_fighter' || s == 'recycler' || s == 'espionage_probe'){
			speedalls[s] = pricelist[s]['speed'] + ((pricelist[s]['speed'] * user['combustion_drive_tech']) * 0.1);
		}			

		if (s == 'heavy_fighter' || s == 'cruiser' || s == 'colony_ship'){
			speedalls[s] = pricelist[s]['speed'] + ((pricelist[s]['speed'] * user['impulse_drive_tech']) * 0.2);
		}			

		if (s == 'bomber'){
			if (user['hyperspace_drive_tech'] >= 8){
				speedalls[s] = pricelist[s]['speed2'] + ((pricelist[s]['speed2'] * user['hyperspace_drive_tech']) * 0.3);
			}else{
				speedalls[s] = pricelist[s]['speed']  + ((pricelist[s]['speed'] * user['impulse_drive_tech']) * 0.2);
			}				
		}

		if (s == 'battleship' || s == 'destroyer' || s == 'deathstar' || s == 'battlecruiser'){
			speedalls[s] = pricelist[s]['speed'] + ((pricelist[s]['speed'] * user['hyperspace_drive_tech']) * 0.3);
		}			
			
		if(parseInt(user['off_admiral']) > 0){
			speedalls[s] = speedalls[s] + (pricelist[s]['speed'] * (1+officers['OFF_ADMIRAL_SPEED']));
		}
		
	});

	if (!Check.isEmpty(ship)){
		sSpeed = speedalls[ship];
		speedalls = sSpeed;
	}

	return speedalls;
}


function GetShipConsumption ( ship, user ){
	if (parseInt(user['impulse_drive_tech']) >= 5)
		Consumption  = pricelist[ship]['consumption2'];
	else
		Consumption  = pricelist[ship]['consumption'];

	return Consumption;
}



function GetTargetDistance (OrigGalaxy, DestGalaxy, OrigSystem, DestSystem, OrigPlanet, DestPlanet){
	var distance = 0;

	if ((OrigGalaxy - DestGalaxy) != 0)
		distance = Math.abs(OrigGalaxy - DestGalaxy) * 20000;
	else if ((OrigSystem - DestSystem) != 0)
		distance = Math.abs(OrigSystem - DestSystem) * 5 * 19 + 2700;
	else if ((OrigPlanet - DestPlanet) != 0)
		distance = Math.abs(OrigPlanet - DestPlanet) * 5 + 1000;
	else
		distance = 5;

	return distance;
}
	
function GetMissionDuration (GameSpeed, MaxFleetSpeed, Distance, SpeedFactor){
	var Duration = 0;
	Duration = Math.round(((35000 / GameSpeed * Math.sqrt(Distance * 10 / MaxFleetSpeed) + 10) / SpeedFactor));
	return Duration;
}

function GetFleetConsumption (FleetArray, SpeedFactor, MissionDuration, MissionDistance, FleetMaxSpeed){
	consumption = 0;
	basicConsumption = 0;
	
	foreach(FleetArray, function(Ship, v){
		ShipSpeed         = GetFleetMaxSpeed ( {}, Ship, user );
		ShipConsumption   = GetShipConsumption ( Ship, user );
		spd               = 35000 / (MissionDuration * SpeedFactor - 10) * Math.sqrt( MissionDistance * 10 / ShipSpeed );
		basicConsumption  = ShipConsumption * v.amount;
		consumption      += basicConsumption * MissionDistance / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
	});

	consumption = Math.round(consumption) + 1;

	return consumption;
}

/*
	
	SHIPYARD
	
*/

function missiles_range(target_user_id, g, s){
	var mips = parseInt(planet['interplanetary_missiles']);
	
	var btn = false;
	if (target_user_id != user['id']){
		if (mips > 0){
			if (parseInt(g) == parseInt(planet['g'])){
				var range = user['impulse_drive_tech'] > 0 ? ( (user['impulse_drive_tech'] * 5) - 1 ) : 0;
				
				var min_system = parseInt(planet['s']) - range;
				var max_system = parseInt(planet['s']) + range;
				
				if (min_system < 1){
					min_system = 1;
				}
				
				if(max_system > 499){
					max_system = 499
				}
				
				if(s <= max_system){
					if(s >= min_system){
						btn = true;
					}
				}
			}
		}
	}
	return btn;
}

function phalanx_range(target_user_id, g, s){
	var phalanx_level = parseInt(user['sensor_phalanx']);
	var range = 0;

	if (phalanx_level > 1){
		range = Math.pow(phalanx_level, 2) - 1;
	}else if(phalanx_level == 1){
		range = 1;
	}
	
	var btn = false;
	if (target_user_id != user['id']){
		if (range > 0){
			if (parseInt(g) == parseInt(planet['g'])){
				
				var min_system = parseInt(planet['s']) - range;
				var max_system = parseInt(planet['s']) + range;
				
				if (min_system < 1){
					min_system = 1;
				}
				
				if(max_system > 499){
					max_system = 499
				}
				
				if(s <= max_system){
					if(s >= min_system){
						btn = true;
					}
				}
			}
		}
	}
	return btn;
}

/*function phalanx_range(){
	var phalanx_level = parseInt(user['sensor_phalanx']);
	var range = 0;

	if (phalanx_level > 1){
		range = pow(phalanx_level, 2) - 1;
	}else if(phalanx_level == 1){
		range = 1;
	}
	return range;
}*/