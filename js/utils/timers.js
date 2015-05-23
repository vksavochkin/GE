(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    var $w = $(window);
    $.fn.visible = function(partial,hidden,direction){

        if (this.length < 1)
            return;

        var $t        = this.length > 1 ? this.eq(0) : this,
            t         = $t.get(0),
            vpWidth   = $w.width(),
            vpHeight  = $w.height(),
            direction = (direction) ? direction : 'both',
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        if (typeof t.getBoundingClientRect === 'function'){

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = rec.top    >= 0 && rec.top    <  vpHeight,
                bViz = rec.bottom >  0 && rec.bottom <= vpHeight,
                lViz = rec.left   >= 0 && rec.left   <  vpWidth,
                rViz = rec.right  >  0 && rec.right  <= vpWidth,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                hVisible   = partial ? lViz || lViz : lViz && rViz;

            if(direction === 'both')
                return clientSize && vVisible && hVisible;
            else if(direction === 'vertical')
                return clientSize && vVisible;
            else if(direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop         = $w.scrollTop(),
                viewBottom      = viewTop + vpHeight,
                viewLeft        = $w.scrollLeft(),
                viewRight       = viewLeft + vpWidth,
                offset          = $t.offset(),
                _top            = offset.top,
                _bottom         = _top + $t.height(),
                _left           = offset.left,
                _right          = _left + $t.width(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom,
                compareLeft     = partial === true ? _right : _left,
                compareRight    = partial === true ? _left : _right;

            if(direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if(direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if(direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };

})(jQuery);


/*
<script>
	$(function () {
		Timers.init();
	});
</script>
<p><span>Add Timer</span></p> Timers.createTimer(5);
<p><span>ReInit</span></p> Timers.init();
*/
var Timers = {
	lastRequest: 0,
	init: function (s) {
		var timerInterval=null;
		Timers.resetTimers(timerInterval);
		var now = new Date();
		Timers.lastRequest =(Math.round(now.getTime()/1000));
		timerInterval	=		setInterval('Timers.doTimers();',1000);
	},
	resetTimers: function(timerInterval){
		if ( timerInterval ) {
			clearTimeout(timerInterval);
		}
		timerInterval = null;
	},
	
	createTimer: function (time, container) {
		Timers.init();
		var randomNum = Math.floor(Math.random() * 10000) + 1;
		var tcount = $('.js_timer').length +1;
		$('#'+container).append('<span id=\'timer_'+randomNum+'\' class=\'js_timer\' timer=\''+(Timers.lastRequest+time)+'|1\'></span>');
	},
	
	doTimers: function (s) {
		$('.js_timer').each(function(index){
			if($(this).visible()){
				var timer	=  $(this).attr('timer');
				var parts	= timer.split('|');
				var bar = 0;
				if(!Check.isEmpty(parts[2])){
					bar = parseInt(parts[2]);
				}		
				Timers.doTimer($(this),parts[0],parts[1],bar);
			}
		});
		return true;
	},
	
	doTimer: function (obj,eventTime,afterFunc,bar) {
		// Here the dragons: user device's clock may not match server's clock.
		// Slow internet connection may cause some delay even when clocks match.
		// responseObj.timestamp stores server's clock,
		// user.timestampResponseLocalMillis stores user's clock.
		// Date.now() gets user's current clock, so we subtract user.timestampResponseLocalMillis from it.
		var now 	= Date.now();
		var left	= eventTime-Math.floor((now - Request.timestampResponseLocalMillis)/1000);
		var time	= this.getLeftTime(left);
		obj.html(time);	
		
		if(bar > 0){
			var percent = 100 - Math.round((left*100)/bar);
			$(obj).closest('.ui-progress-bar').children('.ui-progress').width(percent+'%');
		}
		
		if (left < 0) {
			$(obj).removeClass('js_timer');
			if(afterFunc == 1){
				setTimeout(function(){
					//console.log(obj);
					Timers.timerDone(obj);
				},1000);
			}	
		}
	},
	
	timerDone: function (obj) {

		/*Request.send({});
		if(responseObj.status != 100){
			return false;
		}else{*/
			if(onPage == 'Main'){
				return false;
			}else if(onPage == 'buildings'){
				Buildings.init();
			}else if(onPage == 'ships'){
				Ships.init();
			}else if(onPage == 'defense'){
				Defense.init();
			}else if(onPage == 'research'){
				Research.init();
			}else{
				Request.send({});
			}
			
			if(onSubPage == 'fleet'){
				$('#mm-menu-right').html('').remove();
				initRightMenu();
			}
			/*return false;
		}*/
	},
	
	getLeftTime: function (seconds) {
		if (seconds<0){return '00:00:00';}

		var hour = Math.floor(seconds/3600);
		if (hour>0){seconds -= hour*3600;}
		
		var days	= "";
		if (hour>24){days = Math.floor(hour/24); hour = hour%24;}
		
		var min	= Math.floor(seconds/60);
		if (min>0){seconds	-= min*60;}

		if(seconds<10){seconds = "0"+ seconds;}

		if(min<10){min = "0"+ min;}

		if(hour<10){hour = "0"+ hour;}

		if (days>0){days = days + "d ";}
		return days + hour + ":" + min + ":" + seconds;
	}
}


