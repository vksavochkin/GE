 var UserInfo= {
	pageID: '.page-user-page',
	data:{},
	init: function () {	
		/*$('.page-content').hide();
		onPage = 'galaxy';	
		$('.bar-title h1').html('Galaxy');
		$('.bar-title span').html('');	
		this.content(g,s);*/
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(g,s){	
		return false;
	},
	showPage: function(rel){
		Request.send({object:'user', action:'info', info_username:rel});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}
		
		var info = responseObj.userinfo.list;
		
		var user_row = '';
		var ally_row = '';
		var planet_row = '';

		user_row = '<div class="user-row">'+
						'<div class="userpic"><img src="images/avatars/'+info.avatar+'.gif"></div>'+
						'<div class="userinfo">'+
							'<h1>'+info.username+' ['+info.rank+'] '+info.status+'</h1>'+
							'<a class="btn send-message-btn" onclick="Mail.new_message(\''+info.username+'\',\'\');" rel="'+info.user_id+'">Send Mesage</a>'+
							'<a class="btn user-statistic-btn" rel="'+info.user_id+'" onclick="Scoreboard.init('+info.user_id+');">Statistic</a>'+
						'</div>'+
						'<div class="clear"></div>'+
					'</div>'; 
				
		if(parseInt(info.ally_id) > 0){
			ally_row = '<div class="alliance-row">'+
						'<div class="alliancepic"><img src="images/avatars/a/0.jpg"></div>'+
						'<div class="allyinfo">'+
							'<h1>'+info.ally_name+' ('+info.ally_tag+')</h1>'+
							'<!--<h2>38 members</h2>-->'+
							'<div class="btn ally-page-btn ally-link" rel="'+info.ally_tag+'">Alliance Page</div>'+
							'<div class="btn ally-statistic-btn" rel="'+info.ally_tag+'">Statistic</div>'+
						'</div>'+
						'<div class="clear"></div>'+
					'</div>';
		}

				
		planet_row = '<div class="planet-row">'+
						'<div class="planetpic"><img src="images/planets/'+info.image+'.png"></div>'+
						'<div class="planetinfo">'+
							'<h1 class="galaxy-link" rel="'+info.g+';'+info.s+'"><b>Home Planet:</b><br/>'+info.name+' ['+info.g+':'+info.s+':'+info.p+']</h1>'+
						'</div>'+
						'<div class="clear"></div>'+
					'</div>';
						
		Overview.resetModals();
		$('.page-cr-page').html('<div class="b-main overthrow" id="crScrollPage">'+
					'<ul>'+
						'<li style="padding:5px 5px 50px 5px;"><div class="user-profile">'+user_row+ally_row+planet_row+'<p class="user-description" style="padding-top:20px;">'+info.description+'</p></div></li>'+
				'</ul></div>'+
				'<nav class="b-menu">'+
					'<a class="fr btn" onclick="CR.closePage();">'+lang._T('close')+'</a>'+
				'</nav>').show().css('z-index','10');

		return false;
		
	},
	closePage: function(){
		$('.page-cr-page').hide();
	}

};
