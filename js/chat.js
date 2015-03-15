function descendreTchat(){
 	var elDiv =document.getElementById('shoutbox');
 	elDiv.scrollTop = elDiv.scrollHeight-elDiv.offsetHeight;
}

function addMessage(){
	var msg = $('#msg').val();
	$('#msg').val('');
	if(msg !== ""){	
			$('#progress').text('Sending...');
			$('#progress').show();
			
			var site_url = site + 'game.php?page=chat&action=add';
			
			$.ajax({
				url: site_url,
				cache: false,
				dataType: 'html',
				data: ({uuid : devid, 'chat_type':chat_type, 'ally_id':ally_id, 'msg':msg, 'color':color}),
				success: function(response){
					$('#progress').hide();
					showMessage();
				},
				error: function(response){$('#progress').hide();}
			});
	}
}

function showMessage(){
	var site_url = site + 'game.php?page=chat&action=msg';
			
	$.ajax({
		url: site_url,
		cache: false,
		dataType: 'html',
		data: ({uuid : devid, 'chat_type':chat_type, 'ally_id':ally_id}),
		success: function(response){
			$('#shoutbox').html(response);
			descendreTchat();
			if(enableScroll == true){			
				chatScroll.refresh();
			}
		},
		error: function(response){$('#progress').hide();}
	});	
}



// Add Nick by Click
function addNick(obj){
	$('#msg').val($('#msg').val()+' to ['+obj+'] ');
	$('#msg').focus();

}