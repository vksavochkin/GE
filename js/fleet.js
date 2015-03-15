function speed() {
	var sp;
	sp = Number($(".speed").last().val());

	return(sp);
}

function target() {
	var galaxy;
	var system;
	var planet;

	galaxy = $(".galaxy").last().val();
	system = $(".system").last().val();
	planet = $(".planet").last().val();

	return("["+galaxy+":"+system+":"+planet+"]");
}

function setACS(id) {
    $('.fleet_group').last().val(id);
	return;
}

function setACS_target(tacs) {
    $('.acs_target_mr').last().val(tacs);
	return;
} 

function setTarget(galaxy, solarsystem, planet, planettype) {
	$('.galaxy').last().val(galaxy);
	$('.system').last().val(solarsystem);
	$('.planet').last().val(planet);
	$('.planettype').last().val(planettype);
}

function setMission(mission) {
	$('.order').last().selectedIndex = mission;
	return;
}

function setUnion(unionid) {
	$('.union2').last().selectedIndex = unionid;
}

function setTargetLong(galaxy, solarsystem, planet, planettype, mission, cnt) {
	setTarget(galaxy, solarsystem, planet, planettype);
	setMission(mission);
	setUnions(cnt);
}

function min(a, b) {
	a = a * 1;
	b = b * 1;
	if (a > b) {
		return b;
	} else {
		return a;
	}
}

function maxspeed() {
	var msp = 1000000000;
	for (i = 200; i < 220; i++) {
		if ($(".ship" + i).last().length>0) {
			if ((Number($(".speed" + i).last().val()) * 1) >= 1
			&& (Number($(".ship" + i).last().val()) * 1) >= 1) {
				msp = min(msp, Number($(".speed" + i).last().val()));
			}
		}
	}

	return(msp);
}

function distance() {
	var thisGalaxy;
	var thisSystem;
	var thisPlanet;

	var targetGalaxy;
	var targetSystem;
	var targetPlanet;

	var dist;

	thisGalaxy = Number($(".thisgalaxy").last().val());
	thisSystem = Number($(".thissystem").last().val());
	thisPlanet = Number($(".thisplanet").last().val());

	targetGalaxy = Number($(".galaxy").last().val());
	targetSystem = Number($(".system").last().val());
	targetPlanet = Number($(".planet").last().val());

	dist = 0;
	if ((targetGalaxy - thisGalaxy) != 0) {
		dist = Math.abs(targetGalaxy - thisGalaxy) * 20000;
	} else if ((targetSystem - thisSystem) != 0) {
		dist = Math.abs(targetSystem - thisSystem) * 5 * 19 + 2700;
	} else if ((targetPlanet - thisPlanet) != 0) {
		dist = Math.abs(targetPlanet - thisPlanet) * 5 + 1000;
	} else {
		dist = 5;
	}

	return(dist);
}

function duration() {
	var speedfactor;

	speedfactor = Number($(".speedfactor").last().val());
	msp = maxspeed();
	sp = speed();
	dist = distance();
	ret = Math.round(((35000 / sp * Math.sqrt(dist * 10 / msp) + 10) / speedfactor ));
	return ret;
}

function consumption2() {
	var consumption;
	var basicConsumption = 0;

	for (i = 200; i < 220; i++) {
		if ($(".ship" + i).last().length>0) {
			basicConsumption = basicConsumption +
			Number($(".consumption" + i).last().val())
			* Number($(".ship" + i).last().val());
		}
	}

	speedfactor = Number($(".speedfactor").last().val());
	msp = maxspeed();
	sp = speed();
	dist = distance();

	consumption = Math.round(basicConsumption * dist / 35000 * ((sp / 10) + 1) * ((sp / 10) + 1)) + 1;

	return(consumption);
}

function consumption() {
	var consumption = 0;
	var basicConsumption = 0;
	var values;
	var i;

	msp = maxspeed();
	sp = speed();
	dist = distance();
	dur = duration();
	speedfactor = Number($(".speedfactor").last().val());
	for (i = 200; i < 220; i++) {
		if ($(".ship" + i).length>0) {
			shipspeed = Number($(".speed" + i).last().val());
			spd = 35000 / (dur * speedfactor - 10) * Math.sqrt(dist * 10 / shipspeed);

			basicConsumption = Number($(".consumption" + i).last().val())
			* Number($(".ship" + i).last().val());
			
			consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
		}
	}
	consumption = Math.round(consumption) + 1;


	return(consumption);
}

