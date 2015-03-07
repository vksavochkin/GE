 var Phalanx= {
	report: function(id){
		Request.send({object:'phalanx', action:'report', report:id});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}
		
		$('.page-pr-page').html('<div class="b-main overthrow" id="ppScrollPage" style="background:#323849;">\
				<ul style="list-style:none;margin:0px;padding:0px;">\
					<li style="padding:5px 0px 50px 0px;">\
						<h4 style="text-align:center;margin:0px 0px 5px;">Phalanx Report</h4>\
							<div class="user-profile">'+Phalanx.generateReport(responseObj.phalanxreport.report)+'</div>\
						</li>\
				</ul></div>\
				<nav class="b-menu" style="background:#323849;">\
					<a class="fr btn" onclick="Phalanx.closePage();">'+lang._T('close')+'</a>\
				</nav>').show();
		makeScroll('ppScrollPage');
	},
	
	closePage: function(){
		$('.page-pr-page').hide();
	},
	
	generateReport:function(fleet_array){
		
		var out = '';
		foreach(fleet_array, function(k,f){
			if(parseInt(f.fleet_mess) == 0){
				var timer = parseInt(f.fleet_start_time) - parseInt(responseObj.timestamp);
				var msg = 'Arrival to target planet:';
			}else{
				var timer = parseInt(f.fleet_end_time) - parseInt(responseObj.timestamp);
				var msg = 'Arrival back to planet:';
			}
			
			var fleet_out = '';
			/*var tmp = f.fleet_array;
			
			if(!Check.isEmpty(tmp)){
				ship_array = tmp.split(';');
				foreach(ship_array, function(ship,v){
					var ships = v.split(',');
					if(!Check.isEmpty(ships[0])){
						fleet_out += '<b>'+lang._T('tech_'+ships[0])+'</b>: '+ships[1]+'<br/>';
					}
				});
			}else{
				fleet_out = 'Fleet is invisible';
			}	*/
			
			if(!Check.isEmpty(f.fleet_types)){
				var i = 1;
				var end = false;
				foreach(f.fleet_types, function(ship,amount){
					if(i == 1){
						fleet_out += '<div>';
						end = false;
					}
					fleet_out += '<div><b>'+lang._T('tech_'+ship)+'</b>: '+amount+'</div>';
					
					if(i==2){
						fleet_out += '</div>';
						end = true;
						i=1;
					}else{
						i=2;
					}
					
				});
				if(end == false){
					fleet_out += '</div>';
				}
					
				fleet_out = '<div class="table fleet-resources-table">'+fleet_out+'</div>';
			}else if(Check.isEmpty(f.fleet_types) && !Check.isEmpty(f.fleet_amount)){
			
				fleet_out = '<p>'+f.fleet_amount+' Ships in total</p>';
			}else{
				fleet_out = '<p>Fleet is invisible</p>';
			}
			
			var ships_total = '';
			if(!Check.isEmpty(f.fleet_amount)){
				ships_total = 'of '+f.fleet_amount+' Ships';
			}
			
			
			
			
			var mission = '';
			if(parseInt(f.fleet_mission) == 1){ mission = 'Attack';}
			else if(parseInt(f.fleet_mission) == 2){ mission = 'ACS Attack';}
			else if(parseInt(f.fleet_mission) == 3){ mission = 'Transport';}
			else if(parseInt(f.fleet_mission) == 4){ mission = 'Deploy';}
			else if(parseInt(f.fleet_mission) == 5){ mission = 'Hold Position';}
			else if(parseInt(f.fleet_mission) == 6){ mission = 'Spy';}
			else if(parseInt(f.fleet_mission) == 7){ mission = 'Colonize';}
			else if(parseInt(f.fleet_mission) == 8){ mission = 'Recycle';}
			else if(parseInt(f.fleet_mission) == 9){ mission = 'Destroy';}
			else if(parseInt(f.fleet_mission) == 10){ mission = 'Missiles Attack';}
			else if(parseInt(f.fleet_mission) == 15){ mission = 'Expedition';}
			
			//buttons
			var buttons = '';
			var acs = '';
			var arrival_time = '';
			
			var fleet_status = 'own';
			
			
			//Show arrival rite
			if(parseInt(f.fleet_mess) == 0){
				arrival_time += '<b>Arrival to Target:</b>: '+f.fleet_start_time_real+'<br/>';
				if(f.fleet_mission != 4 && f.fleet_owner != f.fleet_target_owner){
					arrival_time += '<b>Arrival back to Home:</b>: '+f.fleet_end_time_real+'<br/>';
				}					
			}else{
				arrival_time += '<b>Arrival back to Home:</b>: '+f.fleet_end_time_real+'<br/>';
			}
			
			var from = '';
			var to = '';
			if(parseInt(f.fleet_mess) == 0){
				from = (!Check.isEmpty(f.fleet_start_username) ? f.fleet_start_username+' ' : '')+f.fleet_start_planet_name+' ['+f.fleet_start_galaxy+':'+f.fleet_start_system+':'+f.fleet_start_planet+']';
				to = (!Check.isEmpty(f.fleet_end_username) ? f.fleet_end_username+' ' : '')+f.fleet_end_planet_name+' ['+f.fleet_end_galaxy+':'+f.fleet_end_system+':'+f.fleet_end_planet+']';
			}else{
				to = (!Check.isEmpty(f.fleet_start_username) ? f.fleet_start_username+' ' : '')+f.fleet_start_planet_name+' ['+f.fleet_start_galaxy+':'+f.fleet_start_system+':'+f.fleet_start_planet+']';
				from = (!Check.isEmpty(f.fleet_end_username) ? f.fleet_end_username+' ' : '')+f.fleet_end_planet_name+' ['+f.fleet_end_galaxy+':'+f.fleet_end_system+':'+f.fleet_end_planet+']';
			}
			
			
			
			var resources = '';
			if(parseInt(f.fleet_resource_metal) > 0 || parseInt(f.fleet_resource_crystal) > 0 || parseInt(f.fleet_resource_deuterium) > 0){
				resources = '<h3>Resources</h3>\
									<div class="table fleet-resources-table">\
										<div>\
											<div><b>Metal:</b> '+(parseInt(f.fleet_resource_metal) > 0 ? f.fleet_resource_metal : '')+'</div>\
											<div><b>Crystal:</b> '+(parseInt(f.fleet_resource_crystal) > 0 ? f.fleet_resource_crystal : '')+'</div>\
											<div><b>Deuterium:</b> '+(parseInt(f.fleet_resource_deuterium) > 0 ? f.fleet_resource_deuterium : '')+'</div>\
										</div>\
									</div>';
			}
			
			out += '<li class="side-fleet-row side-phalanx-row '+fleet_status+'">\
						<div class="phalanx-toggle" data-id="'+k+'" onclick="togglePhalanx('+k+');">\
							<b class="icon mission'+f.fleet_mission+'"></b>\
							<span>\
								From '+from+'<br/>\
								To '+to+'\
							</span>\
							<div class="ui-progress-bar ui-container">\
					            <div class="ui-progress" style="width: '+f.fleet_time_percent+'%;"></div>\
					            <div class="ui-label">\
					                '+msg+' <div class="flying-fleet-timer js_timer" timer="'+f.fleet_time_left+'|1|'+f.fleet_time_total+'"></div>\
					            </div>\
					        </div>\
					    </div>\
						<ul class="phalanx-details-toggle phalanx-details-toggle-'+k+'" style="padding:0px;">\
							<li class="">\
								<div class="side-fleet-info overthrow" id="scrollasc'+f.fleet_id+'">\
									<p>\
										<b>Mission</b>: '+mission+'<br/>\
										<b>From</b>: '+from+'<br/>\
										<b>To</b>: '+to+'<br/>\
										'+arrival_time+'\
									</p>\
									<h3>Fleet '+ships_total+'</h3>\
									'+fleet_out+'\
									'+resources+'\
									<div class="clear"></div>\
								</div>\
							</li>\
						</ul>\
					</li>';
		});
		
		if(Check.isEmpty(out)){
			out = '<li class="side-fleet-row"><span style="text-align:center;width:100%;">You don\'t have any fleet activity right now</span><a href="#" class="btn" style="display:block;clear:both;margin:0px auto;width:100px;height:20px;line-height:20px;padding:4px 10px;text-align:center;margin-bottom:10px;" onclick="Shipyard.init();">Send Fleet</a></li>';
		}
		return '<ul style="list-style:none;padding:0px;">'+out+'</ul>';
		
    }
};
