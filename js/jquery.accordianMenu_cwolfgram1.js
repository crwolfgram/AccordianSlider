;(function ($, window, undefined) {

    'use strict';

    //Constructor function for plugin object
    $.AccordianMenu = function (options, divSubMenu) {

        this.$menuDiv = $(divSubMenu);

        this._init(options);

    };
    
    //Default propterties
    $.AccordianMenu.defaults = {
        speed: 250,
        easing: 'ease',
        defaultItem: 0,
        menuWidth: '415px',
        sliceWidth: '90px'
    };

    $.AccordianMenu.prototype = {
        
        //Called by constructor
        _init: function (options) {

            this.options = $.extend($.AccordianMenu.defaults, options);
            this.$menu = this.$menuDiv.children('ul');
            this.$menuItems = this.$menu.children('li');
            this.$imgWrapper = this.$menuItems.children('a');
            this.$menuItemsPreview = this.$imgWrapper.children('.menuPreview');
            this.totalItems = this.$menuItems.length;
            this.currentIndex = -1;

            this._clickHandler();

            this._openItem(this.options.defaultItem);

        },

        //Checking if a valid image is selected
        _validCurrent: function () {

            var validIndex = this.currentIndex < this.totalItems && this.currentIndex >= 0 ? true : false;

            return validIndex;
        },

        //Opens the initial item
        _openItem: function (openedIndex) {

            this.$imgWrapper.eq(openedIndex).trigger('click');

        },

        //Click Handler for each 'a' in the $imgWrapper
        _clickHandler: function () {
            var self = this;

            this.$imgWrapper.click(function (e) {

                    var $parentLI = $(this).parent();

                    var clickedIndex = self.$menuItems.index($parentLI);


                    if (clickedIndex === self.currentIndex) {
                        self._slideItem($parentLI, false, 1500, 'easeOutQuint', true);
                        self.currentIndex = -1;

                    } else {

                        if (self._validCurrent()) {
                            self._slideItem(self.$menuItems.eq(self.currentIndex), false, 250, 'jswing');
                        }

                        self.currentIndex = clickedIndex;
                        self._slideItem($parentLI, true, 250, 'jswing');
                    }

                    e.preventDefault();

                });
        },

        //Method to perform animations
        _slideItem: function ($panelSlice, state, speed, easing, allClosed) {

            var $colorImage = $panelSlice.find('span.menuImage');
            var bwOption = {};
            var colorOption = {};

            if (state) {

                bwOption = {
                    width: this.options.menuWidth
                }

                colorOption = {
                    left: '0px'
                }

            } else {

                bwOption = {
                    width: this.options.sliceWidth
                }

                colorOption = {
                    left: this.options.sliceWidth
                }

            }

            if (state) {

                this.$menuItemsPreview.stop(true).animate({
                    opacity: .1
                }, 1000);
            } else if (allClosed) {

                this.$menuItemsPreview.stop(true).animate({
                    opacity: 1
                }, 1500);
            }

            $panelSlice.stop(true).animate(bwOption, speed, easing);
            $colorImage.stop(true).animate(colorOption, speed, easing);

            if (state) {
                $colorImage.animate({
                    opacity: 1
                }, 2000);
            } else {
                $colorImage.css({
                    opacity: .2
                });
            }

        }



    };

    //Define jQuery plugin method
    $.fn.accordianMenu = function (options) {

        if (typeof options === 'string') {


        } else {

            this.each(function () {

                var instance = $.data(this, 'submenu');

                if (instance) {
                    instance._init();
                } else {

                    instance = $.data(this, 'sub', new $.AccordianMenu(options, this));

                }

            });

        }

        return this;

    };

})(jQuery, window);

