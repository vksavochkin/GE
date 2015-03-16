 var Settings= {
	pageID: '.page-settings',
	init: function () {
		$('.page-content').hide();
		onPage = 'settings';
		
		Modal.close();
			
		$('.bar-title h1').html('Settings');
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
		
		var colors_list = '';
		var timezones_list = '';
		var vacation = '';
		
		var timezone_count = 0;
		foreach(timezone_array, function(k,v){
			if(k == user.timezone){
				timezones_list += '<option value="'+timezone_count+'" selected="selected">'+v+'</option>';
			}else{
				timezones_list += '<option value="'+timezone_count+'">'+v+'</option>';
			}
			timezone_count++;
		});
		
		foreach(colors_array, function(k,v){
			if(k == user.chat_color){
				colors_list += '<option value="'+k+'" selected="selected">'+v+'</option>';
			}else{
				colors_list += '<option value="'+k+'">'+v+'</option>';
			}
		});
		
		if(parseInt(user.vacation) > 0){
			if(parseInt(user.vacation_time) > 0){
				vacation = '<div class="js_timer" timer="'+user.vacation_time+'|1"></div>';
			}else{
				vacation = '<div class="settings-vacation-stop">Exit</div>';
			}
		}else{
			vacation = '<div class="settings-vacation-start">Enable</div>';
		}
		
		var out = '<ul>\
					<li class="settings-row">\
						<div class="title-blue">Change Username</div>\
						<div class="table settings-table">\
							<div class="row">\
								<div class="settings-table-title">Username<br/><span style="color:red">Paid Service! Username change will cost you 1000 Dark Matter.<span></div>\
								<div class="settings-table-action">\
									<input type="text" value="'+user.username+'\" name="settings-username" class="settings-username"/>\
								</div>\
							</div>\
						</div>\
						<div class="title-blue">Change Password</div>\
						<div class="table settings-table">\
							<div class="row">\
								<div class="settings-table-title">Old Password</div>\
								<div class="settings-table-action">\
									<input type="password" value="" name="settings-password" class="settings-password"/>\
								</div>\
							</div>\
							<div class="row">\
								<div class="settings-table-title">New Password (min. 8 characters)</div>\
								<div class="settings-table-action">\
									<input type="password" value="" name="settings-new-password" class="settings-new-password"/>\
								</div>\
							</div>\
							<div class="row">\
								<div class="settings-table-title">New Password (repeat)</div>\
								<div class="settings-table-action">\
									<input type="password" value="" name="settings-new-password2" class="settings-new-password2"/>\
								</div>\
							</div>\
						</div>\
						<div class="title-blue">Change Email</div>\
						<div class="table settings-table">\
							<div class="row">\
								<div class="settings-table-title">Email Address</div>\
								<div class="settings-table-action">\
									<input type="email" value="" name="settings-email" class="settings-email"/>\
								</div>\
							</div>\
							<div class="row">\
								<div class="settings-table-title">Current Email</div>\
								<div class="settings-table-action">\
									'+user.email_current+'\
								</div>\
							</div>\
							<div class="row">\
								<div class="settings-table-title">Permanent Email Address</div>\
								<div class="settings-table-action">\
									'+user.email_registration+'\
								</div>\
							</div>\
						</div>\
						<!--<div class="title-blue">General Options</div>\
						<div class="table settings-table">\
							<div class="row">\
								<div class="settings-table-title">Sort Planets by:</div>\
								<div class="settings-table-action">\
									<select name="" class="">\
										<option value="1">Date of settlement</option>\
										<option value="2">Coordinates</option>\
										<option value="3">Alphabetic order</option>\
									</select>\
								</div>\
							</div>\
							<div class="row">\
								<div class="settings-table-title">Assortment sequence:</div>\
								<div class="settings-table-action">\
									<select name="" class="">\
										<option value="1">Rising</option>\
										<option value="2">Decreasing</option>\
									</select>\
								</div>\
							</div>\
						</div>-->\
						<div class="title-blue">Galaxy View Options</div>\
						<div class="table settings-table">\
							<div class="row">\
								<div class="settings-table-title">Number of espionage probes</div>\
								<div class="settings-table-action">\
									<input type="text" value="'+user.send_spys+'" name="settings-spy" class="settings-spy"/>\
								</div>\
							</div>\
						</div>\
						<div class="title-blue">Other</div>\
						<div class="table settings-table">\
							<div class="row">\
								<div class="settings-table-title">Chat color:</div>\
								<div class="settings-table-action">\
									<select name="settings-chat" class="settings-chat">\
										'+colors_list+'\
									</select>\
								</div>\
							</div>\
							<!--<div class="row">\
								<div class="settings-table-title">Time zone:</div>\
								<div class="settings-table-action">\
									<select name="settings-timezone" class="settings-timezone">\
										'+timezones_list+'\
									</select>\
								</div>\
							</div>-->\
							<div class="row">\
								<div class="settings-table-title">Avatar:</div>\
								<div class="settings-table-action">\
									<img src="images/avatars/'+user.avatar+'.gif" class="settings-avatar settings-show-avatars-link" alt="">\
								</div>\
							</div>\
							<div class="row">\
								<div class="settings-table-title">Description:</div>\
								<div class="settings-table-action">\
									<textarea class="settings-description" style="width:95%;height:100px;">'+user.description+'</textarea>\
								</div>\
							</div>\
						</div>\
						<div class="title-blue">Vacation mode</div>\
						<div class="table settings-table">\
							<div class="row">\
								<div class="settings-table-title">Enable vacation mode (be careful you can\'t leave vacation mode in the first 72 hours)\
									\
								</div>\
								<div class="settings-table-action">\
									'+vacation+'\
								</div>\
							</div>\
						</div>\
						<div class="title-blue"><div class="btn settings-save setting-save-link">Save</div></div><br/><br/><br/><br/>\
					</li>\
				</ul>';
		
		$('.settings-list').html(out);	
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

//Chat colors object
var colors_array = {
	'white' 			: 'White',
	'aliceblue' 		: 'Alice Blue', 
	'antiquewhite' 		: 'Antique White',
	'aqua' 				: 'Aqua',
	'aquamarine' 		: 'Aquamarine',
	'azure' 			: 'Azure',
	'beige' 			: 'Beige',									
	'bisque' 			: 'Bisque',
	'black' 			: 'Black',
	'blanchedalmond' 	: 'BlanchedAlmond',
	'blue' 				: 'Blue',
	'blueviolet' 		: 'Blue-Violet',
	'brown' 			: 'Brown',									
	'burlywood' 		: 'Burlywood',
	'cadetblue' 		: 'Cadet Blue',
	'chartreuse' 		: 'Chartreuse',
	'chocolate' 		: 'Chocolate',
	'coral' 			: 'Coral',
	'cornflowerblue' 	: 'Cornflower Blue',									
	'cornsilk' 			: 'Cornsilk',
	'crimson' 			: 'Crimson',
	'cyan' 				: 'Cyan',
	'darkblue' 			: 'Dark Blue',
	'darkcyan' 			: 'Dark Cyan',
	'darkgoldenrod' 	: 'Dark Goldenrod',									
	'darkgray' 			: 'Dark Gray',
	'darkgreen' 		: 'Dark Green',
	'darkkhaki' 		: 'Dark Khaki',
	'darkmagenta' 		: 'Dark Magenta',
	'darkolivegreen' 	: 'Dark Olive-Green',
	'darkorange' 		: 'Dark Orange',									
	'darkorchid' 		: 'Dark Orchid',
	'darkred' 			: 'Dark Red',
	'darksalmon' 		: 'Dark Salmon',
	'darkseagreen' 		: 'Dark Sea Green',
	'darkslateblue' 	: 'Dark Slate Blue',
	'darkslategray' 	: 'Dark Slate Gray',									
	'darkturquoise' 	: 'Dark Turquoise',
	'darkviolet' 		: 'Dark Violet',
	'deeppink' 			: 'Deep Pink',
	'deepskyblue' 		: 'Deep Sky Blue',
	'dimgray' 			: 'Dim Gray',
	'dodgerblue' 		: 'Dodger Blue',									
	'firebrick' 		: 'Firebrick',
	'floralwhite' 		: 'Floral White',
	'forestgreen' 		: 'Forest Green',
	'fuchsia' 			: 'Fuchsia',
	'gainsboro' 		: 'Gainsboro',
	'ghostwhite' 		: 'Ghost White',									
	'gold' 				: 'Gold',
	'goldenrod' 		: 'Goldenrod',
	'gray' 				: 'Gray',
	'green' 			: 'Green',
	'greenyellow' 		: 'Green-Yellow',
	'honeydew' 			: 'Honeydew',									
	'hotpink' 			: 'Hot Pink',
	'indianred' 		: 'Indian Red',
	'indigo' 			: 'Indigo',
	'ivory' 			: 'Ivory',
	'khaki' 			: 'Khaki',
	'lavender' 			: 'Lavender',									
	'lavenderblush' 	: 'Lavender-Blush',
	'lawngreen' 		: 'Lawn Green',
	'lemonchiffon' 		: 'Lemon Chiffon',
	'lightblue' 		: 'Light Blue',
	'lightcoral' 		: 'Light Coral',
	'lightcyan' 		: 'Light Cyan',									
	'lightgoldenrodyellow' : 'Light Goldenrod Yellow',
	'lightgreen' 		: 'Light Green',
	'lightgrey' 		: 'Light Grey',
	'lightpink' 		: 'Light Pink',
	'lightsalmon' 		: 'Light Salmon',
	'lightseagreen' 	: 'Light Sea Green',									
	'lightskyblue' 		: 'Light Sky Blue',
	'lightslategray' 	: 'Light Slate Gray',
	'lightsteelblue' 	: 'Light Steel Blue',
	'lightyellow' 		: 'Light Yellow',
	'lime' 				: 'Lime',
	'limegreen' 		: 'Lime-Green',									
	'linen' 			: 'Linen',
	'magenta' 			: 'Magenta',
	'maroon' 			: 'Maroon',
	'mediumaquamarine' 	: 'Medium Aquamarine',
	'mediumblue' 		: 'Medium Blue',
	'mediumorchid' 		: 'Medium Orchid',									
	'mediumpurple' 		: 'Medium Purple',
	'mediumseagreen' 	: 'Medium Sea Green',
	'mediumslateblue' 	: 'Medium Slate Blue',
	'mediumspringgreen' : 'Medium Spring Green',
	'mediumturquoise' 	: 'Medium Turquoise',
	'mediumvioletred' 	: 'Medium Violet-Red',									
	'midnightblue' 		: 'Midnight Blue',
	'mintcream' 		: 'Mint Cream',
	'mistyrose' 		: 'Misty Rose',
	'moccasin' 			: 'Moccasin',
	'navajowhite' 		: 'Navajo White',
	'navy' 				: 'Navy',									
	'oldlace' 			: 'Old Lace',
	'olive' 			: 'Olive',
	'olivedrab' 		: 'Olive Drab',
	'orange' 			: 'Orange',
	'orangered' 		: 'Orange Red',
	'orchid' 			: 'Orchid',									
	'palegoldenrod' 	: 'Pale Goldenrod',
	'palegreen' 		: 'Pale Green',
	'paleturquoise' 	: 'Pale Turquoise',
	'palevioletred' 	: 'Pale Violet-Red',
	'papayawhip' 		: 'Papaya Whip',
	'peachpuff' 		: 'Peach Puff',									
	'peru' 				: 'Peru',
	'pink' 				: 'Pink',
	'plum' 				: 'Plum',
	'powderblue' 		: 'Powder Blue',
	'purple' 			: 'Purple',
	'red' 				: 'Red',									
	'rosybrown' 		: 'Rosy Brown',
	'royalblue' 		: 'Royal Blue',
	'saddlebrown' 		: 'Saddle Brown',
	'salmon' 			: 'Salmon',
	'sandybrown' 		: 'Sandy Brown',
	'seagreen' 			: 'Sea Green',									
	'seashell' 			: 'Seashell',
	'sienna' 			: 'Sienna',
	'silver' 			: 'Silver',
	'skyblue' 			: 'Sky Blue',
	'slateblue' 		: 'Slate Blue',
	'slategray' 		: 'Slate Gray',									
	'snow' 				: 'Snow',
	'springgreen' 		: 'Spring Green',
	'steelblue' 		: 'Steel Blue',
	'tan'				: 'Tan',
	'teal' 				: 'Teal',
	'thistle' 			: 'Thistle',									
	'tomato' 			: 'Tomato',
	'turquoise' 		: 'Turquoise',
	'violet' 			: 'Violet',
	'wheat' 			: 'Wheat',
	'white' 			: 'White',
	'whitesmoke' 		: 'White Smoke',									
	'yellow' 			: 'Yellow',
	'yellowgreen' 		: 'Yellow-Green'
};

