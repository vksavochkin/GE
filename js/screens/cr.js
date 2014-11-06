 var CR= {
	pageID: '.page-cr-page',
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
		Request.send({object:'action', action:'report', report:rel});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}
		
		$('.page-cr-page').html('<div class="b-main overthrow" id="crScrollPage">\
					<ul>\
						<li style="padding:5px 5px 50px 5px;"><h4 style="text-align:center;margin:0px 0px 5px;">Combat Report</h4><div class="user-profile">'+CR.generateReport(responseObj.actionreport.report)+'</div></li>\
				</ul>\
				<nav class="b-menu">\
					<a class="fr btn" onclick="CR.closePage();">'+lang._T('close')+'</a>\
				</nav>').show();
		makeScroll('crScrollPage');

		
	},
	showSimPage: function(report){
		
		$('.page-cr-page').html('<div class="b-main overthrow" id="crScrollPage">\
					<ul>\
						<li style="padding:5px 5px 50px 5px;"><h4 style="text-align:center;margin:0px 0px 5px;">Combat Report</h4><div class="user-profile">'+CR.generateReport(report)+'</div></li>\
				</ul>\
				<nav class="b-menu">\
					<a class="fr btn" onclick="CR.closePage();">'+lang._T('close')+'</a>\
				</nav>').show();
		makeScroll('crScrollPage');

		
	},
	closePage: function(){
		$('.page-cr-page').hide();
	},
	
	
	// Generate Report Function
	generateReport: function(report){
		var out = '<div class="cr">';
		
		foreach(report.rounds, function(r,round){
			out += '<div class="round round-'+r+'">\
				<div class="round-title" rel="'+r+'" onclick="toggleRound('+r+');return false;">Round '+(parseInt(r)+1)+'</div>\
				<div class="round-content round-content-'+r+'">\
					'+CR.generateUsersRow(round.attackers, true)+'\
					'+CR.generateUsersRow(round.defenders, false)+'\
					'+(!Check.isEmpty(round.text) ? '<div class="cr-round-result">'+CR.generateRoundResult(round.text)+'</div>' : '')+'\
				</div>\
			</div>';
		});
		
		out += '<div class="cr-result">'+CR.generateResult(report.text)+'</div>';
		out += '</div>';
		return out; 
	},
	
	// Generate Table for attachers
	generateUsersRow: function(users, attacker){
		var out = '';
		
		if(attacker == true){
			var title = 'Attacker';
			var _class = 'attacker';
		}else{
			var title = 'Defender';
			var _class = 'defender';
		}
		foreach(users, function(k,u){
			out += '<div class="cr-user-row '+_class+'">';
			out += '<h4 class="cr-user-title">'+u.username+'</h4>';
			
			if(!Check.isEmpty(u['result'])){
				out += '<div class="cr-user-destroyed">'+u.result+'</div>';
			}else{
				var tech = '';
				if(!Check.isEmpty(u.Weapons)){
					tech = '<div class="table">\
						<div class="caption">Technology</div>\
						<div>\
							<div>Weapons</div>\
							<div>'+u.Weapons+'%</div>\
							<div>Shields</div>\
							<div>'+u.Shields+'%</div>\
							<div>Armour</div>\
							<div>'+u.Armour+'%</div>\
						</div>\
					</div>';
				}
				
				
				var fleet = '';
				if(!Check.isEmpty(u.ships)){
					fleet = '<div class="table">\
							<div class="caption">Ships</div>\
							<div class="cr-caption">\
								<div>Type</div>\
								<div>Total</div>\
								<div>Weapons</div>\
								<div>Shields</div>\
								<div>Armour</div>\
							</div>'; 
					foreach(u.ships, function(id,s){
						fleet += '<div>\
								<div>'+s.name+'</div>\
								<div>'+s.amount+'</div>\
								<div>'+s.weapon+'</div>\
								<div>'+s.shield+'</div>\
								<div>'+s.armour+'</div>\
							</div>';
					});
					fleet += '</div>';
				}
				
				out += '<div>'+tech+fleet+'</div>';
			}
			
			out += '</div>';
		});
		
		return out;
	},
	
	
	// Generate Table Round result
	generateRoundResult: function(t){
		var out = '<p>'+(!Check.isEmpty(t.attack_fire) ? t.attack_fire : '')+(!Check.isEmpty(t.defense_absorb) ? '<br/>'+t.defense_absorb : '')+'</p>\
			<p>'+(!Check.isEmpty(t.defense_fire) ? t.defense_fire : '')+(!Check.isEmpty(t.attack_absorb) ? '<br/>'+t.attack_absorb : '')+'</p>';
		
		return out;
	},
	
	
	// Generate Table for Combat result
	generateResult: function(t){
		var out = '<p class="cr-fight-result"><b>'+(!Check.isEmpty(t.result) ? t.result : '')+'</b></p>\
				<p class="cr-attacker-lost">'+(!Check.isEmpty(t.attacker_lost) ? t.attacker_lost : '')+'</p>\
				<p class="cr-defender-lost">'+(!Check.isEmpty(t.defender_lost) ? t.defender_lost : '')+'</p>\
				<p class="cr-debries">'+(!Check.isEmpty(t.debries) ? t.debries : '')+'</p>\
				<p class="cr-moon">'+(!Check.isEmpty(t.moon) ? t.moon : '')+'</p>\
				<p class="cr-moon-destruction">'+(!Check.isEmpty(t.moon_destruction) ? t.moon_destruction : '')+'</p>\
				<p class="cr-moon-destruction-chance">'+(!Check.isEmpty(t.moon_destruction_chance) ? t.moon_destruction_chance : '')+'</p>\
				<p class="cr-rip-destruction">'+(!Check.isEmpty(t.rip_destruction) ? t.rip_destruction : '')+'</p>';
		
		return out;
	}

	
};
