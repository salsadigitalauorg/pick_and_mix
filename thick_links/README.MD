# PNM - Thick Links

Thick Links component for display a set of quick links.

## Example Implementation

### Example HTML
```html
<div class="thick-link-container">
  <div class="thick-link">
    <a href="#">Thick Link #1</a>
  </div>
  <div class="thick-link">
    <a href="#">Thick Link #2</a>
  </div>
  <div class="thick-link">
    <a href="#">Thick Link #3</a>
  </div>
  <div class="thick-link">
    <a href="#">Thick Link #4</a>
  </div>
</div>
```

### Example SCSS
```scss
.thick-link-container {
  @include pnm_style_thick_link_container;
  @include pnm_struct_thick_link_container;
}
.thick-link {
  @include pnm_struct_thick_link;
  @include pnm_style_thick_link;
  a {
    @include pnm_struct_thick_link_title;
    @include pnm_style_thick_link_title;
  }
}
```

### Example JS
None
