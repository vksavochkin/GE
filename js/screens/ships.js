 var Ships= {
	pageID: '.page-buildings',
	init: function () {
		$('.page-content').hide();
		onPage = 'ships';
		$('.bar-title h1').html('Ships');
		$('.bar-title span').html('');		
		Request.send({});	
		this.content();
		$(this.pageID).show();
		$('.page-buildings .tab-bar-content .sel').removeClass('sel');
		$('.page-buildings .tab-bar-content .tab-ships').addClass('sel');
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(){
		var NotBuilding = true;

		if (parseInt(planet['b_building_id']) != 0){
			var CurrentQueue = planet['b_building_id'];
			var CurrentBuilding = '';
			var Element = '';
			
			if (strpos (CurrentQueue, ';')){
				var QueueArray		= explode (';', CurrentQueue);

				for(var i = 0; i < 5; i++){
					var ListIDArray	= explode (',', QueueArray[i]);
					if(!Check.isEmpty(ListIDArray)){
						var Element		= ListIDArray[0];
	
						if ( Element == 'shipyard' || Element == 'robotics_factory' ||  Element == 'nanite_factory' ){
							break;
						}
					}
				}
			}else{
				var CurrentBuilding = CurrentQueue;
			}

			if ( (CurrentBuilding == 'shipyard' || CurrentBuilding == 'robotics_factory' || CurrentBuilding == 'nanite_factory' ) || (Element == 'shipyard' || Element == 'robotics_factory' || Element == 'nanite_factory' ) ){
				var msg = '<div class="succes error-message-close-link" style="display:block;">'+lang._T('bd_building_shipyard')+'</div>';
				NotBuilding = false;
			}


		}

		TabIndex  = 0;
		PageTable = '';
		
		foreach(reslist_fleet, function(Element, v){	
			var ElementName = lang._T('info_'+Element+'_name');
			var CanBuildOne         = IsElementBuyable(Element, false);
			var BuildOneElementTime = GetBuildingTime(Element);
			var ElementCount        = parseInt(planet[Element]);
			var ElementNbre         = ElementCount == 0 ? '' : ' ('+ lang._T('bd_available') + exactNumber(ElementCount) + ')';

			var price = GetElementPrice(Element, false);
			var time = ShowBuildTime(BuildOneElementTime);
			var link = '';

			if (CanBuildOne == true){
				var InQueue = strpos ( planet['b_shipyard_id'], Element+',');
				var IsBuildp = (parseInt(planet['small_shield_dome']) >= 1) ? true : false;
				var IsBuildg = (parseInt(planet['large_shield_dome']) >= 1) ? true : false;
				var BuildIt = true;
				if (Element == 'small_shield_dome' || Element == 'large_shield_dome'){
					BuildIt = false;

					if ( Element == 'small_shield_dome' && !IsBuildp && InQueue === false ){
						BuildIt = true;
					}	

					if ( Element == 'large_shield_dome' && !IsBuildg && InQueue === false ){
						BuildIt = true;
					}
				}

				if (!BuildIt){
					link = '<div class="upg red">'+lang._T('bd_protection_shield_only_one')+'</div>';
				}else if(NotBuilding){
					TabIndex++;
					link = '<div class="upg"><input pattern="[0-9]*" type="text" name="shipyard_build_'+Element+'" class="shipyard_build_'+Element+'" maxlength="6" placeholder="0"/><div class="btn ships-build ships-build-link" style="width:40px;float:none;margin:0px auto;" rel="'+Element+'">'+lang._T('bd_build_defenses')+'</div></div>';
				}
			}
			if (!IsTechnologieAccessible(Element)){
				if (isset(requeriments[Element])){
					var price = '<br/>Requirements:<br/>';
					foreach(requeriments[Element], function(ResClass, Level){
						if( isset(user[ResClass]) && parseInt(user[ResClass]) >= parseInt(Level))
							price += '<font color="#00ff00">';
						else if ( isset(planet[ResClass] ) && parseInt(planet[ResClass]) >= parseInt(Level))
							price += '<font color="#00ff00">';
						else
							price += '<font color="#ff0000">';
			
						price += lang._T('tech_'+ResClass) +' ('+ lang._T('tt_lvl') + Level +')';
						price += '</font><br>';
					});
				}else{
					var price = '';
				}
				time = '';
				link = '';
			}
			//console.log(Element);
			PageTable += '<li class="building-row">\
								<h3>'+ElementName+''+ElementNbre+'</h3>\
								<div class="table buildings-table">\
									<div class="row">\
										<div class="buildings-table-image show-info-page-link" rel="'+Element+'"><img src="images/resources/'+Element+'.png"></div>\
										<div class="buildings-table-require">\
											'+price+'\
											'+time+'\
										</div>\
										<div class="buildings-table-action">\
											'+link+'\
										</div>\
									</div>\
								</div>\
								<p>'+lang._T('res_descriptions_'+Element)+'</p>\
							</li>';
		});
		
		var BuildQueue = '';
		if (planet['b_shipyard_id'] != ''){
			var BuildQueue = Ships.ElementBuildListBox();
		}
			

		var buildlist    	= PageTable;
		var buildinglist 	= BuildQueue;
		$('.buildings-list').html('<ul><li class="ship-production">'+buildinglist+'</li>'+buildlist+'<li><br/><br/></li><li style="display:none;"><input type="text" value="" name="fix_field" class="fix_field"></li></ul>');
		return false;
	},
	GetMaxConstructibleElements: function(Element, Ressources){
		if (pricelist[Element]['metal'] != 0){
			Buildable        = Math.floor(Ressources['metal'] / pricelist[Element]['metal']);
			MaxElements      = Buildable;
		}

		if (pricelist[Element]['crystal'] != 0)
			Buildable        = Math.floor(Ressources['crystal'] / pricelist[Element]['crystal']);

		if (!isset(MaxElements))
			MaxElements      = Buildable;
		else if(MaxElements > Buildable)
			MaxElements      = Buildable;

		if (pricelist[Element]['deuterium'] != 0)
			Buildable        = Math.floor(Ressources['deuterium'] / pricelist[Element]['deuterium']);

		if (!isset(MaxElements))
			MaxElements      = Buildable;
		else if (MaxElements > Buildable)
			MaxElements      = Buildable;

		if (pricelist[Element]['energy'] != 0)
			Buildable        = Math.floor(Ressources['energy_max'] / pricelist[Element]['energy']);

		if (Buildable < 1)
			MaxElements      = 0;

		return MaxElements;
	},
	GetElementRessources: function(Element, Count){
		var ResType = {};
		ResType['metal']     = (pricelist[Element]['metal']     * Count);
		ResType['crystal']   = (pricelist[Element]['crystal']   * Count);
		ResType['deuterium'] = (pricelist[Element]['deuterium'] * Count);

		return ResType;
	},
	ElementBuildListBox: function(){
		var b_shipyard_id = planet['b_shipyard_id'];
		var ElementQueue = b_shipyard_id.split(';');
		var shipsCount  = '';
		var shipName  = '';
		var shipTime  = '';
		var QueueTime = 0;
		var i = 1;
		var text = '';
		var text2 = ''; 
		
		if(!Check.isEmpty(ElementQueue)){
			foreach(ElementQueue, function(ElementLine, Element){
				if (!Check.isEmpty(Element)){
					tmp = Element;
					Element 		= tmp.split(',');
					ElementTime  	= GetBuildingTime(Element[0] );
					if(i == 1){
						QueueTime   	+= (ElementTime * Element[1]) - parseInt(planet['b_shipyard']);
					}else{
						QueueTime   	+= ElementTime * Element[1];
					}
					
					shipTime 	+= ''+ElementTime+',';
					shipName 	+= '\''+ lang._T('tech_'+Element[0]) +'\',';
					shipsCount 	+= ''+Element[1]+',';
					
					//if(i == 0){
						text += '<div>'+i+'. '+lang._T('tech_'+Element[0])+'('+Element[1]+') <div id="blc" class="js_timer" timer="'+QueueTime+'|1"></div></div>';	
					//}
					i++;
				}
			});
		}
		
		/*var b_shipyard 		= planet['b_shipyard'];
		var pretty_time_b_hangar 	= prettyTime(QueueTime - planet['b_shipyard']);
		var text = '<li>'+lang._T('bd_actual_production')+'<br/>\
				<div id="bx"></div><br/>\<li>\
				<select name="items" id="fleet_select" size="10"></select><br/>\
				Total time: '+pretty_time_b_hangar+'\
				<script>\
				$(document).ready(function(){\
					t("'+b_shipyard+'", "'+shipsCount+'", "'+shipName+'", "'+shipTime+'");\
				});\
				</script>\
			</li>';*/

		return text;
	}
};
