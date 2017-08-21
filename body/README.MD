# PNM - Body

Body component for displaying content and aside.

## Example Implementation

### Example HTML
```html
<div class="body-container">
  <div class="body-sidebar">
    <!-- Content -->
  </div>
  <div class="body-centre">
    <!-- Content -->
  </div>
</div>
```

### Example SCSS
```scss
.body-container {
  @include pnm_style_body;
  @include pnm_struct_body;
  .body-sidebar {
    @include pnm_style_body_aside_left;
    @include pnm_struct_body_aside_left;
  }
  .body-centre {
    @include pnm_style_body_aside_centre;
    @include pnm_struct_body_aside_centre;
  }
}
```

### Example JS
None
