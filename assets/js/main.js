(function(window, $)
{

    'use strict';

    var module = {};

    /**
     * Inits main module
     */
    module.init = function()
    {
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
        var top = $($(evt.currentTarget).attr('href')).offset().top;
        $('html, body').animate({scrollTop: top}, 300);
    };

    window.Main = module;

})(window, jQuery);