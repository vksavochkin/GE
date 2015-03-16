 var Chat= {
	pageID: '#chat-screen',
	scrollID: 'chatScroll',
	type:0,
	interval:null,
	intervalTimeout:13000,
	init: function () {
		onPage = 'chat';
		$('.page-content').hide();	
		this.content();
		$(this.pageID).show();
		$('.bar-title h1').html('Chat');
		$('.bar-title span').html('');	
		Chat.interval = setTimeout ("Chat.refresh(true)", Chat.intervalTimeout);
		return false;
	},
	close: function(){
		$(this.pageID).hide().empty();
		clearTimeout(Chat.interval);
		onPage = 'overview';
		return false;
	},
	content: function(){
		$(this.pageID).html('<div class="b-main overthrow" id="chatScroll">\
					<div class="scroll-holder" style="min-height:100%;overflow:auto;"><div class="chat-holder" style="">'+this.showChat()+'</div></div>\
				</div>\
				<div class="chatControl"><input class="fl" type="text" name="chatMsg" id="chatMsg"> <div class="fr btn" id="chatSend">'+lang._T('Send')+'</div></div>\
		');			
		return false;
	},
	refresh: function(u){
		clearTimeout(Chat.interval);
		if(u == true){
			Request.send({'object':'chat', 'action':'show'});
		}
		var c ='';
		var total_msgs = (responseObj.chatshow).length;
		var lid = 0;
		foreach(responseObj.chatshow, function(key, m) {
			lid++;
			var d = asDate(m.timestamp).format(Date.formats.chat);
			c+= '<p '+(lid==total_msgs ? 'class="last"' : '')+'>('+d+') <b class="user-link" rel="'+m.username+'">'+m.username+'</b>: <span '+(Check.isEmpty(m.color) ? '':'style="color:'+m.color+';"')+'>'+m.message+'</span></p>';
		});
		$('.chat-holder').html(c);	
		
		var height = $('.chat-holder').height() + 8 - 320;
		
		if($('#chat-screen').css('display') == 'block'){
			Chat.interval = setTimeout ("Chat.refresh(true)", Chat.intervalTimeout);
		}
		
		
		return false;
	},
	showChat: function(){
		Request.send({'object':'chat', 'action':'show'});
		if(responseObj.status == 100){
			var c ='';
			var total_msgs = (responseObj.chatshow).length;
			var lid = 0;
			foreach(responseObj.chatshow, function(key, m) {
				lid++;
				var d = asDate(m.timestamp).format(Date.formats.chat);
				c+= '<p '+(lid==total_msgs ? 'class="last"' : '')+'>('+d+') <b class="user-link" rel="'+m.username+'">'+m.username+'</b>: <span '+(Check.isEmpty(m.color) ? '':'style="color:'+m.color+';"')+'>'+m.message+'</span></p>';
			});
			return c;
		}else{
			return false;
			/*jConfirm('Connection Error. Please try again.', 'Error', function(r){
				if(r){
					Chat.showChat();
				}else{
					Chat.close();
				}
			});*/
		}
		return false;
	},
	send: function(n){
		var message = $('#chatMsg').val();
		if(Check.isEmpty(message)){
			return false;
			//alertify.alert(lang._T('Message must not be empty'));
		}else{
			Request.send({'object':'chat', 'action':'new', 'type':Chat.type, 'message':message});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				Chat.refresh();
				$('#chatMsg').val('');
			}
		}	
		return false;
	}	
};
