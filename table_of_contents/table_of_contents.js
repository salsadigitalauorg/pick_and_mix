function pnm_table_of_contents() {
  var _self = this;

  var $widget = null;

  var list_items = [];

  var $otp;
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
        list_items.push($anchor);
        $widget.find('ul').prepend($('<li></li>').html($anchor));
        $(this).attr('id', id);
      });
    }

    // 'On this page' functionality.
      // Add Select element.
      if ($(options.list_selector).length) {
        $otp = $(options.list_selector);
        /* Remove all options from the select list */
        $('#otp-contents').empty();

        /* Insert the new ones from the array above */
        $.each(list_items, function(index, value) {
            $('#otp-contents').prepend($("<option></option>")
            .attr("value", value.attr('href')).text(value.text()));
        });
        // Trigger click on select element.
        $('#otp-contents').on('change', function () {
          $i = $('#otp-contents').prop('selectedIndex');
          $widget.find('ul.toc-list li a').eq($i)[0].click();
        });
        // Toggle visibility on page scroll.
        var $pagescroll = function () {
          /* eslint no-unused-expressions: "off" */
          $(window).scrollTop() > ($widget.height() + $widget.offset().top) ? $widget.hasClass('is-display-ready') || ($otp.addClass('is-display-ready'), setTimeout(function () {
            $otp.addClass('is-displayed');
          }, 1)) : $otp.hasClass('is-displayed') && ($otp.removeClass('is-displayed'), setTimeout(function () {
            $otp.removeClass('is-display-ready');
          }, 250));
        };
        $(window).scroll($pagescroll);
        $pagescroll();
      }
    }

  this.convertToID = function (str) {
    return 'goto-' + str.replace(/\s+/g, '-').replace(/[^A-Za-z0-9]/, '').replace(/-+/, '-').toLowerCase();
  }
}
