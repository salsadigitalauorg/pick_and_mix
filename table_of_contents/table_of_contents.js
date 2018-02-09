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
      setTimeout(function () {
        $otp.addClass('is-displayed');
      }, 1);
    }
    else {
      if ($otp.hasClass('is-displayed')) {
        $otp.hasClass('is-displayed');
        setTimeout(function () {
          $otp.removeClass('is-display-ready');
        }, 250);
      }
    }
  }
  /**
   * options
   *   - toc_container  = The 'Table of contents' container.
   *   - bodyField = The field to get headings.
   */
  this.init = function(options) {
    $widget = $(options.toc_container);
    if ($widget.length > 0) {
      var $bodyField = $(options.bodyField);
      $($bodyField.find('h2').get().reverse()).each(function(){
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
      $otp_select.on('change', function () {
        $i = $otp_select.prop('selectedIndex');
        $widget.find('ul.toc-list li a').eq($i)[0].click();
      });

      $(window).unbind('scroll', pagescroll).bind('scroll', pagescroll);
      pagescroll();
    }
  }

  this.convertToID = function (str) {
    return 'goto-' + str.replace(/\s+/g, '-').replace(/[^A-Za-z0-9]/, '').replace(/-+/, '-').toLowerCase();
  }
}
