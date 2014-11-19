 var Shipyard= {
	pageID: '.page-shipyard',
	missionType: 3,
	init: function (g,s,p,t,m) {	
		
		$('.page-content').hide();
		onPage = 'shipyard';
		$('.bar-title h1').html('Shipyard');
		$('.bar-title span').html('Open <a class="combat-sim" onclick="Shipyard.showSim();">Combat Simulator</a>');		
		this.content(g,s,p,t,m);
		$(this.pageID).show();
		this.initForm(0);
		makeScroll('step_ships_scroll');
		makeScroll('step_destination_scroll');
		makeScroll('step_mission_scroll');
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(g,s,p,t,m){
		$('.list-shipyard').html('<div id="wrapper">\
							<div id="steps">\
								<div id="formElem" name="formElem" method="post">\
									<fieldset class="step shipsStep" style="display:block;">\
									   <form><legend>Choose Ships: <span class="available_slots"></span></legend>\
										<div class="step-ships overthrow" id="step_ships_scroll"></div></form>\
									</fieldset>\
									<fieldset class="step destinationStep" style="display:none;">\
									   	<form><legend>Destination:</legend>\
									   	<div class="step-destination overthrow" id="step_destination_scroll"></div></form>\
									</fieldset>\
									<fieldset class="step missionsStep" style="display:none;">\
										<form><legend>Mission and Resources:</legend>\
									   	<div class="step-mission overthrow" id="step_mission_scroll"></div></form>\
									</fieldset>\
								</div>\
							</div>\
							<div id="navigation">\
								<ul>\
									<li class="selected shipsStepfocus"><a class="btn" onclick="Shipyard.initForm(1);">Ships</a></li>\
									<li class="destinationStepfocus"><a class="btn" onclick="Shipyard.initForm(2);">Target</a></li>\
									<li class="missionsStepfocus"><a class="btn" onclick="Shipyard.initForm(3);">Mission</a></li>\
									<li><a class="btn" onclick="Shipyard.send();">Send</a></li></ul>\
							</div>\
						</div>');
		
		
		
		/*$('#steps').stop().animate({
				marginLeft: '-0px'
		},500,function(){});*/

		var out = '';
		var out_page1 = '';
		var out_page2 = '';
		var out_page3 = '';
		var user_fleet = responseObj.state.fleet;
		var _planet = {};
		_planet = responseObj.state.planets[responseObj.state.user.current_planet];
		
		
		var g = typeof g !== 'undefined' ? g : _planet.g;
		var s = typeof s !== 'undefined' ? s : _planet.s;
		var p = typeof p !== 'undefined' ? p : _planet.p;
		var t = typeof t !== 'undefined' ? t : _planet.planet_type;
		var m = typeof m !== 'undefined' ? m : this.missionType;
		this.missionType = parseInt(m);
		
		//Count user fleet
		var fleet_count = 0;
		var fleet_expedition_count = 0;
		foreach(user_fleet, function(k,v){
			if(parseInt(v.fleet_owner) == parseInt(user.id)){
				fleet_count++;
			}
			if(parseInt(v.fleet_mission) == 15){
				fleet_expedition_count++;
			}
		});

		if(parseInt(user.astrophysics_tech) >= 1){
			var max_expedition = 1 + Math.floor( user.astrophysics_tech / 3 );
		}else{
			var max_expedition = 0;
		}
		
		var officers = officerCheck();
		
		var max_fleet_count = 1 + parseInt(user['computer_tech']) + officers['OFF_ADMIRAL_SLOT'];
		
		var color = '';
		var av_slots = '';
		if (max_fleet_count <= fleet_count){
			color += 'style="color:red;"';
		}
		
		$('.available_slots').html('<span '+color+'>(Available '+(max_fleet_count - fleet_count)+' slots out of '+max_fleet_count+')</span>');
		
		
			var have_ships = false;
			foreach(reslist_fleet, function(ship, v){
				if(parseInt(planet[ship]) > 0 && ship != 'solar_satellite'){
					out_page1 += '<div class="row">\
						<div class="cell">\
							'+lang._T('tech_'+ship)+' ('+exactNumber(planet[ship])+')<br/>\
							<span style="font-size:9px;">'+lang._T('fl_speed_title')+exactNumber(GetFleetMaxSpeed( {}, ship, user ))+' &nbsp;&nbsp;&nbsp; Fuel: '+exactNumber(GetShipConsumption ( ship, user ))+'</span>\
						</div>\
						<div class="cell cell-max"><a class="btn max-ship-btn" rel="'+ship+'" onclick="maxShipBtn(\''+ship+'\');">Max.</a></div>\
						<div class="cell cell-input"><input data-max="'+planet[ship]+'" data-fuel="'+GetShipConsumption ( ship, user )+'" data-speed="'+GetFleetMaxSpeed ({}, ship, user)+'" data-cargo="'+pricelist[ship]['capacity']+'" data-name="'+ship+'" pattern="[0-9]*" type="number" class="ship_'+ship+' shipyard_input" name="ship_'+ship+'"  placeholder="0"/></div>\
					</div>';
					have_ships = true;
				}
			});
			if(have_ships == false){
				out += '<p>'+lang._T('fl_no_ships')+'</p>';
			}else{
				out_page1 = '<div class="table shipyard-ships">\
							'+out_page1+'\
							<div class="row" style="display:none;">\
								<div class="cell"></div>\
								<div class="cell cell-max"></div>\
								<div class="cell cell-input"><input data-max="0" data-fuel="0" data-speed="0" data-cargo="0" data-name="0" pattern="[0-9]*" type="number" class="ship_ shipyard_inputx" name="ship_"  placeholder="0"/></div>\
							</div>\
						</div>\
						<div class="shipyard-ships-control">\
							<div>\
								<a class="btn remove-ships" onclick="removeAllShipsBtn();">Remove Ships</a>\
							</div>\
							<div>\
								<a class="btn max-ships-all" onclick="maxAllShipsBtn();">All Ships</a>\
							</div>\
						</div>';
				$('.step-ships').html('').html('<ul><li>'+out_page1+'</li></ul>');
				
								
				// DO step 2 and 3
				var own_planets = '';
				var target_own_planet = undefined;
				foreach(responseObj.state.planets_sorted, function(k,pl){
					if(parseInt(pl.id) != parseInt(_planet.id)){
						own_planets += '<option value="'+pl.g+';'+pl.s+';'+pl.p+';'+pl.planet_type+'">'+pl.name+' ['+pl.g+':'+pl.s+':'+pl.p+']</option>';
					}
					if(pl.g == g && pl.s == s && pl.p == p && pl.planet_type == t){
						target_own_planet = pl;
					}
				});
				if(!Check.isEmpty(own_planets)){
					own_planets = '<select class="shipyard_own_planets"><option value=""></option>'+own_planets+'</select>';
				}else{
					own_planets = '<select class="shipyard_own_planets" style="display:none;"><option value=""></option></select>';
				}

				var acs = '';
				if(!Check.isEmpty(responseObj.state.user.acs)){
					foreach(responseObj.state.user.acs, function(k,v){
						acs += '<option value="'+v.id+'" rel="'+v.galaxy+';'+v.system+';'+v.planet+';'+v.planet_type+'">'+v.name+'</option>';
					});
				}
				
				if(!Check.isEmpty(acs)){
					acs = '<div class="row">\
							<div class="cell">ACS</div>\
							<div class="cell"></div>\
							<div class="cell">\
								<select name="fleet_group_id" class="fleet_group_id">\
									<option value="0"></option>\
									'+acs+'\
								</select>\
						</div></div>';
				}else{
					acs = '<div class="row" style="display:none;">\
							<div class="cell">ACS</div>\
							<div class="cell"></div>\
							<div class="cell">\
								<select name="fleet_group_id" class="fleet_group_id">\
									<option value="0"></option>\
								</select>\
						</div></div>';
				}
				
				out_page2 = '<div class="table shipyard-destination">\
					<div class="row">\
						<div class="cell">Planet Coordinates<br/><small>Not required for ACS</small></div>\
						<div class="cell cell-input planetchooser-destination">\
							<a class="btn" onclick="PlanetChooser.toggle(Shipyard.destination);">\
							'+(isset(target_own_planet) ? target_own_planet.name : 'Choose...')+'</a>\
							<!--'+own_planets+'-->\
							<input pattern="[0-9]*" type="number" class="shipyard_galaxy" name="shipyard_galaxy"  placeholder="0" value="'+g+'"/>\
							<input pattern="[0-9]*" type="number" class="shipyard_system" name="shipyard_system"  placeholder="0" value="'+s+'"/>\
							<input pattern="[0-9]*" type="number" class="shipyard_planet" name="shipyard_planet"  placeholder="0" value="'+p+'"/>\
						</div>\
					</div>\
					<div class="row">\
						<div class="cell">Planet Type</div>\
						<div class="cell">\
							<select name="shipyard_type" class="shipyard_type">\
								<option value="1" '+(t==1 ? 'selected="selected"' : '')+'>Planet</option>\
								<option value="3" '+(t==3 ? 'selected="selected"' : '')+'>Moon</option>\
								<option value="2" '+(t==2 ? 'selected="selected"' : '')+'>Debris</option>\
							</select>\
						</div>\
					</div>\
					<div class="row">\
						<div class="cell">Ship Speed</div>\
						<div class="cell">\
							<select name="shipyard_speed" class="shipyard_speed">\
								<option value="10">100%</option>\
								<option value="9">90%</option>\
								<option value="8">80%</option>\
								<option value="7">70%</option>\
								<option value="6">60%</option>\
								<option value="5">50%</option>\
								<option value="4">40%</option>\
								<option value="3">30%</option>\
								<option value="2">20%</option>\
								<option value="1">10%</option>\
							</select>\
						</div>\
					</div>\
					<div class="row" style="display:none;">\
						<div class="cell"></div>\
						<div class="cell cell-input">\
							<input pattern="[0-9]*" type="number" class="shipyard_planetx" name="shipyard_planetx"  placeholder="0" value="0"/>\
						</div>\
					</div>\
					<div class="row"><div class="cell">Distance</div><div class="cell shipyard_distance">-</div></div>\
					<div class="row"><div class="cell">Flying Time</div><div class="cell shipyard_time">-</div></div>\
					<div class="row"><div class="cell">Fuel</div><div class="cell shipyard_fuel">-</div></div>\
					<div class="row"><div class="cell">Max. Speed</div><div class="cell shipyard_max_speed"-></div></div>\
					<div class="row"><div class="cell">Cargo capacity</div><div class="cell shipyard_cargo">-</div></div>\
				</div>';
				$('.step-destination').html('').html(out_page2);
				
				
				out_page3 = '<div class="table shipyard-mission">\
					<div class="row">\
						<div class="cell">Mission</div>\
						<div class="cell"></div>\
						<div class="cell">\
							<select name="shipyard_mission" class="shipyard_mission" onchange="Shipyard.mission();">\
								<option value="1" class="shipyard_mission_attack">Attack</option>\
								<option value="2" class="shipyard_mission_acs_attack">ACS Attack</option>\
								<option value="3" class="shipyard_mission_transport">Transport</option>\
								<option value="4" class="shipyard_mission_deploy">Deploy</option>\
								<option value="5" class="shipyard_mission_hold_position">Hold Position</option>\
								<option value="6" class="shipyard_mission_spy">Spy</option>\
								<option value="7" class="shipyard_mission_colonize">Colonize</option>\
								<option value="8" class="shipyard_mission_recycle">Recycle</option>\
								<option value="9" class="shipyard_mission_destroy">Destroy</option>\
								<option value="15" class="shipyard_mission_expedition">Expedition</option>\
							</select>\
						</div>\
					</div>\
					<div class="row">\
						<div class="cell">Stay Time</div>\
						<div class="cell"></div>\
						<div class="cell">\
							<select name="shipyard_stay" class="shipyard_stay">\
								<option value="0"></option>\
								<option value="30">30 Minutes</option>\
								<option value="60">1 Hour</option>\
								<option value="120">2 Hours</option>\
							</select>\
					</div></div>\
					'+acs+'\
					<input type="hidden" value="0" name="shipyard_storage" class="shipyard_storage">\
					<input type="hidden" value="0" name="shipyard_all_fuel" class="shipyard_all_fuel">\
					<div class="row"><div class="cell"><h4 style="padding:0px;">Resources</h4></div><div class="cell"></div><div class="cell"></div></div>\
					<div class="row">\
						<div class="cell">Metal</div>\
						<div class="cell cell-max"><a class="btn max-resources-btn" rel="metal" onclick="maxResource(\'metal\');">Max.</a></div>\
						<div class="cell cell-input"><input pattern="[0-9]*" type="number" class="shipyard_metal" name="shipyard_metal"  placeholder="0"/></div>\
					</div>\
					<div class="row">\
						<div class="cell">Crystal</div>\
						<div class="cell cell-max"><a class="btn max-resources-btn" rel="crystal" onclick="maxResource(\'crystal\');">Max.</a></div>\
						<div class="cell cell-input"><input pattern="[0-9]*" type="number" class="shipyard_crystal" name="shipyard_crystal"  placeholder="0"/></div>\
					</div>\
					<div class="row">\
						<div class="cell">Deuterium</div>\
						<div class="cell cell-max"><a class="btn max-resources-btn" rel="deuterium" onclick="maxResource(\'deuterium\');">Max.</a></div>\
						<div class="cell cell-input"><input pattern="[0-9]*" type="number" class="shipyard_deuterium" name="shipyard_deuterium"  placeholder="0"/></div>\
					</div>\
					<div class="row" style="display:none;">\
						<div class="cell"></div>\
						<div class="cell cell-max"></div>\
						<div class="cell cell-input"><input pattern="[0-9]*" type="number" class="shipyard_deuteriumx" name="shipyard_deuteriumx"  placeholder="0"/></div>\
					</div>\
					<div class="row">\
						<div class="cell">Space Left</div>\
						<div class="cell cell-max"><a class="btn max-resources-all-btn" onclick="maxResources();">Auto</a></div>\
						<div class="cell cell-input shipyard_space_left"></div>\
					</div>\
					<!--<div class="row">\
						<div class="cell"></div>\
						<div class="cell cell-max"></div>\
						<div class="cell cell-input"><a class="btn" onclick="Shipyard.send();" style="padding:10px 0px;width:90%;text-align:center;">Send</a></div>\
					</div>-->\
				</div>';
				
				$('.step-mission').html('').html(out_page3);
				
			}

		
		
	
		return false;
	},
	destination: function(planet_id){
		var planet = responseObj.state.planets[planet_id];
		// planetchooser hides all pages
		$(Shipyard.pageID).show();
		$('.planetchooser-destination .btn').text(planet.name);
		$('.shipyard_galaxy').val(planet.g);
		$('.shipyard_system').val(planet.s);
		$('.shipyard_planet').val(planet.p);
		$('.shipyard_type').val(parseInt(planet.planet_type));
		validateStep(2);
	},
	mission: function(){
		Shipyard.missionType = $('.shipyard_mission').val();
		return false;
	},
	send:function(){
		var ship_count = 0;
		var ships = {};
		$('.shipyard_input').each(function(){
			if(parseInt($(this).val()) > 0){
				var name = $(this).data('name');
				var amount = parseInt($(this).val());
				var max = parseInt($(this).data('max'));
				if(max < amount){
					amount = max;
					$(this).val(max);
				}
				ship_count += amount;
				ships[name] = amount;
				//planet[name] = parseInt(planet[name]) - amount;
			}
		});
		var g = parseInt($('.shipyard_galaxy').val());
		var s = parseInt($('.shipyard_system').val());
		var p = parseInt($('.shipyard_planet').val());
		var t = parseInt($('.shipyard_type option:selected').val());
		var speed = parseInt($('.shipyard_speed option:selected').val());
		var mission = parseInt($('.shipyard_mission option:selected').val());
		var fleet_group_id = parseInt($('.fleet_group_id option:selected').val());
		var stay = $('.shipyard_stay option:selected').val();
		var metal = parseInt($('.shipyard_metal').val());
		var crystal = parseInt($('.shipyard_crystal').val());
		var deuterium = parseInt($('.shipyard_deuterium').val());
		
		if(ship_count < 1){
			alertify.alert(lang._T('You must to choose at least one ship'));
			return false;
		}
		
		if(g < 1 || s < 1 || p < 1){
			alertify.alert(lang._T('You must to enter planet coordinates'));
			return false;
		}
		
		Request.send({
			object:'shipyard', 
			action:'send', 
			g:g,
			s:s,
			p:p,
			t:t,
			speed:speed,
			mission:mission,
			fleet_group:fleet_group_id,
			stay:stay,
			metal:metal,
			crystal:crystal,
			deuterium:deuterium,
			ships:ships
		});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{			
			Shipyard.init(g,s,p,t,mission);
			//alertify.success(lang._T('You successfully sent fleet to planet ['+g+':'+s+':'+p+']'));
			noty({
				type: 'success',
				layout: 'bottom',
				text: lang._T('You successfully sent fleet to planet ['+g+':'+s+':'+p+']'),
				timeout: 1500
			});
		}
		
	},
	initForm: function(step){//shipsStep destinationStep missionsStep
		
		if(step > 0 && validateStep(step) == false){
				return false;
		}
		
		var stepName = 'shipsStep';
		if(step == 2){stepName = 'destinationStep';}
		if(step == 3){stepName = 'missionsStep';}
		
		
		$('#formElem .step').hide();
		$('#formElem .step.'+stepName).show();
		
		$('.shipsStepfocus').removeClass('selected');
		$('.destinationStepfocus').removeClass('selected');
		$('.missionsStepfocus').removeClass('selected');
		$('.'+stepName+'focus').addClass('selected');
		
		return;
	},
	
	showSim: function(m){
		
		var m = typeof m !== 'undefined' ? m : false;
		var target = false;
		if(m != false){
			Request.send({object:'mail', action:'get', idn:m});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				target = responseObj.mailget.message_data;
			}
		}
		Overview.resetModals();
		
		var sim = '<div class="table">';
		
		
		sim += '<p class="caption-sim" style="display:block;padding: 0.5em; width:100%; border-bottom: 1px solid #000;font-weight: bold;background:none;">Technology</p>\
			<div>\
				<div>Type</div>\
				<div>Attacker</div>\
				<div>Defender</div>\
			</div>\
			<div>\
				<div>Weapons</div>\
				<div><input data-name="tech_weapons" pattern="[0-9]*" type="number" class="tech_weapons " name="tech_weapons"  placeholder="0" value="'+user.weapons_tech+'"/></div>\
				<div><input data-name="tech_weapons2" pattern="[0-9]*" type="number" class="tech_weapons2 " name="tech_weapons2"  placeholder="0" value="'+(target && !Check.isEmpty(target.tech) && !Check.isEmpty(target.tech.weapons_tech) ? target.tech.weapons_tech : '')+'"/></div>\
			</div>\
			<div>\
				<div>Shields</div>\
				<div><input data-name="tech_shields" pattern="[0-9]*" type="number" class="tech_shields " name="tech_shields"  placeholder="0" value="'+user.shielding_tech+'"/></div>\
				<div><input data-name="tech_shields2" pattern="[0-9]*" type="number" class="tech_shields2 " name="tech_shields2"  placeholder="0" value="'+(target && !Check.isEmpty(target.tech) && !Check.isEmpty(target.tech.shielding_tech) ? target.tech.shielding_tech : '')+'"/></div>\
			</div>\
			<div>\
				<div>Armour</div>\
				<div><input data-name="tech_armour" pattern="[0-9]*" type="number" class="tech_armour " name="tech_armour"  placeholder="0" value="'+user.armour_tech+'"/></div>\
				<div><input data-name="tech_armour2" pattern="[0-9]*" type="number" class="tech_armour2 " name="tech_armour"  placeholder="0" value="'+(target && !Check.isEmpty(target.tech) && !Check.isEmpty(target.tech.armour_tech) ? target.tech.armour_tech : '')+'"/></div>\
			</div>';
		
		
		sim += '<div class="caption-sim" style="display:block;padding: 0.5em; width:100%; border-bottom: 1px solid #000;font-weight: bold;background:none;">Ships</div>\
			<div>\
				<div>Type</div>\
				<div>Attacker</div>\
				<div>Defender</div>\
			</div>';
		foreach(reslist_fleet, function(ship, k){
			sim += '<div>\
					<div>'+lang._T('tech_'+ship)+'</div>\
					<div><input data-name="'+ship+'" pattern="[0-9]*" type="number" class="ship_'+ship+'  attacker_input" name="ship_'+ship+'"  placeholder="0" value="'+planet[ship]+'"/></div>\
					<div><input data-name="'+ship+'" pattern="[0-9]*" type="number" class="ship_'+ship+'  defender_input" name="ship_'+ship+'2"  placeholder="0" value="'+(target && !Check.isEmpty(target.ships) && !Check.isEmpty(target.ships[ship]) ? target.ships[ship] : '')+'"/></div>\
				</div>\
			';
		});
		
		sim += '<div class="caption-sim" style="display:block;padding: 0.5em; width:100%; border-bottom: 1px solid #000;font-weight: bold;background:none;">Defense</div>\
			<div>\
				<div>Type</div>\
				<div>Attacker</div>\
				<div>Defender</div>\
			</div>';
		foreach(reslist_battle_defense, function(ship, k){
			sim += '<div>\
					<div>'+lang._T('tech_'+ship)+'</div>\
					<div></div>\
					<div><input data-name="'+ship+'" pattern="[0-9]*" type="number" class="ship_'+ship+'  defender_input" name="ship_'+ship+'2"  placeholder="0" value=""/></div>\
				</div>\
			';
		});
		
		sim += '<div style="display:none;"><input type="text" value="" name="input_fix" class="input_fix"></div></div>';
		
		
		$('.page-sim-page').html('<div class="b-main overthrow" id="simScrollPage">\
					<ul><li><div class="sim" style="padding-bottom:50px;">\
					'+sim+'\
				</div></li></ul></div>\
				<nav class="b-menu">\
					<a class="fl btn" style="margin-left:10px;" onclick="Shipyard.closeSim();">'+lang._T('close')+'</a>\
					<a class="fr btn" onclick="Shipyard.doSim();">'+lang._T('Simulate')+'</a>\
				</nav>').show();
		makeScroll('simScrollPage');
		return false;
	},
	closeSim: function(){
		$('.page-sim-page').hide().html("");
	},
	doSim:function(){
		
		var ships_attacker = {};
		$('.attacker_input').each(function(){
			if(parseInt($(this).val()) > 0){
				var name = $(this).data('name');
				var amount = parseInt($(this).val());
				
				ships_attacker[name] = amount;
			}
		});
		
		var ships_defender = {};
		$('.defender_input').each(function(){
			if(parseInt($(this).val()) > 0){
				var name = $(this).data('name');
				var amount = parseInt($(this).val());
				
				ships_defender[name] = amount;
			}
		});
		
		var tech_weapons = parseInt($('.tech_weapons').val());
		var tech_shields = parseInt($('.tech_shields').val());
		var tech_armour = parseInt($('.tech_armour').val());
		
		var tech_weapons2 = parseInt($('.tech_weapons2').val());
		var tech_shields2 = parseInt($('.tech_shields2').val());
		var tech_armour2 = parseInt($('.tech_armour2').val());
		
		
		
		Request.send({
			object:'sim', 
			action:'simulate', 
			tech_weapons:tech_weapons,
			tech_shields:tech_shields,
			tech_armour:tech_armour,
			tech_weapons2:tech_weapons2,
			tech_shields2:tech_shields2,
			tech_armour2:tech_armour2,
			ships_attacker:ships_attacker,
			ships_defender:ships_defender
		});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{			
			CR.showSimPage(responseObj.simsimulate.report);
		}
		return false;
	}
};

