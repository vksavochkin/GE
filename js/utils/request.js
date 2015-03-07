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
				Request.updateTime(respond);
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
	},
	updateTime:function(respond){
		// user's clock may drift from server's
		if (isset(respond.timestamp)) {
			$('.server_time').html(formatServerDateTimeTZ(respond.timestamp) + '&nbsp;');
			var local_time = $('.local_time');
			local_time.html(formatUserDateTimeTZ(respond.timestamp) + '*');

			var pageLoadTimeThreshold = 3000;
			var second = 1000;

			var pageLoadTime = Request.timestampResponseLocalMillis - Request.timestampRequestLocalMillis;
			var timeDifference = Math.abs(asDate(respond.timestamp).getTime() - Request.timestampResponseLocalMillis);

			// respond.timestamp is rounded to seconds
			var time_difference = $('.time_difference');
			time_difference.html('' + exactNumber(timeDifference) + ' ms');
			if (timeDifference > pageLoadTime + second){
				local_time.addClass('time-warning');
				time_difference.addClass('time-warning');
			}else{
				local_time.removeClass('time-warning');
				time_difference.removeClass('time-warning');
			}

			var page_load_time = $('.page_load_time');
			page_load_time.html('' + exactNumber(pageLoadTime) + ' ms');
			if (pageLoadTime > pageLoadTimeThreshold){
				page_load_time.addClass('time-warning');
			}else{
				page_load_time.removeClass('time-warning');
			}

			if (timeDifference > pageLoadTime + second || pageLoadTime > pageLoadTimeThreshold){
				$('.time_optional').show();
			}else{
				$('.time_optional').hide();
			}
		}
	}
};