# PNM - Logo

Logo component for displaying site logo with link.

## Example Implementation

### Example HTML
```html
<div class="logo-container">
  <a href="/" title="Back to Homepage">
    <img src="dist/images/png/logo.png" alt="Website name">
  </a>
</div>
```

### Example SCSS
```scss
.logo-container {
  @include pnm_style_logo_container;
  a {
    @include pnm_style_logo_link;
    img {
      @include pnm_style_logo_image;
    }
  }
}
```

### Example JS
None
