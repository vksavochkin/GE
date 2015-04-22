 var Buildings= {
	pageID: '.page-buildings',
	init: function () {
		$('.page-content').hide();
		onPage = 'buildings';	
		$('.bar-title h1').html('Buildings');
		$('.bar-title span').html('');		
		Request.send({});
		this.content();
		$(this.pageID).show();
		$('.page-buildings .tab-bar-content .sel').removeClass('sel');
		$('.page-buildings .tab-bar-content .tab-buildings').addClass('sel');
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(){
		if(parseInt(planet.planet_type) == 3){
			var allowed = reslist_build_moon;
		}else{
			var allowed = reslist_build_planet;
		}
		var data = Buildings.ShowBuildingQueue();

		if (data['count'] < parseInt(responseObj.state.user.MAX_BUILDING_QUEUE_SIZE)){
			CanBuildElement = true;
		}else{
			CanBuildElement = false;
		}

		var BuildingPage        = '';
		
		foreach(allowed, function(el, nv){
			if (parseInt(planet.field_current) < (parseInt(planet.field_max) - data['count'])){
				RoomIsOk = true;
			}else{
				RoomIsOk = false;
			}
            
            if(el == 'terraformer' || el == 'moon_base'){
                RoomIsOk = true;
            }
            
			//if (IsTechnologieAccessible(responseObj.state.user, planet, el)){
				HaveRessources        	= IsElementBuyable (el, true, false);
				
				var i            	= el;
				BuildingLevel       = parseInt(planet[el]);
				really_lvl 			= !Check.isEmpty(data['object'][el]) ? parseInt(data['object'][el]) : BuildingLevel;
				ElementBuildTime 	= GetBuildingTime ( el , really_lvl );
				var price 			= GetElementPrice ( el , true , really_lvl );
				var time 			= ShowBuildTime ( ElementBuildTime );
				var nivel        	= BuildingLevel == 0 ? '' : ' ('+ lang._T('bd_lvl')  +' '+ BuildingLevel +')';
				var n            	= lang._T('tech_'+el);
				var descriptions 	= lang._T('res_descriptions_'+el);

			


				var click        	= '';
				NextBuildLevel        	= parseInt(planet[el]) + 1;

				if (RoomIsOk && CanBuildElement){
					if (data['count'] == 0){
						if (NextBuildLevel == 1){
							if ( HaveRessources == true )
								click = '<div class="btn building-build" rel="'+el+'">'+lang._T('bd_build')+'</div>';
							else
								click = "<b>"+lang._T('bd_build')+"</b>";
						}else{
							if ( HaveRessources == true )
								click = '<div class="btn building-build" rel="'+el+'">'+ lang._T('bd_build_next_level') + NextBuildLevel +'</div>';
							else
								click = "<b>"+ lang._T('bd_build_next_level') + NextBuildLevel +"</b>";
						}
					}else{
						click = '<div class="btn building-build" rel="'+el+'">'+lang._T('bd_add_to_list')+'</div>';
					}
				}else if (RoomIsOk && !CanBuildElement){
					if (NextBuildLevel == 1){
						click = "<b>"+lang._T('bd_build')+"</b>";
					}else{
						click = "<b>"+ lang._T('bd_build_next_level') + NextBuildLevel +"</b>";
					}							
				}else{
					click = "<b>"+lang._T('bd_no_more_fields')+"</b>";
				}
						
				if (el == 'research_lab' && !Check.isEmpty(responseObj.state.user.production.research)){
					click = "<b>"+lang._T('bd_working')+"</b>";
				}

				if ( ( el == 'shipyard' || el == 'robotics_factory' || el == 'nanite_factory' ) && parseInt(planet.b_shipyard) != 0){
					click = "<b>"+lang._T('bd_working')+"</b>";
				}
				//console.log(el+':'+IsTechnologieAccessible(responseObj.state.user, planet, el));
				if (!IsTechnologieAccessible(el)){
					//console.log(requeriments[el]);
					if (isset(requeriments[el])){
						price = '<br/>Requirements:<br/>';
						foreach(requeriments[el], function(ResClass, Level){
							if( isset(responseObj.state.user[ResClass] ) && parseInt(responseObj.state.user[ResClass]) >= parseInt(Level)){
								price += '<font color="#00ff00">';
							}else if ( isset(planet[ResClass] ) && parseInt(planet[ResClass]) >= parseInt(Level)){
								price += '<font color="#00ff00">';
							}else{
								price += '<font color="#ff0000">';
							}
							price += lang._T('tech_'+ResClass) +' ('+ lang._T('tt_lvl') + Level +')';
							price += '</font><br>';
						});
					}else{
						price = '';
					}
					click = '';
				}
					
				BuildingPage += '<li class="building-row">\
								<h3>'+n+''+nivel+'</h3>\
								<div class="table buildings-table">\
									<div class="row">\
										<div class="buildings-table-image show-info-page-link" rel="'+i+'"><img src="images/resources/'+i+'.png"></div>\
										<div class="buildings-table-require">\
											'+price+'\
											'+time+'\
										</div>\
										<div class="buildings-table-action">\
											'+click+'\
										</div>\
									</div>\
								</div>\
								<p>'+descriptions+'</p>\
							</li>';
			//}
		});

		$('.buildings-list').html('<ul><li>'+data['html']+'</li>'+BuildingPage+'<li><br/><br/></li><li style="display:none;"><input type="text" value="" name="fix_field" class="fix_field"></li></ul>');	
		return false;
	},
	ShowBuildingQueue: function(){
    			
		var ActualCount   = 0;
		var BuildingsRows = {};
		
		var ListIDRow    = '';
		var html    = '';
		
		if(!Check.isEmpty(responseObj.state.user.production.building)){
            foreach (responseObj.state.user.production.building, function(k, b){
				if(parseInt(planet.id) == parseInt(b.planet_id)){
				    var endTime = parseInt(b.end_time);
				    var currentTime = parseInt(responseObj.timestamp);
				    if (parseInt(b.end_time) > parseInt(responseObj.timestamp)){
						var buildingLevel = parseInt(planet[b.production]) + 1;
						
						//build array of pending buildings with levels
						if(!Check.isEmpty(BuildingsRows[ b.production ])){
            				if(b.action == 'build'){
                				BuildingsRows[ b.production ]++;
                				buildingLevel = BuildingsRows[ b.production ];
            				}else{
                				BuildingsRows[ b.production ]--;
                				buildingLevel = BuildingsRows[ b.production ];
            				}
        				}else{
            				if(b.action == 'build'){
                				buildingLevel = parseInt(planet[ b.production ]) + 1;
                				BuildingsRows[ b.production ] = buildingLevel;
            				}else{
                				buildingLevel = parseInt(planet[ b.production ]) - 1;
                				BuildingsRows[ b.production ] = buildingLevel;
            				}
        				}
						
						//Building construction html list
						ActualCount++;					
						
						
						BuildTime    = endTime - currentTime;
						ListIDRow += '<div class="row">\
											<div rel="'+b.production+'" class="buildings-table-timer-image"><img src="images/resources/'+b.production+'.png"></div>\
											<div class="buildings-table-timer-description">\
												'+ ActualCount +': '+ lang._T('tech_'+b.production) +' '+ buildingLevel+(b.action != 'build' ? ' ('+lang._T('bd_dismantle')+')' : '')+'<br/>\
												\
											</div>\
											<div class="buildings-table-timer-timer">\
												<div id="blc" class="js_timer" timer="'+BuildTime+'|1"></div>\
											</div>\
											<div class="buildings-table-timer-action">\
												'+(ActualCount != 1 ? '<div rel="'+b.production+':'+ActualCount+':remove" class="btn building-cancel">'+lang._T('Remove')+'</div>' : '' )+'\
											</div>\
										</div>\
									';
						
					}
				}				
			});
        }
		
		if(!Check.isEmpty(ListIDRow)){
    		html += '<div class="table buildings-table-timer">'+ListIDRow+'</div>';
		}
		
		
		
		var data = {};
		data['html'] = html;	
		data['count'] = ActualCount;	
		data['object'] = BuildingsRows;

		return data;
	}
};
