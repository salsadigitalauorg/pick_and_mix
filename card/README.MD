# PNM - Card

Card component for displaying card / promo tile view.

Ref.: https://salsadigital.atlassian.net/browse/MU-219

Flexible enough for use on home page and internal section pages.

The number of items per row is determined by the use of breakpoints:

Mobile: 1 item per row, stacked.

Tablet: 2 items per row.

Large Tablet+: 3 items per row.

## Example Implementation

### Example HTML
```html
<div class="card-container">
  <div class="card">
    <img src="http://via.placeholder.com/350x150" alt="Card Item 1 Image" title="Card Item 1 Image" />
    <h3><a href="#">Card Item 1 Heading</a></h3>
    Card Item 1 Summary / Description.
    <a href="#" class="read-more">Read more</a>
  </div>
  <div class="card">
    <img src="http://via.placeholder.com/350x150" alt="Card Item 2 Image" title="Card Item 2 Image" />
    <h3><a href="#">Card Item 2 Heading</a></h3>
    Card Item 2 Summary / Description.
    <a href="#" class="read-more">Read more</a>
  </div>
  <div class="card">
    <img src="http://via.placeholder.com/350x150" alt="Card Item 3 Image" title="Card Item 3 Image" />
    <h3><a href="#">Card Item 3 Heading</a></h3>
    Card Item 3 Summary / Description.
    <a href="#" class="read-more">Read more</a>
  </div>
</div>
```

### Example SCSS
```scss
.card-container {
  @include pnm_struct_card_container;
  @include pnm_style_card_container;
}

.card {
  @include pnm_struct_card;
  @include pnm_style_card;
  img {
    @include pnm_style_card_image;
    max-height: pnm_util_unit(200px);
  }
  @include pnm_util_breakpoint(tablet) {
    padding-left: $mobile_column_padding;
    &:first-child {
      margin-left: (-1 * $mobile_column_padding);
    }
    &:nth-child(2n+1) {
      margin-left: (-1 * $mobile_column_padding);
    }
  }
  @include pnm_util_breakpoint(large_tablet) {
    &:nth-child(2n+1) {
      margin-left: 0;
    }
    &:first-child {
      margin-left: (-1 * $mobile_column_padding);
    }
    &:nth-child(3n+4) {
      margin-left: (-1 * $mobile_column_padding);
    }
  }
}
```

### Example JS
None