function probeConsumption() {
	var consumption = 0;
	var basicConsumption = 0;
	var values;
	var i;

	msp = maxspeed();
	sp = speed();
	dist = distance();
	dur = duration();
	speedfactor = Number($(".speedfactor").last().val());


	if ($(".ship210").length>0) {
		shipspeed = Number($(".speed210").val());
		spd = 35000 / (dur * speedfactor - 10) * Math.sqrt(dist * 10 / shipspeed);

		basicConsumption = Number($(".consumption210").last().val())
		* Number($(".ship210").last().val());
		consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
	}


	consumption = Math.round(consumption) + 1;

	//  document.write(values);

	return(consumption);
}

function unusedProbeStorage() {

	var storage = Number($('.capacity210').last().val()) * Number($('.ship210').last().val());
	var stor =  storage - probeConsumption();
	return (stor>0)?stor:0;

}

function storage() {
	var storage = 0;

	for (i = 200; i < 300; i++) {

		if ($(".ship" + i).last().length>0) {
			if ((Number($(".ship" + i).last().val()) * 1) >= 1) {
				storage
				+= Number($(".ship" + i).last().val())
				*  Number($(".capacity" + i).last().val())
			}
		}
	}
	
	storage  = storage * getStorageFaktor();
	storage -= consumption();
	if ($(".ship210").last().length>0) {
		storage -= unusedProbeStorage();
	}

	return(storage);
}


function fleetInfo() {
	$(".speed").last().val(speed() * 10);
	$(".target").last().val(target());
	$(".distance").last().html(distance());

	var seconds = duration();
	var hours = Math.floor(seconds / 3600);
	seconds -= hours * 3600;

	var minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;

	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;

	$(".duration").last().html(hours + ":" + minutes + ":" + seconds + " h");

	var stor = storage();
	var cons = consumption();
	$(".maxspeed").last().html(tsdpkt(maxspeed()));
	if (stor >= 0) {
		$(".consumption").last().html('<font color="lime">'+cons+'</font>');
		$(".storage").last().html('<font color="lime">'+stor+'</font>');
	} else {
		$(".consumption").last().html('<font color="red">'+cons+'</font>');
		$(".storage").last().html('<font color="red">'+stor+'</font>');
	}
	calculateTransportCapacity();
}

function shortInfo() {

	$(".distance").last().html(tsdpkt(distance()));
	var seconds = duration();
	var hours = Math.floor(seconds / 3600);
	seconds -= hours * 3600;

	var minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;

	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;

	$(".duration").last().html(hours + ":" + minutes + ":" + seconds + " h");
	var stor = storage();
	var cons = consumption();

	$(".maxspeed").last().html(tsdpkt(maxspeed()));
	if (stor >= 0) {
		$(".consumption").last().html('<font color="lime">'+tsdpkt(cons)+'</font>');
		$(".storage").last().html('<font color="lime">'+tsdpkt(stor)+'</font>');
	} else {
		$(".consumption").last().html('<font color="red">'+tsdpkt(cons)+'</font>');
		$(".storage").last().html('<font color="red">'+tsdpkt(stor)+'</font>');
	}

}


function setResource(id, val) {
	if ($(id)) {
		$(".resource" + id).last().val(val);
	}
}

function maxResource(id) {
	var thisresource = Number($(".thisresource" + id).last().val());
	var thisresourcechosen = Number($(".resource" + id).last().val());

	if (isNaN(thisresourcechosen)){
		thisresourcechosen=0;
	}
	if (isNaN(thisresource)){
		thisresource=0;
	}

var storCap = storage();
    if (id==3){        
        if ((thisresource - consumption()) < 0)
            thisresource = 0;
        else
            thisresource -= consumption();
    }

	var metalToTransport = Number($(".resource1").last().val());
	var crystalToTransport = Number($(".resource2").last().val());
	var deuteriumToTransport = Number($(".resource3").last().val());

	if (isNaN(metalToTransport)){
		metalToTransport=0;
	}
	if (isNaN(crystalToTransport)){
		crystalToTransport=0;
	}
	if (isNaN(deuteriumToTransport)){
		deuteriumToTransport=0;
	}

	var freeCapacity = Math.max(storCap - metalToTransport - crystalToTransport - deuteriumToTransport, 0);
	var cargo = Math.min (freeCapacity + thisresourcechosen, thisresource);

	if ($(".resource" + id).last().length>0) {
		$(".resource" + id).last().val(cargo);
	}
	calculateTransportCapacity();
}

