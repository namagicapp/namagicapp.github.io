(function(window, $)
{

    'use strict';

    var module = {};
    var $menu;
    var $window;
    var $body;
    var $video;
    var $header;
    var menuTop = 0;

    /**
     * Inits main module
     */
    module.init = function()
    {
        $menu = $('.js-menu');
        $header = $('.js-header');
        $video = $('.js-video');
        menuTop = $menu.offset().top;
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
        $window.on('resize', _fitVideoOnResize);
        $('.js-caption-magnifier').on('mouseover mouseout', _onCaptionMagnifier);
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
     * Rollover on a magnifier (linked to a caption)
     * @param evt
     */
    var _onCaptionMagnifier = function(evt)
    {
        var $magnifier = $(evt.currentTarget);
        var $overlay = $('#' + $magnifier.data('caption')).find('.js-overlay-' + $magnifier.data('overlay'));
        var callable = evt.type === 'mouseover' ? $overlay.fadeIn : $overlay.fadeOut;
        callable.apply($overlay, [150]);
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
     * Makes the video fit the viewport on window resize
     */
    var _fitVideoOnResize = function()
    {
        var video_ratio = 16 / 9;
        var header_width = $header.outerWidth();
        var header_height = $header.outerHeight();
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
        var window_top = $window.scrollTop();
        var is_fixed = $body.hasClass('js-fixed-menu');
        if (is_fixed && window_top <= menuTop)
        {
            $body.removeClass('js-fixed-menu');
        }
        if (!is_fixed && window_top > menuTop)
        {
            $body.addClass('js-fixed-menu');
        }
    };

    window.Main = module;

})(window, jQuery);