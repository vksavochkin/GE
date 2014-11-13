 var Galaxy= {
	pageID: '.page-galaxy',
	data:{},
	init: function (g,s) {	
		$('.page-content').hide();
		onPage = 'galaxy';	
		$('.bar-title h1').html('Galaxy');
		$('.bar-title span').html('');	
		this.content(g,s);
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(g,s){
		g = typeof g !== 'undefined' ? g : planet.g;
		s = typeof s !== 'undefined' ? s : planet.s;
		
		if(parseInt(s) > 499){s = 499;}
		
		$('.galaxy-bar-galaxy').val(g);
		$('.galaxy-bar-system').val(s);
		
		Request.send({object:'galaxy', action:'show',g:g, s:s});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{
			var planetsList = responseObj.galaxyshow.list;
			Galaxy.data = responseObj.galaxyshow.list;
			var list = '';
			for(var i=1; i<=15; i++){
				if(!Check.isEmpty(planetsList[i])){
					var dColor = debriesColor(parseInt(planetsList[i]['debries_metal']), parseInt(planetsList[i]['debries_crystal']));
					var status = dColor ? '<div class="status" style="color: '+dColor+'">D</div>' : '';
					var status2 = (!Check.isEmpty(planetsList[i]['last_activity_update']) ? '<div class="status2">'+planetsList[i]['last_activity_update']+'</div>' : '');
					var moon = (!Check.isEmpty(planetsList[i]['moon']) ? '<div class="moon"></div>' : '');
					
					var vacation = '';
					if(parseInt(planetsList[i]['vacation'])){
						vacation = '(Vacation)';
					}
					
					list += '<div class="row full" rel="'+i+'" onclick="Galaxy.showPage('+i+');">\
										<div class="galaxy-table-id">'+i+'</div>\
										<div class="galaxy-table-planet">\
											<div class="planet" style="background-image:url(images/planets/'+planetsList[i]['image']+'.png);">\
												'+status+'\
												'+status2+'\
												'+moon+'\
											</div>\
										</div>\
										<div class="galaxy-table-info"><p>'+planetsList[i]['username']+' (Ranked '+planetsList[i]['rank']+') '+planetsList[i]['status']+' '+vacation+'<br/>'+planetsList[i]['name']+'</p></div>\
									</div>';
				}else{
					var colonize = (parseInt(planet.colony_ship) > 0 ? '<a class="galaxy-colonize" rel="'+g+';'+s+';'+i+'" onclick="galaxyMissionColonize(\''+g+';'+s+';'+i+'\');"></a>' : '');
					var move = (parseInt(planet.moved) == 0 ? '<a class="galaxy-move" rel="'+g+';'+s+';'+i+'" onclick="galaxyPlanetMove(\''+g+';'+s+';'+i+'\');"></a>' : '');

					list += '<div class="row">\
								<div class="galaxy-table-id">'+i+'</div>\
								<div class="galaxy-table-planet"><div class="planet empty"></div></div>\
								<div class="galaxy-table-info">'+colonize+' '+move+'</div>\
							</div>';
				}
			}	
			$('.galaxy-list').html('<ul><li><div class="table galaxy-table">'+list+'</div></li></ul>');
		}
		
		$(this.pageID).show();
		makeScroll('page_galaxy_scroll');		
		return false;
	},
	showPage: function(rel){
		var user_row = '';
				var ally_row = '';
				var planet_row = '';
				var moon_row = '';
				var planet_links = '';
				var moon_links = '';
				
				
				if(!Check.isEmpty(Galaxy.data[rel])){
					var data = Galaxy.data[rel];
				}else{
					$('.modal-content').html('Planet information empty');
					return false;
				}
				user_row = '<div class="user-row">\
						<div class="userpic"><img src="images/avatars/'+data.avatar+'.gif"></div>\
						<div class="userinfo">\
							<h1>'+data.username+' ['+data.rank+'] '+data.status+'</h1>\
							<a class="btn send-message-btn" onclick="Mail.new_message(\''+data.username+'\',\'\');" rel="'+data.user_id+'">Send Message</a>\
							<a class="btn user-statistic-btn" rel="'+data.user_id+'" onclick="Scoreboard.init('+data.user_id+');">Statistics</a>\
							</div>\
						<div class="clear"></div>\
					</div>'; 
				
				if(parseInt(data.ally_id) > 0){
					ally_row = '<div class="alliance-row">\
						<div class="alliancepic"><img src="images/avatars/a/0.jpg"></div>\
						<div class="allyinfo">\
							<h1>'+data.ally_name+' ('+data.ally_tag+')</h1>\
							<!--<h2>38 members</h2>-->\
							<a class="btn ally-page-btn ally-link" rel="'+data.ally_tag+'" onclick="Ally.showPage(\''+data.ally_tag+'\');">Alliance Page</a>\
							<a class="btn ally-statistic-btn" rel="'+data.ally_tag+'">Statistic</a>\
						</div>\
						<div class="clear"></div>\
					</div>';
				}
				
				var debries_row = '';

				// trying to fix positions of as much buttons as possible
				//console.log(data.user_id+':'+user.id);
				if(parseInt(data.user_id) != parseInt(user.id)){
					planet_links += parseInt(planet.espionage_probe) > 0 ? '<a class="btn galaxy-link-spy" rel="'+data.g+';'+data.s+';'+data.p+';1"  onclick="galaxyMissionSpy(\''+data.g+';'+data.s+';'+data.p+';1\');"><img src="images/icon-spy.png"></a>' : '';
					planet_links += '<a class="btn galaxy-link-attack" onclick="Shipyard.init('+data.g+','+data.s+','+data.p+',1,1);"><img src="images/icon-attack.png"></a>';
					planet_links += '<a class="btn galaxy-link-stay" onclick="Shipyard.init('+data.g+','+data.s+','+data.p+',1,4);"><img src="images/icon-stay.png"></a>';
				}
				planet_links += '<a class="btn galaxy-link-transportation" onclick="Shipyard.init('+data.g+','+data.s+','+data.p+',1,3);"><img src="images/icon-transportation.png"></a>';

				if(parseInt(data.user_id) != parseInt(user.id)){
					if(missiles_range(data.user_id, data.g, data.s)){
						planet_links += '<a class="btn galaxy-link-missles" rel="'+data.g+';'+data.s+';'+data.p+';1" onclick="Galaxy.showMissles('+data.g+','+data.s+','+data.p+',1);"><img src="images/icon-missles.png"></a>';
					}
				}

				if(parseInt(data.debries_metal)>0 || parseInt(data.debries_crystal)>0){
					debries_row = '<div class="debries">\
							<h2>Debris: '+prettyNumber(data.debries_metal)+' Metal, '+prettyNumber(data.debries_crystal)+' Crystal</h2>\
						</div>';

					planet_links += '<a class="btn galaxy-link-recycle" rel="'+data.g+';'+data.s+';'+data.p+'" onclick="galaxyMissionRecycle(\''+data.g+';'+data.s+';'+data.p+'\');"><img src="images/icon-recycling.png"></a>';
				}

				var phalanx = '';
				if(!Check.isEmpty(data.phalanx)){
					phalanx = '(<span class="phalanx-link" rel="'+data.id+'" data-g="'+data.g+'" data-s="'+data.s+'" data-p="'+data.p+'" onclick="galaxyPhalanx('+data.id+','+data.g+','+data.s+','+data.p+');" style="text-decoration:underline;">Phalanx</span>)';
				}
				
				planet_row = '<div class="planet-row">\
						<div class="planetpic"><img src="images/planets/'+data.image+'.png"></div>\
						<div class="planetinfo">\
							<h1>'+data.name+' ['+data.g+':'+data.s+':'+data.p+'] '+phalanx+'</h1>\
							'+debries_row+'\
							'+planet_links+'\
						</div>\
						<div class="clear"></div>\
					</div>';
				
				if(!Check.isEmpty(data.moon)){
					if(parseInt(data.user_id) != parseInt(user.id)){
						moon_links += parseInt(planet.espionage_probe) > 0 ? '<a class="btn galaxy-link-spy" rel="'+data.g+';'+data.s+';'+data.p+';3"  onclick="galaxyMissionSpy(\''+data.g+';'+data.s+';'+data.p+';3\');"><img src="images/icon-spy.png"></a>' : '';
						moon_links += '<a class="btn galaxy-link-attack" onclick="Shipyard.init('+data.g+','+data.s+','+data.p+',3,1);"><img src="images/icon-attack.png"></a>';
						moon_links += '<a class="btn galaxy-link-stay" onclick="Shipyard.init('+data.g+','+data.s+','+data.p+',3,4);"><img src="images/icon-stay.png"></a>';
					}
					moon_links += '<a class="btn galaxy-link-transportation" onclick="Shipyard.init('+data.g+','+data.s+','+data.p+',3,3);"><img src="images/icon-transportation.png"></a>';
					if(parseInt(data.user_id) != parseInt(user.id)){
						moon_links += '<a class="btn galaxy-link-destroy" onclick="Shipyard.init('+data.g+','+data.s+','+data.p+',3,9);"><img src="images/icon-destroy.png"></a>';
					}

					moon_row = '<div class="moon-row">\
						<div class="moonpic"><img src="images/planets/1.png"></div>\
						<div class="mooninfo">\
							<h1>'+data.moon.name+' ['+data.g+':'+data.s+':'+data.p+']</h1>\
							<div class="diameter">\
								<h2>Diameter: '+data.moon.diameter+'</h2>\
							</div>\
							'+moon_links+'\
						</div>\
						<div class="clear"></div>\
					</div>';
				}
				
		
		Overview.resetModals();
		$('.page-galaxy-page').html('<div class="b-main overthrow" id="galaxyScrollPage">\
					<ul>\
						<li style="padding:5px 5px 50px 5px;"><h4 style="text-align:center;margin:0px 0px 5px;">'+data.name+' ['+data.g+':'+data.s+':'+data.p+']</h4><div class="user-profile">'+user_row+ally_row+planet_row+moon_row+'</div></li>\
				</ul></div>\
				<nav class="b-menu">\
					<a class="fr btn" onclick="Galaxy.closePage();">'+lang._T('close')+'</a>\
				</nav>').show().css('z-index','10');
				
		makeScroll('galaxyScrollPage');

		
	},
	closePage: function(){
		$('.page-galaxy-page').hide();
	},
	showMissles: function(g,s,p,t){
		
		var html = '<div class="table missiles-table">\
			<div>\
				<div>Missiles Amount</div>\
				<div>\
					<input pattern="[0-9]*" type="number" class="missiles_input"  placeholder="0" value="'+planet.interplanetary_missiles+'"/>\
				</div>\
			</div>\
			<div>\
				<div>Target</div>\
				<div>\
					<select name="missiles_target" class="missiles_target">\
                        <option value="8" selected>All Defenses</option>\
                        <option value="0">Rocket Launcher</option>\
                        <option value="1">Light Laser</option>\
                        <option value="2">Heavy Laser</option>\
                        <option value="3">Gauss Cannon</option>\
                        <option value="4">Ion Cannon</option>\
                        <option value="5">Plasma Turret</option>\
                        <option value="6">Small Shield Dome</option>\
                        <option value="7">Large Shield Dome</option>\
                    </select>\
				</div>\
			</div>\
			<div>\
				<div></div>\
				<div>\
					<a class="fr btn" onclick="Galaxy.sendMissles('+g+','+s+','+p+','+t+');">'+lang._T('Send Missiles')+'</a>\
				</div>\
			</div>\
		</div>';
	
		Modal.init('Missile Attack ['+g+':'+s+':'+p+']', '<div class="user-profile">'+html+'</div>');
		return false;
	},
	sendMissles: function(g,s,p,t){
		
		var missiles_amount = $('.missiles_input').val();
		var missiles_target = $('.missiles_target option:selected').val();
		
		Request.send({object:'shipyard', action:'missiles', g:g, s:s, p:p, t:t, mission:10, target_object:missiles_target, missiles:missiles_amount});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{	
			Modal.close();		
			alertify.alert(lang._T('You successfully sent Missiles to coordinates ['+g+':'+s+':'+p+'].'));
		}
		return false;
	}

};
