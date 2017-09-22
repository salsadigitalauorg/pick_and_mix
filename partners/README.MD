# PNM - Partners

Partners component for displaying a block of partner logos (optionally linked).

Note: the <img> CSS definition is independent to the <a> definition as linking is optional.

## Example Implementation

### Example HTML
```html
<div class="partner-container">
  <h2 class="heading-large">Our Partners</h2>
  <div class="partner-list">
    <div class="partner">
      <img src="http://via.placeholder.com/200x200" alt="Partner 1" title="Partner 1">
      <div class="partner-title">Partner 1 Title</div>
    </div>
    <div class="partner">
      <a href="#" target="_blank">
        <img src="http://via.placeholder.com/200x50" alt="Partner 2" title="Partner 2">
        <div class="partner-title">Partner 2 Title</div>
      </a>
    </div>
    <div class="partner">
      <a href="#" target="_blank">
        <img src="http://via.placeholder.com/200x150" alt="Partner 3" title="Partner 3">
        <div class="partner-title">Partner 2 Title</div>
      </a>
    </div>
    <div class="partner">
      <a href="#" target="_blank">
        <img src="http://via.placeholder.com/200x250" alt="Partner 4" title="Partner 4">
        <div class="partner-title">Partner 2 Title</div>
      </a>
    </div>
    <div class="partner">
      <a href="#" target="_blank">
        <img src="http://via.placeholder.com/200x200" alt="Partner 4" title="Partner 4">
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
</div>
```

### Example SCSS
```scss
.partner-container {
  @include pnm_style_partner_container;
  @include pnm_struct_partner_container;
}
.partner-list {
  @include pnm_style_partner_list;
  @include pnm_struct_partner_list;
}
.partner {
  @include pnm_style_partner;
  @include pnm_struct_partner;
  a {
    @include pnm_style_partner_link;
    @include pnm_struct_partner_link;
  }
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
