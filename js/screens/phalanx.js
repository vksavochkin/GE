var Phalanx = {
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
					<div class="fr btn phalanx-close-page-link">' + lang._T('close') + '</div>\
				</nav>').show();
	},

	closePage: function(){
		$('.page-pr-page').hide();
	},

	generateReport:function(fleet_array){
		var out = Phalanx.generateReportBody(fleet_array);

		if(Check.isEmpty(out)){
			out = '<li class="side-fleet-row"><span style="text-align:center;width:100%;">You don\'t have any fleet activity right now</span><div class="btn shipyard-init-link" style="display:block;clear:both;margin:0px auto;width:100px;height:20px;line-height:20px;padding:4px 10px;text-align:center;margin-bottom:10px;">Send Fleet</div></li>';
		}
		return '<ul style="list-style:none;padding:0px;">'+out+'</ul>';

	},

	/**
	 *  @returns {string}
	 */
	generateReportBody: function (fleet_array) {
		var out = '';
		foreach(fleet_array, function(k,f){

			var ships_total;
			if(!Check.isEmpty(f.fleet_amount)){
				ships_total = 'Fleet of '+exactNumber(f.fleet_amount)+' ships';
			}else{
				ships_total = 'Fleet of unknown size';
			}

			var target_types = {1: 'planet', 2: 'debris', 3: 'moon'};
			var target_type = target_types[parseInt(f.fleet_end_type)] || 'planet';

			var msg;
			if(parseInt(f.fleet_mess) == 0){
				msg = 'Arrival to target '+target_type+':';
			}else{
				msg = 'Arrival back to home:';
			}

			var fleet_out = '';
			if(!Check.isEmpty(f.fleet_types)){
				var i = 1;
				var end = false;
				foreach(f.fleet_types, function(ship,amount){
					if(i == 1){
						fleet_out += '<div>';
						end = false;
					}
					fleet_out += '<div><b>'+lang._T('tech_'+ship)+'</b>: '+exactNumber(amount)+'</div>';

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

				fleet_out = '<p>'+exactNumber(f.fleet_amount)+' Ships in total</p>';
			}else{
				fleet_out = '<p>Fleet is invisible</p>';
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
			if(parseInt(f.fleet_owner) == parseInt(user.id)){
				if(parseInt(f.fleet_mess) == 0 && parseInt(f.fleet_mission) != 10){
					buttons += '<div class="side-fleet-return btn" rel="'+f.fleet_id+'">Recall</div>';
					if(parseInt(f.fleet_mission) == 1 || parseInt(f.fleet_mission) == 2 || parseInt(f.fleet_mission) == 9 || parseInt(f.fleet_mission) == 10){
						buttons += '<div class="galaxy-link-spy btn" rel="'+f.fleet_end_galaxy+';'+f.fleet_end_system+';'+f.fleet_end_planet+';'+f.fleet_end_type+'" style="margin-left:10px;">Spy</div>';
					}
				}
				if(parseInt(f.fleet_mission) == 1 && parseInt(f.fleet_mess) == 0  && parseInt(f.fleet_group) < 1){
					buttons += '<div class="side-fleet-acs btn side-fleet-acs-link" rel="'+f.fleet_id+'" style="margin-left:10px;">ACS Attack</div>';
				}

				if(parseInt(f.fleet_group) > 1 && parseInt(f.fleet_mess) == 0){
					var acs_users='';
					if(!Check.isEmpty(f.acs.users)){
						foreach(f.acs.users, function(k,v){
							acs_users += '<p>'+v+'</p>';
						});
					}
					acs += '<b>Invite to ACS</b><div class="asc-add-block">\
							<input type="text" value="" placeholder="Username" name="asc-username" class="asc-username asc-username-'+f.fleet_id+'"><div rel="'+f.fleet_id+'" class="btn add-acs-link">Add</div>\
							<div class="clear"></div>\
						</div>\
						<div class="acs-users">\
							<b>Already Invited:</b>\
							<div class="asc-invited asc-invited-'+f.fleet_id+'">'+acs_users+'<div>\
						</div>';
				}

			}else{
				if(parseInt(f.fleet_mission) == 1 || parseInt(f.fleet_mission) == 2 || parseInt(f.fleet_mission) == 9 || parseInt(f.fleet_mission) == 10){
					fleet_status = 'enemy';
				}else{
					fleet_status = 'friend';
				}
			}


			//Show arrival rite
			if(parseInt(f.fleet_owner) == parseInt(user.id)){
				if(parseInt(f.fleet_mess) == 0){
					arrival_time += '<b>Arrival to target '+target_type+':</b> '+showFleetTime(f.fleet_start_time, f.fleet_start_time_real)+'<br/>';
				}
				if(f.fleet_mission == 5 && asDate(responseObj.timestamp) < asDate(f.fleet_end_stay)){
					arrival_time += '<b>End of mission:</b> '+showFleetTime(f.fleet_end_stay, f.fleet_end_stay_real)+'<br/>';
				}
				if (!(parseInt(f.fleet_mess) == 0 && f.fleet_mission == 4)) {
					arrival_time += '<b>Returning back to home:</b> ' + showFleetTime(f.fleet_end_time, f.fleet_end_time_real) + '<br/>';
				}
			}else{
				if(parseInt(f.fleet_mess) == 0){
					arrival_time += '<b>Arrival to your '+target_type+':</b> '+showFleetTime(f.fleet_start_time, f.fleet_start_time_real)+'<br/>';
				}
			}

			var from = (!Check.isEmpty(f.fleet_start_username) ? f.fleet_start_username+' ' : '')+f.fleet_start_planet_name+' ['+f.fleet_start_galaxy+':'+f.fleet_start_system+':'+f.fleet_start_planet+']';
			var to = (!Check.isEmpty(f.fleet_end_username) ? f.fleet_end_username+' ' : '')+f.fleet_end_planet_name+' ['+f.fleet_end_galaxy+':'+f.fleet_end_system+':'+f.fleet_end_planet+']';
			if(parseInt(f.fleet_start_type) == 3){
				from += ' (M)';
			}
			if(parseInt(f.fleet_end_type) == 3){
				to += ' (M)';
			}
			// reverse to and from
			if (parseInt(f.fleet_mess) != 0) {
				var tempTo = to;
				to = from;
				from = tempTo;
			}





			var resources = '';
			var metal = parseInt(f.fleet_resource_metal);
			var crystal = parseInt(f.fleet_resource_crystal);
			var deuterium = parseInt(f.fleet_resource_deuterium);
			var deuterium_recall = parseInt(f.fleet_resource_deuterium_recall);
			//var deuterium_recall = 100;
			if(metal > 0 || crystal > 0 || deuterium > 0 || deuterium_recall > 0){

				var resources_cargo = metal > 0 || crystal > 0 || deuterium > 0 ? '\
					<div>\
						<div style="text-align: right">'+(metal > 0 ? exactNumber(metal) : '')+'</div>\
						<div style="text-align: right">'+(crystal > 0 ? exactNumber(crystal) : '')+'</div>\
						<div style="text-align: right">'+(deuterium > 0 || deuterium_recall > 0 ? exactNumber(deuterium) : '')+'</div>\
					</div>' : '';

				var resources_recall = deuterium_recall > 0 ? '\
					<div>\
						<div></div>\
						<div></div>\
						<div style="text-align: right">'+deuterium_recall+'</div>\
					</div>' : '';

				resources = '<h3>Resources</h3>\
					<div class="table fleet-resources-table">\
						<div>\
							<div><b>Metal:</b></div>\
							<div><b>Crystal:</b></div>\
							<div><b>Deuterium:</b></div>\
						</div>\
						'+resources_cargo+'\
						'+resources_recall+'\
					</div>';
			}

			out += '<li class="side-fleet-row '+fleet_status+' phalanx-toggle" rel="'+f.fleet_id+'" data-id="'+f.fleet_id+'">\
						<b class="icon mission'+f.fleet_mission+' phalanx-toggle-link" rel="'+f.fleet_id+'"></b>\
						<span class="phalanx-toggle-link" rel="'+f.fleet_id+'">\
							From '+from+'<br/>\
							To '+to+'\
						</span>\
						<div class="ui-progress-bar ui-container phalanx-toggle-link" rel="'+f.fleet_id+'">\
				            <div class="ui-progress" style="width: '+f.fleet_time_percent+'%;"></div>\
				            <div class="ui-label">\
				                '+msg+' <div class="flying-fleet-timer js_timer" timer="'+f.fleet_time_left+'|1|'+f.fleet_time_total+'"></div>\
				            </div>\
				        </div>\
				        <div class="clear"></div>\
						<ul style="display:none;" class="phalanx-details-toggle phalanx-details-toggle-'+f.fleet_id+'">\
							<li style="position:relative;width:100%;">\
								<div class="side-fleet-info overthrow" id="scrollasc'+f.fleet_id+'" style="overflow:hidden;"><div>\
									<p>\
										<b>Mission:</b> '+mission+'<br/>\
										<b>From:</b> '+from+'<br/>\
										<b>To:</b> '+to+'<br/>\
										'+arrival_time+'\
									</p>\
									<h3>'+ships_total+'</h3>\
									'+fleet_out+'\
									'+resources+'\
									<p style="margin-top:5px">'+buttons+'</p>\
									<div class="clear"></div>\
									<div class="side-acs-block asc-block-'+f.fleet_id+'">'+acs+'</div>\
								</div></div>\
								<div class="clear"></div>\
							</li>\
						</ul>\
				        <div class="clear"></div>\
					</li>';
		});
		return out;
	}
};
