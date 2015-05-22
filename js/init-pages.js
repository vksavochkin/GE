$(document).ready(function() {
   	
$('#menu-left .menu-left-link').on('tap', function(){
    clearTimeout(Chat.interval);
    
    var rel = $(this).data('page');
    if(rel == 'Overview'){Overview.init();}
    else if(rel == 'Empire'){Empire.init();}
    else if(rel == 'Galaxy'){Galaxy.init();}
    else if(rel == 'Fleet'){Shipyard.init();}
    else if(rel == 'Ally'){Ally.init();}
    else if(rel == 'Buildings'){Buildings.init();}
    else if(rel == 'Research'){Research.init();}
    else if(rel == 'Defense'){Defense.init();}
    else if(rel == 'Ships'){Ships.init();}
    else if(rel == 'Forum'){Forum.init();}
    else if(rel == 'Chat'){Chat.init();}
    else if(rel == 'Scoreboard'){Scoreboard.init();}
    else if(rel == 'Recordboard'){Recordboard.init();}
    else if(rel == 'Search'){Search.init();}
    else if(rel == 'Officers'){Officers.init();}
    else if(rel == 'Store'){Store.init();}
    else if(rel == 'Settings'){Settings.init();}
    else if(rel == 'Logout'){Login.doLogout();}
    else{Overview.init();}
    return false;
});
$('body').on('tap', '#menu-left .menu-left-link', function(){
    clearTimeout(Chat.interval);
    
    var rel = $(this).data('page');
    if(rel == 'Overview'){Overview.init();}
    else if(rel == 'Empire'){Empire.init();}
    else if(rel == 'Galaxy'){Galaxy.init();}
    else if(rel == 'Fleet'){Shipyard.init();}
    else if(rel == 'Ally'){Ally.init();}
    else if(rel == 'Buildings'){Buildings.init();}
    else if(rel == 'Research'){Research.init();}
    else if(rel == 'Defense'){Defense.init();}
    else if(rel == 'Ships'){Ships.init();}
    else if(rel == 'Forum'){Forum.init();}
    else if(rel == 'Chat'){Chat.init();}
    else if(rel == 'Scoreboard'){Scoreboard.init();}
    else if(rel == 'Recordboard'){Recordboard.init();}
    else if(rel == 'Search'){Search.init();}
    else if(rel == 'Officers'){Officers.init();}
    else if(rel == 'Store'){Store.init();}
    else if(rel == 'Settings'){Settings.init();}
    else if(rel == 'Logout'){Login.doLogout();}
    else{Overview.init();}
    return false;
});

function clickLeftSidebar(){
    
}

Timers.init();

$('body').on('tap', 'div, span, p, b, i, button', function(){
    //$('input, textarea').blur();
    //return true;
});

$('div, span, p, b, i, button').on('tap', function(){
    //$('input, textarea').blur();
    //return true;
});

/*
    Overview
*/   
$('.header-bg-middle > div').on('tap', function(){
	Resources.init();
    return false;
});
$('.home-overview .title').on('tap',function(){
	$('.planet-control-modal, .overlay').show();
    return false;
});

$('.planet-control-modal .closeBtn, .overlay').on('tap',function(){
	$('.planet-control-modal, .overlay').hide();
    return false;
});

$('.register-email, .register-password, .register-password2, .register-username').keydown(function (e){
    if(e.keyCode == 13){
        Login.doRegister();
        return false;
    }
    return;
});

$('.login-username, .login-password').keydown(function (e){
    if(e.keyCode == 13){
        Login.doLogin();
        return false;
    }
    return;
});

$('.forgot-email').keydown(function (e){
    if(e.keyCode == 13){
        Login.doForgot();
        return false;
    }
    return;
});

$('#chatSend').keydown(function (e){
    if(e.keyCode == 13){
        Chat.send();
        return false;
    }
    return;
});


$('.planet-select').on('change', function(){
	Overview.changePlanet();
	return false;
});

$('.planet-img, .moon-img').on('tap', function(event){
	var pid = parseInt($(this).attr('rel'));
	Request.send({object:'planet', action:'set', pid:pid});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{
		Overview.init();		
		return false;
	}
});


/*
    Galaxy
*/
$('body').on('tap', '.galaxy-go', function(){
	var g = $('.galaxy-bar-galaxy').val();
	var s = $('.galaxy-bar-system').val();
	Galaxy.content(g,s);
    return false;
});


/*
    Shipyard
*/


$('body').on('change', '.shipyard_galaxy, .shipyard_system, .shipyard_planet', function(){
    var g = $('.shipyard_galaxy').val();
    var s = $('.shipyard_system').val();
    var p = $('.shipyard_planet').val();
    
    if(!Check.isEmpty(g) && !Check.isEmpty(s) && !Check.isEmpty(p)){
	    validateStep(2);
    }
    
    return false;
});


$('body').on('change', '.shipyard_type, .shipyard_speed', function(){
    var g = $('.shipyard_galaxy').val();
    var s = $('.shipyard_system').val();
    var p = $('.shipyard_planet').val();
    
    if(!Check.isEmpty(g) && !Check.isEmpty(s) && !Check.isEmpty(p)){
	    validateStep(2);
    }
    
    return false;
});

$('body').on('change', '.shipyard_own_planets', function(){
    var p = $('.shipyard_own_planets  option:selected').val();
	var data = p.split(';');
    
    $('.shipyard_galaxy').val(data[0]);
    $('.shipyard_system').val(data[1]);
    $('.shipyard_planet').val(data[2]);
    $('.shipyard_type').val(parseInt(data[3]));
    validateStep(2);
    
    return false;
});

$('body').on('keyup', '.shipyard_metal, .shipyard_crystal, .shipyard_deuterium', function(){
	calculateTransportCapacity();
    return false;
});

/*
    Alliance
*/
//ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('body').on('tap','.accordionButton',function() {	
		//REMOVE THE ON CLASS FROM ALL BUTTONS
		$('.accordionButton').removeClass('on');			  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordionContent').slideUp('normal');	   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {				
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('on');				  
			//OPEN THE SLIDE
			$(this).next().slideDown('normal');
		 }
         return;
	  
	 });

    
});

