var Request = {
	send: function (rData, rUrl, rType) {
		//if (navigator.onLine == false || navigator.online == false) {
			//alertify.alert("You dont have a connection to the internet. Please connect via WiFi/3G and try again.");
			//return false;
		//}
		$('#loading-div').show();
		rData.live = '1';
		rData.version = config.version;
		if(rData.object == 'auth' && (rData.action == 'login' || rData.action == 'register' ||rData.action == 'forgot')){
			//nothing
		}else{
			rData.token = storage.get('token');
		}
		$.ajax({ 
			url: rUrl || config.gameURL,
            data: rData,
            type: rType || "POST",
			timeout: config.timeout,
			dataType: config.dataType,
			async: false,
			cache: false,
		}).done(function(respond, textStatus) { 
			//alert('Here: '+log.object_toString(respond));
			//alert(respond);
			$('#loading-div').hide();				

			if(textStatus == 'success' || textStatus == 'notmodified'){
				if(parseInt(respond.status) == 100){
					responseObj = respond;
					
					if(!Check.isEmpty(respond.state) && !Check.isEmpty(respond.state.user)){
						user = {};
						user = respond.state.user;
						if(!Check.isEmpty(respond.state.planets) && !Check.isEmpty(respond.state.planets[respond.state.user.current_planet])){
							planet = respond.state.planets[respond.state.user.current_planet];
						}else{
							planet = respond.state.planets[respond.state.user.planet_id];
						}
						Overview.updateHeader();
					}
					
						
				}else{
					responseObj.status = parseInt(respond.status);
					responseObj.error = respond.error;
					if(!Check.isEmpty(responseObj.state)){
						responseObj.state = respond.state;
					}
				}
				if(!Check.isEmpty(respond.token)){
					storage.set('token',respond.token);
				}
				$('.server_time').html(respond.server_time);
				return;
			}else if(textStatus == 'timeout'){
				alertify.alert('Server Timeout. Please try again.');
				return;
			}else{					
				alertify.alert('An unknown error occurred while processing the request on the server.');
				return;
			}
			return; 
		}).fail(function(jqXHR, textStatus, errorThrown) { 
			$('#loading-div').hide();
			//alert('Here: '+log.object_toString(jqXHR));
			alertify.alert('An unknown error occurred while processing the request on the server1. ');	
			return; 
		});
		return;
	}
};