function maxResources() {
	var id;
	var storCap = storage();
	var metalToTransport = Math.round($(".thisresource1").last().val());
    var crystalToTransport = Math.round($(".thisresource2").last().val());
    var deuteriumToTransport = Math.round($(".thisresource3").last().val() - consumption());


	var freeCapacity = storCap - metalToTransport - crystalToTransport - deuteriumToTransport;
	if (freeCapacity < 0) {
		metalToTransport = Math.min(metalToTransport, storCap);
		crystalToTransport = Math.min(crystalToTransport, storCap - metalToTransport);
		deuteriumToTransport = Math.min(deuteriumToTransport, storCap - metalToTransport - crystalToTransport);
	}
	$(".resource1").last().val(Math.max(metalToTransport, 0));
	$(".resource2").last().val(Math.max(crystalToTransport, 0));
	$(".resource3").last().val(Math.max(deuteriumToTransport, 0));
	calculateTransportCapacity();
}

function maxShip(id) {
	if ($('.'+id).last().length>0) {
		$('.'+id).last().val($(".max" + id).last().val());
	}	
}

function maxShips() {
	var id;
	for (i = 200; i < 220; i++) {
		id = "ship"+i;
		maxShip(id);
	}
}


function noShip(id) {
	if ($('.'+id).last().length>0) {
		$('.'+id).last().last().val('0');
	}	
}


function noShips (){
	var id;
	for (i = 200; i < 220; i++) {
		id = "ship"+i;
		noShip(id);
	}
}

function calculateTransportCapacity() {
	var metal = Math.round(Math.abs($(".resource1").last().val()));
    var crystal = Math.round(Math.abs($(".resource2").last().val()));
    var deuterium = Math.round(Math.abs($(".resource3").last().val()));

	transportCapacity =  storage() - metal - crystal - deuterium;

	if (transportCapacity < 0) {
		$(".remainingresources").last().html("<font color=red>"+transportCapacity+"</font>");
	} else {
		$(".remainingresources").last().html("<font color=lime>"+transportCapacity+"</font>");
	}
	return transportCapacity;
}

function getLayerRef(id, document) {
	if (!document)
	document = window.document;

	if (document.layers) {
		for (var l = 0; l < document.layers.length; l++)
		if (document.layers[l].id == id)
		return document.layers[l];
		for (var l = 0; l < document.layers.length; l++) {
			var result = getLayerRef(id, document.layers[l].document);
			if (result)
			return result;
		}
		return null;
	}
	else if (document.all) {
		return document.all[id];
	}
	else if ($) {
		return $('.'+id).last();
	}
}

function setVisibility(objLayer, visible) {
	if (document.layers) {
		objLayer.visibility =
		(visible == true) ? 'show' : 'hide';
	} else {
		objLayer.style.visibility =
		(visible == true) ? 'visible' : 'hidden';
	}
}

function setVisibilityForDivByPrefix(prefix, visible, d) {
	if (!d)
	d = window.document;

	if (document.layers) {
		for (var i = 0; i < d.layers.length; i++) {
			if (d.layers[i].id.substr(0, prefix.length) == prefix)
			setVisibility(d.layers[l], visible);
			setVisibilityForDivByPrefix(prefix, visible, d.layers[i].document);
		}
	} else if (document.all) {
		var layers = document.all.tags("div");
		for (i = 0; i < layers.length; i++) {
			if (layers[i].id.substr(0, prefix.length) == prefix)
			setVisibility(document.all.tags("div")[i].visible);
		}
	} else if (document.getElementsByTagName) {
		var layers = document.getElementsByTagName("div");
		for (i = 0; i < layers.length; i++) {
			if (layers[i].id.substr(0, prefix.length) == prefix)
			setVisibility(layers[i].visible);
		}
	}
}


/*
function disableSome() {
document.forms.mission[6].disabled = true;
document.forms.mission[7].disabled = true;
document.forms.mission[8].disabled = true;
}
*/
function setPlanet(string) {
	var splitstring = string.split(":");
	$('.galaxy').last().val(splitstring[0]);
	$('.system').last().val(splitstring[1]);
	$('.planet').last().val(splitstring[2]);
	$('.planettype').last().val(splitstring[3]);
	setMission(splitstring[4]);
}

