function pnm_link_to_top() {
  var $widget = null;

  function scroll_to_top() {
    window.scrollTo(0,0);
    e.stopPropagation();
    return false;
  }

  /**
   * options
   *   - link_element  = The 'back to top' link.
   */
  this.init = function(options) {
    $widget = $(options.link_element);
    if ($widget.length > 0) {
      $widget.unbind('click', scroll_to_top).bind('click', scroll_to_top);
    }
  }
}
