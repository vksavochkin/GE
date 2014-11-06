 var Resources= {
	pageID: '.page-resources',
	init: function () {
		$('.page-content').hide();
		onPage = 'resources';	
		$('.bar-title h1').html('Resources');
		$('.bar-title span').html('');	
		Request.send({});	
		this.content();
		$(this.pageID).show();
		makeScroll('page_resources_scroll');
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(){
		/*if(planet.planet_type == 3){
			var allowed = reslist_build_moon;
		}else{
			var allowed = reslist_build_planet;
		}
		var data = Buildings.ShowBuildingQueue();

		var queue = data.queue;	
		var sprice = data.sprice;

		if (!Check.isEmpty(queue['lenght']) && queue['lenght'] < (responseObj.state.user.MAX_BUILDING_QUEUE_SIZE)){
			CanBuildElement = true;
		}else{
			CanBuildElement = false;
		}*/
		var planet_tmp = planet;
		
		var officers = officerCheck(user);
		
		if (planet.planet_type == 3){
			var metal_basic_income = 0;
			var crystal_basic_income = 0;
			var deuterium_basic_income = 0;
			var enery_basic_income = 0;
		}else{
			var metal_basic_income = parseInt(planet.METAL_BASIC_INCOME);
			var crystal_basic_income = parseInt(planet.CRYSTAL_BASIC_INCOME);
			var deuterium_basic_income = parseInt(planet.DEUTERIUM_BASIC_INCOME);
			var enery_basic_income = parseInt(planet.ENERGY_BASIC_INCOME);
		}
	
		var production_level = 100;
		if(planet.energy_max == 0 && planet.energy_used > 0){
			var post_percent = 0;
		}else if (planet.energy_max >  0 && (planet.energy_used + planet.energy_max) < 0 ){
			var post_percent = Math.floor((planet.energy_max) / (planet.energy_used * -1) * 100);
		}else{
			var post_percent = 100;
		}
	
		if (post_percent > 100){
			post_percent = 100;
		}
		
		planet_tmp['metal_max']		=	(parseInt(planet.BASE_STORAGE_SIZE) + 50000 * (roundUp(Math.pow(1.6,planet.metal_storage)) -1)) * (1 + officers['OFF_STORER']);
		planet_tmp['crystal_max']	=	(parseInt(planet.BASE_STORAGE_SIZE) + 50000 * (roundUp(Math.pow(1.6,planet.crystal_storage)) -1)) * (1 + officers['OFF_STORER']);
		planet_tmp['deuterium_max']	=	(parseInt(planet.BASE_STORAGE_SIZE) + 50000 * (roundUp(Math.pow(1.6,planet.deuterium_storage)) -1)) * (1 + officers['OFF_STORER']);
	
		var resource_row = '';
		planet_tmp['metal_perhour']      = 0;
		planet_tmp['crystal_perhour']    = 0;
		planet_tmp['deuterium_perhour']  = 0;
		planet_tmp['energy_max']         = 0;
		planet_tmp['energy_used']        = 0;
		var BuildTemp = planet_tmp[ 'temp_max' ]; 
		
		foreach(reslist_production, function(k,v){
			if (planet[k] > 0 && isset(ProdGrid[k])){
				var BuildLevelFactor                    = planet[ k+"_percent" ];
				var BuildLevel                          = planet[ k ];
				var EnergyTech							 = user.energy_tech;
				var prod = production(k, BuildLevel);
				var metal     	= prod.metal;
				var crystal   	= prod.crystal;
				var deuterium 	= prod.deuterium;
				var energy 		= prod.energy;
				 
				if (energy > 0){
					planet['energy_max']    += energy;
				}else{
					planet['energy_used']   += energy;
				}
	
				planet['metal_perhour']     += metal;
				planet['crystal_perhour']   += crystal;
				planet['deuterium_perhour'] += deuterium;
				metal                               = Math.floor(metal     * 0.01 * post_percent);
				crystal                             = Math.floor(crystal   * 0.01 * post_percent);
				deuterium                           = Math.floor(deuterium * 0.01 * post_percent);
				energy                              = Math.floor(energy    * 0.01 * post_percent);
				var CurrRow                         = {};
				CurrRow['name']                     = lang._T('info_'+k+'_name');
				CurrRow['percent']                  = planet[k+"_percent"];
				CurrRow['option']					= '';
	
				for (var Option = 10; Option >= 0; Option--){
					var OptValue = Option;
	
					if (Option == CurrRow['percent']){
						OptSelected    = ' selected="selected"';
					}else{
						OptSelected    = '';
					}
					CurrRow['option'] += '<option value="'+OptValue+'"'+OptSelected+'>'+(OptValue*10)+'%</option>';
				}
	
				CurrRow['level']                    = (k == 'solar_satellite') ? lang._T('rs_amount') : lang._T('rs_lvl');
				CurrRow['level_type']               = planet[k];
				CurrRow['metal_type']               = colorNumber( ( metal     ));
				CurrRow['crystal_type']             = colorNumber( ( crystal   ));
				CurrRow['deuterium_type']           = colorNumber( ( deuterium ));
				CurrRow['energy_type']              = colorNumber( ( energy    ));
				resource_row += '<tr>\
					<th height="32">'+CurrRow['name']+' ('+CurrRow['level']+' '+CurrRow['level_type']+')</th>\
					<td>'+CurrRow['metal_type']+'</td>\
					<td>'+CurrRow['crystal_type']+'</td>\
					<td>'+CurrRow['deuterium_type']+'</td>\
					<td>'+CurrRow['energy_type']+'</td>\
					<td>\
						<select name="resources_'+k+'" class="resources_'+k+'">\
						'+CurrRow['option']+'\
						</select>\
					</td>\
				</tr>';// onchange="Resources.doChange();"
			}else{
    			resource_row += '<tr style="display:none;">\
					<th></th>\
					<td></td>\
					<td></td>\
					<td></td>\
					<td></td>\
					<td>\
						<select name="resources_'+k+'" class="resources_'+k+'">\
						<option value="10" selected="selected">100%;</option>\
						</select>\
					</td>\
				</tr>';
			}
		});
		
		var text = lang._T('rs_production_on_planet');
		
		Production_of_resources_in_the_planet = text.replace('%s', planet_tmp['name']);
		
		if (planet_tmp['energy_max'] == 0 && planet_tmp['energy_used'] > 0){
			var production_level = 0;
		}else if (planet_tmp['energy_max']  > 0 && Math.abs(planet_tmp['energy_used']) > planet_tmp['energy_max']){
			var production_level = Math.floor((planet_tmp['energy_max']) / (planet_tmp['energy_used']*-1) * 100);
		}else if (planet_tmp['energy_max'] == 0 && Math.abs(planet_tmp['energy_used']) > planet_tmp['energy_max']){
			var production_level = 0;
		}else{
			var production_level = 100;
		}
	
		if (production_level > 100){
			var production_level = 100;
		}
	
		var metal_basic_income     = parseInt(planet.METAL_BASIC_INCOME);
		var crystal_basic_income   = parseInt(planet.CRYSTAL_BASIC_INCOME);
		var deuterium_basic_income = parseInt(planet.DEUTERIUM_BASIC_INCOME);
		var energy_basic_income    = parseInt(planet.ENERGY_BASIC_INCOME);
	
		if (planet_tmp['metal_max'] < planet_tmp['metal']){
			var metal_max         = '<font color="#ff0000">';
		}else{
			var metal_max         = '<font color="#00ff00">';
		}
		metal_max            += prettyNumber(planet_tmp['metal_max'] / 1000) +'k</font>';
	
		if(planet['crystal_max'] < planet_tmp['crystal']){
			var crystal_max       = '<font color="#ff0000">';
		}else{
			var crystal_max       = '<font color="#00ff00">';
		}
		crystal_max          += prettyNumber(planet_tmp['crystal_max'] / 1000) +'k</font>';
	
		if (planet_tmp['deuterium_max'] < planet_tmp['deuterium']){
			var deuterium_max     = '<font color="#ff0000">';
		}else{
			var deuterium_max     = '<font color="#00ff00">';
		}
		deuterium_max        += prettyNumber(planet_tmp['deuterium_max'] / 1000) +'k</font>';
	
		metal_total           = colorNumber( ( Math.floor( ( (planet_tmp['metal_perhour']     * 0.01 * production_level ) + metal_basic_income))));
		crystal_total         = colorNumber( ( Math.floor( ( (planet_tmp['crystal_perhour']   * 0.01 * production_level ) + crystal_basic_income))));
		deuterium_total       = colorNumber( ( Math.floor( ( (planet_tmp['deuterium_perhour'] * 0.01 * production_level ) + deuterium_basic_income))));
		energy_total          = colorNumber( ( Math.floor( ( planet_tmp['energy_max'] + energy_basic_income    ) + planet_tmp['energy_used'] ) ) );

		daily_metal           = Math.floor(planet_tmp['metal_perhour']     * 24      * 0.01 * production_level  + metal_basic_income      * 24      );
		weekly_metal          = Math.floor(planet_tmp['metal_perhour']     * 24 * 7  * 0.01 * production_level  + metal_basic_income      * 24 * 7  );
	
		daily_crystal         = Math.floor(planet_tmp['crystal_perhour']   * 24      * 0.01 * production_level  + crystal_basic_income    * 24      );
		weekly_crystal        = Math.floor(planet_tmp['crystal_perhour']   * 24 * 7  * 0.01 * production_level  + crystal_basic_income    * 24 * 7  );//* user['resource_multiplier']
	
		daily_deuterium       = Math.floor(planet_tmp['deuterium_perhour'] * 24      * 0.01 * production_level  + deuterium_basic_income  * 24      );
		weekly_deuterium      = Math.floor(planet_tmp['deuterium_perhour'] * 24 * 7  * 0.01 * production_level  + deuterium_basic_income  * 24 * 7  );
	
		daily_metal           = colorNumber((daily_metal));
		weekly_metal          = colorNumber((weekly_metal));
	
		daily_crystal         = colorNumber((daily_crystal));
		weekly_crystal        = colorNumber((weekly_crystal));
	
		daily_deuterium       = colorNumber((daily_deuterium));
		weekly_deuterium      = colorNumber((weekly_deuterium));
	
        
        if(!Check.isEmpty(resource_row)){
            resource_row += '<tr>\
						        <th></th>\
						        <td></td>\
						        <td></td>\
						        <td></td>\
						        <td></td>\
						        <td><a href="#" class="btn" onclick="Resources.doChange();">Save</a></td>\
						    </tr>';
        }
        
		
		$('.resources-list').html('<ul><li><form class="resources">\
					<table>\
						    <tr class="title">\
						        <th>&nbsp;</th>\
						        <th>'+lang._T('Metal')+'</th>\
						        <th>'+lang._T('Crystal')+'</th>\
						        <th>'+lang._T('Deuterium')+'</th>\
						        <th>'+lang._T('Energy')+'</th>\
						        <th></th>\
						    </tr><tr>\
						        <th height="22">'+lang._T('rs_basic_income')+'</th>\
						        <td>'+metal_basic_income+'</td>\
						        <td>'+crystal_basic_income+'</td>\
						        <td>'+deuterium_basic_income+'</td>\
						        <td>'+energy_basic_income+'</td>\
						        <td></td>\
						    </tr>\
						    '+resource_row+'\
						    <tr>\
						        <th height="22">'+lang._T('rs_storage_capacity')+'</th>\
						        <td>'+metal_max+'</td>\
						        <td>'+crystal_max+'</td>\
						        <td>'+deuterium_max+'</td>\
						        <td>-</td>\
						        <td><input name="action" value="calculate" type="hidden"/></td>\
						    </tr><tr>\
						        <th height="22">'+lang._T('Per Hour:')+'</th>\
						        <td>'+metal_total+'</td>\
						        <td>'+crystal_total+'</td>\
						        <td>'+deuterium_total+'</td>\
						        <td>'+energy_total+'</td>\
						        <td></td>\
						    </tr>\
						    <tr>\
						        <th>'+lang._T('Per Day:')+'</th>\
						        <td>'+daily_metal+'</td>\
						        <td>'+daily_crystal+'</td>\
						        <td>'+daily_deuterium+'</td>\
						        <td>'+energy_total+'</td>\
						        <td></td>\
						    </tr>\
						    <tr>\
						        <th>'+lang._T('Per Week:')+'</th>\
						        <td>'+weekly_metal+'</td>\
						        <td>'+weekly_crystal+'</td>\
						        <td>'+weekly_deuterium+'</td>\
						        <td>'+energy_total+'</td>\
						        <td></td>\
						    </tr>\
				    </table>\
			</form></li></ul>');			
		return false;
	},
	doChange: function(){
    	var metal_mine = $('.resources_metal_mine option:selected').val();
	    var crystal_mine = $('.resources_crystal_mine option:selected').val();
	    var deuterium_synthesizer = $('.resources_deuterium_synthesizer option:selected').val();
	    var solar_plant = $('.resources_solar_plant option:selected').val();
	    var fusion_reactor = $('.resources_fusion_reactor option:selected').val();
	    var solar_satellite = $('.resources_solar_satellite option:selected').val();
	    
	    metal_mine = typeof metal_mine !== 'undefined' ? metal_mine : 10;
	    crystal_mine = typeof crystal_mine !== 'undefined' ? crystal_mine : 10;
	    deuterium_synthesizer = typeof deuterium_synthesizer !== 'undefined' ? deuterium_synthesizer : 10;
	    solar_plant = typeof solar_plant !== 'undefined' ? solar_plant : 10;
	    fusion_reactor = typeof fusion_reactor !== 'undefined' ? fusion_reactor : 10;
	    solar_satellite = typeof solar_satellite !== 'undefined' ? solar_satellite : 10;
	    
	    //alert('Sending Request');
	    Request.send({object:'planet', action:'change_production', metal_mine:metal_mine,crystal_mine:crystal_mine,deuterium_synthesizer:deuterium_synthesizer,solar_plant:solar_plant,fusion_reactor:fusion_reactor,solar_satellite:solar_satellite});
		
		//alert('Request Sent');
		if(responseObj.status != 100){
		    //alert('Error');
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{	
		    alertify.alert(lang._T('Resources Production successfully saved.'));		
			Resources.init();
		}
	}
};