function setUnions(cnt) {
	galaxy = $('.galaxy').last().val();
	system = $('.system').last().val();
	planet =   $('.planet').last().val();
	planettype = $('.planettype').last().val();

	thisgalaxy = $(".thisgalaxy").last().val();
	thissystem = $(".thissystem").last().val();
	thisplanet = $(".thisplanet").last().val();
	thisplanettype = $(".thisplanettype").last().val();

	spd = $(".speed").last().val();
	speedfactor = $(".speedfactor").last().val();

	for (i = 0; i < cnt; i++) {
		//    alert ("set unions called "+ cnt);
		var string = $(".union"+i).last().html();
		time = $('.union'+i+'time').last().val();
		/* alert ("set unions called "+ time);*/
		targetgalaxy = $('.union'+i+'galaxy').last().val();
		targetsystem = $('.union'+i+'system').last().val();
		targetplanet = $('.union'+i+'planet').last().val();
		targetplanettype = $('.union'+i+'planettype').last().val();

		if (targetgalaxy == galaxy && targetsystem == system
		&& targetplanet == planet && targetplanettype == planettype){


			inSpeedLimit = isInSpeedLimit(flightTime(thisgalaxy, thissystem, thisplanet,
			targetgalaxy, targetsystem, targetplanet,
			spd, speedfactor), time);
			//      alert ("in here" + inSpeedLimit);
			if (inSpeedLimit == 2) {
				$(".union"+i).last().html('<font color="lime">'+string+'</font>');
			} else if (inSpeedLimit == 1) {
				$(".union"+i).last().html('<font color="orange">'+string+'</font>');
			} else {
				$(".union"+i).last().html('<font color="red">'+string+'</font>');
			}
		} else {
			$(".union"+i).last().html('<font color="#00a0ff">'+string+'</font>');
			//      alert("red"+i);
		}
	}
}

function isInSpeedLimit(flightlength, eventtime) {
	var time = new Date();
	time = Math.round(time / 1000);
	if (flightlength < ((eventtime - time) * (1 + 0.5))) {
		return 2;
	} else if (flightlength < ((eventtime - time) * 1)) {
		return 1;
	} else {
		return 0;
	}
}

function flightTime(galaxy, system, planet,
targetgalaxy, targetsystem, targetplanet,
spd, maxspeed, speedfactor) {
	//    alert ("flighttime called 1"+galaxy+" "+system+" "+planet+" "+targetgalaxy+" "+targetsystem+" "+targetplanet);

	if ((galaxy - targetgalaxy) != 0) {
		dist = Math.abs(galaxy - targetgalaxy) * 20000;
	} else if ((system - targetsystem) != 0) {
		dist = Math.abs(system - targetsystem) * 5 * 19 + 2700;
	} else if ((planet - targetplanet) != 0) {
		dist = Math.abs(planet - targetplanet) * 5 + 1000;
	} else {
		dist = 5;
	}
	return Math.round(((35000 / spd * Math.sqrt(dist * 10 / maxspeed) + 10) / speedfactor));
}

function showCoords() {
	$('.speed').last().disabled = false;
	$('.galaxy').last().disabled = false;
	$('.system').last().disabled = false;
	$('.planet').last().disabled = false;
	$('.planettype').last().disabled = false;
	$('.shortlinks').last().disabled = false;
}

function hideCoords() {
	$('.speed').last().disabled = true;
	$('.galaxy').last().disabled = true;
	$('.system').last().disabled = true;
	$('.planet').last().disabled = true;
	$('.planettype').last().disabled = true;
	$('.shortlinks').last().disabled = true;
}

function showOrders() {
	$('.order').last().disabled = false;
	return;
}

function hideOrders() {
	$('.order').last().disabled = true;
}

function showResources() {
	$('.resource1').last().disabled = false;
	$('.resource2').last().disabled = false;
	$('.resource3').last().disabled = false;
	$('.holdingtime').last().disabled = false;
}

function hideResources() {
	$('.resource1').last().disabled = true;
	$('.resource2').last().disabled = true;
	$('.resource3').last().disabled = true;
	$('.holdingtime').last().disabled = true;
}

function setShips(s16,s17,s18,s19,s20,s21,s22,s23,s24,s25,s27,s28,s29,s30,s31,s32,s33){

	setNumber('202',s16);
	setNumber('203',s17);
	setNumber('204',s18);
	setNumber('205',s19);
	setNumber('206',s20);
	setNumber('207',s21);
	setNumber('208',s22);
	setNumber('209',s23);
	setNumber('210',s24);
	setNumber('211',s25);
	setNumber('213',s27);
	setNumber('214',s28);
	setNumber('215',s29);
	setNumber('216',s30);
	setNumber('217',s31);
	setNumber('218',s32);
	setNumber('219',s33);

}

function setNumber(name,number){
	if (typeof $('.ship'+name).last() != 'undefined'){
		$('.ship'+name).last().val(number);
	}
}

function tsdpkt(f) {
  r = "";
  vz = "";
  if (f < 0) { vz = "-"; }
  f = abs(f);
  r = f % 1000;
  while (f >= 1000){
    k1 = "";
    if ((f % 1000) < 100) { k1 = "0"; }
    if ((f % 1000) < 10) { k1 = "00"; }
    if ((f % 1000) == 0) { k1 = "00"; }
    f = abs((f-(f % 1000)) / 1000);
    r = f % 1000 + "." + k1 + r;
  }
  r = vz + r;
  return r;
}

function abs(a) {
	if(a < 0) return -a;
	return a;
}
function getStorageFaktor() {
 		return 1
 	}