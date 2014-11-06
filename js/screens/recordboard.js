var Recordboard= {
	pageID: '.page-recordboard',
	scrollID: 'page_recordboard_scroll',
	init: function () {
		onPage = 'recordboard';
		$('.page-content').hide();	
		$('.bar-title h1').html('Records');
		$('.bar-title span').html('');	
		this.content();
		$(this.pageID).show();
		makeScroll('page-recordboard-scroll');
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		destroyScroll(this.scrollID);
		$(this.pageID).empty();
		onPage = 'overview';
		return false;
	},
	content: function(){
		this.showRecords();			
		return false;
	},
	showRecords: function(){
		Request.send({'object':'statistic', 'action':'records'});
		if(responseObj.status == 100){			
			var out = '';
			var data = responseObj.statisticrecords
			
			//Planet Buildings
			out += '<div class="row record-title"><div class="record-table-title"><b>Planet Buildings</b></div><div></div><div></div></div>';
			foreach(reslist_build_planet, function(k,v){
				out += '<div class="row">\
							<div class="record-table-name">'+lang._T('info_'+data[k]['record']+'_name')+'</div>\
							<div class="record-table-username">'+data[k]['username']+'</div>\
							<div class="record-table-count">'+data[k]['count']+'</div>\
						</div>';
			});
			
			//Moon Buildings
			var reslist_build_moon2 = {
				'moon_base':'1',
				'sensor_phalanx':'1',
				'jump_gate':'1'
			};
			out += '<div class="row record-title"><div class="record-table-title"><b>Moon Buildings</b></div><div></div><div></div></div>';
			foreach(reslist_build_moon2, function(k,v){
				out += '<div class="row">\
							<div class="record-table-name">'+lang._T('info_'+data[k]['record']+'_name')+'</div>\
							<div class="record-table-username">'+data[k]['username']+'</div>\
							<div class="record-table-count">'+data[k]['count']+'</div>\
						</div>';
			});
			
			//Ships Buildings
			out += '<div class="row record-title"><div class="record-table-title"><b>Ships</b></div><div></div><div></div></div>';
			foreach(reslist_fleet, function(k,v){
				out += '<div class="row">\
							<div class="record-table-name">'+lang._T('info_'+data[k]['record']+'_name')+'</div>\
							<div class="record-table-username">'+data[k]['username']+'</div>\
							<div class="record-table-count">'+data[k]['count']+'</div>\
						</div>';
			});
			
			//Defense Buildings
			out += '<div class="row record-title"><div class="record-table-title"><b>Defense</b></div><div></div><div></div></div>';
			foreach(reslist_defense, function(k,v){
				out += '<div class="row">\
							<div class="record-table-name">'+lang._T('info_'+data[k]['record']+'_name')+'</div>\
							<div class="record-table-username">'+data[k]['username']+'</div>\
							<div class="record-table-count">'+data[k]['count']+'</div>\
						</div>';
			});
			
			//Tech Buildings
			out += '<div class="row record-title"><div class="record-table-title"><b>Research</b></div><div></div><div></div></div>';
			foreach(reslist_tech, function(k,v){
				out += '<div class="row">\
							<div class="record-table-name">'+lang._T('info_'+data[k]['record']+'_name')+'</div>\
							<div class="record-table-username">'+data[k]['username']+'</div>\
							<div class="record-table-count">'+data[k]['count']+'</div>\
						</div>';
			});
			


			$('.recordboard-list').html('<ul><li class="table recordboard-table">'+out+'</li></ul>');
		}else{
			alertify.alert(lang._T(responseObj.error));
		}
		
		return false;
	}
};
