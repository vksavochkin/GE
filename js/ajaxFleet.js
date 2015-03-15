function sendFleet(page) {
	$('#progress').text('Sending Fleet...');
    $('#progress').show();
	
	$.ajax({
		url: site + page,
		cache: false,
		dataType: 'html',
		data: ({uuid : devid}),
		success: function(response){
			//alert(response);
			$('#s2 .error').html(response);
			$('#s2 .error').show();
			$('#progress').hide();			
		}

	});
}

function doit (order, galaxy, system, planet, planettype, shipcount) {
	var page = "FleetAjax.php?action=send";

	var data = "&thisgalaxy=1";
	data = data + "&thissystem=1";
	data = data + "&thisplanet=1";
	data = data + "&thisplanettype=1";
	data = data + "&mission="+order;
	data = data + "&galaxy="+galaxy;
	data = data + "&system="+system;
	data = data + "&planet="+planet;
	data = data + "&planettype="+planettype;
	if (order == 6)
		data = data + "&ship210="+shipcount;
	if (order == 7) {
		data = data + "&ship208=1";
		data = data + "&ship203=2";
	}
	if (order == 8)
		data = data + "&ship209="+shipcount;

	sendFleet(page+data);
}
