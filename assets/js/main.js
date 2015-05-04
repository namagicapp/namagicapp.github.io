(function(window, $)
{

    'use strict';

    var module = {};
    var $menu;
    var $window;
    var $body;
    var $video;
    var $header;
    var $headerContent;

    /**
     * Inits main module
     */
    module.init = function()
    {
        $menu = $('.js-menu');
        $header = $('.js-header');
        $headerContent = $('.js-header-content');
        $video = $('.js-video');
        $window = $(window);
        $body = $('body');
        _initEvents();
        _initUI();
    };

    /**
     * Inits events
     */
    var _initEvents = function()
    {
        $window.on('scroll', _fixMenuOnScroll);
        $window.on('resize', _fitHeaderOnResize);
        $('.js-scrollable').on('click', _onSmoothScroll);
        $('.js-track').on('click', _onTrackEvent);
    };

    /**
     * Tracks an event
     * @param evt
     * @private
     */
    var _onTrackEvent = function(evt)
    {
        var target = $(evt.currentTarget).data('track');
        if (typeof ga !== 'undefined')
        {
            ga('send', 'event', {eventCategory: 'Interactions', eventAction: 'Click', eventLabel: target});
        }
    };

    /**
     * Inits UI
     */
    var _initUI = function()
    {
        $window.trigger('scroll');
        $window.trigger('resize');
    };

    /**
     * Scrolls smoothly to the required element
     * @param evt
     */
    var _onSmoothScroll = function(evt)
    {
        evt.preventDefault();
        var top = $($(evt.currentTarget).attr('href')).offset().top - ($menu.height() * 2);
        $('html, body').animate({scrollTop: top}, 300);
    };

    /**
     * Makes the video fit the viewport on window resize & adjusts header height
     */
    var _fitHeaderOnResize = function()
    {
        var header_height = Math.max($headerContent.outerHeight() + 200, $window.height());
        $header.css('height', header_height + 'px');
        $headerContent.css('top', ((header_height - $headerContent.height()) / 2) + 'px');


        var video_ratio = 16 / 9;
        var header_width = $header.outerWidth();
        if (header_width / header_height > video_ratio)
        {
            var video_height = header_width / video_ratio;
            $video.css({
                width: header_width + 'px',
                height: video_height + 'px',
                top: ((header_height - video_height) / 2) + 'px',
                left: 0
            });
        }
        else
        {
            var video_width = header_height * video_ratio;
            $video.css({
                width: video_width + 'px',
                height: header_height + 'px',
                top: 0,
                left: ((header_width - video_width) / 2) + 'px'
            });
        }
    };

    /**
     * Updates menu state on scroll
     */
    var _fixMenuOnScroll = function()
    {
        var menu_top = $header.height();
        var window_top = $window.scrollTop();
        var is_fixed = $body.hasClass('js-fixed-menu');
        if (is_fixed && window_top <= menu_top)
        {
            $body.removeClass('js-fixed-menu');
        }
        if (!is_fixed && window_top > menu_top)
        {
            $body.addClass('js-fixed-menu');
        }
    };

    window.Main = module;

})(window, jQuery);