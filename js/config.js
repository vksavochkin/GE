var user = {};
var accessToken = '';
var storage = {};
var nonAppFriendIDs = [];
var appFriendIDs = [];
var friendIDs = [];
var friendsInfo = [];

var responseObj = {};
var planet = {};
var scrollers = {};
var onPage = 'Main'; //Main, Post, Mine, Harbour, Fight, Farm
var onSubPage = '';
var iconsPath = 'images/theme/items/';
var graphicPath = 'images/theme/320/';  
var fdata = {};
var config = {
    device: 'ios', // 'ios', 'android', 'wp', 'browser'
    app:true,
    debug: false,
    logToDevice: false,
	logType: 'alert',// none, device, alert, navigator, console
    isOnDevice: true,
	gameName: "GE",
	gameNameShort: "GE",
    version: "1.6.3",
	lang: 'en',
	live: 1, // 1-on / 0-off
	gamePaused: false,
	/* XHR */
	useCover: false,
	gameURL: 'http://ge.seazonegames.com/api.php',
	domain: 'http://ge.seazonegames.com/',
	timeout: 10000,
	dataType: 'json'	
};