/*
validates one fieldset
and returns -1 if errors found, or 1 if not
*/
function validateStep(step){
	//var send_action = typeof send_action !== 'undefined' ? send_action : false;
	//Validate Step One: check if is any ship is selected
	var ship_count = 0;
	var ships = {};
	var max_speed = 0;
	var total_cargo = 0;
	var total_fuel = 0;
	$('.shipyard_input').each(function(){
		if(parseInt($(this).val()) > 0){
			var name = $(this).data('name');
			var amount = parseInt($(this).val());
			var max = parseInt($(this).data('max'));
			var speed = parseInt($(this).data('speed'));
			var fuel = parseInt($(this).data('fuel'));
			var cargo = parseInt($(this).data('cargo'));
			if(max < amount){
				amount = max;
				$(this).val(max);
			}
			
			if(max_speed == 0){
				max_speed = speed;
			}else{
				if(max_speed > speed){
					max_speed = speed;
				}
			}
			
			ship_count += amount;
			total_cargo += cargo * amount;
			total_fuel += fuel * amount;
			
			ships[name] = {
				max: max,
				fuel: fuel,
				speed: speed,
				cargo: cargo * amount,
				amount: amount
			};
		}
	});
	//console.log(ships);
	if(ship_count < 1){
		alertify.alert(lang._T('You must to choose at least one ship'));
		return false;
	}
	
	//show step 2
	var speedfactor = GetGameSpeedFactor();
	
	//Calculate dustance
	var distance = distanse();
	
	
	var tmp_g = parseInt($('.shipyard_galaxy').val());
	var tmp_s = parseInt($('.shipyard_system').val());
	var tmp_p = parseInt($('.shipyard_planet').val());
	if(Check.isEmpty(tmp_g) || tmp_g < 0 || Check.isEmpty(tmp_s) || tmp_s < 0 || Check.isEmpty(tmp_p) || tmp_p < 0){
		$('.shipyard_distance').html('0');
		$('.shipyard_time').html('0');
		$('.shipyard_fuel').html('0');
	}else{
		$('.shipyard_distance').html(tsdpkt(distance));
		//Calculate time
		var fleet_speed = parseInt($('.shipyard_speed option:selected').val());
		var duration = GetMissionDuration (fleet_speed, max_speed, distance, speedfactor)
		
		var seconds = duration;
		var hours = Math.floor(seconds / 3600);
		seconds -= hours * 3600;
	
		var minutes = Math.floor(seconds / 60);
		seconds -= minutes * 60;
	
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;
	
		var time = hours + ':' + minutes + ':' + seconds + ' h';
		
		var fuel = GetFleetConsumption (ships, speedfactor, duration, distance, max_speed)

		
		$('.shipyard_time').html(time);
		
		//Fuel
		$('.shipyard_fuel').html(exactNumber(fuel));
		$('.shipyard_all_fuel').val(fuel);

		if (total_cargo < fuel){
			$('.shipyard_fuel').css('color', 'red');
		}else{
			$('.shipyard_fuel').css('color', 'white');
		}
	}
	
	
	//Calculate Max Speed
	$('.shipyard_max_speed').html(exactNumber(max_speed));
	
	//Calculate Cargo
	$('.shipyard_cargo').html(exactNumber(total_cargo));
	$('.shipyard_storage').val(total_cargo);
	
	if(step > 2){
		if(tmp_g < 1 || tmp_s < 1 || tmp_p < 1){
			alertify.alert(lang._T('You must to enter planet coordinates'));
			return false;
		}
		
		var fleet_group_mr = 0;
		var myPlanet = false;
		foreach(responseObj.state.planets, function(k, p){
			if(tmp_g == parseInt(p.g) && tmp_s == parseInt(p.s) && tmp_p == parseInt(p.p)){
				myPlanet = true;
			}
		});
		
		var planet_type = parseInt($('.shipyard_type option:selected').val());
		var missiontype = {};

		if (planet_type == 2){
			if (!Check.isEmpty(ships.recycler) &&  ships.recycler.amount >= 1){
				missiontype[8] = 'Recycle';
			}				
		}else if (planet_type == 1 || planet_type == 3){
			if (!Check.isEmpty(ships.colony_ship) &&  ships.colony_ship.amount >= 1){
				missiontype[7] = 'Colonize';
				
			}else if (!Check.isEmpty(ships.espionage_probe) &&  ships.espionage_probe.amount >= 1 && myPlanet == false){
				if(count(ships) == 1){
					missiontype[6] = 'Spy';
				}
			}
			if (count(ships) > 0) {					
				if(parseInt(user.attack_enabled) == 1 && myPlanet == false){
					missiontype[1] = 'Attack';
				} 
	
				missiontype[3] = 'Transport';
				missiontype[5] = 'Hold Position';				
			}
			
			
			missiontype[3] = 'Transport';
			
			if (myPlanet == true){
				missiontype[4] = 'Deploy';
			}
		
			if ((planet_type == 3 || planet_type == 1) ){
				missiontype[2] = 'ACS Attack';
			}
		
			if(planet_type == 3 && !Check.isEmpty(ships.deathstar) &&  ships.deathstar.amount >= 1 && myPlanet == false){
				if(parseInt(user.attack_enabled) == 1){
					missiontype[9] = 'Destroy';
				}
			}
			
			if(parseInt(user.expedition) ==1){
				missiontype[15] = 'Expedition';
			}
		}
	
		
		
		//Show Missions
		var shipyard_mission = '';
		foreach(missiontype, function(k,v){
			var selected = '';
			if(Shipyard.missionType == k){
				selected = 'selected="selected"';
			}
			shipyard_mission += '<option value="'+k+'" '+selected+'>'+v+'</option>';
		});
		
		$('.shipyard_mission').html(shipyard_mission);
		
		
		//Show total cargo resources
		calculateTransportCapacity();
	}
	
	

	
	
	
	
	



	
	/*var stor = storage();
	

	$(".maxspeed").last().html(tsdpkt(maxspeed()));
	if (stor >= 0) {
		$(".consumption").last().html('<font color="lime">'+tsdpkt(cons)+'</font>');
		$(".storage").last().html('<font color="lime">'+tsdpkt(stor)+'</font>');
	} else {
		$(".consumption").last().html('<font color="red">'+tsdpkt(cons)+'</font>');
		$(".storage").last().html('<font color="red">'+tsdpkt(stor)+'</font>');
	}*/

	
	
	
	//calculate distance
	
	//Flying time
	
	//Fuel
	
	//Max Speed
	
	//Cargo
		
	//Validate step two: 
	if(step < 3){
		//Check if planet exist
		//user have enought deuterium
	}
			
	//Check step three:
	if(step >= 3){
		//Check mission
		//Check resources loaded
	}
}

