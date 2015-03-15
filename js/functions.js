var site = "";
var devid = "";
var ct = "";
var timer_is_on = false;

function loader2() {
	var state = document.readyState;
	if (state == 'loaded' || state == 'complete') {
		run();
	} else {
		if (navigator.userAgent.indexOf('Browzr') > -1) {
			setTimeout(run, 250);
		} else {
			document.addEventListener('deviceready', run, false);
		}
	}
}

function run() {
	if (navigator.onLine == false) {
		navigator.notification.alert(
			"There was an error connecting to the Internet.",
			"No Internet connection",
			//"Try Again?",
			{
				onClose: function (buttonIndex) {
					run();
				}
			}
		);
	} else {
		gameInfo();
		//alert("devid1: "+devid);
		//alert("site: "+site);
		login();
	}
}

function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 64;
	var randomstring = '';
	for (var i = 0; i < string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum + 1);
	}
	return randomstring;
}

function isEmpty(o) {
	if (typeof o == 'undefined' || o === null || o === '') return true;
	if (typeof o == 'number' && isNaN(o)) return true;
	if (o instanceof Date && isNaN(Number(o))) return true;
	return false;
}

function gameInfo() {
	if (isEmpty(localStorage.getItem('uuid'))) {
		devid = randomString();
		localStorage.setItem('uuid', devid);
	} else {
		devid = localStorage.getItem('uuid');
	}
	site = 'http://ge.seazonegames.com/';
}

// Start Login Function
function login() {
	$('#progress').text('Connecting...');
	$('#progress').show();

	var site_url = site + 'index.php';

	$.ajax({
		url: site_url,
		cache: false,
		dataType: 'html',
		data: ({uuid: devid}),
		success: function (response) {
			$('#content').html(response);
			$('#progress').hide();
			$('#progress').text('Loading...');
		},
		error: function () {
			$('#progress').html('Server Error!<br/><input type="button" value="Try Again" ontouchend="login();"/> <input type="button" value="Cancel" ontouchend="$(\'#progress\').hide();"/>');
		}
	});
}
//End Login Function

//Start Load Page
function loadPage(page, container, go, effect) {
	$('#progress').text('Loading...');
	$('#progress').show();
	clearInterval(showMessage);

	if (timer_is_on == true) {
		clearInterval(ct);
		timer_is_on = false;
	}

	window.scrollTo(0, 0);
	if (container == undefined) {
		container = '#content';
	}
	if (page == undefined) {
		page = 'game.php';
	}
	$.ajax({
		url: site + page,
		cache: false,
		dataType: 'html',
		data: ({uuid: devid}),
		success: function (response) {
			//alert(response);
			$(container).html(response);
			$('#progress').hide();
			//updateResources();
			if (go == true) {
				jQT.goTo(container, effect);
			}

			if (container == '#content') {
				$('#s2').html(' ');
				$('#s3').html(' ');
				$('#s4').html(' ');
				$('#s5').html(' ');
				$('#s6').html(' ');
				$('#res_tab').html(' ');
				$('#write_msg').html(' ');
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			//alert("xhr: " +xhr+ "  ajaxOptions: "+ajaxOptions+"   thrownError: "+thrownError);
			$('#progress').html('Server Error!<br/><input type="button" value="Try Again" ontouchend="loadPage(\'' + site + page + '\',\'' + container + '\');"/> <input type="button" value="Cancel" ontouchend="$(\'#progress\').hide();"/>');
		}
	});
	return false;
}
//End Load Page


//Start Submit Form
function doLogin() {
	$('#progress').text('Verifying...');
	$('#progress').show();
	$('.error').hide();

	var username = $('#username').val();
	var password = $('#password').val();

	var site_url = site + 'index.php' + '?page=login&username=' + username + '&password=' + password + '&showtip=1';
	$.ajax({
		url: site_url,
		cache: false,
		dataType: 'html',
		data: ({uuid: devid}),
		success: function (response) {
			if (response == '1') {
				loadPage();
				$('.toolbar').show();
			} else {
				$('.error').text('Incorrect data entered!');
				$('.error').show();
			}
			$('#progress').hide();
		},
		error: function (xhr, ajaxOptions, thrownError) {
			//alert("xhr: " +xhr+ "  ajaxOptions: "+ajaxOptions+"   thrownError: "+thrownError);
			$('#progress').html('Server Error!<br/><input type="button" value="Try Again" ontouchend="login();"/> <input type="button" value="Cancel" ontouchend="$(\'#progress\').hide();"/>');
		}
	});
	return false;
}
//End Submit Form

//Update Resources
function updateResources() {
	$.get(site + "ResUpdate.php?uuid=" + devid, function (theXML) {
		$('return', theXML).each(function (i) {

			//Update Metal
			if ($(this).find("metal").attr("title") == 'red') {
				$('#metal').html('<span class="red">' + $(this).find("metal").text() + '</span>');
			} else {
				$('#metal').html($(this).find("metal").text());
			}

			//Update crystal
			if ($(this).find("crystal").attr("title") == 'red') {
				$('#crystal').html('<span class="red">' + $(this).find("crystal").text() + '</span>');
			} else {
				$('#crystal').html($(this).find("crystal").text());
			}

			//Update deuterium
			if ($(this).find("deuterium").attr("title") == 'red') {
				$('#deuterium').html('<span class="red">' + $(this).find("deuterium").text() + '</span>');
			} else {
				$('#deuterium').html($(this).find("deuterium").text());
			}

			//Update energy
			if ($(this).find("energy").attr("title") == 'red') {
				$('#energy').html('<span class="red">' + $(this).find("energy").text() + '</span>');
			} else {
				$('#energy').html($(this).find("energy").text());
			}

			//Update darkmatter
			$('#darkmatter').html($(this).find("darkmatter").text());

			//Update message icon
			if ($(this).find("new_message").text() == '0') {
				$('#mes_icon').attr("src", 'images/mail.png');
			} else {
				$('#mes_icon').attr("src", 'images/new_mail.png');
			}

		});
	});
	return false;
}

function selectAvatar(ava) {
	$('#progress').text('Loading...');
	$('#progress').show();
	var site_url = site + 'game.php?page=options&mode=avatar&ava=' + ava;
	$.ajax({
		url: site_url,
		cache: false,
		dataType: 'html',
		data: ({uuid: devid}),
		success: function (response) {
			$('#progress').hide();
			Notification.prototype.alert('Avatar has been changed.', "Successful", "Ok");
		}
	});
}


function increment(item) {
	if (Number($("#" + item).val()) < 1) {
		$("#" + item).val('1');
		return false;
	}
	$("#" + item).val(Number($("#" + item).val()) + 1);
}

function decrement(item) {
	if (Number($("#" + item).val()) < 1 || Number($("#" + item).val()) == 1) {
		$("#" + item).val('1');
		return false;
	}
	$("#" + item).val(Number($("#" + item).val()) - 1);
}

function showLoader() {
	$('#progress').text('Loading...');
	$('#progress').show();
}

function hideLoader() {
	$('#progress').hide();
}

function checkNetwork() {
	if (navigator.onLine == false) {
		alert("Error: No internet Connection");
	}

}
// Other End				