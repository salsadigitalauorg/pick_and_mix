function pnm_main_navigation() {
  var _self = this;

  var $widget = null;
  var $button = null;
  var $nav_wrapper = null;
  var menu_toggle_enabled = null;
  var breakpoint = 768;

  function menu_bar_resize() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    if (w >= breakpoint && (menu_toggle_enabled || menu_toggle_enabled === null)) {
      // Desktop.
      menu_toggle_enabled = false;
      $widget.removeClass('menu-toggle');
      $button.detach();
      $superfish_menu.superfish();
    }
    else if (w < breakpoint && (!menu_toggle_enabled || menu_toggle_enabled === null)) {
      // Mobile.
      menu_toggle_enabled = true;
      $widget.addClass('menu-toggle');
      $nav_wrapper.prepend($button);
      $superfish_menu.superfish('destroy');
    }
  }

  function toggle_menu(e) {
    if (menu_toggle_enabled) {
      var was_open = $widget.hasClass('menu-open');
      $widget.toggleClass('menu-open');
      if (was_open) {
        $widget.attr('aria-hidden', 'true');
        $button.removeClass('menu-open').attr('aria-expanded', 'false');
      }
      else {
        $widget.attr('aria-hidden', 'false');
        $button.addClass('menu-open').attr('aria-expanded', 'true');
      }
    }
    e.stopPropagation();
    return false;
  }

  /**
   * options
   *   - breakpoint               = The breakpoint of the small version. Number. Default 768.
   *   - menu_element             = The breakpoint of the small version. Number. Default 768.
   *   - container_element        = Element that contains the nav.
   *   - toggle_element_html      = HTML for button. String.
   *   - toggle_element_container = Element that will hold the small version toggle button. String.
   */
  this.init = function(options) {
    breakpoint = options.breakpoint;
    $widget = $(options.container_element);
    $superfish_menu = $(options.menu_element);
    if ($widget.length > 0) {
      if (options['toggle_element_html'] !== undefined) {
        $button = $(options.toggle_element_html);
      }
      else {
        $button = $('<button class="mobile-expand-menu" aria-controls="' + $widget.attr('id') + '" aria-expanded="false">Toggle menu navigation</button>');
      }
      $nav_wrapper = $(options.toggle_element_container);
      $button.unbind('click', toggle_menu).bind('click', toggle_menu);
      $(window).unbind('resize', menu_bar_resize).bind('resize', menu_bar_resize);
      menu_bar_resize();
    }

  }
}
