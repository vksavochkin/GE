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

		var queue = data.queue;	
		var sprice = data.sprice;

		if (!Check.isEmpty(queue['lenght']) && queue['lenght'] < parseInt(responseObj.state.user.MAX_BUILDING_QUEUE_SIZE)){
			CanBuildElement = true;
		}else{
			CanBuildElement = false;
		}

		var BuildingPage        = '';
		
		foreach(allowed, function(el, nv){
			if (parseInt(planet.field_current) < (parseInt(planet.field_max) - queue['lenght'])){
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
				really_lvl 			= !Check.isEmpty(sprice[el]) ? parseInt(sprice[el]) : BuildingLevel;
				ElementBuildTime 	= GetBuildingTime ( el , really_lvl );
				var price 			= GetElementPrice ( el , true , really_lvl );
				var time 			= ShowBuildTime ( ElementBuildTime );
				var nivel        	= BuildingLevel == 0 ? '' : ' ('+ lang._T('bd_lvl')  +' '+ BuildingLevel +')';
				var n            	= lang._T('tech_'+el);
				var descriptions 	= lang._T('res_descriptions_'+el);

			


				var click        	= '';
				NextBuildLevel        	= parseInt(planet[el]) + 1;

				if (RoomIsOk && CanBuildElement){
					if (queue['lenght'] == 0){
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
						
				if (el == 'research_lab' && parseInt(responseObj.state.user.b_tech_planet) != 0){
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


		if (queue['lenght'] > 0){
			var BuildListScript  = '';//InsertBuildListScript ('buildings');
			var BuildList        = queue['buildlist'];
		}else{
			var BuildListScript  = "";
			var BuildList        = "";
		}

		var BuildingsList        = BuildingPage;

		$('.buildings-list').html('<ul><li>'+BuildList+'</li>'+BuildingsList+'<li><br/><br/></li><li style="display:none;"><input type="text" value="" name="fix_field" class="fix_field"></li></ul>');	
		return false;
	},
	ShowBuildingQueue: function( sprice ){
		sprice = typeof sprice !== 'undefined' ? sprice : false;
		
		var CurrentQueue  = planet.b_building_id;
		QueueID       = 0;
		if (!Check.isEmpty(CurrentQueue)){
			var QueueArray    = CurrentQueue.split(";");;
			var ActualCount   = QueueArray.length;
		}else{
			QueueArray    = '0';
			ActualCount   = 0;
		}
        
		ListIDRow    = '<div class="table buildings-table-timer">';
        
		if (ActualCount != 0){
			var PlanetID     = planet['id'];
			for (var QueueID = 0; QueueID < ActualCount; QueueID++){
				BuildArray   = QueueArray[QueueID].split(',');
				if(!Check.isEmpty(BuildArray[3])){
					BuildEndTime = Math.floor(BuildArray[3]);
					CurrentTime  = Math.floor(responseObj.timestamp);console.log(BuildEndTime+' | '+CurrentTime);
					if (BuildEndTime >= CurrentTime){
						ListID       = QueueID + 1;
						Element      = BuildArray[0];
						BuildLevel   = parseInt(BuildArray[1]);
						BuildMode    = BuildArray[4];
						BuildTime    = parseInt(BuildEndTime) - parseInt(responseObj.timestamp);
						ElementTitle = lang._T('tech_'+Element);
						if ( sprice !== false && BuildLevel > sprice[el] )
							sprice[Element]	=	BuildLevel;
						
						/*if (ListID > 0){
							ListIDRow += '<div>';
							//Buttons
							if (ListID == 1){ 
								ListIDRow2 = '<div id="blc" class="js_timer" timer="'+BuildTime+'|1"><div>\
										<div class="btn" rel="'+ListID+':cancel">'+lang._T('bd_interrupt')+'</div>\
										<b>'+ BuildEndTime +'</b>';
							}else{
								ListIDRow2 = '<div class="btn" rel="'+ListID+':remove">'+lang._T('bd_cancel')+'</div>';
							}
							
							if (BuildMode == 'build'){
								ListIDRow += '<div>'+ ListID +': '+ ElementTitle +' '+ BuildLevel+ListIDRow2+'</div>';
							}else{
								ListIDRow += '<div>'+ ListID +': '+ ElementTitle +' '+ BuildLevel+' '+ lang._T('bd_dismantle')+ListIDRow2+'</div>';
							}
							ListIDRow += '</div>';
						}*/
						
						ListIDRow += '<div class="row">\
											<div rel="'+Element+'" class="buildings-table-timer-image"><img src="images/resources/'+Element+'.png"></div>\
											<div class="buildings-table-timer-description">\
												'+ ListID +': '+ ElementTitle +' '+ BuildLevel+(BuildMode != 'build' ? ' ('+lang._T('bd_dismantle')+')' : '')+'<br/>\
												\
											</div>\
											<div class="buildings-table-timer-timer">\
												<div id="blc" class="js_timer" timer="'+BuildTime+'|1"></div>\
											</div>\
											<div class="buildings-table-timer-action">\
												'+(ListID != 1 ? '<div rel="'+Element+':'+ListID+':remove" class="btn building-cancel">'+lang._T('Remove')+'</div>' : '' )+'\
											</div>\
										</div>\
									';
						
					}
				}	
			}
		}
		ListIDRow += '</div>';
		var RetValue = {};
		RetValue['lenght']    = ActualCount;
		RetValue['buildlist'] = ListIDRow;
		var data = {};
		data['queue'] = RetValue;	
		data['sprice'] = sprice;

		return data;
	}
};
