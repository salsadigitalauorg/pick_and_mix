// =========================================================
// HEADER SEARCH
// =========================================================
$(function() {
  var header_search = new pnm_header_search();
  header_search.init({
    toggle_class_on_element: '.header-inner .layer-2',
    toggle_element_container: '.header-search-toggle-container',
    container_element: '#header-search-form',
    breakpoint: 768,
    on_change: function() { /* ... */ }
  });
});

// =========================================================
// RESIZE
// =========================================================
$(function() {
  var text_resize = new pnm_text_resize();
  text_resize.init({
    root_element: 'html',
    reduce_button_element: '.resize-container .resize-reduce',
    increase_button_element: '.resize-container .resize-increase',
    on_change: function() { /* ... */ }
  });
});

// =========================================================
// MAIN NAVIGATION
// =========================================================
$(function() {
  var main_nagivation = new pnm_main_navigation();
  main_nagivation.init({
    breakpoint: 768,
    menu_element: '.sf-menu',
    toggle_element_container: '.menu-toggle-container',
    container_element: '#main-navigation-top'
    // toggle_element_html
  });
});

// =========================================================
// SIDEBAR RESIZE
// =========================================================
$(function() {
  var sidebar_nav = new pnm_sidebar_nav();
  sidebar_nav.init({
    title_element: '.section-title',
    nav_element: '.sidebar-menu',
    nav_wrapper_element: '.sidebar > .sidebar-menu',
    sidebar_element: '.sidebar',
    active_trail_class: 'active-trail',
    breakpoint: 768,
    on_change: function() { /* ... */ }
  });
});

// =========================================================
// LINK TO TOP
// =========================================================
$(function() {
  var link_to_top = new pnm_link_to_top();
  link_to_top.init({
    link_element: '.back-to-top',
    on_change: function() { /* ... */ }
  });
});

// =========================================================
// TABLE OF CONTENTS
// =========================================================
$(function() {
  var toc = new pnm_table_of_contents();
  toc.init({
    body_field: '.body-centre',
    toc_container: '.table-of-contents-wrapper',
    list_selector: '.toc-sticky-selector'
  });
});


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


function pnm_header_search() {
  var _self = this;

  var $widget = null;
  var $button = null;
  var $toggle_container = null;
  var search_toggle_enabled = false;
  var $toggle_class = null;
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
      if ($toggle_class !== null) {
        $toggle_class.toggleClass('search-open');
      }
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
   *   - toggle_class_on_element  = Element that will hold the small version toggle button. String.
   */
  this.init = function(options) {
    breakpoint = options.breakpoint;
    $widget = $(options.container_element);
    if (options['toggle_class_on_element'] !== undefined) {
      $toggle_class = $(options.toggle_class_on_element);
    }
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
    }
  }
}


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


function pnm_table_of_contents() {
  var _self = this;

  var $widget = null;

  var $list_items = [];

  var $otp = null;

  // Toggle visibility on page scroll.
  function pagescroll() {
    /* eslint no-unused-expressions: "off" */
    var $top_height = $widget.height() + $widget.offset().top;
    if ($(window).scrollTop() > ($top_height)) {
      $otp.addClass('is-display-ready')
      setTimeout(function() {
        $otp.addClass('is-displayed');
      }, 1);
    }
    else {
      if ($otp.hasClass('is-displayed')) {
        $otp.hasClass('is-displayed');
        setTimeout(function() {
          $otp.removeClass('is-display-ready');
        }, 250);
      }
    }
  }
  /**
   * options
   *   - toc_container  = The 'Table of contents' container.
   *   - body_field = The field to get headings.
   */
  this.init = function(options) {
    $widget = $(options.toc_container);
    if ($widget.length > 0) {
      var $body_field = $(options.body_field);
      $($body_field.find('h2').get().reverse()).each(function() {
        var text = $(this).text();
        var id = typeof $(this).attr('id') === 'undefined' ? _self.convertToID(text) : $(this).attr('id');
        var $anchor = $('<a></a>').html(text).attr('href', '#' + id);
        $list_items.push($anchor);
        $widget.find('ul').prepend($('<li></li>').html($anchor));
        $(this).attr('id', id);
      });
    }

    // 'On this page' functionality.
    // Add Select element.
    if ($(options.list_selector).length) {
      $otp = $(options.list_selector);
      /* Remove all options from the select list */
      var $otp_select = $otp.find('select');
      $otp_select.empty();

      /* Insert the new ones from the array above */
      $.each($list_items, function(index, value) {
        $otp_select.prepend($("<option></option>")
          .attr("value", value.attr('href')).text(value.text()));
      });
      // Trigger click on select element.
      $otp_select.on('change', function() {
        $i = $otp_select.prop('selectedIndex');
        $widget.find('ul.toc-list li a').eq($i)[0].click();
      });

      $(window).unbind('scroll', pagescroll).bind('scroll', pagescroll);
      pagescroll();
    }
  }

  this.convertToID = function(str) {
    return 'goto-' + str.replace(/\s+/g, '-').replace(/[^A-Za-z0-9]/, '').replace(/-+/, '-').toLowerCase();
  }
}
