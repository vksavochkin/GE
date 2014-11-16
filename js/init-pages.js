$(document).ready(function() {
   	
$('.menu-left a').on('click', function(){
    clearTimeout(Chat.interval);
});
$('body').on('click', '.menu-left a', function(){
    clearTimeout(Chat.interval);
});
Timers.init();

/*Choose Server*/



$('body').on('click', '#mm-menu-right .mm-subopen.mm-fullsubopen', function(){
	var rel = $(this).parent().attr('rel');
	//console.log(rel);
	makeScroll('mm-scrollasc'+rel);
});

/*
    Overview
*/   
$('.header-bg-middle > div').on('click', function(){
	Resources.init();
});
$('.home-overview .title').on('click',function(){
	$('.planet-control-modal, .overlay').show();
});

$('.planet-control-modal .closeBtn, .overlay').on('click',function(){
	$('.planet-control-modal, .overlay').hide();
});

$('#chatSend').keydown(function (e){
    if(e.keyCode == 13){
        Chat.send();
        return false;
    }
});



$('.planet-select').on('change', function(){
	Overview.changePlanet();
	return false;
});

$('.planet-img, .moon-img').on('click', function(event){
	var pid = parseInt(event.target.attributes.rel.value);
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
$('body').on('click', 'a.galaxy-go', function(){
	var g = $('.galaxy-bar-galaxy').val();
	var s = $('.galaxy-bar-system').val();
	Galaxy.content(g,s);
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
    
});


$('body').on('change', '.shipyard_type, .shipyard_speed', function(){
    var g = $('.shipyard_galaxy').val();
    var s = $('.shipyard_system').val();
    var p = $('.shipyard_planet').val();
    
    if(!Check.isEmpty(g) && !Check.isEmpty(s) && !Check.isEmpty(p)){
	    validateStep(2);
    }
    
});

$('body').on('change', '.shipyard_own_planets', function(){
    var p = $('.shipyard_own_planets  option:selected').val();
	var data = p.split(';');
    
    $('.shipyard_galaxy').val(data[0]);
    $('.shipyard_system').val(data[1]);
    $('.shipyard_planet').val(data[2]);
    $('.shipyard_type').val(parseInt(data[3]));
    validateStep(2);
    
});

$('body').on('keyup', '.shipyard_metal, .shipyard_crystal, .shipyard_deuterium', function(){
	calculateTransportCapacity();
});

/*
    Alliance
*/
//ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('body').on('click','.accordionButton',function() {	
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
	  
	 });

    
});

function togglePhalanx(rel){
	
	$('.phalanx-details-toggle-'+rel).toggle();
	makeScroll('ppScrollPage');
};

function toggleRound(rel){
	$('.round-content-'+rel).toggle();
	makeScroll('crScrollPage');
};

function showACSBtn(rel){
	$('.asc-block-'+rel).html('<b>Invite to ASC</b><div class="asc-add-block">'+
		'<input type="text" value="" placeholder="Username" name="asc-username" class="asc-username asc-username-'+rel+'"><div rel="'+rel+'" class="btn" onclick="ascAdd('+rel+');">Add</div>'+
		'<div class="clear"></div>'+
	'</div>'+
	'<div class="acs-users">'+
		'<b>Already Invited:</b>'+
		'<div class="asc-invited asc-invited-'+rel+'"><div>'+
	'</div>');
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
		alertify.success(lang._T('You successfully sent Spy\'s to planet ['+data[0]+':'+data[1]+':'+data[2]+']'));
	}
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
};

//recall
function fleetCallback(rel){
	Request.send({object:'planet', action:'recall', sid:rel});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{	
		//Overview.generateFleet();
		$('#mm-menu-right').html('').remove();
		initRightMenu();		
		alertify.alert(lang._T('You successfully sent ships back to planet.'));
	}
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
};
function cancelResearch(el){
	Request.send({object:'research', action:'research', cmd:'cancel', prod:el});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{			
		Research.init();
	}
};
/*
    Production - Defense
*/
function defenseBuild(el){
	var count = $('.defense_build_'+el).val();
	Request.send({object:'defense', action:'add', prod:el, count:count});
	if(responseObj.status != 100){
		alertify.alert(lang._T(responseObj.error));
		return false;
	}else{			
		Defense.init();
	}
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
};




/*
    Settings
*/
function settingsShowAvatars(){
	
	var out = '';
	
	for(i=1001; i<=1126; i++){
		out += '<a class="avatar-item" onclick="changeAvatar(\''+i+'\');"><img src="images/avatars/'+i+'.gif"></a>';
	}
	for(i=2001; i<=2131; i++){
		out += '<a class="avatar-item" onclick="changeAvatar(\''+i+'\');"><img src="images/avatars/'+i+'.gif"></a>';
	}
	
	Modal.init('Choose Avatar', '<div class="user-profile">'+out+'<div class="clear"></div></div>');
	
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
	
	
};


function maxShipBtn(el){
	var max = $('.ship_'+el).data('max');
	$('.ship_'+el).val(max);

};
function removeAllShipsBtn(){
	$('.shipyard_input').each(function(){
		$(this).val('');
	});
};
function maxAllShipsBtn(){
	$('.shipyard_input').each(function(){
		var max = $(this).data('max');
		$(this).val(max);
	});
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
	
};

function increment(item){
	if(Number($("."+item).val()) < 1){$("."+item).val('1');return false;}
	$("."+item).val( Number($("."+item).val()) + 1 );
};
	
function decrement(item){
	if(Number($("."+item).val()) < 1 || Number($("."+item).val()) == 1 ){$("."+item).val('1');return false;}
	$("."+item).val( Number($("."+item).val()) - 1 );
};