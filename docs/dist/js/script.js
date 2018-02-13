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


/**
 * hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 **/
(function($) {
  $.fn.hoverIntent = function(handlerIn, handlerOut, selector) {

    // default configuration values
    var cfg = {
      interval: 100,
      sensitivity: 7,
      timeout: 0
    };

    if (typeof handlerIn === "object") {
      cfg = $.extend(cfg, handlerIn);
    }
    else if ($.isFunction(handlerOut)) {
      cfg = $.extend(cfg, {
        over: handlerIn,
        out: handlerOut,
        selector: selector
      });
    }
    else {
      cfg = $.extend(cfg, {
        over: handlerIn,
        out: handlerIn,
        selector: handlerOut
      });
    }

    // instantiate variables
    // cX, cY = current X and Y position of mouse, updated by mousemove event
    // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
    var cX, cY, pX, pY;

    // A private function for getting mouse position
    var track = function(ev) {
      cX = ev.pageX;
      cY = ev.pageY;
    };

    // A private function for comparing current and previous mouse position
    var compare = function(ev, ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      // compare mouse positions to see if they've crossed the threshold
      if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
        $(ob).off("mousemove.hoverIntent", track);
        // set hoverIntent state to true (so mouseOut can be called)
        ob.hoverIntent_s = 1;
        return cfg.over.apply(ob, [ev]);
      }
      else {
        // set previous coordinates for next time
        pX = cX;
        pY = cY;
        // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
        ob.hoverIntent_t = setTimeout(function() {
          compare(ev, ob);
        }, cfg.interval);
      }
    };

    // A private function for delaying the mouseOut function
    var delay = function(ev, ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      ob.hoverIntent_s = 0;
      return cfg.out.apply(ob, [ev]);
    };

    // A private function for handling mouse 'hovering'
    var handleHover = function(e) {
      // copy objects to be passed into t (required for event object to be passed in IE)
      var ev = jQuery.extend({}, e);
      var ob = this;

      // cancel hoverIntent timer if it exists
      if (ob.hoverIntent_t) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      }

      // if e.type == "mouseenter"
      if (e.type == "mouseenter") {
        // set "previous" X and Y position based on initial entry point
        pX = ev.pageX;
        pY = ev.pageY;
        // update "current" X and Y position based on mousemove
        $(ob).on("mousemove.hoverIntent", track);
        // start polling interval (self-calling timeout) to compare mouse coordinates over time
        if (ob.hoverIntent_s != 1) {
          ob.hoverIntent_t = setTimeout(function() {
            compare(ev, ob);
          }, cfg.interval);
        }

        // else e.type == "mouseleave"
      }
      else {
        // unbind expensive mousemove event
        $(ob).off("mousemove.hoverIntent", track);
        // if hoverIntent state is true, then call the mouseOut function after the specified delay
        if (ob.hoverIntent_s == 1) {
          ob.hoverIntent_t = setTimeout(function() {
            delay(ev, ob);
          }, cfg.timeout);
        }
      }
    };

    // listen for mouseenter and mouseleave
    return this.on({
      'mouseenter.hoverIntent': handleHover,
      'mouseleave.hoverIntent': handleHover
    }, cfg.selector);
  };
})(jQuery);


