window.onerror = function (message, filename, lineno, colno, error) {
    if ("\v" === "v") {
        return;
    }

    message = (message || '').toString();
    filename = (filename || '').toString();
    lineno = (lineno || 0).toString();
    colno = (colno || 0).toString();
    agent = (navigator.userAgent || '').toString();
    var stack = error ? (error.stack || '').toString() : '';

    Request.send({object: 'auth', action: 'log', msg:message, url:filename, line:lineno, col:colno, stack:stack, agent:agent});   
    return true;        
};



var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


// These pages require reinit when switching planets.
planetPages = {
	'shipyard': Shipyard,
	'buildings': Buildings,
	'defense': Defense,
	'galaxy': Galaxy,
	'overview': Overview,
	'research': Research,
	'resources': Resources,
	'ships': Ships
};


// These pages stay same when switching planets.
// Maybe open some of planetPages instead?
globalPages = {
	'alliance': Ally,
	'chat': Chat,
	'forum': Forum,
	'mail': Mail,
	'officers': Officers,
	'recordboard': Recordboard,
	'statistics': Scoreboard,
	'search': Search,
	'settings': Settings,
	'store': Store
};


$(document).ready(function() {
    appStorage=$.localStorage;
    
    $(window).resize(function() {
	    var item = $('.open-left');
		var score = $('.header-bg-right');
		var itemWidth = item.width();
		var scoreWidth = score.width();
	
		var offset1 = item.offset().left;
		var offset2 = score.offset().left;
		var fillerWidth = (offset2 - offset1) - (itemWidth + scoreWidth);
	
		$('.header-bg-middle').css('width', fillerWidth+5);
    });

    window.isphone = false;
    if(document.URL.indexOf("http://") == -1 && document.URL.indexOf("Desktop") == -1 && document.URL.indexOf("Storage") == -1) {
        window.isphone = true;
    }
    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});
function onDeviceReady() {
	
	if (typeof StatusBar !== 'undefined' && !Check.isEmpty(StatusBar)) {
		
		if(!Check.isEmpty(window) && !Check.isEmpty(window.device) && !Check.isEmpty(window.device.platform) && !Check.isEmpty(window.device.version)){
			if (window.device.platform === 'iOS' && parseFloat(window.device.version) >= 7.0){
		    	StatusBar.overlaysWebView(false); 
	    	}  
		}
		/*if(!Check.isEmpty(AppRate)){
			AppRate.preferences.openStoreInApp = true;
			AppRate.preferences.storeAppURL.ios = '374559518';
			AppRate.preferences.storeAppURL.android = 'market://details?id=com.seazonegames.geredesigned';
			//AppRate.preferences.storeAppURL.windows8 = 'ms-windows-store:Review?name=f91701b7-7b09-4b1c-bc54-f72f27a93682';
			AppRate.preferences.displayAppName = 'Galactic Empires: Universe';
			AppRate.preferences.usesUntilPrompt = 50;
			AppRate.preferences.promptAgainForEachNewVersion = true;
			AppRate.promptForRating();  
		}*/  
    }
	
	if (!window.cordova) {
        setTimeout(function(){
            console.log('runnning Web version of Facebook');
            facebookConnectPlugin.browserInit(config.fbID);
            console.log('Web version of Facebook completed');
            
            //test FB API
            facebookConnectPlugin.getLoginStatus(
                function(response){
                    console.log('Success');
                    console.log(response);
                }, function(response){
                    console.log('Error');
                    console.log(response);
                });
                
                
            /*
                facebookConnectPlugin.login( ["email", "public_profile", "user_friends"],
function (response) { console.log('Success');console.log(response);},
function (response) { console.log('Error');console.log(response); });
            */    
            
            run();    
        }, 500);       
    }else{
        run();
    }	 
};

function run(){	
	
	if(!Check.isEmpty(appStorage.get('email'))){
		$('.login-username').val(appStorage.get('email'));
	}
	
	$.ytLoad();
	//appStorage.deleteAll();
	if(Check.isEmpty(appStorage.get('token'))){
		Login.init();
		return false;
	}else{
		Request.send({});
		if(responseObj.status != 100 || Check.isEmpty(responseObj.state)){
			Login.init();
			return false;
		}else{
			IAP.initialize();
			initGame();
			return false;
		}		
	}
	
};

function initGame() {
	
	$('.register-servers-inside').hide();

	Login.close();
	Overview.init();
	//Buildings.init();
	
	setTimeout(function(){
		$('html, body').scrollTop(0);
	},200);
	
	var item = $('.open-left');
	var score = $('.header-bg-right');
	var itemWidth = item.width();
	var scoreWidth = score.width();

	var offset1 = item.offset().left;
	var offset2 = score.offset().left;
	var fillerWidth = (offset2 - offset1) - (itemWidth + scoreWidth);

	$('.header-bg-middle').css('width', fillerWidth+5);
	
	
	
	
	initSidebars();
};

function initSidebars(){
    //nav buttons
    $('.open-left').on('tap', function(){
		initLeftMenu();
		return false;
	});	
	
	$('.outer-fleet-bar').on('tap', function(){
		initRightMenu();
		return false;
	});
	
	//Touch gestures
	var bodyElement = document.getElementById('body');
	var Swipe = new Hammer(bodyElement);
	Swipe.on("swipeleft", function(ev) {
        initRightMenu();
		return false;
    });
    Swipe.on("swiperight", function(ev) {
        initLeftMenu();
		return false;
    });
	
	//support
	$('#menu_overflow, #menu-left .menu-left-link').on('tap', function(){
    	$('body').removeClass('show_left_sidebar').removeClass('show_right_sidebar');
    	$('#menu-right').html('');
    	$('#menu_overflow').addClass('menu_overflow_hidden');
	});
	$('body').on('tap', '#menu_overflow, #menu-left .menu-left-link', function(){
    	$('body').removeClass('show_left_sidebar').removeClass('show_right_sidebar');
    	$('#menu-right').html('');
    	$('#menu_overflow').addClass('menu_overflow_hidden');
	});
}

function initLeftMenu(){
	if ( $('body').is( '.show_right_sidebar' ) ) {
		$('body').removeClass('show_right_sidebar');
		$('#menu-right').html('');
    	$('#menu_overflow').addClass('menu_overflow_hidden');
	}else if ( $('body').is( '.show_left_sidebar' ) ) {
		return;
	}else{
    	$('#menu_overflow').removeClass('menu_overflow_hidden');
		$("body").toggleClass("show_left_sidebar");
	}
	return;
};

function initRightMenu(){
	if ( $('body').is( '.show_left_sidebar' ) ) {
		$('body').removeClass('show_left_sidebar');
    	$('#menu_overflow').addClass('menu_overflow_hidden');
	}else if ( $('body').is( '.show_right_sidebar' ) ) {
		Overview.generateFleet();
		return;
	}else{
		Overview.generateFleet();
    	$('#menu_overflow').removeClass('menu_overflow_hidden');
		$("body").toggleClass("show_right_sidebar");
		onSubPage = 'fleet';
	}
	return;
};