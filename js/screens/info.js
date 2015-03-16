 var Info= {
	init: function (el) {

		Info.content(el);
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(el){		
		var page ='';		
		var page_content ='';	
		var name	         = lang._T('info_'+el+'_name');
		var description		 = lang._T('info_'+el+'_description');
		var image			 = el;
		
		//Template variables
		var table_data = '';
		var table_head = '';
		var gate = '';
		
		//Table template
		if(el == 'metal_mine' || el == 'crystal_mine' || el == 'deuterium_synthesizer' || el == 'solar_plant' || el == 'fusion_reactor' || el == 'sensor_phalanx'){
			table_data  = Info.ShowProductionTable (el);
			if(el == 'metal_mine' || el == 'crystal_mine' || el == 'deuterium_synthesizer'){
				table_head  = '<div><div>'+lang._T('in_level')+'</div><div>'+lang._T('in_prod_p_hour')+'</div><div>'+lang._T('in_difference')+'</div><div>'+lang._T('in_used_energy')+'</div><div>'+lang._T('in_difference')+'</div></div>';
			}else if(el == 'solar_plant'){
				table_head  = '<div><div>'+lang._T('in_level')+'</div><div>'+lang._T('in_prod_energy')+'</div><div>'+lang._T('in_difference')+'</div></div>';
			}else if(el == 'fusion_reactor'){
				table_head  = '<div><div>'+lang._T('in_level')+'</div><div>'+lang._T('in_prod_energy')+'</div><div>'+lang._T('in_difference')+'</div><div>'+lang._T('in_used_deuter')+'</div><div>'+lang._T('in_difference')+'</div></div>';
			}else if(el == 'sensor_phalanx'){
				table_head  = '<div><div>'+lang._T('in_level')+'</div><div>'+lang._T('in_range')+'</div></div>';
			}else if(el == 'metal_storage' || el == 'crystal_storage' || el == 'deuterium_storage'){
				table_head  = '<div><div>'+lang._T('in_level')+'</div><div>'+lang._T('Capacity')+'</div><div>'+lang._T('in_difference')+'</div></div>';
			}
		}
        if(el == 'metal_storage' || el == 'crystal_storage' || el == 'deuterium_storage'){
			table_data  = Info.ShowStorageTable (el);
			table_head  = '<div><div>'+lang._T('in_level')+'</div><div>'+lang._T('Capacity')+'</div></div>';
		}
		
		var gateTimer = false;	
		if (el == 'jump_gate' && planet['jump_gate'] > 0){
			RestString               = Info.GetNextJumpWaitTime(planet);
			var gate_start_link = BuildPlanetAdressLink(planet);
			if (parseInt(RestString['value']) != 0){
				var gate_wait_time   = '<div id="jump-gate-timer" class="js_timer" timer="'+RestString['value']+'|1"></div>';
				gateTimer = true;
			}else{
				var gate_wait_time   = '';
			}
			var gate_dest_moons = Info.BuildJumpableMoonCombo(user, planet);
			var gate_fleet_rows = Info.BuildFleetListRows(planet);
			
			
			if(gateTimer == true){
				gate += '<div class="jumpgate table shipyard-ships">\
						<div class="caption"></div>\
						<div>\
							<div>'+lang._T('Next Jump:')+'</div>\
							<div>'+gate_wait_time+'</div>\
						</div>\
					</div>';
			}else{
				gate += '<div class="jumpgate table shipyard-ships">\
						<div class="caption"></div>\
						<div>\
							<div>'+lang._T('in_jump_gate_start_moon')+'</div>\
							<div>'+gate_start_link+'</div>\
						</div>\
						<div>\
							<div>'+lang._T('in_jump_gate_finish_moon')+'</div>\
							<div><select name="jmpto" class="jump_id" style="width:70px;">'+gate_dest_moons+'</select></div>\
						</div>\
						'+gate_fleet_rows+'\
						<div>\
							<div>\
								<div class="btn remove-ships">Remove Ships</div>\
								<div class="btn max-ships-all">All Ships</div>\
							</div>\
							<div></div>\
						</div>\
						<div style="display:none;"><input type="text" value="" name="input_fix" class="input_fix"></div>\
						<div>\
							<div></div>\
							<div><div class="btn info-jump-link"> '+lang._T('in_jump_gate_jump')+'</div></div>\
						</div>\
					</div>';
			}
			

		}
		
		
		
		if(el == 'metal_mine' || el == 'crystal_mine' || el == 'deuterium_synthesizer' || el == 'solar_plant' || el == 'fusion_reactor' || el == 'sensor_phalanx' || el == 'metal_storage' || el == 'crystal_storage' || el == 'deuterium_storage'){
			page_content += '<div class="table">'+table_head+''+table_data+'</div>';
		}else if(isset(reslist_build[el]) || isset(reslist_tech[el])){
			page_content += gate;
		}else if(isset(reslist_fleet[el])){
			var rf_info_to  = Info.ShowRapidFireTo(el);
			var rf_info_fr  = Info.ShowRapidFireFrom(el);
			var hull_pt     = prettyNumber (pricelist[el]['metal'] + pricelist[el]['crystal']);
			var shield_pt   = prettyNumber (CombatCaps[el]['shield']);
			var attack_pt   = prettyNumber (CombatCaps[el]['attack']);
			var capacity_pt = prettyNumber (pricelist[el]['capacity']);
			var base_speed  = prettyNumber (pricelist[el]['speed']);
			var base_conso  = prettyNumber (pricelist[el]['consumption']);
			var upd_speed = '';
			var upd_conso = '';
			
			if (el == 'small_cargo'){
				upd_speed   = '<font color="yellow">('+ prettyNumber (pricelist[el]['speed2']) +')</font>';
				upd_conso   = '<font color="yellow">('+ prettyNumber (pricelist[el]['consumption2']) +')</font>';
			}else if (el == 'bomber'){
				upd_speed   = '<font color="yellow">('+ prettyNumber (pricelist[el]['speed2']) +')</font>';
			}
				
			page_content += ''+rf_info_to+''+rf_info_fr+'\
								<div class="table">\
									<div class="caption">General Information</div>\
								    <div>\
								        <div>'+lang._T('in_struct_pt')+'</div>\
								        <div>'+hull_pt+'</div>\
								    </div>\
								    <div>\
								        <div>'+lang._T('in_shield_pt')+'</div>\
								        <div>'+shield_pt+'</div>\
								    </div>\
								    <div>\
								        <div>'+lang._T('in_attack_pt')+'</div>\
								        <div>'+attack_pt+'</div>\
								    </div>\
								    <div>\
								        <div>'+lang._T('in_capacity')+'</div>\
								        <div>'+capacity_pt+' '+lang._T('in_units')+'</div>\
								    </div>\
								    <div>\
								        <div>'+lang._T('in_base_speed')+'</div>\
								        <div>'+base_speed+' '+upd_speed+'</div>\
								    </div>\
								    <div>\
								        <div>'+lang._T('in_consumption')+'</div>\
								        <div>'+base_conso+' '+upd_conso+'</div>\
								    </div>\
							    </div>';
		}else if(isset(reslist_defense[el])){
			var rf_info_to = '';
			var rf_info_fr = '';
			if (el != 'anti_ballistic_missiles' && el != 'interplanetary_missiles'){
				rf_info_to  = Info.ShowRapidFireTo (el);
				rf_info_fr  = Info.ShowRapidFireFrom (el);
			}
			var hull_pt     = prettyNumber (pricelist[el]['metal'] + pricelist[el]['crystal']);
			var shield_pt   = prettyNumber (CombatCaps[el]['shield']);
			var attack_pt   = prettyNumber (CombatCaps[el]['attack']);
			
			
			page_content += ''+rf_info_to+''+rf_info_fr+'\
							<div class="table">\
								<div class="caption">General Information</div>\
							    <div>\
							        <div>'+lang._T('in_struct_pt')+'</div>\
							        <div>'+hull_pt+'</div>\
							    </div><div>\
							        <div>'+lang._T('in_shield_pt')+'</div>\
							        <div>'+shield_pt+'</div>\
							    </div><div>\
							        <div>'+lang._T('in_attack_pt')+'</div>\
							        <div>'+attack_pt+'</div>\
							    </div>\
							    </div>';
		}

		
		//Destroy button
		if(isset(reslist_build[el]) && el != 'terraformer' && el != 'moon_base' && planet[el] > 0){
			var NeededRessources     = GetBuildingPrice (el, true, true);
			var DestroyTime          = GetBuildingTime  (el) / 2;
				
			page_content += '<div class="destroy-box table">\
				<div class="caption">'+lang._T('in_destroy')+' '+name+' '+lang._T('in_level')+' '+planet[el]+'?</div>\
				<div>\
					<div>\
						'+lang._T('in_needed')+': '+lang._T('Metal')+': <b>'+prettyNumber(NeededRessources['metal'])+'</b><br/>\
						'+lang._T('Crystal')+': <b>'+prettyNumber(NeededRessources['crystal'])+'</b><br/>\
						'+lang._T('Deuterium')+': <b>'+prettyNumber(NeededRessources['deuterium'])+'</b><br>\
						'+lang._T('in_dest_durati')+': '+prettyTime(DestroyTime)+'<br>\
						<div class="btn destroy-building fr destroy-building-link" rel="'+el+'">'+lang._T('Destroy')+'</div>\
					</div>\
				</div>\
			</div>';
		}
		
		page = '<div class="description">\
				<img src="images/resources/'+image+'.png" class="info_img">\
				'+description+'\
				'+page_content+'\
			</div>';
		Modal.init(name, '<div class="info-modal">'+page+'</div>');
		
		return;
	},
	jump:function(){
		var ship_count = 0;
		var ships = {};
		$('.jumpgate .shipyard_input').each(function(){
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
			}
		});
		//console.log(ships);
		if(ship_count < 1){
			alertify.alert(lang._T('You must to choose at least one ship'));
			return false;
		}
		
		var moon_id = parseInt($('.jump_id option:selected').val());
		
		Request.send({
			object:'planet', 
			action:'jump', 
			moon_id:moon_id,
			ships:ships
		});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{	
			alertify.alert(lang._T('Ships has been sent.'));	
			Modal.close();	
			Info.init('jump_gate');
		}


	},
	GetNextJumpWaitTime: function(moon){
		var RetValue = {};
		
		JumpGateLevel  = moon['jump_gate'];
		LastJumpTime   = moon['last_jump_time'];
		if (JumpGateLevel > 0){
			WaitBetweenJmp = (60 * 60) * (1 / JumpGateLevel);
			NextJumpTime   = parseInt(LastJumpTime) + parseInt(WaitBetweenJmp);
			if (NextJumpTime >= parseInt(responseObj.timestamp))
			{
				RestWait   = parseInt(NextJumpTime) - parseInt(responseObj.timestamp);
				RestString = ' '+ prettyTime(RestWait);
			}
			else
			{
				RestWait   = 0;
				RestString = '';
			}
		}
		else
		{
			RestWait   = 0;
			RestString = '';
		}
		RetValue['string'] = RestString;
		RetValue['value']  = RestWait;
		
		return RetValue;
	},
	BuildFleetListRows: function(){
		var out = '';
		var have_ships = false;
		foreach(reslist_fleet, function(ship, v){
			if(parseInt(planet[ship]) > 0 && ship != 'solar_satellite'){
				out += '<div class="row">\
					<div class="cell">\
						<div class="btn max-ship-btn fr" rel="'+ship+'">Max.</div>\
						'+lang._T('tech_'+ship)+' ('+planet[ship]+')<br/>\
					</div>\
					<div class="cell cell-input"><input data-max="'+planet[ship]+'" pattern="[0-9]*" type="text" class="ship_'+ship+' shipyard_input" name="ship_'+ship+'" data-name="'+ship+'"  placeholder="0"/></div>\
				</div>';
				have_ships = true;
			}
		});
		if(have_ships == false){
			out += '<p>'+lang._T('fl_no_ships')+'</p>';
		}
		
		return out;
	},
	BuildJumpableMoonCombo: function(){
		var moons = {};
		var out = '';
		foreach(responseObj.state.planets_sorted, function(id, v){
			if(parseInt(v.planet_type) == 3 && v.id != planet.id){
				var p = responseObj.state.planets[v.id];
				var RestString = Info.GetNextJumpWaitTime(p);
				if(parseInt(p.jump_gate) >= 1){
					out += '<option value="'+ p.id +'">['+ p.g +':'+ p.s +':'+ p.p +'] '+ p.name + RestString['string'] +'</option>';
				}			
			}
		});
		return out;
	},
	ShowProductionTable: function(el){

		var BuildLevelFactor = planet[el+"_porcent"];
		var BuildTemp        = planet['temp_max'];
		var CurrentBuildtLvl = planet[el];
		var officers = officerCheck(user);
		
		BuildLevel       = CurrentBuildtLvl > 0 ? CurrentBuildtLvl : 1;
		EnergyTech		  = user['energy_tech'] > 0 ? user['energy_tech'] : 0; 
		
		var Prod = production(el);

		ActualProd       = Math.floor(Prod[el]);

		if (el == 'fusion_reactor'){
			ActualNeed       = Math.floor(Prod['deuterium']);
		}else{
			ActualNeed       = Math.floor(Prod['energy']);
		}			

		var BuildStartLvl    = CurrentBuildtLvl - 2;
		if (BuildStartLvl < 1){
			BuildStartLvl = 1;
		}			

		Table     = '';
		ProdFirst = 0;

		for ( var BuildLevel = BuildStartLvl; BuildLevel < BuildStartLvl + 15; BuildLevel++ ){
			if (el != 'sensor_phalanx'){
				var Prod = production(el, BuildLevel);
				
				var build_lvl       = CurrentBuildtLvl == BuildLevel ? '<font color="#ff0000">'+BuildLevel+'</font>' : BuildLevel;

				if (ProdFirst > 0){
					if (el != 'fusion_reactor'){
						var build_gain      = '<font color="lime">('+ prettyNumber(Math.floor(Prod[el] - ProdFirst)) +')</font>';
					}else{
						var build_gain      = '<font color="lime">('+ prettyNumber(Math.floor(Prod['energy'] - ProdFirst)) +')</font>';
					}
				}else{
					var build_gain      = '';
				}
				//console.log(Prod);	
				if (el != 'fusion_reactor'){
					var build_prod      = prettyNumber(Math.floor(Prod[el]));
					var build_prod_diff = colorNumber( (Math.floor(Prod[el] - ActualProd)) );
					var build_need      = colorNumber( (Math.floor(Prod['energy'])) );
					var build_need_diff = colorNumber( (Math.floor(Prod['energy'] - ActualNeed)) );
				}else{
					var build_prod      = prettyNumber(Math.floor(Prod['energy']));
					var build_prod_diff = colorNumber( (Math.floor(Prod['energy'] - ActualProd)) );
					var build_need      = colorNumber( (Math.floor(Prod['deuterium'])) );
					var build_need_diff = colorNumber( (Math.floor(Prod['deuterium'] - ActualNeed)) );
				}
				if (ProdFirst == 0){
					if (el != 'fusion_reactor'){
						ProdFirst = Math.floor(Prod[el]);
					}else{
						ProdFirst = Math.floor(Prod['energy']);
					}
				}
			}else{
				var build_lvl       = CurrentBuildtLvl == BuildLevel ? '<font color="#ff0000">'+BuildLevel+'</font>' : BuildLevel;
				var build_range     = (BuildLevel * BuildLevel) - 1;
			}
			if ( el == 'metal_mine' || el == 'crystal_mine' || el == 'deuterium_synthesizer'){
				Table             += '<div><div>'+build_lvl+'</div><div>'+build_prod+' '+build_gain+'</div><div>'+build_prod_diff+'</div><div>'+build_need+'</div><div>'+build_need_diff+'</div></div>';
			}else if (el ==   'solar_plant'){
				Table             += '<div><div>'+build_lvl+'</div><div>'+build_prod+' '+build_gain+'</div><div>'+build_prod_diff+'</div></div>';
			}else if (el ==  'fusion_reactor'){
				Table             += '<div><div>'+build_lvl+'</div><div>'+build_prod+' '+build_gain+'</div><div>'+build_prod_diff+'</div><div>'+build_need+'</div><div>'+build_need_diff+'</div></div>';
			}else if (el ==  'sensor_phalanx'){
				Table             += '<div><div>'+build_lvl+'</div><div>'+build_range+'</div></div>';
			}
		}

		return Table;
	},
	ShowStorageTable: function(el){

		var CurrentBuildtLvl = planet[el];
		var officers = officerCheck(user);
		
		BuildLevel       = CurrentBuildtLvl > 0 ? CurrentBuildtLvl : 1;
		
		var BuildStartLvl = CurrentBuildtLvl - 2;
		if (BuildStartLvl < 1){
			BuildStartLvl = 1;
		}			

		Table     = '';
        
		for ( var BuildLevel = BuildStartLvl; BuildLevel < BuildStartLvl + 15; BuildLevel++ ){
			var build_lvl       = CurrentBuildtLvl == BuildLevel ? '<font color="#ff0000">'+BuildLevel+'</font>' : BuildLevel;
			var build_storage     = (parseInt(planet.BASE_STORAGE_SIZE) + 50000 * (roundUp(Math.pow(1.6,BuildLevel)) -1));

			Table             += '<div><div>'+build_lvl+'</div><div>'+build_storage+'</div></div>';
		}

		return Table;
	},
	ShowRapidFireTo: function(id){
		ResultString = '';
		foreach(reslist_battle, function(type, k){
			if (CombatCaps[id]['sd'][type] > 1){
				ResultString += '<div class="row"><div class="cell">'+lang._T('tech_'+type) +'</div><div class="cell">'+CombatCaps[id]['sd'][type]+'</div></div>';	
			}
		});
		if(!Check.isEmpty(ResultString)){
			ResultString = '<div class="table rapid-fire"><div class="caption">Rapidfire Against</div>'+ResultString+'</div>'
		}
		return ResultString;
	},
	ShowRapidFireFrom: function(id){
		ResultString = '';
		foreach(reslist_battle, function(type, k){
			if (CombatCaps[type]['sd'][id] > 1){
				ResultString += '<div class="row"><div class="cell">'+lang._T('tech_'+type) +'</div><div class="cell">'+CombatCaps[type]['sd'][id]+'</div></div>';	
			}
		});
		if(!Check.isEmpty(ResultString)){
			ResultString = '<div class="table rapid-fire"><div class="caption">Rapidfire From</div>'+ResultString+'</div>'
		}
		return ResultString;
	}






};
