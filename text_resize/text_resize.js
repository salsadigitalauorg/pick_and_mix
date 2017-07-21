function pnm_text_resize() {
    var _self = this;

    var $widget = null;

    function increase_font() {
        $widget.addClass('pnm-text-resize-large');
        return false;
    }

    function decrease_font() {
        $widget.removeClass('pnm-text-resize-large');
        return false;
    }

    function reset_font() {
        $widget.removeClass('pnm-text-resize-large');
        return false;
    }

    /**
     * options
     *   - root_element
     *   - reduce_button_element
     *   - increase_button_element
     *   - reset_button_element
     */
    this.init = function(options) {
        $widget = $(options.root_element);
        if ($widget.length > 0) {
            $(options.increase_button_element).unbind('click', increase_font).bind('click', increase_font);
            $(options.reduce_button_element).unbind('click', decrease_font).bind('click', decrease_font);
            $(options.reset_button_element).unbind('click', reset_font).bind('click', reset_font);
        }
    }
}