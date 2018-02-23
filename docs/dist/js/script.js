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
// =========================================================
// Feature Carousel
// =========================================================
$(function() {
  var feature_carousel = new pnm_feature_carousel();
  feature_carousel.init({
    container_element: '.feature-carousel',
    current_slide: 0,
    tablet_breakpoint: 768,
    desktop_column: 1170
  });
});

// =========================================================
// Feature Carousel
// =========================================================
$(function() {
  var feature_carousel = new pnm_feature_carousel();
  feature_carousel.init({
    container_element: '.feature-carousel1',
    current_slide: 0,
    tablet_breakpoint: 768,
    desktop_column: 1170
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


/*! npm.im/object-fit-images 3.2.3 */
var objectFitImages = (function() {
  'use strict';

  var OFI = 'bfred-it:object-fit-images';
  var propRegex = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
  var testImg = typeof Image === 'undefined' ? {
    style: {
      'object-position': 1
    }
  } : new Image();
  var supportsObjectFit = 'object-fit' in testImg.style;
  var supportsObjectPosition = 'object-position' in testImg.style;
  var supportsOFI = 'background-size' in testImg.style;
  var supportsCurrentSrc = typeof testImg.currentSrc === 'string';
  var nativeGetAttribute = testImg.getAttribute;
  var nativeSetAttribute = testImg.setAttribute;
  var autoModeEnabled = false;

  function createPlaceholder(w, h) {
    return ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "'%3E%3C/svg%3E");
  }

  function polyfillCurrentSrc(el) {
    if (el.srcset && !supportsCurrentSrc && window.picturefill) {
      var pf = window.picturefill._;
      // parse srcset with picturefill where currentSrc isn't available
      if (!el[pf.ns] || !el[pf.ns].evaled) {
        // force synchronous srcset parsing
        pf.fillImg(el, {
          reselect: true
        });
      }

      if (!el[pf.ns].curSrc) {
        // force picturefill to parse srcset
        el[pf.ns].supported = false;
        pf.fillImg(el, {
          reselect: true
        });
      }

      // retrieve parsed currentSrc, if any
      el.currentSrc = el[pf.ns].curSrc || el.src;
    }
  }

  function getStyle(el) {
    var style = getComputedStyle(el).fontFamily;
    var parsed;
    var props = {};
    while ((parsed = propRegex.exec(style)) !== null) {
      props[parsed[1]] = parsed[2];
    }
    return props;
  }

  function setPlaceholder(img, width, height) {
    // Default: fill width, no height
    var placeholder = createPlaceholder(width || 1, height || 0);

    // Only set placeholder if it's different
    if (nativeGetAttribute.call(img, 'src') !== placeholder) {
      nativeSetAttribute.call(img, 'src', placeholder);
    }
  }

  function onImageReady(img, callback) {
    // naturalWidth is only available when the image headers are loaded,
    // this loop will poll it every 100ms.
    if (img.naturalWidth) {
      callback(img);
    }
    else {
      setTimeout(onImageReady, 100, img, callback);
    }
  }

  function fixOne(el) {
    var style = getStyle(el);
    var ofi = el[OFI];
    style['object-fit'] = style['object-fit'] || 'fill'; // default value

    // Avoid running where unnecessary, unless OFI had already done its deed
    if (!ofi.img) {
      // fill is the default behavior so no action is necessary
      if (style['object-fit'] === 'fill') {
        return;
      }

      // Where object-fit is supported and object-position isn't (Safari < 10)
      if (!ofi.skipTest && // unless user wants to apply regardless of browser support
        supportsObjectFit && // if browser already supports object-fit
        !style['object-position'] // unless object-position is used
      ) {
        return;
      }
    }

    // keep a clone in memory while resetting the original to a blank
    if (!ofi.img) {
      ofi.img = new Image(el.width, el.height);
      ofi.img.srcset = nativeGetAttribute.call(el, "data-ofi-srcset") || el.srcset;
      ofi.img.src = nativeGetAttribute.call(el, "data-ofi-src") || el.src;

      // preserve for any future cloneNode calls
      // https://github.com/bfred-it/object-fit-images/issues/53
      nativeSetAttribute.call(el, "data-ofi-src", el.src);
      if (el.srcset) {
        nativeSetAttribute.call(el, "data-ofi-srcset", el.srcset);
      }

      setPlaceholder(el, el.naturalWidth || el.width, el.naturalHeight || el.height);

      // remove srcset because it overrides src
      if (el.srcset) {
        el.srcset = '';
      }
      try {
        keepSrcUsable(el);
      }
      catch (err) {
        if (window.console) {
          console.warn('https://bit.ly/ofi-old-browser');
        }
      }
    }

    polyfillCurrentSrc(ofi.img);

    el.style.backgroundImage = "url(\"" + ((ofi.img.currentSrc || ofi.img.src).replace(/"/g, '\\"')) + "\")";
    el.style.backgroundPosition = style['object-position'] || 'center';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundOrigin = 'content-box';

    if (/scale-down/.test(style['object-fit'])) {
      onImageReady(ofi.img, function() {
        if (ofi.img.naturalWidth > el.width || ofi.img.naturalHeight > el.height) {
          el.style.backgroundSize = 'contain';
        }
        else {
          el.style.backgroundSize = 'auto';
        }
      });
    }
    else {
      el.style.backgroundSize = style['object-fit'].replace('none', 'auto').replace('fill', '100% 100%');
    }

    onImageReady(ofi.img, function(img) {
      setPlaceholder(el, img.naturalWidth, img.naturalHeight);
    });
  }

  function keepSrcUsable(el) {
    var descriptors = {
      get: function get(prop) {
        return el[OFI].img[prop ? prop : 'src'];
      },
      set: function set(value, prop) {
        el[OFI].img[prop ? prop : 'src'] = value;
        nativeSetAttribute.call(el, ("data-ofi-" + prop), value); // preserve for any future cloneNode
        fixOne(el);
        return value;
      }
    };
    Object.defineProperty(el, 'src', descriptors);
    Object.defineProperty(el, 'currentSrc', {
      get: function() {
        return descriptors.get('currentSrc');
      }
    });
    Object.defineProperty(el, 'srcset', {
      get: function() {
        return descriptors.get('srcset');
      },
      set: function(ss) {
        return descriptors.set(ss, 'srcset');
      }
    });
  }

  function hijackAttributes() {
    function getOfiImageMaybe(el, name) {
      return el[OFI] && el[OFI].img && (name === 'src' || name === 'srcset') ? el[OFI].img : el;
    }
    if (!supportsObjectPosition) {
      HTMLImageElement.prototype.getAttribute = function(name) {
        return nativeGetAttribute.call(getOfiImageMaybe(this, name), name);
      };

      HTMLImageElement.prototype.setAttribute = function(name, value) {
        return nativeSetAttribute.call(getOfiImageMaybe(this, name), name, String(value));
      };
    }
  }

  function fix(imgs, opts) {
    var startAutoMode = !autoModeEnabled && !imgs;
    opts = opts || {};
    imgs = imgs || 'img';

    if ((supportsObjectPosition && !opts.skipTest) || !supportsOFI) {
      return false;
    }

    // use imgs as a selector or just select all images
    if (imgs === 'img') {
      imgs = document.getElementsByTagName('img');
    }
    else if (typeof imgs === 'string') {
      imgs = document.querySelectorAll(imgs);
    }
    else if (!('length' in imgs)) {
      imgs = [imgs];
    }

    // apply fix to all
    for (var i = 0; i < imgs.length; i++) {
      imgs[i][OFI] = imgs[i][OFI] || {
        skipTest: opts.skipTest
      };
      fixOne(imgs[i]);
    }

    if (startAutoMode) {
      document.body.addEventListener('load', function(e) {
        if (e.target.tagName === 'IMG') {
          fix(e.target, {
            skipTest: opts.skipTest
          });
        }
      }, true);
      autoModeEnabled = true;
      imgs = 'img'; // reset to a generic selector for watchMQ
    }

    // if requested, watch media queries for object-fit change
    if (opts.watchMQ) {
      window.addEventListener('resize', fix.bind(null, imgs, {
        skipTest: opts.skipTest
      }));
    }
  }

  fix.supportsObjectFit = supportsObjectFit;
  fix.supportsObjectPosition = supportsObjectPosition;

  hijackAttributes();

  return fix;

}());


/**
 * Owl Carousel v2.2.0
 * Copyright 2013-2016 David Deutsch
 * Licensed under MIT (https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE)
 */
/**
 * Owl carousel
 * @version 2.1.6
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
;
(function($, window, document, undefined) {

  /**
   * Creates a carousel.
   * @class The Owl Carousel.
   * @public
   * @param {HTMLElement|jQuery} element - The element to create the carousel for.
   * @param {Object} [options] - The options
   */
  function Owl(element, options) {

    /**
     * Current settings for the carousel.
     * @public
     */
    this.settings = null;

    /**
     * Current options set by the caller including defaults.
     * @public
     */
    this.options = $.extend({}, Owl.Defaults, options);

    /**
     * Plugin element.
     * @public
     */
    this.$element = $(element);

    /**
     * Proxied event handlers.
     * @protected
     */
    this._handlers = {};

    /**
     * References to the running plugins of this carousel.
     * @protected
     */
    this._plugins = {};

    /**
     * Currently suppressed events to prevent them from beeing retriggered.
     * @protected
     */
    this._supress = {};

    /**
     * Absolute current position.
     * @protected
     */
    this._current = null;

    /**
     * Animation speed in milliseconds.
     * @protected
     */
    this._speed = null;

    /**
     * Coordinates of all items in pixel.
     * @todo The name of this member is missleading.
     * @protected
     */
    this._coordinates = [];

    /**
     * Current breakpoint.
     * @todo Real media queries would be nice.
     * @protected
     */
    this._breakpoint = null;

    /**
     * Current width of the plugin element.
     */
    this._width = null;

    /**
     * All real items.
     * @protected
     */
    this._items = [];

    /**
     * All cloned items.
     * @protected
     */
    this._clones = [];

    /**
     * Merge values of all items.
     * @todo Maybe this could be part of a plugin.
     * @protected
     */
    this._mergers = [];

    /**
     * Widths of all items.
     */
    this._widths = [];

    /**
     * Invalidated parts within the update process.
     * @protected
     */
    this._invalidated = {};

    /**
     * Ordered list of workers for the update process.
     * @protected
     */
    this._pipe = [];

    /**
     * Current state information for the drag operation.
     * @todo #261
     * @protected
     */
    this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null
    };

    /**
     * Current state information and their tags.
     * @type {Object}
     * @protected
     */
    this._states = {
      current: {},
      tags: {
        'initializing': ['busy'],
        'animating': ['busy'],
        'dragging': ['interacting']
      }
    };

    $.each(['onResize', 'onThrottledResize'], $.proxy(function(i, handler) {
      this._handlers[handler] = $.proxy(this[handler], this);
    }, this));

    $.each(Owl.Plugins, $.proxy(function(key, plugin) {
      this._plugins[key.charAt(0).toLowerCase() + key.slice(1)] = new plugin(this);
    }, this));

    $.each(Owl.Workers, $.proxy(function(priority, worker) {
      this._pipe.push({
        'filter': worker.filter,
        'run': $.proxy(worker.run, this)
      });
    }, this));

    this.setup();
    this.initialize();
  }

  /**
   * Default options for the carousel.
   * @public
   */
  Owl.Defaults = {
    items: 3,
    loop: false,
    center: false,
    rewind: false,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    freeDrag: false,

    margin: 0,
    stagePadding: 0,

    merge: false,
    mergeFit: true,
    autoWidth: false,

    startPosition: 0,
    rtl: false,

    smartSpeed: 250,
    fluidSpeed: false,
    dragEndSpeed: false,

    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: window,

    fallbackEasing: 'swing',

    info: false,

    nestedItemSelector: false,
    itemElement: 'div',
    stageElement: 'div',

    refreshClass: 'owl-refresh',
    loadedClass: 'owl-loaded',
    loadingClass: 'owl-loading',
    rtlClass: 'owl-rtl',
    responsiveClass: 'owl-responsive',
    dragClass: 'owl-drag',
    itemClass: 'owl-item',
    stageClass: 'owl-stage',
    stageOuterClass: 'owl-stage-outer',
    grabClass: 'owl-grab'
  };

  /**
   * Enumeration for width.
   * @public
   * @readonly
   * @enum {String}
   */
  Owl.Width = {
    Default: 'default',
    Inner: 'inner',
    Outer: 'outer'
  };

  /**
   * Enumeration for types.
   * @public
   * @readonly
   * @enum {String}
   */
  Owl.Type = {
    Event: 'event',
    State: 'state'
  };

  /**
   * Contains all registered plugins.
   * @public
   */
  Owl.Plugins = {};

  /**
   * List of workers involved in the update process.
   */
  Owl.Workers = [{
    filter: ['width', 'settings'],
    run: function() {
      this._width = this.$element.width();
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function(cache) {
      cache.current = this._items && this._items[this.relative(this._current)];
    }
  }, {
    filter: ['items', 'settings'],
    run: function() {
      this.$stage.children('.cloned').remove();
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function(cache) {
      var margin = this.settings.margin || '',
        grid = !this.settings.autoWidth,
        rtl = this.settings.rtl,
        css = {
          'width': 'auto',
          'margin-left': rtl ? margin : '',
          'margin-right': rtl ? '' : margin
        };

      !grid && this.$stage.children().css(css);

      cache.css = css;
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function(cache) {
      var width = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
        merge = null,
        iterator = this._items.length,
        grid = !this.settings.autoWidth,
        widths = [];

      cache.items = {
        merge: false,
        width: width
      };

      while (iterator--) {
        merge = this._mergers[iterator];
        merge = this.settings.mergeFit && Math.min(merge, this.settings.items) || merge;

        cache.items.merge = merge > 1 || cache.items.merge;

        widths[iterator] = !grid ? this._items[iterator].width() : width * merge;
      }

      this._widths = widths;
    }
  }, {
    filter: ['items', 'settings'],
    run: function() {
      var clones = [],
        items = this._items,
        settings = this.settings,
        view = Math.max(settings.items * 2, 4),
        size = Math.ceil(items.length / 2) * 2,
        repeat = settings.loop && items.length ? settings.rewind ? view : Math.max(view, size) : 0,
        append = '',
        prepend = '';

      repeat /= 2;

      while (repeat--) {
        clones.push(this.normalize(clones.length / 2, true));
        append = append + items[clones[clones.length - 1]][0].outerHTML;
        clones.push(this.normalize(items.length - 1 - (clones.length - 1) / 2, true));
        prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
      }

      this._clones = clones;

      $(append).addClass('cloned').appendTo(this.$stage);
      $(prepend).addClass('cloned').prependTo(this.$stage);
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function() {
      var rtl = this.settings.rtl ? 1 : -1,
        size = this._clones.length + this._items.length,
        iterator = -1,
        previous = 0,
        current = 0,
        coordinates = [];

      while (++iterator < size) {
        previous = coordinates[iterator - 1] || 0;
        current = this._widths[this.relative(iterator)] + this.settings.margin;
        coordinates.push(previous + current * rtl);
      }

      this._coordinates = coordinates;
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function() {
      var padding = this.settings.stagePadding,
        coordinates = this._coordinates,
        css = {
          'width': Math.ceil(Math.abs(coordinates[coordinates.length - 1])) + padding * 2,
          'padding-left': padding || '',
          'padding-right': padding || ''
        };

      this.$stage.css(css);
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function(cache) {
      var iterator = this._coordinates.length,
        grid = !this.settings.autoWidth,
        items = this.$stage.children();

      if (grid && cache.items.merge) {
        while (iterator--) {
          cache.css.width = this._widths[this.relative(iterator)];
          items.eq(iterator).css(cache.css);
        }
      }
      else if (grid) {
        cache.css.width = cache.items.width;
        items.css(cache.css);
      }
    }
  }, {
    filter: ['items'],
    run: function() {
      this._coordinates.length < 1 && this.$stage.removeAttr('style');
    }
  }, {
    filter: ['width', 'items', 'settings'],
    run: function(cache) {
      cache.current = cache.current ? this.$stage.children().index(cache.current) : 0;
      cache.current = Math.max(this.minimum(), Math.min(this.maximum(), cache.current));
      this.reset(cache.current);
    }
  }, {
    filter: ['position'],
    run: function() {
      this.animate(this.coordinates(this._current));
    }
  }, {
    filter: ['width', 'position', 'items', 'settings'],
    run: function() {
      var rtl = this.settings.rtl ? 1 : -1,
        padding = this.settings.stagePadding * 2,
        begin = this.coordinates(this.current()) + padding,
        end = begin + this.width() * rtl,
        inner, outer, matches = [],
        i, n;

      for (i = 0, n = this._coordinates.length; i < n; i++) {
        inner = this._coordinates[i - 1] || 0;
        outer = Math.abs(this._coordinates[i]) + padding * rtl;

        if ((this.op(inner, '<=', begin) && (this.op(inner, '>', end))) ||
          (this.op(outer, '<', begin) && this.op(outer, '>', end))) {
          matches.push(i);
        }
      }

      this.$stage.children('.active').removeClass('active');
      this.$stage.children(':eq(' + matches.join('), :eq(') + ')').addClass('active');

      if (this.settings.center) {
        this.$stage.children('.center').removeClass('center');
        this.$stage.children().eq(this.current()).addClass('center');
      }
    }
  }];

  /**
   * Initializes the carousel.
   * @protected
   */
  Owl.prototype.initialize = function() {
    this.enter('initializing');
    this.trigger('initialize');

    this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);

    if (this.settings.autoWidth && !this.is('pre-loading')) {
      var imgs, nestedSelector, width;
      imgs = this.$element.find('img');
      nestedSelector = this.settings.nestedItemSelector ? '.' + this.settings.nestedItemSelector : undefined;
      width = this.$element.children(nestedSelector).width();

      if (imgs.length && width <= 0) {
        this.preloadAutoWidthImages(imgs);
      }
    }

    this.$element.addClass(this.options.loadingClass);

    // create stage
    this.$stage = $('<' + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>')
      .wrap('<div class="' + this.settings.stageOuterClass + '"/>');

    // append stage
    this.$element.append(this.$stage.parent());

    // append content
    this.replace(this.$element.children().not(this.$stage.parent()));

    // check visibility
    if (this.$element.is(':visible')) {
      // update view
      this.refresh();
    }
    else {
      // invalidate width
      this.invalidate('width');
    }

    this.$element
      .removeClass(this.options.loadingClass)
      .addClass(this.options.loadedClass);

    // register event handlers
    this.registerEventHandlers();

    this.leave('initializing');
    this.trigger('initialized');
  };

  /**
   * Setups the current settings.
   * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
   * @todo Support for media queries by using `matchMedia` would be nice.
   * @public
   */
  Owl.prototype.setup = function() {
    var viewport = this.viewport(),
      overwrites = this.options.responsive,
      match = -1,
      settings = null;

    if (!overwrites) {
      settings = $.extend({}, this.options);
    }
    else {
      $.each(overwrites, function(breakpoint) {
        if (breakpoint <= viewport && breakpoint > match) {
          match = Number(breakpoint);
        }
      });

      settings = $.extend({}, this.options, overwrites[match]);
      if (typeof settings.stagePadding === 'function') {
        settings.stagePadding = settings.stagePadding();
      }
      delete settings.responsive;

      // responsive class
      if (settings.responsiveClass) {
        this.$element.attr('class',
          this.$element.attr('class').replace(new RegExp('(' + this.options.responsiveClass + '-)\\S+\\s', 'g'), '$1' + match)
        );
      }
    }

    this.trigger('change', {
      property: {
        name: 'settings',
        value: settings
      }
    });
    this._breakpoint = match;
    this.settings = settings;
    this.invalidate('settings');
    this.trigger('changed', {
      property: {
        name: 'settings',
        value: this.settings
      }
    });
  };

  /**
   * Updates option logic if necessery.
   * @protected
   */
  Owl.prototype.optionsLogic = function() {
    if (this.settings.autoWidth) {
      this.settings.stagePadding = false;
      this.settings.merge = false;
    }
  };

  /**
   * Prepares an item before add.
   * @todo Rename event parameter `content` to `item`.
   * @protected
   * @returns {jQuery|HTMLElement} - The item container.
   */
  Owl.prototype.prepare = function(item) {
    var event = this.trigger('prepare', {
      content: item
    });

    if (!event.data) {
      event.data = $('<' + this.settings.itemElement + '/>')
        .addClass(this.options.itemClass).append(item)
    }

    this.trigger('prepared', {
      content: event.data
    });

    return event.data;
  };

  /**
   * Updates the view.
   * @public
   */
  Owl.prototype.update = function() {
    var i = 0,
      n = this._pipe.length,
      filter = $.proxy(function(p) {
        return this[p]
      }, this._invalidated),
      cache = {};

    while (i < n) {
      if (this._invalidated.all || $.grep(this._pipe[i].filter, filter).length > 0) {
        this._pipe[i].run(cache);
      }
      i++;
    }

    this._invalidated = {};

    !this.is('valid') && this.enter('valid');
  };

  /**
   * Gets the width of the view.
   * @public
   * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
   * @returns {Number} - The width of the view in pixel.
   */
  Owl.prototype.width = function(dimension) {
    dimension = dimension || Owl.Width.Default;
    switch (dimension) {
      case Owl.Width.Inner:
      case Owl.Width.Outer:
        return this._width;
      default:
        return this._width - this.settings.stagePadding * 2 + this.settings.margin;
    }
  };

  /**
   * Refreshes the carousel primarily for adaptive purposes.
   * @public
   */
  Owl.prototype.refresh = function() {
    this.enter('refreshing');
    this.trigger('refresh');

    this.setup();

    this.optionsLogic();

    this.$element.addClass(this.options.refreshClass);

    this.update();

    this.$element.removeClass(this.options.refreshClass);

    this.leave('refreshing');
    this.trigger('refreshed');
  };

  /**
   * Checks window `resize` event.
   * @protected
   */
  Owl.prototype.onThrottledResize = function() {
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
  };

  /**
   * Checks window `resize` event.
   * @protected
   */
  Owl.prototype.onResize = function() {
    if (!this._items.length) {
      return false;
    }

    if (this._width === this.$element.width()) {
      return false;
    }

    if (!this.$element.is(':visible')) {
      return false;
    }

    this.enter('resizing');

    if (this.trigger('resize').isDefaultPrevented()) {
      this.leave('resizing');
      return false;
    }

    this.invalidate('width');

    this.refresh();

    this.leave('resizing');
    this.trigger('resized');
  };

  /**
   * Registers event handlers.
   * @todo Check `msPointerEnabled`
   * @todo #261
   * @protected
   */
  Owl.prototype.registerEventHandlers = function() {
    if ($.support.transition) {
      this.$stage.on($.support.transition.end + '.owl.core', $.proxy(this.onTransitionEnd, this));
    }

    if (this.settings.responsive !== false) {
      this.on(window, 'resize', this._handlers.onThrottledResize);
    }

    if (this.settings.mouseDrag) {
      this.$element.addClass(this.options.dragClass);
      this.$stage.on('mousedown.owl.core', $.proxy(this.onDragStart, this));
      this.$stage.on('dragstart.owl.core selectstart.owl.core', function() {
        return false
      });
    }

    if (this.settings.touchDrag) {
      this.$stage.on('touchstart.owl.core', $.proxy(this.onDragStart, this));
      this.$stage.on('touchcancel.owl.core', $.proxy(this.onDragEnd, this));
    }
  };

  /**
   * Handles `touchstart` and `mousedown` events.
   * @todo Horizontal swipe threshold as option
   * @todo #261
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragStart = function(event) {
    var stage = null;

    if (event.which === 3) {
      return;
    }

    if ($.support.transform) {
      stage = this.$stage.css('transform').replace(/.*\(|\)| /g, '').split(',');
      stage = {
        x: stage[stage.length === 16 ? 12 : 4],
        y: stage[stage.length === 16 ? 13 : 5]
      };
    }
    else {
      stage = this.$stage.position();
      stage = {
        x: this.settings.rtl ?
          stage.left + this.$stage.width() - this.width() + this.settings.margin : stage.left,
        y: stage.top
      };
    }

    if (this.is('animating')) {
      $.support.transform ? this.animate(stage.x) : this.$stage.stop()
      this.invalidate('position');
    }

    this.$element.toggleClass(this.options.grabClass, event.type === 'mousedown');

    this.speed(0);

    this._drag.time = new Date().getTime();
    this._drag.target = $(event.target);
    this._drag.stage.start = stage;
    this._drag.stage.current = stage;
    this._drag.pointer = this.pointer(event);

    $(document).on('mouseup.owl.core touchend.owl.core', $.proxy(this.onDragEnd, this));

    $(document).one('mousemove.owl.core touchmove.owl.core', $.proxy(function(event) {
      var delta = this.difference(this._drag.pointer, this.pointer(event));

      $(document).on('mousemove.owl.core touchmove.owl.core', $.proxy(this.onDragMove, this));

      if (Math.abs(delta.x) < Math.abs(delta.y) && this.is('valid')) {
        return;
      }

      event.preventDefault();

      this.enter('dragging');
      this.trigger('drag');
    }, this));
  };

  /**
   * Handles the `touchmove` and `mousemove` events.
   * @todo #261
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragMove = function(event) {
    var minimum = null,
      maximum = null,
      pull = null,
      delta = this.difference(this._drag.pointer, this.pointer(event)),
      stage = this.difference(this._drag.stage.start, delta);

    if (!this.is('dragging')) {
      return;
    }

    event.preventDefault();

    if (this.settings.loop) {
      minimum = this.coordinates(this.minimum());
      maximum = this.coordinates(this.maximum() + 1) - minimum;
      stage.x = (((stage.x - minimum) % maximum + maximum) % maximum) + minimum;
    }
    else {
      minimum = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum());
      maximum = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum());
      pull = this.settings.pullDrag ? -1 * delta.x / 5 : 0;
      stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
    }

    this._drag.stage.current = stage;

    this.animate(stage.x);
  };

  /**
   * Handles the `touchend` and `mouseup` events.
   * @todo #261
   * @todo Threshold for click event
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragEnd = function(event) {
    var delta = this.difference(this._drag.pointer, this.pointer(event)),
      stage = this._drag.stage.current,
      direction = delta.x > 0 ^ this.settings.rtl ? 'left' : 'right';

    $(document).off('.owl.core');

    this.$element.removeClass(this.options.grabClass);

    if (delta.x !== 0 && this.is('dragging') || !this.is('valid')) {
      this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
      this.current(this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction));
      this.invalidate('position');
      this.update();

      this._drag.direction = direction;

      if (Math.abs(delta.x) > 3 || new Date().getTime() - this._drag.time > 300) {
        this._drag.target.one('click.owl.core', function() {
          return false;
        });
      }
    }

    if (!this.is('dragging')) {
      return;
    }

    this.leave('dragging');
    this.trigger('dragged');
  };

  /**
   * Gets absolute position of the closest item for a coordinate.
   * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
   * @protected
   * @param {Number} coordinate - The coordinate in pixel.
   * @param {String} direction - The direction to check for the closest item. Ether `left` or `right`.
   * @return {Number} - The absolute position of the closest item.
   */
  Owl.prototype.closest = function(coordinate, direction) {
    var position = -1,
      pull = 30,
      width = this.width(),
      coordinates = this.coordinates();

    if (!this.settings.freeDrag) {
      // check closest item
      $.each(coordinates, $.proxy(function(index, value) {
        // on a left pull, check on current index
        if (direction === 'left' && coordinate > value - pull && coordinate < value + pull) {
          position = index;
          // on a right pull, check on previous index
          // to do so, subtract width from value and set position = index + 1
        }
        else if (direction === 'right' && coordinate > value - width - pull && coordinate < value - width + pull) {
          position = index + 1;
        }
        else if (this.op(coordinate, '<', value) &&
          this.op(coordinate, '>', coordinates[index + 1] || value - width)) {
          position = direction === 'left' ? index + 1 : index;
        }
        return position === -1;
      }, this));
    }

    if (!this.settings.loop) {
      // non loop boundries
      if (this.op(coordinate, '>', coordinates[this.minimum()])) {
        position = coordinate = this.minimum();
      }
      else if (this.op(coordinate, '<', coordinates[this.maximum()])) {
        position = coordinate = this.maximum();
      }
    }

    return position;
  };

  /**
   * Animates the stage.
   * @todo #270
   * @public
   * @param {Number} coordinate - The coordinate in pixels.
   */
  Owl.prototype.animate = function(coordinate) {
    var animate = this.speed() > 0;

    this.is('animating') && this.onTransitionEnd();

    if (animate) {
      this.enter('animating');
      this.trigger('translate');
    }

    if ($.support.transform3d && $.support.transition) {
      this.$stage.css({
        transform: 'translate3d(' + coordinate + 'px,0px,0px)',
        transition: (this.speed() / 1000) + 's'
      });
    }
    else if (animate) {
      this.$stage.animate({
        left: coordinate + 'px'
      }, this.speed(), this.settings.fallbackEasing, $.proxy(this.onTransitionEnd, this));
    }
    else {
      this.$stage.css({
        left: coordinate + 'px'
      });
    }
  };

  /**
   * Checks whether the carousel is in a specific state or not.
   * @param {String} state - The state to check.
   * @returns {Boolean} - The flag which indicates if the carousel is busy.
   */
  Owl.prototype.is = function(state) {
    return this._states.current[state] && this._states.current[state] > 0;
  };

  /**
   * Sets the absolute position of the current item.
   * @public
   * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
   * @returns {Number} - The absolute position of the current item.
   */
  Owl.prototype.current = function(position) {
    if (position === undefined) {
      return this._current;
    }

    if (this._items.length === 0) {
      return undefined;
    }

    position = this.normalize(position);

    if (this._current !== position) {
      var event = this.trigger('change', {
        property: {
          name: 'position',
          value: position
        }
      });

      if (event.data !== undefined) {
        position = this.normalize(event.data);
      }

      this._current = position;

      this.invalidate('position');

      this.trigger('changed', {
        property: {
          name: 'position',
          value: this._current
        }
      });
    }

    return this._current;
  };

  /**
   * Invalidates the given part of the update routine.
   * @param {String} [part] - The part to invalidate.
   * @returns {Array.<String>} - The invalidated parts.
   */
  Owl.prototype.invalidate = function(part) {
    if ($.type(part) === 'string') {
      this._invalidated[part] = true;
      this.is('valid') && this.leave('valid');
    }
    return $.map(this._invalidated, function(v, i) {
      return i
    });
  };

  /**
   * Resets the absolute position of the current item.
   * @public
   * @param {Number} position - The absolute position of the new item.
   */
  Owl.prototype.reset = function(position) {
    position = this.normalize(position);

    if (position === undefined) {
      return;
    }

    this._speed = 0;
    this._current = position;

    this.suppress(['translate', 'translated']);

    this.animate(this.coordinates(position));

    this.release(['translate', 'translated']);
  };

  /**
   * Normalizes an absolute or a relative position of an item.
   * @public
   * @param {Number} position - The absolute or relative position to normalize.
   * @param {Boolean} [relative=false] - Whether the given position is relative or not.
   * @returns {Number} - The normalized position.
   */
  Owl.prototype.normalize = function(position, relative) {
    var n = this._items.length,
      m = relative ? 0 : this._clones.length;

    if (!this.isNumeric(position) || n < 1) {
      position = undefined;
    }
    else if (position < 0 || position >= n + m) {
      position = ((position - m / 2) % n + n) % n + m / 2;
    }

    return position;
  };

  /**
   * Converts an absolute position of an item into a relative one.
   * @public
   * @param {Number} position - The absolute position to convert.
   * @returns {Number} - The converted position.
   */
  Owl.prototype.relative = function(position) {
    position -= this._clones.length / 2;
    return this.normalize(position, true);
  };

  /**
   * Gets the maximum position for the current item.
   * @public
   * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
   * @returns {Number}
   */
  Owl.prototype.maximum = function(relative) {
    var settings = this.settings,
      maximum = this._coordinates.length,
      iterator,
      reciprocalItemsWidth,
      elementWidth;

    if (settings.loop) {
      maximum = this._clones.length / 2 + this._items.length - 1;
    }
    else if (settings.autoWidth || settings.merge) {
      iterator = this._items.length;
      reciprocalItemsWidth = this._items[--iterator].width();
      elementWidth = this.$element.width();
      while (iterator--) {
        reciprocalItemsWidth += this._items[iterator].width() + this.settings.margin;
        if (reciprocalItemsWidth > elementWidth) {
          break;
        }
      }
      maximum = iterator + 1;
    }
    else if (settings.center) {
      maximum = this._items.length - 1;
    }
    else {
      maximum = this._items.length - settings.items;
    }

    if (relative) {
      maximum -= this._clones.length / 2;
    }

    return Math.max(maximum, 0);
  };

  /**
   * Gets the minimum position for the current item.
   * @public
   * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
   * @returns {Number}
   */
  Owl.prototype.minimum = function(relative) {
    return relative ? 0 : this._clones.length / 2;
  };

  /**
   * Gets an item at the specified relative position.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
   */
  Owl.prototype.items = function(position) {
    if (position === undefined) {
      return this._items.slice();
    }

    position = this.normalize(position, true);
    return this._items[position];
  };

  /**
   * Gets an item at the specified relative position.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
   */
  Owl.prototype.mergers = function(position) {
    if (position === undefined) {
      return this._mergers.slice();
    }

    position = this.normalize(position, true);
    return this._mergers[position];
  };

  /**
   * Gets the absolute positions of clones for an item.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
   */
  Owl.prototype.clones = function(position) {
    var odd = this._clones.length / 2,
      even = odd + this._items.length,
      map = function(index) {
        return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2
      };

    if (position === undefined) {
      return $.map(this._clones, function(v, i) {
        return map(i)
      });
    }

    return $.map(this._clones, function(v, i) {
      return v === position ? map(i) : null
    });
  };

  /**
   * Sets the current animation speed.
   * @public
   * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
   * @returns {Number} - The current animation speed in milliseconds.
   */
  Owl.prototype.speed = function(speed) {
    if (speed !== undefined) {
      this._speed = speed;
    }

    return this._speed;
  };

  /**
   * Gets the coordinate of an item.
   * @todo The name of this method is missleanding.
   * @public
   * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
   * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
   */
  Owl.prototype.coordinates = function(position) {
    var multiplier = 1,
      newPosition = position - 1,
      coordinate;

    if (position === undefined) {
      return $.map(this._coordinates, $.proxy(function(coordinate, index) {
        return this.coordinates(index);
      }, this));
    }

    if (this.settings.center) {
      if (this.settings.rtl) {
        multiplier = -1;
        newPosition = position + 1;
      }

      coordinate = this._coordinates[position];
      coordinate += (this.width() - coordinate + (this._coordinates[newPosition] || 0)) / 2 * multiplier;
    }
    else {
      coordinate = this._coordinates[newPosition] || 0;
    }

    coordinate = Math.ceil(coordinate);

    return coordinate;
  };

  /**
   * Calculates the speed for a translation.
   * @protected
   * @param {Number} from - The absolute position of the start item.
   * @param {Number} to - The absolute position of the target item.
   * @param {Number} [factor=undefined] - The time factor in milliseconds.
   * @returns {Number} - The time in milliseconds for the translation.
   */
  Owl.prototype.duration = function(from, to, factor) {
    if (factor === 0) {
      return 0;
    }

    return Math.min(Math.max(Math.abs(to - from), 1), 6) * Math.abs((factor || this.settings.smartSpeed));
  };

  /**
   * Slides to the specified item.
   * @public
   * @param {Number} position - The position of the item.
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.to = function(position, speed) {
    var current = this.current(),
      revert = null,
      distance = position - this.relative(current),
      direction = (distance > 0) - (distance < 0),
      items = this._items.length,
      minimum = this.minimum(),
      maximum = this.maximum();

    if (this.settings.loop) {
      if (!this.settings.rewind && Math.abs(distance) > items / 2) {
        distance += direction * -1 * items;
      }

      position = current + distance;
      revert = ((position - minimum) % items + items) % items + minimum;

      if (revert !== position && revert - distance <= maximum && revert - distance > 0) {
        current = revert - distance;
        position = revert;
        this.reset(current);
      }
    }
    else if (this.settings.rewind) {
      maximum += 1;
      position = (position % maximum + maximum) % maximum;
    }
    else {
      position = Math.max(minimum, Math.min(maximum, position));
    }

    this.speed(this.duration(current, position, speed));
    this.current(position);

    if (this.$element.is(':visible')) {
      this.update();
    }
  };

  /**
   * Slides to the next item.
   * @public
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.next = function(speed) {
    speed = speed || false;
    this.to(this.relative(this.current()) + 1, speed);
  };

  /**
   * Slides to the previous item.
   * @public
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.prev = function(speed) {
    speed = speed || false;
    this.to(this.relative(this.current()) - 1, speed);
  };

  /**
   * Handles the end of an animation.
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onTransitionEnd = function(event) {

    // if css2 animation then event object is undefined
    if (event !== undefined) {
      event.stopPropagation();

      // Catch only owl-stage transitionEnd event
      if ((event.target || event.srcElement || event.originalTarget) !== this.$stage.get(0)) {
        return false;
      }
    }

    this.leave('animating');
    this.trigger('translated');
  };

  /**
   * Gets viewport width.
   * @protected
   * @return {Number} - The width in pixel.
   */
  Owl.prototype.viewport = function() {
    var width;
    if (this.options.responsiveBaseElement !== window) {
      width = $(this.options.responsiveBaseElement).width();
    }
    else if (window.innerWidth) {
      width = window.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientWidth) {
      width = document.documentElement.clientWidth;
    }
    else {
      throw 'Can not detect viewport width.';
    }
    return width;
  };

  /**
   * Replaces the current content.
   * @public
   * @param {HTMLElement|jQuery|String} content - The new content.
   */
  Owl.prototype.replace = function(content) {
    this.$stage.empty();
    this._items = [];

    if (content) {
      content = (content instanceof jQuery) ? content : $(content);
    }

    if (this.settings.nestedItemSelector) {
      content = content.find('.' + this.settings.nestedItemSelector);
    }

    content.filter(function() {
      return this.nodeType === 1;
    }).each($.proxy(function(index, item) {
      item = this.prepare(item);
      this.$stage.append(item);
      this._items.push(item);
      this._mergers.push(item.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    }, this));

    this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);

    this.invalidate('items');
  };

  /**
   * Adds an item.
   * @todo Use `item` instead of `content` for the event arguments.
   * @public
   * @param {HTMLElement|jQuery|String} content - The item content to add.
   * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
   */
  Owl.prototype.add = function(content, position) {
    var current = this.relative(this._current);

    position = position === undefined ? this._items.length : this.normalize(position, true);
    content = content instanceof jQuery ? content : $(content);

    this.trigger('add', {
      content: content,
      position: position
    });

    content = this.prepare(content);

    if (this._items.length === 0 || position === this._items.length) {
      this._items.length === 0 && this.$stage.append(content);
      this._items.length !== 0 && this._items[position - 1].after(content);
      this._items.push(content);
      this._mergers.push(content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    }
    else {
      this._items[position].before(content);
      this._items.splice(position, 0, content);
      this._mergers.splice(position, 0, content.find('[data-merge]').addBack('[data-merge]').attr('data-merge') * 1 || 1);
    }

    this._items[current] && this.reset(this._items[current].index());

    this.invalidate('items');

    this.trigger('added', {
      content: content,
      position: position
    });
  };

  /**
   * Removes an item by its position.
   * @todo Use `item` instead of `content` for the event arguments.
   * @public
   * @param {Number} position - The relative position of the item to remove.
   */
  Owl.prototype.remove = function(position) {
    position = this.normalize(position, true);

    if (position === undefined) {
      return;
    }

    this.trigger('remove', {
      content: this._items[position],
      position: position
    });

    this._items[position].remove();
    this._items.splice(position, 1);
    this._mergers.splice(position, 1);

    this.invalidate('items');

    this.trigger('removed', {
      content: null,
      position: position
    });
  };

  /**
   * Preloads images with auto width.
   * @todo Replace by a more generic approach
   * @protected
   */
  Owl.prototype.preloadAutoWidthImages = function(images) {
    images.each($.proxy(function(i, element) {
      this.enter('pre-loading');
      element = $(element);
      $(new Image()).one('load', $.proxy(function(e) {
        element.attr('src', e.target.src);
        element.css('opacity', 1);
        this.leave('pre-loading');
        !this.is('pre-loading') && !this.is('initializing') && this.refresh();
      }, this)).attr('src', element.attr('src') || element.attr('data-src') || element.attr('data-src-retina'));
    }, this));
  };

  /**
   * Destroys the carousel.
   * @public
   */
  Owl.prototype.destroy = function() {

    this.$element.off('.owl.core');
    this.$stage.off('.owl.core');
    $(document).off('.owl.core');

    if (this.settings.responsive !== false) {
      window.clearTimeout(this.resizeTimer);
      this.off(window, 'resize', this._handlers.onThrottledResize);
    }

    for (var i in this._plugins) {
      this._plugins[i].destroy();
    }

    this.$stage.children('.cloned').remove();

    this.$stage.unwrap();
    this.$stage.children().contents().unwrap();
    this.$stage.children().unwrap();

    this.$element
      .removeClass(this.options.refreshClass)
      .removeClass(this.options.loadingClass)
      .removeClass(this.options.loadedClass)
      .removeClass(this.options.rtlClass)
      .removeClass(this.options.dragClass)
      .removeClass(this.options.grabClass)
      .attr('class', this.$element.attr('class').replace(new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'), ''))
      .removeData('owl.carousel');
  };

  /**
   * Operators to calculate right-to-left and left-to-right.
   * @protected
   * @param {Number} [a] - The left side operand.
   * @param {String} [o] - The operator.
   * @param {Number} [b] - The right side operand.
   */
  Owl.prototype.op = function(a, o, b) {
    var rtl = this.settings.rtl;
    switch (o) {
      case '<':
        return rtl ? a > b : a < b;
      case '>':
        return rtl ? a < b : a > b;
      case '>=':
        return rtl ? a <= b : a >= b;
      case '<=':
        return rtl ? a >= b : a <= b;
      default:
        break;
    }
  };

  /**
   * Attaches to an internal event.
   * @protected
   * @param {HTMLElement} element - The event source.
   * @param {String} event - The event name.
   * @param {Function} listener - The event handler to attach.
   * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
   */
  Owl.prototype.on = function(element, event, listener, capture) {
    if (element.addEventListener) {
      element.addEventListener(event, listener, capture);
    }
    else if (element.attachEvent) {
      element.attachEvent('on' + event, listener);
    }
  };

  /**
   * Detaches from an internal event.
   * @protected
   * @param {HTMLElement} element - The event source.
   * @param {String} event - The event name.
   * @param {Function} listener - The attached event handler to detach.
   * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
   */
  Owl.prototype.off = function(element, event, listener, capture) {
    if (element.removeEventListener) {
      element.removeEventListener(event, listener, capture);
    }
    else if (element.detachEvent) {
      element.detachEvent('on' + event, listener);
    }
  };

  /**
   * Triggers a public event.
   * @todo Remove `status`, `relatedTarget` should be used instead.
   * @protected
   * @param {String} name - The event name.
   * @param {*} [data=null] - The event data.
   * @param {String} [namespace=carousel] - The event namespace.
   * @param {String} [state] - The state which is associated with the event.
   * @param {Boolean} [enter=false] - Indicates if the call enters the specified state or not.
   * @returns {Event} - The event arguments.
   */
  Owl.prototype.trigger = function(name, data, namespace, state, enter) {
    var status = {
        item: {
          count: this._items.length,
          index: this.current()
        }
      },
      handler = $.camelCase(
        $.grep(['on', name, namespace], function(v) {
          return v
        })
        .join('-').toLowerCase()
      ),
      event = $.Event(
        [name, 'owl', namespace || 'carousel'].join('.').toLowerCase(),
        $.extend({
          relatedTarget: this
        }, status, data)
      );

    if (!this._supress[name]) {
      $.each(this._plugins, function(name, plugin) {
        if (plugin.onTrigger) {
          plugin.onTrigger(event);
        }
      });

      this.register({
        type: Owl.Type.Event,
        name: name
      });
      this.$element.trigger(event);

      if (this.settings && typeof this.settings[handler] === 'function') {
        this.settings[handler].call(this, event);
      }
    }

    return event;
  };

  /**
   * Enters a state.
   * @param name - The state name.
   */
  Owl.prototype.enter = function(name) {
    $.each([name].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
      if (this._states.current[name] === undefined) {
        this._states.current[name] = 0;
      }

      this._states.current[name]++;
    }, this));
  };

  /**
   * Leaves a state.
   * @param name - The state name.
   */
  Owl.prototype.leave = function(name) {
    $.each([name].concat(this._states.tags[name] || []), $.proxy(function(i, name) {
      this._states.current[name]--;
    }, this));
  };

  /**
   * Registers an event or state.
   * @public
   * @param {Object} object - The event or state to register.
   */
  Owl.prototype.register = function(object) {
    if (object.type === Owl.Type.Event) {
      if (!$.event.special[object.name]) {
        $.event.special[object.name] = {};
      }

      if (!$.event.special[object.name].owl) {
        var _default = $.event.special[object.name]._default;
        $.event.special[object.name]._default = function(e) {
          if (_default && _default.apply && (!e.namespace || e.namespace.indexOf('owl') === -1)) {
            return _default.apply(this, arguments);
          }
          return e.namespace && e.namespace.indexOf('owl') > -1;
        };
        $.event.special[object.name].owl = true;
      }
    }
    else if (object.type === Owl.Type.State) {
      if (!this._states.tags[object.name]) {
        this._states.tags[object.name] = object.tags;
      }
      else {
        this._states.tags[object.name] = this._states.tags[object.name].concat(object.tags);
      }

      this._states.tags[object.name] = $.grep(this._states.tags[object.name], $.proxy(function(tag, i) {
        return $.inArray(tag, this._states.tags[object.name]) === i;
      }, this));
    }
  };

  /**
   * Suppresses events.
   * @protected
   * @param {Array.<String>} events - The events to suppress.
   */
  Owl.prototype.suppress = function(events) {
    $.each(events, $.proxy(function(index, event) {
      this._supress[event] = true;
    }, this));
  };

  /**
   * Releases suppressed events.
   * @protected
   * @param {Array.<String>} events - The events to release.
   */
  Owl.prototype.release = function(events) {
    $.each(events, $.proxy(function(index, event) {
      delete this._supress[event];
    }, this));
  };

  /**
   * Gets unified pointer coordinates from event.
   * @todo #261
   * @protected
   * @param {Event} - The `mousedown` or `touchstart` event.
   * @returns {Object} - Contains `x` and `y` coordinates of current pointer position.
   */
  Owl.prototype.pointer = function(event) {
    var result = {
      x: null,
      y: null
    };

    event = event.originalEvent || event || window.event;

    event = event.touches && event.touches.length ?
      event.touches[0] : event.changedTouches && event.changedTouches.length ?
      event.changedTouches[0] : event;

    if (event.pageX) {
      result.x = event.pageX;
      result.y = event.pageY;
    }
    else {
      result.x = event.clientX;
      result.y = event.clientY;
    }

    return result;
  };

  /**
   * Determines if the input is a Number or something that can be coerced to a Number
   * @protected
   * @param {Number|String|Object|Array|Boolean|RegExp|Function|Symbol} - The input to be tested
   * @returns {Boolean} - An indication if the input is a Number or can be coerced to a Number
   */
  Owl.prototype.isNumeric = function(number) {
    return !isNaN(parseFloat(number));
  };

  /**
   * Gets the difference of two vectors.
   * @todo #261
   * @protected
   * @param {Object} - The first vector.
   * @param {Object} - The second vector.
   * @returns {Object} - The difference.
   */
  Owl.prototype.difference = function(first, second) {
    return {
      x: first.x - second.x,
      y: first.y - second.y
    };
  };

  /**
   * The jQuery Plugin for the Owl Carousel
   * @todo Navigation plugin `next` and `prev`
   * @public
   */
  $.fn.owlCarousel = function(option) {
    var args = Array.prototype.slice.call(arguments, 1);

    return this.each(function() {
      var $this = $(this),
        data = $this.data('owl.carousel');

      if (!data) {
        data = new Owl(this, typeof option == 'object' && option);
        $this.data('owl.carousel', data);

        $.each([
          'next', 'prev', 'to', 'destroy', 'refresh', 'replace', 'add', 'remove'
        ], function(i, event) {
          data.register({
            type: Owl.Type.Event,
            name: event
          });
          data.$element.on(event + '.owl.carousel.core', $.proxy(function(e) {
            if (e.namespace && e.relatedTarget !== this) {
              this.suppress([event]);
              data[event].apply(this, [].slice.call(arguments, 1));
              this.release([event]);
            }
          }, data));
        });
      }

      if (typeof option == 'string' && option.charAt(0) !== '_') {
        data[option].apply(data, args);
      }
    });
  };

  /**
   * The constructor for the jQuery Plugin
   * @public
   */
  $.fn.owlCarousel.Constructor = Owl;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoRefresh Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function($, window, document, undefined) {

  /**
   * Creates the auto refresh plugin.
   * @class The Auto Refresh Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var AutoRefresh = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Refresh interval.
     * @protected
     * @type {number}
     */
    this._interval = null;

    /**
     * Whether the element is currently visible or not.
     * @protected
     * @type {Boolean}
     */
    this._visible = null;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoRefresh) {
          this.watch();
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, AutoRefresh.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   */
  AutoRefresh.Defaults = {
    autoRefresh: true,
    autoRefreshInterval: 500
  };

  /**
   * Watches the element.
   */
  AutoRefresh.prototype.watch = function() {
    if (this._interval) {
      return;
    }

    this._visible = this._core.$element.is(':visible');
    this._interval = window.setInterval($.proxy(this.refresh, this), this._core.settings.autoRefreshInterval);
  };

  /**
   * Refreshes the element.
   */
  AutoRefresh.prototype.refresh = function() {
    if (this._core.$element.is(':visible') === this._visible) {
      return;
    }

    this._visible = !this._visible;

    this._core.$element.toggleClass('owl-hidden', !this._visible);

    this._visible && (this._core.invalidate('width') && this._core.refresh());
  };

  /**
   * Destroys the plugin.
   */
  AutoRefresh.prototype.destroy = function() {
    var handler, property;

    window.clearInterval(this._interval);

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.AutoRefresh = AutoRefresh;

})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function($, window, document, undefined) {

  /**
   * Creates the lazy plugin.
   * @class The Lazy Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Lazy = function(carousel) {

    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Already loaded items.
     * @protected
     * @type {Array.<jQuery>}
     */
    this._loaded = [];

    /**
     * Event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel change.owl.carousel resized.owl.carousel': $.proxy(function(e) {
        if (!e.namespace) {
          return;
        }

        if (!this._core.settings || !this._core.settings.lazyLoad) {
          return;
        }

        if ((e.property && e.property.name == 'position') || e.type == 'initialized') {
          var settings = this._core.settings,
            n = (settings.center && Math.ceil(settings.items / 2) || settings.items),
            i = ((settings.center && n * -1) || 0),
            position = (e.property && e.property.value !== undefined ? e.property.value : this._core.current()) + i,
            clones = this._core.clones().length,
            load = $.proxy(function(i, v) {
              this.load(v)
            }, this);

          while (i++ < n) {
            this.load(clones / 2 + this._core.relative(position));
            clones && $.each(this._core.clones(this._core.relative(position)), load);
            position++;
          }
        }
      }, this)
    };

    // set the default options
    this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

    // register event handler
    this._core.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   */
  Lazy.Defaults = {
    lazyLoad: false
  };

  /**
   * Loads all resources of an item at the specified position.
   * @param {Number} position - The absolute position of the item.
   * @protected
   */
  Lazy.prototype.load = function(position) {
    var $item = this._core.$stage.children().eq(position),
      $elements = $item && $item.find('.owl-lazy');

    if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
      return;
    }

    $elements.each($.proxy(function(index, element) {
      var $element = $(element),
        image,
        url = (window.devicePixelRatio > 1 && $element.attr('data-src-retina')) || $element.attr('data-src');

      this._core.trigger('load', {
        element: $element,
        url: url
      }, 'lazy');

      if ($element.is('img')) {
        $element.one('load.owl.lazy', $.proxy(function() {
          $element.css('opacity', 1);
          this._core.trigger('loaded', {
            element: $element,
            url: url
          }, 'lazy');
        }, this)).attr('src', url);
      }
      else {
        image = new Image();
        image.onload = $.proxy(function() {
          $element.css({
            'background-image': 'url(' + url + ')',
            'opacity': '1'
          });
          this._core.trigger('loaded', {
            element: $element,
            url: url
          }, 'lazy');
        }, this);
        image.src = url;
      }
    }, this));

    this._loaded.push($item.get(0));
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Lazy.prototype.destroy = function() {
    var handler, property;

    for (handler in this.handlers) {
      this._core.$element.off(handler, this.handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;

})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function($, window, document, undefined) {

  /**
   * Creates the auto height plugin.
   * @class The Auto Height Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var AutoHeight = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel refreshed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoHeight) {
          this.update();
        }
      }, this),
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoHeight && e.property.name == 'position') {
          this.update();
        }
      }, this),
      'loaded.owl.lazy': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoHeight &&
          e.element.closest('.' + this._core.settings.itemClass).index() === this._core.current()) {
          this.update();
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   */
  AutoHeight.Defaults = {
    autoHeight: false,
    autoHeightClass: 'owl-height'
  };

  /**
   * Updates the view.
   */
  AutoHeight.prototype.update = function() {
    var start = this._core._current,
      end = start + this._core.settings.items,
      visible = this._core.$stage.children().toArray().slice(start, end),
      heights = [],
      maxheight = 0;

    $.each(visible, function(index, item) {
      heights.push($(item).height());
    });

    maxheight = Math.max.apply(null, heights);

    this._core.$stage.parent()
      .height(maxheight)
      .addClass(this._core.settings.autoHeightClass);
  };

  AutoHeight.prototype.destroy = function() {
    var handler, property;

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;

})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function($, window, document, undefined) {

  /**
   * Creates the video plugin.
   * @class The Video Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Video = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Cache all video URLs.
     * @protected
     * @type {Object}
     */
    this._videos = {};

    /**
     * Current playing item.
     * @protected
     * @type {jQuery}
     */
    this._playing = null;

    /**
     * All event handlers.
     * @todo The cloned content removale is too late
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace) {
          this._core.register({
            type: 'state',
            name: 'playing',
            tags: ['interacting']
          });
        }
      }, this),
      'resize.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
          e.preventDefault();
        }
      }, this),
      'refreshed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.is('resizing')) {
          this._core.$stage.find('.cloned .owl-video-frame').remove();
        }
      }, this),
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name === 'position' && this._playing) {
          this.stop();
        }
      }, this),
      'prepared.owl.carousel': $.proxy(function(e) {
        if (!e.namespace) {
          return;
        }

        var $element = $(e.content).find('.owl-video');

        if ($element.length) {
          $element.css('display', 'none');
          this.fetch($element, $(e.content));
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, Video.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);

    this._core.$element.on('click.owl.video', '.owl-video-play-icon', $.proxy(function(e) {
      this.play(e);
    }, this));
  };

  /**
   * Default options.
   * @public
   */
  Video.Defaults = {
    video: false,
    videoHeight: false,
    videoWidth: false
  };

  /**
   * Gets the video ID and the type (YouTube/Vimeo/vzaar only).
   * @protected
   * @param {jQuery} target - The target containing the video data.
   * @param {jQuery} item - The item containing the video.
   */
  Video.prototype.fetch = function(target, item) {
    var type = (function() {
        if (target.attr('data-vimeo-id')) {
          return 'vimeo';
        }
        else if (target.attr('data-vzaar-id')) {
          return 'vzaar'
        }
        else {
          return 'youtube';
        }
      })(),
      id = target.attr('data-vimeo-id') || target.attr('data-youtube-id') || target.attr('data-vzaar-id'),
      width = target.attr('data-width') || this._core.settings.videoWidth,
      height = target.attr('data-height') || this._core.settings.videoHeight,
      url = target.attr('href');

    if (url) {

      /*
      		Parses the id's out of the following urls (and probably more):
      		https://www.youtube.com/watch?v=:id
      		https://youtu.be/:id
      		https://vimeo.com/:id
      		https://vimeo.com/channels/:channel/:id
      		https://vimeo.com/groups/:group/videos/:id
      		https://app.vzaar.com/videos/:id

      		Visual example: https://regexper.com/#(http%3A%7Chttps%3A%7C)%5C%2F%5C%2F(player.%7Cwww.%7Capp.)%3F(vimeo%5C.com%7Cyoutu(be%5C.com%7C%5C.be%7Cbe%5C.googleapis%5C.com)%7Cvzaar%5C.com)%5C%2F(video%5C%2F%7Cvideos%5C%2F%7Cembed%5C%2F%7Cchannels%5C%2F.%2B%5C%2F%7Cgroups%5C%2F.%2B%5C%2F%7Cwatch%5C%3Fv%3D%7Cv%5C%2F)%3F(%5BA-Za-z0-9._%25-%5D*)(%5C%26%5CS%2B)%3F
      */

      id = url.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

      if (id[3].indexOf('youtu') > -1) {
        type = 'youtube';
      }
      else if (id[3].indexOf('vimeo') > -1) {
        type = 'vimeo';
      }
      else if (id[3].indexOf('vzaar') > -1) {
        type = 'vzaar';
      }
      else {
        throw new Error('Video URL not supported.');
      }
      id = id[6];
    }
    else {
      throw new Error('Missing video URL.');
    }

    this._videos[url] = {
      type: type,
      id: id,
      width: width,
      height: height
    };

    item.attr('data-video', url);

    this.thumbnail(target, this._videos[url]);
  };

  /**
   * Creates video thumbnail.
   * @protected
   * @param {jQuery} target - The target containing the video data.
   * @param {Object} info - The video info object.
   * @see `fetch`
   */
  Video.prototype.thumbnail = function(target, video) {
    var tnLink,
      icon,
      path,
      dimensions = video.width && video.height ? 'style="width:' + video.width + 'px;height:' + video.height + 'px;"' : '',
      customTn = target.find('img'),
      srcType = 'src',
      lazyClass = '',
      settings = this._core.settings,
      create = function(path) {
        icon = '<div class="owl-video-play-icon"></div>';

        if (settings.lazyLoad) {
          tnLink = '<div class="owl-video-tn ' + lazyClass + '" ' + srcType + '="' + path + '"></div>';
        }
        else {
          tnLink = '<div class="owl-video-tn" style="opacity:1;background-image:url(' + path + ')"></div>';
        }
        target.after(tnLink);
        target.after(icon);
      };

    // wrap video content into owl-video-wrapper div
    target.wrap('<div class="owl-video-wrapper"' + dimensions + '></div>');

    if (this._core.settings.lazyLoad) {
      srcType = 'data-src';
      lazyClass = 'owl-lazy';
    }

    // custom thumbnail
    if (customTn.length) {
      create(customTn.attr(srcType));
      customTn.remove();
      return false;
    }

    if (video.type === 'youtube') {
      path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
      create(path);
    }
    else if (video.type === 'vimeo') {
      $.ajax({
        type: 'GET',
        url: '//vimeo.com/api/v2/video/' + video.id + '.json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function(data) {
          path = data[0].thumbnail_large;
          create(path);
        }
      });
    }
    else if (video.type === 'vzaar') {
      $.ajax({
        type: 'GET',
        url: '//vzaar.com/api/videos/' + video.id + '.json',
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function(data) {
          path = data.framegrab_url;
          create(path);
        }
      });
    }
  };

  /**
   * Stops the current video.
   * @public
   */
  Video.prototype.stop = function() {
    this._core.trigger('stop', null, 'video');
    this._playing.find('.owl-video-frame').remove();
    this._playing.removeClass('owl-video-playing');
    this._playing = null;
    this._core.leave('playing');
    this._core.trigger('stopped', null, 'video');
  };

  /**
   * Starts the current video.
   * @public
   * @param {Event} event - The event arguments.
   */
  Video.prototype.play = function(event) {
    var target = $(event.target),
      item = target.closest('.' + this._core.settings.itemClass),
      video = this._videos[item.attr('data-video')],
      width = video.width || '100%',
      height = video.height || this._core.$stage.height(),
      html;

    if (this._playing) {
      return;
    }

    this._core.enter('playing');
    this._core.trigger('play', null, 'video');

    item = this._core.items(this._core.relative(item.index()));

    this._core.reset(item.index());

    if (video.type === 'youtube') {
      html = '<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' +
        video.id + '?autoplay=1&v=' + video.id + '" frameborder="0" allowfullscreen></iframe>';
    }
    else if (video.type === 'vimeo') {
      html = '<iframe src="//player.vimeo.com/video/' + video.id +
        '?autoplay=1" width="' + width + '" height="' + height +
        '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }
    else if (video.type === 'vzaar') {
      html = '<iframe frameborder="0"' + 'height="' + height + '"' + 'width="' + width +
        '" allowfullscreen mozallowfullscreen webkitAllowFullScreen ' +
        'src="//view.vzaar.com/' + video.id + '/player?autoplay=true"></iframe>';
    }

    $('<div class="owl-video-frame">' + html + '</div>').insertAfter(item.find('.owl-video'));

    this._playing = item.addClass('owl-video-playing');
  };

  /**
   * Checks whether an video is currently in full screen mode or not.
   * @todo Bad style because looks like a readonly method but changes members.
   * @protected
   * @returns {Boolean}
   */
  Video.prototype.isInFullScreen = function() {
    var element = document.fullscreenElement || document.mozFullScreenElement ||
      document.webkitFullscreenElement;

    return element && $(element).parent().hasClass('owl-video-frame');
  };

  /**
   * Destroys the plugin.
   */
  Video.prototype.destroy = function() {
    var handler, property;

    this._core.$element.off('click.owl.video');

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Video = Video;

})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function($, window, document, undefined) {

  /**
   * Creates the animate plugin.
   * @class The Navigation Plugin
   * @param {Owl} scope - The Owl Carousel
   */
  var Animate = function(scope) {
    this.core = scope;
    this.core.options = $.extend({}, Animate.Defaults, this.core.options);
    this.swapping = true;
    this.previous = undefined;
    this.next = undefined;

    this.handlers = {
      'change.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name == 'position') {
          this.previous = this.core.current();
          this.next = e.property.value;
        }
      }, this),
      'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': $.proxy(function(e) {
        if (e.namespace) {
          this.swapping = e.type == 'translated';
        }
      }, this),
      'translate.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn)) {
          this.swap();
        }
      }, this)
    };

    this.core.$element.on(this.handlers);
  };

  /**
   * Default options.
   * @public
   */
  Animate.Defaults = {
    animateOut: false,
    animateIn: false
  };

  /**
   * Toggles the animation classes whenever an translations starts.
   * @protected
   * @returns {Boolean|undefined}
   */
  Animate.prototype.swap = function() {

    if (this.core.settings.items !== 1) {
      return;
    }

    if (!$.support.animation || !$.support.transition) {
      return;
    }

    this.core.speed(0);

    var left,
      clear = $.proxy(this.clear, this),
      previous = this.core.$stage.children().eq(this.previous),
      next = this.core.$stage.children().eq(this.next),
      incoming = this.core.settings.animateIn,
      outgoing = this.core.settings.animateOut;

    if (this.core.current() === this.previous) {
      return;
    }

    if (outgoing) {
      left = this.core.coordinates(this.previous) - this.core.coordinates(this.next);
      previous.one($.support.animation.end, clear)
        .css({
          'left': left + 'px'
        })
        .addClass('animated owl-animated-out')
        .addClass(outgoing);
    }

    if (incoming) {
      next.one($.support.animation.end, clear)
        .addClass('animated owl-animated-in')
        .addClass(incoming);
    }
  };

  Animate.prototype.clear = function(e) {
    $(e.target).css({
        'left': ''
      })
      .removeClass('animated owl-animated-out owl-animated-in')
      .removeClass(this.core.settings.animateIn)
      .removeClass(this.core.settings.animateOut);
    this.core.onTransitionEnd();
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Animate.prototype.destroy = function() {
    var handler, property;

    for (handler in this.handlers) {
      this.core.$element.off(handler, this.handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Animate = Animate;

})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.1.0
 * @author Bartosz Wojciechowski
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function($, window, document, undefined) {

  /**
   * Creates the autoplay plugin.
   * @class The Autoplay Plugin
   * @param {Owl} scope - The Owl Carousel
   */
  var Autoplay = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * The autoplay timeout.
     * @type {Timeout}
     */
    this._timeout = null;

    /**
     * Indicates whenever the autoplay is paused.
     * @type {Boolean}
     */
    this._paused = false;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name === 'settings') {
          if (this._core.settings.autoplay) {
            this.play();
          }
          else {
            this.stop();
          }
        }
        else if (e.namespace && e.property.name === 'position') {
          //console.log('play?', e);
          if (this._core.settings.autoplay) {
            this._setAutoPlayInterval();
          }
        }
      }, this),
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.autoplay) {
          this.play();
        }
      }, this),
      'play.owl.autoplay': $.proxy(function(e, t, s) {
        if (e.namespace) {
          this.play(t, s);
        }
      }, this),
      'stop.owl.autoplay': $.proxy(function(e) {
        if (e.namespace) {
          this.stop();
        }
      }, this),
      'mouseover.owl.autoplay': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.pause();
        }
      }, this),
      'mouseleave.owl.autoplay': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.play();
        }
      }, this),
      'touchstart.owl.core': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause && this._core.is('rotating')) {
          this.pause();
        }
      }, this),
      'touchend.owl.core': $.proxy(function() {
        if (this._core.settings.autoplayHoverPause) {
          this.play();
        }
      }, this)
    };

    // register event handlers
    this._core.$element.on(this._handlers);

    // set default options
    this._core.options = $.extend({}, Autoplay.Defaults, this._core.options);
  };

  /**
   * Default options.
   * @public
   */
  Autoplay.Defaults = {
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    autoplaySpeed: false
  };

  /**
   * Starts the autoplay.
   * @public
   * @param {Number} [timeout] - The interval before the next animation starts.
   * @param {Number} [speed] - The animation speed for the animations.
   */
  Autoplay.prototype.play = function(timeout, speed) {
    this._paused = false;

    if (this._core.is('rotating')) {
      return;
    }

    this._core.enter('rotating');

    this._setAutoPlayInterval();
  };

  /**
   * Gets a new timeout
   * @private
   * @param {Number} [timeout] - The interval before the next animation starts.
   * @param {Number} [speed] - The animation speed for the animations.
   * @return {Timeout}
   */
  Autoplay.prototype._getNextTimeout = function(timeout, speed) {
    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }
    return window.setTimeout($.proxy(function() {
      if (this._paused || this._core.is('busy') || this._core.is('interacting') || document.hidden) {
        return;
      }
      this._core.next(speed || this._core.settings.autoplaySpeed);
    }, this), timeout || this._core.settings.autoplayTimeout);
  };

  /**
   * Sets autoplay in motion.
   * @private
   */
  Autoplay.prototype._setAutoPlayInterval = function() {
    this._timeout = this._getNextTimeout();
  };

  /**
   * Stops the autoplay.
   * @public
   */
  Autoplay.prototype.stop = function() {
    if (!this._core.is('rotating')) {
      return;
    }

    window.clearTimeout(this._timeout);
    this._core.leave('rotating');
  };

  /**
   * Stops the autoplay.
   * @public
   */
  Autoplay.prototype.pause = function() {
    if (!this._core.is('rotating')) {
      return;
    }

    this._paused = true;
  };

  /**
   * Destroys the plugin.
   */
  Autoplay.prototype.destroy = function() {
    var handler, property;

    this.stop();

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;

})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function($, window, document, undefined) {
  'use strict';

  /**
   * Creates the navigation plugin.
   * @class The Navigation Plugin
   * @param {Owl} carousel - The Owl Carousel.
   */
  var Navigation = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Indicates whether the plugin is initialized or not.
     * @protected
     * @type {Boolean}
     */
    this._initialized = false;

    /**
     * The current paging indexes.
     * @protected
     * @type {Array}
     */
    this._pages = [];

    /**
     * All DOM elements of the user interface.
     * @protected
     * @type {Object}
     */
    this._controls = {};

    /**
     * Markup for an indicator.
     * @protected
     * @type {Array.<String>}
     */
    this._templates = [];

    /**
     * The carousel element.
     * @type {jQuery}
     */
    this.$element = this._core.$element;

    /**
     * Overridden methods of the carousel.
     * @protected
     * @type {Object}
     */
    this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    };

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'prepared.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.dotsData) {
          this._templates.push('<div class="' + this._core.settings.dotClass + '">' +
            $(e.content).find('[data-dot]').addBack('[data-dot]').attr('data-dot') + '</div>');
        }
      }, this),
      'added.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.dotsData) {
          this._templates.splice(e.position, 0, this._templates.pop());
        }
      }, this),
      'remove.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.dotsData) {
          this._templates.splice(e.position, 1);
        }
      }, this),
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name == 'position') {
          this.draw();
        }
      }, this),
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace && !this._initialized) {
          this._core.trigger('initialize', null, 'navigation');
          this.initialize();
          this.update();
          this.draw();
          this._initialized = true;
          this._core.trigger('initialized', null, 'navigation');
        }
      }, this),
      'refreshed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._initialized) {
          this._core.trigger('refresh', null, 'navigation');
          this.update();
          this.draw();
          this._core.trigger('refreshed', null, 'navigation');
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

    // register event handlers
    this.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   * @todo Rename `slideBy` to `navBy`
   */
  Navigation.Defaults = {
    nav: false,
    navText: ['prev', 'next'],
    navSpeed: false,
    navElement: 'div',
    navContainer: false,
    navContainerClass: 'owl-nav',
    navClass: ['owl-prev', 'owl-next'],
    slideBy: 1,
    dotClass: 'owl-dot',
    dotsClass: 'owl-dots',
    dots: true,
    dotsEach: false,
    dotsData: false,
    dotsSpeed: false,
    dotsContainer: false
  };

  /**
   * Initializes the layout of the plugin and extends the carousel.
   * @protected
   */
  Navigation.prototype.initialize = function() {
    var override,
      settings = this._core.settings;

    // create DOM structure for relative navigation
    this._controls.$relative = (settings.navContainer ? $(settings.navContainer) :
      $('<div>').addClass(settings.navContainerClass).appendTo(this.$element)).addClass('disabled');

    this._controls.$previous = $('<' + settings.navElement + '>')
      .addClass(settings.navClass[0])
      .html(settings.navText[0])
      .prependTo(this._controls.$relative)
      .on('click', $.proxy(function(e) {
        this.prev(settings.navSpeed);
      }, this));
    this._controls.$next = $('<' + settings.navElement + '>')
      .addClass(settings.navClass[1])
      .html(settings.navText[1])
      .appendTo(this._controls.$relative)
      .on('click', $.proxy(function(e) {
        this.next(settings.navSpeed);
      }, this));

    // create DOM structure for absolute navigation
    if (!settings.dotsData) {
      this._templates = [$('<div>')
        .addClass(settings.dotClass)
        .append($('<span>'))
        .prop('outerHTML')
      ];
    }

    this._controls.$absolute = (settings.dotsContainer ? $(settings.dotsContainer) :
      $('<div>').addClass(settings.dotsClass).appendTo(this.$element)).addClass('disabled');

    this._controls.$absolute.on('click', 'div', $.proxy(function(e) {
      var index = $(e.target).parent().is(this._controls.$absolute) ?
        $(e.target).index() : $(e.target).parent().index();

      e.preventDefault();

      this.to(index, settings.dotsSpeed);
    }, this));

    // override public methods of the carousel
    for (override in this._overrides) {
      this._core[override] = $.proxy(this[override], this);
    }
  };

  /**
   * Destroys the plugin.
   * @protected
   */
  Navigation.prototype.destroy = function() {
    var handler, control, property, override;

    for (handler in this._handlers) {
      this.$element.off(handler, this._handlers[handler]);
    }
    for (control in this._controls) {
      this._controls[control].remove();
    }
    for (override in this.overides) {
      this._core[override] = this._overrides[override];
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  /**
   * Updates the internal state.
   * @protected
   */
  Navigation.prototype.update = function() {
    var i, j, k,
      lower = this._core.clones().length / 2,
      upper = lower + this._core.items().length,
      maximum = this._core.maximum(true),
      settings = this._core.settings,
      size = settings.center || settings.autoWidth || settings.dotsData ?
      1 : settings.dotsEach || settings.items;

    if (settings.slideBy !== 'page') {
      settings.slideBy = Math.min(settings.slideBy, settings.items);
    }

    if (settings.dots || settings.slideBy == 'page') {
      this._pages = [];

      for (i = lower, j = 0, k = 0; i < upper; i++) {
        if (j >= size || j === 0) {
          this._pages.push({
            start: Math.min(maximum, i - lower),
            end: i - lower + size - 1
          });
          if (Math.min(maximum, i - lower) === maximum) {
            break;
          }
          j = 0, ++k;
        }
        j += this._core.mergers(this._core.relative(i));
      }
    }
  };

  /**
   * Draws the user interface.
   * @todo The option `dotsData` wont work.
   * @protected
   */
  Navigation.prototype.draw = function() {
    var difference,
      settings = this._core.settings,
      disabled = this._core.items().length <= settings.items,
      index = this._core.relative(this._core.current()),
      loop = settings.loop || settings.rewind;

    this._controls.$relative.toggleClass('disabled', !settings.nav || disabled);

    if (settings.nav) {
      this._controls.$previous.toggleClass('disabled', !loop && index <= this._core.minimum(true));
      this._controls.$next.toggleClass('disabled', !loop && index >= this._core.maximum(true));
    }

    this._controls.$absolute.toggleClass('disabled', !settings.dots || disabled);

    if (settings.dots) {
      difference = this._pages.length - this._controls.$absolute.children().length;

      if (settings.dotsData && difference !== 0) {
        this._controls.$absolute.html(this._templates.join(''));
      }
      else if (difference > 0) {
        this._controls.$absolute.append(new Array(difference + 1).join(this._templates[0]));
      }
      else if (difference < 0) {
        this._controls.$absolute.children().slice(difference).remove();
      }

      this._controls.$absolute.find('.active').removeClass('active');
      this._controls.$absolute.children().eq($.inArray(this.current(), this._pages)).addClass('active');
    }
  };

  /**
   * Extends event data.
   * @protected
   * @param {Event} event - The event object which gets thrown.
   */
  Navigation.prototype.onTrigger = function(event) {
    var settings = this._core.settings;

    event.page = {
      index: $.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: settings && (settings.center || settings.autoWidth || settings.dotsData ?
        1 : settings.dotsEach || settings.items)
    };
  };

  /**
   * Gets the current page position of the carousel.
   * @protected
   * @returns {Number}
   */
  Navigation.prototype.current = function() {
    var current = this._core.relative(this._core.current());
    return $.grep(this._pages, $.proxy(function(page, index) {
      return page.start <= current && page.end >= current;
    }, this)).pop();
  };

  /**
   * Gets the current succesor/predecessor position.
   * @protected
   * @returns {Number}
   */
  Navigation.prototype.getPosition = function(successor) {
    var position, length,
      settings = this._core.settings;

    if (settings.slideBy == 'page') {
      position = $.inArray(this.current(), this._pages);
      length = this._pages.length;
      successor ? ++position : --position;
      position = this._pages[((position % length) + length) % length].start;
    }
    else {
      position = this._core.relative(this._core.current());
      length = this._core.items().length;
      successor ? position += settings.slideBy : position -= settings.slideBy;
    }

    return position;
  };

  /**
   * Slides to the next item or page.
   * @public
   * @param {Number} [speed=false] - The time in milliseconds for the transition.
   */
  Navigation.prototype.next = function(speed) {
    $.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
  };

  /**
   * Slides to the previous item or page.
   * @public
   * @param {Number} [speed=false] - The time in milliseconds for the transition.
   */
  Navigation.prototype.prev = function(speed) {
    $.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
  };

  /**
   * Slides to the specified item or page.
   * @public
   * @param {Number} position - The position of the item or page.
   * @param {Number} [speed] - The time in milliseconds for the transition.
   * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
   */
  Navigation.prototype.to = function(position, speed, standard) {
    var length;

    if (!standard && this._pages.length) {
      length = this._pages.length;
      $.proxy(this._overrides.to, this._core)(this._pages[((position % length) + length) % length].start, speed);
    }
    else {
      $.proxy(this._overrides.to, this._core)(position, speed);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;

})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.1.0
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function($, window, document, undefined) {
  'use strict';

  /**
   * Creates the hash plugin.
   * @class The Hash Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Hash = function(carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Hash index for the items.
     * @protected
     * @type {Object}
     */
    this._hashes = {};

    /**
     * The carousel element.
     * @type {jQuery}
     */
    this.$element = this._core.$element;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      'initialized.owl.carousel': $.proxy(function(e) {
        if (e.namespace && this._core.settings.startPosition === 'URLHash') {
          $(window).trigger('hashchange.owl.navigation');
        }
      }, this),
      'prepared.owl.carousel': $.proxy(function(e) {
        if (e.namespace) {
          var hash = $(e.content).find('[data-hash]').addBack('[data-hash]').attr('data-hash');

          if (!hash) {
            return;
          }

          this._hashes[hash] = e.content;
        }
      }, this),
      'changed.owl.carousel': $.proxy(function(e) {
        if (e.namespace && e.property.name === 'position') {
          var current = this._core.items(this._core.relative(this._core.current())),
            hash = $.map(this._hashes, function(item, hash) {
              return item === current ? hash : null;
            }).join();

          if (!hash || window.location.hash.slice(1) === hash) {
            return;
          }

          window.location.hash = hash;
        }
      }, this)
    };

    // set default options
    this._core.options = $.extend({}, Hash.Defaults, this._core.options);

    // register the event handlers
    this.$element.on(this._handlers);

    // register event listener for hash navigation
    $(window).on('hashchange.owl.navigation', $.proxy(function(e) {
      var hash = window.location.hash.substring(1),
        items = this._core.$stage.children(),
        position = this._hashes[hash] && items.index(this._hashes[hash]);

      if (position === undefined || position === this._core.current()) {
        return;
      }

      this._core.to(this._core.relative(position), false, true);
    }, this));
  };

  /**
   * Default options.
   * @public
   */
  Hash.Defaults = {
    URLhashListener: false
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Hash.prototype.destroy = function() {
    var handler, property;

    $(window).off('hashchange.owl.navigation');

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != 'function' && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Hash = Hash;

})(window.Zepto || window.jQuery, window, document);

/**
 * Support Plugin
 *
 * @version 2.1.0
 * @author Vivid Planet Software GmbH
 * @author Artus Kolanowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
;
(function($, window, document, undefined) {

  var style = $('<support>').get(0).style,
    prefixes = 'Webkit Moz O ms'.split(' '),
    events = {
      transition: {
        end: {
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd',
          transition: 'transitionend'
        }
      },
      animation: {
        end: {
          WebkitAnimation: 'webkitAnimationEnd',
          MozAnimation: 'animationend',
          OAnimation: 'oAnimationEnd',
          animation: 'animationend'
        }
      }
    },
    tests = {
      csstransforms: function() {
        return !!test('transform');
      },
      csstransforms3d: function() {
        return !!test('perspective');
      },
      csstransitions: function() {
        return !!test('transition');
      },
      cssanimations: function() {
        return !!test('animation');
      }
    };

  function test(property, prefixed) {
    var result = false,
      upper = property.charAt(0).toUpperCase() + property.slice(1);

    $.each((property + ' ' + prefixes.join(upper + ' ') + upper).split(' '), function(i, property) {
      if (style[property] !== undefined) {
        result = prefixed ? property : true;
        return false;
      }
    });

    return result;
  }

  function prefixed(property) {
    return test(property, true);
  }

  if (tests.csstransitions()) {
    /* jshint -W053 */
    $.support.transition = new String(prefixed('transition'))
    $.support.transition.end = events.transition.end[$.support.transition];
  }

  if (tests.cssanimations()) {
    /* jshint -W053 */
    $.support.animation = new String(prefixed('animation'))
    $.support.animation.end = events.animation.end[$.support.animation];
  }

  if (tests.csstransforms()) {
    /* jshint -W053 */
    $.support.transform = new String(prefixed('transform'));
    $.support.transform3d = tests.csstransforms3d();
  }

})(window.Zepto || window.jQuery, window, document);


