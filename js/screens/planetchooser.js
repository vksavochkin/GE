var PlanetChooser = {
	pageID: '.page-planetchooser',
	onChoose: undefined,

	init: function(){
		// use PlanetChooser.toggle(onChoose) instead!
		$('.page-content').hide();
		$(".planetchooser-source-icon-active").show();
		this.content();
		$(this.pageID).show();
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		$(".planetchooser-source-icon-active").hide();
		Overview.restorePage();
		return false;
	},
	toggle: function(onChoose) {
		if ($(this.pageID).css('display') == 'none') {
			this.onChoose = onChoose;
			return this.init();
		} else {
			return this.close();
		}
	},
	content: function(){
		var _planet = responseObj.state.planets[responseObj.state.user.current_planet];
		var rows = [];

		foreach (responseObj.state.planets_sorted, function(k, pl) {
			var planet_id = parseInt(pl.id);
			var planet_type = parseInt(pl.planet_type);

			var c_planet = responseObj.state.planets[planet_id];
			var is_current = _planet.id == planet_id ? 'planetchooser-current' : '';

			var timer_building = '';
			if(!Check.isEmpty(c_planet.b_building_id)){
				var buildQueStr = c_planet.b_building_id;
				var buildQue = buildQueStr.split(';');
				var curBuild = buildQue[0];
				var buildArr = curBuild.split(',');

				var restTime = parseInt(c_planet.b_building) - parseInt(responseObj.timestamp);
				timer_building = '<div class="construction-label"">'+lang._T('tech_'+buildArr[0])+' ('+buildArr[1]+')'+'</div>\
				    &nbsp;\
					<div class="construction-timer"><div class="js_timer" timer="'+restTime+'|1"></div></div>';
			}

			if (planet_type == 1){
				var dColor = debriesColor(parseInt(c_planet['debries_metal']), parseInt(c_planet['debries_crystal']));
				var status = dColor ? '<div class="status" style="color: '+dColor+'">D</div>' : '';
				//var status2 = (!Check.isEmpty(c_planet['last_activity_update']) ? '<div class="status2">'+c_planet['last_activity_update']+'</div>' : '');
				var moon = c_planet.moon_id > 0 ? '<div class="moon"></div>' : '';

				rows[formatPlanetCoords(c_planet)] = '<div class="cell planet-chooser-choose-link" rel="'+planet_id+'">\
						<div class="galaxy-table-planet">\
							<div class="planet" style="background-image:url(images/planets/'+c_planet['image']+'.png); width: 35px; height: 35px">\
								'+status+'\
								'+moon+'\
							</div>\
						</div>\
					</div>';
				rows[formatPlanetCoords(c_planet)] += '<div class="cell planet-chooser-choose-link '+is_current+'" rel="'+planet_id+'">\
						<div class="planetchooser-planet-label">'+c_planet['name']+' <span class="planetchooser-inline-coords">'+formatPlanetCoords(c_planet)+'</span></div>\
						<div class="planetchooser-construction">'+timer_building+'</div>\
					</div>';

				if (!(c_planet.moon_id > 0)){
					rows[formatPlanetCoords(c_planet)] += '<div class="cell planetchooser-moon-label"></div>';
				}
			}else if (planet_type == 3){
				rows[formatPlanetCoords(c_planet)] += '<div class="cell planet-chooser-choose-link '+is_current+'" rel="'+planet_id+'">\
						<div class="planetchooser-moon-label">'+c_planet['name']+'</div>\
						<div class="planetchooser-construction">'+timer_building+'</div>\
					</div>';
			}
		});

		var page = '';
		foreach (rows, function(row) {
			page += '<div class="row">'+row+'</div>';
		});

		page = '<div class="table">\
				'+page+'\
				<div class="row">\
					<div class="cell" style="width: 50px"></div>\
					<div class="cell" style="width: 50%"></div>\
					<div class="cell" style="width: 50%"></div>\
				</div>\
			</div>';

		var fleet = Overview.countFleet(responseObj.state.fleet, responseObj.state.user.id);
		$('.fleet-counter').html(fleet.own+'/<b>'+fleet.enemy+'</b>');
		$('#planetchooser_scroll').html(page);
	},
	choose: function(planet_id){
		PlanetChooser.onChoose(planet_id);
		return PlanetChooser.close();
	}
};

function formatCoords(g, s, p){
	return '[' + g + ':' + s + ':' + p + ']';
}

function formatPlanetCoords(p){
	return '[' + p.g + ':' + p.s + ':' + p.p + ']';
}
