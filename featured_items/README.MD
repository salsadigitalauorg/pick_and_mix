# PNM - Featured Items

Featured Items component for displaying card / promo tile view for selected content items.

Ref.: https://salsadigital.atlassian.net/browse/MU-219

Flexible enough for use on home page and internal section pages.

The number of items per row is determined by the use of breakpoints:

Mobile: 1 item per row, stacked.

Tablet: 2 items per row.

Large Tablet+: 3 items per row.

## Example Implementation

### Example HTML
```html
<div class="featured-items-container clear">
  <div class="featured-item">
      <img src="http://via.placeholder.com/350x150" alt="Feature Item 1 Image" title="Feature Item 1 Image" />
      <h3><a href="#">Feature Item 1 Heading</a></h3>
      Feature Item 1 Summary / Description.
      <a href="#" class="read-more">Read more</a>
  </div>
  <div class="featured-item">
      <img src="http://via.placeholder.com/350x150" alt="Feature Item 2 Image" title="Feature Item 2 Image" />
      <h3><a href="#">Feature Item 2 Heading</a></h3>
      Feature Item 2 Summary / Description.
      <a href="#" class="read-more">Read more</a>
  </div>
  ...
</div>

```

### Example SCSS
```scss
.featured-items-container {
  @include pnm_struct_featured_items_container;
  @include pnm_style_featured_items_container;
}
.featured-item {
  @include pnm_struct_featured_item;
  @include pnm_style_featured_item;
  img {
    @include pnm_style_featured_item_image;
  }
  @include pnm_util_breakpoint(tablet) {
    padding-left: pnm_util_unit(20px);
    &:first-child {
      margin-left: pnm_util_unit(-1 * 20px);
    }
    &:nth-child(2n+1) {
      margin-left: pnm_util_unit(-1 * 20px);
    }
  }
  @include pnm_util_breakpoint(large_tablet) {
    &:nth-child(2n+1) {
      margin-left: 0;
    }
    &:first-child {
      margin-left: pnm_util_unit(-1 * 20px);
    }
    &:nth-child(3n+4) {
      margin-left: pnm_util_unit(-1 * 20px);
    }
  }
}
```

### Example JS
None
