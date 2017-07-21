function pnm_header_search() {
  var _self = this;

  var $widget = null;
  var $button = null;
  var $toggle_container = null;
  var search_toggle_enabled = false;
  var breakpoint = 768;

  function search_bar_resize() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    if (w >= breakpoint && search_toggle_enabled) {
      // Desktop.
      search_toggle_enabled = false;
      $widget.removeClass('search-toggle');
      $button.detach();
    }
    else if (w < breakpoint && !search_toggle_enabled) {
      // Mobile.
      search_toggle_enabled = true;
      $widget.addClass('search-toggle');
      $toggle_container.append($button);
    }
  }

  function toggle_search(e) {
    if (search_toggle_enabled) {
      var was_open = $widget.hasClass('search-open');
      $widget.toggleClass('search-open');
      if (was_open) {
        $widget.attr('aria-hidden', 'true');
        $button.removeClass('search-open').attr('aria-expanded', 'false');
      }
      else {
        $widget.attr('aria-hidden', 'false');
        $button.addClass('search-open').attr('aria-expanded', 'true');
      }
    }
    e.stopPropagation();
    return false;
  }

  /**
   * options
   *   - breakpoint               = The breakpoint of the small version. Number. Default 768.
   *   - container_element        = Element that contains the form. String.
   *   - toggle_element_html      = HTML for button. String.
   *   - toggle_element_container = Element that will hold the small version toggle button. String.
   */
  this.init = function(options) {
    breakpoint = options.breakpoint;
    $widget = $(options.container_element);
    if ($widget.length > 0) {
      if (options['toggle_element_html'] !== undefined) {
        $button = $(options.toggle_element_html);
      }
      else {
        $button = $('<button class="header-search-toggle" aria-controls="' + $widget.attr('id') + '" aria-expanded="false">Toggle search form</button>');
      }
      $toggle_container = $(options.toggle_element_container);
      $button.unbind('click', toggle_search).bind('click', toggle_search);
      $(window).unbind('resize', search_bar_resize).bind('resize', search_bar_resize);
      search_bar_resize();
    }
  }
}
