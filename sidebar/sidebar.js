function pnm_sidebar_nav() {
  var _self = this;

  var is_menu_desktop = true;
  var breakpoint = 768;
  var $widget = null;
  var $side_bar_menu = null;
  var $title = null;
  var active_trail_class = null;

  // =========================================================
  // DESKTOP TOGGLES
  // =========================================================
  function toggle_button_click(e) {
    var $button = $(e.currentTarget);
    var $menu = $button.parent().parent().children('ul');
    var was_closed = $button.hasClass('menu-closed');

    if (was_closed) {
      expand($menu, $button);
    }
    else {
      collapse($menu, $button);
    }
  }

  function collapse($menu, $button) {
    $menu.addClass('menu-closed').attr('aria-hidden', 'true');
    $button.addClass('menu-closed').attr('aria-expanded', 'false').attr('title', 'Expand menu');
  }

  function expand($menu, $button) {
    $menu.removeClass('menu-closed').attr('aria-hidden', 'false');
    $button.removeClass('menu-closed').attr('aria-expanded', 'true').attr('title', 'Collapse menu');
  }

  function add_toggle_buttons() {
    // Only add buttons to first level of menu items.
    $side_bar_menu.find('li').each(function(idx) {
      var $list_item = $(this);
      var $sub_menu = $list_item.children('ul');
      if ($sub_menu.length > 0) {
        var is_active_trail = $list_item.hasClass(active_trail_class);
        $sub_menu.attr('id', 'sidebar-submenu-' + idx);
        var $button = $('<button class="sidebar-toggle-menu" aria-controls="' + $sub_menu.attr('id') + '">Toggle sub menu</button>');
        if (is_active_trail) {
          expand($sub_menu, $button);
        }
        else {
          collapse($sub_menu, $button);
        }
        $list_item.children('a').wrap('<div class="sidebar-toggle-menu-wrapper"></div>').after($button);
        $button.unbind('click', toggle_button_click).bind('click', toggle_button_click);
      }
    });
  }

  function remove_toggle_buttons() {
    // Clean up any elements and attributes created.
    $widget.find('.sidebar-toggle-menu').unwrap();
    $widget.find('.sidebar-toggle-menu').remove();
    $widget.find('[id^=sidebar-submenu]').removeAttr('id').removeAttr('aria-hidden').removeClass('menu-closed');
  }

  // =========================================================
  // MOBILE ACCORDION
  // =========================================================
  function enable_mobile_accordion() {
    var display_text = $widget.children('h2').html();
    var $content = $widget.children('.content');
    $content.attr('id', 'sidebar-menu-content');
    var $button = $('<button aria-controls="sidebar-menu-content" aria-expanded="false">' + display_text + '</button>');
    $widget.children('h2').html($button);
    $button.unbind('click', sidebar_accordion_button_click).bind('click', sidebar_accordion_button_click);
  }

  function disable_mobile_accordion() {
    var display_text = $widget.children('h2').children('button').html();
    $widget.children('h2').empty().html(display_text);
    $side_bar_menu.removeAttr('id').removeClass('menu-open');
  }

  function sidebar_accordion_button_click(e) {
    var $button = $(e.currentTarget);
    var was_showing = $button.hasClass('menu-open');

    if (was_showing) {
      $button.removeClass('menu-open').attr('aria-expanded', 'false');
      $side_bar_menu.removeClass('menu-open');
    }
    else {
      $button.addClass('menu-open').attr('aria-expanded', 'true');
      $side_bar_menu.addClass('menu-open');
    }
  }

  // =========================================================
  // RESPONSIVE
  // =========================================================
  function side_menu_responsive() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    // Mobile (No toggles).
    if (w < breakpoint && is_menu_desktop) {
      // Disable menu toggles.
      is_menu_desktop = false;
      remove_toggle_buttons();
      enable_mobile_accordion();
    }
    // Desktop (Toggles).
    else if (w >= breakpoint && !is_menu_desktop) {
      is_menu_desktop = true;
      add_toggle_buttons();
      disable_mobile_accordion();
    }
  }

  /**
   * options
   *   - breakpoint               = The breakpoint of the small version. Number. Default 768.
   *   - nav_wrapper_element      = Top level nav
   *   - sidebar_element          = Sidebar element
   *   - title_element            = Title element.
   *   - active_trail_class       = Active Trail.
   */
  this.init = function(options) {
    breakpoint = options.breakpoint;
    $widget = $(options.sidebar_element);
    $title = $(options.title_element);
    $side_bar_menu = $(options.nav_wrapper_element);
    active_trail_class = options.active_trail_class;
    if ($widget.length > 0) {
      $(window).unbind('resize', side_menu_responsive).bind('resize', side_menu_responsive);
      add_toggle_buttons();
      side_menu_responsive();
    }
  }
}
