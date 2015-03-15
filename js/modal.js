var ModalDialog = {
    queue: [],
    dialog_open: false,
    timer_id: null,
    open: function (g, f) {
        if (ModalDialog.dialog_open || ModalDialog.queue.length > 0) {
            ModalDialog.queue.push({
                title: g,
                content: f
            });
            return
        }

        $("#modalDialog h1 span").html(g);
        $("#modalDialog .content").html(f);
        $("#modalDialog .box").removeClass().addClass("box");        
        $("#modalDialog").show();        
        ModalDialog.dialog_open = true;
    },
    close: function () {
        $("#modalDialog").hide();
        ModalDialog.dialog_open = false;
    },
	show: function(title,text){
		Notification.prototype.alert(text, title, "Ok");	
	},
};