function pnm_feature_carousel() {
  var _self = this;

  // =========================================================
  // SLIDER INITIALIZATION
  // =========================================================
  var owl = null;
  var is_slider_running = true;
  var $slider = null;
  var banner_settings = {
    items: 1,
    mouseDrag: false,
    touchDrag: false,
    pagination: true,
    paginationNumbers: true,
    autoplaySpeed: 1200,
    singleItem: true,
    navigation: false,
    slideSpeed: 900,
    navSpeed: 900,
    transitionStyle: "fade",
    nav: false,
    dots: false
  };

  var tablet_breakpoint = 768;
  var desktop_column = 1170;
  var current_slide = 0;

  function slider_responsive() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    // Mobile (No Slider - disabled for ESTA).
    if (false && w < tablet_breakpoint && is_slider_running) {
      // Disable Slick (and a little extra housekeeping).
      is_slider_running = false;
      owl.destroy();
      destroy_custom_controls();
      $slider.removeAttr('style').removeAttr('class');
    }
    // Desktop (Slider).
    else if (w >= tablet_breakpoint && !is_slider_running) {
      is_slider_running = true;
      owl = $slider.owlCarousel(banner_settings).removeClass('mobile');
      owl.trigger('stop.owl.autoplay', [banner_settings.autoplaySpeed]);
      create_custom_controls();
    }
  }

  // =========================================================
  // CUSTOM CONTROLS
  // =========================================================
  function create_custom_controls() {
    var slides_len = $slider.children().length;

    // Generate page elements.
    var html = '<div class="slider-controls">';
    html += '<button class="slider-prev" title="Previous slide">Previous Slide</button>';
    html += '<ul class="slider-pagination">';
    for (var i = 0; i < slides_len; i++) {
      var num = (i + 1);
      html += '<li><button class="slider-dot" data-slide="' + i + '" aria-label="Slide ' + num + '" title="View slide ' + num + '">' + num + '</button></li>';
    }
    html += '</ul>';
    html += '<button class="slider-next" title="Next slide">Next Slide</button>';
    html += '<button class="slider-play paused" title="Play slideshow">Play</button>';
    html += '</div>';
    $slider.after(html);

    // Apply listeners.
    $slider.next('.slider-controls').find('.slider-prev').bind('click', previous_button_click);
    $slider.next('.slider-controls').find('.slider-next').bind('click', next_button_click);
    $slider.next('.slider-controls').find('.slider-dot').bind('click', dot_button_click);
    $slider.next('.slider-controls').find('.slider-play').bind('click', play_button_click);
    update_dots_custom_controls();
    position_custom_controls();
  }

  function destroy_custom_controls() {
    $slider.next('.slider-controls').remove();
  }

  function update_dots_custom_controls() {
    if (owl !== null) {
      var dot_item = current_slide;
      var $pagination = $slider.next('.slider-controls').find('.slider-pagination');
      $pagination.find('.slider-dot').removeClass('active');
      $pagination.find('.slider-dot[data-slide="' + dot_item + '"]').addClass('active');
    }
  }

  function position_custom_controls() {
    // Positioning must also cater for html text_resize functionality.
    var base_scale = parseInt($('html').css('font-size'));
    var scale_perc = base_scale / 16;
    var left = ($(window).width() * 0.5) - ((desktop_column * 0.5) * scale_perc);
    left = (left < 20) ? '20px' : (left / base_scale) + 'rem';
    $slider.next('.slider-controls').css('left', left);
  }

  function previous_button_click(e) {
    owl.trigger('prev.owl.carousel', [banner_settings.slideSpeed]);
  }

  function next_button_click(e) {
    owl.trigger('next.owl.carousel', [banner_settings.slideSpeed]);
  }

  function dot_button_click(e) {
    var target_slide = $(e.currentTarget).data('slide');
    if (target_slide !== current_slide) {
      owl.trigger('to.owl.carousel', [$(e.currentTarget).data('slide'), banner_settings.slideSpeed]);
    }
  }

  function play_button_click(e) {
    var $this = $(e.currentTarget);
    if ($this.hasClass('paused')) {
      owl.trigger('play.owl.autoplay', [banner_settings.autoplaySpeed])
      $this.removeClass('paused').html('Pause').attr('title', 'Pause slideshow');
    }
    else {
      owl.trigger('stop.owl.autoplay');
      $this.addClass('paused').html('Play').attr('title', 'Play slideshow');
    }
  }

  /**
   * options
   *   - container_element = Element that contains the nav.
   *   - current_slide = Initial active slide. Number . Default 0.
   *   - tablet_breakpoint = The breakpoint of the tablet version. Number. Default 768.
   *   - desktop_column = The desktop column max width. Number. Default 1170.
   */
  this.init = function(options) {
    $slider = $(options.container_element);
    current_slide = options.current_slide;
    tablet_breakpoint = options.tablet_breakpoint;
    desktop_column = options.desktop_column;
    if ($slider.length > 0) {
      // Slider only initialized if more than 1 item present.
      if ($slider.children().length > 1) {
        owl = $slider.owlCarousel(banner_settings).removeClass('mobile');
        //owl = $slider.data('owlCarousel');
        owl.trigger('stop.owl.autoplay');
        create_custom_controls();
        $(window).unbind('resize', slider_responsive).bind('resize', slider_responsive);
        slider_responsive();
        objectFitImages($slider.find('img'));
        owl.on('changed.owl.carousel', function(e) {
          current_slide = e.item.index;
          update_dots_custom_controls();
          position_custom_controls();
        });
        // Add support for text resize widget.
        $('html').on('font-size-change', position_custom_controls);
      }
    }
  }
}