/*
 * jQuery Superfish Menu Plugin - v1.7.9
 * Copyright (c) 2016 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

;
(function($, w) {
  "use strict";

  var methods = (function() {
    // private properties and methods go here
    var c = {
        bcClass: 'sf-breadcrumb',
        menuClass: 'sf-js-enabled',
        anchorClass: 'sf-with-ul',
        menuArrowClass: 'sf-arrows'
      },
      ios = (function() {
        var ios = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
        if (ios) {
          // tap anywhere on iOS to unfocus a submenu
          $('html').css('cursor', 'pointer').on('click', $.noop);
        }
        return ios;
      })(),
      wp7 = (function() {
        var style = document.documentElement.style;
        return ('behavior' in style && 'fill' in style && /iemobile/i.test(navigator.userAgent));
      })(),
      unprefixedPointerEvents = (function() {
        return (!!w.PointerEvent);
      })(),
      toggleMenuClasses = function($menu, o, add) {
        var classes = c.menuClass,
          method;
        if (o.cssArrows) {
          classes += ' ' + c.menuArrowClass;
        }
        method = (add) ? 'addClass' : 'removeClass';
        $menu[method](classes);
      },
      setPathToCurrent = function($menu, o) {
        return $menu.find('li.' + o.pathClass).slice(0, o.pathLevels)
          .addClass(o.hoverClass + ' ' + c.bcClass)
          .filter(function() {
            return ($(this).children(o.popUpSelector).hide().show().length);
          }).removeClass(o.pathClass);
      },
      toggleAnchorClass = function($li, add) {
        var method = (add) ? 'addClass' : 'removeClass';
        $li.children('a')[method](c.anchorClass);
      },
      toggleTouchAction = function($menu) {
        var msTouchAction = $menu.css('ms-touch-action');
        var touchAction = $menu.css('touch-action');
        touchAction = touchAction || msTouchAction;
        touchAction = (touchAction === 'pan-y') ? 'auto' : 'pan-y';
        $menu.css({
          'ms-touch-action': touchAction,
          'touch-action': touchAction
        });
      },
      getMenu = function($el) {
        return $el.closest('.' + c.menuClass);
      },
      getOptions = function($el) {
        return getMenu($el).data('sfOptions');
      },
      over = function() {
        var $this = $(this),
          o = getOptions($this);
        clearTimeout(o.sfTimer);
        $this.siblings().superfish('hide').end().superfish('show');
      },
      close = function(o) {
        o.retainPath = ($.inArray(this[0], o.$path) > -1);
        this.superfish('hide');

        if (!this.parents('.' + o.hoverClass).length) {
          o.onIdle.call(getMenu(this));
          if (o.$path.length) {
            $.proxy(over, o.$path)();
          }
        }
      },
      out = function() {
        var $this = $(this),
          o = getOptions($this);
        if (ios) {
          $.proxy(close, $this, o)();
        }
        else {
          clearTimeout(o.sfTimer);
          o.sfTimer = setTimeout($.proxy(close, $this, o), o.delay);
        }
      },
      touchHandler = function(e) {
        var $this = $(this),
          o = getOptions($this),
          $ul = $this.siblings(e.data.popUpSelector);

        if (o.onHandleTouch.call($ul) === false) {
          return this;
        }

        if ($ul.length > 0 && $ul.is(':hidden')) {
          $this.one('click.superfish', false);
          if (e.type === 'MSPointerDown' || e.type === 'pointerdown') {
            $this.trigger('focus');
          }
          else {
            $.proxy(over, $this.parent('li'))();
          }
        }
      },
      applyHandlers = function($menu, o) {
        var targets = 'li:has(' + o.popUpSelector + ')';
        if ($.fn.hoverIntent && !o.disableHI) {
          $menu.hoverIntent(over, out, targets);
        }
        else {
          $menu
            .on('mouseenter.superfish', targets, over)
            .on('mouseleave.superfish', targets, out);
        }
        var touchevent = 'MSPointerDown.superfish';
        if (unprefixedPointerEvents) {
          touchevent = 'pointerdown.superfish';
        }
        if (!ios) {
          touchevent += ' touchend.superfish';
        }
        if (wp7) {
          touchevent += ' mousedown.superfish';
        }
        $menu
          .on('focusin.superfish', 'li', over)
          .on('focusout.superfish', 'li', out)
          .on(touchevent, 'a', o, touchHandler);
      };

    return {
      // public methods
      hide: function(instant) {
        if (this.length) {
          var $this = this,
            o = getOptions($this);
          if (!o) {
            return this;
          }
          var not = (o.retainPath === true) ? o.$path : '',
            $ul = $this.find('li.' + o.hoverClass).add(this).not(not).removeClass(o.hoverClass).children(o.popUpSelector),
            speed = o.speedOut;

          if (instant) {
            $ul.show();
            speed = 0;
          }
          o.retainPath = false;

          if (o.onBeforeHide.call($ul) === false) {
            return this;
          }

          $ul.stop(true, true).animate(o.animationOut, speed, function() {
            var $this = $(this);
            o.onHide.call($this);
          });
        }
        return this;
      },
      show: function() {
        var o = getOptions(this);
        if (!o) {
          return this;
        }
        var $this = this.addClass(o.hoverClass),
          $ul = $this.children(o.popUpSelector);

        if (o.onBeforeShow.call($ul) === false) {
          return this;
        }

        $ul.stop(true, true).animate(o.animation, o.speed, function() {
          o.onShow.call($ul);
        });
        return this;
      },
      destroy: function() {
        return this.each(function() {
          var $this = $(this),
            o = $this.data('sfOptions'),
            $hasPopUp;
          if (!o) {
            return false;
          }
          $hasPopUp = $this.find(o.popUpSelector).parent('li');
          clearTimeout(o.sfTimer);
          toggleMenuClasses($this, o);
          toggleAnchorClass($hasPopUp);
          toggleTouchAction($this);
          // remove event handlers
          $this.off('.superfish').off('.hoverIntent');
          // clear animation's inline display style
          $hasPopUp.children(o.popUpSelector).attr('style', function(i, style) {
            return style.replace(/display[^;]+;?/g, '');
          });
          // reset 'current' path classes
          o.$path.removeClass(o.hoverClass + ' ' + c.bcClass).addClass(o.pathClass);
          $this.find('.' + o.hoverClass).removeClass(o.hoverClass);
          o.onDestroy.call($this);
          $this.removeData('sfOptions');
        });
      },
      init: function(op) {
        return this.each(function() {
          var $this = $(this);
          if ($this.data('sfOptions')) {
            return false;
          }
          var o = $.extend({}, $.fn.superfish.defaults, op),
            $hasPopUp = $this.find(o.popUpSelector).parent('li');
          o.$path = setPathToCurrent($this, o);

          $this.data('sfOptions', o);

          toggleMenuClasses($this, o, true);
          toggleAnchorClass($hasPopUp, true);
          toggleTouchAction($this);
          applyHandlers($this, o);

          $hasPopUp.not('.' + c.bcClass).superfish('hide', true);

          o.onInit.call(this);
        });
      }
    };
  })();

  $.fn.superfish = function(method, args) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    }
    else {
      return $.error('Method ' + method + ' does not exist on jQuery.fn.superfish');
    }
  };

  $.fn.superfish.defaults = {
    popUpSelector: 'ul,.sf-mega', // within menu context
    hoverClass: 'sfHover',
    pathClass: 'overrideThisToUse',
    pathLevels: 1,
    delay: 800,
    animation: {
      opacity: 'show'
    },
    animationOut: {
      opacity: 'hide'
    },
    speed: 'normal',
    speedOut: 'fast',
    cssArrows: true,
    disableHI: false,
    onInit: $.noop,
    onBeforeShow: $.noop,
    onShow: $.noop,
    onBeforeHide: $.noop,
    onHide: $.noop,
    onIdle: $.noop,
    onDestroy: $.noop,
    onHandleTouch: $.noop
  };

})(jQuery, window);


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