function togglePhalanx(rel){
	
	$('.phalanx-details-toggle-'+rel).toggle();
         return;
};

function toggleRound(rel){
	$('.round-content-'+rel).toggle();
         return;
};

function showACSBtn(rel){
	$('.asc-block-'+rel).html('<b>Invite to ASC</b><div class="asc-add-block">'+
		'<input type="text" value="" placeholder="Username" name="asc-username" class="asc-username asc-username-'+rel+'"><div rel="'+rel+'" class="btn add-acs-link">Add</div>'+
		'<div class="clear"></div>'+
	'</div>'+
	'<div class="acs-users">'+
		'<b>Already Invited:</b>'+
		'<div class="asc-invited asc-invited-'+rel+'"><div>'+
	'</div>');
         return;
};

function ascAdd(rel){
    var username = $('.asc-username-'+rel).val();
	Request.send({'object':'acs', 'action':'add', 'add_user':username, 'fleet_id':rel});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{
		alertify.alert(lang._T('User '+username+' successfully invited.'));
		$('.asc-invited-'+rel).append('<p>'+username+'</p>');
	}
         return;
};


function galaxyPhalanx(rel,g,s,p){

	var msg = 'Are you sure you want to scan this planet? It will cost you 5000 Deuterium.';
	//alertify.confirm(msg, function (e) {
	    //if (e) {
	        Request.send({object:'phalanx', action:'scan', g:g, s:s, p:p, pid:rel});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{			
				//alertify.alert(lang._T('Phalanx Scanner report was generated. You can view report in your mailbox.'));
				Phalanx.report(responseObj.phalanxscan.scan);
			}
	    //} else {
	        // user clicked "cancel"
	    //}
	//});
         return;
	
	
};

//move
function galaxyPlanetMove(rel){
	var data = rel.split(';');
	var msg = 'Are you sure you want to move planet to '+data[0]+':'+data[1]+':'+data[2]+'?<br/><small style="color:red">To move planet will cost you 10,000 Dark Matter</small>';
	alertify.confirm(msg, function (e) {
	    if (e) {
	        Request.send({object:'planet', action:'move', position:data[0]+':'+data[1]+':'+data[2], planet_id:planet.id});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{			
				alertify.alert(lang._T('You successfully moved your planet.'));
				Overview.init();
			}
	    } else {
	        // user clicked "cancel"
	    }
	});
         return;
	
	
};
//colonize
function galaxyMissionColonize(rel){
	var data = rel.split(';');
	var msg = 'Are you sure you want to colonize '+data[0]+':'+data[1]+':'+data[2]+'?';
	alertify.confirm(msg, function (e) {
	    if (e) {
	        Request.send({object:'shipyard', action:'ajax', mission:7, g:data[0], s:data[1], p:data[2], t:data[3]});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{			
				alertify.alert(lang._T('You successfully sent Colony ship to position ['+data[0]+':'+data[1]+':'+data[2]+']'));
			}
	    } else {
	        // user clicked "cancel"
	    }
	});
         return;
	
};
//spy
function galaxyMissionSpy(rel){
	var data = rel.split(';');
	Request.send({object:'shipyard', action:'ajax', mission:6, g:data[0], s:data[1], p:data[2], t:data[3]});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{		
		//alertify.set({ delay: 2000 });
		//alertify.success(lang._T('You successfully sent Spy\'s to planet ['+data[0]+':'+data[1]+':'+data[2]+']'));
		noty({
			type: 'success',
			layout: 'bottom',
			text: lang._T('You successfully sent Spy\'s to planet ['+data[0]+':'+data[1]+':'+data[2]+']'),
			timeout: 1500
		});
	}
         return;
};
//recycling
function galaxyMissionRecycle(rel){
	var data = rel.split(';');
	Request.send({object:'shipyard', action:'ajax', mission:8, g:data[0], s:data[1], p:data[2], t:data[3]});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{			
		alertify.alert(lang._T('You successfully sent Recyclers to debris on planet ['+data[0]+':'+data[1]+':'+data[2]+']'));
	}
         return;
};

