function pnm_sidebar_nav() {
  var _self = this;

  var $widget = null;
  var $title = null;
  var $nav = null;
  var breakpoint = 768;

  function sidebar_resize() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    if (w >= breakpoint && (menu_toggle_enabled || menu_toggle_enabled === null)) {
      // Desktop.
      menu_toggle_enabled = false;
      $nav.removeClass('expanded');
    }
    else if (w < breakpoint && (!menu_toggle_enabled || menu_toggle_enabled === null)) {
      // Mobile.
      menu_toggle_enabled = true;
    }
  }

  function toggle_menu(e) {
    if (menu_toggle_enabled) {
      var was_open = $nav.hasClass('expanded');
      $nav.toggleClass('expanded');
      $title.toggleClass('expanded');
      if (was_open) {
        $nav.attr('aria-hidden', 'true');
      }
      else {
        $nav.attr('aria-hidden', 'false'); 
      }
    }
    e.stopPropagation();
    return false;
  }

  /**
   * options
   *   - breakpoint               = The breakpoint of the small version. Number. Default 768.
   *   - menu_element             = Nav class
   *   - title_element            = Title tag or class.
   */
  this.init = function(options) {
    breakpoint = options.breakpoint;
    $title = $(options.title_element);
    $nav = $(options.menu_element);
    if ($nav.length > 0) {
      if (options['toggle_element_html'] !== undefined) {
        //$menu = $(options.toggle_element_html);
      }
      $(window).unbind('resize', sidebar_resize).bind('resize', sidebar_resize);
      sidebar_resize();
    }

  }
}
