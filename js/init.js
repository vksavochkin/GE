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
		if(!Check.isEmpty(AppRate)){
			AppRate.preferences.openStoreInApp = true;
			AppRate.preferences.storeAppURL.ios = '374559518';
			AppRate.preferences.storeAppURL.android = 'market://details?id=com.seazonegames.geredesigned';
			//AppRate.preferences.storeAppURL.windows8 = 'ms-windows-store:Review?name=f91701b7-7b09-4b1c-bc54-f72f27a93682';
			AppRate.preferences.displayAppName = 'Galactic Empires: Universe';
			AppRate.preferences.usesUntilPrompt = 50;
			AppRate.preferences.promptAgainForEachNewVersion = true;
			AppRate.promptForRating();  
		}  
    }
	
	run();
	
	   
	   
};

function run(){
	storage=$.localStorage;	
	
	if(!Check.isEmpty(storage.get('email'))){
		$('.login-username').val(storage.get('email'));
	}
	
	$.ytLoad();
	//storage.deleteAll();
	if(Check.isEmpty(storage.get('token'))){
		Login.init();
		return false;
	}else{
		Request.send({});
		if(responseObj.status != 100 || Check.isEmpty(responseObj.state)){
			Login.init();
			return false;
		}else{
			IAP.initialize();
			AIAP.initialize();
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
	
	$('.open-left').on('click', function(){
		initLeftMenu();
	});
	
	
	$('.outer-fleet-bar').on('click', function(){
		initRightMenu();
	});
	
	
	$(document).hammer().on('swipeleft', function(){
	   initRightMenu();
    });
	
    // Show left bar
    $(document).hammer().on('swiperight', function(){
		initLeftMenu();
    });
	
};


function initLeftMenu(){
	//Init Menu
	$('nav#menu-left').mmenu(
		{
			"classes": "overthrow",
			position:'left'
		},
		{
			panelNodetype: 'ul',
			clone:true
		}
	);
	
	//Open Menu
	$('#mm-menu-left').trigger( 'open.mm' ).on('closed.mm', function(e){
		$('#mm-menu-left').html('').remove();
	});
	
	//Make it scroll
	makeScroll('mm-menu-left');
};

function initRightMenu(){
	//Generate Fleet table
	Overview.generateFleet();
	
	//Init Menu
	$('nav#menu-right').mmenu(
		{
			"classes": "overthrow",
			position:'right'
		},
		{
			panelNodetype: 'ul',
			clone:true
		}
	);
	
	//Open Menu
	$('#mm-menu-right').trigger( 'open.mm' ).on('closed.mm', function(e){
		$('#mm-menu-right').html('').remove();
		onSubPage = '';
	}).on('close.mm', function(e){
		onSubPage = '';
	}).on('closing.mm', function(e){
		onSubPage = '';
	});
	
	//Make it scroll
	makeScroll('mm-menu-right');
	onSubPage = 'fleet';
};