function abs(a) {
	if(a < 0) return -a;
	return a;
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

function GetGameSpeedFactor(){
	return user.fleet_speed / 2500;
}

function distanse() {
	var u_g = parseInt(planet.g);
	var u_s = parseInt(planet.s);
	var u_p = parseInt(planet.p);

	var t_g = parseInt($('.shipyard_galaxy').val());
	var t_s = parseInt($('.shipyard_system').val());
	var t_p = parseInt($('.shipyard_planet').val());
	
	if(Check.isEmpty(t_g) || t_g < 0){
		t_g = u_g;
	}
	if(Check.isEmpty(t_s) || t_s < 0){
		t_s = u_s;
	}
	if(Check.isEmpty(t_p) || t_p < 0){
		t_p = u_p;
	}
	
	var distance = 0;

	if ((t_g - u_g) != 0) {
		distance = Math.abs(t_g - u_g) * 20000;
	} else if ((t_s - u_s) != 0) {
		distance = Math.abs(t_s - u_s) * 5 * 19 + 2700;
	} else if ((t_p - u_p) != 0) {
		distance = Math.abs(t_p - u_p) * 5 + 1000;
	} else {
		distance = 5;
	}

	return distance;
}

function maxResources() {
	maxResource('metal');
	maxResource('crystal');
	maxResource('deuterium');
}

function maxResource(res) {
	var storage = parseInt($('.shipyard_storage').val());
	var fuel = {
		metal: 0,
		crystal: 0,
		deuterium: parseInt($('.shipyard_all_fuel').val())
	};
	//if (parseInt($(".shipyard_mission").val()) == 4) {
	//	fuel.deuterium /= 2; // deploy recalls are now free
	//}
	var cargo = {};

	if(res == 'metal'){
		cargo.metal = 0;
		cargo.crystal = (!Check.isEmpty($(".shipyard_crystal").val()) ? parseInt($(".shipyard_crystal").val()) : 0);
		cargo.deuterium = (!Check.isEmpty($(".shipyard_deuterium").val()) ? parseInt($(".shipyard_deuterium").val()) : 0);
	}else if(res == 'crystal'){
		cargo.metal = (!Check.isEmpty($(".shipyard_metal").val()) ? parseInt($(".shipyard_metal").val()) : 0);
		cargo.crystal = 0;
		cargo.deuterium = (!Check.isEmpty($(".shipyard_deuterium").val()) ? parseInt($(".shipyard_deuterium").val()) : 0);
	}else if(res == 'deuterium'){
		cargo.metal = (!Check.isEmpty($(".shipyard_metal").val()) ? parseInt($(".shipyard_metal").val()) : 0);
		cargo.crystal = (!Check.isEmpty($(".shipyard_crystal").val()) ? parseInt($(".shipyard_crystal").val()) : 0);
		cargo.deuterium = 0;
	} 
	
	var total_loaded = cargo.metal + cargo.crystal + cargo.deuterium + fuel.deuterium;
	
	var available_space = storage - total_loaded;

	if(available_space < 0){
		available_space = 0;
	}

	if(planet[res] - fuel[res] < available_space){
		cargo[res] += Math.floor(planet[res] - fuel[res]);
	}else{
		cargo[res] += Math.floor(available_space);
	}
	
	$('.shipyard_'+res).val(Math.floor(cargo[res]));
	
	calculateTransportCapacity();
}




function calculateTransportCapacity() {
	var storage = parseInt($('.shipyard_storage').val());
	var fuel = parseInt($('.shipyard_all_fuel').val());
	//if (parseInt($(".shipyard_mission").val()) == 4) {
	//	fuel /= 2; // deploy recalls are now free
	//}
	
	var metal = (!Check.isEmpty($(".shipyard_metal").val()) ? $(".shipyard_metal").val() : 0);
	var crystal = (!Check.isEmpty($(".shipyard_crystal").val()) ? $(".shipyard_crystal").val() : 0);
	var deuterium = (!Check.isEmpty($(".shipyard_deuterium").val()) ? $(".shipyard_deuterium").val() : 0);

	var transportCapacity =  storage - metal - crystal - deuterium - fuel;

	if (transportCapacity < 0) {
		$(".shipyard_space_left").html("<font color=red>"+exactNumber(transportCapacity)+"</font>");
	} else {
		$(".shipyard_space_left").html("<font color=lime>"+exactNumber(transportCapacity)+"</font>");
	}
	return transportCapacity;
}
