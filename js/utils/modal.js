var Modal = {
	init: function(title, content){
		var height = 350;
		var width = 300;
		var top = 50;//percent
		var left = 50;//percent
		
		if( $('.modal_box').length ){
			$('.modal_box .modal_title').html(title);
			$('.modal_box .inner_modal_box').html(content);
		}else{
			Modal.add_block_page();
			Modal.add_popup_box(title, content);
			Modal.add_styles(height, width, top, left);
				
			$('.modal_box').fadeIn();
		}	
		
		makeScroll('modal_scroller');
	},
	close:function(){
		$('.block_page, .modal_overlay').fadeOut().remove();
	},
	add_block_page:function(){
		var block_page = $('<div class="block_page"></div>');
		$(block_page).appendTo('body');
	},
	add_popup_box:function(title, content){
		var pop_up = $('<div class="modal_overlay"></div>'+
							'<div class="modal_box">'+
			 					'<h2 class="modal_title">' + title + '</h2>'+
			 					'<a href="#" class="modal_close"></a>'+
			 					'<div class="inner_modal_box overthrow" id="modal_scroller">'+
			 						'' + content + ''+
			 					'</div>'+
			 				'</div>');
			 $(pop_up).appendTo('.block_page');
			 			 
			 $('.modal_close,.modal_overlay').click(function(){
				//$(this).parent().fadeOut().remove();
				Modal.close();				 
			 });
	},
	add_styles:function( height, width, top, left){
		$('.modal_box').css({ 
				'position':'absolute', 
				'left':left+'%',
				'top':top+'%',
				'display':'none',
				'height': height + 'px',
				'width': width + 'px',
				'margin-top': '-'+(height/2) + 'px',
				'margin-left': '-'+(width/2) + 'px',
				'border':'1px solid #10bac8',
				'-webkit-background-clip': 'padding',
				'-moz-background-clip': 'padding',
				'background-clip': 'padding-box',
				'border-radius':'8px',
				'-moz-border-radius':'8px',
				'-webkit-border-radius':'8px',
				'background-image': 'url(images/bg3.png)', 
				'z-index':'50'
			});

			$('.modal_close').css({
				'position':'absolute',
				'top':'3px',
				'right':'3px',
				'display':'block',
				'height':'20px',
				'width':'20px',
				'background': 'url(images/close.png) no-repeat',
				'-webkit-background-size': '100% 100%',
				'background-size': '100% 100%'
			});

			$('.modal_title').css({
				'position':'absolute',
				'top':'0px',
				'left':'0px',
				'right': '0px',
				'display':'block',
				'height':'20px',
				'font-size': '15px',
				'margin': '0px',
				'padding': '10px 10px'
			});
                        /*Block page overlay*/
			var pageHeight = $(document).height();
			var pageWidth = $(window).width();

			$('.block_page').css({
				'position':'absolute',
				'top':'0',
				'left':'0',
				'background-color':'rgba(0,0,0,0.6)',
				'height':'100%',//pageHeight,
				'width':'100%',//pageWidth,
				'z-index':'10'
			});
			
			$('.modal_overlay').css({
				'width': '100%',
				'height': '100%',
				'position': 'absolute',
				'top': '0px',
				'left': '0px',
				'right': '0px',
				'bottom': '0px',
				'z-index': '49',
				'display': 'block'
			});
			$('.inner_modal_box').css({
				'position':'absolute',
				'top':'30px',
				'left':'10px',
				'right':'10px',
				'bottom':'10px',
				'background-color':'none',
				'padding':'0px',
				'margin':'0px',
				'overflow': 'hidden'
			});
	}

}
