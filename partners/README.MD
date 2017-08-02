# PNM - Partners

Partners component for displaying a block of partner logos (optionally linked).

Note: the <img> CSS definition is independent to the <a> definition as linking is optional.

## Example Implementation

### Example HTML
```html
<div class="partners-container clear">
  <h2>Our partners</h2>
  <div class="partner">
    <!-- Example Partner without link //-->
    <img src="http://via.placeholder.com/200x200" alt="Partner 1" title="Partner 1">
  </div>
  <div class="partner">
    <a href="https://www.google.com" target="_blank">
      <img src="http://via.placeholder.com/200x200" alt="Partner 2" title="Partner 2">
    </a>
  </div>
  <div class="partner">
    <a href="https://www.yahoo.com" target="_blank">
      <img src="http://via.placeholder.com/200x200" alt="Partner 3" title="Partner 3">
    </a>
  </div>
  <div class="partner">
    <a href="https://www.gmail.com" target="_blank">
      <img src="http://via.placeholder.com/200x200" alt="Partner 4" title="Partner 4">
    </a>
  </div>
</div>
```

### Example SCSS
```scss
.partners-container {
  @include pnm_style_partners_container;
  @include pnm_struct_partners_container;

  @include pnm_util_breakpoint(desktop) {
    // ...
  }
  .partner {
    @include pnm_style_partner;
    @include pnm_struct_partner;
    a {
      @include pnm_style_partner_link;
      @include pnm_struct_partner_link;
    }
    img {
      @include pnm_style_partner_image;
      @include pnm_struct_partner_image;
    }
  }
}
```

### Example JS
None