//recall
function fleetCallback(rel){
	Request.send({object:'planet', action:'recall', sid:rel});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{	
		//Overview.generateFleet();
		$('#menu-right').html('');
		initRightMenu();		
		alertify.alert(lang._T('You successfully sent ships back to planet.'));
	}
         return;
};

/*
    Production - Buildings
*/
function buildingBuild(el){
	var current_level = parseInt(planet[el])+1;
	var msg = 'Are you sure you want to start construction of '+lang._T('tech_'+el)+' Level '+current_level+'?';
	alertify.confirm(msg, function (e) {
	    if (e) {
	    	Request.send({object:'production', action:'build', prod:el});
	        if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{			
				Buildings.init();
			}
	    } else {
	        // user clicked "cancel"
	    }
	});
         return;
};
function buildingCancel(el){
	var arr = el.split(':');
	Request.send({object:'production', action:arr[2], prod:arr[0],remove_id:arr[1]});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{			
		Buildings.init();
	}
         return;
};
function buildingDestroy(el){
	var current_level = parseInt(planet[el]);
	var msg = 'Are you sure you want to destroy '+lang._T('tech_'+el)+' Level '+current_level+'?';
	alertify.confirm(msg, function (e) {
	    if (e) {
	    	Request.send({object:'production', action:'destroy', prod:el});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{		
				Modal.close();	
				Buildings.init();
			}
	    } else {
	        // user clicked "cancel"
	    }
	});
         return;
};

/*
    Production - Research
*/
function doResearch(el){
	var current_level = parseInt(user[el])+1;
	var msg = 'Are you sure you want to research '+lang._T('tech_'+el)+' Level '+current_level+'?';
	alertify.confirm(msg, function (e) {
	    if (e) {
	    	Request.send({object:'research', action:'research', cmd:'build', prod:el});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{			
				Research.init();
			}
	    } else {
	        // user clicked "cancel"
	    }
	});
         return;
};
function cancelResearch(el){
	Request.send({object:'research', action:'research', cmd:'cancel', prod:el});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{			
		Research.init();
	}
         return;
};
/*
    Production - Defense
*/
function defenseBuild(el){
	var count = $('.defense_build_'+el).val();
	Request.send({object:'ships', action:'add', prod:el, count:count});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{			
		Defense.init();
	}
         return;
};
/*
    Production - Ships
*/
function shipsBuild(el){
	var count = $('.shipyard_build_'+el).val();
	Request.send({object:'ships', action:'add', prod:el, count:count});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{			
		Ships.init();
	}
         return;
};




/*
    Settings
*/
function settingsShowAvatars(){
	
	var out = '';
	
	for(i=1001; i<=1126; i++){
		out += '<div class="avatar-item" rel="'+i+'"><img src="images/avatars/'+i+'.gif"></div>';
	}
	for(i=2001; i<=2131; i++){
		out += '<div class="avatar-item" rel="'+i+'"><img src="images/avatars/'+i+'.gif"></div>';
	}
	
	Modal.init('Choose Avatar', '<div class="user-profile">'+out+'<div class="clear"></div></div>');
	
    return;
};

function settingsVacationStart(){
	var msg = 'Are you sure you want to enable vacation mode? You will not be able leave vacation mode in the next 72 hours.';
	alertify.confirm(msg, function (e) {
	    if (e) {
	        Request.send({object:'settings', action:'start'});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{			
				Settings.init();
				alertify.alert(lang._T('You successfully enter Vacation Mode.'));
			}
	    } else {
	        // user clicked "cancel"
	    }
	});
    return;
	
	
};


