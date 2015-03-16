 var Officers= {
	pageID: '.page-officers',
	init: function () {
		$('.page-content').hide();
		onPage = 'officers';	
		$('.bar-title h1').html('Officers');
		$('.bar-title span').html('');
		Request.send({object:'officer', action: 'show'});		
		this.content();
		$(this.pageID).show();
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(){
		var out = '<li class="building-row"><h3>Dark Matter: '+responseObj.officershow.dm+' <small class="show-store-page-link">(add more)</small></h3></li>';
		
		if(parseInt(user['starter']) == 0){
			out += '<li class="building-row"><span class="btn officer-starter officer-starter-link" style="text-align:center;width:92%;">Starter Pack<br/>\
						40000 Metal, 20000 Crystal, 10000 Deuterium\
						<br/><small>3000 Dark Matter</small></span>\
					</li>';
		}
		
		foreach(reslist_officers, function(o, v){
			
			var expire = parseInt(user[o]);
			
			var expire_msg = '';
			var btn = '';
			if(expire > 0){
				var time_left = expire - parseInt(responseObj.timestamp);
				expire_msg = '(expire in <div class="js_timer" style="display:inline-block;" timer="'+time_left+'|1"></div>)';
				
				btn += '<div class="btn officer-link" rel="'+o+';1">Extend for 1 day<br/><small>500 Dark Matter</small></div>';
				btn += '<div class="btn officer-link" rel="'+o+';2">Extend for 7 days<br/><small>2000 Dark Matter</small></div>';
				btn += '<div class="btn officer-link" rel="'+o+';3">Extend for 30 days<br/><small>5000 Dark Matter</small></div>';
			}else{
				btn += '<div class="btn officer-link" rel="'+o+';1">Hire for 1 day<br/><small>500 Dark Matter</small></div>';
				btn += '<div class="btn officer-link" rel="'+o+';2">Hire for 7 days<br/><small>2000 Dark Matter</small></div>';
				btn += '<div class="btn officer-link" rel="'+o+';3">Hire for 30 days<br/><small>5000 Dark Matter</small></div>';
			}
			if(o == 'off_geologist'){
				var geo = 100;
				if(user['rank'] <= 50 && user['rank'] !='' && user['rank'] != 0){
					geo		  =    10;
				}else if(user['rank'] > 50 && user['rank'] <= 300){
					geo		  =    20;
				}else if(user['rank'] > 300 && user['rank'] <= 600){
					geo		  =    40;
				}else if(user['rank'] > 600 && user['rank'] <= 1000){
					geo		  =    40;
				}else if(user['rank'] > 1000 && user['rank'] <= 1500){
					geo		  =    50;
				}else {
					geo		  =    100;
				}
				var descriptions 	= lang._T('res_descriptions_'+o, geo, geo);
			}else if(o == 'off_scientist'){
				var val = ((user['rank'] <= 50 && user['rank'] !='' && user['rank'] != 0) ? 10 : 30);
				var descriptions 	= lang._T('res_descriptions_'+o, val, val);
			}else if(o == 'off_engineer'){
				var val = ((user['rank'] <= 50 && user['rank'] !='' && user['rank'] != 0) ? 10 : 30);
				var descriptions 	= lang._T('res_descriptions_'+o, val, val);
			}else if(o == 'off_general'){
				var val = ((user['rank'] <= 50 && user['rank'] !='' && user['rank'] != 0) ? 10 : 20);
				var descriptions 	= lang._T('res_descriptions_'+o, val, val);
			}else if(o == 'off_admiral'){
				var val = ((user['rank'] <= 50 && user['rank'] !='' && user['rank'] != 0) ? 10 : 20);
				var descriptions 	= lang._T('res_descriptions_'+o, val, val);
			}else{
				var descriptions 	= lang._T('res_descriptions_'+o);
			}
			
		
			out += '<li class="building-row">\
								<h3>'+lang._T('title_'+o)+' '+expire_msg+'</h3>\
										<div class="buildings-table-image show-info-page-link" style="float:left"  rel="'+o+'"><img src="images/resources/'+o+'.png"></div>\
										<div class="buildings-table-action">\
											'+btn+'\
										</div>\
									<div class="clear"></div>\
									'+descriptions+'\
							</li>';
		});
		
		$('.officers-list').html('<ul>'+out+'</ul>');
			
		return false;
	}
};
