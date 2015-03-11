 var Empire= {
	pageID: '.page-empire',
	init: function () {
		$('.page-content').hide();
		onPage = 'empire';
		
		Modal.close();
			
		$('.bar-title h1').html('Empire');
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
		
		var out = '';
		
		
		foreach (responseObj.state.planets_sorted, function(k, p){
			var planet_id = parseInt(p.id);
			var planet_type = parseInt(p.planet_type);			
			
			if(planet_type == 1){
    			var c_planet = responseObj.state.planets[planet_id];
    			var c_moon = false;
    			var moon_row = '';
    			if(parseInt(c_planet.moon_id) > 0){
        			c_moon = responseObj.state.planets[ c_planet.moon_id ];
        			
        			moon_row += '<div class="row full" rel="'+c_planet.moon_id+'">\
            						<div class="empire-table-planet">\
            							<div class="planet" style="background-image:url(images/planets/'+c_moon['image']+'.png);"></div>\
            						</div>\
            						<div class="empire-table-info">\
            						    <p>'+c_moon['name']+' ['+c_moon['g']+':'+c_moon['s']+':'+c_moon['p']+']</p>\
                                        <div class="empire-planet-production">\
                                            \
                                        </div>\
                                    </div>\
            					</div>';
        			
    			}
    			
    			BuildList = '';
        		if (!Check.isEmpty(c_planet.b_tech_id)){
        			BuildTime  = parseInt(c_planet.b_tech) - parseInt(responseObj.timestamp);
        			ElementTitle = lang._T('tech_'+c_planet.b_tech_id);
        			BuildLevel = parseInt(user[c_planet.b_tech_id]) +1;								
        			BuildList = '<div class="table buildings-table-timer"><div class="row">\
        										<div rel="'+c_planet.b_tech_id+'" class="buildings-table-timer-image"><img src="images/resources/'+c_planet.b_tech_id+'.png"></div>\
        										<div class="buildings-table-timer-description">\
        											'+ ElementTitle +' '+ BuildLevel+'<br/>\
        											\
        										</div>\
        										<div class="buildings-table-timer-timer">\
        											<div id="blc" class="js_timer" timer="'+BuildTime+'|1"></div>\
        										</div>\
        									</div>\
        								</div>';
        			
        		}
        		
    			
    			out = '<div class="row full" rel="'+planet_id+'">\
    						<div class="empire-table-planet">\
    							<div class="planet" style="background-image:url(images/planets/'+c_planet['image']+'.png);"></div>\
    						</div>\
    						<div class="empire-table-info">\
    						    <p>'+c_planet['name']+' ['+c_planet['g']+':'+c_planet['s']+':'+c_planet['p']+']</p>\
                                <div class="empire-planet-production">\
                                    '+BuildList+'\
                                </div>\
                                '+moon_row+'\
                            </div>\
    					</div>';
    			
			}
			
		});
	
		
		
		$('.empire-list').html('<ul><li><div class="table empire-table">'+out+'</div></li></ul>');	
		return false;
	}
};


//timezones object
var timezone_array = {
	'-14400' : 'GMT-12:00',
	'-10800' : 'GMT-11:00',
	'-7200' : 'GMT-10:00',
	'-3600' : 'GMT-9:00',
	'0' : 'GMT-8:00',
	'3600' : 'GMT-7:00',
	'7200' : 'GMT-6:00',
	'10800' : 'GMT-5:00',
	'14400' : 'GMT-4:00',
	'18000' : 'GMT-3:00',
	'21600' : 'GMT-2:00',
	'25200' : 'GMT-1:00',
	'28800' : 'GMT',
	'32400' : 'GMT+1:00',
	'36000' : 'GMT+2:00',
	'39600' : 'GMT+3:00',
	'43200' : 'GMT+4:00',
	'-43200' : 'GMT+5:00',
	'-39600' : 'GMT+6:00',
	'-36000' : 'GMT+7:00',
	'-32400' : 'GMT+8:00',
	'-28800' : 'GMT+9:00',
	'-25200' : 'GMT+10:00',
	'-21600' : 'GMT+11:00',
	'-18000' : 'GMT+12:00'
};