function settingsVacationStop(){
	var msg = 'Are you sure you want to exit vacation mode?';
	alertify.confirm(msg, function (e) {
	    if (e) {
	        Request.send({object:'settings', action:'end'});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{			
				Settings.init();
				alertify.alert(lang._T('You successfully exit Vacation Mode.'));
			}
	    } else {
	        // user clicked "cancel"
	    }
	});
    return;
	
};


function changeAvatar(rel){

	var msg = 'Are you sure you want to change your avatar to:<br/> <img style="display:block;margin:0px auto;" src="images/avatars/'+rel+'.gif">';
	alertify.confirm(msg, function (e) {
	    if (e) {
	        Request.send({object:'settings', action:'avatar', avatar:rel});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{			
				Settings.init();
				alertify.alert(lang._T('You successfully changed your avatar'));
			}
	    } else {
	        // user clicked "cancel"
	    }
	});
    return;
	
	
};


function maxShipBtn(el){
	// there can be more than one shipyard_ships table rendered on page
	$('.ship_'+el).each(function(){
		var max = $(this).data('max');
		$(this).val(max);
	});
    return;
};
function removeAllShipsBtn(){
	$('.shipyard_input').each(function(){
		$(this).val('');
	});
    return;
};
function maxAllShipsBtn(){
	$('.shipyard_input').each(function(){
		var max = $(this).data('max');
		$(this).val(max);
	});
    return;
};

function hireOfficer(rel){
	var data = rel.split(';');
	var hire_time = '';
	if(parseInt(data[1]) == 1){
		hire_time = '1 day (500 Dark Matter)';
	}else if(parseInt(data[1]) == 2){
		hire_time = '7 day (2000 Dark Matter)';
	}else if(parseInt(data[1]) == 3){
		hire_time = '30 day (5000 Dark Matter)';
	}
	var msg = 'Are you sure you want to hire '+lang._T('title_'+data[0])+' for '+hire_time+'?';
	alertify.confirm(msg, function (e) {
	    if (e) {
	        Request.send({object:'officer', action:'hire', officer:data[0], time:data[1]});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{			
				alertify.alert(lang._T('You successfully hired officer.'));
				Officers.init();
			}
	    } else {
	        // user clicked "cancel"
	    }
	});
    return;
	
	
};

function buyStarter(){
	var msg = 'Are you sure you want to buy Starter Pack for 3000 Dark Matter?';
	alertify.confirm(msg, function (e) {
	    if (e) {
	        Request.send({object:'officer', action:'starter'});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{			
				alertify.alert(lang._T('You successfully purchase Starter Pack.'));
				Officers.init();
			}
	    } else {
	        // user clicked "cancel"
	    }
	});
    return;
	
	
};


function serverLink(srv, registered, server_name){
	
	if(registered == 0){
		var msg = 'Do you want to create new account on "'+server_name+'" server?';
		alertify.confirm(msg, function (e) {
		    if (e) {
		        Request.send({object:'auth', action:'chooseserver', server:srv});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{			
					
					window.location.reload();
				}
		    } else {
		        // user clicked "cancel"
		    }
		});
	}else{
		Request.send({object:'auth', action:'chooseserver', server:srv});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{	
			window.location.reload();
		}
	}
    return;
};

function saveSettings(){
		
	var new_username = $('.settings-username').val();
	var old_password = $('.settings-password').val();
	var new_password = $('.settings-new-password').val();
	var new_password2 = $('.settings-new-password2').val();
	var email = $('.settings-email').val();
	var spy = $('.settings-spy').val();
	var description = $('.settings-description').val();
	var color = $('.settings-chat option:selected').val();
	var timezone = $('.settings-timezone option:selected').val();
	
	
	if(Check.isEmpty(new_username)){
		alertify.alert(lang._T('To change username fields must not be empty'));
		return false;
	}
	
	if(!Check.isEmpty(new_password)){
		if(Check.isEmpty(old_password) || Check.isEmpty(new_password2)){
			alertify.alert(lang._T('To change password old password and new password fields must not be empty'));
			return false;
		}
		if(new_password != new_password2){
			alertify.alert(lang._T('New password to not match'));
			return false;
		}
	}
	
	Request.send({object:'settings', action:'save', old_password:old_password, new_password:new_password, email:email, spy:spy, chat:color, timezone:timezone, description:description, new_username:new_username});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{			
		Settings.init();
		alertify.alert(lang._T('Settings was successfully saved.'));
	}
    return;
	
};

function increment(item){
	if(Number($("."+item).val()) < 1){$("."+item).val('1');return false;}
	$("."+item).val( Number($("."+item).val()) + 1 );
    return;
};
	
function decrement(item){
	if(Number($("."+item).val()) < 1 || Number($("."+item).val()) == 1 ){$("."+item).val('1');return false;}
	$("."+item).val( Number($("."+item).val()) - 1 );
    return;
};



