function pnm_sidebar_nav() {
  var _self = this;

  var $widget = null;
  var $sidebarmenu = null;
  var is_menu_desktop = true;

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
/*
  function toggle_menu(e) {
    $toggle_element = $(e.currentTarget);
    $toggle_element.toggleClass('expanded');
    if (is_mobile) {
      console.log('here');
      $nav = $nav_wrapper;
    } else {
      $nav = $toggle_element.find('> ul');
    }
    was_open = $nav.hasClass('menu-open');
    $nav.toggleClass('menu-open');
    if (was_open) {
      $nav.attr('aria-hidden', 'true');
    }
    else {
      $nav.attr('aria-hidden', 'false'); 
    }
    e.stopPropagation();
    return false;
  }
*/
  

  function add_toggle_buttons() {
    // Only add buttons to first level of menu items.
    $widget.find(' ul > li').each(function(idx) {
      var $list_item = $(this);
      var $sub_menu = $list_item.children('ul');
      if ($sub_menu.length > 0) {
        var $button = $('<button class="sidebar-toggle-menu" aria-controls="' + $sub_menu.attr('id') + '" aria-expanded="true" title="Collapse menu">Toggle sub menu</button>');
        $sub_menu.attr('id', 'sidebar-submenu-' + idx);
        $list_item.children('a').after($button);
        $button.unbind('click', toggle_button_click).bind('click', toggle_button_click);
      }
    });
  }

  function remove_toggle_buttons() {
    // Clean up any elements and attributes created.
    $widget.find('.sidebar-toggle-menu').remove();
    $widget.find('[id^=sidebar-submenu]').removeAttr('id').removeAttr('aria-hidden').removeClass('menu-closed');
  }

  function toggle_button_click(e) {
    var $button = $(e.currentTarget);
    var $menu = $button.parent().find('> ul');
    var was_closed = $button.hasClass('expanded');

    if (was_closed) {
      $menu.removeClass('menu-open').attr('aria-hidden', 'false');
      $button.removeClass('expanded').attr('aria-expanded', 'true').attr('title', 'Collapse menu');
    }
    else {
      $menu.addClass('menu-open').attr('aria-hidden', 'true');
      $button.addClass('expanded').attr('aria-expanded', 'false').attr('title', 'Expand menu');
    }
  }

  function enable_mobile_accordion() {
    
    $title.unbind('click', sidebar_accordion_button_click).bind('click', sidebar_accordion_button_click);
  }

  function disable_mobile_accordion() {
    $title.unbind('click', sidebar_accordion_button_click);
    $sidebarmenu.removeClass('menu-open');
    $title.removeClass('expanded');
  }

  function sidebar_accordion_button_click(e) {
    var $button = $(e.currentTarget);
    var was_showing = $button.hasClass('expanded');

    if (was_showing) {
      $button.removeClass('expanded').attr('aria-expanded', 'false');
      $sidebarmenu.removeClass('menu-open');
    }
    else {
      $button.addClass('expanded').attr('aria-expanded', 'true');
      $sidebarmenu.addClass('menu-open');
    }
  }


  /**
   * options
   *   - breakpoint               = The breakpoint of the small version. Number. Default 768.
   *   - nav_wrapper_element      = Top level nav 
   *   - sidebar_element          = Sidebar element
   *   - title_element            = Title element.
   */
  this.init = function(options) {
    breakpoint = options.breakpoint;
    $widget = $(options.sidebar_element);
    $sidebarmenu = $(options.nav_wrapper_element);
    $title = $(options.title_element);
    if ($widget.length > 0) {
      add_toggle_buttons();
      $(window).unbind('resize', side_menu_responsive).bind('resize', side_menu_responsive);
      side_menu_responsive();
    }
  }
}
