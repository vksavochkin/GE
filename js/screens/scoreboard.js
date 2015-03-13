var Scoreboard= {
	pageID: '#statistics-screen',
	scrollID: 'page_statistic_scroll',
	userID: undefined,
	init: function (uid) {
		this.userID = typeof uid !== 'undefined' ? uid : 0;
		onPage = 'statistics';
		$('.page-content').hide();	
		this.content(uid);
		$(this.pageID).show();
		makeScroll(this.scrollID);
		$('.bar-title h1').html('Scoreboard');
		$('.bar-title span').html('');	
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		destroyScroll(this.scrollID);
		$(this.pageID).empty();
		onPage = 'overview';
		return false;
	},
	content: function(uid){
		this.showStatistics(uid);			
		return false;
	},
	showStatistics: function(uid){
		var uid = typeof uid !== 'undefined' ? uid : (typeof this.userID !== 'undefined' ? this.userID : 0);
		var show = $('.statistic-select-show option:selected').val();
		var by = $('.statistic-select-by option:selected').val();
		var range = $('.statistic-select-rank option:selected').val();
		
		Request.send({'object':'statistic', 'action':show, by:by, range:range, uid:uid});
		if(responseObj.status == 100){

			var my_uid = responseObj.state.user.id;
			var my_ally_id = responseObj.state.user.ally_id;
			$('.statistic-select-rank').html(responseObj['statistic'+show].range);
			if(show == 'ally'){
				var out = '<div class="row">\
								<div class="statistic-table-rank">Rank</div>\
								<div class="statistic-table-name">Name</div>\
								<div class="statistic-table-members">Members</div>\
								<div class="statistic-table-points">Points</div>\
								<div class="statistic-table-per-user">Per User</div>\
							</div>';
				foreach(responseObj.statistically.rows, function(key, m) {
					var my = m.ally_id == my_ally_id ? 'ally' : '';
					out += '<div class="row '+my+'">\
								<div class="statistic-table-rank">'+m.rank+'</div>\
								<div class="statistic-table-name">'+m.ally_name+' ('+m.ally_tag+')</div>\
								<div class="statistic-table-members">'+m.ally_users+'</div>\
								<div class="statistic-table-points">'+prettyNumber(m.points)+'</div>\
								<div class="statistic-table-per-user">'+prettyNumber(m.points_per_user)+'</div>\
							</div>';
				});			
			}else{
				var out = '<div class="row ">\
								<div class="statistic-table-rank">Rank</div>\
								<div class="statistic-table-name">Name</div>\
								<div class="statistic-table-alliance">Alliance</div>\
								<div class="statistic-table-points">Points</div>\
							</div>';
				foreach(responseObj.statisticuser.rows, function(key, m) {
					var my =
						(m.user_id == my_uid) ? 'own' :
						(m.user_id == uid) ? 'target' :
						(m.ally_id == my_ally_id && my_ally_id > 0 ) ? 'ally' : '';
					out += '<div class="row '+my+'">\
								<div class="statistic-table-rank">'+m.rank+'</div>\
								<div class="statistic-table-name">'+m.username+'</div>\
								<div class="statistic-table-alliance">'+m.ally_name+'</div>\
								<div class="statistic-table-points">'+prettyNumber(m.points)+'</div>\
							</div>';
				});	
			}

			$('.statistic-list').html('<ul><li class="table statistic-table">'+out+'</li></ul>');
			makeScroll(Scoreboard.scrollID);
		}else{
			alertify.alert(lang._T(responseObj.error));
		}
		
		return false;
	}
};
