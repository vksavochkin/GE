var Ally= {
	pageID: '.page-alliance',
	scrollID: 'allyScroll',
	init: function () {
		onPage = 'alliance';
		$('.page-content').hide();
		this.content();
		$('.bar-title h1').html('Alliance');
		$('.bar-title span').html('');
		$(this.pageID).show();
		return false;
		
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(){
		if(parseInt(responseObj.state.user.ally_apply_id) > 0){
			//User without Ally
			$(this.pageID).html('<div class="b-main overthrow" id="allyScroll">\
					<div class="scroll-holder">\
						<div class="clear">\
							<div class="table">\
								<div class="caption">'+lang._T('Already Applied')+'</div>\
								<div><div>\
									'+lang._T('You already applied to '+responseObj.state.user.ally_apply_name+' ('+responseObj.state.user.ally_apply_tag+') ally. Do you like to cancel your application?')+'\
									<br/><center><span class="ally-cancel-apply-register-link">Remove Application.</span></center>\
								</div></div>\
							</div>\
						</div>\
					</div>\
				</div>');
		}else if(parseInt(responseObj.state.user.ally_id) > 0 )	{
			//User with Ally
			var user_rank = defineRank(responseObj.state.user.ally_stat);
			Request.send({'object':'ally', 'action':'show'});
			$(this.pageID).html('<div class="b-main overthrow" style="bottom:38px;" id="allyScroll">\
					<div class="scroll-holder">\
						<div class="clear">\
							<div class="ally-bar table">\
								<div>\
									<div style="text-align:center"><b>'+lang._T('Your Rank')+'</b>: '+user_rank['title']+'</div>\
									<div style="text-align:center"><b>'+lang._T('Members')+'</b>: '+(!Check.isEmpty(responseObj.allyshow) && !Check.isEmpty(responseObj.allyshow.ally_users) ? responseObj.allyshow.ally_users : 'N/A')+'</div>\
								</div>\
							</div>\
							<p class="ally-message">'+(!Check.isEmpty(responseObj.allyshow) && !Check.isEmpty(responseObj.ally_message_inside_coded) ? responseObj.allyshow.ally_message_inside_coded : '')+'</p>\
						</div>\
						<div align="center" style="margin: 10px;">\
							'+(user_rank.rank <= 2 ? '<div class="btn ally-hall-btn">'+lang._T('Settings')+'</div>' : '')+'\
						</div>\
					</div>\
				</div>\
				<nav class="b-menu">\
					<div class="btn fl ally-new-message" style="margin-left:10px;">'+lang._T('Group Message')+'</div>\
					<div class="btn fr ally-plats-link">'+lang._T('Members')+'</div>\
				</nav>\
				');
				$('.bar-title span').html('<b class="ally-init-link">Alliance > '+responseObj.allyshow.ally_name+' ['+responseObj.allyshow.ally_tag+']</b>');
		}else{
			//User without Ally
			$(this.pageID).html('<div class="b-main overthrow" id="allyScroll">\
					<div class="scroll-holder">\
						<div class="clear">\
							<table style="width:100%;">\
								<tbody>\
									<tr><td style="text-align:center">\
										'+lang._T('<br/><br/>Register an Alliance')+'\
									</td></tr>\
									<tr><td align="center">\
										<div class="btn" class="ally-show-register-link">Register an Alliance</div>\
									</td></tr>\
								</tbody>\
							</table><br/><br/>\
							<table style="width:100%;">\
								<tbody>\
									<tr><td style="text-align:center">\
										'+lang._T('Search for Alliances')+'\
									</td></tr>\
									<tr><td align="center">\
										<div class="btn ally-show-search-link">Find an Alliance</div>\
									</td></tr>\
								</tbody>\
							</table>\
						</div>\
					</div>\
				</div>');
		}
		return false;
	},
	showRegister: function(){
		$(this.pageID).html('<div class="b-main overthrow" id="allyScroll">\
					<div class="scroll-holder">\
						<div class="clear">\
							<table width="100%">\
								<thead><tr><th colspan=3>'+lang._T('<br/><br/>Register an Alliance.<p><small>Require 20000 points</small></p>')+'</th></tr></thead>\
								<tbody>\
									<tr><td style="text-align:center" colspan=3>\
										'+lang._T('Alliance Name:')+'<br/>\
										<input type="text" id="ally_register_name"/><br/>\
										<small>(2-22 characters)</small>\
									</td></tr>\
									<tr><td style="text-align:center" colspan=3>\
										'+lang._T('<br/>Alliance Tag:')+'<br/>\
										<input type="text" id="ally_register_tag"/><br/>\
										<small>(2-8 characters)</small>\
									</td></tr>\
									<tr><td align="center" colspan=3 style="padding:10px 0px;">\
										<div class="btn ally-do-register-ally">Register a Alliance</div>\
									</td></tr>\
								</tbody>\
							</table>\
						</div>\
					</div>\
				</div>\
				<nav class="b-menu">\
					<div class="fr btn ally-init-link">'+lang._T('Back')+'</div>\
				</nav>');		
		return false;
	},
	doRegister: function(){
		var ally_register_name = $('#ally_register_name').val();
		var ally_register_tag = $('#ally_register_tag').val();		
		
		var ck_name = /^[A-Za-z0-9_ ]{2,22}$/;
		var ck_tag = /^[A-Za-z0-9_ ]{2,8}$/;
		
		if(!ck_name.test(ally_register_name)){
			alertify.alert(lang._T('Alliance name is incorrect. Please make sure you do not use any special characters.'));
		}else if(!ck_tag.test(ally_register_tag)){
			alertify.alert(lang._T('Alliance tag is incorrect. Please make sure you do not use any special characters.'));
		}else{
			Request.send({'object':'ally', 'action':'register', 'ally_register_name':ally_register_name, 'ally_register_tag':ally_register_tag});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				Ally.init();
			}
		}
		return false;
	},
	deleteAlly: function(){
		alertify.confirm(lang._T('Are you sure you want to delete Alliance?'), function (e) {
		    if (e) {
		        Request.send({'object':'ally', 'action':'delete'});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{			
					Ally.init();
				}
		    } else {
		        // user clicked "cancel"
		    }
		});
	},
	showSearch: function(){
		$(this.pageID).html('<div class="ally-search"><div class="ally-search-content">\
								<b>'+lang._T('Search by')+'</b>\
								<label class="fl"><input type="radio" name="ally_search_type" value="1" checked="checked"/>'+lang._T('Alliance name')+'</label>\
								<label class="fl"><input type="radio" name="ally_search_type" value="2"/>'+lang._T('Alliance tag')+'</label><br/><br/>\
								<input type="text" id="ally_search_value" class="ally_search_value"/>\
								<div class="btn ally-do-search-ally-link">Search</div>\
							</div></div>\
				<div class="b-main overthrow" id="allyScroll" style="top:66px;">\
					<ul>\
						<li class="clear">\
							<div id="ally_search_result" style="display:block;clear:both;"></div>\
							<br/><br/>\
						</li>\
					</ul>\
				</div>\
				<nav class="b-menu">\
					<div class="btn fr ally-init-link">'+lang._T('Back')+'</div>\
				</nav>');
				
		$('.bar-title span').html('<b class="ally-init-link">Alliance</b> > Search Alliance');
		return false;
	},
	doSearchAlly: function(){
		var ally_search_value = $('#ally_search_value').val();		
		var ally_search_type = $('input:radio[name=ally_search_type]:checked').val();
		
		Request.send({'object':'ally', 'action':'search', 'ally_search_value':ally_search_value, 'ally_search_type':ally_search_type});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{
			var out = '<div class="table">\
				<div>\
					<div><b>'+lang._T('Alliance Name')+'</b></div>\
					<div><b>'+lang._T('Alliance Tag')+'</b></div>\
				</div>';
			foreach(responseObj.allysearch, function(key, m) { 
				out += '<div><div style="padding:10px 5px"><span class="ally-link" rel="'+m.ally_tag+'">'+m.ally_name+'</span></div>\
					<div style="padding:10px 5px"><span class="ally-link" rel="'+m.ally_tag+'">'+m.ally_tag+'</span></div></div>';
			});
			out += '</div>';
			$('#ally_search_result').html(out);
		}
		return false;
	},
	Plats: function(){
		var user_rank = defineRank(responseObj.state.user.ally_stat);
		Request.send({'object':'ally', 'action':'plats'});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				var table = '';
				var table2 = '';
				var s = responseObj.allyplats.ranks;
				var ranks = s.split(';');
				
				foreach(responseObj.allyplats, function(key, r) { 
					if(key != 'ranks'){
						if(parseInt(r.ally_id) > 0){
							var rank = defineRank(r.ally_stat);						
							var ranks_table = '';			
							foreach(ranks, function(key, ur) { 
								var rank = defineRank(ur);
								if(rank['rank'] == r.ally_rank){
									ranks_table += '<option value="'+rank['rank']+';'+r.username+';'+rank['title']+'" selected="selected">'+rank['title']+'</option>';
								}else{
									ranks_table += '<option value="'+rank['rank']+';'+r.username+';'+rank['title']+'">'+rank['title']+'</option>';
								}		
							});
							if(rank['rank'] >1){
								ranks_table += '<option value="delete_user;'+r.username+'">'+lang._T('Delete')+'</option>';
							}
							
							if(!Check.isEmpty(ranks_table)){
								ranks_table = '<select class="ranks_table">'+ranks_table+'</select>';
							}
							
							if(user_rank.rank >2){
								ranks_table = rank.title;
							}
							
							table2 += '<div>\
									<div><span rel="'+r.username+'" class="user-link">'+r.username+'</span></div>\
									<div>'+ranks_table+'</div>\
								</div>';
						}else{
							table += '<div><div><span class="userinfo-show-page-link" rel="'+r.username+'">'+r.username+'</span><br/>'+r.ally_apply_text+'<br/><div class="fl btn ally-plats-decline-link" rel="'+r.username+'">'+lang._T('Decline')+'</div><div class="fr btn ally-plats-accept-link" rel="'+r.username+'">'+lang._T('Accept')+'</div></div></div>';
						}
					}		
				});
				
				if(Check.isEmpty(table)){
					table = '<div><div>'+lang._T('You don\'t have any applications right now.')+'</div></div>';
				}
				
				table = '<div class="table">\
									<div class="caption">'+lang._T('Applications')+'</div>\
									'+table+'\
								</div>';
				
				if(user_rank.rank > 2){
					table = '';
				}
								
				$(this.pageID).html('<div class="b-main overthrow" id="allyScroll">\
						<div class="scroll-holder">\
							<div class="clear">\
								'+table+'\
								<div class="table">\
									<div class="caption">'+lang._T('Alliance Members')+'</div>\
									'+table2+'\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="b-menu">\
						<div class="fl btn ally-quit-link" style="margin-left:10px;">'+lang._T('Quit Ally')+'</div>\
						<div class="fr btn ally-init-link">'+lang._T('Back')+'</div>\
					</div>');
				$(".ranks_table").change(function(){
					var change_data = $(this).val();
					var change_data_array = change_data.split(';');
					if(change_data_array[0] =='delete_user'){
						alertify.confirm(lang._T('Are you sure you want to delete user <b>'+change_data_array[1]+'</b> from Alliance?'), function (e) {
						    if (e) {
						        Request.send({'object':'ally', 'action':'delete_user', 'u':change_data_array[1]});
								if(responseObj.status != 100){
									alertify.alert(lang._T(responseObj.error));
									return false;
								}else{			
									alertify.alert(lang._T('User was deleted.'));
									Ally.Plats();
								}
						    } else {
						        // user clicked "cancel"
						    }
						});
						
					}else{
						alertify.confirm(lang._T('Are you sure you want to change rank for <b>'+change_data_array[1]+'</b> to <b>'+change_data_array[2]+'</b>?'), function (e) {
						    if (e) {
						        Request.send({'object':'ally', 'action':'changerank', 'rank_id':change_data_array[0], 'u':change_data_array[1]});
								if(responseObj.status != 100){
									alertify.alert(lang._T(responseObj.error));
									return false;
								}else{			
									alertify.alert(lang._T('User rank was changed.'));
								}
						    } else {
						        // user clicked "cancel"
						    }
						});
					}	
					return false;
				});	
				return false;
			}
		return false;
	},
	PlatsDecline: function(username){
		
		if(Check.isEmpty(username)){
			alertify.alert(lang._T('Username is empty.'));
		}else{
			Request.send({'object':'ally', 'action':'plats-decline', 'u':username});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				Ally.Plats();
			}
		}
		return false;
	},
	PlatsAccept: function(username){
		
		if(Check.isEmpty(username)){
			alertify.alert(lang._T('Username is empty.'));
		}else{
			Request.send({'object':'ally', 'action':'plats-accept', 'u':username});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				Ally.Plats();
			}
		}
		return false;
	},
	quit: function(){
		
		alertify.confirm(lang._T('Are you sure you want to leave alliance?'), function (e) {
		    if (e) {
		        Request.send({'object':'ally', 'action':'quit'});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{			
					Ally.init();
				}
		    } else {
		        // user clicked "cancel"
		    }
		});

	},
	hall: function(){
		Request.send({'object':'ally', 'action':'show'});
		$(this.pageID).html('<div class="b-label">'+lang._T('Throne Hall:')+'</div>\
				<div class="b-main overthrow" id="allyScroll">\
					<div class="scroll-holder">\
						<div class="clear" style="padding-bottom:50px;">\
							<div class="table">\
								<div class="caption">'+lang._T('Alliance Information:')+'</div>\
									<div><div>\
										'+lang._T('Alliance Name:')+'<br/>\
										<input type="text" id="ally_register_name" value="'+responseObj.allyshow.ally_name+'"/><br/>\
										<small>(2-22 characters)</small>\
									</div></div>\
									<div><div>\
										'+lang._T('Alliance Tag:')+'<br/>\
										<input type="text" id="ally_register_tag" value="'+responseObj.allyshow.ally_tag+'"/><br/>\
										<small>(2-8 characters)</small>\
									</div></div>\
									<div><div>'+lang._T('Message to Members:')+'<br/>\
									<textarea id="ally_message_inside" style="height:100px;">'+responseObj.allyshow.ally_message_inside+'</textarea></div></div>\
									<div><div>'+lang._T('Alliance Information:')+'<br/>\
									<textarea id="ally_message_outside" style="height:100px;">'+responseObj.allyshow.ally_message_outside+'</textarea></div></div>\
									<div><div>\
										<div class="btn fr ally-save-hall-link">Save</div>\
									</div></div>\
									'+(parseInt(responseObj.state.user.ally_rank) != 1 ? '' :'<div><div align="center">\
										<div class="btn ally-delete-ally-link">Delete a Alliance</div>\
									</div></div> ')+'\
							</div>\
						</div>\
					</div>\
				</div>\
				<nav class="b-menu">\
					<div class="fl btn ally-rights-link">'+lang._T('Rights')+'</div>\
					<div class="fr btn ally-init-link">'+lang._T('Back')+'</div>\
				</nav>');
		return false;
	},
	saveHall: function(){
		var ally_register_name = $('#ally_register_name').val();
		var ally_register_tag = $('#ally_register_tag').val();
		var ally_message_inside = $('#ally_message_inside').val();
		var ally_message_outside = $('#ally_message_outside').val();
		
		var ck_name = /^[A-Za-z0-9_ ]{2,22}$/;
		var ck_tag = /^[A-Za-z0-9_ ]{2,8}$/;
		
		if(!ck_name.test(ally_register_name)){
			alertify.alert(lang._T('Alliance name is incorrect. Please make sure you do not use any special characters.'));
		}else if(!ck_tag.test(ally_register_tag)){
			alertify.alert(lang._T('Alliance tag is incorrect. Please make sure you do not use any special characters.'));
		}else{
			Request.send({'object':'ally', 'action':'savehall', 'ally_register_name':ally_register_name, 'ally_register_tag':ally_register_tag, 'ally_message_inside':ally_message_inside, 'ally_message_outside':ally_message_outside});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				alertify.alert(lang._T('Information was successfully updated.'));
			}
		}
		return false;
	},	
	rightsScreen: function(){
		Request.send({'object':'ally', 'action':'show'});
		var s = responseObj.allyshow.ally_ranks;
		var ranks = s.split(';');
		var ranks_table = '';
		/*var ranks_table = '<div class="accordion">\
				<li>\
			        <h3>Alliance Leader</h3>\
					<div>Full access.</div>\
				</li>\
				<li>\
			        <h3>Deputy Leader</h3>\
					<div>Full access to manage Alliance exept ability to delete Alliance.</div>\
				</li>\
				<li>\
			        <h3>Recruit</h3>\
					<div>Very basic rights.</div>\
				</li>';*/
			
		foreach(ranks, function(key, r) { 
			var rank = defineRank(r);
			//if(rank['rank'] > 3){
				ranks_table += '<div class="accordionButton"><h3>'+rank['title']+' <small>'+(rank['rank'] == 1 ? '(Leader)' : '')+''+(rank['rank'] == 2 ? '(Deputy Leader)' : '')+'</small></h3></div>\
					<div class="accordionContent">\
						<div class="table">\
							<div>\
								<div>Rank Name:</div>\
								<div><input type="text" name="ranks-'+rank['rank']+'-name" value="'+rank['title']+'"></div>\
							</div>\
							<!--<div>\
								<div>Manage Users</div>\
								<div>\
									'+(rank['rank'] <= 3 ? (rank['plats'] == 0 ? 'No' : 'Yes') : '\
										<select class="ranks-'+rank['rank']+'-plats">\
											<option value="0" '+(rank['plats'] == 0 ? 'selected="selected"' : '')+'>No</option>\
											<option value="1" '+(rank['plats'] == 1 ? 'selected="selected"' : '')+'>Yes</option>\
										</select>\
									')+'\
								</div>\
							</div>\
							<div>\
								<div>Edit Settings</div>\
								<div>\
									'+(rank['rank'] <= 3 ? (rank['hall'] == 0 ? 'No' : 'Yes') : '\
										<select class="ranks-'+rank['rank']+'-hall">\
											<option value="0" '+(rank['hall'] == 0 ? 'selected="selected"' : '')+'>No</option>\
											<option value="1" '+(rank['hall'] == 1 ? 'selected="selected"' : '')+'>Yes</option>\
										</select>\
									')+'\
								</div>\
							</div>\
							<div>\
								<div>Manage Ranks</div>\
								<div>\
									'+(rank['rank'] <= 3 ? (rank['ranks'] == 0 ? 'No' : 'Yes') : '\
										<select class="ranks-'+rank['rank']+'-ranks">\
											<option value="0" '+(rank['ranks'] == 0 ? 'selected="selected"' : '')+'>No</option>\
											<option value="1" '+(rank['ranks'] == 1 ? 'selected="selected"' : '')+'>Yes</option>\
										</select>\
									')+'\
								</div>\
							</div>-->\
							<div>\
								<div></div>\
								<div>'+(rank['rank'] > 3 ? '<div class="btn fl ally-relete-rank-link" rel="'+rank['rank']+'">'+lang._T('Delete Rank')+'</div>' : '')+'<div class="fr btn ally-save-rank-link" rel="'+rank['rank']+'">'+lang._T('Save Rank')+'</div></div>\
							</div>\
						</div>\
					</div>';
		});
		ranks_table += '<div class="accordionButton"><h3>'+lang._T('Add new rank')+'</h3></div>\
					<div class="accordionContent" style="display:block;">\
						<div class="table">\
							<div>\
								<div>Rank Name:</div>\
								<div><input type="text" name="ranks-name" value=""></div>\
							</div>\
							<!--<div>\
								<div>Manage Users</div>\
								<div>\
									<select class="ranks-plats">\
										<option value="0">No</option>\
										<option value="1">Yes</option>\
									</select>\
								</div>\
							</div>\
							<div>\
								<div>Edit Settings</div>\
								<div>\
									<select class="ranks-hall">\
										<option value="0">No</option>\
										<option value="1">Yes</option>\
									</select>\
								</div>\
							</div>\
							<div>\
								<div>Manage Ranks</div>\
								<div>\
									<select class="ranks-ranks">\
										<option value="0">No</option>\
										<option value="1">Yes</option>\
									</select>\
								</div>\
							</div>-->\
							<div>\
								<div></div>\
								<div><div class="btn fr ally-add-rank-link">'+lang._T('Add Rank')+'</div></div>\
							</div>\
						</div>\
					</div>';
		$(this.pageID).html('<div class="b-label">'+lang._T('Throne Hall:')+'</div>\
				<div class="b-main overthrow" id="allyScroll">\
					<div class="scroll-holder">\
						<div class="clear">\
							<table width="100%">\
								<thead><tr><th colspan=3>'+lang._T('Manage Rights:')+'</th></tr></thead>\
								<tbody>\
									<tr><td colspan=3>\
										<h3>'+lang._T('Ranks:')+'</h3>\
										'+ranks_table+'\
									</td></tr>\
								</tbody>\
							</table>\
						</div>\
					</div>\
				</div>\
				<nav class="b-menu">\
					<div class="fr btn ally-hall-link">'+lang._T('Back')+'</div>\
				</nav>');
		
		
		return false;
	},
	addRank: function(){
		var rank_name = $('input[name=ranks-name]').val();
		var rank_plats = $('.ranks-plats option:selected').val();
		var rank_hall = $('.ranks-hall option:selected').val();
		var rank_ranks = $('.ranks-ranks option:selected').val();
		var rank_embasy = $('.ranks-embasy option:selected').val();
		var rank_workshop = $('.ranks-workshop option:selected').val();

		var ck_name = /^[A-Za-z0-9_ ]{2,22}$/;
		
		if(!ck_name.test(rank_name)){
			alertify.alert(lang._T('Rank name is incorrect. Please make sure you do not use any special characters.'));
		}else{
			Request.send({'object':'ally', 'action':'addrank', 'rank_name':rank_name, 'rank_plats':rank_plats, 'rank_hall':rank_hall, 'rank_ranks':rank_ranks, 'rank_embasy':rank_embasy, 'rank_workshop':rank_workshop});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				Ally.rightsScreen();
				alertify.alert(lang._T('Information was successfully updated.'));
			}
		}
		return false;
	},
	saveRank: function(id){
		var rank_name = $('input[name=ranks-'+id+'-name]').val();
		var rank_plats = $('.ranks-'+id+'-plats option:selected').val();
		var rank_hall = $('.ranks-'+id+'-hall option:selected').val();
		var rank_ranks = $('.ranks-'+id+'-ranks option:selected').val();
		var rank_embasy = $('.ranks-'+id+'-embasy option:selected').val();
		var rank_workshop = $('.ranks-'+id+'-workshop option:selected').val();

		var ck_name = /^[A-Za-z0-9_ ]{2,22}$/;
		
		if(!ck_name.test(rank_name)){
			alertify.alert(lang._T('Rank name is incorrect. Please make sure you do not use any special characters.'));
		}else{
			Request.send({'object':'ally', 'action':'saverank', 'rank_id':id, 'rank_name':rank_name, 'rank_plats':rank_plats, 'rank_hall':rank_hall, 'rank_ranks':rank_ranks, 'rank_embasy':rank_embasy, 'rank_workshop':rank_workshop});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				Ally.rightsScreen();
				alertify.alert(lang._T('Information was successfully updated.'));
			}
		}
		return false;
	},
	deleteRank: function(id){
		
		if(parseInt(id) <= 3){
			alertify.alert(lang._T('This rank can\'t be deleted'));
		}else{
			Request.send({'object':'ally', 'action':'deleterank', 'rank_id':id});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				Ally.rightsScreen();
				alertify.alert(lang._T('Rank was successfully deleted.'));
			}
		}
		return false;
	},
	showPage: function(rel){
		Request.send({'object':'ally', 'action':'showinfo', 'tag':rel});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}
		
		var members = '';
		foreach(responseObj.allyshowinfo.members, function(key, m) { 
			var user_rank = defineRank(m.ally_stat);
			members += '<div><div><span class="userinfo-show-page-link" rel="'+m.username+'">'+m.username+'</span></div><div align="right">'+user_rank['title']+'</div></div>';
		});
		
		var apply = '';
		if( parseInt(responseObj.state.user.ally_id)<1){
			if(parseInt(responseObj.state.user.ally_apply_id) < 1){// Show Apply form
				apply = '<div class="table">\
							<div class="caption">'+lang._T('Apply')+'</div>\
							<div><div>\
								'+lang._T('Message:')+'<br/><textarea name="apply_ally_text" id="apply_ally_text" style="height:80px;width:95%;"></textarea>\
								<br/><div class="fr btn ally-apply-link" style="margin-top:10px;">'+lang._T('Apply')+'</div>\
							</div></div>\
						</div>';
			}else if(parseInt(responseObj.state.user.ally_apply_id) == parseInt(responseObj.allyshowinfo.ally_id)){// Show Already applied this Alliance
				apply = '<div class="table">\
							<div class="caption">'+lang._T('Already Applied:')+'</div>\
							<div><div>\
								'+lang._T('You already applied to this Alliance. Do you like to cancel your application?')+'\
								<br/><center><span class="ally-cancel-apply">Remove Application.</span></center>\
							</div></div>\
						</div>';
			}else{// Show already applied to another Alliance
				apply = '<div class="table">\
							<div class="caption">'+lang._T('Already Applied')+'</div>\
							<div><div>\
								'+lang._T('You already applied to '+responseObj.state.user.ally_apply_name+' ('+responseObj.state.user.ally_apply_tag+') Alliance. Do you like to cancel your application?')+'\
								<br/><center><span class="ally-cancel-apply">Remove Application.</span></center>\
							</div></div>\
						</div>';
			}
			
		}
		
		var message = '<p class="ally-message">'+responseObj.allyshowinfo.ally_message_outside_coded+'</p>\
						<div class="table">\
							<div class="caption">'+lang._T('Alliance Members ('+responseObj.allyshowinfo.ally_users+'):')+'</div>\
							<div><div>'+lang._T('Name')+'</div><div>'+lang._T('Rank')+'</div></div>\
							'+members+'\
						</div>\
						'+apply+'';
		
		Overview.resetModals();
		$('.page-alliance-page').html('<div class="b-main overthrow" id="allyScrollPage">\
		        <input type="hidden" value="'+responseObj.allyshowinfo.ally_tag+'" class="ally-apply-hidden-tag">\
				<ul>\
					<li style="padding:5px 5px 50px 5px;">\
						<h3 style="text-align:center;">'+responseObj.allyshowinfo.ally_name+' ['+responseObj.allyshowinfo.ally_tag+']</h3>\
						'+message+'\
					</li>\
					\
				</ul>\
				</div>\
				<nav class="b-menu">\
					<div class="fr btn ally-close-page-link">'+lang._T('close')+'</div>\
				</nav>').show().css('z-index','1');
		return false;

		
	},
	closePage: function(){
		$('.page-alliance-page').hide();
	}
};


 var AllyP= {
	pageID: '#ally-info-screen',
	scrollID: 'allyInfoScroll',
	init: function (tag) {		
		if(Check.isEmpty(tag)){
			return false;
		}		
		Request.send({'object':'ally', 'action':'showinfo', 'tag':tag});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}
		$('#user-info-screen').css('z-index', '6');
		$('#ally-info-screen').css('z-index', '7');
		this.content(tag);
		$(this.pageID).show();
		return false;
	},
	close: function(){
		$(this.pageID).hide().empty();
		$('#content').removeClass('building');
		return false;
	},
	content: function(){
		var members = '';
		foreach(responseObj.allyshowinfo.members, function(key, m) { 
			var user_rank = defineRank(m.ally_stat);
			members += '<tr><td><span class="userinfo-show-page-link" rel="'+m.username+'"><b class="icon i-race'+m.race+m.gender+'"></b>'+m.username+'</span></td><td align="right">'+user_rank['title']+'</td></tr>';
		});
		
		var apply = '';
		if( parseInt(responseObj.state.user.ally_id)<1 && parseInt(responseObj.allyshowinfo.ally_race) == parseInt(responseObj.state.user.race)){
			if(parseInt(responseObj.state.user.ally_apply_id) < 1){// Show Apply form
				apply = '<table width="100%">\
							<thead><tr><th colspan=2>'+lang._T('Apply:')+'</th></tr></thead>\
							<tbody>\
								<tr><td colspan=2>\
									'+lang._T('Message:')+'<br/><textarea name="apply_ally_text" id="apply_ally_text" style="height:150px;">Username: '+responseObj.state.user.username+'\r\
Level: '+responseObj.state.user.level+'\r\
Glory: '+(parseInt(responseObj.state.user.glory) + parseInt(responseObj.state.user.glory_positive) - parseInt(responseObj.state.user.glory_negative))+'\r\
</textarea>\
									<br/><div class="fr btn ally-apply-link">'+lang._T('Apply')+'</div>\
									</td></tr>\
							</tbody>\
						</table>';
			}else if(parseInt(responseObj.state.user.ally_apply_id) == parseInt(responseObj.allyshowinfo.ally_id)){// Show Already applied this Alliance
				apply = '<table width="100%">\
							<thead><tr><th colspan=2>'+lang._T('Already Applied')+'</th></tr></thead>\
							<tbody>\
								<tr><td colspan=2>\
									'+lang._T('You already applied to this Alliance. Do you like to cancel your application?')+'\
									<br/><center><span class="ally-cancel-apply">Remove Application.</span></center>\
									</td></tr>\
							</tbody>\
						</table>';
			}else{// Show already applied to another Alliance
				apply = '<table width="100%">\
							<thead><tr><th colspan=2>'+lang._T('Already Applied')+'</th></tr></thead>\
							<tbody>\
								<tr><td colspan=2>\
									'+lang._T('You already applied to '+responseObj.state.user.ally_apply_name+' ('+responseObj.state.user.ally_apply_tag+') Alliance. Do you like to cancel your application?')+'\
									<br/><center><span class="ally-cancel-apply">Remove Application.</span></center>\
									</td></tr>\
							</tbody>\
						</table>';
			}
			
		}
		
		$(this.pageID).html('<h1><span>'+lang._T('Alliance')+'</span></h1>\
				<div class="b-main" id="allyInfoScroll">\
					<div class="scroll-holder">\
						<table width="100%">\
							<thead><tr><th colspan=2>'+responseObj.allyshowinfo.ally_name+'</th></tr></thead>\
							<tbody>\
								<tr><td>'+lang._T('Alliance Tag:')+'</td><td>'+responseObj.allyshowinfo.ally_tag+'</td></tr>\
								<tr><td>'+lang._T('Glory:')+'</td><td>'+responseObj.allyshowinfo.ally_glory+'</td></tr>\
								<tr><td>'+lang._T('Members:')+'</td><td>'+responseObj.allyshowinfo.ally_users+'</td></tr>\
								<tr><td colspan=2>\
									<br/>\
									'+responseObj.allyshowinfo.ally_message_outside_coded+'\
									<br/>\
								</td></tr>\
							</tbody>\
						</table>\
						<table width="100%">\
							<thead><tr><th colspan=2>'+lang._T('Alliance Members:')+'</th></tr></thead>\
							<tbody>\
								<tr><td>'+lang._T('Name')+'</td><td>'+lang._T('Rank')+'</td></tr>\
								'+members+'\
							</tbody>\
						</table><br/><br/>\
						'+apply+'\
					</div>\
				</div>\
				<nav class="b-menu">\
					<div class="fr btn ally-close-link">'+lang._T('Close')+'</div>\
				</nav>');	
		return false;
	},
	apply: function(){
		var ally_apply_text = $('#apply_ally_text').val();
		var ally_apply_tag = $('.ally-apply-hidden-tag').val();
		
		Request.send({'object':'ally', 'action':'apply', 'ally_apply_text':ally_apply_text, 'tag':ally_apply_tag});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{
			Ally.showPage(ally_apply_tag);
		}
		return false;
	},
	cancelApply: function(){	
		var ally_apply_tag = responseObj.allyshowinfo.ally_tag;	
		alertify.confirm(lang._T('Are you sure you want to cancel you application?'), function (e) {
		    if (e) {
		        Request.send({'object':'ally', 'action':'cancelapply'});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{			
					Ally.showPage(ally_apply_tag);
				}
		    } else {
		        // user clicked "cancel"
		    }
		});

		return false;
	},
	cancelApplyRegister: function(){	
		alertify.confirm(lang._T('Are you sure you want to cancel you application?'), function (e) {
		    if (e) {
		        Request.send({'object':'ally', 'action':'cancelapply'});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{			
					Ally.init();
				}
		    } else {
		        // user clicked "cancel"
		    }
		});
		return false;
	}
}	


function defineRank(s){
	if(Check.isEmpty(s)){
		s = 'Undefined:3:0:0:0:0:0:0:0';
	}
	
	var array = s.split(':');
	var result = [];
	
	result['title'] = array[0];
	result['rank'] = parseInt(array[1]);
	result['plats'] = parseInt(array[2]);
	result['hall'] = parseInt(array[3]);
	result['ranks'] = parseInt(array[4]);
	result['embasy'] = parseInt(array[5]);
	result['workshop'] = parseInt(array[6]);
	result['var1'] = parseInt(array[7]);
	result['var2'] = parseInt(array[8]);
	
	return result;
	
}
