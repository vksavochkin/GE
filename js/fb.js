//////////////////////////
//
// Authentication
// See "Logging the user in" on https://developers.facebook.com/mobile
//
//////////////////////////

//Detect when Facebook tells us that the user's session has been returned

function authUser() {
	FB.Event.subscribe('auth.statusChange', handleStatusChange);
}
// Handle status changes
function handleStatusChange(session) {
	//console.log('Got the user\'s session: ', session);
	//alert(session.authResponse.accessToken);
	if (session && session.authResponse) {
		accessToken = session.authResponse.accessToken;
		//document.body.className = 'connected';
		//Fetch user's id, name, and picture
		FB.api('/me', {
			fields: 'id, name, picture, gender, email, username'
		}, function(response) {
			if (!response.error) {
				$('body').removeClass('not_connected').addClass('connected');
				user = response;
				console.log('Got the user\'s name and picture: ' + JSON.stringify(response));
				initGame();
			} else {
            	$('body').removeClass('connected').addClass('not_connected');
            	console.log('Error getting user info: ' + JSON.stringify(response.error));
            	//Check	for errors due to app being unininstalled
				if (response.error.error_subcode && response.error.error_subcode == "458") {
					setTimeout(function() {
						alert("The app was removed. Please log in again.");
					}, 0);
				}
				logout();
			}
			clearAction();
		});
	} else {
		$('body').removeClass('connected').addClass('not_connected');
		clearAction();
	}
}
//Prompt the user to login and ask for the 'email' permission
function promptLogin() {
	FB.login(null, {
		scope: 'email'
	});
}

//See https://developers.facebook.com/docs/reference/javascript/FB.logout/
function logout() {
	FB.logout(function(response) {
		window.location.reload();
	});
}

//Detect when Facebook tells us that the user's session has been returned
function updateAuthElements() {
	FB.Event.subscribe('auth.statusChange', function(session) {
		if (session.authResponse) {
			//The user is logged in, so let's pre-fetch some data and check the current 
			//permissions to show/hide the proper elements.
			preFetchData();
		}
	});
}

//Get the user's friends
function getUserFriends() {
	var markup = '<div class="data-header">Friends (capped at 25):</div>';
	for (var i = 0; i < friendsInfo.length && i < 25; i++) {
		var profilePictureUrl = '';
		if (friendsInfo[i].picture.data) {
			profilePictureUrl = friendsInfo[i].picture.data.url;
		} else {
			profilePictureUrl = friendsInfo[i].picture;
		}
		markup = markup + '<img src="' + profilePictureUrl + '">' + friendsInfo[i].name + '<br />';
	}
	document.getElementById('user-friends').innerHTML = markup;
}

//Pre-fetch data, mainly used for requests and feed publish dialog
function preFetchData() {
	//First, get friends that are using the app
	FB.api({
		method: 'friends.getAppUsers'
	}, function(appFriendResponse) {
		appFriendIDs = appFriendResponse;
		//Now fetch all of the user's friends so that we can determine who hasn't used the app yet
		FB.api('/me/friends', {
			fields: 'id, name, picture, gender, email, username'
		}, function(friendResponse) {
			//console.log('Friends: ', friendResponse.data);
			friends = friendResponse.data;
			//limit to a 200 friends so it's fast
			for (var k = 0; k < friends.length && k < 200; k++) {
				var friend = friends[k];
				var index = 1;
				friendIDs[k] = friend.id;
				friendsInfo[k] = friend;
				for (var i = 0; i < appFriendIDs.length; i++) {
					if (appFriendIDs[i] == friend.id) {
						index = -1;
					}
				}
				if (index == 1) {
					nonAppFriendIDs.push(friend.id);
				}
			}
			//console.log('Got your friend\'s that use the app: ', appFriendIDs);
			//console.log('Got all of your friends: ', friendIDs);
			//console.log('Got friends that are not using the app yet: ', nonAppFriendIDs);
		});
	});
}
//Send an invite to friends that haven't logged into the app yet

function sendRequestInvite() {
	FB.ui({
		method: 'apprequests',
		suggestions: nonAppFriendIDs,
		message: 'Learn how to make your mobile web app social',
	}, function(response) {
		console.log('sendRequestInvite UI response: ', response);
	});
}
//Publish a story to the user's own wall

function publishStory() {
	FB.ui({
		method: 'feed',
		name: 'I\'m using the Hackbook web app',
		caption: 'Hackbook for Mobile Web.',
		description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
		link: 'http://apps.facebook.com/mobile-start/',
		picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
		actions: [{
			name: 'Get Started',
			link: 'http://apps.facebook.com/mobile-start/'
		}],
	}, function(response) {
		console.log('publishStory UI response: ', response);
	});
}
//Publish a story to the user's friend's wall

function publishStoryFriend() {
	randNum = Math.floor(Math.random() * friendIDs.length);
	var friendID = friendIDs[randNum];
	console.log('Opening a dialog for friendID: ', friendID);
	FB.ui({
		method: 'feed',
		to: friendID,
		name: 'I\'m using the Hackbook web app',
		caption: 'Hackbook for Mobile Web.',
		description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
		link: 'http://apps.facebook.com/mobile-start/',
		picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
		actions: [{
			name: 'Get Started',
			link: 'http://apps.facebook.com/mobile-start/'
		}],
		user_message_prompt: 'Tell your friends about building social web apps.'
	}, function(response) {
		console.log('publishStoryFriend UI response: ', response);
	});
}