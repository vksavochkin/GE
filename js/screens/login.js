 var Login= {
	init: function () {
		onPage = 'login';
		//Login.buildServersList();		
		this.content();
		$('.login').show();
		$('.login-screen').show();
		$('.forgot-screen').hide();
		$('.register-screen').hide();
		$('.register-servers').hide();
		return false;
	},
	showServersInside: function(){
		$('.register-servers-inside').show();
		$('#header').hide();
		$('#content').hide();
		var out = Login.buildServersList();	
		$('.servers-box-inside > div').html('<ul>'+out+'</ul>');
		return false;
	},
	showServers: function(){
		$('.login-screen').hide();
		$('.register-screen').hide();
		$('.forgot-screen').hide();
		$('.register-servers').show();
		var out = Login.buildServersList();	
		$('.servers-box-inside > div').html('<ul>'+out+'</ul>');
	},
	buildServersList: function(){
		var out = '';
		Request.send({object:'auth', action: 'servers'});
		if(responseObj.status != 100){
			alertify.alert(lang._T('Something went wrong and system can\'t get list of server. Please try again latter.'));
			return false;
		}else{			
			var selected_server = responseObj.authservers.servers_list.default_server;
			if(!Check.isEmpty(appStorage.get('server'))){
				selected_server = appStorage.get('server');
			}
			
			foreach(responseObj.authservers.servers_list.list, function(srv, row){
				var rClass= '';
				var start = '';
				var restart = '';
				var data_reg = 0;
				if(!Check.isEmpty(row['username'])){
					rClass = 'registered';
					data_reg = 1;
				}
				if(parseInt(row['username']) == 0){
					rClass += ' registration-closed';
				}
				
				
				if(!Check.isEmpty(row['start'])){
					start = 'Started: '+row['start'];
				}
				
				if(!Check.isEmpty(row['restart'])){
					restart = 'Next restart: '+row['restart'];
				}
				
				out += '<li class="server-link '+rClass+'" rel="'+srv+';'+data_reg+';'+row['name']+'">\
								    <span class="server-name" style="display:none;">'+row['name']+'</span>\
								    <div class="server-info">\
								    	<span class="server-name">'+row['name']+'</span>\
                                        <span class="server-description">'+( Check.isEmpty(row['description']) ? '' : row['description'] )+'</span>\
                                        <div class="server-dates">\
    								    	<div class="server-start">'+start+'</div>\
    								    	<div class="server-restart">'+restart+'</div>\
    								    </div>\
								    </div>\
								    <div class="server-data">\
                                        <span class="server-username">'+( Check.isEmpty(row['username']) ? 'Create Account' : 'Commander: '+row['username'] )+'</span>\
								    </div>\
								    <div class="clear"></div>\
							    </li>';
				
			});
		}
		
		if(Check.isEmpty(out)){
			out = '<p style="text-align:center">No Servers found.<br/><br/> <span class="login-init-link"><< Go back to login screen</span></p>';
		}
		
		return out;
	},
	close: function(){
		$('.login').hide();
		$('.login-username').val('');
		$('.login-password').val('');
		return false;
	},
	content: function(){
			
		return false;
	},
	doLogin:function(){
		var username = $('.login-username').val();
		var password = $('.login-password').val();
		
		if(Check.isEmpty(username) ){
			alertify.alert('Incorrect email');
			return false;
		}		
		if(Check.isEmpty(password) || !Check.password(password)){
			alertify.alert('Bad Password');
			return false;
		}		
		Request.send({object: 'auth', action: 'login', email:username, password:password});
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{	
			appStorage.set('email',username);
			//Login.showServers();	
			window.location.reload();	
			//initGame();
		}
	},
	showRegister: function(){
		$('.login-screen').hide();
		$('.forgot-screen').hide();
		$('.register-screen').show();
	},
	doRegister: function () {
		var username = $('.register-username').val();
		var password = $('.register-password').val();
		var password2 = $('.register-password2').val();
		var email = $('.register-email').val();
		
		//Validation
		if(Check.isEmpty(username) || !Check.username(username)){
			alertify.alert(lang._T('Incorrect username'));
			return false;
		}		
		if(Check.isEmpty(password) || !Check.password(password)){
			alertify.alert(lang._T('Bad Password'));
			return false;
		}		
		if(password != password2){
			alertify.alert(lang._T('Passwords do not match'));
			return false;
		}		
		if(Check.isEmpty(email) || !Check.email(email)){
			alertify.alert(lang._T('Bad Email'));
			return false;
		}
		
		Request.send({object: 'auth', action:'registerusername', email:email, username:username, password:password});
		
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{
			window.location.reload();
			//Login.showServers();
			//initGame();
		}
		
	},
	showForgot: function(){
		$('.login-screen').hide();
		$('.forgot-screen').show();
		$('.register-screen').hide();
	},
	doForgot: function () {
		var email = $('.forgot-email').val();
		var server = $('.forgot-server option:selected').val();
		
		if(Check.isEmpty(email) || !Check.email(email)){
			alertify.alert(lang._T('Incorrect email'));
			return false;
		}
		
		Request.send({object: 'auth', action: 'forgot', email:email });
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{
			alertify.alert(lang._T('New password sent'));
			Login.init();
			return false;
		}
		
		return false;
	},
	doLogout:function(){
		//appStorage.removeAllStorages();
		appStorage.set('token','');
		window.location.reload();
	}
};
