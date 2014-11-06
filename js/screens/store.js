
var IAP = {
    list: [],
    products: {},
    localStorage: window.localStorage || {},
	initialize: function () {
        // Check availability of the storekit plugin
        if (!window.storekit) {
            console.log('iOS In-App Purchases not available');
            return;
        }

        // Initialize
        storekit.init({
            ready:    IAP.onReady,
            purchase: IAP.onPurchase,
            restore:  IAP.onRestore,
            error:    IAP.onError
        });
	},

	onReady: function () {
        // Once setup is done, load all product data.
        Request.send({'object':'store', 'action':'applelist' });
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{
            IAP.list = [];
            foreach(responseObj.storeapplelist.list, function(k,v){
                IAP.list.push(v);
            });
		}

        storekit.load(IAP.list, function (products, invalidIds) {
            console.log('IAPs loading done:');
            for (var j = 0; j < products.length; ++j) {
                var p = products[j];
                console.log('Loaded IAP(' + j + '). title:' + p.title +
                            ' description:' + p.description +
                            ' price:' + p.price +
                            ' id:' + p.id);
                IAP.products[p.id] = p;
            }
            IAP.loaded = true;
            for (var i = 0; i < invalidIds.length; ++i) {
                console.log('Error: could not load ' + invalidIds[i]);
            }
        });
    },

    onPurchase: function (transactionId, productId) {
        var n = (IAP.localStorage['storekit.' + productId]|0) + 1;
        IAP.localStorage['storekit.' + productId] = n;
        IAP.validateIAP(transactionId, productId);
        
        /*if (IAP.purchaseCallback) {
            IAP.purchaseCallback(transactionId, productId, receipt);
            delete IAP.purchaseCallbackl;
        }*/
    },
    
    validateIAP: function(transactionId, productId){
		console.log('validating productId: ' + productId);
		console.log('validating transactionId: ' + transactionId);
		
		var receipt = '';
		window.storekit.loadReceipts(function (receipts) {
		    receipt = receipts.appStoreReceipt; // null or base64 encoded receipt (iOS >= 7)
		    receipt_transaction = receipts.forTransaction(transactionId); // null or base64 encoded receipt (iOS < 7)
			receipt_product = receipts.forProduct(productId); // null or base64 encoded receipt (iOS < 7)
			
			try {
				
				Request.send({object:'store',action:'validate',receipt:receipt, transactionId:transactionId,productId:productId, receipt_transaction:receipt_transaction, receipt_transaction:receipt_transaction});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{
					if(!Check.isEmpty(responseObj.storevalidate.success)){
						alertify.alert(lang._T(responseObj.storevalidate.success));
					}
					 if(!Check.isEmpty(responseObj.storevalidate.error_msg)){
						alertify.alert(lang._T(responseObj.storevalidate.error_msg));
					}		
				}
				
				//InApp.sendMessage( InApp.validatePurchaseURL, receipt, InApp.validateInAppSuccess, InApp.validateInAppFailure);
			} catch(e) {
				alertify.alert(lang._T("Your in-app purchase could not be validated. Transaction ID: "+transactionId));
			}
		});
		
	},

    onError: function (errorCode, errorMessage) {
        if(errorCode == 2 || errorCode == 4983503){
	        alertify.alert('Purchase has been canceled.');
        }else{
	        alertify.alert('Error: ' + errorMessage +' Code: '+errorCode);
        }
        
    },

    onRestore: function (transactionId, productId/*, transactionReceipt*/) {
        var n = (IAP.localStorage['storekit.' + productId]|0) + 1;
        IAP.localStorage['storekit.' + productId] = n;
    },

    buy: function (productId, callback) {
        IAP.purchaseCallback = callback;
        storekit.purchase(productId);
    },

    restore: function () {
        storekit.restore();
    },

    fullVersion: function () {
        return IAP.localStorage['storekit.ge'];
    }
};

var renderIAPs = function (el) {
	if (IAP.loaded) {
		var html = '<div class="table inapp-list">';
		for (var id in IAP.products) {
			var prod = IAP.products[id];
			html += '<div><div><p style="padding:10px 0px 5px;">'+prod.title+'</p></div><div style="width:70px;"><a class="btn fr" onclick="IAP.buy(\''+prod.id+'\')">'+prod.price+'</a></div></div>';
		}
		html += '</div>';
	}else{
    	var html = '<p style="text-align:center">In-App Purchases not available.</p>';
	}
	return html;
};