/*
	temporarly here. need to be sorted by page
*/

$(document).ready(function() {
	//global events
	$('body').on('tap', '.ally-link', function(){
		var rel = $(this).attr('rel');
		Ally.showPage(rel);
        return false;
	});
	
	$('body').on('tap', '.user-link', function(){
		var rel = $(this).attr('rel');
		UserInfo.showPage(rel);
        return false;
	});
	
	$('body').on('tap', '.galaxy-link', function(){
		var rel = $(this).attr('rel');
		var data = rel.split(';');
		Galaxy.init(parseInt(data[0]), parseInt(data[1]));
        return false;
	});
	
	$('body').on('tap', '.phalanx-link', function(){
		var rel = $(this).attr('rel');
		var data = rel.split(';');
		galaxyPhalanx(parseInt(data[0]), parseInt(data[1]),parseInt(data[2]), parseInt(data[3]));
        return false;
	});
	
	$('body').on('tap', '.galaxy-link-destroy', function(){
		var rel = $(this).attr('rel');
		var data = rel.split(';');
		Shipyard.init(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]), parseInt(data[4]));
        return false;
	});
	$('body').on('tap', '.galaxy-link-transportation', function(){
		var rel = $(this).attr('rel');
		var data = rel.split(';');
		Shipyard.init(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]), parseInt(data[4]));
        return false;
	});
	$('body').on('tap', '.galaxy-link-stay', function(){
		var rel = $(this).attr('rel');
		var data = rel.split(';');
		Shipyard.init(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]), parseInt(data[4]));
        return false;
	});
	$('body').on('tap', '.galaxy-link-attack', function(){
		var rel = $(this).attr('rel');
		var data = rel.split(';');
		Shipyard.init(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]), parseInt(data[4]));
        return false;
	});
	$('body').on('tap', '.galaxy-link-spy', function(){
		var rel = $(this).attr('rel');
		galaxyMissionSpy(rel);
        return false;
	});
	$('body').on('tap', '.galaxy-link-recycle', function(){
		var rel = $(this).attr('rel');
		galaxyMissionRecycle(rel);
        return false;
	});
	$('body').on('tap', '.galaxy-link-missles', function(){
		var rel = $(this).attr('rel');
		var data = rel.split(';');
		Galaxy.showMissles(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]));
        return false;
	});
	$('body').on('tap', '.galaxy-send-missles-link', function(){
		var rel = $(this).attr('rel');
		var data = rel.split(';');
		Galaxy.sendMissles(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]));
        return false;
	});
	
	
	$('body').on('tap', '.galaxy-colonize', function(){
		var rel = $(this).attr('rel');
		galaxyMissionColonize(rel);
        return false;
	});
	$('body').on('tap', '.galaxy-move', function(){
		var rel = $(this).attr('rel');
		galaxyPlanetMove(rel);
        return false;
	});
	$('body').on('tap', '.galaxy-close-page', function(){
		Galaxy.closePage();
        return false;
	});
	
	
	$('body').on('tap', '.avatar-item', function(){
		var rel = $(this).attr('rel');
		changeAvatar(rel);
        return false;
	});
	
	$('body').on('tap', '.building-build', function(){
		var rel = $(this).attr('rel');
		buildingBuild(rel);
        return false;
	});
	
	$('body').on('tap', '#chatSend', function(){
		Chat.send();
		return false;
	});
	
	$('body').on('tap', '.close-cr-btn', function(){
		CR.closePage();
        return false;
	});
	
	$('body').on('tap', '.ally-hall-btn', function(){
		Ally.hall();
        return false;
	});
	
	$('body').on('tap', '.ally-new-message', function(){
		Mail.new_message('Alliance','');
        return false;
	});
	
	$('body').on('tap', '.ally-plats-link', function(){
		Ally.Plats();
        return false;
	});
	
	$('body').on('tap', '.ally-show-search-link', function(){
		Ally.showSearch();
        return false;
	});
	
	$('body').on('tap', '.ally-init-link', function(){
		Ally.init();
        return false;
	});
	
	$('body').on('tap', '.ally-quit-link', function(){
		Ally.quit();
        return false;
	});
	
	$('body').on('tap', '.ally-close-page-link', function(){
		Ally.closePage();
        return false;
	});
	
	$('body').on('tap', '.ally-rights-link', function(){
		Ally.rightsScreen();
        return false;
	});
	
	$('body').on('tap', '.ally-delete-ally-link', function(){
		Ally.deleteAlly();
        return false;
	});
	
	$('body').on('tap', '.ally-save-hall-link', function(){
		Ally.saveHall();
        return false;
	});
	
	$('body').on('tap', '.building-cancel', function(){
		var rel = $(this).attr('rel');
		buildingCancel(rel);
        return false;
	});
	
	$('body').on('tap', '.defense-build', function(){
		var rel = $(this).attr('rel');
		defenseBuild(rel);
        return false;
	});
	
	$('body').on('tap', '.user-statistic-btn', function(){
		var rel = $(this).attr('rel');
		Scoreboard.init(rel);
        return false;
	});
	
	$('body').on('tap', '.ally-statistic-btn', function(){
		Scoreboard.init();
        return false;
	});
	
	$('body').on('tap', '.send-message-btn', function(){
		var rel = $(this).attr('rel');
		Mail.new_message(rel,'');
        return false;
	});
	
	$('body').on('tap', '.login-init-link', function(){
		Login.init();
        return false;
	});
	
	$('body').on('tap', '.officer-starter-link', function(){
		buyStarter();
        return false;
	});
	
	$('body').on('tap', '.officer-link', function(){
		var rel = $(this).attr('rel');
		hireOfficer(rel);
        return false;
	});
	
	$('body').on('tap', '.show-servers-internal-link', function(){
		$('body').removeClass('show_left_sidebar').removeClass('show_right_sidebar');
    	$('#menu-right').html('');
    	$('#menu_overflow').addClass('menu_overflow_hidden');
		clearTimeout(Chat.interval);
		Login.showServersInside();
        return false;
	});
	
	$('body').on('tap', '.do-search-link', function(){
		Search.doSearch();
        return false;
	});
	
	$('body').on('tap', '.tab-buildings-link', function(){
		Buildings.init();
        return false;
	});
	
	$('body').on('tap', '.tab-research-link', function(){
		Research.init();
        return false;
	});
	
	$('body').on('tap', '.tab-defense-link', function(){
		Defense.init();
        return false;
	});
	
	$('body').on('tap', '.tab-ships-link', function(){
		Ships.init();
        return false;
	});
	
	$('body').on('tap', '.galaxy-arrow-left', function(){
		decrement('galaxy-bar-galaxy');
        return false;
	});
	
	$('body').on('tap', '.galaxy-arrow-right', function(){
		increment('galaxy-bar-galaxy');
        return false;
	});
	
	$('body').on('tap', '.system-arrow-left', function(){
		decrement('galaxy-bar-system');
        return false;
	});
	
	$('body').on('tap', '.system-arrow-right', function(){
		increment('galaxy-bar-system');
        return false;
	});
	
	$('body').on('tap', '.mailbox', function(){
		Mail.init();
        return false;
	});
	
	$('body').on('tap', '.show-help-link', function(){
		Overview.showHelp();
        return false;
	});
	
	$('body').on('tap', '.planetchooser-link', function(){
		PlanetChooser.toggle(Overview.changePlanet);
        return false;
	});
	
	$('body').on('tap', '.login-do-register-link', function(){
		Login.doRegister();
        return false;
	});
	
	$('body').on('tap', '.login-do-forgot-link', function(){
		Login.doForgot();
        return false;
	});
	
	$('body').on('tap', '.login-show-register', function(){
		Login.showRegister();
        return false;
	});
	
	$('body').on('tap', '.login-show-forgot', function(){
		Login.showForgot();
        return false;
	});
	
	$('body').on('tap', '.login-do-login-link', function(){
		Login.doLogin();
        return false;
	});
	
	$('body').on('tap', '.overview-rename-planet-link', function(){
		Overview.renamePlanet();
        return false;
	});
	
	$('body').on('tap', '.overview-move-planet-link', function(){
		Overview.movePlanet();
        return false;
	});
	
	$('body').on('tap', '.overview-delete-planet-link', function(){
		Overview.deletePlanet();
        return false;
	});
	
	$('body').on('tap', '.add-acs-link', function(){
		var rel = $(this).attr('rel');
		ascAdd(rel);
        return false;
	});
	
	$('body').on('tap', '.show-info-page-link', function(){
		var rel = $(this).attr('rel');
		Info.init(rel);
        return false;
	});
	
	$('body').on('tap', '.toggle-cr-round-link', function(){
		var rel = $(this).attr('rel');
		toggleRound(rel);
		return false;
	});
	
	$('body').on('tap', '.galaxy-show-page-link', function(){
		var rel = $(this).attr('rel');
		Galaxy.showPage(rel);
        return false;
	});
	
	$('body').on('tap', '.resources-do-change-link', function(){
		Resources.doChange();
        return false;
	});
	
	$('body').on('tap', '.error-message-close-link', function(){
		(this).remove();
        return false;
	});
	
	$('body').on('tap', '.server-link', function(){
		var rel = $(this).attr('rel');
		var data = rel.split(';');
		serverLink(data[0], data[1], data[2]);
        return false;
	});
	
	$('body').on('tap', '.show-store-page-link', function(){
		Store.init();
        return false;
	});
	
	$('body').on('tap', '.ally-cancel-apply-register-link', function(){
		AllyP.cancelApplyRegister();
        return false;
	});
	
	$('body').on('tap', '.ally-close-link', function(){
		AllyP.close();
        return false;
	});
	
	$('body').on('tap', '.ally-cancel-apply', function(){
		AllyP.cancelApply();
        return false;
	});
	
	$('body').on('tap', '.ally-apply-link', function(){
		AllyP.apply();
        return false;
	});
	
	$('body').on('tap', '.userinfo-show-page-link', function(){
		var rel = $(this).attr('rel');
		UserInfo.showPage(rel);
        return false;
	});
	
	$('body').on('tap', '.ally-hall-link', function(){
		Ally.hall();
        return false;
	});
	
	$('body').on('tap', '.ally-add-rank-link', function(){
		Ally.addRank();
        return false;
	});
	
	$('body').on('tap', '.ally-save-rank-link', function(){
		var rel = $(this).attr('rel');
		Ally.saveRank(rel);
        return false;
	});
	
	$('body').on('tap', '.ally-relete-rank-link', function(){
		var rel = $(this).attr('rel');
		Ally.deleteRank(rel);
        return false;
	});
	
	$('body').on('tap', '.ally-relete-rank-link', function(){
		var rel = $(this).attr('rel');
        return false;
		
	});
	
	$('body').on('tap', '.ally-plats-accept-link', function(){
		var rel = $(this).attr('rel');
		Ally.PlatsAccept(rel);
        return false;
	});
	
	$('body').on('tap', '.ally-plats-decline-link', function(){
		var rel = $(this).attr('rel');
		Ally.PlatsDecline(rel);
        return false;
	});
	
	$('body').on('tap', '.ally-do-search-ally-link', function(){
		Ally.doSearchAlly();
        return false;
	});
	
	$('body').on('tap', '.ally-do-register-ally', function(){
		Ally.doRegister();
        return false;
	});
	
	$('body').on('tap', '.ally-show-register-link', function(){
		Ally.showRegister();
        return false;
	});
	
	$('body').on('tap', '.aiap-buy-link', function(){
		var rel = $(this).attr('rel');
		AIAP.buy(rel);
        return false;
	});
	
	$('body').on('tap', '.iap-buy-link', function(){
		var rel = $(this).attr('rel');
		IAP.buy(rel);
        return false;
	});
	
	$('body').on('tap', '.setting-save-link', function(){
		saveSettings();
        return false;
	});
	
	$('body').on('tap', '.settings-show-avatars-link', function(){
		settingsShowAvatars();
        return false;
	});
	
	$('body').on('tap', '.settings-vacation-start', function(){
		settingsVacationStart();
        return false;
	});
	
	$('body').on('tap', '.settings-vacation-stop', function(){
		settingsVacationStop();
        return false;
	});
	
	$('body').on('tap', '.cr-close-page-link', function(){
		CR.closePage();
        return false;
	});
	
	$('body').on('tap', '.scoreboard-init-user-link', function(){
		var rel = $(this).attr('rel');
		Scoreboard.init(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.ships-build-link', function(){
		var rel = $(this).attr('rel');
		shipsBuild(rel);
        return false;
	});
	
	$('body').on('tap', '.research-cancel-link', function(){
		var rel = $(this).attr('rel');
		cancelResearch(rel);
        return false;
	});
	
	$('body').on('tap', '.research-build-link', function(){
		var rel = $(this).attr('rel');
		doResearch(rel);
        return false;
	});
	
	$('body').on('tap', '.shipyard-init-link', function(){
		Shipyard.init();
        return false;
	});
	
	$('body').on('tap', '.phalanx-toggle-link', function(){
		var rel = $(this).attr('rel');
		togglePhalanx(rel);
		return false;
	});
	
	$('body').on('tap', '.phalanx-close-page-link', function(){
		Phalanx.closePage();
        return false;
	});
	
	$('body').on('tap', '.planet-chooser-choose-link', function(){
		var rel = $(this).attr('rel');
		PlanetChooser.choose(rel);
        return false;
	});
	
	$('body').on('tap', '.max-ship-btn', function(){
		var rel = $(this).attr('rel');
		maxShipBtn(rel);
        return false;
	});
	
	$('body').on('tap', '.destroy-building-link', function(){
		var rel = $(this).attr('rel');
		buildingDestroy(rel);
        return false;
	});
	
	$('body').on('tap', '.info-jump-link', function(){
		Info.jump();
        return false;
	});
	
	$('body').on('tap', '.remove-ships', function(){
		removeAllShipsBtn();
        return false;
	});
	
	$('body').on('tap', '.max-ships-all', function(){
		maxAllShipsBtn();
        return false;
	});
	
	$('body').on('tap', '.show-help-page-link', function(){
		var rel = $(this).attr('rel');
		Overview.showHelp(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.side-fleet-acs-link', function(){
		var rel = $(this).attr('rel');
		showACSBtn(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.side-fleet-return', function(){
		var rel = $(this).attr('rel');
		fleetCallback(rel);
        return false;
	});
	
	$('body').on('tap', '.forum-create-reply-link', function(){
		var rel = $(this).attr('rel');
		Forum.createReply(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.forum-close-reply-link', function(){
		Forum.closeReply();
        return false;
	});
	
	$('body').on('tap', '.forum-delete-message-link', function(){
		var rel = $(this).attr('rel');
		Forum.DeleteMessage(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.forum-close-posts-link', function(){
		Forum.closePosts();
        return false;
	});
	
	$('body').on('tap', '.forum-new-reply-link', function(){
		var rel = $(this).attr('rel');
		Forum.newReply(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.forum-delete-topic-link', function(){
		var rel = $(this).attr('rel');
		Forum.DeleteTopic(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.forum-close-new-topic-link', function(){
		Forum.closeNewTopic();
        return false;
	});
	
	$('body').on('tap', '.forum-create-topic-link', function(){
		var rel = $(this).attr('rel');
		Forum.createTopic(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.forum-show-posts-link', function(){
		var rel = $(this).attr('rel');
		Forum.showPosts(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.forum-close-topics-link', function(){
		Forum.closeTopics();
        return false;
	});
	
	$('body').on('tap', '.forum-new-topic-link', function(){
		var rel = $(this).attr('rel');
		Forum.newTopic(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.forum-show-topics-link', function(){
		var rel = $(this).attr('rel');
		Forum.showTopics(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.shipyard-close-sim-link', function(){
		Shipyard.closeSim();
        return false;
	});
	
	$('body').on('tap', '.shipyard-do-sim-link', function(){
		Shipyard.doSim();
        return false;
	});
	
	$('body').on('tap', '.shipyard-send-link', function(){
		Shipyard.send();
        return false;
	});
	
	$('body').on('tap', '.max-resources-all-btn', function(){
		maxResources();
        return false;
	});
	
	$('body').on('tap', '.max-resources-btn', function(){
	    var rel = $(this).attr('rel');
	    maxResource(rel);
        return false;
	});
	
	$('body').on('tap', '.planet-chooser-shipyard-link', function(){
		PlanetChooser.toggle(Shipyard.destination);
        return false;
	});
	
	$('body').on('tap', '.max-ships-all', function(){
		maxAllShipsBtn();
        return false;
	});
	
	$('body').on('tap', '.remove-ships', function(){
		removeAllShipsBtn();
        return false;
	});
	
	$('body').on('tap', '.max-ship-btn', function(){
		var rel = $(this).attr('rel');
		maxShipBtn(rel);
        return false;
	});
	
	$('body').on('tap', '.shipsStepfocus', function(){
		Shipyard.initForm(1);
        return false;
	});
	
	$('body').on('tap', '.destinationStepfocus', function(){
		Shipyard.initForm(2);
        return false;
	});
	
	$('body').on('tap', '.missionsStepfocus', function(){
		Shipyard.initForm(3);
        return false;
	});
	
	$('body').on('tap', '.combat-sim-link', function(){
		Shipyard.showSim();
        return false;
	});
	
	$('body').on('tap', '.sim-link', function(){
		var rel = $(this).attr('rel');
		Shipyard.showSim(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.shipyard-init-mail-link', function(){
		var rel = $(this).attr('rel');
		var data = rel.split(';');
		Shipyard.init(parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseInt(data[3]));	
        return false;	
	});
	
	$('body').on('tap', '.mail-send-link', function(){
		Mail.send();
        return false;
	});
	
	$('body').on('tap', '.mail-close-page-link', function(){
		Mail.closePage();
        return false;
	});
	
	$('body').on('tap', '.delete-message', function(){
		var rel = $(this).attr('rel');
		Mail._delete(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.mail-delete-all-link', function(){
		var rel = $(this).attr('rel');
		Mail.deleteAll(parseInt(rel));
        return false;
	});
	
	$('body').on('tap', '.mail-categoty-link', function(){
		var rel = $(this).attr('rel');
		Mail.category(parseInt(rel));
        return false;
	});	
	
});