# PNM - Partners

Partners component for displaying a block of partner logos (optionally linked).

Note: the <img> CSS definition is independent to the <a> definition as linking is optional.

## Example Implementation

### Example HTML
```html
<div class="partner-container clear">
  <div class="partner">
    <!-- Example Partner without link //-->
    <img src="http://via.placeholder.com/200x200" alt="Partner 1" title="Partner 1">
    <div class="partner-title">Partner 1 Title</div>
  </div>
  <div class="partner">
    <a href="#" target="_blank">
      <img src="http://via.placeholder.com/200x200" alt="Partner 2" title="Partner 2">
      <div class="partner-title">Partner 2 Title</div>
    </a>
  </div>
  <div class="partner">
    <a href="#" target="_blank">
      <img src="http://via.placeholder.com/200x200" alt="Partner 3" title="Partner 3">
      <div class="partner-title">Partner 2 Title</div>
    </a>
  </div>
  <div class="partner">
    <a href="#" target="_blank">
      <img src="http://via.placeholder.com/200x200" alt="Partner 4" title="Partner 4">
      <div class="partner-title">Partner 2 Title</div>
    </a>
  </div>
</div>
```

### Example SCSS
```scss
.partner-container {
  @include pnm_style_partner_container;
  @include pnm_struct_partner_container;
  @include pnm_util_breakpoint(desktop) {
    max-width: $desktop_column;
  }
}
.partner {
  @include pnm_style_partner;
  @include pnm_struct_partner;
  .partner-title {
    @include pnm_style_partner_title;
    @include pnm_struct_partner_title;
  }
  img {
    @include pnm_style_partner_image;
    @include pnm_struct_partner_image;
  }
}
```

### Example JS
None
