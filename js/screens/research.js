 var Research= {
	pageID: '.page-buildings',
	init: function () {
		$('.page-content').hide();
		onPage = 'research';	
		$('.bar-title h1').html('Research');
		$('.bar-title span').html('');
		Request.send({});		
		this.content();
		$(this.pageID).show();
		$('.page-buildings .tab-bar-content .sel').removeClass('sel');
		$('.page-buildings .tab-bar-content .tab-research').addClass('sel');
		makeScroll('page_buildings_scroll');
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(){
		var NoResearchMessage 	= "";
		var bContinue         	= true;
		
	
		var intergal_lab_limit 		= parseInt(user['intergalactic_research_tech']) +1;
		lablevel 				= 0;		
		var levels = [];
		var total_research = 0;
		foreach(responseObj.state.planets, function(id, p){
			levels.push(p.research_lab);

			if(parseInt(user.b_tech_planet) == parseInt(p.id)){
				var ThePlanet = p;
			}			
		});
		levels.sort(function(a, b){return b-a});
		
		foreach(levels, function(id, v){
			if(intergal_lab_limit > 0){
				lablevel += parseInt(v);
				intergal_lab_limit = intergal_lab_limit - 1;
			}
		});
		/*if (planet['research_lab'] == 0){
			$('.buildings-list').html(lang._T('bd_lab_required'));
			return false;
		}*/

		if (Research.CheckLabSettingsInQueue() == false)
		{
			NoResearchMessage = lang._T('bd_building_lab');
			bContinue         = false;
		}
		
		var InResearch = false;
		if (parseInt(user['b_tech_planet']) != 0){
			InResearch = true;
		}
		
		
		var officers = officerCheck(user);
		
		var TechnoList = '';
		foreach(reslist_tech, function(el, v){
			building_level          = parseInt(user[el]);
			var next_level = building_level+1;
			var tech_name   = lang._T('info_'+el+'_name');
			var tech_descr  = lang._T('res_descriptions_'+el);
			
			if(el == 'espionage_tech'){
				var tech_level  = building_level == 0  ? '' : '('+ lang._T('bd_lvl') + ' '+building_level +')' ;
				tech_level  += '<strong><font color="lime"> +' + (1 * officers['OFF_SPY']) + ' ' + lang._T('by Spy')	+ '</font></strong>';
			}else if(el == 'computer_tech'){
				var tech_level  = (building_level == 0) ? '' : '('+ lang._T('bd_lvl') + ' '+building_level +')';
				tech_level  += '<strong><font color="lime"> +' + (1 * officers['OFF_ADMIRAL_SLOT']) + ' '+lang._T('by Admiral')+'</font></strong>';
			}else{
				var tech_level  = (building_level == 0) ? '' : '('+ lang._T('bd_lvl') + ' '+building_level+')';
			}

			var tech_price  = GetElementPrice(el);
			SearchTime              = GetBuildingTime(el,next_level,lablevel);
			var time = ShowBuildTime(SearchTime);
			var tech_restp  = "Rest: "+Research.GetRestPrice(el, true);
			CanBeDone               = IsElementBuyable(el);

			if (InResearch == false){
				var LevelToDo = 1 + parseInt(user[el]);
				if (CanBeDone){
					if (Research.CheckLabSettingsInQueue() == false){
						if (LevelToDo == 1){
							TechnoLink = '<b>'+lang._T('bd_research')+'</b>';
						}else{
							TechnoLink  = '<b>'+lang._T('bd_research')+' '+lang._T('bd_lvl')+' '+LevelToDo+'</b>';
						}
					}else{
						if (LevelToDo == 1){
							TechnoLink = '<a class="btn research-build" rel="'+el+'" onclick="doResearch(\''+el+'\');">'+lang._T('bd_research')+'</a>';
						}else{
							TechnoLink = '<a class="btn research-build" rel="'+el+'" onclick="doResearch(\''+el+'\');">'+lang._T('bd_research')+' '+lang._T('bd_lvl')+' '+LevelToDo+'</a>';
						}
					}
				}else{
					if (LevelToDo == 1){
						TechnoLink  = '<b>'+lang._T('bd_research')+'</b>';
					}else{
						TechnoLink  = '<b>'+lang._T('bd_research')+'<br>'+lang._T('bd_lvl')+' '+LevelToDo+'</b>';
					}
				}
			}else{
				TechnoLink  = '<b>'+lang._T('bd_research')+'</b>';
			}
					
			if (!IsTechnologieAccessible(el)){
				if (isset(requeriments[el])){
					var tech_price = '<br/>Requirements:<br/>';
					foreach(requeriments[el], function(ResClass, Level){
						if( isset(user[ResClass] ) && parseInt(user[ResClass]) >= parseInt(Level)){
							tech_price += '<font color="#00ff00">';
						}else if ( isset(planet[ResClass] ) && parseInt(planet[ResClass]) >= parseInt(Level)){
							tech_price += '<font color="#00ff00">';
						}else{
							tech_price += '<font color="#ff0000">';
						}							
			
						tech_price += lang._T('tech_'+ResClass) +" ("+ lang._T('tt_lvl') + Level +")";
						tech_price += "</font><br/>";
					});	
				}else{
					var tech_price = '';
				}
				TechnoLink = '';
			}		
										
			var tech_link  = TechnoLink;
			TechnoList            += '<li class="building-row">\
								<h3>'+tech_name+''+tech_level+'</h3>\
								<div class="table buildings-table">\
									<div class="row">\
										<div class="buildings-table-image"  onclick="Info.init(\''+el+'\');"><img src="images/resources/'+el+'.png"></div>\
										<div class="buildings-table-require">\
											'+tech_price+'\
											'+time+'\
										</div>\
										<div class="buildings-table-action">\
											'+tech_link+'\
										</div>\
									</div>\
								</div>\
								<p>'+tech_descr+'</p>\
							</li>';
		});

		var que = '';
		BuildList = '';
		if (InResearch && !Check.isEmpty(planet.b_tech_id)){
			BuildTime  = parseInt(planet.b_tech) - parseInt(responseObj.timestamp);
			ElementTitle = lang._T('tech_'+planet.b_tech_id);
			BuildLevel = parseInt(user[planet.b_tech_id]) +1;								
			BuildList = '<div class="table buildings-table-timer"><div class="row">\
										<div rel="'+planet.b_tech_id+'" class="buildings-table-timer-image"><img src="images/resources/'+planet.b_tech_id+'.png"></div>\
										<div class="buildings-table-timer-description">\
											'+ ElementTitle +' '+ BuildLevel+'<br/>\
											\
										</div>\
										<div class="buildings-table-timer-timer">\
											<div id="blc" class="js_timer" timer="'+BuildTime+'|1"></div>\
										</div>\
										<!--<div class="buildings-table-timer-action">\
											<a rel="'+planet.b_tech_id+'" class="btn research-cancel" onclick="cancelResearch(\''+planet.b_tech_id+'\');">'+lang._T('bd_cancel')+'</a>\
										</div>-->\
									</div>\
								</div>';
			
		}
		

		var noresearch  = NoResearchMessage;
		var technolist  = TechnoList;
		var Page                    = technolist+que;

		
		$('.buildings-list').html('<ul><li>'+BuildList+'</li>'+Page+'<li><br/><br/></li></ul>');	
		return false;
	},
	CheckLabSettingsInQueue: function(){
		if (planet['b_building_id'] != 0){
			var CurrentQueue = planet['b_building_id'];
			var CurrentBuilding = '';
			var Element = '';
			
			if (strpos (CurrentQueue, ';')){
				QueueArray		= explode (';', CurrentQueue);

				for(var i = 0; i < 5; i++){
					ListIDArray	= explode (',', QueueArray[i]);
					if(!Check.isEmpty(ListIDArray)){
						Element		= ListIDArray[0];

						if(Element == 'research_lab')
							break;
					}
					
				}
			}else{
				CurrentBuilding = CurrentQueue;
			}

			if (CurrentBuilding == 'research_lab' || Element == 'research_lab'){
				var ret = false;
			}else{
				var ret = true;
			}
		}else{
			var ret = true;
		}

		return ret;
	},
	GetRestPrice: function(el, userfactor){
		userfactor = typeof userfactor !== 'undefined' ? userfactor : true;
		if (userfactor){
			var level = (planet[el]) ? parseInt(planet[el]) : parseInt(user[el]);
		}

		var array = {
		'metal'      : lang._T('Metal'),
		'crystal'    : lang._T('Crystal'),
		'deuterium'  : lang._T('Deuterium'),
		'energy_max' : lang._T('Energy')
		};

		var text  = '<br><font color="#7f7f7f">'+lang._T('bd_remaining')+': ';
		foreach(array, function(ResType, ResTitle){
			if (pricelist[el][ResType] != 0){
				text += ResTitle+': ';
				if (userfactor){
					cost = Math.floor(pricelist[el][ResType] * Math.pow(pricelist[el]['factor'], level));
				}else{
					cost = Math.floor(pricelist[el][ResType]);
				}
				if (cost > parseInt(planet[ResType])){
					text += '<b style="color: rgb(127, 95, 96);">'+ prettyNumber(parseInt(planet[ResType]) - cost) +'</b> ';
				}else{
					text += '<b style="color: rgb(95, 127, 108);">'+ prettyNumber(parseInt(planet[ResType]) - cost) +'</b> ';
				}
			}
		});
		text += '</font>';

		return text;
	}
};
