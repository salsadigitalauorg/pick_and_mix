function pnm_link_to_top() {
  var $widget = null;

  function scroll_to_top(e) {
    // Scroll viewport to top of page.
    window.scrollTo(0, 0);

    // Set focus to start of page.
    var $target = $('html, body');
    $target.attr('tabindex', '1');
    $target.focus();
    $target.removeAttr('tabindex');

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
