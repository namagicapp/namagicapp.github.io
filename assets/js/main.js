(function(window, $)
{

    'use strict';

    var module = {};
    var $menu;
    var $window;
    var menuTop = 0;

    /**
     * Inits main module
     */
    module.init = function()
    {
        $menu = $('.js-menu');
        menuTop = $menu.offset().top;
        $window = $(window);
        $window.on('scroll', _onWindowScroll).trigger('scroll');
        $('.js-caption-magnifier').on('mouseover mouseout', _onCaptionMagnifier);
        $('.js-scrollable').on('click', _onSmoothScroll);
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
        var top = $($(evt.currentTarget).attr('href')).offset().top - $menu.height();
        $('html, body').animate({scrollTop: top}, 300);
    };

    /**
     * Updates menu state on scroll
     */
    var _onWindowScroll = function()
    {
        var window_top = $window.scrollTop();
        var is_fixed = $menu.hasClass('js-fixed');
        if (is_fixed && window_top <= menuTop)
        {
            $menu.removeClass('js-fixed');
        }
        if (!is_fixed && window_top > menuTop)
        {
            $menu.addClass('js-fixed');
        }
    };

    window.Main = module;

})(window, jQuery);