var InApp = {
    bundles:[],
    productInfo:[],
    bundleIDListURL: "http://ge.seazonegames.com/store/appids.js",
    validatePurchaseURL: "http://ge.seazonegames.com/store/validating.php",

    sendMessage:function(url,data,success,error) {
        $.ajax({
		url: url,
		cache: false,
		dataType: 'json',
		data: data,
		timeout:25000,	   
		success: success,
        error: error
        });
    },

 
    getInAppList:function() {
         try {
            InApp.sendMessage(InApp.bundleIDListURL, {}, InApp.getIdsSuccessCallback, InApp.getIdsErrorCallback); 
        } catch (e) {
            var msg = "Couldn't send message to retrieve in-app list";
            // display msg
			$('#storelist').html("Couldn't send message to retrieve in-app list");
			Notification.prototype.alert(msg, null, "Unsuccessful", "Ok");
        } 
 
   },
   
   getIdsSuccessCallback: function (data) {
               
       InApp.bundles = data;
       
        if(data.length == 0) {
            var msg = "No In app items available";
            Notification.prototype.alert(msg, null, "Unsuccessful", "Ok");
        } else {
            //alert("Calling AppStore.prototype.productList");
            AppStore.prototype.productList(InApp.productListCallback, data);
        }
    },
    
    getIdsErrorCallback: function (error) { 
        var msg = "Couldn't retrieve in app list";
        // display msg
		Notification.prototype.alert(msg, null, "Unsuccessful", "Ok");
    },
   

   productListCallback: function(productArray) {
        //alert("Got productListCallback from app store");
        productArray.sort(function(a,b){return parseInt(InApp.getIDForProductId(a.productIdentifier)) - parseInt(InApp.getIDForProductId(b.productIdentifier))});
        InApp.productInfo = productArray;
        // Display product list
			InApp.productListHTML();
        // test in app purchase
        //InApp.doInAppPurchase(productArray[0]);
        
    },
    
    productListHTML:function() {
      var inapp_list_html = '';
        for(var i in InApp.productInfo) {
              inapp_list_html += InApp.list_html(InApp.productInfo[i]);
         }
			$('#storelist').html('<ul class="plastic">'+inapp_list_html+'</ul>')
        // display inapp_list_html
    },
         
    // the in app purchase items are  { localizedDescription: '%@', localizedTitle:'%@', price:'%@', productIdentifier:'%@'}"
    list_html: function(item) {
        return "<li><a onclick='InApp.doInAppPurchase(\""+item.productIdentifier+"\")'>"+item.localizedTitle+"<small class='counter'>"+item.price+"</small></a></small>";
    },

    doInAppPurchase: function(productIdentifier) {
        var msg = "Validating In App Purchase";
        //display msg
		ModalDialog.open("Processing", msg);   
        AppStore.prototype.purchase(InApp.purchaseCallback, productIdentifier);
    },
    
    // result is { quantity:'%d', productIdentifier:'%@', transactionReceipt:'%@'}
    // or result is {} on cancel
    purchaseCallback: function(result) {
        if(typeof(result.quantity) == "undefined" ) {
            // display msg
			ModalDialog.close();
            return;
        }
		//alert(result.transactionReceipt);
        var msg = "Completing in-app purchase";
		// display msg
		$("#modalDialog .content").html("Completing in-app purchase");
        try {                       
            var receipt = {uuid : devid,receipt:result.transactionReceipt};
            InApp.sendMessage( InApp.validatePurchaseURL, receipt, InApp.validateInAppSuccess, InApp.validateInAppFailure);
        } catch(e) {
            var msg = "Your in-app purchase could not be sent";			
			Notification.prototype.alert(msg, null, "Unsuccessful", "Ok");
			ModalDialog.close();
        }
    },
    
    validateInAppSuccess: function(data) {
		Notification.prototype.alert(data.Error.message, null, data.Error.name, "Ok");
        // display msg
		ModalDialog.close();
    },
     
    validateInAppFailure:  function(error) {
        var msg = "Your in-app purchase did not go through";
        // display msg
		Notification.prototype.alert(msg, null, "Unsuccessful", "Ok");
		ModalDialog.close();
    },

 
    getIDForProductId: function(productId) {
        var expr = /^com\.seazonegames\.[^.]*\.([^.]*).*$/;
        return productId.match(expr)[1];
    }
 
 }