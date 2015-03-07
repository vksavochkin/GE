var Request = {
	timestampRequestLocalMillis: undefined,
	timestampResponseLocalMillis: undefined,

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
		Request.timestampRequestLocalMillis = Date.now();
		$.ajax({
			url: rUrl || config.gameURL,
            data: rData,
            type: rType || "POST",
			timeout: config.timeout,
			dataType: config.dataType,
			async: false,
			cache: false
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
				// user's clock may drift from server's
				Request.timestampResponseLocalMillis = Date.now();
				$('.server_time').html(formatServerDateTimeTZ(respond.timestamp));
				$('.local_time').html(formatUserDateTimeTZ(respond.timestamp) + '*');
				$('.network_latency').html('' + exactNumber(Request.timestampResponseLocalMillis - Request.timestampRequestLocalMillis) + ' ms');
				return;
			}else if(textStatus == 'timeout'){
				responseObj.status = 503;
				responseObj.error = lang._T('Server Timeout. Please try again.');
				return;
			}else{
				responseObj.status = 500;
				responseObj.error = lang._T('An unknown error occurred while processing the request on the server: %VAL1%', textStatus);
				return;
			}
			return; 
		}).fail(function(jqXHR, textStatus, errorThrown) { 
			$('#loading-div').hide();
			//alert('Here: '+log.object_toString(jqXHR));
			responseObj.status = 504;
			responseObj.error = lang._T('An error occurred while connecting to server. Please check your internet connection and try again.', textStatus, errorThrown);

			return; 
		});
		return;
	}
};