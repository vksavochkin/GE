/**
     * requestAnimationFrame and cancel polyfill
     */
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                    window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());


    /**
     * pull to refresh
     * @type {*}
     */
    var PullToRefresh = (function() {
        function Main(container, slidebox, slidebox_icon, handler) {
            var self = this;

            this.breakpoint = 80;

            this.container = container;
            this.slidebox = slidebox;
            this.slidebox_icon = slidebox_icon;
            this.handler = handler;

            this._slidedown_height = 0;
            this._anim = null;
            this._dragged_down = false;

            this.hammertime = Hammer(this.container)
                .on("touch dragdown release", function(ev) {
                    self.handleHammer(ev);
                });
        };


        /**
         * Handle HammerJS callback
         * @param ev
         */
        Main.prototype.handleHammer = function(ev) {
            var self = this;

            switch(ev.type) {
                // reset element on start
                case 'touch':
                    this.hide();
                    break;

                // on release we check how far we dragged
                case 'release':
                    if(!this._dragged_down) {
                        return;
                    }

                    // cancel animation
                    cancelAnimationFrame(this._anim);

                    // over the breakpoint, trigger the callback
                    if(ev.gesture.deltaY >= this.breakpoint) {
                        container_el.className = 'pullrefresh-loading';
                        pullrefresh_icon_el.className = 'icon loading';

                        this.setHeight(60);
                        this.handler.call(this);
                    }
                    // just hide it
                    else {
                        pullrefresh_el.className = 'slideup';
                        container_el.className = 'pullrefresh-slideup';

                        this.hide();
                    }
                    break;

                // when we dragdown
                case 'dragdown':
                    this._dragged_down = true;

                    // if we are not at the top move down
                    var scrollY = window.scrollY;
                    if(scrollY > 5) {
                        return;
                    } else if(scrollY !== 0) {
                        window.scrollTo(0,0);
                    }

                    // no requestAnimationFrame instance is running, start one
                    if(!this._anim) {
                        this.updateHeight();
                    }

                    // stop browser scrolling
                    ev.gesture.preventDefault();

                    // update slidedown height
                    // it will be updated when requestAnimationFrame is called
                    this._slidedown_height = ev.gesture.deltaY * 0.4;
                    break;
            }
        };


        /**
         * when we set the height, we just change the container y
         * @param   {Number}    height
         */
        Main.prototype.setHeight = function(height) {
            if(Modernizr.csstransforms3d) {
                this.container.style.transform = 'translate3d(0,'+height+'px,0) ';
                this.container.style.oTransform = 'translate3d(0,'+height+'px,0)';
                this.container.style.msTransform = 'translate3d(0,'+height+'px,0)';
                this.container.style.mozTransform = 'translate3d(0,'+height+'px,0)';
                this.container.style.webkitTransform = 'translate3d(0,'+height+'px,0) scale3d(1,1,1)';
            }
            else if(Modernizr.csstransforms) {
                this.container.style.transform = 'translate(0,'+height+'px) ';
                this.container.style.oTransform = 'translate(0,'+height+'px)';
                this.container.style.msTransform = 'translate(0,'+height+'px)';
                this.container.style.mozTransform = 'translate(0,'+height+'px)';
                this.container.style.webkitTransform = 'translate(0,'+height+'px)';
            }
            else {
                this.container.style.top = height+"px";
            }
        };


        /**
         * hide the pullrefresh message and reset the vars
         */
        Main.prototype.hide = function() {
            container_el.className = '';
            this._slidedown_height = 0;
            this.setHeight(0);
            cancelAnimationFrame(this._anim);
            this._anim = null;
            this._dragged_down = false;
        };


        /**
         * hide the pullrefresh message and reset the vars
         */
        Main.prototype.slideUp = function() {
            var self = this;
            cancelAnimationFrame(this._anim);

            pullrefresh_el.className = 'slideup';
            container_el.className = 'pullrefresh-slideup';

            this.setHeight(0);

            setTimeout(function() {
                self.hide();
            }, 500);
        };


        /**
         * update the height of the slidedown message
         */
        Main.prototype.updateHeight = function() {
            var self = this;

            this.setHeight(this._slidedown_height);

            if(this._slidedown_height >= this.breakpoint){
                this.slidebox.className = 'breakpoint';
                this.slidebox_icon.className = 'icon arrow arrow-up';
            }
            else {
                this.slidebox.className = '';
                this.slidebox_icon.className = 'icon arrow';
            }

            this._anim = requestAnimationFrame(function() {
                self.updateHeight();
            });
        };

        return Main;
    })();



    /*function getEl(id) {
        return document.getElementById(id);
    }

    var container_el = getEl('page');
    var pullrefresh_el = getEl('pullrefresh');
    var pullrefresh_icon_el = getEl('pullrefresh-icon');
    var image_el = getEl('random-image');

    var refresh = new PullToRefresh(container_el, pullrefresh_el, pullrefresh_icon_el);

    // update image onrefresh
    refresh.handler = function() {
        var self = this;
        //alert('sdf');
        self.slideUp();
        // a small timeout to demo the loading state
       // setTimeout(function() {
        //    var preload = new Image();
        //    preload.onload = function() {
        //        image_el.src = this.src;
        //        self.slideUp();
        //    };
        //    preload.src = 'http://lorempixel.com/800/600/?'+ (new Date().getTime());
        //}, 1000);
    };*/