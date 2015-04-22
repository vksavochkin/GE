 var Overview= {
	pageID: '.page-overview',
	init: function () {
		$('.page-content').hide();
		onPage = 'overview';
		$('.bar-title h1').html('Overview');
		$('.bar-title span').html('');		
		Request.send({});	
		this.content();
		Login.close();
		$('#header').show();
		$('#help-bar').show();
		$('#content').show();
		$(this.pageID).show();
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(){
		var fleet = {own:0,enemy:0};
		if(!Check.isEmpty(responseObj.state) && !Check.isEmpty(responseObj.state.fleet)){
    		fleet = Overview.countFleet(responseObj.state.fleet, responseObj.state.user.id);
		}
		$('.fleet-counter').html(fleet.own+'/<b>'+fleet.enemy+'</b>'); 
		$('.overview-planet-name').html(planet.name);
		$('.overview-planet-coords').html('['+planet.g+':'+planet.s+':'+planet.p+']');
		$('.overview-planet-fields').html(exactNumber(planet.diameter)+' km ('+planet.field_current+'/'+planet.field_max+')');
		$('.overview-planet-temp').html('Approx. '+planet.temp_min+'&deg; to '+planet.temp_max+'&deg;');
		$('.overview-planet-rank').html(''+prettyNumber(responseObj.state.user.points)+' (Rank&nbsp;'+responseObj.state.user.rank+' of&nbsp;'+responseObj.total_users+')');
		$('.overview-planet-online').html(''+responseObj.online_users+' Users');
		$('.planet-info .planet-img').css('background-image', 'url("images/planets/'+planet.image+'.png")');
		if (parseInt(planet.moon_id) > 0) {
			$('.moon-img').show();
			$('.planet-img').attr('rel', planet.moon_id);
			$('.moon-img').attr('rel', planet.moon_id);
		}else if (parseInt(planet.planet_type) == 3){
			$('.moon-img').hide();
			foreach(responseObj.state.planets, function(pl){
				if (pl.moon_id == planet.id){
					$('.planet-img').attr('rel', pl.id);
				}
			});
		}else{
			$('.moon-img').hide();
			$('.moon-img').attr('rel', '');
		}
		
		$('.planet-timer').html();
		
		$('.server_game_speed').html('x'+(responseObj.state.user.game_speed / 2500));
		$('.server_fleet_speed').html('x'+(responseObj.state.user.fleet_speed / 2500));
		$('.server_resources').html('x'+responseObj.state.user.resource_multiplier);
		$('.server_df_percent').html(responseObj.state.user.FLEET_TO_DEBRIES+'%');
		$('.server_attacks').html((parseInt(responseObj.state.user.attack_enabled) == 1 ? '<span style="color:green">Yes</span>' : '<span style="color:red">No</span>'));
		
		if(!Check.isEmpty(responseObj.state.global_notification)){
			$('.global-message-holder').html('<div class="global_message '+responseObj.state.global_notification_type+'">'+responseObj.state.global_notification+'</div>');
		}
		
		
		//$('#blc').countdown({until: ".$Value.", compact: true,description: ''});
		return false;
	},
	countFleet:function(obj,id){
	  var out = {own:0,enemy:0};
	  foreach(obj, function(k, v){
		  if(v.fleet_owner == id){
			  out.own++;	
		  }else if (v.fleet_owner != id && v.fleet_target_owner==id && v.fleet_mess==0) {
			  out.enemy++;
		  }
	  });
	  return out;
    },
	updateHeader:function(){
		if(!Check.isEmpty(responseObj.state.user)){
			if(parseInt(planet.metal) >= parseInt(planet.metal_max)){
				$('.metal .value').html( prettyNumber(planet.metal) ).css('color', 'red');
			}else{
				$('.metal .value').html( prettyNumber(planet.metal) ).css('color', '#ffffff');
			}
			if(parseInt(planet.crystal) >= parseInt(planet.crystal_max)){
				$('.crystal .value').html( prettyNumber(planet.crystal) ).css('color', 'red');
			}else{
				$('.crystal .value').html( prettyNumber(planet.crystal) ).css('color', '#ffffff');
			}
			if(parseInt(planet.deuterium) >= parseInt(planet.deuterium_max)){
				$('.deuterium .value').html( prettyNumber(planet.deuterium) ).css('color', 'red');
			}else{
				$('.deuterium .value').html( prettyNumber(planet.deuterium) ).css('color', '#ffffff');
			}
			//$('.metal .value').html( parseInt(planet.metal) );
			//$('.crystal .value').html( parseInt(planet.crystal) );
			//$('.deuterium .value').html( parseInt(planet.deuterium) );
			var energy = parseInt(planet.energy_max) + parseInt(planet.energy_used);
			if( energy < 0){
			   $('.energy .value').html( prettyNumber(energy) ).css('color', 'red');
			}else{
			   $('.energy .value').html( prettyNumber(energy) ).css('color', '#ffffff');
			}
			//Mailbox
			if( parseInt(responseObj.state.user.has_mail) < 1){
			   //$('.mailbox').css('background-image', 'url(../images/i-mail.png)');
			   $('.mailbox').removeClass('new-message-icon');
			}else{
			   //$('.mailbox').css('background-image', 'url(../images/i-mail-new.png)');
			   $('.mailbox').addClass('new-message-icon');
			}

			var planet_list = '';
			
			foreach (responseObj.state.planets, function(k, p){
    			var current = '';
				if(parseInt(planet.id) == parseInt(p.id)){
				   current = 'selected="selected"';
				}
				planet_list += '<option value="'+p.id+'" '+current+'>'+p.name+' ['+p.g+':'+p.s+':'+p.p+']</option>';
				
			});

			/*foreach(responseObj.state.planets, function(k, p){console.log(count(p));
				var current = '';
				if(parseInt(planet.id) == parseInt(p.id)){
				   current = 'selected="selected"';
				}
				planet_list += '<option value="'+p.id+'" '+current+'>'+p.name+' ['+p.g+':'+p.s+':'+p.p+']</option>';
				
			});*/
			
			$('.planet-select-holder').html('<select class="planet-select" onchange="Overview.changePlanet();">'+planet_list+'</select>');

			var timer_building = '';
			var timer_research = '';
			if(!Check.isEmpty(responseObj.state.user.production.building)){
                $.each(responseObj.state.user.production.building, function(k, b){
    				if(parseInt(planet.id) == parseInt(b.planet_id) && Check.isEmpty(timer_building)){
    				    var restTime = parseInt(b.end_time) - parseInt(responseObj.timestamp);
    				    var level = planet[b.production];
    				    if(b.action == 'build'){
        				    level++;
    				    }else{
        				    level--;
    				    }
        				timer_building = '<div><div style="font-size:9px;padding:2px;text-align:left;">'+lang._T('tech_'+b.production)+' ('+level+')'+'</div><div style="padding:2px;text-align:right;"><div id="overview-planet-timer" class="js_timer" timer="'+restTime+'|1" style="font-size:9px;"></div></div></div>';
    				}				
    			});
            }
			if(!Check.isEmpty(responseObj.state.user.production.research)){
    			var researchRow = responseObj.state.user.production.research;
				
				var restTime = parseInt(researchRow.end_time) - parseInt(responseObj.timestamp);
				timer_research = '<div style="background:none;"><div style="font-size:9px;padding:2px;text-align:left;">'+lang._T('tech_'+researchRow.production)+' ('+(parseInt(user[researchRow.production]) +1)+')'+'</div><div style="padding:2px;text-align:right;"><div id="overview-planet-timer" class="js_timer" timer="'+restTime+'|1" style="font-size:9px;"></div></div></div>';
			}
			$('.planet-timer').html('<div class="table">'+timer_building+timer_research+'</div>');		
			
		}
	},
	toggleTime:function(){

	},
	changePlanet:function(pid){
		pid = typeof pid !== 'undefined' ? pid : $('.planet-select option:selected').val();
		Request.send({object:'planet', action:'set', pid:pid});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{
			if (isset(planetPages[onPage])){
				planetPages[onPage].init();
			} else if (isset(globalPages[onPage])){
				$(globalPages[onPage].pageID).show();
			}
			return false;
		}
	},
	restorePage:function(){
		if (isset(planetPages[onPage])){
			$(planetPages[onPage].pageID).show();
		} else if (isset(globalPages[onPage])){
			$(globalPages[onPage].pageID).show();
		}
		return false;
	},
	renamePlanet:function(){
		alertify.prompt("Rename Planet", function (e, str) {
		    // str is the input text
		    if (e) {
		        Request.send({object:'planet', action:'rename', newname:str, planet_id:planet.id});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{			
					$('.overview-planet-name').html(str);
					$('.planet-control-modal, .overlay').hide();
				}
		    } else {
		        // user clicked "cancel"
		    }
		}, planet.name);
    },
	movePlanet:function(){
		alertify.prompt('Move Planet<br/><small style="color:red">To move planet will cost you 10,000 Dark Matter</small>', function (e, str) {
		    // str is the input text
		    if (e) {
		        if(!str.match(/\d[0-9]{0,1}:\d[0-9]{0,2}:\d[0-9]{0,1}/g)){
					alertify.alert(lang._T('New planet position is incorrect.'));
					return false;
				}
				Request.send({object:'planet', action:'move', position:str, planet_id:planet.id});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{			
					$('.overview-planet-coords').html('['+str+']');
					$('.planet-control-modal, .overlay').hide();
				}
		    } else {
		        // user clicked "cancel"
		    }
		}, 'Enter new position. Ex: '+planet.g+':'+planet.s+':'+planet.p);
    },
	deletePlanet:function(){
		if(planet.planet_type == 3){
			var msg = 'Are you sure you want to delete moon <b>'+planet.name+' ['+planet.g+':'+planet.s+':'+planet.p+']</b>?';
		}else{
			var msg = 'Are you sure you want to delete planet on coordinates <b>['+planet.g+':'+planet.s+':'+planet.p+']</b>?';
		}
		
		alertify.confirm(msg, function (e) {
		    if (e) {
		        Request.send({object:'planet', action:'delete', planet_id:planet.id});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{			
					$('.planet-control-modal, .overlay').hide();
					Overview.init();
				}
		    } else {
		        // user clicked "cancel"
		    }
		});
    },
	generateFleet:function(){
		var out = '';
		if(!Check.isEmpty(responseObj.state) && !Check.isEmpty(responseObj.state.fleet)){
    		out = Phalanx.generateReportBody(responseObj.state.fleet);
		}		

		if(Check.isEmpty(out)){
			out = '<li class="side-fleet-row"><span style="text-align:center;width:100%;">You don\'t have any fleet activity right now</span><div class="btn shipyard-init-link" style="display:block;clear:both;margin:0px auto;width:100px;height:20px;line-height:20px;padding:4px 10px;text-align:center;margin-bottom:10px;">Send Fleet</div></li>';
		}
		$('#menu-right').html('<ul>'+out+'</ul>');
		
    },
    resetModals: function(){
	    $('.page-galaxy-page,.page-user-page,.page-alliance-page,.page-message-page,.page-cr-page,.page-help-page').css('z-index','');
    },
    showHelp:function(id){
	    id = typeof id !== 'undefined' ? id : 1;
	    
	    Request.send({'object':'page', 'action':'show', 'pid':id});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}
		
		var back_link = '';
		if(!Check.isEmpty(responseObj.pageshow.back) && !Check.isEmpty(responseObj.pageshow.back.id)){
			back_link = '<< <span class="show-help-page-link" rel="'+responseObj.pageshow.back.id+'">'+responseObj.pageshow.back.title+'</span> | ';
		}
		
		//links
		var links = '';
		foreach(responseObj.pageshow.pages, function(k, p){
			links += '<div class="show-help-page-link" rel="'+p.id+'">'+p.title+'</div>';
		});
		
		var links_top = '';
		var links_bottom = '';
		if(responseObj.pageshow.link_position == 'top'){
			links_top = '<div class="help-page-links-top">'+links+'</div>';
		}else{
			links_bottom = '<div class="help-page-links-bottom">'+links+'</div>';
		}

		if(id == 1){
			links_bottom += '<div style="text-align:right; font-size:smaller; color:#aabbcc">Version: '+config.version+'</small>';
		}
		
		Modal.init(back_link+responseObj.pageshow.title, '<div class="user-profile">'+links_top+'<div class="help-page-middle">'+responseObj.pageshow.content+'</div>'+links_bottom+'</div>');
    }
};
