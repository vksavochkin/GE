var Mail= {
	pageID: '#mail-screen',
	scrollID: 'page_mail_scroll',
	mails: {},
	init: function () {
		onPage = 'mail';
		$('.page-content').hide();
		Request.send({object:'mail', action:'cat'});
		//Mail.mails = responseObj.maillist;	
		this.content();
		$(this.pageID).show();
		$('.bar-title h1').html('Mail (<a onclick="Mail.new_message(\'\',\'\');">New Message</a>)');
		$('.bar-title span').html('');
		makeScroll('page_mail_scroll');	
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		destroyScroll(this.scrollID);
		$(this.pageID).empty();
		onPage = 'overview';
		Mail.mails = {};
		this.mails ={};
		return false;
	},
	content: function(){
		var count = responseObj.mailcat;
	
		$('.mail-list').html('<ul><li><div class="table mail-table">\
			<div class="row" onclick="Mail.category(100);">\
				<div class="cell mail-title" rel="100" style="color:#fcfcfc">View all Messages</div>\
				<div class="cell mail-count" style="color:#fcfcfc"><b>'+count['100']['new']+'</b> / '+count['100']['total']+'</div>\
			</div>\
			<div class="row" onclick="Mail.category(1);">\
				<div class="cell mail-title" rel="1" style="color:#FF6699">Private messages</div>\
				<div class="cell mail-count" style="color:#FF6699"><b>'+count['1']['new']+'</b> / '+count['1']['total']+'</div>\
			</div>\
			<div class="row" onclick="Mail.category(2);">\
				<div class="cell mail-title" rel="2" style="color:#FF3300">Alliance messages</div>\
				<div class="cell mail-count" style="color:#FF3300"><b>'+count['2']['new']+'</b> / '+count['2']['total']+'</div>\
			</div>\
			<div class="row" onclick="Mail.category(0);">\
				<div class="cell mail-title" rell="0" style="color:#FFFF00">Spy reports</div>\
				<div class="cell mail-count" style="color:#FFFF00"><b>'+count['0']['new']+'</b> / '+count['0']['total']+'</div>\
			</div>\
			<div class="row" onclick="Mail.category(3);">\
				<div class="cell mail-title" rell="3" style="color:#FF9900">Combat reports</div>\
				<div class="cell mail-count" style="color:#FF9900"><b>'+count['3']['new']+'</b> / '+count['3']['total']+'</div>\
			</div>\
			<div class="row" onclick="Mail.category(5);">\
				<div class="cell mail-title" rell="5" style="color:#009933">Transportation reports</div>\
				<div class="cell mail-count" style="color:#009933"><b>'+count['5']['new']+'</b> / '+count['5']['total']+'</div>\
			</div>\
			<div class="row" onclick="Mail.category(4);">\
				<div class="cell mail-title" rell="4" style="color:#ABABAB">Recycling reports</div>\
				<div class="cell mail-count" style="color:#ABABAB"><b>'+count['4']['new']+'</b> / '+count['4']['total']+'</div>\
			</div>\
			<div class="row" onclick="Mail.category(99);">\
				<div class="cell mail-title" rell="99" style="color:#007070">Construction reports</div>\
				<div class="cell mail-count" style="color:#007070"><b>'+count['99']['new']+'</b> / '+count['99']['total']+'</div>\
			</div>\
			<div class="row" onclick="Mail.category(16);">\
				<div class="cell mail-title" rell="16" style="color:#914048">Phalanx reports</div>\
				<div class="cell mail-count" style="color:#914048"><b>'+count['16']['new']+'</b> / '+count['16']['total']+'</div>\
			</div>\
			'+(parseInt(user.expedition) == 1 ? '<div class="row" onclick="Mail.category(15);"><div class="cell mail-title" rell="15" style="color:#0CF7A9">Expedition reports</div><div class="cell mail-count" style="color:#0CF7A9"><b>'+count['15']['new']+'</b> / '+count['15']['total']+'</div></div>' : '')+'\
		</div><br/><br/><br/><br/></li></ul>');	
			
		return false;
	},
	category: function(c){
		var out = '';
		
		var cat_name = 'All Messages';
		if(c == 0){
			cat_name = 'Spy reports'
		}else if(c == 1){
			cat_name = 'Private messages'
		}else if(c == 2){
			cat_name = 'Alliance messages'
		}else if(c == 3){
			cat_name = 'Combat reports'
		}else if(c == 4){
			cat_name = 'Recycling reports'
		}else if(c == 5){
			cat_name = 'Transportation reports'
		}else if(c == 99){
			cat_name = 'Construction reports'
		}else if(c == 15){
			cat_name = 'Expedition reports'
		}else if(c == 16){
			cat_name = 'Phalanx reports'
		}
		Request.send({object:'mail', action:'list', type:c});
		Mail.mails = responseObj.maillist;
		
		$('.bar-title span').html(cat_name+' (<a onclick="Mail.deleteAll('+c+');">Delete All</a>)');
		if(c == 100){
			foreach(Mail.mails,function(k,m){
				var localDate = new Date(m.message_time*1000); 
				
				var mail_class = (parseInt(m['new']) == 1 ? 'mail-new' : '');
				
				var message_form = '';
				if(parseInt(m.message_type) == 1 || parseInt(m.message_type) == 2){
					message_form = '<i onclick="Mail.new_message(\''+m.message_from+'\');" style="font-size:15px;text-decoration:underline;">'+ m.message_from+'</i>';
				}else{
					message_form = '<i>'+ m.message_from+'</i>';
				}
				
				out += '<div class="row message'+m.message_id+' '+mail_class+'">\
					<div class="cell mail-message">\
						<a class="delete-message" onclick="Mail._delete('+m.message_id+')">Delete</a>\
						<small>\
							<b>'+localDate.format("m/dd/yy h:MM:ss TT")+' '+(Check.isEmpty(m.message_from) ? '' : lang._T('From')+' '+message_form)+'\
							</b>\
						</small>\
						<p class="allow_selection">'+m.message_text+'</p>\
					</div>\
				</div>';
			});
		}else{
			foreach(Mail.mails,function(k,m){
				if(parseInt(m.message_type) == c){
					var localDate = new Date(m.message_time*1000); 
					
					var mail_class = (parseInt(m['new']) == 1 ? 'mail-new' : '');
					
					var message_form = '';
					if(parseInt(m.message_type) == 1 || parseInt(m.message_type) == 2){
						message_form = '<i onclick="Mail.new_message(\''+m.message_from+'\');" style="font-size:15px;text-decoration:underline;">'+ m.message_from+'</i>';
					}else{
						message_form = '<i>'+ m.message_from+'</i>';
					}
					
					out += '<div class="row message'+m.message_id+' '+mail_class+'">\
						<div class="cell mail-message">\
							<a class="delete-message" onclick="Mail._delete('+m.message_id+')">Delete</a>\
							<small>\
								<b>'+localDate.format("m/dd/yy h:MM:ss TT")+' '+(Check.isEmpty(m.message_from) ? '' : lang._T('From')+' '+message_form)+'\
								</b>\
							</small>\
							<p class="allow_selection">'+m.message_text+'</p>\
						</div>\
					</div>';
				}	
			});
		}
		$('.mail-list').html('<ul><li><div class="table mail-table messages-table">'+out+'</div></li></ul>');	
		$('#mail-screen').show();
		makeScroll('page_mail_scroll');	
		
		return false;

	},
	new_message: function(to,subject){
		
		Overview.resetModals();
		$('.page-message-page').html('<div class="b-main overthrow" id="messageScrollPage">\
					<ul>\
					    <li>\
					        <div class="new-message">\
                                <div><b>'+lang._T('Username')+'</b> <input type="text" name="name" class="new-mail-username" value="'+to+'"/></div>\
                                <div><b>'+lang._T('Message')+'</b> <textarea name="subject" class="new-mail-message"></textarea></div>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
				<nav class="b-menu">\
					<a class="fl btn" style="margin-left:10px;" onclick="Mail.closePage();">'+lang._T('close')+'</a>\
					<a class="fr btn" onclick="Mail.send();">'+lang._T('Send')+'</a>\
				</nav>').show().css('z-index','10');
		makeScroll('messageScrollPage');
		return false;

	},
	closePage: function(){
		$('.page-message-page').hide();
	},	
	send: function(s){
		var mail_user = $('body .new-mail-username').last().val();
		var mail_message = $('.new-mail-message').last().val();
		//console.log(mail_user+':'+mail_message);
		if(Check.isEmpty(mail_user)){
			alertify.alert(lang._T('Username must not be empty'));
		}else if(Check.isEmpty(mail_message)){
			alertify.alert(lang._T('Message must not be empty'));
		}else{
			Request.send({'object':'mail', 'action':'send', 'to':mail_user, 'text':mail_message});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				Mail.closePage();
				alertify.alert(lang._T('Message was sent.'));
			}
		}	
		return false;
	},
	_delete: function(n){
		Request.send({'object':'mail', 'action':'delete', 'idn':n});
		$('.message'+n).remove();
		delete Mail.mails[n];

		return false;
	},
	deleteAll: function(n){
		c = parseInt(n);
		if(c != 0 && c != 1 && c != 2 && c != 3 && c != 4 && c != 5 && c != 99 && c != 15 && c != 100){
			return false;
		}
		
		var cat_name = 'All Messages';
		if(c == 0){
			cat_name = 'Spy reports'
		}else if(c == 1){
			cat_name = 'Private messages'
		}else if(c == 2){
			cat_name = 'Alliance messages'
		}else if(c == 3){
			cat_name = 'Combat reports'
		}else if(c == 4){
			cat_name = 'Recycling reports'
		}else if(c == 5){
			cat_name = 'Transportation reports'
		}else if(c == 99){
			cat_name = 'Construction reports'
		}else if(c == 15){
			cat_name = 'Expedition reports'
		}else if(c == 16){
			cat_name = 'Phalanx reports'
		}
		
		alertify.confirm(lang._T('Are you sure you want to delete all messages in "'+cat_name+'"category?'), function (e) {
		    if (e) {
		        Request.send({'object':'mail', 'action':'deleteall', 'type':n});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{			
					Mail.init();
				}
		    } else {
		        // user clicked "cancel"
		    }
		});
		
		
		

		return false;
	}	
	
};
