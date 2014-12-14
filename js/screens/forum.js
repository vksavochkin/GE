 var Forum= {
	pageID: '#forum-screen',
	scrollID: 'forumScroll',
	init: function () {
		onPage = 'forum';
		$('.page-content').hide();	
		this.content();
		$(this.pageID).show();
		$('.bar-title h1').html('Forum');
		$('.bar-title span').html('');	
		makeScroll(this.scrollID);
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		destroyScroll(this.scrollID);
		$(this.pageID).empty();
		onPage = 'main';
		return false;
	},
	content: function(){
		$(this.pageID).html('<div class="b-main overthrow" id="forumScroll">\
					<div class="scroll-holder" >'+this.showCategories()+'</div>\
				</div>');	
		return false;
	},
	showCategories: function(){
		Request.send({'object':'forum', 'action':'categories'});
		if(responseObj.status == 100){
			var c='<div class="forum-holder">';
			foreach(responseObj.forumcategories, function(key, m) {
				c+= '<div class="forum-title"><b>'+key+'</b></div>';
				foreach(responseObj.forumcategories[key], function(keyc, mc) {
					c+= '<div onclick="Forum.showTopics('+mc.fid+');" class="forum-category">\
					<div><small>'+mc.forum_last_post_subject+'<br/>\
					'+(mc.forum_last_post_time>0 ? asDate(m.topic_last_post_time).format(Date.formats.forum) : '')+'<br/>\
					'+mc.forum_last_post_username+'</small></div>\
					<b>'+mc.forum_name+'</b><br/><small>'+mc.forum_desc+'</small></div>';
				});
			});
			c+='</div>';
			return c;
		}else{
			alertify.confirm(lang._T('Connection Error. Please try again.'), function (e) {
			    if (e) {
			        Forum.init();
			    } else {
			        Forum.close();
			    }
			});
		}
		return false;
	},
	showTopics: function(n){
		Request.send({'object':'forum', 'action':'topics', 'fid':n});	
		if(responseObj.status == 100){
			$('#forum-topics-screen').html('<div class="b-main overthrow" id="forumTopicsScroll" style="bottom:40px;">\
					<div class="scroll-holder">\
						<div class="forum-holder" id="forum-topics">'+this.showTopicsContent()+'</div>\
						<div id="topics-nav"></div>\
					</div>\
				</div>\
				<div class="b-menu">\
					'+(parseInt(responseObj.forumtopics.category.auth_post) > parseInt(responseObj.state.user.level) ? '' : '<button class="fl btn" style="margin-left:10px;" onclick="Forum.newTopic('+responseObj.forumtopics.category.fid+');">'+lang._T('New Topic')+'</button>')+'\
					<button class="fr btn" onclick="Forum.closeTopics();">'+lang._T('Close')+'</button>\
				</div>');
		}else{
			alertify.confirm(lang._T('Connection Error. Please try again.'), function (e) {
			    if (e) {
			        Forum.showTopics();
			    } else {
			        return false;
			    }
			});
		}
		var sfid = responseObj.forumtopics.category.fid;
		$('#topics-nav').smartpaginator({ 
			totalrecords: parseInt(responseObj.forumtopics.category.forum_topics), 
            recordsperpage: 20,
			length:3,
			datacontainer: 'forum-topics', 
            dataelement: '>div',
            theme: 'red', 
			onchange: function(newPage) {		
				Forum.showTopicsPage(sfid,newPage)
            },
            afterchange: function(newPage) {		
				refreshScroll('forumTopicsScroll');				
				toScroll('forumTopicsScroll',0,0);
            }
        });
		$('#forum-topics-screen').show();
		makeScroll('forumTopicsScroll');				
		return false;
	},
	showTopicsContent: function(){
		var o='';
		foreach(responseObj.forumtopics.topics, function(key, m) {
			o+= '<div class="forum-topic t'+m.tid+'" onclick="Forum.showPosts('+m.tid+');">\
				<div class="last-reply">\
					'+asDate(m.topic_last_post_time).format(Date.formats.forum)+'<br/>'+m.topic_last_post_username+'\
				</div>\
				<div class="replies-count">'+m.topic_replies+'</div>\
				<b>'+m.subject+'</b><br/><small>'+lang._T('Posted by')+' '+m.topic_postrer_username+'</small>\
			</div>';
		});
		if(Check.isEmpty(o)){
			return '<div class="forum-topic" style="text-align:center;"><b>'+lang._T('There no topics yet.')+'</b></div>';
		}else{
			return o;
		}
	},
	showTopicsPage: function(n,p){
		Request.send({'object':'forum', 'action':'topics', 'fid':n, 'page':p});
		if(responseObj.status == 100){
			var o='';
			foreach(responseObj.forumtopics.topics, function(key, m) {
				o+= '<div class="forum-topic t'+m.tid+'" onclick="Forum.showPosts('+m.tid+');">\
					<div class="last-reply">\
						'+asDate(m.topic_last_post_time).format(Date.formats.forum)+'<br/>'+m.topic_last_post_username+'\
					</div>\
					<div class="replies-count">'+m.topic_replies+'</div>\
					<b>'+m.subject+'</b><br/><small>'+lang._T('Posted by')+' '+m.topic_postrer_username+'</small>\
				</div>';
			});
			$('#forum-topics-screen .forum-holder').html(o);
		}else{
			alertify.confirm(lang._T('Connection Error. Please try again.'), function (e) {
			    if (e) {
			        Forum.showTopicsPage(n,p);
			    } else {
			        return false;
			    }
			});
		}
		
		$('#forum-topics-screen').show();
		makeScroll('forumTopicsScroll');				
		return false;
	},
	closeTopics: function(){
		$('#forum-topics-screen').hide();
		destroyScroll('forumTopicsScroll');
		$('#forum-topics-screen').empty();
		return false;
	},
	newTopic: function(n){
		$('#forum-newposts-screen').html('<div class="b-main">\
					<div class="scroll-holder" ><div class="forum-holder">\
						<div><b>'+lang._T('Subject')+'</b> <input type="text" name="subject" id="new-topic-subject"/></div>\
						<div><b>'+lang._T('Message')+'</b> <textarea name="subject" id="new-topic-message"></textarea></div>\
					</div></div>\
				</div>\
				<div class="b-menu">\
					<button class="fl btn" style="margin-left:10px;" onclick="Forum.closeNewTopic();">'+lang._T('Close')+'</button>\
					<div><button class="fr btn" onclick="Forum.createTopic('+n+');">'+lang._T('Create')+'</button></div>\
				</div>');
		$('#forum-newposts-screen').show();				
		return false;
	},	
	createTopic: function(n){
		var subject = $('#new-topic-subject').val();
		var message = $('#new-topic-message').val();
		if(parseInt(n)<1){
			alertify.alert(lang._T('Cant find forum ID.'));
		}else if(Check.isEmpty(subject)){
			alertify.alert(lang._T('Subject must not be empty'));
		}else if(Check.isEmpty(message)){
			alertify.alert(lang._T('Message must not be empty'));
		}else{
			Request.send({'object':'forum', 'action':'newtopic', 'fid':n, 'subject':subject, 'message':message});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				Forum.closeNewTopic();
				Forum.showTopics(n);
			}
		}	
		return false;
	},	
	closeNewTopic: function(){
		$('#forum-newposts-screen').hide();
		$('#forum-newposts-screen').empty();
		return false;
	},
	showPosts: function(n){
		Request.send({'object':'forum', 'action':'posts', 'tid':n});	
		if(responseObj.status == 100){
			var can_delete = false;
			if(parseInt(responseObj.state.user.level) >= 1){
    			can_delete = true;
			}else{
    			if(parseInt(responseObj.state.user.ally_id) > 0){
        			if(parseInt(responseObj.state.user.ally_rank) == 1 || parseInt(responseObj.state.user.ally_rank) == 2){
            			if(parseInt(responseObj.state.user.ally_id) == responseObj.forumposts.topic.fid){
                			can_delete = true;
            			}
        			}
    			}
			}
			
			$('#forum-posts-screen').html('<div class="b-main overthrow" id="forumPostsScroll" style="bottom:40px;">\
					<div class="scroll-holder" >\
						<div class="forum-holder" id="forum-posts">'+this.showPostsContent()+'</div>\
						'+( can_delete == false ? '' : '<button class="btn" onClick="Forum.DeleteTopic('+n+');" class="fl">Delete</button>')+'\
						<div id="post-nav"></div>\
					</div>\
				</div>\
				<div class="b-menu">\
					<button class="fl btn" style="margin-left:10px;" onclick="Forum.newReply('+responseObj.forumposts.topic.tid+');">'+lang._T('Reply')+'</button>\
					<button class="fr btn" onclick="Forum.closePosts();">'+lang._T('Close')+'</button>\
				</div>');
		}else{
			alertify.confirm(lang._T('Connection Error. Please try again.'), function (e) {
			    if (e) {
			        Forum.showPosts();
			    } else {
			        return false;
			    }
			});
		}
		$('#post-nav').smartpaginator({ 
			totalrecords: parseInt(responseObj.forumposts.topic.topic_replies)+1, 
            recordsperpage: 20,
			length:3,
			datacontainer: 'forum-posts', 
            dataelement: '>div',
            theme: 'red', 
            afterchange: function(newPage) {		
				refreshScroll('forumPostsScroll');				
				toScroll('forumPostsScroll',0,0);
            }
        });
		$('#forum-posts-screen').show();
		makeScroll('forumPostsScroll');				
		return false;
	},
	DeleteTopic: function(n){
		if(parseInt(n)<1){
			alertify.alert(lang._T('Cant find topic ID.'));
		}else{
			alertify.confirm(lang._T('Are you sure you want delete entire topic?'), function (e) {
			    if (e) {
			        Request.send({'object':'forum', 'action':'delete_topic', 'tid':n});
					if(responseObj.status != 100){
						alertify.alert(lang._T(responseObj.error));
						return false;
					}else{
						Forum.closePosts();
						Forum.closeTopics();
					}
					return false;
			    } else {
			        return false;
			    }
			});
		}	
		return false;
	},
	showPostsContent: function(){
		var o='';
        
        var can_delete = false;
		if(parseInt(responseObj.state.user.level) >= 1){
			can_delete = true;
		}else{
			if(parseInt(responseObj.state.user.ally_id) > 0){
    			if(parseInt(responseObj.state.user.ally_rank) == 1 || parseInt(responseObj.state.user.ally_rank) == 2){
        			if(parseInt(responseObj.state.user.ally_id) == responseObj.forumposts.topic.fid){
            			can_delete = true;
        			}
    			}
			}
		}
        
		foreach(responseObj.forumposts.posts, function(key, m) {
			o+= '<div class="forum-post p'+m.pid+'">\
				<div class="post-statusbar">\
					<b>'+m.post_username+'</b> '+(can_delete==false ? '' : '(<b onClick="Forum.DeleteMessage('+m.pid+');">Delete</b>)')+' <small>'+asDate(m.post_time).format(Date.formats.forum)+'</small>\
				</div>\
				<div class="post-message">\
					<div class="post-avatar user-link" rel="'+m.post_username+'" onclick="UserInfo.showPage(\''+m.post_username+'\');" style="background:url(images/avatars/'+m.avatar+'.gif) no-repeat;"></div>\
					'+recover(m.message)+'\
				</div>\
			</div>';
		});
		if(Check.isEmpty(o)){
			return '<div class="forum-post" style="text-align:center;"><b>'+lang._T('There no posts yet.')+'</b></div>';
		}else{
			return o;
		}
	},
	DeleteMessage: function(n){
		if(parseInt(n)<1){
			alertify.alert(lang._T('Cant find post ID.'));
		}else{
			alertify.confirm(lang._T('Are you sure you want delete this message?'), function (e) {
			    if (e) {
			        Request.send({'object':'forum', 'action':'delete_post', 'pid':n});
					if(responseObj.status != 100){
						alertify.alert(lang._T(responseObj.error));
						return false;
					}else{
						$('.forum-post.p'+n).html('Message removed.');
					}
					return false;
			    } else {
			        return false;
			    }
			});	
		}	
		return false;
	},
	closePosts: function(){
		$('#forum-posts-screen').hide();
		destroyScroll('forumPostsScroll');
		$('#forum-posts-screen').empty();
		return false;
	},
	newReply: function(n){
		$('#forum-newposts-screen').html('<div class="b-main">\
					<div class="scroll-holder" ><div class="forum-holder">\
						<div><b>'+lang._T('Message')+'</b> <textarea name="subject" id="new-post-message"></textarea></div>\
					</div></div>\
				</div>\
				<div class="b-menu">\
					<button class="fl btn" style="margin-left:10px;" onclick="Forum.closeReply();">'+lang._T('Close')+'</button>\
					<div><button class="fr btn" onclick="Forum.createReply('+n+');">'+lang._T('Reply')+'</button></div>\
				</div>');
		$('#forum-newposts-screen').show();				
		return false;
	},	
	createReply: function(n){
		var message = $('#new-post-message').val();
		if(parseInt(n)<1){
			alertify.alert(lang._T('Cant find topic ID.'));
		}else if(Check.isEmpty(message)){
			alertify.alert(lang._T('Message must not be empty'));
		}else{
			Request.send({'object':'forum', 'action':'reply', 'tid':n, 'message':message});
			if(responseObj.status != 100){
				alertify.alert(lang._T(responseObj.error));
				return false;
			}else{
				Forum.closeReply();
				Forum.showPosts(n);
			}
		}	
		return false;
	},	
	closeReply: function(){
		$('#forum-newposts-screen').hide();
		$('#forum-newposts-screen').empty();
		return false;
	}
};