var AIAP = {
    list: [],
    products: {},
    localStorage: window.localStorage || {},
    loaded: false,
	initialize: function () {
        // Check availability of the storekit plugin
        if (typeof inappbilling == 'undefined' || Check.isEmpty(inappbilling)) {
            console.log('Android In-App Purchases not available');
            return;
        }
		
		/*Request.send({'object':'store', 'action':'androidlist', });
		if(responseObj.status != 100){
			alertify.alert(lang._T(responseObj.error));
			return false;
		}else{
            AIAP.list = [];
            foreach(responseObj.androidlist.list, function(k,v){
                AIAP.list.push(v);
            });
		}*/
		
        // Initialize
        inappbilling.init(
            AIAP.onReady, 
            function(error){console.log('Error: can\'t initialize InApps: ' + error);}, 
            {showLog:true},
            [
	            "com.seazonegames.geredesigned.1000",
	            "com.seazonegames.geredesigned.3000",
				"com.seazonegames.geredesigned.5000",
				"com.seazonegames.geredesigned.10000",
				"com.seazonegames.geredesigned.20000"
			]
        );
	},

	onReady: function () {
        // Once setup is done, load all product data.
        
        
        inappbilling.getProductDetails(function(data, data2,data3){
        console.log(data);
        console.log(data2);
        console.log(data3);
            console.log('IAPs loading done:');
            console.log(data);
            
            AIAP.loaded = true;
        }, function(error){
            console.log('Error: could not load InApps: ' + error);
        }, AIAP.list);
        
        /*storekit.load(IAP.list, function (products, invalidIds) {
            console.log('IAPs loading done:');
            for (var j = 0; j < products.length; ++j) {
                var p = products[j];
                console.log('Loaded IAP(' + j + '). title:' + p.title +
                            ' description:' + p.description +
                            ' price:' + p.price +
                            ' id:' + p.id);
                IAP.products[p.id] = p;
            }
            IAP.loaded = true;
            for (var i = 0; i < invalidIds.length; ++i) {
                console.log('Error: could not load ' + invalidIds[i]);
            }
        });*/
    },

    onPurchase: function (transactionId, productId) {
        var n = (IAP.localStorage['storekit.' + productId]|0) + 1;
        IAP.localStorage['storekit.' + productId] = n;
        IAP.validateIAP(transactionId, productId);
        
        /*if (IAP.purchaseCallback) {
            IAP.purchaseCallback(transactionId, productId, receipt);
            delete IAP.purchaseCallbackl;
        }*/
    },
    
    validateIAP: function(transactionId, productId){
		console.log('validating productId: ' + productId);
		console.log('validating transactionId: ' + transactionId);
		
		var receipt = '';
		window.storekit.loadReceipts(function (receipts) {
		    receipt = receipts.appStoreReceipt; // null or base64 encoded receipt (iOS >= 7)
		    receipt_transaction = receipts.forTransaction(transactionId); // null or base64 encoded receipt (iOS < 7)
			receipt_product = receipts.forProduct(productId); // null or base64 encoded receipt (iOS < 7)
			
			try {
				
				Request.send({object:'store',action:'validate',receipt:receipt, transactionId:transactionId,productId:productId, receipt_transaction:receipt_transaction, receipt_transaction:receipt_transaction});
				if(responseObj.status != 100){
					alertify.alert(lang._T(responseObj.error));
					return false;
				}else{
					if(!Check.isEmpty(responseObj.storevalidate.success)){
						alertify.alert(lang._T(responseObj.storevalidate.success));
					}
					 if(!Check.isEmpty(responseObj.storevalidate.error_msg)){
						alertify.alert(lang._T(responseObj.storevalidate.error_msg));
					}		
				}
				
				//InApp.sendMessage( InApp.validatePurchaseURL, receipt, InApp.validateInAppSuccess, InApp.validateInAppFailure);
			} catch(e) {
				alertify.alert(lang._T("Your in-app purchase could not be validated. Transaction ID: "+transactionId));
			}
		});
		
	},

    onError: function (errorCode, errorMessage) {
        if(errorCode == 2 || errorCode == 4983503){
	        alertify.alert('Purchase has been canceled.');
        }else{
	        alertify.alert('Error: ' + errorMessage +' Code: '+errorCode);
        }
        
    },


    buy: function (productId, callback) {
        inappbilling.buy(
            callback, 
            function(error){
                alertify.alert('Something is wrong. Can\'t make purchase.');
                console.log('Error: when buy: ' + error);
            },
            productId
        );
    }
};

var renderAIAPs = function (el) {
	if (AIAP.loaded) {
		var html = '<div class="table inapp-list">';
		for (var id in AIAP.products) {
			var prod = AIAP.products[id];
			html += '<div><div><p style="padding:10px 0px 5px;">'+prod.title+'</p></div><div style="width:70px;"><a class="btn fr" onclick="AIAP.buy(\''+prod.id+'\')">'+prod.price+'</a></div></div>';
		}
		html += '</div>';
	}else{
    	var html = '<p style="text-align:center">In-App Purchases not available.</p>';
	}
	return html;
};






 
 
 
 var Store= {
 
 	type: 'unknown',
 
	pageID: '.page-store',
	init: function () {
	
		//if( isMobile.iOS() ){ Store.type = 'ios'; }
		//if( isMobile.Android() ){ Store.type = 'android'; }
		//if( isMobile.Windows() ){ Store.type = 'windows'; }
	
		$('.page-content').hide();
		onPage = 'store';	
		$('.bar-title h1').html('Store');
		$('.bar-title span').html('');		
		this.content();
		$(this.pageID).show();
		makeScroll('page-store-scroll');
		return false;
	},
	close: function(){
		$(this.pageID).hide();
		return false;
	},
	content: function(){
		
		$('.store-list').html('<div class="store-block"><div class="inapp-block"></div><div class="paypal-block"></div></div>');	
		
		if (window.storekit) {
			//Load In-App
			$('.inapp-block').html(renderIAPs());
        }
		
		if (typeof inappbilling !== 'undefined') {
			//Load In-App
			
			//AIAP.initialize();
			//$('.inapp-block').html(renderAIAPs());
        }
		
		//Load Paypal
		Request.send({object:'store',action:'paypal'});//, type:Store.type
		if(responseObj.status == 100){
			$('.paypal-block').html(responseObj.storepaypal.html);			
		}
		
		
		return false;
	}
};