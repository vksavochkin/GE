var Search= {
	pageID: '.page-search',
	scrollID: 'page_search_scroll',
	init: function () {		
		$('.page-content').hide();
		onPage = 'search';	
		$('.bar-title h1').html('Search');
		$('.bar-title span').html('');		
		this.content();
		$(this.pageID).show();
		return false;
		
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(){
	
		return false;
	},
	doSearch: function(){
		var users_search_value = $('#users_search_value').val();		
		var users_search_type = parseInt($('input:radio[name=users_search_type]:checked').val());
		
		if(users_search_type == 2){
			Request.send({'object':'ally', 'action':'search', 'ally_search_value':users_search_value, 'ally_search_type':users_search_type});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				var out = '<ul><li><div class="table">\
					<div>\
						<div><b>'+lang._T('Alliance Name')+'</b></div>\
						<div><b>'+lang._T('Alliance Tag')+'</b></div>\
					</div>';
				foreach(responseObj.allysearch, function(key, m) { 
					out += '<div><div style="padding:10px 5px"><span class="ally-link" rel="'+m.ally_tag+'" onclick="Ally.showPage(\''+m.ally_tag+'\');">'+m.ally_name+'</span></div>\
						<div style="padding:10px 5px"><span class="ally-link" rel="'+m.ally_tag+'" onclick="Ally.showPage(\''+m.ally_tag+'\');">'+m.ally_tag+'</span></div></div>';
				});
				out += '</div></li></ul>';
				$('#page_search_scroll').html(out);
				makeScroll('page_search_scroll');
			}
		}else{
			Request.send({'object':'search', 'action':'search', 'search_value':users_search_value, 'search_type':users_search_type});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				var out = '<ul><li><div class="table">\
					<div>\
						<div><b>'+lang._T('Username')+'</b></div>\
						<div><b>'+lang._T('Position')+'</b></div>\
						<div><b>'+lang._T('Alliance')+'</b></div>\
					</div>';
				foreach(responseObj.searchsearch, function(key, m) { 
					out += '<div>\
								<div style="padding:10px 5px">\
									<span class="user-link" rel="'+m.username+'" onclick="UserInfo.showPage(\''+m.username+'\');">'+m.username+'<br/><small>Rank: '+m.rank+'</small></span>\
								</div>\
								<div style="padding:10px 5px">\
									<span class="galaxy-link" rel="'+m.g+';'+m.s+'" onclick="Galaxy.init('+m.g+', '+m.s+');">['+m.g+':'+m.s+':'+m.p+']</span>\
								</div>\
								<div style="padding:10px 5px">\
									<span class="ally-link" rel="'+m.ally_tag+'" onclick="Ally.showPage(\''+m.ally_tag+'\');">'+m.ally_name+'<br/><small>'+(Check.isEmpty(m.ally_tag) ? '' : 'TAG:')+' '+m.ally_tag+'</small></span>\
								</div>\
							</div>';
				});
				out += '</div></li></ul>';
				$('#page_search_scroll').html(out);
				makeScroll('page_search_scroll');
			}
		}
		
		return false;
	}}
