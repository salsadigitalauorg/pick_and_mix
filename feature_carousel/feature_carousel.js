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
    $('.slider-prev').bind('click', previous_button_click);
    $('.slider-next').bind('click', next_button_click);
    $('.slider-dot').bind('click', dot_button_click);
    $('.slider-play').bind('click', play_button_click);
    update_dots_custom_controls();
    position_custom_controls();
  }

  function destroy_custom_controls() {
    $slider.next('.slider-controls').remove();
  }

  function update_dots_custom_controls() {
    if (owl !== null) {
      var dot_item = current_slide;
      var $pagination = $slider.next('slider-controls').find('.slider-pagination');
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
