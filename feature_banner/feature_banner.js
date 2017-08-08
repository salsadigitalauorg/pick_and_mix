function pnm_feature_banner() {
    var _self = this;

    var $src = null;
    var $el = null;

    function set_background_image() {
        $src = _self.find('img').attr('src');
        _self.css('backgroundImage','url('+$src+')');
        return false;
    }

    
    /**
     * options
     *   - container_class
     */
    this.init = function(container_class) {
        $el = $(container_class);
        $img = $el.find('img');
        if ($img.length > 0) {
            $el.set_background_image();
        }
    }
}