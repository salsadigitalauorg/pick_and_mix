function pnm_feature_banner() {
    var _self = this;

    var $src = null;
    var $el = null;

    function set_background_image() {
        $src = $img.attr('src');
        $el.css('backgroundImage','url('+$src+')');
        $el.addClass('pnm-with-image');
        return false;
    }

    
    /**
     * options
     *   - container_element
     */
    this.init = function(options) {
        $el = $(options.container_element);
        $img = $el.find('img');
        if ($img.length > 0) {
            set_background_image();
        }
    }
}